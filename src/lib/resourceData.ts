export interface SimpleStep {
  number: string;
  title: string;
  desc: string;
  code?: string;
  tips?: string[];
}

export interface SetupCategory {
  id: string;
  iconName?: string;
  title: string;
  badge: string;
  summary: string;
  time: string;
  steps: SimpleStep[];
}

export interface ResourceData {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineGradient: string;
  subheadline: string;
  categories: SetupCategory[];
  faqs: Array<{ question: string; answer: string }>;
}

export const RESOURCES_DATA: Record<string, ResourceData> = {
  "gtm-outbound-calculator": {
    slug: "gtm-outbound-calculator",
    title: "GTM Outbound ROI & Cost Calculator",
    eyebrow: "Interactive Tool",
    headline: "GTM Outbound Cost Calculator",
    headlineGradient: "estimate contact sourcing, enrichment & inbox tooling costs.",
    subheadline:
      "Calculate contact sourcing, email finding, verification, and inbox infrastructure costs for your outbound strategy. See how much you save with Skout AI's unified GTM platform.",
    categories: [],
    faqs: [
      {
        question: "How does the GTM Outbound Cost Calculator work?",
        answer:
          "The calculator estimates target contact sourcing, email finding, verification, and inbox platform costs based on your target booked meetings and industry benchmark conversion rates.",
      },
      {
        question: "Why does Skout AI save money compared to a fragmented stack?",
        answer:
          "Fragmented stacks require paying separate per-contact and per-seat subscriptions to Apollo, Hunter, ZeroBounce, and Smartlead. Skout AI unifies all 4 engines into a flat-rate workspace.",
      },
    ],
  },

  "setup-guides": {
    slug: "setup-guides",
    title: "Skout AI Setup Guide",
    eyebrow: "Quick Start Guide",
    headline: "Get started with Skout AI",
    headlineGradient: "in 4 simple steps.",
    subheadline:
      "Everything you need to set up your sending domain, define your ICP, install the Chrome extension, and launch your first outbound campaign.",
    categories: [
      {
        id: "mailbox",
        iconName: "ShieldCheck",
        title: "1. Domain & Mailbox Setup",
        badge: "Essential",
        summary:
          "Authenticate your sending domain and connect Google/Outlook mailboxes for maximum inbox deliverability.",
        time: "5 mins",
        steps: [
          {
            number: "01",
            title: "Add SPF & DKIM DNS Records",
            desc: "In your domain registrar (Cloudflare, GoDaddy, Namecheap), add the following TXT record to verify email sending authorization.",
            code: "v=spf1 include:_spf.google.com include:skoutai.io ~all",
            tips: ["Protects your domain reputation", "Takes 5–10 mins to propagate"],
          },
          {
            number: "02",
            title: "Connect Sending Mailbox",
            desc: "Go to Settings → Mailboxes → Connect Account. Sign in with Google Workspace or Microsoft 365 via 1-click OAuth.",
            tips: ["Recommended daily sending limit: 30–35 emails/day per mailbox"],
          },
          {
            number: "03",
            title: "Turn On Automated Warmup",
            desc: "Enable peer-to-peer automated warmup to keep your emails landing in the primary inbox.",
          },
        ],
      },
      {
        id: "icp",
        iconName: "Target",
        title: "2. ICP Prospecting & Smart Lists",
        badge: "Sourcing",
        summary:
          "Build targeted prospect lists based on job titles, company size, and technographic stack.",
        time: "3 mins",
        steps: [
          {
            number: "01",
            title: "Set Search Filters",
            desc: "In Prospects → Search, filter by job titles (e.g. VP Sales, CTO), headcount (50–500), and tech stack.",
          },
          {
            number: "02",
            title: "Save as Smart List",
            desc: "Click 'Save as Smart List' to enable auto-ingestion. New matching contacts will populate automatically.",
          },
        ],
      },
      {
        id: "extension",
        iconName: "Chrome",
        title: "3. Chrome Extension V3",
        badge: "LinkedIn",
        summary: "Install the Skout Extension to capture and enrich leads directly on LinkedIn.",
        time: "2 mins",
        steps: [
          {
            number: "01",
            title: "Install Extension",
            desc: "Add Skout AI Prospector from Chrome Web Store or developer drawer into Google Chrome.",
          },
          {
            number: "02",
            title: "1-Click Capture on Profile Pages",
            desc: "Open any LinkedIn profile or search list. Use the sidepanel to enrich emails and save to Smart Lists in 1 click.",
          },
        ],
      },
      {
        id: "crm-ai",
        iconName: "Bot",
        title: "4. CRM Sync & Dexter AI",
        badge: "Automation",
        summary:
          "Connect your HubSpot CRM and configure Dexter AI for automated prospect research.",
        time: "4 mins",
        steps: [
          {
            number: "01",
            title: "Connect HubSpot CRM",
            desc: "In Settings → Integrations, click Connect HubSpot to enable 2-way contact and deal sync.",
          },
          {
            number: "02",
            title: "Activate Dexter AI Copilot",
            desc: "Dexter AI automatically summarizes prospect threads, scores lead fit, and suggests personalized follow-ups.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How long does complete setup take?",
        answer:
          "Initial setup takes under 15 minutes. Connecting mailboxes and DNS records takes ~5 minutes.",
      },
      {
        question: "Need help with onboarding?",
        answer:
          "You can book a 1-on-1 setup session with our team anytime from the bottom of this page.",
      },
    ],
  },
};
