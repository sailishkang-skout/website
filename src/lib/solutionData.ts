export interface SolutionCapability {
  title: string;
  description: string;
  badge?: string;
}

export interface SolutionWorkflow {
  stepNumber: string;
  title: string;
  description: string;
}

export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface SolutionData {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineGradient: string;
  subheadline: string;
  iconName: string;
  metrics: Array<{ label: string; value: string }>;
  capabilities: SolutionCapability[];
  workflow: SolutionWorkflow[];
  highlights: string[];
  faqs: SolutionFAQ[];
}

export const SOLUTIONS_DATA: Record<string, SolutionData> = {
  "outbound-prospecting": {
    slug: "outbound-prospecting",
    title: "Outbound Prospecting",
    eyebrow: "Sales Motion Solution",
    headline: "Build targeted buyer lists",
    headlineGradient: "and start personalized outreach without spreadsheets.",
    subheadline:
      "Consolidate lead discovery, email verification, multi-channel sequences, and CRM sync into a single workspace. Stop stitching together 5 disparate sales tools.",
    iconName: "Target",
    metrics: [
      { label: "Sourcing Speed", value: "10x Faster" },
      { label: "Data Verification", value: "98%+ Deliverable" },
      { label: "Pipeline Impact", value: "3.4x Meetings" },
    ],
    capabilities: [
      {
        title: "ICP-Targeted Prospect Sourcing",
        description:
          "Search 250M+ verified global decision-makers using granular filters for job titles, department, technographics, and funding stage.",
        badge: "Discovery",
      },
      {
        title: "Waterfall Email & Phone Verification",
        description:
          "Validate contact data in real time via live SMTP handshakes prior to sequence enrollment.",
        badge: "Verification",
      },
      {
        title: "Multi-Step Automated Outreach",
        description:
          "Enroll leads into multi-touch sequence campaigns with email, manual call, and LinkedIn touchpoints.",
      },
      {
        title: "Automated Lead Deduplication",
        description:
          "Prevent double-prospecting across your workspace with automatic domain and email deduplication.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Define Target ICP",
        description:
          "Filter decision-makers by title keywords, company size, tech stack, and location.",
      },
      {
        stepNumber: "02",
        title: "Enrich & Verify",
        description:
          "Retrieve verified work emails and direct phone numbers using multi-provider waterfall search.",
      },
      {
        stepNumber: "03",
        title: "Launch Multi-Touch Sequences",
        description: "Enroll contacts into automated sequences with sender mailbox rotation.",
      },
    ],
    highlights: [
      "Eliminates CSV manual downloads and fragmented software stacks",
      "Native integration with Dexter AI for automated sequence copywriting",
      "Automatic bounce detection and domain reputation protection",
    ],
    faqs: [
      {
        question: "How does Skout AI simplify outbound prospecting?",
        answer:
          "Skout AI combines prospect search, data verification, sequencing, and CRM into one workspace so sales reps source and engage leads without leaving the platform.",
      },
      {
        question: "Can I import existing lead lists from external events or databases?",
        answer:
          "Yes, our CSV importer automatically maps columns, scrubs duplicates against active campaigns, and enriches missing contact attributes.",
      },
    ],
  },

  "account-based-sales": {
    slug: "account-based-sales",
    title: "Account-Based Sales (ABS)",
    eyebrow: "Strategy Solution",
    headline: "Target high-value enterprise accounts",
    headlineGradient: "with multi-threaded buyer engagement.",
    subheadline:
      "Identify target accounts matching your exact ICP parameters. Map key buying committees, track account-level engagement, and align sales reps around target accounts.",
    iconName: "Layers",
    metrics: [
      { label: "Account Penetration", value: "Multi-Threaded" },
      { label: "ICP Fit Accuracy", value: "95% Alignment" },
      { label: "Deal Size Growth", value: "+42% Avg" },
    ],
    capabilities: [
      {
        title: "Buying Committee Mapping",
        description:
          "Identify and track multiple decision-makers, champions, and blockholders across target accounts.",
        badge: "Multi-Threading",
      },
      {
        title: "Account-Level Intent & Growth Signals",
        description:
          "Filter accounts by funding announcements, executive hires, technographic stack changes, and hiring surge data.",
        badge: "Account Signals",
      },
      {
        title: "Unified Account Activity Timeline",
        description:
          "View aggregated emails, open rates, call notes, and deal stages for every contact within an account.",
      },
      {
        title: "Dexter AI Account Briefings",
        description:
          "Generate instant account summaries, executive priorities, and recommended messaging angles with Dexter AI.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Select Target Accounts",
        description:
          "Identify high-fit accounts using firmographics, technographics, and funding triggers.",
      },
      {
        stepNumber: "02",
        title: "Map Buying Committee",
        description: "Source key decision-makers across VPs, Directors, and Procurement managers.",
      },
      {
        stepNumber: "03",
        title: "Execute Account Campaign",
        description: "Engage multiple stakeholders simultaneously with tailored account messaging.",
      },
    ],
    highlights: [
      "Avoid single-threaded deal stalls by reaching entire buying committees",
      "Account-level reporting metrics showing engagement score per target company",
      "Seamless bi-directional sync with HubSpot CRM account records",
    ],
    faqs: [
      {
        question: "Why is multi-threading important for Account-Based Sales?",
        answer:
          "Enterprise sales decisions involve 6 to 10 stakeholders. Multi-threading ensures your team engages decision-makers across engineering, finance, and operations.",
      },
      {
        question: "Can I score accounts based on technographics?",
        answer:
          "Yes, you can define required tech stack signals (e.g. AWS + Salesforce) and assign higher priority scores to matching accounts.",
      },
    ],
  },

  "pipeline-management": {
    slug: "pipeline-management",
    title: "Pipeline & Deal Management",
    eyebrow: "Revenue Solution",
    headline: "Connect outbound activity directly",
    headlineGradient: "to visual deal stages and revenue forecasts.",
    subheadline:
      "Stop letting qualified leads fall through the cracks. Move opportunities through a drag-and-drop Kanban board, track deal velocity, and forecast revenue in real time.",
    iconName: "LineChart",
    metrics: [
      { label: "Board View", value: "Drag & Drop Kanban" },
      { label: "Forecast Model", value: "Weighted Pipeline" },
      { label: "Cycle Reduction", value: "-25% Close Time" },
    ],
    capabilities: [
      {
        title: "Visual Kanban Deal Pipeline",
        description:
          "Track opportunities across customizable stages: Discovery, Demo Scheduled, Proposal Sent, Negotiation, Closed Won.",
        badge: "Kanban Board",
      },
      {
        title: "Real-Time Weighted Revenue Forecast",
        description:
          "Calculate expected deal revenue automatically based on stage win probabilities and target close dates.",
        badge: "Live Forecast",
      },
      {
        title: "Inactivity & Stale Deal Alerts",
        description:
          "Highlight opportunities with no recent touchpoints or missed follow-ups so reps re-engage deals promptly.",
      },
      {
        title: "Account Activity Context Drawer",
        description:
          "Click any deal card to inspect conversation history, emails, tasks, and meeting notes without leaving the board.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Create Deal Opportunity",
        description: "Convert positive prospect reply into a deal card with deal value and owner.",
      },
      {
        stepNumber: "02",
        title: "Progress Through Stages",
        description: "Drag deals as conversations advance from demo call to contract agreement.",
      },
      {
        stepNumber: "03",
        title: "Forecast & Close",
        description: "Review weighted pipeline metrics and mark deals Closed Won.",
      },
    ],
    highlights: [
      "Customizable stages tailored to your unique sales cycle",
      "Automatic sequence pause triggers when deals advance to negotiation",
      "Dexter AI deal summary assistant built into opportunity cards",
    ],
    faqs: [
      {
        question: "Can I customize the pipeline stages?",
        answer:
          "Yes, you can create multiple custom pipelines with tailored stage names, win probabilities, and mandatory deal properties.",
      },
      {
        question: "Does pipeline management sync with external CRMs?",
        answer: "Yes, Skout AI supports 2-way real-time deal sync with HubSpot CRM.",
      },
    ],
  },

  "sales-intelligence": {
    slug: "sales-intelligence",
    title: "Sales Intelligence & Context",
    eyebrow: "Context Solution",
    headline: "Turn raw prospect and company data",
    headlineGradient: "into actionable sales conversation triggers.",
    subheadline:
      "Arm your sales team with rich account context. Surface technology stacks, executive hires, funding rounds, and AI-generated account summaries before every call.",
    iconName: "Bot",
    metrics: [
      { label: "Data Freshness", value: "Continuous Live" },
      { label: "Context Signals", value: "40+ Data Points" },
      { label: "Rep Preparation", value: "< 2 Mins / Account" },
    ],
    capabilities: [
      {
        title: "Technographic Stack Intelligence",
        description:
          "Know exactly which tools, cloud providers, CRMs, and marketing platforms target accounts use.",
        badge: "Tech Stack",
      },
      {
        title: "Growth & Hiring Triggers",
        description:
          "Identify companies expanding their engineering, sales, or marketing teams with active job opening counts.",
        badge: "Growth Triggers",
      },
      {
        title: "Dexter AI Account Briefings",
        description:
          "Get 1-paragraph executive summaries of target accounts, key pain points, and recommended opening angles.",
      },
      {
        title: "Social & Professional Signal Tracking",
        description:
          "Access LinkedIn profile details, mutual connections, and recent executive movements.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Lookup Target Account",
        description: "Search company domain or contact profile inside Skout AI.",
      },
      {
        stepNumber: "02",
        title: "Review Intelligence Signals",
        description: "Inspect tech stack, funding history, and Dexter AI account summary.",
      },
      {
        stepNumber: "03",
        title: "Conduct Contextual Call",
        description: "Engage prospect with relevant, tailored conversation hooks.",
      },
    ],
    highlights: [
      "Zero generic sales pitches — every outreach step uses real account data",
      "Direct integration with Chrome Extension on LinkedIn profile pages",
      "Supports BYOK AI models (GPT-4o, Claude 3.5) for private research",
    ],
    faqs: [
      {
        question: "What sources provide the technographic data?",
        answer:
          "Skout AI continuously scans public web signals, DNS records, script tags, and job postings to maintain accurate technology stack profiles.",
      },
      {
        question: "Can sales reps view intelligence directly inside LinkedIn?",
        answer:
          "Yes! The Skout AI Chrome Extension surfaces full account intelligence and ICP fit scores directly on LinkedIn profile pages.",
      },
    ],
  },

  "smarter-outbound": {
    slug: "smarter-outbound",
    title: "Smarter Outbound & Deliverability",
    eyebrow: "Outreach Solution",
    headline: "Combine enrichment, sequencing, AI review,",
    headlineGradient: "and deliverability monitoring into one safe workflow.",
    subheadline:
      "Stop burning sender domains. Protect your email reputation with automated peer-to-peer warmup, DNS health monitoring, AI spam word scanning, and mailbox rotation.",
    iconName: "Workflow",
    metrics: [
      { label: "Inbox Placement", value: "99.4% Average" },
      { label: "Warmup Network", value: "50,000+ Mailboxes" },
      { label: "Spam Detection", value: "Pre-Flight QA" },
    ],
    capabilities: [
      {
        title: "Automated Peer-to-Peer Warmup",
        description:
          "Build domain sender reputation safely with human-like conversation threads across real mailboxes.",
        badge: "Peer Warmup",
      },
      {
        title: "DNS & Authentication Health Audit",
        description:
          "Monitors SPF, DKIM, DMARC, and Custom Tracking Domains continuously for 100% email compliance.",
        badge: "24/7 Monitoring",
      },
      {
        title: "Pre-Flight AI Copy Review",
        description:
          "Scans email templates for 2,500+ spam keywords, reading level grade, and subject line effectiveness.",
      },
      {
        title: "Mailbox Rotation & Daily Sending Caps",
        description:
          "Distributes sequence volume across multiple sender accounts to stay well within ISP rate limits.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Connect & Audit Domains",
        description: "Link sending accounts and run automated DNS health diagnostic.",
      },
      {
        stepNumber: "02",
        title: "Run Pre-Flight Copy Scan",
        description: "Audit sequence templates with AI Review to fix spam triggers.",
      },
      {
        stepNumber: "03",
        title: "Launch Safe Outreach",
        description: "Rotate mailboxes and deliver outreach cleanly into prospect primary inboxes.",
      },
    ],
    highlights: [
      "Protects domain reputation and prevents spam folder placement",
      "Auto-pauses sequence sending if bounce rate exceeds 2.5%",
      "Custom tracking domain setup for zero link friction",
    ],
    faqs: [
      {
        question: "Why do cold emails go to spam?",
        answer:
          "Emails end up in spam due to missing SPF/DKIM authentication, aggressive sales keywords, or sending high volume from cold domains without warmup.",
      },
      {
        question: "How does mailbox rotation work?",
        answer:
          "Skout AI spreads daily sequence emails across multiple connected sending mailboxes (e.g. 5 mailboxes sending 30 emails/day instead of 1 sending 150).",
      },
    ],
  },

  "ai-assisted-selling": {
    slug: "ai-assisted-selling",
    title: "AI-Assisted Selling",
    eyebrow: "AI Motion Solution",
    headline: "Use Dexter AI as your autonomous GTM copilot",
    headlineGradient: "for research, copywriting, and deal execution.",
    subheadline:
      "Put AI at the center of your sales workflow. Dexter AI queries your Skout database to personalize email sequences, summarize buyer threads, and guide next sales actions.",
    iconName: "Sparkles",
    metrics: [
      { label: "Model Architecture", value: "BYOK + Native LLMs" },
      { label: "Context Window", value: "Full Workspace Data" },
      { label: "Execution Speed", value: "Sub-Second Response" },
    ],
    capabilities: [
      {
        title: "Context-Aware Prospect Research",
        description:
          "Ask Dexter to research target accounts, extract executive priorities, and synthesize recent company news.",
        badge: "Deep Research",
      },
      {
        title: "Hyper-Personalized Sequence Writing",
        description:
          "Generate tailored cold email sequences, LinkedIn openers, and follow-up templates matching recipient persona.",
        badge: "AI Copywriter",
      },
      {
        title: "Conversation Thread Summaries",
        description:
          "Get quick summaries of prospect email replies, objection analysis, and recommended response angles.",
      },
      {
        title: "Bring Your Own Key (BYOK) Security",
        description:
          "Connect your private API keys for OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), or OpenRouter.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Prompt Dexter Copilot",
        description:
          "Ask queries like 'Draft personalized sequence for CTO persona' or 'Summarize account X'.",
      },
      {
        stepNumber: "02",
        title: "Review AI Output",
        description: "Dexter queries workspace data and generates structured recommendations.",
      },
      {
        stepNumber: "03",
        title: "Apply to Campaign or Deal",
        description: "Push generated copy directly into sequences or CRM deal notes.",
      },
    ],
    highlights: [
      "Native intelligence layer embedded into every page of the Skout AI workspace",
      "BYOK security ensures proprietary sales data remains private to your team",
      "Learns from your top-performing sequences and customer ICPs",
    ],
    faqs: [
      {
        question: "What is BYOK (Bring Your Own Key)?",
        answer:
          "BYOK lets you supply your own API key for OpenAI or Anthropic, giving you full privacy, choice of model, and cost control.",
      },
      {
        question: "Does Dexter AI replace human sales reps?",
        answer:
          "No, Dexter acts as a force multiplier — handling tedious account research, drafting initial email copy, and summarizing threads so reps spend more time closing.",
      },
    ],
  },
};
