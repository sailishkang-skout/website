import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fallbackReply, systemPrompt, type SiteChatMessage } from "@/lib/site-chat";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid chat payload" }, { status: 422 });
  }

  const messages = parsed.data.messages as SiteChatMessage[];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ message: "A user message is required" }, { status: 422 });
  }

  // OpenRouter (OpenAI-compatible /chat/completions) — same provider/pattern already used
  // in Skout AI Backend's apps/crm transcript-extraction.service.ts. Falls back to OPENAI_API_KEY
  // calling OpenAI directly if that's what's configured instead.
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const provider = openRouterKey
    ? {
        url: "https://openrouter.ai/api/v1/chat/completions",
        key: openRouterKey,
        model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
        extraHeaders: { "HTTP-Referer": "https://skoutai.io", "X-Title": "Skout AI" } as Record<
          string,
          string
        >,
      }
    : openAiKey
      ? {
          url: "https://api.openai.com/v1/chat/completions",
          key: openAiKey,
          model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
          extraHeaders: {} as Record<string, string>,
        }
      : null;

  if (provider) {
    try {
      const res = await fetch(provider.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.key}`,
          "Content-Type": "application/json",
          ...provider.extraHeaders,
        },
        body: JSON.stringify({
          model: provider.model,
          temperature: 0.4,
          max_tokens: 500,
          messages: [{ role: "system", content: systemPrompt() }, ...messages.slice(-12)],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return NextResponse.json({
            reply,
            suggestDemo:
              /\b(demo|contact|book|calendar)\b/i.test(reply) ||
              /\b(demo|book|call|sales|trial|pricing)\b/i.test(lastUser.content),
          });
        }
        console.error("[chat] LLM returned no reply content", data);
      } else {
        console.error("[chat] LLM request failed", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      // Local FAQ replies still work without a working LLM call.
      console.error("[chat] LLM request threw", err);
    }
  }

  const local = fallbackReply(lastUser.content);
  return NextResponse.json(local);
}
