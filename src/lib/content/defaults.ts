export const defaultContent: Record<string, Record<string, unknown>> = {
  home: {
    hero: {
      eyebrow: "AI-Powered GTM Platform",
      title: "Find the right prospects.",
      titleHighlight: "Know why they matter.",
      titleSuffix: "Sell with context.",
      subheadline:
        "Skout AI brings prospecting, enrichment, outreach, CRM, and GTM intelligence into one workspace — so your team can spend less time moving data between tools and more time creating pipeline.",
      primaryCta: { text: "Book a demo", href: "/contact" },
      secondaryCta: { text: "Explore platform", href: "#scavenger-hunt" },
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
};
