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
  Sliders,
  Mail,
  Workflow,
} from "lucide-react";
import { Eyebrow, GradientText } from "@/components/site/Section";

export function IntelligenceArchitectureSection() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "email" | "regional" | "stack">(
    "waterfall",
  );

  const dynamicPipeline = [
    {
      step: "01",
      label: "Data",
      sub: "Multi-Source",
      color: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
    },
    {
      step: "02",
      label: "Verification",
      sub: "SMTP & DNS",
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30",
    },
    {
      step: "03",
      label: "Context",
      sub: "Account Graph",
      color: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30",
    },
    {
      step: "04",
      label: "Intelligence",
      sub: "Signals & Intent",
      color: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30",
    },
    {
      step: "05",
      label: "Decision",
      sub: "ICP & Qualify",
      color: "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30",
    },
    {
      step: "06",
      label: "Action",
      sub: "Outreach & CRM",
      color:
        "from-accent/30 to-indigo-500/20 text-accent border-accent font-bold shadow-lg shadow-accent/20",
    },
  ];

  const waterfallSteps = [
    {
      num: "01",
      title: "Request & Sourcing",
      desc: "Identify target person, email, company, tech stack, or intent signal.",
    },
    {
      num: "02",
      title: "Waterfall Selection",
      desc: "Query data providers in sequence until a high-confidence result is returned.",
    },
    {
      num: "03",
      title: "Live Verification",
      desc: "Validate returned data using live SMTP checks, DNS signals, and risk scoring.",
    },
    {
      num: "04",
      title: "Context & Action",
      desc: "Integrate into account graph to drive prioritization, personalized sequencing, and CRM.",
    },
  ];

  const emailSignals = [
    { title: "Domain & MX Health", desc: "DNS records, domain age & mail server routing" },
    { title: "Live SMTP Signals", desc: "Real-time server handshake & reachability check" },
    { title: "Catch-All & Provider", desc: "Catch-all pattern detection & O365/Google check" },
    { title: "Send Eligibility Engine", desc: "Multi-signal confidence score & bounce protection" },
  ];

  const regionalContexts = [
    {
      region: "North America",
      traits: "Dense data availability, high tech adoption, standardized registries.",
    },
    {
      region: "Europe (EU/UK)",
      traits: "GDPR compliance, regional privacy rules, country-specific business registries.",
    },
    {
      region: "Asia-Pacific",
      traits: "Fragmented domain structures, localized channels, distinct hiring signals.",
    },
    {
      region: "Latin America",
      traits: "Unique tax IDs, WhatsApp-first communication, specialized regional databases.",
    },
  ];

  return (
    <section
      id="intelligence-architecture"
      className="relative border-b border-border/60 bg-background py-10 md:py-16 overflow-x-hidden"
    >
      {/* AMBIENT GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-65 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>INTELLIGENCE ARCHITECTURE</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Intelligence starts <GradientText>before the first message.</GradientText>
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The best outbound systems don't just find more data. They understand the data they find.
            Most platforms treat data as a static record (
            <code className="text-accent font-mono text-[11px]">Name → Email</code>). Skout treats
            it as a dynamic intelligence problem.
          </p>
        </div>

        {/* CREATIVE VISUAL PIPELINE FLOW BANNER */}
        <div className="rounded-3xl border border-border bg-card/80 p-5 sm:p-7 shadow-xl backdrop-blur-xl">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
              The Skout Dynamic Intelligence Pipeline
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
            {dynamicPipeline.map((item, idx, arr) => (
              <React.Fragment key={idx}>
                <div
                  className={`group relative flex flex-col items-center px-4 py-2.5 rounded-2xl border bg-linear-to-b shadow-md transition-all hover:scale-105 ${item.color}`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold opacity-60">
                    Step {item.step}
                  </span>
                  <span className="font-display text-xs sm:text-sm font-extrabold tracking-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] opacity-85 font-medium mt-0.5">{item.sub}</span>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-muted-foreground/40 font-mono font-bold text-xs sm:text-sm">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ARCHITECTURE TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-3">
          {[
            { id: "waterfall", label: "Waterfall Enrichment", icon: Sliders },
            { id: "email", label: "Email Intelligence", icon: Mail },
            { id: "regional", label: "Regional Awareness", icon: Globe },
            { id: "stack", label: "Modular Stack", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "waterfall" | "email" | "regional" | "stack")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground shadow-md scale-[1.02]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        {activeTab === "waterfall" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            {waterfallSteps.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-500 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    {s.num}
                  </span>
                  <span className="text-[10px] text-blue-500 uppercase font-bold">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-blue-600">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "email" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            {emailSignals.map((sig, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <h4>{sig.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{sig.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "regional" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto animate-in fade-in duration-200">
            {regionalContexts.map((reg, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-accent font-bold text-xs sm:text-sm">
                  <Globe className="h-4 w-4" />
                  <h4>{reg.region}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{reg.traits}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stack" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div className="rounded-xl border border-border bg-card p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <Database className="h-4 w-4" /> CRM & Warehouses
              </div>
              <p className="text-xs text-muted-foreground">
                HubSpot, Salesforce, Snowflake, BigQuery, custom databases.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <Bot className="h-4 w-4" /> AI Models & Dexter
              </div>
              <p className="text-xs text-muted-foreground">
                Skout AI, BYOK OpenAI, Anthropic, or custom enterprise LLMs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <Workflow className="h-4 w-4" /> Email & Workflows
              </div>
              <p className="text-xs text-muted-foreground">
                Google Workspace, O365, custom mail servers, APIs & Webhooks.
              </p>
            </div>
          </div>
        )}

        {/* DEDICATED PAGE CTA BANNER */}
        <div className="rounded-2xl border border-accent/30 bg-linear-to-r from-accent/10 via-card to-card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-base sm:text-lg font-bold text-foreground">
              Explore Skout Platform Architecture
            </h4>
            <p className="text-xs text-muted-foreground">
              Inspect how Waterfall Enrichment, Email Intelligence, and Dexter AI power your revenue
              engine.
            </p>
          </div>
          <Link
            href="/intelligence"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground shadow-md hover:bg-accent/90 transition-all"
          >
            <span>Explore Platform Intelligence</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
