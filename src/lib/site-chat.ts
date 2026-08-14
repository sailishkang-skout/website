export interface SiteChatMessage {
  role: "user" | "assistant";
  content: string;
}

const PRODUCT_FACTS = `
Skout AI is an AI-powered GTM (go-to-market) platform for B2B outbound.
It helps teams find the right prospects, enrich accounts, personalize outreach, verify emails, and manage pipeline.

Core products:
- Prospect discovery and ICP targeting
- Contact enrichment and email verification (Email Intelligence)
- Outreach sequences (email + LinkedIn), including A/B tests and Dexter AI
- CRM, deals, tasks, Google Calendar meetings
- Deliverability, inbox, and click-to-call
- TAM / market coverage
- Dexter: AI sales intelligence assistant inside the product workspace

Website: https://skoutai.io
Login / workspace: https://ckoy6iywm0.execute-api.us-east-1.amazonaws.com/
Book a demo / contact: https://skoutai.io/contact
Pricing: https://skoutai.io/pricing
Features: https://skoutai.io/features
Integrations: https://skoutai.io/integrations
`.trim();

export function wantsDemo(text: string): boolean {
  return /\b(demo|book|call|meeting|talk to|sales|trial|pricing|get started|onboard)\b/i.test(text);
}

export function fallbackReply(userMessage: string): { reply: string; suggestDemo: boolean } {
  const demo = wantsDemo(userMessage);
  const lower = userMessage.toLowerCase();

  if (demo) {
    return {
      suggestDemo: true,
      reply:
        "Happy to help you get a walkthrough. Book a live demo on the Contact page — pick a time on the calendar, or leave a note and the team will follow up. I can also answer product questions here first.",
    };
  }

  if (/\b(email|verify|bounce|deliverability|warmup)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Skout verifies emails with a separate Email Intelligence service (SMTP, MX, catch-all, send-eligibility) so you don’t burn domains. In the product, verification runs on lists and when adding prospects. Want a demo of that flow?",
    };
  }

  if (/\b(sequence|outreach|linkedin|dexter)\b/.test(lower)) {
    return {
      suggestDemo: false,
      reply:
        "Sequences mix email, LinkedIn, waits, and conditions. You can start from a template, Dexter, or God Mode. A/B tests and LinkedIn invite fallbacks are built in. I can point you to a demo if you want to see the builder.",
    };
  }

  if (/\b(price|cost|credit)\b/.test(lower)) {
    return {
      suggestDemo: true,
      reply:
        "Plans and credits are on the Pricing page. Early customers often start with a guided demo so we can size credits to your outbound volume. Want me to send you to booking?",
    };
  }

  return {
    suggestDemo: false,
    reply:
      "Skout AI is one workspace for finding, verifying, and reaching B2B prospects — search, enrich, sequences, CRM, and Dexter. Ask me about features, email verification, or sequences — or book a demo when you’re ready.",
  };
}

export function systemPrompt(): string {
  return `You are Dexter, the Skout AI website assistant. Be concise (2–4 short sentences), friendly, and specific.
Use only these product facts:\n${PRODUCT_FACTS}
If the visitor wants a demo, trial, pricing discussion, or to talk to sales, encourage booking at /contact.
Never invent pricing numbers or SLAs. Do not claim you can log them into the product.`;
}
