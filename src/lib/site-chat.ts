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
    "Login / workspace: https://www.skoutai.io/app",
    "Log in: https://www.skoutai.io/app/login",
    "Book a demo: https://www.skoutai.io/contact",
    "Pricing: https://www.skoutai.io/pricing",
    "Integrations: HubSpot, Google Calendar, BYOK.",
  ];

  for (const product of Object.values(PRODUCTS_DATA)) {
    lines.push(
      `Product ${product.title} (/products/${product.slug}): ${product.subheadline}`
    );
  }
  for (const solution of Object.values(SOLUTIONS_DATA)) {
    lines.push(
      `Solution ${solution.title} (/solutions/${solution.slug}): ${solution.subheadline}`
    );
  }
  for (const faq of collectSiteFaqs()) {
    lines.push(`Q: ${faq.question}\nA: ${faq.answer}`);
  }

  return lines.join("\n\n").slice(0, 14000);
}

export function wantsDemo(text: string): boolean {
  return /\b(demo|book|call|meeting|talk to|sales|trial|pricing|get started|onboard)\b/i.test(
    text
  );
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3);
}

export function matchSiteFaq(userMessage: string): FaqPair | null {
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
  const demo = wantsDemo(userMessage);
  const faq = matchSiteFaq(userMessage);
  if (faq) {
    return {
      suggestDemo: demo,
      reply: `${faq.answer}${demo ? " You can book a live demo at /contact, or log in at /app." : ""}`,
    };
  }

  const lower = userMessage.toLowerCase();

  if (demo) {
    return {
      suggestDemo: true,
      reply:
        "Happy to help you get a walkthrough. Book a live demo on the Contact page, or log in to the workspace at /app. I can also answer product questions from this site first.",
    };
  }

  if (/\b(login|log in|sign in|workspace|app)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Use Log in in the header, or go to https://www.skoutai.io/app/login — that opens the Skout workspace at https://www.skoutai.io/app.",
    };
  }

  if (/\b(email|verify|bounce|deliverability|warmup)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Skout verifies emails with Email Intelligence (SMTP, MX, catch-all, send-eligibility) so you don’t burn domains. Verification runs on lists and when adding prospects. Deliverability and warmup live under Engage. Want a demo of that flow?",
    };
  }

  if (/\b(sequence|outreach|linkedin|dexter)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Sequences mix email, LinkedIn, waits, and conditions. Dexter is the GTM intelligence layer — on this site I can explain the product, and inside the workspace Dexter works with your live data. Book a demo if you want to see the builder.",
    };
  }

  return {
    suggestDemo: false,
    reply:
      "Skout AI is one workspace for finding, verifying, and reaching B2B prospects — search, enrich, sequences, CRM, and Dexter. Ask about any page on skoutai.io (products, solutions, pricing, integrations), or book a demo / log in at /app.",
  };
}

export function systemPrompt(): string {
  return `You are Dexter, the Skout AI website assistant. Be concise (2–5 short sentences), friendly, and specific.
Answer using this website knowledge, and you may also answer general GTM/sales questions, then relate them to Skout when relevant.
Never invent Skout pricing numbers or SLAs. For demos, point to /contact. For login, point to https://www.skoutai.io/app.

Website knowledge:
${buildSiteKnowledge()}`;
}
