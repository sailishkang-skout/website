"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Database,
  ShieldCheck,
  Zap,
  ArrowRight,
  Bot,
  Layers,
  Globe,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Lock,
  Workflow,
  BarChart3,
  Cpu,
  Mail,
  Search,
  Check,
  Key,
  HelpCircle,
  ArrowUpRight,
  X,
  Target,
  FileSpreadsheet,
  LineChart,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { WORKSPACE_URL } from "@/lib/constants";

export default function IntelligenceClient() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const waterfallSteps = [
    { num: "01", title: "1. Understand the Request", desc: "What are we trying to identify? A person? A work email? A phone number? A company? A technology? A hiring signal? An intent signal?" },
    { num: "02", title: "2. Determine Best Available Sources", desc: "Skout evaluates the type of information required and selects the appropriate specialized data sources dynamically." },
    { num: "03", title: "3. Query Providers in Sequence", desc: "If the first source doesn't provide a sufficiently useful result, Skout automatically moves to another source in defined priority order." },
    { num: "04", title: "4. Verify the Result", desc: "Returned information isn't automatically treated as truth. Skout validates information through additional signals and verification systems." },
    { num: "05", title: "5. Score the Evidence", desc: "Multiple signals can be combined to calculate a precise confidence rating and risk score." },
    { num: "06", title: "6. Build Context", desc: "The resulting information becomes part of the unified account and prospect intelligence graph." },
    { num: "07", title: "7. Take Action", desc: "The intelligence directly influences prospect prioritization, personalization, sequencing, CRM workflows, and GTM actions." },
  ];

  const emailSignals = [
    { title: "Domain Intelligence", desc: "Domain existence, DNS records, domain age, and registrars" },
    { title: "MX Infrastructure", desc: "Mail server configuration, MX health, and routing capability" },
    { title: "SMTP Live Signals", desc: "Real-time mail server handshake without sending an email" },
    { title: "Mailbox Signals", desc: "Reachability check, inbox state, and mailbox availability" },
    { title: "Catch-All Analysis", desc: "Domain-level catch-all behavior & pattern verification" },
    { title: "Provider Detection", desc: "Google Workspace, Microsoft 365, or custom enterprise servers" },
    { title: "Pattern Intelligence", desc: "Historical corporate email syntax & pattern matching" },
    { title: "Historical Evidence", desc: "Aggregated verification signals and bounce prevention history" },
  ];

  const questionsAnswered = [
    "Why this account matters",
    "Why this person matters",
    "Whether the information is reliable",
    "What changed recently",
    "What signals are important",
    "What context should influence outreach",
    "What should happen next",
  ];

  const regionalAwarenessList = [
    { title: "Business Structures", desc: "Different corporate registration types and legal entity formats across regions." },
    { title: "Naming Conventions", desc: "Localized company & contact naming variations and regional syntax." },
    { title: "Domain Conventions", desc: "Regional ccTLDs, country-specific web footprints, and local hostings." },
    { title: "Data Availability", desc: "Varying public record density, local registries, and data coverage." },
    { title: "Technology Adoption", desc: "Different regional tech stack adoption patterns and software tools." },
    { title: "Communication Preferences", desc: "Market-specific channels (Email, LinkedIn, WhatsApp, Local platforms)." },
    { title: "Regulatory Compliance", desc: "GDPR, UK GDPR, CCPA/CPRA, India DPDP, CASL, and regional privacy laws." },
    { title: "Market Signals", desc: "Localized hiring trends, localized job titles, and regional growth indicators." },
  ];

  const stackItems = [
    { category: "CRM", tools: "HubSpot · Salesforce · Custom CRM systems" },
    { category: "Data", tools: "Internal databases · Data warehouses · Enrichment providers" },
    { category: "AI", tools: "Skout AI · BYOK (OpenAI/Anthropic) · Authorized AI models" },
    { category: "Communication", tools: "Email infrastructure · LinkedIn · Calling workflows" },
    { category: "Infrastructure", tools: "APIs · Webhooks · Cloud infrastructure · Internal systems" },
    { category: "Analytics", tools: "Revenue intelligence · Pipeline management · Custom reporting" },
  ];

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <div className="relative border-b border-border/60 bg-background">
        <Section className="py-12! md:py-20! text-center relative z-10">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SKOUT PLATFORM INTELLIGENCE</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
              The intelligence layer behind your <span className="text-accent">GTM stack.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-muted-foreground">
              Skout doesn't just collect data. It enriches, verifies, contextualizes, scores, and connects information across your revenue workflow — so your team can understand who to target, why they matter, what to know, and what to do next.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={WORKSPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-accent/90"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                <span>Book Architecture Demo</span>
              </Link>
            </div>

            <div className="pt-4 font-mono text-xs text-accent font-bold flex flex-wrap items-center justify-center gap-2">
              <span>Data</span>
              <span>→</span>
              <span>Enrich</span>
              <span>→</span>
              <span>Verify</span>
              <span>→</span>
              <span>Understand</span>
              <span>→</span>
              <span>Decide</span>
              <span>→</span>
              <span>Act</span>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. CORE PARADIGM SHIFT SECTION */}
      <Section className="py-12! md:py-16! border-b border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Core Architecture Paradigm</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Intelligence starts before the <GradientText>first message.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The best outbound systems don't just find more data. They understand the data they find. Most sales platforms treat data as a static record (<code className="text-accent font-mono text-xs">Name → Company → Title → Email</code>). Skout treats it as a constantly changing intelligence problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <X className="h-5 w-5" /> Traditional Platforms (Static Record)
            </div>
            <div className="p-4 rounded-xl bg-background border border-border font-mono text-xs text-muted-foreground">
              Name → Company → Title → Email
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Accepts whatever static database returns. Doesn't check whether the company pivoted, whether the email is reachable, whether the tech stack changed, or whether the timing makes sense.
            </p>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 space-y-4 shadow-md">
            <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider">
              <Sparkles className="h-5 w-5" /> Skout AI (Dynamic Intelligence)
            </div>
            <div className="p-4 rounded-xl bg-background border border-accent/30 font-mono text-xs text-accent font-bold">
              Data → Verification → Context → Intelligence → Decision → Action
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Before Skout decides what information to use, enrich, verify, prioritize, or act on, it considers company, person, market, geography, technology, hiring activity, intent, and available evidence.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. WATERFALL ENRICHMENT ARCHITECTURE */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Waterfall Enrichment Architecture</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            A waterfall that gets smarter at <GradientText>every step.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Data shouldn't come from one provider. No single provider has perfect coverage. That's why Skout uses a waterfall enrichment architecture: <span className="text-accent font-bold">Source → Compare → Verify → Score → Resolve → Learn</span>. One question. Multiple sources. One verified answer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {waterfallSteps.map((step, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20">
                  {step.num}
                </span>
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Stage {idx + 1}</span>
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-accent bg-accent/10 p-6 space-y-3 flex flex-col justify-center items-center text-center shadow-lg">
            <CheckCircle2 className="h-10 w-10 text-accent" />
            <h3 className="font-display text-base font-bold text-foreground">One Verified Answer</h3>
            <p className="text-xs text-muted-foreground">Pay only for verified, high-confidence prospect data.</p>
          </div>
        </div>
      </Section>

      {/* 4. EMAIL INTELLIGENCE ENGINE */}
      <Section className="py-12! md:py-16! border-b border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Email Intelligence Engine</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Email isn't just an address. <GradientText>It's a signal.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Skout's email intelligence goes far beyond simple "Valid/Invalid" checking. We evaluate domain health, mail exchange infrastructure, real-time SMTP handshakes, catch-all patterns, and historical evidence before your team builds a workflow around an address.
          </p>
        </div>

        {/* COMPARISON FLOW DIAGRAM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h4 className="font-display text-sm font-bold text-rose-400 uppercase tracking-wider">Traditional Email Verification</h4>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-muted text-xs font-mono">
              <span>Email</span>
              <span>→</span>
              <span className="text-rose-400 font-bold">Valid / Invalid</span>
            </div>
            <p className="text-xs text-muted-foreground">Binary check with high false positives and zero context on deliverability risk.</p>
          </div>

          <div className="rounded-2xl border border-accent bg-card p-6 space-y-4 shadow-lg">
            <h4 className="font-display text-sm font-bold text-accent uppercase tracking-wider">Skout Email Intelligence</h4>
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-xs font-mono text-accent flex flex-wrap items-center justify-center gap-1.5 font-bold">
              <span>Email</span>
              <span>→</span>
              <span>Domain</span>
              <span>→</span>
              <span>MX</span>
              <span>→</span>
              <span>SMTP</span>
              <span>→</span>
              <span>Catch-All</span>
              <span>→</span>
              <span>Confidence</span>
              <span>→</span>
              <span>Send Eligibility</span>
            </div>
            <p className="text-xs text-muted-foreground">Calculates exact confidence level, evidence sources, and sending eligibility.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {emailSignals.map((sig, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-accent/40 transition-colors shadow-sm">
              <div className="flex items-center gap-2 text-accent font-bold text-xs">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <h4>{sig.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{sig.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. THE SKOUT INTELLIGENCE LAYER ARCHITECTURE MATRIX */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Platform Architecture</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            The Skout Intelligence Layer
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Intelligence across every stage of the outbound revenue workflow.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground font-display font-bold text-xs uppercase tracking-wider">
              SKOUT INTELLIGENCE LAYER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
              <div className="font-display font-bold text-sm text-accent uppercase tracking-wider flex items-center gap-2">
                <Database className="h-4 w-4" /> Data
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Prospect Data</li>
                <li>• Contact Data</li>
                <li>• Firmographics</li>
                <li>• Technographics</li>
                <li>• Waterfall Enrichment</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
              <div className="font-display font-bold text-sm text-accent uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-4 w-4" /> Context
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Company Context</li>
                <li>• Person Context</li>
                <li>• Technology Stack</li>
                <li>• Relationships</li>
                <li>• Regional Geography</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
              <div className="font-display font-bold text-sm text-accent uppercase tracking-wider flex items-center gap-2">
                <Zap className="h-4 w-4" /> Signals
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Account Intent</li>
                <li>• Hiring Activity</li>
                <li>• Job Changes</li>
                <li>• Company Growth</li>
                <li>• Engagement Signals</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4 border-t border-border/60">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-foreground">
              <span className="px-4 py-2 rounded-xl bg-muted border border-border">VERIFICATION</span>
              <span>→</span>
              <span className="px-4 py-2 rounded-xl bg-muted border border-border">CONFIDENCE / RISK</span>
              <span>→</span>
              <span className="px-4 py-2 rounded-xl bg-accent/20 border border-accent/40 text-accent font-bold">INTELLIGENCE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
              <div className="rounded-2xl border border-border bg-background p-5 space-y-2 text-center">
                <div className="font-display font-bold text-xs text-accent uppercase tracking-wider">DECIDE</div>
                <p className="text-xs text-muted-foreground">Prioritize Accounts · Qualify Leads · Research Accounts · Route Prospects</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5 space-y-2 text-center">
                <div className="font-display font-bold text-xs text-accent uppercase tracking-wider">ACT</div>
                <p className="text-xs text-muted-foreground">Outreach Sequences · CRM Sync · Multi-Channel Workflows · Email Execution</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. REGIONAL & MARKET INTELLIGENCE */}
      <Section className="py-12! md:py-16! border-b border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Regional Intelligence</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Markets behave differently. <GradientText>One intelligence model. Regional awareness.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The world isn't one standardized database. A prospect in North America produces a very different data footprint from Germany, India, Japan, Australia, Brazil, or the UK. Skout's architecture is designed to account for those regional differences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {regionalAwarenessList.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-5 space-y-2 hover:border-accent/40 transition-colors shadow-sm">
              <div className="flex items-center gap-2 text-accent font-bold text-sm">
                <Globe className="h-4 w-4 shrink-0" />
                <h4>{item.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. QUESTIONS INTELLIGENCE ANSWERS */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Context Over Data</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            A database tells you what exists. Intelligence helps you <GradientText>understand.</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {questionsAnswered.map((q, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card p-5 space-y-2 flex items-start gap-3 shadow-sm">
              <div className="p-1.5 rounded-lg bg-accent/10 text-accent mt-0.5 shrink-0">
                <HelpCircle className="h-4 w-4" />
              </div>
              <span className="font-display font-semibold text-xs sm:text-sm text-foreground">{q}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. DEXTER + SKOUT INTELLIGENCE LAYER */}
      <Section className="py-12! md:py-16! border-b border-border/60">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-10 shadow-2xl max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background font-bold">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">Dexter + Intelligence Layer</h3>
              <p className="text-xs text-accent font-semibold">Dexter is the interaction layer. Skout Intelligence is the underlying engine.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Dexter doesn't start with a blank chat box. It starts with the intelligence already inside Skout — using account context, intent signals, verification evidence, and pipeline activity to answer key questions and drive action.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { q: "Which accounts match our ICP?", a: "Dexter evaluates firmographics, technographics, and intent signals stored in your workspace." },
              { q: "Why should we prioritize this account?", a: "Dexter reasons from hiring activity, technological shifts, and verified account signals." },
              { q: "What should I know before contacting?", a: "Dexter surfaces key executive changes, recent news, and relevant persona context." },
              { q: "What should I do next?", a: "Dexter recommends specific sequences, personalized messaging, or CRM routing actions." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border/80 bg-background p-4 space-y-1.5 text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <span className="text-accent">Ask:</span> "{item.q}"
                </div>
                <div className="text-muted-foreground leading-relaxed pl-4 border-l border-accent/40">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 9. YOUR STACK. YOUR DATA. YOUR INTELLIGENCE. */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Enterprise Architecture</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Your Stack. Your Data. <GradientText>Your Intelligence.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Intelligence shouldn't require replacing everything. Skout adapts to the way your organization operates, sitting above and between your existing revenue systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {stackItems.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md hover:border-accent/40 transition-colors">
              <div className="font-display font-bold text-sm text-accent uppercase tracking-wider">
                {item.category}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.tools}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 10. FINAL CTA BANNER */}
      <Section className="py-12! md:py-16!">
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-r from-accent/15 via-card to-card p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Build your GTM on an <GradientText>intelligence foundation.</GradientText>
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect your prospecting, enrichment, verification, AI research, outreach, CRM, and analytics into a unified intelligence ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={WORKSPACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-xs sm:text-sm font-bold text-accent-foreground shadow-lg transition-all hover:bg-accent/90"
            >
              <span>Get Started Free — $0</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <span>Talk to Architecture Sales</span>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
