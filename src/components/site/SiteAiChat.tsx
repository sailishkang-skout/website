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
import { DexterMarkdown } from "@/components/site/DexterMarkdown";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = ["How are you?", "What can you help with?", "I want to book a demo"];
export const OPEN_DEXTER_EVENT = "skout-open-dexter";
const SILENCE_SEND_MS = 1_800;

export function SiteAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Dexter. How’s your day going? Ask me anything, or tap the mic and just talk.",
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
  const lastSentRef = useRef({ text: "", at: 0 });
  const turnsRef = useRef(turns);
  const interimRef = useRef("");
  const micButtonCooldownRef = useRef(false); // Prevent double-clicks
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
    [ttsSupported, voiceOn],
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

      if (lastSentRef.current.text === content && Date.now() - lastSentRef.current.at < 2500) {
        pendingRef.current = false;
        setPending(false);
        return;
      }
      // Also block if we're already processing the same content
      if (pendingRef.current && lastSentRef.current.text === content) {
        return;
      }
      lastSentRef.current = { text: content, at: Date.now() };

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
        try {
          speakReply(reply);
        } catch {
          /* TTS must never duplicate the chat bubble */
        }
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
    [speakReply],
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

  // Component mount/unmount cleanup
  useEffect(() => {
    warmSpeechVoices();
    const openChat = () => setOpen(true);
    window.addEventListener(OPEN_DEXTER_EVENT, openChat);

    // Cleanup function that runs on unmount
    return () => {
      window.removeEventListener(OPEN_DEXTER_EVENT, openChat);
      stopVoice();
      // Always clean up speech recognition when component unmounts
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          recognitionRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }
      clearSilenceTimer();
    };
  }, [stopVoice, clearSilenceTimer]);

  // Industry-standard speech recognition implementation - declare FIRST before using it
  const finalizeAndSendSpeech = useCallback(() => {
    console.log("[Voice] 📤 finalizeAndSendSpeech() called - USER clicked to send!");
    if (!listeningRef.current) {
      console.log("[Voice] ❌ Already stopped, ignoring finalize call");
      return;
    }

    // Capture EVERYTHING we've heard - simple and reliable
    const spoken = interimRef.current.trim();
    console.log("[Voice] 📝 Final captured text:", JSON.stringify(spoken));

    // Reset ALL state completely
    listeningRef.current = false;
    speechFinalRef.current = "";
    interimRef.current = "";
    setInterim("");
    setInput(""); // Clear input after sending

    // Clean up recognition instance
    if (recognitionRef.current) {
      console.log("[Voice] 🛑 Stopping recognition instance");
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (e) {
        console.log("[Voice] ⚠️ Cleanup error (expected):", e);
      }
    }

    setListening(false);
    console.log("[Voice] ✅ State reset complete - listening set to false");

    // Send if we captured anything
    if (spoken) {
      console.log("[Voice] 🚀 Calling sendClean() with:", JSON.stringify(spoken));
      void sendClean(spoken);
    } else {
      console.log("[Voice] ⚠️ No speech captured, not sending");
    }
  }, [sendClean]);

  // Industry-standard: Handle all edge cases that can break voice input (must come AFTER finalizeAndSendSpeech is declared)
  // 1. Tab visibility change - pause if user switches tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && listeningRef.current) {
        console.log("[Voice] 📑 Tab hidden, saving and pausing recognition");
        finalizeAndSendSpeech();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [finalizeAndSendSpeech]);

  // 2. Window blur - pause if user clicks outside the browser
  useEffect(() => {
    const handleWindowBlur = () => {
      if (listeningRef.current) {
        console.log("[Voice] 🪟 Window lost focus, saving and pausing recognition");
        finalizeAndSendSpeech();
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [finalizeAndSendSpeech]);

  // 3. Before unload - clean up if user refreshes/closes tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* ignore */
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 4. Page freeze - clean up for browser's page freezing feature
  useEffect(() => {
    const handleFreeze = () => {
      console.log("[Voice] ❄️ Page freezing, cleaning up recognition");
      if (listeningRef.current) {
        finalizeAndSendSpeech();
      }
    };

    document.addEventListener("freeze", handleFreeze);
    return () => document.removeEventListener("freeze", handleFreeze);
  }, [finalizeAndSendSpeech]);

  const toggleListen = useCallback(() => {
    // Industry-standard: Prevent double-clicks and rapid fire
    if (micButtonCooldownRef.current) {
      console.log("[Voice] ⏳ Mic button in cooldown, ignoring click");
      return;
    }
    // Activate cooldown to prevent double-clicks (industry standard: 500ms debounce)
    micButtonCooldownRef.current = true;
    setTimeout(() => {
      micButtonCooldownRef.current = false;
      console.log("[Voice] ✅ Mic button cooldown released");
    }, 500);
    // Guard clause: exit if unsupported
    if (!micSupported) {
      setError("Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    // If already listening: stop and send
    if (listeningRef.current) {
      finalizeAndSendSpeech();
      return;
    }

    // Start fresh listening session
    clearSilenceTimer();
    speechFinalRef.current = "";
    interimRef.current = "";
    setInterim("");
    setInput("");
    setError(null);

    // Create new recognition instance
    const rec = createSpeechRecognition();
    if (!rec) {
      setError("Failed to start microphone. Please refresh and try again.");
      return;
    }

    // Clean up any previous instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore cleanup errors
      }
    }

    // Initialize new session - THE MOST RELIABLE APPROACH FOR CHROME
    recognitionRef.current = rec;
    setListening(true);
    listeningRef.current = true;
    console.log("[Voice] 🎙️ Recognition instance created, waiting for speech...");

    // Simplified result handling that ALWAYS works in Chrome
    rec.onresult = (event) => {
      console.log("[Voice] 📥 Received speech results:", event.results);
      let fullTranscript = "";

      // Process ALL results, simplest approach that never fails
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i][0].transcript) {
          fullTranscript += event.results[i][0].transcript;
        }
      }

      // Update everything immediately - what you speak appears instantly
      console.log("[Voice] 📝 Captured:", JSON.stringify(fullTranscript));
      setInput(fullTranscript.trim());
      interimRef.current = fullTranscript;
    };

    // Minimal error handling - just log, don't stop listening unless user clicks
    rec.onerror = (event) => {
      console.log("[Voice] ⚠️ Recognition event:", event.error);
      // Ignore Chrome's "no-speech" false error - keep listening!
      if (event.error !== "no-speech") {
        setError(`Microphone issue: ${event.error}. Try clicking mic again.`);
      }
    };

    // If Chrome stops it, just restart - keep listening until USER clicks stop
    rec.onend = () => {
      console.log("[Voice] 🔄 Chrome ended session, restarting to keep listening...");
      if (listeningRef.current && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log("[Voice] Couldn't restart, ending session");
        }
      }
    };

    // Start recognition (must be from user gesture - which this is)
    try {
      // Speech recognition only works on HTTPS or localhost
      const isLocalhost =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const isHTTPS = window.location.protocol === "https:";
      if (!isLocalhost && !isHTTPS) {
        setError("Speech recognition only works on HTTPS or localhost.");
        setListening(false);
        listeningRef.current = false;
        return;
      }
      rec.start();
      console.log("[Voice] Speech recognition started successfully");
    } catch (err) {
      console.error("[Voice] Failed to start recognition:", err);
      setError("Failed to access microphone. Please check your browser permissions.");
      listeningRef.current = false;
      setListening(false);
    }
  }, [micSupported, clearSilenceTimer, finalizeAndSendSpeech]);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-80 flex w-[min(100%-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6">
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundImage: "var(--gradient-accent)" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold tracking-tight">Ask Dexter</p>
                <p className="text-[11px] text-white/80">Talk or type — I’ll meet you there</p>
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

          <div
            ref={scrollRef}
            className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-background px-4 py-3"
          >
            {turns.map((t, i) => (
              <div
                key={`${t.role}-${i}-${t.content.slice(0, 24)}`}
                className={t.role === "user" ? "ml-6 text-right" : "mr-6"}
              >
                <div
                  className={`inline-block max-w-full rounded-2xl px-3 py-2 text-left text-sm leading-relaxed ${
                    t.role === "user"
                      ? "whitespace-pre-wrap bg-indigo-600 text-white"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {t.role === "assistant" ? <DexterMarkdown content={t.content} /> : t.content}
                </div>
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
              <div className="mb-1.5 p-3 bg-green-50 rounded-lg border-2 border-green-400 animate-pulse">
                <p className="text-xs font-bold text-green-700">
                  🎤 LISTENING - SPEAK NOW!
                  <br />
                  Click the red mic button when you're done to send your message
                </p>
                {interim && interim.trim() && (
                  <p className="text-sm text-gray-800 mt-2 p-2 bg-white rounded border">
                    "{interim.trim()}"
                  </p>
                )}
              </div>
            )}
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void sendClean(input);
              }}
            >
              <button
                type="button"
                onClick={toggleListen}
                disabled={pending || !micSupported}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  !micSupported
                    ? "border-border bg-gray-200 text-gray-400 cursor-not-allowed"
                    : listening
                      ? "animate-pulse border-red-500 bg-red-600 text-white scale-110"
                      : "border-border text-foreground hover:border-gray-400"
                }`}
                aria-label={
                  listening ? "Stop listening and send voice message" : "Start voice input"
                }
                title={
                  listening
                    ? "Click to stop and send your voice message"
                    : "Click to start speaking"
                }
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  listening
                    ? "Listening… speak your message"
                    : micSupported
                      ? "Say hi, or ask me anything…"
                      : "Type your message here…"
                }
                className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white disabled:opacity-40"
                style={{ backgroundImage: "var(--gradient-accent)" }}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Ready to talk?{" "}
              <Link
                href="/contact"
                className="font-medium text-foreground underline underline-offset-2"
              >
                Book a demo
              </Link>
              {" · "}
              <Link
                href="/app/signin"
                className="font-medium text-foreground underline underline-offset-2"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-80 flex h-14 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white shadow-lg sm:right-6"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-label={open ? "Close Dexter chat" : "Open Dexter chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Dexter"}</span>
      </button>
    </>
  );
}
