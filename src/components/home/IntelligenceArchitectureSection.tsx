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
  ChevronRight,
  Share2,
  X,
} from "lucide-react";
import { Eyebrow, GradientText } from "@/components/site/Section";

export function IntelligenceArchitectureSection() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "email" | "regional" | "loop" | "stack">("waterfall");

  const waterfallSteps = [
    { num: "01", title: "Understand Request", desc: "Identify target person, work email, phone, company firmographics, tech stack, or intent signal." },
    { num: "02", title: "Determine Best Sources", desc: "Evaluate required info type and select optimal specialized data providers dynamically." },
    { num: "03", title: "Query in Sequence", desc: "Waterfall across providers in defined priority order until a verified match is found." },
    { num: "04", title: "Verify Result", desc: "Validate returned data using live SMTP checks, DNS signals, and verification systems." },
    { num: "05", title: "Score Evidence", desc: "Combine multiple verification signals to calculate a precise confidence rating." },
    { num: "06", title: "Build Context", desc: "Integrate verified insights into the account and prospect intelligence graph." },
    { num: "07", title: "Take Action", desc: "Drive prospect prioritization, personalized sequencing, CRM routing, and GTM execution." },
  ];

  const emailSignals = [
    { title: "Domain Existence", desc: "Active DNS records & domain age check" },
    { title: "MX Infrastructure", desc: "Mail exchange server availability & health" },
    { title: "SMTP Live Signals", desc: "Direct mail server handshake verification" },
    { title: "Mailbox Reachability", desc: "Recipient inbox state without sending email" },
    { title: "Catch-All Analysis", desc: "Advanced catch-all domain pattern detection" },
    { title: "Provider Detection", desc: "Google Workspace, O365, or custom server" },
    { title: "Pattern Intelligence", desc: "Historical corporate email pattern matching" },
    { title: "Confidence Engine", desc: "Multi-signal risk score & send eligibility" },
  ];

  const regionalContexts = [
    { region: "North America", traits: "Dense data availability, high tech adoption, standardized corporate registries." },
    { region: "Europe (EU/UK)", traits: "GDPR compliance, regional privacy rules, country-specific business registries." },
    { region: "Asia-Pacific", traits: "Fragmented domain structures, localized communication channels, distinct hiring signals." },
    { region: "Latin America", traits: "Unique tax IDs, WhatsApp-first communication, specialized regional databases." },
  ];

  return (
    <section id="intelligence-architecture" className="relative border-b border-border/60 bg-background py-12 md:py-20 overflow-x-hidden">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>INTELLIGENCE ARCHITECTURE</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Intelligence starts <GradientText>before the first message.</GradientText>
          </h2>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            The best outbound systems don't just find more data. They understand the data they find. Most sales platforms treat data as a static record (<code className="text-accent font-mono text-xs">Name → Company → Title → Email</code>). Skout treats it as a constantly changing intelligence problem.
          </p>
        </div>

        {/* STATIC VS DYNAMIC ARCHITECTURE COMPARISON BANNER */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* TRADITIONAL STATIC APPROACH */}
            <div className="space-y-3 p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <X className="h-4 w-4" /> Traditional Sales Platforms (Static Record)
              </div>
              <div className="font-mono text-xs text-muted-foreground bg-background/80 p-3 rounded-lg border border-border">
                Name → Company → Title → Email → Send
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Treats data as static rows. Accepts whatever single database returns without checking context or freshness.
              </p>
            </div>

            {/* SKOUT DYNAMIC INTELLIGENCE APPROACH */}
            <div className="space-y-3 p-5 rounded-xl border border-accent/30 bg-accent/10">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4" /> Skout AI (Dynamic Intelligence)
              </div>
              <div className="font-mono text-xs text-accent font-bold bg-background p-3 rounded-lg border border-accent/30 flex flex-wrap items-center gap-1">
                <span>Data</span>
                <span>→</span>
                <span>Verification</span>
                <span>→</span>
                <span>Context</span>
                <span>→</span>
                <span>Intelligence</span>
                <span>→</span>
                <span>Decision</span>
                <span>→</span>
                <span>Action</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Considers company, market, technology, hiring signals, intent, and verification evidence before acting.
              </p>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE TABS NAVIGATION */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-4">
          {[
            { id: "waterfall", label: "Waterfall Enrichment", icon: Sliders },
            { id: "email", label: "Email Intelligence", icon: Mail },
            { id: "regional", label: "Regional Awareness", icon: Globe },
            { id: "loop", label: "Intelligence Loop", icon: RefreshCw },
            { id: "stack", label: "Modular Stack", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 scale-[1.02]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: WATERFALL ENRICHMENT ARCHITECTURE */}
        {activeTab === "waterfall" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                A waterfall that gets smarter at every step
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                No single data provider has perfect coverage. Skout queries multiple data sources in priority order: <span className="text-accent font-semibold">Source → Compare → Verify → Score → Resolve → Learn</span>.
              </p>
            </div>

            {/* 7-STEP FLOW GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {waterfallSteps.map((s, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-5 space-y-2.5 hover:border-accent/40 transition-colors shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                      {s.num}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Step {idx + 1}</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground">{s.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-5 flex flex-col justify-center items-center text-center space-y-3">
                <CheckCircle2 className="h-8 w-8 text-accent" />
                <h4 className="font-display text-sm font-bold text-foreground">One Verified Answer</h4>
                <p className="text-xs text-muted-foreground">Pay only for verified, high-confidence prospect data.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EMAIL INTELLIGENCE ENGINE */}
        {activeTab === "email" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Email isn't just an address. It's a signal.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Traditional verification only tells you "Valid / Invalid". Skout combines 8+ deep signals to calculate exact send eligibility before your team builds a workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* EMAIL PIPELINE DIAGRAM */}
            <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-4">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">Skout Email Intelligence Pipeline</p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-foreground">
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border">Email Address</span>
                <span>→</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border">Domain MX</span>
                <span>→</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border">SMTP Handshake</span>
                <span>→</span>
                <span className="px-3 py-1.5 rounded-lg bg-muted border border-border">Catch-All Analysis</span>
                <span>→</span>
                <span className="px-3 py-1.5 rounded-lg bg-accent/20 border border-accent/40 text-accent font-bold">Confidence Engine & Send Eligibility</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGIONAL AWARENESS */}
        {activeTab === "regional" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Markets behave differently. Regional intelligence.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                A prospect in North America produces a very different data footprint from Germany, India, Japan, or the UK. Skout adapts data workflows around regional market context.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {regionalContexts.map((reg, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-5 space-y-2 hover:border-accent/40 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm">
                    <Globe className="h-4 w-4" />
                    <h4>{reg.region}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reg.traits}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: THE SKOUT INTELLIGENCE LOOP */}
        {activeTab === "loop" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                The Skout Intelligence Loop
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Every interaction creates evidence. Every outcome improves future decisions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              {[
                { title: "1. Discover", sub: "Find accounts" },
                { title: "2. Enrich", sub: "Waterfall sources" },
                { title: "3. Verify", sub: "Evidence check" },
                { title: "4. Understand", sub: "Build context" },
                { title: "5. Decide", sub: "Qualify & prioritize" },
                { title: "6. Act", sub: "Outreach & CRM" },
                { title: "7. Learn", sub: "Feedback loop" },
              ].map((step, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3.5 space-y-1 hover:border-accent/40 transition-colors">
                  <div className="text-xs font-bold text-accent">{step.title}</div>
                  <div className="text-[10px] text-muted-foreground">{step.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MODULAR STACK INTEGRATION */}
        {activeTab === "stack" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Your Stack. Your Data. Your Intelligence.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Don't replace your entire revenue stack. Skout sits above and between your CRM, data warehouses, AI models, and email infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                  <Database className="h-4 w-4" /> CRM & Warehouses
                </div>
                <p className="text-xs text-muted-foreground">HubSpot, Salesforce, Snowflake, BigQuery, custom databases.</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                  <Bot className="h-4 w-4" /> AI Models & Dexter
                </div>
                <p className="text-xs text-muted-foreground">Skout AI, BYOK OpenAI, Anthropic, or custom enterprise LLMs.</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                  <Workflow className="h-4 w-4" /> Email & Workflows
                </div>
                <p className="text-xs text-muted-foreground">Google Workspace, O365, custom mail servers, APIs & Webhooks.</p>
              </div>
            </div>
          </div>
        )}

        {/* DEDICATED PLATFORM INTELLIGENCE PAGE CTA BANNER */}
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-card to-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Deep dive into the Skout Intelligence Architecture
            </h4>
            <p className="text-xs text-muted-foreground max-w-xl">
              Explore how Waterfall Enrichment, Email Intelligence, Regional Context, and Dexter AI combine to power your revenue engine.
            </p>
          </div>
          <Link
            href="/intelligence"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90"
          >
            <span>Explore Platform Intelligence</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
