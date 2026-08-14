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

export interface SitePage {
  path: string;
  title: string;
  keywords: string[];
  summary: string;
}

export const SITE_PAGES: SitePage[] = [
  {
    path: "/pricing",
    title: "Pricing",
    keywords: [
      "price",
      "prices",
      "pricing",
      "cost",
      "costs",
      "plan",
      "plans",
      "credit",
      "credits",
      "subscription",
      "free",
      "starter",
      "scale",
      "enterprise",
      "cheap",
      "fee",
      "fees",
    ],
    summary: `Skout pricing (https://www.skoutai.io/pricing):
- FREE: $0/mo — 1,000 emails/month & prospect search, basic CRM, CSV import/export, manual sequence builder & tracking. For founders starting outbound.
- STARTER: $54/mo — 5,000 enrichment credits/month, automated multi-step email sequences, smart lists, reply detection & unified inbox.
- SCALE: $79/mo (most popular) — 15,000 enrichment credits & mailbox rotation, multi-channel Email + LinkedIn + Calls, AI prospect research, 2-way HubSpot sync.
- ENTERPRISE: custom — custom volumes, multiple workspaces, SSO, custom fields, API, webhooks, dedicated success. CTA: Talk to Sales on /contact.
Annual and extra credit packs may be discussed on a demo. Direct people to /pricing for the full comparison table.`,
  },
  {
    path: "/contact",
    title: "Book a demo",
    keywords: ["demo", "contact", "calendar", "book", "meeting", "walkthrough", "sales"],
    summary:
      "Book a live demo on https://www.skoutai.io/contact — use the calendar or leave a note and the team follows up.",
  },
  {
    path: "/integrations",
    title: "Integrations",
    keywords: ["integration", "hubspot", "calendar", "google", "byok", "crm sync", "connect"],
    summary:
      "Skout connects with HubSpot CRM sync, Google Calendar for meetings, and BYOK (bring your own AI keys). See https://www.skoutai.io/integrations.",
  },
  {
    path: "/features",
    title: "Features",
    keywords: ["feature", "features", "platform", "what can", "capabilities"],
    summary:
      "Feature overview lives at https://www.skoutai.io/features — prospecting, enrichment, sequences, inbox, CRM, Dexter.",
  },
  {
    path: "/intelligence",
    title: "Intelligence",
    keywords: ["intelligence", "waterfall", "verification", "smtp", "signals", "intent"],
    summary:
      "Intelligence architecture: multi-source data → SMTP/DNS verification → account graph → signals → ICP decide → outreach/CRM. https://www.skoutai.io/intelligence",
  },
];

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

function productPages(): SitePage[] {
  return Object.values(PRODUCTS_DATA).map((p) => ({
    path: `/products/${p.slug}`,
    title: p.title,
    keywords: [...p.slug.split("-"), ...p.title.toLowerCase().split(/\s+/)].filter(
      (w) => w.length > 4
    ),
    summary: `${p.title} (${p.category}): ${p.subheadline} Page: https://www.skoutai.io/products/${p.slug}`,
  }));
}

function solutionPages(): SitePage[] {
  return Object.values(SOLUTIONS_DATA).map((s) => ({
    path: `/solutions/${s.slug}`,
    title: s.title,
    keywords: [...s.slug.split("-"), ...s.title.toLowerCase().split(/\s+/)].filter(
      (w) => w.length > 4
    ),
    summary: `${s.title}: ${s.subheadline} Page: https://www.skoutai.io/solutions/${s.slug}`,
  }));
}

export function allSitePages(): SitePage[] {
  return [...SITE_PAGES, ...productPages(), ...solutionPages()];
}

export function buildSiteKnowledge(): string {
  const lines: string[] = [
    "Official site: https://www.skoutai.io — answer using these pages. Login: https://www.skoutai.io/app",
  ];
  for (const page of allSitePages()) {
    lines.push(`${page.title} ${page.path}: ${page.summary}`);
  }
  for (const faq of collectSiteFaqs()) {
    lines.push(`Q: ${faq.question}\nA: ${faq.answer}`);
  }
  return lines.join("\n\n").slice(0, 16000);
}

export function wantsDemo(text: string): boolean {
  if (/\b(pric|cost|plan|credit)\w*/i.test(text)) return false;
  return /\b(book a demo|schedule a demo|live demo|talk to sales|book a call|book a meeting)\b/i.test(
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
    .filter((w) => w.length > 2);
}

export function matchSitePage(userMessage: string): SitePage | null {
  const lower = userMessage.toLowerCase();
  const words = new Set(tokenize(userMessage));
  let best: SitePage | null = null;
  let bestScore = 0;
  for (const page of allSitePages()) {
    let score = 0;
    for (const kw of page.keywords) {
      const k = kw.toLowerCase();
      if (k.length < 5) continue;
      if (lower.includes(k) || words.has(k)) score += 2;
    }
    if (lower.includes(page.title.toLowerCase())) score += 3;
    if (score > bestScore) {
      bestScore = score;
      best = page;
    }
  }
  return bestScore >= 2 ? best : null;
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

  if (isSmallTalk(userMessage) || /^(how are you)\b/i.test(lower)) {
    if (/thank/.test(lower)) {
      return { suggestDemo: false, reply: "You’re welcome. What else can I help with?" };
    }
    if (/who are you|your name/.test(lower)) {
      return {
        suggestDemo: false,
        reply:
          "I’m Dexter — I know this website. Ask about pricing, products, integrations, or anything on a page.",
      };
    }
    return {
      suggestDemo: false,
      reply:
        "I’m doing well — thanks for asking. Want pricing, a product walkthrough, or help booking a demo?",
    };
  }

  if (/\b(email|emails|verify|verification|bounce|deliverability|warmup|smtp)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Skout verifies emails with live SMTP, MX, and catch-all checks (Email Intelligence) before you send. See Intelligence and deliverability on the site: https://www.skoutai.io/intelligence",
    };
  }

  const page = matchSitePage(userMessage);
  if (page) {
    return {
      suggestDemo: page.path === "/contact",
      reply: page.summary,
    };
  }

  const faq = matchSiteFaq(userMessage);
  if (faq) {
    return { suggestDemo: false, reply: faq.answer };
  }

  if (wantsDemo(userMessage)) {
    return {
      suggestDemo: true,
      reply:
        "You can book a live demo on the Contact page (https://www.skoutai.io/contact) — pick a time on the calendar. Want me to recap what you’ll see on the call?",
    };
  }

  if (/\b(login|log in|sign in)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply: "Log in at https://www.skoutai.io/app — Clerk opens on that same URL.",
    };
  }

  return {
    suggestDemo: false,
    reply:
      "I can pull from any page on this site — pricing, products, solutions, integrations, or how to book a demo. What should we open?",
  };
}

export function systemPrompt(): string {
  return `You are Dexter on skoutai.io. Answer from the site content below. Be specific: quote real plan names and prices when asked about pricing. Name the page URL. Do not give a vague “tell me more” if the answer is in the content.
Greetings stay greetings. Use chat history; do not repeat yourself. Login stays https://www.skoutai.io/app.

SITE CONTENT:
${buildSiteKnowledge()}`;
}
