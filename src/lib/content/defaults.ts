export const defaultContent: Record<string, Record<string, unknown>> = {
  home: {
    hero: {
      eyebrow: "Issue 01 · Revenue Intelligence",
      title: "Find the right\npeople.",
      titleHighlight: "Faster.",
      description:
        "Skout AI is the unified data layer for modern revenue teams — 200M verified contacts, real-time enrichment, intent signals and multi-channel outreach in one place.",
      primaryCta: { text: "Start free", href: "/contact" },
      secondaryCta: { text: "Tour the platform →", href: "/features" },
      stats: [
        { key: "200M+", value: "Verified contacts" },
        { key: "45M+", value: "Companies tracked" },
        { key: "98.5%", value: "Email accuracy" },
        { key: "<400ms", value: "Avg enrichment" },
      ],
    },
    platform: {
      eyebrow: "The platform",
      title: "A modular",
      titleHighlight: "revenue stack.",
      description: "Pick the pieces you need — they're built to compose, not collide.",
      bigCard: {
        tag: "Prospect Graph",
        title: "200M people.",
        titleItalic: "40+ filters.",
        subtitle: "One search bar.",
        description:
          "Firmographics, technographics, hiring signals and intent — combined into one queryable graph that updates every 4 hours.",
      },
      enrichmentCard: {
        title: "Waterfall enrichment",
        description:
          "Query 12 vendors in priority order. Pay only for the first verified match.",
      },
      verificationCard: {
        title: "Real-time verification",
        description: "SMTP + catch-all + risk scoring. 98.5% deliverability.",
      },
      outreachCard: {
        tag: "Outreach engine",
        title: "Multi-channel cadences",
        titleItalic: "that actually land.",
        description:
          "Email, LinkedIn and calls in one sequence — with native warm-up and inbox rotation.",
      },
      intentCard: {
        tag: "Buyer intent",
        title: "Reach accounts",
        titleHighlight: "before",
        subtitle: "they fill out forms.",
        description:
          "Track 5,000+ B2B topics and get surge alerts for accounts in-market right now.",
      },
    },
    manifesto: {
      text: "Modern revenue teams glue together five vendors just to ship one outbound play. We thought that was nuts — so we built Skout AI as one connected system, priced for results, not seats.",
      highlight: "five vendors",
      italic: "one connected system",
    },
    extras: {
      eyebrow: "Also in the box",
      title: "Eight more things",
      titleItalic: "you'd usually pay extra for.",
      items: [
        { title: "Chrome extension" },
        { title: "Open API & webhooks" },
        { title: "Pipeline analytics" },
        { title: "GDPR & CCPA flows" },
        { title: "AI research agent" },
        { title: "Job change alerts" },
        { title: "Deliverability suite" },
        { title: "Warehouse sync" },
      ],
    },
    cta: {
      title: "Replace 5 tools.",
      titleHighlight: "Ship this week.",
      description: "50 free credits. No credit card. Cancel anytime.",
      primaryCta: { text: "Get started", href: "/contact" },
      secondaryCta: { text: "See pricing", href: "/pricing" },
    },
  },

  about: {
    hero: {
      eyebrow: "The company",
      title: "Rebuilding the",
      titleHighlight: "B2B data stack",
      titleSuffix: "— from the schema up.",
      description:
        "Modern revenue teams glue together five vendors just to ship one outbound campaign. We thought that was nuts — so we built Skout AI. One graph, one bill, one workflow.",
      primaryCta: { text: "Work with us", href: "/contact" },
      secondaryCta: { text: "Explore the product", href: "/features" },
      stats: [
        { key: "2024", value: "Founded" },
        { key: "40+", value: "Countries" },
        { key: "$18M", value: "Series A" },
        { key: "3,200+", value: "Teams" },
        { key: "98.5%", value: "Accuracy" },
        { key: "9", value: "Timezones" },
      ],
    },
    manifesto: {
      eyebrow: "Manifesto",
      title: "We believe",
      titleHighlight: "data is a craft,",
      titleSuffix: "not a CSV.",
      paragraphs: [
        "For two decades the B2B data industry sold volume. Bigger lists. More rows. More seats. The result: bloated CRMs, bounced emails, and revenue teams who trust nothing.",
        "Skout AI is a bet in the other direction. Fewer signals, verified deeper. Sources stitched into one graph. Workflows composed instead of stitched together.",
        "We don't think this is the end state. But it's the right next one.",
      ],
    },
    values: {
      eyebrow: "Values",
      title: "Four rules we don't break.",
      items: [
        {
          number: "01",
          title: "Data with consent",
          description:
            "We only ingest public and consented signals. Privacy is a product feature, not a policy page.",
        },
        {
          number: "02",
          title: "One bill, no surprises",
          description:
            "Transparent credit pricing. No per-seat tax, no usage shock at quarter end.",
        },
        {
          number: "03",
          title: "Quality over volume",
          description:
            "98.5% verified accuracy beats one billion unverified rows every single quarter.",
        },
        {
          number: "04",
          title: "Open by default",
          description:
            "Your data flows out as easily as in — REST, GraphQL, exports, warehouse sync.",
        },
      ],
    },
    timeline: {
      eyebrow: "Timeline",
      title: "A short,",
      titleHighlight: "fast",
      titleSuffix: "story.",
      subtitle: "Two years in. Plenty left to build.",
      items: [
        {
          year: "2024",
          time: "Spring",
          description: "Founded by ex-RevOps leaders frustrated with five-vendor outbound stacks.",
        },
        {
          year: "2024",
          time: "Summer",
          description: "First 100 design partners. Waterfall enrichment ships in private beta.",
        },
        {
          year: "2024",
          time: "Winter",
          description: "Public launch. 1,200 teams across 22 countries onboard in 90 days.",
        },
        {
          year: "2025",
          time: "Spring",
          description: "$18M Series A. Native CRM, warehouse and AI SDR agent shipped.",
        },
        {
          year: "2026",
          time: "Today",
          description: "3,200+ revenue teams. SOC 2 Type II. Nine timezones, one mission.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Operators,",
      titleHighlight: "not pundits.",
      members: [
        { name: "Ava Larsen", role: "Co-founder & CEO", location: "Oslo" },
        { name: "Mateo Rivera", role: "Co-founder & CTO", location: "Lisbon" },
        { name: "Priya Shah", role: "Head of Product", location: "Bangalore" },
        { name: "Jonas Weber", role: "Head of Data", location: "London" },
        { name: "Mira Tanaka", role: "Design Director", location: "Tokyo" },
        { name: "Léa Dupont", role: "Head of GTM", location: "Paris" },
      ],
    },
    press: {
      eyebrow: "Featured in",
      publications: ["TechCrunch", "Forbes", "The Information", "Sifted", "Bloomberg"],
    },
    cta: {
      eyebrow: "Join us",
      title: "Help us build the",
      titleHighlight: "last data tool",
      titleSuffix: "your team installs.",
      primaryCta: { text: "Get in touch", href: "/contact" },
      secondaryCta: { text: "See pricing", href: "/pricing" },
    },
  },

  features: {
    hero: {
      eyebrow: "Platform",
      title: "One platform.",
      titleHighlight: "Five tools you can cancel.",
      description:
        "From the first ICP search to a closed-won deal — every step lives in Skout AI.",
    },
    groups: [
      {
        title: "Lead Intelligence",
        features: [
          {
            title: "Company search",
            description:
              "Filter 45M companies by industry, size, geo, funding stage and revenue band.",
          },
          {
            title: "Employee search",
            description:
              "Surface decision-makers across 200M profiles with 40+ persona filters.",
          },
          {
            title: "Email finder",
            description: "Resolve verified work emails from a name, domain or LinkedIn URL.",
          },
          {
            title: "Phone finder",
            description:
              "Compliant mobile and direct dials with carrier validation and DNC screening.",
          },
          {
            title: "LinkedIn enrichment",
            description:
              "Hydrate profiles with titles, tenure, skills and recent activity in one call.",
          },
          {
            title: "Technology stack detection",
            description:
              "Track 30,000+ tools across your TAM with adoption and churn signals.",
          },
          {
            title: "Funding & growth data",
            description:
              "Rounds, investors, hiring velocity and M&A — refreshed every 4 hours.",
          },
          {
            title: "CSV import & export",
            description:
              "Drop any list — we match, enrich and return it without changing the schema.",
          },
          {
            title: "Bulk enrichment",
            description:
              "Run waterfall enrichment across millions of rows with vendor-priority routing.",
          },
          {
            title: "Saved lists & smart filters",
            description:
              "Living ICPs that auto-refresh as new matches appear in the graph.",
          },
          {
            title: "Advanced search",
            description: "Boolean operators, exclusion logic and lookalike search built in.",
          },
          {
            title: "Lookalike accounts",
            description:
              "Feed in 10 best customers — get the 1,000 closest twins ranked by fit.",
          },
        ],
      },
      {
        title: "AI Research",
        features: [
          {
            title: "AI lead research",
            description:
              "Autonomous agent scans 50+ sources per lead and returns a structured brief.",
          },
          {
            title: "AI company summaries",
            description:
              "Plain-English overviews of strategy, products and recent milestones.",
          },
          {
            title: "AI personalized first lines",
            description: "Hooks grounded in real signals — never generic filler.",
          },
          {
            title: "AI cold email generation",
            description:
              "Full sequences in your brand voice, tuned for the recipient's persona.",
          },
          {
            title: "AI lead scoring",
            description: "Fit + intent + timing scored on a 0-100 scale you can trust.",
          },
          {
            title: "AI ICP matching",
            description:
              "Train a custom ICP from 5 closed-won examples in under 60 seconds.",
          },
          {
            title: "GPT-based workflows",
            description:
              "Drop AI steps anywhere — extraction, classification, rewriting, scoring.",
          },
          {
            title: "AI-generated notes",
            description:
              "Meeting summaries, call recaps and follow-up drafts written automatically.",
          },
        ],
      },
      {
        title: "Cold Outreach",
        features: [
          {
            title: "Campaign creation",
            description:
              "Launch multi-step campaigns in minutes with reusable templates and blocks.",
          },
          {
            title: "Unlimited mailboxes",
            description: "Connect as many sending inboxes as you need — no per-seat tax.",
          },
          {
            title: "Email warmup",
            description:
              "Built-in warm-up network keeps domains healthy before and during sending.",
          },
          {
            title: "Inbox rotation",
            description: "Distribute volume across mailboxes automatically.",
          },
          {
            title: "Follow-up sequences",
            description: "Conditional branches based on opens, clicks and replies.",
          },
          {
            title: "A/B testing",
            description:
              "Test subject lines, CTAs and send times with statistical confidence.",
          },
          { title: "Smart sending", description: "Adaptive throttling and bounce handling." },
          {
            title: "Tracking",
            description: "Open / click / reply tracking with full attribution.",
          },
          {
            title: "AI-generated sequences",
            description: "Generate a full 5-touch cadence from one product description.",
          },
        ],
      },
      {
        title: "CRM",
        features: [
          {
            title: "Deal pipelines",
            description: "Drag-and-drop boards with forecasts and custom stages.",
          },
          { title: "Tasks", description: "Auto-created from triggers and activities." },
          { title: "Notes", description: "Rich-text notes attached to contacts and deals." },
          {
            title: "Meeting scheduling",
            description: "Native scheduler with round-robin and buffers.",
          },
          {
            title: "Team collaboration",
            description: "Shared inboxes, deal rooms and mentions.",
          },
          {
            title: "Activity tracking",
            description: "Every touch auto-stitched to the right record.",
          },
        ],
      },
      {
        title: "Workflow Automation",
        features: [
          { title: "Drag-and-drop builder", description: "Visual no-code workflow builder." },
          { title: "200+ blocks", description: "Pre-built enrichment and automation blocks." },
          {
            title: "Conditional branching",
            description: "Nested logic with visual conditions.",
          },
          {
            title: "HTTP & webhook nodes",
            description: "Call any API directly inside workflows.",
          },
          { title: "AI nodes", description: "Drop GPT steps into any workflow." },
          {
            title: "Schedules & triggers",
            description: "Run on cron jobs, forms or CRM events.",
          },
        ],
      },
      {
        title: "Chrome Extension",
        features: [
          {
            title: "LinkedIn sidebar",
            description: "Full prospect profile on any LinkedIn page.",
          },
          {
            title: "One-click enrichment",
            description: "Grab verified data without leaving the tab.",
          },
          { title: "Save to CRM", description: "Push contacts and notes instantly." },
          { title: "Find email instantly", description: "Verified email in under 400ms." },
        ],
      },
      {
        title: "Analytics",
        features: [
          { title: "Leads analytics", description: "Funnel and source analytics." },
          {
            title: "Open & reply rates",
            description: "Deliverability and engagement insights.",
          },
          {
            title: "Deliverability monitoring",
            description: "Spam-trap and blacklist monitoring.",
          },
          {
            title: "Revenue tracking",
            description: "Closed-won attribution analytics.",
          },
          { title: "Campaign analytics", description: "Per-step performance insights." },
          {
            title: "Team performance",
            description: "Rep leaderboards and contribution tracking.",
          },
          {
            title: "AI insights",
            description: "Weekly written summaries and anomaly detection.",
          },
          {
            title: "Recent activities",
            description: "Unified activity feed across the team.",
          },
        ],
      },
      {
        title: "AI SDR Agent",
        features: [
          {
            title: "Finds leads automatically",
            description: "Searches the graph 24/7 for ICP matches.",
          },
          { title: "Generates outreach", description: "Writes personalized first touches." },
          {
            title: "Sends follow-ups",
            description: "Smart timing and branching sequences.",
          },
          {
            title: "Qualifies leads",
            description: "Conversational qualification workflows.",
          },
          { title: "Books meetings", description: "Schedules meetings automatically." },
        ],
      },
    ],
    cta: {
      title: "Ready to consolidate your stack?",
      description:
        "Replace five disconnected tools with one unified revenue operating system.",
      ctaText: "Start free",
      ctaHref: "/contact",
    },
  },

  pricing: {
    hero: {
      eyebrow: "Pricing",
      title: "Pay for results,",
      titleHighlight: "not per seat.",
      description:
        "Credit-based pricing means every team member gets full access. You only pay for what you enrich and send.",
    },
    tiers: [
      {
        name: "Free",
        price: "$0",
        per: "forever",
        desc: "For founders kicking the tires.",
        cta: "Start free",
        ctaHref: "/contact",
        highlight: false,
        features: [
          "50 enrichment credits / mo",
          "Email verification",
          "Chrome extension",
          "1 user",
        ],
      },
      {
        name: "Growth",
        price: "$79",
        per: "user / month",
        desc: "For teams running daily outbound.",
        cta: "Start trial",
        ctaHref: "/contact",
        highlight: true,
        features: [
          "3,000 credits / user",
          "Waterfall enrichment",
          "Multi-channel sequences",
          "CRM sync (HubSpot, Salesforce)",
          "Intent topics (50)",
        ],
      },
      {
        name: "Scale",
        price: "$199",
        per: "user / month",
        desc: "For revenue orgs of 10+.",
        cta: "Talk to sales",
        ctaHref: "/contact",
        highlight: false,
        features: [
          "10,000 credits / user",
          "Unlimited intent topics",
          "Job change alerts",
          "API + webhooks",
          "SSO & SCIM",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        per: "annual",
        desc: "Custom volume, security and SLAs.",
        cta: "Contact sales",
        ctaHref: "/contact",
        highlight: false,
        features: [
          "Unlimited credits",
          "Dedicated CSM",
          "Warehouse sync",
          "DPA, SOC 2, HIPAA-ready",
          "Private workspace",
        ],
      },
    ],
    compare: {
      eyebrow: "Compare",
      title: "Compare plans",
      rows: [
        ["Contacts in database", "200M", "200M", "200M", "200M"],
        ["Waterfall enrichment", "—", "✓", "✓", "✓"],
        ["Multi-channel sequences", "—", "✓", "✓", "✓"],
        ["Intent signals", "—", "50 topics", "Unlimited", "Unlimited"],
        ["API access", "—", "—", "✓", "✓"],
        ["SSO / SCIM", "—", "—", "✓", "✓"],
        ["Dedicated CSM", "—", "—", "—", "✓"],
      ],
    },
  },

  solutions: {
    hero: {
      eyebrow: "Solutions",
      title: "Built for the way",
      titleHighlight: "your team works.",
      description:
        "Purpose-built workflows for sales, recruiting, RevOps, founders and agencies — all on one platform.",
    },
    solutions: [
      {
        title: "Outbound sales",
        description:
          "Build verified lists, launch multi-channel cadences and pipe replies straight into your CRM.",
        bullets: ["ICP & lookalikes", "Sequence builder", "Reply routing"],
      },
      {
        title: "Demand generation",
        description:
          "Identify intent surges and trigger ad audiences + email plays before competitors notice.",
        bullets: ["Intent topics", "Audience sync", "Lift reports"],
      },
      {
        title: "Recruiting & sourcing",
        description:
          "Source passive talent with people-graph filters and verified personal emails.",
        bullets: ["Talent search", "Job change alerts", "ATS sync"],
      },
      {
        title: "Agencies & lead-gen",
        description:
          "White-label dashboards, per-client workspaces and pooled credits with margin control.",
        bullets: ["Workspaces", "White label", "Margin pricing"],
      },
      {
        title: "Founders & GTM",
        description:
          "Skip the data-vendor maze. One subscription that scales from PMF to Series C.",
        bullets: ["Self-serve onboarding", "Usage-based pricing", "Founder support"],
      },
      {
        title: "RevOps",
        description:
          "Keep your CRM clean with continuous enrichment, dedup and field standardization.",
        bullets: ["Bi-directional sync", "Dedup engine", "Field mapping"],
      },
    ],
    cta: {
      eyebrow: "Use cases",
      title: "One platform for every",
      titleHighlight: "revenue workflow.",
      description:
        "Replace disconnected point solutions with one unified data, outreach and automation layer.",
      primaryCta: { text: "View pricing", href: "/pricing" },
      secondaryCta: { text: "Book demo", href: "/contact" },
    },
  },

  integrations: {
    hero: {
      eyebrow: "Integrations",
      title: "Plays nicely with",
      titleHighlight: "everything you already use.",
      description:
        "Native connectors, an open API and webhooks for the rest. Your data, your warehouse — always.",
    },
    groups: [
      {
        name: "CRM",
        blurb: "Two-way sync with the systems of record your revenue team lives in.",
        items: [
          { name: "Salesforce", caption: "Bi-directional sync", key: "SF" },
          { name: "HubSpot", caption: "Native app", key: "HS" },
          { name: "Pipedrive", caption: "Real-time push", key: "PD" },
          { name: "Close", caption: "Activity sync", key: "CL" },
          { name: "Attio", caption: "Workspace sync", key: "AT" },
          { name: "Folk", caption: "Contact sync", key: "FK" },
        ],
      },
      {
        name: "Warehouse & ETL",
        blurb: "Land enriched data in your warehouse with reverse ETL out of the box.",
        items: [
          { name: "Snowflake", caption: "Reverse ETL", key: "SN" },
          { name: "BigQuery", caption: "Streaming", key: "BQ" },
          { name: "Redshift", caption: "Batch loads", key: "RS" },
          { name: "Postgres", caption: "Direct connect", key: "PG" },
          { name: "Segment", caption: "Event stream", key: "SG" },
          { name: "Fivetran", caption: "Managed sync", key: "FT" },
        ],
      },
      {
        name: "Outreach & Comms",
        blurb:
          "Send from your inbox, log calls, and book meetings without context switching.",
        items: [
          { name: "Slack", caption: "Alerts & DMs", key: "SL" },
          { name: "Gmail", caption: "Send & track", key: "GM" },
          { name: "Outlook", caption: "Send & track", key: "OL" },
          { name: "Zoom", caption: "Meeting logs", key: "ZM" },
          { name: "Calendly", caption: "Auto-booking", key: "CD" },
          { name: "Aircall", caption: "Dialer", key: "AC" },
        ],
      },
      {
        name: "Workflow & Data",
        blurb: "Compose Skout AI into anything via low-code, no-code, or raw HTTP.",
        items: [
          { name: "Zapier", caption: "5,000+ apps", key: "ZP" },
          { name: "Make", caption: "Visual scenarios", key: "MK" },
          { name: "n8n", caption: "Self-hosted", key: "N8" },
          { name: "Webhook", caption: "Real-time events", key: "WH" },
          { name: "REST API", caption: "Full coverage", key: "RA" },
          { name: "GraphQL", caption: "Typed queries", key: "GQ" },
        ],
      },
    ],
    custom: {
      eyebrow: "Custom",
      title: "Don't see",
      titleHighlight: "your stack?",
      description:
        "Every Skout AI object is exposed through a typed REST and GraphQL API, plus signed webhooks for every event. If it has an HTTP endpoint, it integrates.",
      features: ["REST API", "GraphQL", "Webhooks", "OAuth 2.0", "SCIM", "Audit logs"],
    },
  },
};
