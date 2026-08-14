"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  createSpeechRecognition,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  speakText,
  stopSpeaking,
  warmSpeechVoices,
  type SpeechRecognitionLike,
} from "@/lib/site-dexter-speech";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = ["What does Skout do?", "How do you verify emails?", "I want to book a demo"];
export const OPEN_DEXTER_EVENT = "skout-open-dexter";
const SILENCE_SEND_MS = 10_000;

export function SiteAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Dexter. Ask anything about Skout, this website, outbound, or book a demo. You can type or use the mic.",
    },
  ]);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [micSupported] = useState(() => isSpeechRecognitionSupported());
  const [ttsSupported] = useState(() => isSpeechSynthesisSupported());
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const speakCancelRef = useRef<(() => void) | null>(null);
  const speechFinalRef = useRef("");
  const listeningRef = useRef(false);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef(false);
  const turnsRef = useRef(turns);
  const interimRef = useRef("");
  turnsRef.current = turns;
  interimRef.current = interim;

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  }, [turns, pending, open]);

  const speakReply = useCallback(
    (text: string) => {
      if (!voiceOn || !ttsSupported || !text.trim()) return;
      speakCancelRef.current?.();
      const handle = speakText(text, {
        onEnd: () => {
          speakCancelRef.current = null;
        },
      });
      speakCancelRef.current = handle.cancel;
    },
    [ttsSupported, voiceOn]
  );

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const sendClean = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || pendingRef.current) return;
      pendingRef.current = true;
      setPending(true);
      setError(null);
      setInput("");

      const next: Turn[] = [...turnsRef.current, { role: "user", content }];
      turnsRef.current = next;
      setTurns(next);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next.map((t) => ({ role: t.role, content: t.content })),
          }),
        });
        const raw = await res.text();
        let reply = "";
        try {
          const json = JSON.parse(raw) as { reply?: string; message?: string };
          reply = (json.reply ?? json.message ?? "").trim();
        } catch {
          reply = "";
        }
        if (!res.ok || !reply) {
          throw new Error(reply || `Chat failed (${res.status})`);
        }
        const withReply: Turn[] = [...next, { role: "assistant", content: reply }];
        turnsRef.current = withReply;
        setTurns(withReply);
        speakReply(reply);
      } catch {
        setError("Could not get a reply. Check your connection and try again.");
        const withReply: Turn[] = [
          ...next,
          {
            role: "assistant",
            content:
              "I couldn’t reach the chat service just then. Ask again, or book a demo on Contact / log in at /app.",
          },
        ];
        turnsRef.current = withReply;
        setTurns(withReply);
      } finally {
        pendingRef.current = false;
        setPending(false);
      }
    },
    [speakReply]
  );

  const stopVoice = useCallback(() => {
    clearSilenceTimer();
    speakCancelRef.current?.();
    speakCancelRef.current = null;
    stopSpeaking();
    listeningRef.current = false;
    try {
      recognitionRef.current?.abort();
    } catch {
      /* ignore */
    }
    setListening(false);
    setInterim("");
    speechFinalRef.current = "";
  }, [clearSilenceTimer]);

  useEffect(() => {
    warmSpeechVoices();
    const openChat = () => setOpen(true);
    window.addEventListener(OPEN_DEXTER_EVENT, openChat);
    return () => {
      window.removeEventListener(OPEN_DEXTER_EVENT, openChat);
      stopVoice();
    };
  }, [stopVoice]);

  const toggleListen = useCallback(() => {
    if (!micSupported) return;
    if (listeningRef.current) {
      listeningRef.current = false;
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      setListening(false);
      clearSilenceTimer();
      const spoken = `${speechFinalRef.current} ${interimRef.current}`.replace(/\s+/g, " ").trim();
      speechFinalRef.current = "";
      setInterim("");
      if (spoken) void sendClean(spoken);
      return;
    }
    const rec = createSpeechRecognition();
    if (!rec) return;
    recognitionRef.current = rec;
    listeningRef.current = true;
    speechFinalRef.current = "";
    setListening(true);
    rec.onresult = (event) => {
      let finalChunk = "";
      let live = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result?.[0]?.transcript ?? "";
        if (result && "isFinal" in result && result.isFinal) finalChunk += transcript;
        else live += transcript;
      }
      if (finalChunk) speechFinalRef.current = `${speechFinalRef.current} ${finalChunk}`.trim();
      setInterim(live);
      interimRef.current = live;
      clearSilenceTimer();
      silenceTimerRef.current = setTimeout(() => {
        if (!listeningRef.current) return;
        listeningRef.current = false;
        try {
          rec.stop();
        } catch {
          /* ignore */
        }
        setListening(false);
        const spoken = `${speechFinalRef.current} ${interimRef.current}`.replace(/\s+/g, " ").trim();
        speechFinalRef.current = "";
        setInterim("");
        interimRef.current = "";
        if (spoken) void sendClean(spoken);
      }, SILENCE_SEND_MS);
    };
    rec.onerror = () => {
      setListening(false);
      listeningRef.current = false;
    };
    rec.onend = () => {
      setListening(false);
      listeningRef.current = false;
    };
    rec.start();
  }, [clearSilenceTimer, micSupported, sendClean]);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[min(100%-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6">
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundImage: "var(--gradient-accent)" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold tracking-tight">Ask Dexter</p>
                <p className="text-[11px] text-white/80">Voice or type · answers from this site</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {ttsSupported && (
                <button
                  type="button"
                  onClick={() => {
                    setVoiceOn((v) => {
                      if (v) stopSpeaking();
                      return !v;
                    });
                  }}
                  className="rounded-full p-1 hover:bg-white/15"
                  aria-label={voiceOn ? "Mute Dexter voice" : "Unmute Dexter voice"}
                >
                  {voiceOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  stopVoice();
                  setOpen(false);
                }}
                className="rounded-full p-1 hover:bg-white/15"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-background px-4 py-3">
            {turns.map((t, i) => (
              <div
                key={`${t.role}-${i}-${t.content.slice(0, 24)}`}
                className={t.role === "user" ? "ml-6 text-right" : "mr-6"}
              >
                <p
                  className={`inline-block whitespace-pre-wrap rounded-2xl px-3 py-2 text-left text-sm leading-relaxed ${
                    t.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {t.content}
                </p>
              </div>
            ))}
            {pending && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Dexter is thinking…
              </p>
            )}
            {error && <p className="text-[11px] text-red-600">{error}</p>}
          </div>

          <div className="border-t border-border bg-card px-3 py-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void sendClean(s)}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            {listening && (
              <p className="mb-1.5 text-[11px] font-medium text-indigo-600">
                Listening… tap mic to send, or pause 10s.
              </p>
            )}
            {!listening && interim && (
              <p className="mb-1.5 text-[11px] italic text-muted-foreground">Hearing: {interim}</p>
            )}
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void sendClean(input);
              }}
            >
              {micSupported && (
                <button
                  type="button"
                  onClick={toggleListen}
                  disabled={pending}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    listening
                      ? "animate-pulse border-red-500 bg-red-600 text-white"
                      : "border-border text-foreground"
                  }`}
                  aria-label={listening ? "Stop and send" : "Speak to Dexter"}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={micSupported ? "Ask Dexter or tap the mic…" : "Ask about Skout…"}
                className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white disabled:opacity-40"
                style={{ backgroundImage: "var(--gradient-accent)" }}
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Ready to talk?{" "}
              <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">
                Book a demo
              </Link>
              {" · "}
              <Link href="/app" className="font-medium text-foreground underline underline-offset-2">
                Log in
              </Link>
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-50 flex h-14 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white shadow-lg sm:right-6"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-label={open ? "Close Dexter chat" : "Open Dexter chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Dexter"}</span>
      </button>
    </>
  );
}
