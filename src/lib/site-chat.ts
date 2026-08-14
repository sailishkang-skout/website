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

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "about",
  "something",
  "tell",
  "me",
  "what",
  "where",
  "when",
  "which",
  "who",
  "how",
  "can",
  "you",
  "your",
  "our",
  "are",
  "is",
  "was",
  "have",
  "has",
  "had",
  "should",
  "would",
  "could",
  "take",
  "find",
  "any",
  "this",
  "that",
  "with",
  "from",
  "into",
  "onto",
  "just",
  "please",
  "want",
  "need",
  "give",
  "some",
  "more",
  "hello",
  "hey",
  "hi",
  "yes",
  "no",
  "okay",
  "ok",
  "also",
  "like",
  "get",
  "got",
  "let",
  "know",
  "open",
  "show",
  "page",
  "pages",
  "site",
  "website",
  "skout",
]);

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
      "starter",
      "scale",
      "enterprise",
      "cheap",
      "fees",
    ],
    summary: `Here’s Skout pricing on [Pricing](/pricing):

- **Free** — $0 per month. 1,000 emails and prospect searches each month, basic CRM, CSV import/export, and a manual sequence builder. Built for founders starting outbound.
- **Starter** — $54 per month. 5,000 enrichment credits each month, automated multi-step email sequences, smart lists, reply detection, and a unified inbox.
- **Scale** — $79 per month (most popular). 15,000 enrichment credits, mailbox rotation, email plus LinkedIn plus calls, AI prospect research, and two-way HubSpot sync.
- **Enterprise** — custom pricing. Custom volumes, multiple workspaces, SSO, custom fields, API, webhooks, and a dedicated success team. Talk to sales on [Contact](/contact).

Annual billing and extra credit packs are easiest to cover on a demo. The comparison table is on [Pricing](/pricing).`,
  },
  {
    path: "/contact",
    title: "Book a demo",
    keywords: ["demo", "contact", "calendar", "book", "meeting", "walkthrough", "sales"],
    summary:
      "You can book a live walkthrough on [Contact](/contact) — pick a time on the calendar, or leave a note and the team follows up.",
  },
  {
    path: "/integrations",
    title: "Integrations",
    keywords: [
      "integration",
      "integrations",
      "hubspot",
      "calendar",
      "google",
      "byok",
      "connect",
      "gmail",
      "outlook",
      "snowflake",
      "webhook",
      "webhooks",
    ],
    summary: `Skout is built to sit in your revenue stack. Full list on [Integrations](/integrations):

- **HubSpot** — two-way sync for contacts, companies, deals, and activity
- **Google Workspace / Gmail** and **Microsoft 365 / Outlook** — sending mailboxes over OAuth
- **Chrome extension** — capture and enrich LinkedIn prospects
- **Google Calendar** — meetings and attribution
- **Bring your own keys** — OpenAI and Anthropic for Dexter
- **Snowflake**, plus **webhooks and REST API** for custom workflows`,
  },
  {
    path: "/features",
    title: "Features",
    keywords: ["feature", "features", "platform", "capabilities"],
    summary:
      "The platform covers prospecting, enrichment, sequences, inbox, CRM, and Dexter. Browse the overview on [Features](/features).",
  },
  {
    path: "/intelligence",
    title: "Intelligence",
    keywords: ["intelligence", "waterfall", "verification", "smtp", "signals", "intent"],
    summary:
      "Intelligence architecture: multi-source data, SMTP and DNS verification, account graph, signals, then ICP decide and outreach. Details on [Intelligence](/intelligence).",
  },
  {
    path: "/resources",
    title: "Resources",
    keywords: ["resource", "resources", "library", "help", "docs", "documentation"],
    summary: `Here’s where the help lives:

- **Setup guides** — domain, mailboxes, ICP lists, Chrome extension, HubSpot. [Guides](/guides) (same content as [Setup guides](/resources/setup-guides))
- **GTM outbound calculator** — estimate sourcing, enrichment, and inbox cost. [Calculator](/resources/gtm-outbound-calculator)

Want a specific guide, or the calculator?`,
  },
  {
    path: "/guides",
    title: "Setup guides",
    keywords: [
      "guide",
      "guides",
      "setup",
      "onboarding",
      "dkim",
      "spf",
      "mailbox",
      "dns",
      "tutorial",
    ],
    summary: `The setup guides walk a new workspace in four parts ([Guides](/guides)):

1. **Domain and mailbox** — SPF, DKIM, connect Google or Outlook, turn on warmup
2. **ICP and smart lists** — search filters, then save a living list
3. **Chrome extension** — capture LinkedIn profiles into Skout
4. **CRM and Dexter** — HubSpot sync and the copilot

Same page also lives at [Setup guides](/resources/setup-guides). Initial setup is usually under 15 minutes.`,
  },
  {
    path: "/resources/gtm-outbound-calculator",
    title: "GTM outbound calculator",
    keywords: ["calculator", "roi", "gtm", "tooling", "fragmented"],
    summary:
      "The GTM outbound calculator estimates contact sourcing, email finding, verification, and inbox costs versus a fragmented stack. Open [the calculator](/resources/gtm-outbound-calculator).",
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
      (w) => w.length > 4 && !STOPWORDS.has(w)
    ),
    summary: `**${p.title}** (${p.category}): ${p.subheadline}\n\nRead more: [this product page](/products/${p.slug}).`,
  }));
}

function solutionPages(): SitePage[] {
  return Object.values(SOLUTIONS_DATA).map((s) => ({
    path: `/solutions/${s.slug}`,
    title: s.title,
    keywords: [...s.slug.split("-"), ...s.title.toLowerCase().split(/\s+/)].filter(
      (w) => w.length > 4 && !STOPWORDS.has(w)
    ),
    summary: `**${s.title}:** ${s.subheadline}\n\nRead more: [this solution page](/solutions/${s.slug}).`,
  }));
}

export function allSitePages(): SitePage[] {
  return [...SITE_PAGES, ...productPages(), ...solutionPages()];
}

export function buildSiteKnowledge(): string {
  const lines: string[] = [
    "Official site: https://www.skoutai.io. Login: https://www.skoutai.io/app/signin. Use markdown lists. Write “per month”, never “/mo”. Link internally like [Pricing](/pricing).",
  ];
  for (const page of allSitePages()) {
    lines.push(`${page.title} ${page.path}: ${page.summary}`);
  }
  for (const faq of collectSiteFaqs()) {
    lines.push(`Q: ${faq.question}\nA: ${faq.answer}`);
  }
  return lines.join("\n\n").slice(0, 18000);
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

export function isIncompleteAsk(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 8) return true;
  if (
    /^(can you|could you|please|i want to|take me to|go to|what about|tell me about)[\s.?!]*$/i.test(
      trimmed
    )
  ) {
    return true;
  }
  return contentTokens(trimmed).length === 0;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2);
}

function contentTokens(text: string): string[] {
  return tokenize(text).filter((w) => !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

export function matchSitePage(userMessage: string): SitePage | null {
  const lower = userMessage.toLowerCase();
  const words = new Set(tokenize(userMessage));

  if (/\b(guides?|setup guides?|documentation|docs)\b/i.test(lower)) {
    return SITE_PAGES.find((p) => p.path === "/guides") ?? null;
  }
  if (/\bresources?\b/i.test(lower)) {
    return SITE_PAGES.find((p) => p.path === "/resources") ?? null;
  }
  if (/\bintegrations?\b/i.test(lower)) {
    return SITE_PAGES.find((p) => p.path === "/integrations") ?? null;
  }
  if (/\b(pricing|prices|plans?|how much)\b/i.test(lower)) {
    return SITE_PAGES.find((p) => p.path === "/pricing") ?? null;
  }
  if (/\bcalculator\b/i.test(lower)) {
    return SITE_PAGES.find((p) => p.path === "/resources/gtm-outbound-calculator") ?? null;
  }

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
  if (isSmallTalk(userMessage) || isIncompleteAsk(userMessage)) return null;
  const words = contentTokens(userMessage);
  if (words.length < 2) return null;
  let best: FaqPair | null = null;
  let bestScore = 0;
  for (const faq of collectSiteFaqs()) {
    const questionSet = new Set(contentTokens(faq.question));
    const answerSet = new Set(contentTokens(faq.answer));
    const qHits = words.filter((w) => questionSet.has(w)).length;
    const aHits = words.filter((w) => answerSet.has(w)).length;
    const score = qHits * 3 + aHits;
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }
  return bestScore >= 6 && words.filter((w) => new Set(contentTokens(best?.question ?? "")).has(w)).length >= 1
    ? best
    : null;
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
          "I’m Dexter — I know this website. Ask about pricing, products, integrations, guides, or resources.",
      };
    }
    return {
      suggestDemo: false,
      reply:
        "I’m doing well — thanks for asking. Want pricing, a product walkthrough, or help booking a demo?",
    };
  }

  if (/what can you (help with|do)|how can you help|what should we open/i.test(lower)) {
    return {
      suggestDemo: false,
      reply: `I can walk you through this site. Popular starting points:

- [Pricing](/pricing)
- [Integrations](/integrations)
- [Setup guides](/guides)
- [Resources](/resources)
- [Book a demo](/contact)`,
    };
  }

  if (isIncompleteAsk(userMessage) && !matchSitePage(userMessage)) {
    return {
      suggestDemo: false,
      reply:
        "Happy to. Which page should I open — pricing, integrations, setup guides, resources, or a product?",
    };
  }

  if (/\b(email|emails|verify|verification|bounce|deliverability|warmup|smtp)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Skout verifies emails with live SMTP, MX, and catch-all checks (Email Intelligence) before you send. See [Intelligence](/intelligence).",
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
        "You can book a live demo on [Contact](/contact) — pick a time on the calendar. Want a recap of what you’ll see on the call?",
    };
  }

  if (/\b(login|log in|sign in)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply: "Log in at [the app](/app/signin).",
    };
  }

  return {
    suggestDemo: false,
    reply:
      "I can walk you through this site. Try **pricing**, **integrations**, **setup guides**, **resources**, or booking a demo. What should we open?",
  };
}

export function systemPrompt(): string {
  return `You are Dexter on skoutai.io. Answer only from the site content below.

Style:
- Sound like a helpful teammate, not a brochure.
- Format with markdown: short intro, then bullet or numbered lists when comparing plans or listing pages.
- Write prices as “$54 per month”, never “$54/mo” or “/Mo”.
- Use internal links like [Pricing](/pricing), [Guides](/guides), [Resources](/resources), [Integrations](/integrations). Do not paste raw https URLs.
- If they ask for resources or guides, send them to those pages — never invent an unrelated CRM or Chrome answer.
- Incomplete questions (“can you take me to the…”) get a short clarifying question, not a random FAQ.
- Greetings stay greetings. Use chat history; do not repeat yourself.
- Login is https://www.skoutai.io/app/signin.

SITE CONTENT:
${buildSiteKnowledge()}`;
}
