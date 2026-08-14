import { defaultContent } from "@/lib/content/defaults";
import { PRODUCTS_DATA } from "@/lib/productData";
import { RESOURCES_DATA } from "@/lib/resourceData";
import { SOLUTIONS_DATA } from "@/lib/solutionData";

export interface SiteChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface FaqPair {
  question: string;
  answer: string;
}

function homeFaqs(): FaqPair[] {
  const faq = (defaultContent.home as { faq?: FaqPair[] }).faq;
  return Array.isArray(faq) ? faq : [];
}

export function collectSiteFaqs(): FaqPair[] {
  const pairs: FaqPair[] = [...homeFaqs()];
  for (const product of Object.values(PRODUCTS_DATA)) {
    for (const faq of product.faqs) pairs.push(faq);
  }
  for (const solution of Object.values(SOLUTIONS_DATA)) {
    for (const faq of solution.faqs) pairs.push(faq);
  }
  for (const resource of Object.values(RESOURCES_DATA)) {
    for (const faq of resource.faqs) pairs.push(faq);
  }
  return pairs;
}

export function buildSiteKnowledge(): string {
  const lines: string[] = [
    "Skout AI (skoutai.io) is an AI-powered GTM platform: prospecting, enrichment, email intelligence, sequences, inbox, CRM, deliverability, and Dexter.",
    "Login / workspace: https://www.skoutai.io/app (Clerk login stays on this URL — do not send people to execute-api).",
    "Book a demo: https://www.skoutai.io/contact",
    "Pricing: https://www.skoutai.io/pricing",
  ];

  for (const product of Object.values(PRODUCTS_DATA)) {
    lines.push(`Product ${product.title}: ${product.subheadline}`);
  }
  for (const solution of Object.values(SOLUTIONS_DATA)) {
    lines.push(`Solution ${solution.title}: ${solution.subheadline}`);
  }
  for (const faq of collectSiteFaqs()) {
    lines.push(`Q: ${faq.question}\nA: ${faq.answer}`);
  }

  return lines.join("\n\n").slice(0, 12000);
}

export function wantsDemo(text: string): boolean {
  return /\b(demo|book a call|book a meeting|talk to sales|start a trial|get started|onboard)\b/i.test(
    text
  );
}

export function isSmallTalk(text: string): boolean {
  return /^(hi|hey|hello|yo|sup|howdy|good (morning|afternoon|evening)|how are you|how's it going|whats? up|who are you|what('?s| is) your name|thanks|thank you|ok(ay)?|cool|nice|lol)[\s!?.]*$/i.test(
    text.trim()
  );
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3);
}

export function matchSiteFaq(userMessage: string): FaqPair | null {
  if (isSmallTalk(userMessage)) return null;
  const words = tokenize(userMessage);
  if (!words.length) return null;
  let best: FaqPair | null = null;
  let bestScore = 0;
  for (const faq of collectSiteFaqs()) {
    const hay = tokenize(`${faq.question} ${faq.answer}`);
    const haySet = new Set(hay);
    const score = words.filter((w) => haySet.has(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }
  return bestScore >= 2 ? best : null;
}

export function fallbackReply(userMessage: string): { reply: string; suggestDemo: boolean } {
  const lower = userMessage.toLowerCase().trim();

  if (isSmallTalk(userMessage) || /how are you/.test(lower)) {
    if (/thank/.test(lower)) {
      return { suggestDemo: false, reply: "You’re welcome. What else can I help with?" };
    }
    if (/who are you|your name/.test(lower)) {
      return {
        suggestDemo: false,
        reply:
          "I’m Dexter — like a teammate in the corner of this site. Ask me anything: Skout, outbound, or just bounce an idea.",
      };
    }
    return {
      suggestDemo: false,
      reply:
        "I’m doing well — thanks for asking. What’s on your mind? I can talk product, outbound, or just help you think something through.",
    };
  }

  const demo = wantsDemo(userMessage);
  const faq = matchSiteFaq(userMessage);
  if (faq) {
    return {
      suggestDemo: demo,
      reply: faq.answer,
    };
  }

  if (demo) {
    return {
      suggestDemo: true,
      reply:
        "Sure — the easiest next step is a live walkthrough. Head to Contact and pick a time, or tell me what you want to see and I’ll point you.",
    };
  }

  if (/\b(login|log in|sign in|workspace)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply: "Tap Log in in the header — it stays on skoutai.io/app with Clerk. No extra hop.",
    };
  }

  if (/\b(email|verify|bounce|deliverability|warmup)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "We check mailboxes live (SMTP, MX, catch-all) so you don’t burn a domain. Want the short version of how that fits a sequence, or how to try it?",
    };
  }

  return {
    suggestDemo: false,
    reply:
      "Got it. Tell me a bit more about what you’re trying to do — I can talk Skout, outbound, or just think it through with you.",
  };
}

export function systemPrompt(): string {
  return `You are Dexter, a warm, quick conversational assistant on the Skout AI website — think ChatGPT or a friendly voice assistant, not a brochure.

Rules:
- Answer the message they actually sent. If they say "how are you", greet them back. Do not pitch Skout unless they ask.
- Sound human: contractions, one thought at a time, ask a short follow-up when it helps.
- Never repeat the same product paragraph. Vary replies. Use chat history.
- You can talk about everyday things, then offer Skout only if it's useful.
- Never invent Skout prices or SLAs. Demo = /contact. Login = https://www.skoutai.io/app (stay on that host).
- 1–4 short sentences unless they ask for detail.

Product context (use only when relevant):
${buildSiteKnowledge()}`;
}
