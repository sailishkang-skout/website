"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = ["What does Skout do?", "How do you verify emails?", "I want to book a demo"];

export function SiteAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Dexter. Ask about Skout, email verification, sequences, or book a demo when you’re ready.",
    },
  ]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const next: Turn[] = [...turns, { role: "user", content }];
    setTurns(next);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((t) => ({ role: t.role, content: t.content })),
        }),
      });
      const json = (await res.json()) as { reply?: string; message?: string };
      setTurns([
        ...next,
        {
          role: "assistant",
          content: json.reply ?? json.message ?? "I couldn’t answer just then — try the Contact page.",
        },
      ]);
    } catch {
      setTurns([
        ...next,
        { role: "assistant", content: "Connection issue. You can still book a demo on Contact." },
      ]);
    } finally {
      setPending(false);
    }
  }

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
                <p className="text-[11px] text-white/80">Product questions · book a demo</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-background/80 px-4 py-3">
            {turns.map((t, i) => (
              <div
                key={`${t.role}-${i}`}
                className={t.role === "user" ? "ml-6 text-right" : "mr-6"}
              >
                <p
                  className={`inline-block rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    t.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {t.content}
                </p>
              </div>
            ))}
            {pending && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
              </p>
            )}
          </div>

          <div className="border-t border-border bg-card px-3 py-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Skout…"
                className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
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
