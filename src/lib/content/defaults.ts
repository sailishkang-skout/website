export const defaultContent: Record<string, Record<string, unknown>> = {
  home: {
    hero: {
      eyebrow: "AI-Powered GTM Platform",
      title: "Find the right prospects.",
      titleHighlight: "Know why they matter.",
      titleSuffix: "Sell with context.",
      subheadline:
        "Skout AI unifies prospecting, enrichment, multi-channel outreach, native CRM, and predictive GTM intelligence into a single workspace — cutting through data silos so your team spends less time juggling tools and more time closing deals.",
      primaryCta: { text: "Start your free trial", href: "/contact" },
      secondaryCta: { text: "Watch product tour", href: "#features" },
      supportingLine:
        "From first prospect to active opportunity — Skout keeps the context connected.",
      dexterEyebrow: "Meet Dexter",
      dexterTagline: "Your GTM intelligence layer.",
      dexterDescription:
        "Dexter helps your team turn prospect and account information into decisions — from who to target and what to know about them, to how to approach them and what to do next.",
      dexterPrompt:
        "Find accounts that look like our best customers and identify the right people to contact.",
      dexterReply:
        "Here are the accounts that match your ICP. I've prioritized them based on the signals available in Skout and identified the contacts most relevant to your target roles.",
    },
    trust: {
      headline: "Built for modern GTM teams",
      subheadline: "One workspace for prospecting, intelligence, outreach, and pipeline execution.",
    },
    valueProp: {
      eyebrow: "Primary Value Proposition",
      headline: "Your sales stack shouldn't feel like a scavenger hunt.",
      body: "Sales teams shouldn't have to discover an account in one platform, find contacts in another, enrich them somewhere else, write messaging with an AI tool, send from another system, and finally update the CRM by hand. Skout connects those workflows. Find prospects, enrich their information, understand the account, engage the right people, and manage the resulting pipeline from one connected workspace.",
      points: [
        {
          title: "Less context switching",
          description:
            "Keep prospect intelligence, outreach, conversations, and pipeline activity connected.",
        },
        {
          title: "Better decisions",
          description: "Give your team more context before they decide who to contact and why.",
        },
        {
          title: "One connected workflow",
          description:
            "Move from discovery to outreach to opportunity without constantly moving data between systems.",
        },
      ],
    },
    discover: {
      eyebrow: "01 — Discover",
      headline: "Start with the right accounts — not a giant list.",
      description:
        "Define who you want to reach and use Skout to discover companies and contacts that fit your targeting criteria. Build focused lists, import your existing prospects, and organize your market around the accounts and people your team actually wants to reach.",
      cards: [
        {
          title: "Prospect Search",
          description:
            "Find companies and contacts based on the criteria that matter to your sales strategy.",
        },
        {
          title: "Smart Lists",
          description:
            "Create organized prospect lists around your targeting requirements and sales priorities.",
        },
        {
          title: "Import",
          description: "Bring existing leads into Skout and enrich them with additional context.",
        },
        {
          title: "ICP Setup",
          description:
            "Define your ideal customer profile and use it as the foundation for prospecting.",
        },
      ],
    },
    understand: {
      eyebrow: "02 — Understand",
      headline: "Don't just know who they are. Understand the account.",
      description:
        "A name and email address are not enough. Skout helps enrich contact and company information so your team can work with more context before starting a conversation. Connect prospect information with account intelligence, targeting criteria, and the sales workflow around it.",
      cardTitle: "Enrichment",
      cardDescription:
        "Fill gaps in contact and company information and build a more complete picture of the accounts you're targeting.",
      dexterCalloutHeadline: "Dexter turns information into context.",
      dexterCalloutBody:
        "Instead of making your team interpret disconnected data points, Dexter can help summarize what matters about an account and how that information should influence the sales workflow.",
    },
    engage: {
      eyebrow: "03 — Engage",
      headline: "Turn intelligence into outreach.",
      description:
        "Once you know who you're targeting and why they matter, Skout helps your team move into outreach without rebuilding the workflow somewhere else. Create sequences, manage conversations, review outbound messaging, and monitor deliverability from the same workspace.",
      cards: [
        {
          title: "Sequences",
          description: "Build and manage multichannel outbound workflows.",
        },
        {
          title: "Inbox",
          description:
            "Keep prospect replies and conversations connected to the people and accounts behind them.",
        },
        {
          title: "AI Review",
          description: "Use AI-assisted review to improve outbound content before it is sent.",
        },
        {
          title: "Deliverability",
          description:
            "Monitor email health and the signals that influence your ability to reach the inbox.",
        },
      ],
    },
    convert: {
      eyebrow: "04 — Convert",
      headline: "When interest turns into opportunity, keep the context.",
      description:
        "Prospecting shouldn't end when someone replies. Skout connects contacts and companies with deals, tasks, meetings, and pipeline activity so your team can continue working from the same context that started the conversation.",
      cards: [
        {
          title: "Companies & Contacts",
          description: "Keep account and contact information organized in one place.",
        },
        {
          title: "Deals",
          description: "Manage opportunities through a visual pipeline.",
        },
        {
          title: "Tasks",
          description: "Turn conversations and opportunities into clear next actions.",
        },
        {
          title: "Meetings & Calendar",
          description:
            "Keep meetings connected to the accounts and opportunities your team is working.",
        },
      ],
    },
    icp: {
      eyebrow: "Your ICP. Built into the workflow.",
      headline: "Stop treating your ideal customer profile like a slide deck.",
      description:
        "Your ICP should influence who you search for, which accounts you prioritize, and how you build your pipeline. Skout brings ICP configuration into the product so your targeting strategy can become part of the actual prospecting workflow.",
      tagline: "Define it. Find it. Work it.",
    },
    dexterDeepDive: {
      eyebrow: "Meet Dexter",
      headline: "Your GTM intelligence layer.",
      description:
        "Most AI sales tools start with a blank chat box. Dexter starts with your GTM workflow. Because Dexter operates inside Skout, it can help your team work with the prospect, account, targeting, outreach, and pipeline context already available in the platform.",
      prompts: [
        {
          category: "Finding",
          prompt: "Which accounts match our ICP?",
          answer:
            "Found 42 accounts matching Series B+ B2B SaaS with 50-200 employees currently hiring VP of Sales roles.",
        },
        {
          category: "Prioritizing",
          prompt: "Which prospects should our team focus on first?",
          answer:
            "Prioritized Linear, Notion, and Loom based on recent funding, hiring surge (+15%), and tech stack compatibility.",
        },
        {
          category: "Understanding",
          prompt: "What should I know about this company before reaching out?",
          answer:
            "Linear expanded their European sales team last month, recently integrated with HubSpot, and currently has 3 open AE seats.",
        },
        {
          category: "Preparing",
          prompt: "Help me understand this prospect and the context around the account.",
          answer:
            "Sofia Alvarez (CMO) leads a team of 14, evaluates GTM efficiency tools quarterly, and was referenced in a recent RevOps podcast.",
        },
        {
          category: "Messaging",
          prompt: "Review this outbound message and tell me what could be improved.",
          answer:
            "Message focuses too heavily on product features. Recommend leading with their current team growth signal and shortening the call to action.",
        },
        {
          category: "Acting",
          prompt: "What should I do next with this opportunity?",
          answer:
            "Schedule follow-up demo meeting with David Chen and update deal stage to 'Proposal Sent' in your Skout pipeline.",
        },
      ],
      coreStatement:
        "Dexter doesn't replace your sales team. It gives your sales team better context to act on.",
    },
    outboundIntel: {
      headline: "More automation isn't the goal. Better outbound is.",
      description:
        "Automation can make a bad process faster. Skout is built to connect intelligence with execution — helping your team start with better targeting, add context before outreach, review messaging, and keep the resulting activity connected to the CRM.",
      steps: [
        {
          number: "01 — Know",
          title: "Understand the account",
          description: "Understand the account and the people inside it.",
        },
        {
          number: "02 — Decide",
          title: "Focus on fit",
          description:
            "Use context and targeting intelligence to determine who deserves attention.",
        },
        {
          number: "03 — Engage",
          title: "Personalized outreach",
          description:
            "Move into personalized, structured outreach with the relevant context attached.",
        },
      ],
    },
    crmSection: {
      headline: "A CRM that starts before the opportunity.",
      description:
        "Traditional CRM workflows often begin after a lead already exists. Skout connects the earlier stages of the journey — discovery, enrichment, outreach, conversations — with companies, contacts, deals, tasks, and meetings.",
      keyStatement:
        "Your CRM shouldn't be where context goes to disappear. It should be where context comes together.",
    },
    integrations: {
      eyebrow: "Works with the tools you already use",
      headline: "Connect Skout to your existing workflow.",
      description:
        "Skout is designed to complement your existing GTM stack rather than force your team to rebuild everything from scratch.",
      cards: [
        {
          name: "HubSpot",
          description:
            "Sync relevant CRM data and connect Skout prospecting workflows with HubSpot.",
        },
        {
          name: "Google Calendar",
          description: "Keep meetings and calendar activity connected to your sales workflow.",
        },
        {
          name: "Bring Your Own Key",
          description:
            "Connect supported AI/provider services using your own credentials where available.",
        },
      ],
    },
    differentiation: {
      headline: "The problem isn't that sales teams need another tool.",
      bodyLines: [
        "They need fewer disconnected workflows.",
        "A prospecting database tells you who exists.",
        "An enrichment platform tells you more about them.",
        "An outreach platform sends the message.",
        "A CRM records what happened.",
        "An AI tool writes something.",
        "Skout is designed to connect the journey between all of them.",
      ],
      closingLine: "Discover → Understand → Engage → Convert",
      subClosing: "One connected GTM workspace.",
    },
    pricingTeaser: {
      headline: "Built around the way your team sells.",
      ctaText: "See Skout AI",
      ctaHref: "/pricing",
    },
    faq: [
      {
        question: "What is Skout AI?",
        answer:
          "Skout AI is an AI-powered GTM platform that combines prospecting, enrichment, outreach, CRM, and sales intelligence in one workspace.",
      },
      {
        question: "Who is Skout AI built for?",
        answer:
          "Skout is designed for sales and GTM teams that need to find prospects, understand accounts, execute outbound, and manage pipeline without stitching together disconnected tools.",
      },
      {
        question: "What makes Skout different from a prospecting database?",
        answer:
          "A database primarily helps you find people. Skout is designed to connect what happens before, during, and after prospect discovery — from ICP targeting and enrichment through outreach and pipeline management.",
      },
      {
        question: "What is Dexter?",
        answer:
          "Dexter is Skout AI's GTM intelligence layer. Dexter helps teams work with the prospect, account, outreach, and pipeline context available inside Skout to make better sales decisions and take the next action.",
      },
      {
        question: "Does Skout replace my CRM?",
        answer:
          "Skout includes native CRM functionality for companies, contacts, deals, tasks, and meetings. It can also connect with supported external systems such as HubSpot.",
      },
      {
        question: "How does Skout help with enrichment?",
        answer:
          "Skout can enrich contact and company information so teams have more context around the people and accounts they are targeting.",
      },
      {
        question: "Can I use my own AI/provider keys?",
        answer:
          "Skout supports BYOK for supported providers and integrations. The exact providers should be listed based on the integrations currently exposed in the product.",
      },
      {
        question: "Does Skout automate outbound?",
        answer:
          "Skout provides sequence and outreach functionality that helps teams structure and automate outbound workflows while keeping prospect context, conversations, and CRM activity connected.",
      },
      {
        question: "How does Skout approach deliverability?",
        answer:
          "Skout includes deliverability functionality and AI-assisted review designed to help teams make more informed decisions around outbound messaging and sending workflows.",
      },
      {
        question: "Can I import my existing prospects?",
        answer:
          "Yes. Skout supports importing prospects so teams can bring existing data into their workspace and continue enriching and managing it there.",
      },
    ],
    finalCta: {
      eyebrow: "Your next pipeline opportunity is probably buried in your workflow.",
      headline: "Give your GTM team one place to find it, understand it, and act on it.",
      body: "Bring prospecting, intelligence, outreach, and pipeline together with Skout AI.",
      primaryCta: { text: "Book a demo", href: "/contact" },
      secondaryCta: { text: "See Skout AI", href: "/pricing" },
      supportingLine: "Discover better. Engage smarter. Sell with context.",
    },
  },
  about: {
    hero: {
      eyebrow: "The company",
      title: "Rebuilding the B2B data stack — from the schema up.",
      description:
        "Skout AI was founded by ex-GTM leaders who spent years frustrated with disjointed sales tools. We're building the unified workspace we always wished existed for revenue teams.",
      primaryCta: { text: "Work with us", href: "/contact" },
      secondaryCta: { text: "Explore the product", href: "/features" },
    },
    manifesto: {
      eyebrow: "Manifesto",
      title: "We believe data is a craft, not a CSV.",
      description:
        "Quality data is the foundation of successful outbound. We obsess over verification, enrichment, and context because your team deserves better than outdated, incomplete contact lists that waste time.",
    },
    values: {
      eyebrow: "Values",
      title: "Four rules we don't break.",
      description:
        "Our core principles guide every product decision: obsess over customer success, build for teams, maintain radical transparency, and iterate with purpose to solve real problems.",
    },
    timeline: {
      eyebrow: "Timeline",
      title: "A short, fast story. Two years in. Plenty left to build.",
      description:
        "From our first beta to serving hundreds of GTM teams, we've grown alongside our customers. Every feature we ship is rooted in real feedback from teams using Skout to close more deals.",
    },
    team: {
      eyebrow: "Team",
      title: "Operators, not pundits.",
      description:
        "We're ex-founders, ex-AEs, and ex-RevOps leaders who've actually executed outbound at scale. We've been in your shoes, juggling multiple tools, and built Skout to fix the pain points we faced.",
      cta: { text: "View open roles →", href: "/careers" },
    },
    join: {
      eyebrow: "Join us",
      title: "Help us build the last data tool your team installs.",
      description:
        "We're building something transformative for revenue teams worldwide. If you're passionate about solving hard problems and creating tools that people love, we want to hear from you.",
      primaryCta: { text: "Get in touch", href: "/contact" },
      secondaryCta: { text: "See pricing", href: "/pricing" },
    },
  },
  features: {
    hero: {
      eyebrow: "Platform",
      title: "One platform. Five tools you can cancel.",
      description:
        "Consolidate your disjointed sales stack into a unified GTM workspace that handles prospecting, enrichment, outreach, CRM, and intelligence — all in one place. Ready to stop juggling tools and start closing deals?",
    },
    featureGrid: {
      eyebrow: "Core capabilities",
      headline: "Powerful features for modern sales teams.",
      features: [
        {
          id: "prospecting",
          title: "AI-powered prospecting",
          description:
            "Find accounts that match your ICP with built-in data from 200M+ contacts and company profiles.",
          icon: "Search",
        },
        {
          id: "enrichment",
          title: "Waterfall enrichment",
          description:
            "Automatically enrich contacts and accounts with data from multiple providers to ensure you always have the most accurate information.",
          icon: "Database",
        },
        {
          id: "dexter",
          title: "Dexter AI assistant",
          description:
            "Your always-on GTM intelligence layer that helps you prioritize, research, and craft better outreach.",
          icon: "Bot",
        },
        {
          id: "outreach",
          title: "Multi-channel outreach",
          description:
            "Execute email and social outreach sequences directly from Skout with built-in deliverability tools.",
          icon: "Send",
        },
        {
          id: "pipeline",
          title: "Pipeline management",
          description:
            "Track deals from first touch to close with a CRM that understands the entire GTM journey.",
          icon: "Kanban",
        },
        {
          id: "integrations",
          title: "Native integrations",
          description:
            "Connect with HubSpot, Salesforce, Google Workspace, and the tools your team already uses.",
          icon: "Zap",
        },
      ],
    },
    deepDive: {
      eyebrow: "Deep dive",
      headline: "Explore what makes Skout different.",
      sections: [
        {
          id: "dexter-details",
          title: "Dexter: Your AI SDR",
          description:
            "Dexter doesn't just generate generic outreach messages. It analyzes account signals, research, and your team's historical win rate to suggest the best approach for every prospect.",
        },
        {
          id: "context-engine",
          title: "Context engine",
          description:
            "Our proprietary context engine keeps every interaction, note, and signal connected to the right account and contact throughout the entire pipeline.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      headline: "Works with your existing stack.",
      description:
        "Skout connects to the tools your team is already using so you don't have to rip and replace your entire workflow.",
    },
    faq: {
      title: "Frequently asked questions",
      questions: [
        {
          question: "Do I need to migrate my existing data to use Skout?",
          answer:
            "No. Skout syncs with your existing CRM and prospecting tools so you can start using it without migrating anything.",
        },
        {
          question: "What data sources do you use for prospecting?",
          answer:
            "We aggregate data from multiple leading B2B data providers to give you the most accurate and complete contact and company data available.",
        },
      ],
    },
    finalCta: {
      headline: "See all features in action.",
      primaryCta: { text: "Book a demo", href: "/contact" },
    },
  },
  "dexter-ai": {
    hero: {
      eyebrow: "GTM AI Layer",
      title: "Your autonomous GTM AI assistant",
      description:
        "Dexter continuously analyzes your entire pipeline, crafts hyper-personalized outreach sequences at scale, and answers complex questions about your accounts in real-time — turning hours of manual work into minutes. It connects natively to your Skout workspace database, unlocking full workspace context for every interaction.",
    },
    featureGrid: {
      eyebrow: "Core capabilities",
      headline: "Powerful AI features for modern sales teams.",
      features: [
        {
          id: "research",
          title: "Account & Prospect Deep Research",
          description:
            "Ask Dexter to analyze target companies, extract key executive priorities, and summarize recent news for outreach context.",
          icon: "Search",
        },
        {
          id: "copywriting",
          title: "Hyper-Personalized Copywriting",
          description:
            "Generate tailored cold email sequences, LinkedIn openers, and follow-ups based on real prospect data.",
          icon: "PenTool",
        },
        {
          id: "deal-summary",
          title: "Deal Summary & Next Best Action",
          description:
            "Summarize complex conversation threads, call notes, and get recommended next sales steps to push deals forward.",
          icon: "CheckCircle",
        },
      ],
    },
    deepDive: {
      eyebrow: "Deep dive",
      headline: "Explore what makes Dexter AI different.",
      sections: [
        {
          id: "context-awareness",
          title: "Full workspace context awareness",
          description:
            "Dexter operates inside your Skout workspace, so it has access to all your account, contact, and pipeline data to provide relevant, contextual responses.",
        },
        {
          id: "byok-support",
          title: "Bring Your Own Key support",
          description:
            "Use your own API keys for GPT-4o, Claude 3.5, and other supported models to maintain control over your AI spending and data privacy.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      headline: "Works with your existing stack.",
      description:
        "Dexter AI works seamlessly with all Skout features and connects to the same integrations you already use.",
    },
    faq: {
      title: "Frequently asked questions",
      questions: [
        {
          question: "What AI models does Dexter support?",
          answer:
            "Dexter supports BYOK (Bring Your Own Key) for GPT-4o, Claude 3.5, and other leading LLMs, so you can use the models your team prefers.",
        },
        {
          question: "Is my data safe with Dexter AI?",
          answer:
            "Yes, since you use your own API keys, your data is handled according to your provider's terms, and all your Skout data remains within your workspace.",
        },
      ],
    },
    finalCta: {
      headline: "See Dexter AI in action.",
      primaryCta: { text: "Book a demo", href: "/contact" },
    },
  },
  pricing: {
    hero: {
      eyebrow: "TRANSPARENT OUTBOUND PRICING",
      title: "Start free. Scale limitlessly. Pay only for what you use.",
      description:
        "Everything you need to identify high-value prospects, enrich contact data, manage your pipeline, and execute high-converting outbound campaigns. No lock-in contracts, no hidden fees.",
      yearlyBillingLabel: "Annual billing",
      yearlySaveLabel: "Save 25%",
      noCreditCard: "No credit card required to start",
      cancelAnytime: "Cancel in 1-click, anytime",
    },
    tiers: [
      {
        name: "FREE",
        price: "$0",
        per: "/mo",
        desc: "For founders & individuals building their first outbound workflows.",
        cta: "Start Free",
        ctaHref: "/app",
        highlight: false,
        features: [
          "1,000 emails/month & prospect search",
          "Basic CRM & CSV import/export",
          "Manual sequence builder & tracking",
        ],
      },
      {
        name: "STARTER",
        price: "$43",
        per: "/mo",
        desc: "For founders, SDRs, and small sales teams moving beyond manual outreach.",
        cta: "Start Starter",
        ctaHref: "/app",
        highlight: false,
        features: [
          "5,000 enrichment credits/month",
          "Automated multi-step email sequences",
          "Smart lists, reply detection & unified inbox",
        ],
      },
      {
        name: "SCALE",
        price: "$63",
        per: "/mo",
        desc: "For growing revenue teams scaling multi-channel outbound outreach.",
        cta: "Start Scale",
        ctaHref: "/app",
        highlight: true,
        badge: "MOST POPULAR",
        features: [
          "15,000 enrichment credits & mailbox rotation",
          "Multi-channel (Email + LinkedIn + Calls)",
          "AI prospect research & 2-way HubSpot sync",
        ],
      },
      {
        name: "ENTERPRISE",
        price: "Custom",
        per: "",
        desc: "For larger organizations needing custom scale, API access & SLAs.",
        cta: "Talk to Sales",
        ctaHref: "/contact",
        highlight: false,
        features: [
          "Custom enrichment & sending volumes",
          "Multiple workspaces, SSO & custom field mapping",
          "API, Webhooks & dedicated customer success",
        ],
      },
    ],
    faq: {
      title: "Pricing questions",
      questions: [
        {
          question: "Can I change plans later?",
          answer:
            "Absolutely. You can upgrade or downgrade your plan at any time. Any changes are prorated to your billing cycle.",
        },
        {
          question: "Is there a free trial?",
          answer:
            "Yes. Both our Starter and Professional plans include a 14-day free trial so you can test if Skout is right for your team.",
        },
        {
          question: "Do you offer annual billing?",
          answer: "We do. Annual plans receive a 20% discount compared to monthly billing.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to transform your GTM workflow?",
      primaryCta: { text: "Start your free trial", href: "/contact" },
    },
  },
  solutions: {
    hero: {
      eyebrow: "Solutions",
      title: "Built for the way your team works.",
      description:
        "Skout AI adapts to your unique GTM motion, whether you're a startup scaling outbound for the first time or an enterprise team optimizing multi-channel revenue operations.",
    },
    useCases: {
      eyebrow: "Use cases",
      title: "One platform for every revenue workflow.",
      description:
        "From SDR teams scaling cold outreach to account managers expanding existing accounts, Skout provides the tools, intelligence, and automation to accelerate every stage of your customer journey.",
      primaryCta: { text: "View pricing", href: "/pricing" },
      secondaryCta: { text: "Book demo", href: "/contact" },
    },
  },
  integrations: {
    hero: {
      eyebrow: "NATIVE GTM INTEGRATIONS ECOSYSTEM",
      title: "Seamlessly connects to your entire revenue stack.",
      description:
        "Unify your CRM, sending mailboxes, LinkedIn outreach, calendar scheduling, and BYOK AI models into a single, synchronized GTM command center that eliminates data silos and automates workflows.",
    },
    categories: [
      "All Integrations",
      "CRM Sync",
      "Email & Outreach",
      "BYOK AI Models",
      "Meetings",
      "Data Warehouse",
      "Developer Webhooks",
    ],
    integrationList: [
      {
        id: "hubspot",
        name: "HubSpot CRM",
        category: "CRM Sync",
        authType: "Native 2-Way",
        description:
          "Bi-directional 2-way sync for contacts, companies, deals, call logs, and sequence activities.",
        features: [
          "Real-time property mapping",
          "Deal pipeline stage sync",
          "Automated activity logging",
        ],
        status: "Workspace Ready",
      },
      {
        id: "google",
        name: "Google Workspace & Gmail",
        category: "Email & Outreach",
        authType: "OAuth 2.0",
        description:
          "Connect unlimited Google Workspace sending accounts via secure 1-click OAuth 2.0 authorization.",
        features: [
          "Automatic SPF/DKIM verification",
          "Inbox reply tracking",
          "Peer-to-peer warmup",
        ],
        status: "Workspace Ready",
      },
      {
        id: "microsoft",
        name: "Microsoft 365 & Outlook",
        category: "Email & Outreach",
        authType: "OAuth 2.0",
        description:
          "Native Exchange/Outlook OAuth sending connection with automated deliverability health monitoring.",
        features: [
          "Exchange API integration",
          "Auto mailbox rotation pool",
          "Bounce rate protection",
        ],
        status: "Workspace Ready",
      },
      {
        id: "chrome-extension",
        name: "Skout Chrome Extension V3",
        category: "Browser Automation",
        authType: "Native 2-Way",
        description:
          "Extract, enrich, and score LinkedIn prospects directly inside your Chrome browser sidepanel.",
        features: [
          "1-click LinkedIn profile capture",
          "Secure session authorization",
          "Bulk search export",
        ],
        status: "Workspace Ready",
      },
      {
        id: "openai",
        name: "OpenAI GPT-4o (BYOK)",
        category: "AI Models",
        authType: "BYOK AI",
        description:
          "Bring your own secret OpenAI API key to power Dexter AI for account research and copywriting.",
        features: [
          "Zero data retention policy",
          "GPT-4o & GPT-4o-mini support",
          "Custom prompt templates",
        ],
        status: "Workspace Ready",
      },
      {
        id: "anthropic",
        name: "Anthropic Claude 3.5 Sonnet",
        category: "AI Models",
        authType: "BYOK AI",
        description:
          "Connect Anthropic API keys for high-precision prospect context summarization and thread analysis.",
        features: [
          "Claude 3.5 Sonnet model",
          "200k token context window",
          "Private LLM processing",
        ],
        status: "Workspace Ready",
      },
      {
        id: "google-calendar",
        name: "Google Calendar",
        category: "Meetings & Booking",
        authType: "Bi-Directional",
        description:
          "Sync booked sales demo calls, detect meeting attendance, and attribute revenue to sequence steps.",
        features: ["Cal.com / Calendly support", "No-show tracking", "Automated CRM deal creation"],
        status: "Workspace Ready",
      },
      {
        id: "snowflake",
        name: "Snowflake Data Cloud",
        category: "Data Warehouse",
        authType: "Bi-Directional",
        description:
          "Stream enriched lead data and campaign engagement events directly into your Snowflake warehouse.",
        features: ["Automated SQL sync", "Lead score exports", "Custom schema tables"],
        status: "Workspace Ready",
      },
      {
        id: "webhooks",
        name: "Outbound Webhooks & REST API",
        category: "Developer Tools",
        authType: "Webhook",
        description:
          "HMAC SHA-256 signed webhooks and REST API endpoints for custom GTM engineering workflows.",
        features: [
          "Real-time event payloads",
          "HMAC security signatures",
          "Custom payload schemas",
        ],
        status: "Workspace Ready",
      },
    ],
    customIntegration: {
      headline: "Don't see your stack in our catalog?",
      description:
        "Skout AI provides custom REST API endpoints, OAuth connectors, and webhook relays for proprietary enterprise sales architectures.",
      specs: [
        "✓ HMAC SHA-256 payload signing for security",
        "✓ Custom field mapping and transformation",
        "✓ Enterprise-grade 99.99% uptime SLA",
      ],
      cta: { text: "Request Custom Connector", href: "/contact" },
    },
    finalCta: {
      headline: "Ready to connect your tools?",
      primaryCta: { text: "Book a demo", href: "/contact" },
    },
  },
  resources: {
    hero: {
      eyebrow: "Resources",
      title: "Built for the way you learn and grow.",
      description:
        "Free tools, calculators, guides, and resources to level up your GTM and outbound sales strategy.",
    },
    resourceList: [
      {
        id: "gtm-calculator",
        type: "Interactive Tool",
        title: "GTM Outbound ROI & Cost Calculator",
        description:
          "Calculate contact sourcing, email finding, verification, and inbox infrastructure costs for your outbound strategy. See how much you save with Skout AI's unified GTM platform.",
        href: "/resources/gtm-outbound-calculator",
        ctaText: "Access resource",
      },
      {
        id: "setup-guide",
        type: "Quick Start Guide",
        title: "Skout AI Setup Guide",
        description:
          "Everything you need to set up your sending domain, define your ICP, install the Chrome extension, and launch your first outbound campaign.",
        features: [
          "Authenticate your sending domain and connect Google/Outlook mailboxes for maximum inbox deliverability",
          "Build targeted prospect lists based on job titles, company size, and technographic stack",
          "Install the Skout Extension to capture and enrich leads directly on LinkedIn",
        ],
        href: "/resources/setup-guides",
        ctaText: "Access resource",
      },
    ],
    useCases: {
      eyebrow: "Use cases",
      title: "One platform for every revenue workflow.",
      description:
        "Combine these free resources with Skout AI's full platform to automate and scale your entire GTM motion.",
      primaryCta: { text: "View pricing", href: "/pricing" },
      secondaryCta: { text: "Book demo", href: "/contact" },
    },
  },
};
