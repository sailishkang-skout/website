export interface FeaturePoint {
  title: string;
  description: string;
  badge?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductData {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineGradient: string;
  subheadline: string;
  category: "Discover" | "Engage" | "Convert" | "GTM AI";
  iconName: string;
  mockupType:
    | "search"
    | "smart-lists"
    | "import"
    | "enrichment"
    | "chrome-extension"
    | "sequences"
    | "inbox"
    | "ai-review"
    | "deliverability"
    | "crm"
    | "pipeline"
    | "tasks"
    | "analytics"
    | "dexter";
  metrics: Array<{ label: string; value: string }>;
  features: FeaturePoint[];
  workflow: WorkflowStep[];
  highlights: string[];
  faqs: FAQItem[];
}

export const PRODUCTS_DATA: Record<string, ProductData> = {
  "prospect-search": {
    slug: "prospect-search",
    title: "Prospect Search",
    eyebrow: "Discover Pillar",
    headline: "Pinpoint high-intent decision makers",
    headlineGradient: "across 250M+ verified global contacts.",
    subheadline:
      "Search companies and contacts using OpenSearch filters. Target by seniority level, department, technographic stack (Salesforce, React, AWS), funding series, and verified contact status.",
    category: "Discover",
    iconName: "Search",
    mockupType: "search",
    metrics: [
      { label: "Indexed Records", value: "250M+ Contacts" },
      { label: "Search Latency", value: "< 180ms" },
      { label: "Signal Filters", value: "40+ Criteria" },
    ],
    features: [
      {
        title: "Granular ICP OpenSearch Matrix",
        description:
          "Filter by exact title keywords, department hierarchy, company revenue tier, headcount brackets, and geographic presence.",
        badge: "OpenSearch Engine",
      },
      {
        title: "Technographic Stack Detection",
        description:
          "Identify target accounts based on technologies actively installed on their website or cloud infrastructure.",
        badge: "Real-time Signals",
      },
      {
        title: "Growth & Funding Triggers",
        description:
          "Target companies that recently closed Seed, Series A/B/C funding or expanded their headcount in the last 90 days.",
      },
      {
        title: "Direct Outreach Enrolment",
        description:
          "Push discovered prospects directly into active multi-channel sequences or export to custom smart lists with one click.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Set ICP Search Constraints",
        description: "Select job titles, department, industry, technographics, and location.",
      },
      {
        stepNumber: "02",
        title: "Preview Verified Match Results",
        description: "Inspect confidence scores, SMTP-checked work emails, and company profiles.",
      },
      {
        stepNumber: "03",
        title: "Dispatch to Sequence or CRM",
        description: "Enroll contacts into outbound workflows or push to native GTM CRM.",
      },
    ],
    highlights: [
      "Powered by OpenSearch clusters with sub-second query execution",
      "Real-time dual-verification SMTP handshakes for 98%+ email deliverability",
      "Automatic deduplication against your workspace active accounts",
    ],
    faqs: [
      {
        question: "How fresh is the Prospect Search data?",
        answer:
          "Skout AI updates firmographic and technographic data continuously and executes live SMTP handshakes prior to list export.",
      },
      {
        question: "Can I filter contacts by specific software tools used?",
        answer:
          "Yes, you can target accounts running specific CRMs, marketing automation platforms, cloud infrastructure, or frontend frameworks.",
      },
    ],
  },

  "smart-lists": {
    slug: "smart-lists",
    title: "Smart Lists",
    eyebrow: "Discover Pillar",
    headline: "Self-updating prospect queues",
    headlineGradient: "that feed your outbound campaigns continuously.",
    subheadline:
      "Define dynamic criteria rules once. As new matching prospects enter the database, Smart Lists auto-ingest qualified leads and trigger automated outreach actions.",
    category: "Discover",
    iconName: "ListFilter",
    mockupType: "smart-lists",
    metrics: [
      { label: "List Refresh", value: "Real-time Auto" },
      { label: "Trigger Actions", value: "Instant Sync" },
      { label: "Workspace Protection", value: "Global Suppressions" },
    ],
    features: [
      {
        title: "Rule-Based Dynamic Ingestion",
        description:
          "Create rule sets combining titles, firmographics, and engagement scores. New leads matching the criteria populate automatically.",
        badge: "Auto Ingestion",
      },
      {
        title: "Automated ICP Lead Scoring",
        description:
          "Score each lead automatically based on tier fit, buying authority, company size, and technographic match.",
        badge: "AI Scoring",
      },
      {
        title: "Event-Driven Workflow Triggers",
        description:
          "Automatically start a personalized sequence, assign an account owner, or update CRM deal status upon lead ingestion.",
      },
      {
        title: "Workspace Suppression Safeguards",
        description:
          "Prevent team overlap by enforcing workspace-wide contact and company exclusion rules across all Smart Lists.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Configure List Targeting",
        description: "Specify target titles, funding triggers, and company size ranges.",
      },
      {
        stepNumber: "02",
        title: "Set Automated Actions",
        description: "Attach sequence auto-enrollment or CRM deal creation triggers.",
      },
      {
        stepNumber: "03",
        title: "Hands-Free Prospecting",
        description: "Smart Lists continuously feed verified leads into your pipeline.",
      },
    ],
    highlights: [
      "Eliminates repetitive manual lead sourcing and CSV exports",
      "Integrated with Dexter AI for intelligent tier assignment",
      "Global workspace deduplication safeguards",
    ],
    faqs: [
      {
        question: "How quickly are new leads added to a Smart List?",
        answer:
          "Newly matched prospects from search or enrichment are added in real time and immediately trigger attached sequence rules.",
      },
      {
        question: "Can I suppress leads already being contacted by team members?",
        answer:
          "Yes, workspace suppressions automatically filter out active leads, existing customers, and open deals across all reps.",
      },
    ],
  },

  import: {
    slug: "import",
    title: "Import & Add Lead",
    eyebrow: "Discover Pillar",
    headline: "Upload external lead lists",
    headlineGradient: "with intelligent column mapping and deduplication.",
    subheadline:
      "Import CSV or XLSX spreadsheets seamlessly. Skout AI automatically maps lead columns, scrubs duplicates against existing CRM records, and enriches missing data fields.",
    category: "Discover",
    iconName: "FileSpreadsheet",
    mockupType: "import",
    metrics: [
      { label: "Batch Capacity", value: "100k Records" },
      { label: "Mapping Accuracy", value: "99.8% Auto" },
      { label: "Deduplication", value: "Multi-Field Match" },
    ],
    features: [
      {
        title: "Intelligent Auto-Column Mapper",
        description:
          "Detects standard and custom lead attributes like email, first name, company domain, LinkedIn URL, and custom tags.",
        badge: "Auto Mapper",
      },
      {
        title: "Multi-Field Deduplication Engine",
        description:
          "Cross-checks emails and domain URLs against your entire database to prevent duplicate contacts and double messaging.",
        badge: "Zero Duplicates",
      },
      {
        title: "Inline Waterfall Enrichment",
        description:
          "Optionally trigger automatic email verification and company data enrichment during the import process.",
      },
      {
        title: "Custom Tagging & Owner Assignment",
        description:
          "Assign lead owners, custom tags, and campaign destinations directly from the import configuration screen.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Drag & Drop Lead File",
        description: "Upload CSV or XLSX files up to 100,000 rows in a single batch.",
      },
      {
        stepNumber: "02",
        title: "Confirm Field Mapping",
        description: "Review AI-detected column mappings and customize target CRM attributes.",
      },
      {
        stepNumber: "03",
        title: "Cleanse & Route",
        description: "Execute deduplication, inline verification, and campaign enrollment.",
      },
    ],
    highlights: [
      "Conflict handling settings: overwrite, append empty fields, or skip duplicates",
      "Automatic email syntax and domain MX check on import",
      "Full audit logs for all imported batches",
    ],
    faqs: [
      {
        question: "What file formats are supported for import?",
        answer:
          "Skout AI supports standard CSV and Microsoft Excel (.xlsx) file formats up to 100,000 rows per file.",
      },
      {
        question: "Can I map custom variables from my CSV for use in sequences?",
        answer:
          "Yes, any unmapped column can be saved as a custom contact attribute and referenced as a liquid merge tag in outreach copy.",
      },
    ],
  },

  enrichment: {
    slug: "enrichment",
    title: "Contact & Company Enrichment",
    eyebrow: "Discover Pillar",
    headline: "Multi-provider waterfall enrichment",
    headlineGradient: "to complete partial prospect profiles.",
    subheadline:
      "Turn sparse email addresses or domain URLs into rich buyer profiles. Retrieve verified work emails, direct phone numbers, LinkedIn URLs, tech stack details, and company metrics.",
    category: "Discover",
    iconName: "Sparkles",
    mockupType: "enrichment",
    metrics: [
      { label: "Data Layers", value: "Multi-Waterfall" },
      { label: "Email Accuracy", value: "99.2% SMTP Verified" },
      { label: "Direct Phone Rate", value: "85%+ Coverage" },
    ],
    features: [
      {
        title: "Waterfall Verification Engine",
        description:
          "Queries premium data verification providers in sequence, ensuring maximum match rate while spending credits only on valid matches.",
        badge: "Waterfall Engine",
      },
      {
        title: "Direct Dial & Mobile Finder",
        description:
          "Locate verified direct dial phone numbers and mobile contact lines for telephone sales outreach.",
        badge: "Direct Dial",
      },
      {
        title: "Technographic & Firmographic Signals",
        description:
          "Enrich company profiles with employee count, funding stage, revenue tier, web tech stack, and executive hierarchy.",
      },
      {
        title: "Single & Bulk API Enrichment",
        description:
          "Enrich individual profiles directly inside the CRM or trigger bulk enrichment jobs across entire lead lists.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Provide Contact Input",
        description: "Enter email address, full name + company domain, or LinkedIn profile URL.",
      },
      {
        stepNumber: "02",
        title: "Execute Waterfall Query",
        description: "Skout AI scans verification layers with live SMTP handshakes.",
      },
      {
        stepNumber: "03",
        title: "Receive Complete Profile",
        description: "Access verified work email, mobile phone, firmographics, and tech stack.",
      },
    ],
    highlights: [
      "Pay-only-on-success credit model for verified email findings",
      "Live SMTP ping verification ensures zero hard bounces",
      "Native sync with Sequences and CRM contact cards",
    ],
    faqs: [
      {
        question: "What is waterfall enrichment?",
        answer:
          "Instead of relying on a single database, waterfall enrichment checks multiple top-tier data providers sequentially until a verified match is confirmed.",
      },
      {
        question: "Are mobile phone numbers verified before delivery?",
        answer:
          "Yes, phone numbers undergo line type check (mobile vs landline) and carrier validation before being returned.",
      },
    ],
  },

  "chrome-extension": {
    slug: "chrome-extension",
    title: "Chrome Extension",
    eyebrow: "Discover Pillar",
    headline: "Prospect directly inside LinkedIn",
    headlineGradient: "with 1-click capture, enrichment, and ICP scoring.",
    subheadline:
      "Bring Skout AI power straight into Chrome. Capture leads from LinkedIn profiles (`/in/username`) or search results, enrich contact data, score ICP fit, and push leads directly to Smart Lists.",
    category: "Discover",
    iconName: "Chrome",
    mockupType: "chrome-extension",
    metrics: [
      { label: "Manifest Version", value: "V3 Sidepanel" },
      { label: "Capture Speed", value: "1-Click Instant" },
      { label: "Auth Sync", value: "Seamless Clerk Sync" },
    ],
    features: [
      {
        title: "LinkedIn Sidepanel Integration",
        description:
          "Displays a native sidepanel interface when browsing LinkedIn profiles, surfacing instant enrichment data and ICP scores.",
        badge: "Manifest V3",
      },
      {
        title: "1-Click Lead & Contact Capture",
        description:
          "Save LinkedIn prospects directly into your Skout AI Smart Lists or CRM without leaving the LinkedIn profile page.",
        badge: "1-Click Capture",
      },
      {
        title: "On-Profile ICP Match Scoring",
        description:
          "Instantly score target prospects against your workspace ICP rules directly on their LinkedIn profile.",
      },
      {
        title: "Bulk Search Extraction",
        description:
          "Extract multiple decision-maker profiles simultaneously from LinkedIn People Search results into targeted lists.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Open LinkedIn Profile",
        description: "Navigate to any LinkedIn profile (`/in/username`) or search page.",
      },
      {
        stepNumber: "02",
        title: "Click Skout Sidepanel",
        description: "View instant waterfall email lookup and AI ICP match score.",
      },
      {
        stepNumber: "03",
        title: "Add to List or Sequence",
        description: "Click to save lead directly into Skout AI workspace and trigger outreach.",
      },
    ],
    highlights: [
      "Manifest V3 architecture for ultra-fast performance and battery efficiency",
      "Seamless single sign-on via active Skout web session",
      "Bulk profile extraction directly from LinkedIn Sales Navigator and standard search",
    ],
    faqs: [
      {
        question: "How do I install the Skout AI Chrome Extension?",
        answer:
          "You can install it directly from the Chrome Web Store or load the unpacked V3 package into `chrome://extensions` in developer mode.",
      },
      {
        question: "Does the extension work with LinkedIn Sales Navigator?",
        answer:
          "Yes! The extension supports standard LinkedIn profiles, company pages, and Sales Navigator search results.",
      },
    ],
  },

  sequences: {
    slug: "sequences",
    title: "Outbound Sequences",
    eyebrow: "Engage Pillar",
    headline: "Automate multichannel sales outreach",
    headlineGradient: "with personalization and smart delay logic.",
    subheadline:
      "Build multi-step outbound sequences combining automated emails, manual phone calls, and LinkedIn tasks. Personalize copy with liquid merge tags and rotate sender mailboxes safely.",
    category: "Engage",
    iconName: "Workflow",
    mockupType: "sequences",
    metrics: [
      { label: "Channels", value: "Email, Call, LinkedIn" },
      { label: "Merge Tags", value: "Liquid Syntax" },
      { label: "Reply Conversion", value: "3.4x Increase" },
    ],
    features: [
      {
        title: "Multi-Channel Canvas Builder",
        description:
          "Design sequences with email steps, phone call tasks, LinkedIn connection steps, and conditional wait delays.",
        badge: "Visual Canvas",
      },
      {
        title: "Liquid Dynamic Personalization",
        description:
          "Use dynamic merge tags for contact attributes, company signals, custom variables, and AI-generated intro lines.",
        badge: "Dynamic Liquid",
      },
      {
        title: "Sender Mailbox Rotation",
        description:
          "Spread sequence sending volume evenly across multiple Google Workspace and Outlook mailboxes on your domain.",
      },
      {
        title: "Automatic Exit & Reply Pause",
        description:
          "Instantly halt sequence steps when a prospect replies, books a meeting, or gets flagged as out-of-office.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Design Sequence Steps",
        description: "Add email templates, manual call tasks, and time delay nodes.",
      },
      {
        stepNumber: "02",
        title: "Add Personalization Tags",
        description: "Insert dynamic merge tags and AI review safeguards.",
      },
      {
        stepNumber: "03",
        title: "Enroll & Rotate Sender",
        description: "Push Smart Lists into sequence, rotating sender mailboxes automatically.",
      },
    ],
    highlights: [
      "Native integration with Dexter AI for automated sequence copy generation",
      "Timezone-aware scheduling delivers emails during recipient business hours",
      "Automatic bounce detection pauses sending to protect domain health",
    ],
    faqs: [
      {
        question: "How many mailboxes can I attach to one sequence?",
        answer:
          "You can attach unlimited sender mailboxes to a single sequence. Volume is distributed evenly across accounts.",
      },
      {
        question: "Can I set manual tasks inside a sequence?",
        answer:
          "Yes, manual call tasks and LinkedIn touchpoints will pause the sequence for that prospect until marked complete in your Task Queue.",
      },
    ],
  },

  inbox: {
    slug: "inbox",
    title: "Unified Inbox",
    eyebrow: "Engage Pillar",
    headline: "Centralized reply management workspace",
    headlineGradient: "with AI sentiment tagging and team collision protection.",
    subheadline:
      "Manage prospect replies across all sending mailboxes in one central inbox. Dexter AI automatically categorizes reply sentiment, drafts suggested responses, and syncs deal stages.",
    category: "Engage",
    iconName: "Inbox",
    mockupType: "inbox",
    metrics: [
      { label: "Mailbox Sync", value: "Multi-Account" },
      { label: "Sentiment Tagging", value: "AI Automated" },
      { label: "Response Speed", value: "< 2 Mins Avg" },
    ],
    features: [
      {
        title: "Multi-Mailbox Central View",
        description:
          "Consolidate responses from all connected Google and Outlook sending mailboxes into one unified stream.",
        badge: "Unified Stream",
      },
      {
        title: "AI Reply Sentiment Categorization",
        description:
          "Dexter AI automatically tags incoming messages as Interested, Meeting Requested, Not Interested, OOO, or Unsubscribe.",
        badge: "AI Sentiment",
      },
      {
        title: "Team Collision & Live Presence",
        description:
          "Prevents duplicate team responses with live presence indicators and internal team notes on prospect threads.",
      },
      {
        title: "1-Click Deal & Meeting Sync",
        description:
          "Convert positive replies directly into CRM deal stages and schedule calls without leaving the inbox view.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Receive Unified Messages",
        description: "All prospect replies arrive instantly into the central inbox queue.",
      },
      {
        stepNumber: "02",
        title: "Inspect AI Sentiment Tag",
        description: "Review AI-generated summary, sentiment classification, and suggested reply.",
      },
      {
        stepNumber: "03",
        title: "Reply & Progress Deal",
        description: "Send reply, book calendar meeting, and update deal status in CRM.",
      },
    ],
    highlights: [
      "Filters out-of-office auto-responders automatically from action queues",
      "Full conversation history linked to CRM contact cards",
      "AI-drafted response suggestions tailored to prospect queries",
    ],
    faqs: [
      {
        question: "Which email providers are supported by Unified Inbox?",
        answer:
          "We support bi-directional sync for Google Workspace (OAuth) and Microsoft 365 / Exchange accounts.",
      },
      {
        question: "How does team collision detection work?",
        answer:
          "When a colleague opens or types a reply on a thread, an active badge alerts you so two reps don't reply simultaneously.",
      },
    ],
  },

  "ai-review": {
    slug: "ai-review",
    title: "AI Review & Copy QA",
    eyebrow: "Engage Pillar",
    headline: "Pre-flight outbound copy auditor",
    headlineGradient: "to eliminate spam triggers and optimize conversion.",
    subheadline:
      "Scan sequence copy before launching. Detect spam trigger words, calculate readability grade levels, evaluate subject line strength, and auto-optimize tone for maximum inboxing.",
    category: "Engage",
    iconName: "CheckCircle2",
    mockupType: "ai-review",
    metrics: [
      { label: "Spam Word Index", value: "2,500+ Keywords" },
      { label: "Target Grade", value: "Grade 5-7 Reading" },
      { label: "Inboxing Boost", value: "+38% Deliverability" },
    ],
    features: [
      {
        title: "Spam Keyword Scanner",
        description:
          "Flags aggressive sales jargon, spam-trap phrases, excessive capitalizations, and suspicious links before sending.",
        badge: "Spam Safeguard",
      },
      {
        title: "Readability & Length Scoring",
        description:
          "Scores email copy readability grade level and word count, recommending punchy, mobile-optimized edits.",
        badge: "Readability Score",
      },
      {
        title: "AI Subject Line Variation Generator",
        description:
          "Generates high-performing subject line variants tailored to target prospect title and industry sector.",
      },
      {
        title: "Unsubscribe & Link Health Check",
        description:
          "Validates unsubscribe link inclusion, tracking pixel domain alignment, and link syntax integrity.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Input Sequence Draft",
        description: "Paste outbound email templates or let AI review existing campaign copy.",
      },
      {
        stepNumber: "02",
        title: "Run Pre-Flight Scan",
        description: "View instant spam score, reading ease grade, and subject line rating.",
      },
      {
        stepNumber: "03",
        title: "Auto-Optimize Copy",
        description:
          "Apply one-click recommendations to eliminate spam triggers and boost response rates.",
      },
    ],
    highlights: [
      "Protects domain sending reputation prior to campaign launch",
      "Tone customization presets: Consultative, Direct, Professional, Friendly",
      "Real-time feedback integrated directly into sequence step editor",
    ],
    faqs: [
      {
        question: "Why should I run AI Review before sending campaigns?",
        answer:
          "Modern email filters scan text for spam trigger words and complex formatting. AI Review catches these issues before they affect your inbox placement.",
      },
      {
        question: "Can I customize the reading level targets?",
        answer:
          "Yes, you can set target reading grade levels based on your buyer persona (e.g. C-suite vs technical buyers).",
      },
    ],
  },

  deliverability: {
    slug: "deliverability",
    title: "Deliverability & Warmup",
    eyebrow: "Engage Pillar",
    headline: "Proactive domain health monitoring",
    headlineGradient: "and peer-to-peer automated inbox warmup.",
    subheadline:
      "Ensure your cold emails land in the inbox, not the spam folder. Monitor SPF, DKIM, DMARC, run automated inbox warmup, and track placement rates across major email providers.",
    category: "Engage",
    iconName: "ShieldCheck",
    mockupType: "deliverability",
    metrics: [
      { label: "Inbox Placement", value: "99.4% Avg" },
      { label: "Warmup Pool", value: "50,000+ Mailboxes" },
      { label: "DNS Audit", value: "Continuous 24/7" },
    ],
    features: [
      {
        title: "Peer-to-Peer Automated Warmup",
        description:
          "Ramps up sending volume gradually with positive peer engagement, automatic thread replies, and un-spamming.",
        badge: "Peer Network",
      },
      {
        title: "DNS Authentication Audit",
        description:
          "Verifies SPF records, DKIM signatures, DMARC policies, and Custom Tracking Domains to ensure 100% compliance.",
        badge: "DNS Audit",
      },
      {
        title: "Global Blacklist Monitoring",
        description:
          "Continuously monitors Spamhaus, Barracuda, Abuseat, and 50+ DNS blacklists, alerting you instantly if flagged.",
      },
      {
        title: "Smart Daily Sending Caps & Auto-Pause",
        description:
          "Enforces safe daily email caps per domain and automatically pauses sequences if bounce rate exceeds 2.5%.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Connect Sending Domains",
        description: "Add sending accounts and run instant DNS health diagnostic.",
      },
      {
        stepNumber: "02",
        title: "Start Peer Warmup Engine",
        description: "Enable automated warmup to build sender reputation across real mailboxes.",
      },
      {
        stepNumber: "03",
        title: "Track Placement Dashboard",
        description: "Monitor inbox vs spam placement scores and domain health metrics 24/7.",
      },
    ],
    highlights: [
      "Human-like warmup conversation threads with high engagement rates",
      "Automated campaign pause protection if bounce threshold is crossed",
      "Custom tracking domain setup guide for zero domain friction",
    ],
    faqs: [
      {
        question: "How long should I warm up a new domain before sending cold outreach?",
        answer:
          "We recommend running automated warmup for 14 days minimum before starting cold outreach, gradually scaling daily sending volume.",
      },
      {
        question: "What happens if my bounce rate exceeds safety thresholds?",
        answer:
          "Skout AI automatically pauses sequence sending on that domain, notifies your admin, and provides remediation steps.",
      },
    ],
  },

  crm: {
    slug: "crm",
    title: "Native GTM CRM",
    eyebrow: "Convert Pillar",
    headline: "Single source of truth for GTM teams",
    headlineGradient: "integrating prospecting, outreach, and deal records.",
    subheadline:
      "Replace fragmented CRM systems. Manage companies, contacts, deals, tasks, and meetings in a unified database purpose-built for outbound sales teams.",
    category: "Convert",
    iconName: "Database",
    mockupType: "crm",
    metrics: [
      { label: "Data Architecture", value: "Unified Database" },
      { label: "HubSpot Sync", value: "2-Way Real-time" },
      { label: "Query Speed", value: "Sub-Second" },
    ],
    features: [
      {
        title: "360° Contact & Account Timeline",
        description:
          "View complete prospect interaction history: email touchpoints, opens, clicks, call notes, and enrichment data on one record.",
        badge: "360° Timeline",
      },
      {
        title: "Native Deal & Revenue Tracking",
        description:
          "Track opportunity values, close dates, stage transitions, and deal owners without secondary CRM software.",
        badge: "Native CRM",
      },
      {
        title: "Bi-Directional HubSpot Sync",
        description:
          "Sync contacts, accounts, and deal stages seamlessly with HubSpot in real time.",
      },
      {
        title: "Custom Attributes & Saved Filters",
        description:
          "Create custom contact and deal properties, organized into saved team views and segment filters.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Ingest Lead Records",
        description:
          "Leads automatically populate contact cards upon prospect search, import, or extension capture.",
      },
      {
        stepNumber: "02",
        title: "Log Activities Automatically",
        description:
          "Outbound emails, replies, phone calls, and meetings log to timeline automatically.",
      },
      {
        stepNumber: "03",
        title: "Manage & Close Deals",
        description: "Progress opportunities through revenue pipeline stages.",
      },
    ],
    highlights: [
      "Zero sync latency between prospecting, sequence outreach, and CRM records",
      "Native calendar integration displays upcoming meetings directly on contact cards",
      "Dexter AI deal summary assistant embedded on every opportunity page",
    ],
    faqs: [
      {
        question: "Can I use Skout CRM as our primary company sales CRM?",
        answer:
          "Yes! Skout CRM provides full company, contact, deal pipeline, task queue, and meeting scheduling capabilities out of the box.",
      },
      {
        question: "Does Skout CRM support custom properties?",
        answer:
          "Yes, you can create custom text, number, dropdown, and date properties for contacts, companies, and deals.",
      },
    ],
  },

  pipeline: {
    slug: "pipeline",
    title: "Visual Deal Pipeline",
    eyebrow: "Convert Pillar",
    headline: "Drag-and-drop Kanban deal board",
    headlineGradient: "with revenue velocity and stage forecasting.",
    subheadline:
      "Manage sales opportunities visually. Drag deals across customizable stages, calculate weighted pipeline forecasts, and identify stale deals before they drop off.",
    category: "Convert",
    iconName: "Kanban",
    mockupType: "pipeline",
    metrics: [
      { label: "Board View", value: "Drag & Drop Kanban" },
      { label: "Custom Stages", value: "Fully Tailored" },
      { label: "Forecasting", value: "Weighted Pipeline" },
    ],
    features: [
      {
        title: "Interactive Kanban Deal Board",
        description:
          "Move deals seamlessly between stages: Lead Qualified, Demo Scheduled, Proposal Sent, Negotiation, Closed Won.",
        badge: "Visual Kanban",
      },
      {
        title: "Weighted Pipeline Forecasting",
        description:
          "Calculates total pipeline revenue and weighted stage projections in real time.",
        badge: "Real-time Forecast",
      },
      {
        title: "Stale Deal Inactivity Alerts",
        description:
          "Flags deals with no logged activity or missed follow-ups so reps prioritize active opportunities.",
      },
      {
        title: "Account Context Drawer",
        description:
          "Click any deal card to inspect conversation threads, contact roles, and Dexter AI deal summaries instantly.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Create Deal Opportunity",
        description:
          "Convert interested prospect into a deal card with deal value and target close date.",
      },
      {
        stepNumber: "02",
        title: "Drag Across Stages",
        description: "Progress deal status as sales conversations proceed from demo to contract.",
      },
      {
        stepNumber: "03",
        title: "Close & Analyze",
        description: "Track deal velocity metrics and mark opportunities Closed Won.",
      },
    ],
    highlights: [
      "Customizable stages tailored to your unique sales process",
      "Filter deal board by deal owner, deal size, or target close date",
      "Dexter AI summary of past touchpoints directly inside deal view",
    ],
    faqs: [
      {
        question: "Can I create multiple sales pipelines?",
        answer:
          "Yes, you can create separate deal pipelines for different product lines, regions, or sales motions.",
      },
      {
        question: "How does weighted forecasting work?",
        answer:
          "Each pipeline stage is assigned a win probability percentage. Weighted forecast multiplies deal size by stage win probability.",
      },
    ],
  },

  "tasks-meetings": {
    slug: "tasks-meetings",
    title: "Tasks & Meetings",
    eyebrow: "Convert Pillar",
    headline: "Streamlined action queue and calendar sync",
    headlineGradient: "to ensure zero missed sales follow-ups.",
    subheadline:
      "Never miss a scheduled demo or manual follow-up call. Execute manual email, phone, and LinkedIn tasks efficiently while syncing calls directly with Google Calendar.",
    category: "Convert",
    iconName: "CalendarCheck",
    mockupType: "tasks",
    metrics: [
      { label: "Calendar Sync", value: "Google Calendar" },
      { label: "Execution Queue", value: "Streamlined Keyboard" },
      { label: "Outcome Logging", value: "1-Click Tagging" },
    ],
    features: [
      {
        title: "Rapid Task Action Queue",
        description:
          "Execute manual phone calls, LinkedIn messages, and custom follow-up tasks with one-click queue progression.",
        badge: "Action Queue",
      },
      {
        title: "2-Way Google Calendar Sync",
        description:
          "Bi-directional sync displays scheduled demo calls directly on contact records and updates calendar availability.",
        badge: "2-Way Sync",
      },
      {
        title: "Sequence-Generated Manual Touchpoints",
        description:
          "Sequences automatically generate tasks when a prospect reaches a manual outreach step.",
      },
      {
        title: "1-Click Meeting Outcome Logging",
        description:
          "Log call notes, outcome statuses (Held, Rescheduled, No Show), and follow-up tasks in seconds.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Open Daily Task Queue",
        description:
          "View prioritized tasks due today (phone calls, LinkedIn tasks, custom follow-ups).",
      },
      {
        stepNumber: "02",
        title: "Execute & Record Notes",
        description: "Complete tasks using rapid keyboard shortcuts and log interaction notes.",
      },
      {
        stepNumber: "03",
        title: "Schedule Next Meeting",
        description: "Book follow-up calls directly to Google Calendar.",
      },
    ],
    highlights: [
      "Keyboard shortcuts for lightning-fast task execution",
      "Automatic deal stage progression based on meeting outcomes",
      "Centralized view of upcoming team sales calls",
    ],
    faqs: [
      {
        question: "How do manual tasks work within automated sequences?",
        answer:
          "When a sequence reaches a manual step (e.g. Call or LinkedIn message), sending pauses for that prospect until you complete the task in your Queue.",
      },
      {
        question: "Does Google Calendar sync bidirectionally?",
        answer: "Yes, meetings created in Skout or Google Calendar sync both ways in real time.",
      },
    ],
  },

  analytics: {
    slug: "analytics",
    title: "Sales & GTM Analytics",
    eyebrow: "Convert Pillar",
    headline: "End-to-end GTM performance visibility",
    headlineGradient: "from prospect discovery to closed revenue.",
    subheadline:
      "Track outbound campaign conversion rates, email deliverability health, deal stage movement, and team activity with real-time reporting dashboards.",
    category: "Convert",
    iconName: "BarChart3",
    mockupType: "analytics",
    metrics: [
      { label: "Reporting Engine", value: "Real-time Dashboards" },
      { label: "Data Granularity", value: "Sequence, Rep, Deal" },
      { label: "Export Formats", value: "CSV & Custom Views" },
    ],
    features: [
      {
        title: "Sequence Conversion Funnels",
        description:
          "Track open rates, click-through rates, reply percentages, bounce rates, and meeting booking rates per sequence.",
        badge: "Conversion Funnels",
      },
      {
        title: "Pipeline Movement & Velocity Metrics",
        description:
          "Analyze deal stage conversion rates, average deal cycle duration, and total revenue closed over time.",
        badge: "Revenue Velocity",
      },
      {
        title: "Sales Rep Activity Leaderboard",
        description:
          "Monitor outbound activity per rep: emails sent, calls completed, meetings booked, and deal value generated.",
      },
      {
        title: "Deliverability Health Metrics",
        description:
          "Track inbox placement rates, bounce rate trends, and domain health scores across sender accounts.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Inspect High-Level Dashboards",
        description: "Review aggregate campaign performance, replies, and pipeline growth.",
      },
      {
        stepNumber: "02",
        title: "Drill Into Specific Campaigns",
        description: "Identify top-performing email subject lines and messaging steps.",
      },
      {
        stepNumber: "03",
        title: "Optimize GTM Motion",
        description:
          "Double down on high-converting ICP segments and refine underperforming channels.",
      },
    ],
    highlights: [
      "Customizable date range filters and team member views",
      "Visual charts for daily outreach volume and conversion curves",
      "Exportable CSV reports for executive reporting",
    ],
    faqs: [
      {
        question: "Can I filter reporting by individual sales reps?",
        answer:
          "Yes, admins can view team-wide metrics or filter reports down to individual sales reps.",
      },
      {
        question: "How are email opens and clicks tracked?",
        answer:
          "Skout AI uses custom tracking domains to monitor opens and clicks accurately without degrading email deliverability.",
      },
    ],
  },

  "dexter-ai": {
    slug: "dexter-ai",
    title: "Dexter AI Intelligence",
    eyebrow: "GTM AI Layer",
    headline: "Your autonomous GTM AI assistant",
    headlineGradient: "for account research, copywriting, and deal execution.",
    subheadline:
      "Dexter AI connects natively to your Skout workspace database. Ask Dexter to research target accounts, draft hyper-personalized sequences, summarize deal history, and suggest next best actions.",
    category: "GTM AI",
    iconName: "Bot",
    mockupType: "dexter",
    metrics: [
      { label: "AI Models Supported", value: "BYOK (GPT-4o, Claude 3.5)" },
      { label: "Context Engine", value: "Full Database Awareness" },
      { label: "Execution Speed", value: "Sub-Second Response" },
    ],
    features: [
      {
        title: "Account & Prospect Deep Research",
        description:
          "Ask Dexter to analyze target companies, extract key executive priorities, and summarize recent news for outreach context.",
        badge: "Deep Research",
      },
      {
        title: "Hyper-Personalized Copywriting",
        description:
          "Generate tailored cold email sequences, LinkedIn openers, and follow-ups based on real prospect data.",
        badge: "AI Copywriter",
      },
      {
        title: "Deal Summary & Next Best Action",
        description:
          "Summarize complex conversation threads, call notes, and get recommended next sales steps to push deals forward.",
      },
      {
        title: "BYOK (Bring Your Own Key) Support",
        description:
          "Connect your own API keys for OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), or OpenRouter for full model control.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Prompt Dexter",
        description:
          "Ask queries like 'Summarize account X' or 'Draft personalized sequence for persona Y'.",
      },
      {
        stepNumber: "02",
        title: "Review AI Synthesis",
        description: "Dexter queries your Skout database and generates structured insights.",
      },
      {
        stepNumber: "03",
        title: "Execute Instantly",
        description: "Push generated copy directly into sequences, contacts, or CRM deal notes.",
      },
    ],
    highlights: [
      "Native intelligence layer embedded into every page of the Skout AI workspace",
      "Respects BYOK security model so your proprietary data remains private",
      "Learns from your top-performing sequence templates and target ICPs",
    ],
    faqs: [
      {
        question: "What does BYOK (Bring Your Own Key) mean?",
        answer:
          "BYOK allows you to supply your own API key for OpenAI or Anthropic, giving you complete privacy, model choice, and cost control.",
      },
      {
        question: "How does Dexter AI access my lead data?",
        answer:
          "Dexter connects securely to your workspace database, retrieving prospect profiles, notes, and activity history to provide relevant context.",
      },
    ],
  },

  "icp-setup": {
    slug: "icp-setup",
    title: "ICP Setup & Targeting",
    eyebrow: "Discover Pillar",
    headline: "Define your Ideal Customer Profile",
    headlineGradient: "and score target accounts automatically.",
    subheadline:
      "Build precise targeting rules for firmographics, tech stack, and decision-maker personas in an interactive wizard. Dexter AI ranks incoming leads against your defined ICP matrix.",
    category: "Discover",
    iconName: "Target",
    mockupType: "smart-lists",
    metrics: [
      { label: "ICP Scoring", value: "0-100 Rating" },
      { label: "Setup Wizard", value: "4-Step Guided" },
      { label: "Tier Matrix", value: "Tier 1 / 2 / 3" },
    ],
    features: [
      {
        title: "Guided ICP Setup Wizard",
        description:
          "Configure target industry verticals, revenue tiers, employee headcount ranges, and geographical boundaries in minutes.",
        badge: "Setup Wizard",
      },
      {
        title: "Technographic & Signal Matrix",
        description:
          "Specify mandatory software tools, funding milestones, or hiring indicators required for Tier 1 account status.",
        badge: "Signal Matrix",
      },
      {
        title: "Automated Account & Lead Scoring",
        description:
          "Dexter AI evaluates incoming leads in real time, assigning numerical fit scores and tier tags.",
      },
      {
        title: "Dynamic Smart List Integration",
        description:
          "Instantly feed high-scoring Tier 1 prospects into dedicated Smart Lists and automated outreach sequences.",
      },
    ],
    workflow: [
      {
        stepNumber: "01",
        title: "Launch ICP Wizard",
        description: "Define target titles, company size, revenue, and geography.",
      },
      {
        stepNumber: "02",
        title: "Select Technographics",
        description: "Choose required tech stack signals and growth triggers.",
      },
      {
        stepNumber: "03",
        title: "Score & Prospect",
        description: "Skout AI automatically scores database contacts and flags Tier 1 leads.",
      },
    ],
    highlights: [
      "Guided setup wizard configures team-wide targeting rules",
      "Seamless integration with Chrome Extension and Prospect Search",
      "AI-assisted persona matching powered by Dexter AI",
    ],
    faqs: [
      {
        question: "How does ICP scoring work?",
        answer:
          "Skout AI compares prospect and company attributes against your ICP rules, assigning a score from 0 to 100 and categorizing leads into Tier 1, 2, or 3.",
      },
      {
        question: "Can I update my ICP criteria after launching?",
        answer:
          "Yes, you can edit your ICP rules anytime in Workspace Settings. Prospect scores will update automatically.",
      },
    ],
  },
};
