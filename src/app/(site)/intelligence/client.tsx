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
  Mail,
  HelpCircle,
  X,
  Check,
  Search,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { WORKSPACE_URL } from "@/lib/constants";

export default function IntelligenceClient() {
  const [selectedNode, setSelectedNode] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"waterfall" | "email" | "regional" | "stack">("waterfall");

  const pipelineNodes = [
    {
      id: "data",
      label: "1. DATA",
      sub: "Multi-Source Sourcing",
      badge: "Sourcing Layer",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-400",
      description: "Aggregates multi-vendor prospect data, firmographics, technographics, and Intent signals across global sources.",
      inputs: ["Person & Contact Data", "Company Firmographics", "Installed Tech Stack", "Historical Databases"],
      output: "Raw Unverified Prospect Candidates",
    },
    {
      id: "verification",
      label: "2. VERIFICATION",
      sub: "Live Signal Checking",
      badge: "Verification Layer",
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      description: "Validates email reachability, domain MX records, live SMTP handshakes, catch-all patterns, and phone health in real-time.",
      inputs: ["DNS MX Records", "Live SMTP Handshake", "Catch-All Pattern Check", "Provider Detection"],
      output: "Verified Reachable Contacts & Risk Scores",
    },
    {
      id: "context",
      label: "3. CONTEXT",
      sub: "Account Graph",
      badge: "Contextual Layer",
      color: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      description: "Constructs a rich account graph combining company news, hiring trends, technological shifts, and regional market rules.",
      inputs: ["Hiring Signals", "Executive Leadership Changes", "Funding & Expansion", "Regional Compliance"],
      output: "Unified Account & Persona Context Graph",
    },
    {
      id: "intelligence",
      label: "4. INTELLIGENCE",
      sub: "Signal Engine",
      badge: "Intelligence Layer",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-400",
      description: "Evaluates why an account matters right now and synthesizes relevant context into actionable buyer insights.",
      inputs: ["Intent Signals", "Persona Relevance", "Historical Conversational Data", "Dexter AI Reasoning"],
      output: "Scored Opportunity Insights & Value Hooks",
    },
    {
      id: "decision",
      label: "5. DECISION",
      sub: "ICP & Route",
      badge: "Decision Layer",
      color: "border-pink-500/40 bg-pink-500/10 text-pink-400",
      description: "Determines whether an account fits your ICP, scores lead priority, and assigns the appropriate GTM playbook.",
      inputs: ["ICP Fit Score", "Lead Qualification Rules", "Territory Mapping", "Team Assignment Rules"],
      output: "Prioritized Target Account & Contact List",
    },
    {
      id: "action",
      label: "6. ACTION",
      sub: "Outreach & CRM",
      badge: "Action Layer",
      color: "border-accent bg-accent/20 text-accent font-bold shadow-lg shadow-accent/20",
      description: "Triggers multi-channel outreach sequences, updates CRM fields, assigns tasks, and executes automated GTM workflows.",
      inputs: ["Personalized Sequences", "Two-Way CRM Sync", "Task Creation", "Mailbox Rotation"],
      output: "Active Pipeline Opportunities & Scheduled Calls",
    },
  ];

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-x-hidden">
      {/* 1. ARCHITECTURE HERO (MATCHES INTEGRATIONS HERO EXACTLY) */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>SKOUT PLATFORM INTELLIGENCE</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] break-words text-foreground font-semibold">
              The intelligence layer behind your <GradientText>GTM ecosystem.</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Explore how Skout transforms fragmented data into verified context, intelligent prioritization, and automated revenue execution.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={WORKSPACE_URL}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-xs sm:text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
              >
                <span>Book Architecture Demo</span>
              </Link>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. INTERACTIVE PIPELINE EXPLORER (UNIQUE TO THIS DEDICATED PAGE) */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <Eyebrow>Interactive Pipeline Explorer</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            From raw data → <GradientText>automated revenue action.</GradientText>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Click on any pipeline stage below to inspect its underlying inputs, signals, and output deliverables.
          </p>
        </div>

        {/* PIPELINE NODE SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-6xl mx-auto mb-8">
          {pipelineNodes.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(idx)}
              className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 ${
                selectedNode === idx
                  ? `${node.color} ring-2 ring-accent shadow-lg scale-105`
                  : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              <span className="font-display text-xs font-extrabold uppercase tracking-wider">{node.label}</span>
              <span className="text-[10px] opacity-80 font-medium">{node.sub}</span>
            </button>
          ))}
        </div>

        {/* ACTIVE NODE INSPECTOR CARD */}
        <div className="rounded-3xl border border-accent/40 bg-card p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                {pipelineNodes[selectedNode].badge}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mt-2">
                {pipelineNodes[selectedNode].label}: {pipelineNodes[selectedNode].sub}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-mono">Stage {selectedNode + 1} of 6</span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {pipelineNodes[selectedNode].description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-background border border-border space-y-2">
              <h4 className="font-display text-xs font-bold text-accent uppercase tracking-wider">Input Signals & Sources</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {pipelineNodes[selectedNode].inputs.map((inp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-background border border-border space-y-2">
              <h4 className="font-display text-xs font-bold text-emerald-400 uppercase tracking-wider">Output Deliverable</h4>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs">
                {pipelineNodes[selectedNode].output}
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                Feeds directly into the next stage of the Skout Revenue Engine.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. TABBED TECHNICAL DEEP DIVES */}
      <Section className="py-12! md:py-16! border-b border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <Eyebrow>Technical Deep Dives</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Architecture built for real-world GTM scale
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select a technical component to review its engineering specifications.
          </p>

          {/* TAB BUTTONS */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "waterfall", label: "Waterfall Engine", icon: Sliders },
              { id: "email", label: "Email Signals", icon: Mail },
              { id: "regional", label: "Regional Awareness", icon: Globe },
              { id: "stack", label: "Modular Integrations", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: WATERFALL ENGINE */}
        {activeTab === "waterfall" && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md">
              <h3 className="font-display text-lg font-bold text-foreground">Waterfall Enrichment Protocol</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Skout queries multiple data providers in sequence (<span className="text-accent font-bold">Source → Compare → Verify → Score → Resolve → Learn</span>). If Provider A fails or lacks freshness, Skout moves automatically to Provider B. You only pay for verified, high-confidence results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-background border border-border text-xs">
                  <span className="font-bold text-foreground">Multi-Vendor Coverage:</span> Eliminates single-vendor data blind spots.
                </div>
                <div className="p-3 rounded-xl bg-background border border-border text-xs">
                  <span className="font-bold text-foreground">Cost Optimization:</span> Pay only for verified match results.
                </div>
                <div className="p-3 rounded-xl bg-background border border-border text-xs">
                  <span className="font-bold text-foreground">Real-Time Resolution:</span> Data is queried fresh at execution time.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EMAIL SIGNALS */}
        {activeTab === "email" && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md">
              <h3 className="font-display text-lg font-bold text-foreground">Email Intelligence & Signal Engine</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Replaces traditional binary checking with 8 deep deliverability signals: Domain MX health, live SMTP handshakes, catch-all pattern analysis, provider detection (O365 vs Google), and historical verification evidence.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-background border border-border font-semibold">Live SMTP Handshake</div>
                <div className="p-3 rounded-xl bg-background border border-border font-semibold">Catch-All Analysis</div>
                <div className="p-3 rounded-xl bg-background border border-border font-semibold">MX Infrastructure</div>
                <div className="p-3 rounded-xl bg-background border border-border font-semibold">Send Eligibility Rating</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGIONAL AWARENESS */}
        {activeTab === "regional" && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md">
              <h3 className="font-display text-lg font-bold text-foreground">Regional Market Context Engine</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Adapts data workflows around local market differences: North America, EU (GDPR compliance), APAC, LATAM, and India. Accounts for local corporate registries, domain conventions, and regional communication channels.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: MODULAR INTEGRATIONS */}
        {activeTab === "stack" && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md">
              <h3 className="font-display text-lg font-bold text-foreground">Modular Stack Architecture</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect your existing CRM (HubSpot, Salesforce), data warehouses (Snowflake, BigQuery), AI models (BYOK OpenAI/Anthropic), and email infrastructure seamlessly.
              </p>
            </div>
          </div>
        )}
      </Section>

      {/* 4. DEXTER AI COMMAND CENTER CARD */}
      <Section className="py-12! md:py-16! border-b border-border/60 bg-card/20">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background font-bold">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">Dexter AI Copilot</h3>
              <p className="text-xs text-accent font-semibold">GTM Copilot operating directly inside the Skout Intelligence Graph.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Dexter uses the account graph, signals, and verification evidence stored inside Skout to answer queries, summarize account history, and write high-converting outbound outreach.
          </p>
        </div>
      </Section>

      {/* 5. FINAL CTA */}
      <Section className="py-12! md:py-16!">
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-r from-accent/15 via-card to-card p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
            Build your GTM on an <GradientText>intelligence foundation.</GradientText>
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect prospecting, enrichment, verification, AI research, outreach, CRM, and analytics into one workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={WORKSPACE_URL}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-xs sm:text-sm font-bold text-accent-foreground shadow-lg hover:bg-accent/90 transition-all"
            >
              <span>Get Started Free — $0</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted"
            >
              <span>Talk to Sales</span>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
