import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fallbackReply, systemPrompt, type SiteChatMessage } from "@/lib/site-chat";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
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

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
          temperature: 0.3,
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
      }
    } catch {
      // Local FAQ replies still work without OpenAI.
    }
  }

  const local = fallbackReply(lastUser.content);
  return NextResponse.json(local);
}
