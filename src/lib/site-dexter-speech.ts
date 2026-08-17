/**
 * Browser speech helpers for Dexter on the marketing site (Web Speech API).
 */

export type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionResultEventLike = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean; length: number }> & {
    length: number;
  };
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() != null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function createSpeechRecognition(): SpeechRecognitionLike | null {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) return null;
  const recognition = new Ctor();
  // Google/Chrome's recommended settings - continuous is REQUIRED for long-form speech
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.maxAlternatives = 1;
  return recognition;
}

const MALE_VOICE_RE =
  /\b(male|david|daniel|alex|fred|tom|arthur|aaron|gordon|james|mark|george|rishi|thomas|oliver|ryan|guy|eric|nathan|microsoft\s+david|google\s+uk\s+english\s+male|google\s+us\s+english\s+male)\b/i;
const FEMALE_VOICE_RE =
  /\b(female|samantha|karen|moira|tessa|fiona|victoria|zira|susan|hazel|catherine|serena|google\s+us\s+english\s+female|google\s+uk\s+english\s+female)\b/i;
const PREMIUM_VOICE_RE = /\b(natural|neural|premium|enhanced|wavenet|studio|online|google)\b/i;

function voiceScore(v: SpeechSynthesisVoice): number {
  let score = 0;
  if (MALE_VOICE_RE.test(v.name) && !FEMALE_VOICE_RE.test(v.name)) score += 50;
  if (FEMALE_VOICE_RE.test(v.name)) score -= 80;
  if (PREMIUM_VOICE_RE.test(v.name)) score += 25;
  if (/en(-|_)US/i.test(v.lang)) score += 15;
  else if (/en(-|_)GB/i.test(v.lang)) score += 12;
  else if (/^en/i.test(v.lang)) score += 8;
  if (/compact|eloquence|novelty/i.test(v.name)) score -= 20;
  return score;
}

export function pickMaleEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const ranked = [...voices].sort((a, b) => voiceScore(b) - voiceScore(a));
  const best = ranked[0];
  if (!best || voiceScore(best) < -40) return null;
  return best;
}

function pathPhrase(href: string): string {
  const path = href.replace(/^https?:\/\/(www\.)?skoutai\.io/i, "") || "/";
  if (path.startsWith("/pricing")) return "the pricing page";
  if (path.startsWith("/guides") || path.includes("setup-guides")) return "the setup guides";
  if (path.includes("calculator")) return "the calculator";
  if (path.startsWith("/resources")) return "the resources page";
  if (path.startsWith("/integrations")) return "the integrations page";
  if (path.startsWith("/contact")) return "the contact page";
  if (path.startsWith("/features")) return "the features page";
  if (path.startsWith("/intelligence")) return "the intelligence page";
  if (path.startsWith("/app")) return "the sign in page";
  if (path.startsWith("/products")) return "that product page";
  if (path.startsWith("/solutions")) return "that solutions page";
  return "that page";
}

/** Spoken English for TTS — never read markup, URLs, or abbreviations like /mo. */
export function humanizeForSpeech(raw: string): string {
  let text = raw.trim();
  if (!text) return "";
  text = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, href: string) => {
      if (/^https?:\/\//i.test(href) || href.startsWith("/")) {
        return `${label} on ${pathPhrase(href)}`;
      }
      return String(label);
    })
    .replace(/https?:\/\/(www\.)?skoutai\.io(\/\S*)?/gi, (_m, _w, path: string) =>
      pathPhrase(path || "/"),
    )
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s*/g, "")
    .replace(/^\s*[-*]\s+/gm, ". ")
    .replace(/^\s*\d+\.\s+/gm, ". ")
    .replace(/\$(\d+(?:\.\d+)?)/g, "$1 dollars")
    .replace(/\/\s*(mo|mos|mth|month)\b/gi, " per month")
    .replace(/\bper mo\b/gi, "per month")
    .replace(/\bCTA:?/gi, "")
    .replace(/\bBYOK\b/g, "bring your own keys")
    .replace(/\bSSO\b/g, "single sign on")
    .replace(/\bCSV\b/g, "C S V")
    .replace(/\bICP\b/g, "I C P")
    .replace(/\bGTM\b/g, "G T M")
    .replace(/\bAPI\b/g, "A P I")
    .replace(/\bCRM\b/g, "C R M")
    .replace(/\bOAuth\b/g, "O Auth")
    .replace(/\bDNS\b/g, "D N S")
    .replace(/\bSPF\b/g, "S P F")
    .replace(/\bDKIM\b/g, "D K I M")
    .replace(/\bFREE\b/g, "Free")
    .replace(/\bSTARTER\b/g, "Starter")
    .replace(/\bSCALE\b/g, "Scale")
    .replace(/\bENTERPRISE\b/g, "Enterprise")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
  text = text
    .replace(/:\s+/g, ", ")
    .replace(/;\s+/g, ". ")
    .replace(/\s+—\s+/g, ". ")
    .replace(/\s+–\s+/g, ", ")
    .replace(/\s*\.\s*\./g, ".")
    .replace(/^\.\s*/, "");
  return text.slice(0, 1600);
}

function splitIntoSpeakChunks(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 1) return [text];
  const chunks: string[] = [];
  let buf = "";
  for (const part of parts) {
    if ((buf + " " + part).trim().length > 180 && buf) {
      chunks.push(buf.trim());
      buf = part;
    } else {
      buf = buf ? `${buf} ${part}` : part;
    }
  }
  if (buf.trim()) chunks.push(buf.trim());
  return chunks;
}

export function speakText(
  text: string,
  opts?: { rate?: number; pitch?: number; onEnd?: () => void },
): { cancel: () => void } {
  if (!isSpeechSynthesisSupported() || !text.trim()) {
    opts?.onEnd?.();
    return { cancel: () => undefined };
  }
  window.speechSynthesis.cancel();
  const spoken = humanizeForSpeech(text);
  if (!spoken) {
    opts?.onEnd?.();
    return { cancel: () => undefined };
  }
  const preferred = pickMaleEnglishVoice();
  const chunks = splitIntoSpeakChunks(spoken);
  let cancelled = false;
  let index = 0;
  let pauseTimer: ReturnType<typeof setTimeout> | null = null;
  const finish = () => {
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    opts?.onEnd?.();
  };
  const speakNext = () => {
    if (cancelled) return;
    if (index >= chunks.length) {
      finish();
      return;
    }
    const chunk = chunks[index++]!;
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = opts?.rate ?? 0.88;
    utterance.pitch = opts?.pitch ?? 0.95;
    utterance.volume = 1;
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => {
      if (cancelled) return;
      if (index < chunks.length) {
        pauseTimer = setTimeout(speakNext, 220);
      } else {
        finish();
      }
    };
    utterance.onerror = () => {
      if (!cancelled) finish();
    };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
  return {
    cancel: () => {
      cancelled = true;
      if (pauseTimer) {
        clearTimeout(pauseTimer);
        pauseTimer = null;
      }
      window.speechSynthesis.cancel();
    },
  };
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) window.speechSynthesis.cancel();
}

export function warmSpeechVoices(): void {
  if (!isSpeechSynthesisSupported()) return;
  void window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    void window.speechSynthesis.getVoices();
  };
}
