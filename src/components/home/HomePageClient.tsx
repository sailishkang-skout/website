"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Send,
  Kanban,
  ChevronDown,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Users,
  Search,
  ListFilter,
  FileSpreadsheet,
  Workflow,
  Inbox as InboxIcon,
  ShieldCheck,
  Database,
  CalendarCheck,
  Target,
  Check,
  Zap,
} from "lucide-react";

// REPLY.IO / LINEAR INSPIRED HERO WORKSPACE STAGE
export function HeroWorkspaceVisual() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "icp",
      label: "01 ICP Search",
      mobileLabel: "01 Prospect",
      badge: "Target Fit",
      title: "ICP Account Match",
      desc: "Series B+ B2B SaaS · US · 50-200 EE",
      content: (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-slate-900 border border-white/10 p-2.5 sm:p-3 shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold shrink-0">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-white flex items-center gap-1.5 truncate">
                  Linear Systems
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-emerald-400 border border-emerald-500/30 shrink-0">
                    98% Fit
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate">
                  DevTools · Series B · Hiring
                </div>
              </div>
            </div>
            <button className="rounded-lg bg-indigo-600 px-2 py-1 text-[9px] sm:text-[10px] font-semibold text-white hover:bg-indigo-500 transition-colors shrink-0">
              Inspect
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-900/60 border border-white/5 p-2.5 sm:p-3 opacity-90">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 shrink-0">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-white flex items-center gap-1.5 truncate">
                  Notion Labs
                  <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-blue-400 border border-blue-500/30 shrink-0">
                    94% Fit
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate">
                  Productivity · Series C
                </div>
              </div>
            </div>
            <span className="rounded-lg border border-white/10 px-2 py-1 text-[9px] sm:text-[10px] font-medium text-slate-400 shrink-0">
              Queued
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "intel",
      label: "02 Account Context",
      mobileLabel: "02 Context",
      badge: "Enriched",
      title: "Contact & Buying Signal Context",
      desc: "Verified decision-makers & technology stack",
      content: (
        <div className="rounded-xl border border-white/10 bg-slate-900 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs shrink-0">
                SA
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-white truncate">Sofia Alvarez</div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate">
                  CMO at Linear · Budget Holder
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/30 shrink-0">
              Verified
            </span>
          </div>
          <div className="rounded-lg bg-slate-950/80 p-2.5 text-[10px] text-slate-300 border border-white/5 space-y-1">
            <div className="font-bold text-indigo-400">Dexter AI Signal Callout:</div>
            <div>
              &quot;Sofia expanded RevOps team + added HubSpot Sales Hub last month. Optimal timing
              for outbound demo call.&quot;
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "engage",
      label: "03 Outreach",
      mobileLabel: "03 Sequence",
      badge: "Sequenced",
      title: "Multi-Channel Outbound Campaign",
      desc: "Personalized intro email + LinkedIn task",
      content: (
        <div className="rounded-xl border border-white/10 bg-slate-900 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-slate-950 p-2 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <Send className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span className="font-semibold text-white truncate text-[11px]">
                Email Step 1: Cold Intro
              </span>
            </div>
            <span className="rounded bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 text-[8px] font-bold shrink-0">
              Sent
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-950 p-2 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <Bot className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span className="font-semibold text-white truncate text-[11px]">
                AI Review: 0 Spam Words
              </span>
            </div>
            <span className="rounded bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 text-[8px] font-bold shrink-0">
              Passed
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "convert",
      label: "04 CRM Deal",
      mobileLabel: "04 CRM",
      badge: "Pipeline",
      title: "Native GTM CRM & Deal Stage",
      desc: "Opportunity logged with full context",
      content: (
        <div className="rounded-xl border border-white/10 bg-slate-900 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-[11px]">Linear Systems - Pro Workspace</div>
              <div className="text-[9px] text-slate-400">Stage: Demo Scheduled • $24,000 ARR</div>
            </div>
            <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[9px] font-bold border border-emerald-500/30 shrink-0">
              2-Way Synced
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-white shadow-2xl transition-all">
      {/* MAC-STYLE WINDOW BAR */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 shrink-0" />
          <span className="ml-1 text-[9px] sm:text-[10px] font-mono text-slate-400 font-medium truncate">
            skout.ai/workspace/connected
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono font-medium text-emerald-400 border border-emerald-500/20 shrink-0">
          Live Engine
        </span>
      </div>

      {/* STAGE TAB BUTTONS - MOBILE RESPONSIVE */}
      <div className="grid grid-cols-4 border-b border-white/10 bg-slate-900/40">
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(idx)}
            className={`p-2 sm:p-2.5 text-center transition-all border-r border-white/5 last:border-r-0 ${
              activeTab === idx
                ? "bg-slate-900 font-semibold text-white border-b-2 border-b-indigo-500 shadow-sm"
                : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
            }`}
          >
            <span className="text-[9px] sm:text-[10px] hidden sm:block font-mono uppercase tracking-wider">
              {t.label}
            </span>
            <span className="text-[9px] sm:text-[10px] block sm:hidden font-mono uppercase tracking-wider">
              {t.mobileLabel}
            </span>
          </button>
        ))}
      </div>

      {/* ACTIVE STAGE CONTENT */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">{tabs[activeTab].title}</div>
            <div className="text-[10px] text-slate-400">{tabs[activeTab].desc}</div>
          </div>
          <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[9px] font-medium text-indigo-300 border border-indigo-500/30">
            {tabs[activeTab].badge}
          </span>
        </div>

        {tabs[activeTab].content}

        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px] text-slate-400">
          <span className="font-mono text-indigo-400">Data → Intelligence → Action</span>
          <button
            onClick={() => setActiveTab((activeTab + 1) % tabs.length)}
            className="flex items-center gap-1 font-medium text-white hover:text-indigo-400 transition-colors"
          >
            Next step <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// UNIFIED TABBED FEATURE SHOWCASE
export function PlatformTabbedShowcase({
  discover,
  understand,
  engage,
  convert,
}: {
  discover: Record<string, unknown>;
  understand: Record<string, unknown>;
  engage: Record<string, unknown>;
  convert: Record<string, unknown>;
}) {
  const [activeTab, setActiveTab] = useState<"discover" | "understand" | "engage" | "convert">(
    "discover",
  );

  const steps = [
    {
      id: "discover" as const,
      num: "01",
      name: "Discover",
      eyebrow: String(discover.eyebrow ?? "01 — Discover"),
      title: "Start with the right accounts — not a giant list.",
      desc: String(
        discover.description ??
          "Define who you want to reach and use Skout to discover companies and contacts that fit your targeting criteria.",
      ),
      cards: [
        {
          title: "Prospect Search",
          desc: "Find companies and contacts based on strategy criteria.",
          icon: Search,
        },
        {
          title: "Smart Lists",
          desc: "Organize prospect lists around your target priorities.",
          icon: ListFilter,
        },
        {
          title: "Import",
          desc: "Bring existing leads into Skout for enrichment.",
          icon: FileSpreadsheet,
        },
        {
          title: "ICP Setup",
          desc: "Define your ideal customer profile as a live foundation.",
          icon: Target,
        },
      ],
    },
    {
      id: "understand" as const,
      num: "02",
      name: "Understand",
      eyebrow: String(understand.eyebrow ?? "02 — Understand"),
      title: "Don't just know who they are. Understand the account.",
      desc: String(
        understand.description ??
          "A name and email are not enough. Skout enriches contact and company info so your team works with deep context.",
      ),
      cards: [
        {
          title: "Enrichment",
          desc: "Fill data gaps for contacts and company signals.",
          icon: Sparkles,
        },
        {
          title: "Dexter Context Callout",
          desc: "Dexter summarizes what matters about an account.",
          icon: Bot,
        },
        {
          title: "Intent Signals",
          desc: "Track headcount changes, job posts, and tech stack.",
          icon: Zap,
        },
        {
          title: "Decision-Maker Identification",
          desc: "Map budget holders and buyers automatically.",
          icon: Users,
        },
      ],
    },
    {
      id: "engage" as const,
      num: "03",
      name: "Engage",
      eyebrow: String(engage.eyebrow ?? "03 — Engage"),
      title: "Turn intelligence into outreach.",
      desc: String(
        engage.description ??
          "Move seamlessly into outreach without rebuilding your campaign workflow somewhere else.",
      ),
      cards: [
        { title: "Sequences", desc: "Automated multi-channel outbound sequences.", icon: Workflow },
        {
          title: "Unified Inbox",
          desc: "Keep prospect replies connected to account context.",
          icon: InboxIcon,
        },
        {
          title: "AI Review",
          desc: "Optimize email messaging before dispatch.",
          icon: CheckCircle2,
        },
        {
          title: "Deliverability Guard",
          desc: "Monitor domain health and inbox placement.",
          icon: ShieldCheck,
        },
      ],
    },
    {
      id: "convert" as const,
      num: "04",
      name: "Convert",
      eyebrow: String(convert.eyebrow ?? "04 — Convert"),
      title: "When interest turns into opportunity, keep the context.",
      desc: String(
        convert.description ??
          "Connect contacts and deals with tasks, meetings, and pipeline activity in one connected workspace.",
      ),
      cards: [
        {
          title: "Companies & Contacts",
          desc: "Organized account repository in one place.",
          icon: Database,
        },
        {
          title: "Deals & Pipeline",
          desc: "Visual pipeline management connected to outreach.",
          icon: Kanban,
        },
        {
          title: "Task Management",
          desc: "Turn replies into clear follow-up actions.",
          icon: Check,
        },
        {
          title: "Meetings & Calendar",
          desc: "Connect booked meetings directly to opportunities.",
          icon: CalendarCheck,
        },
      ],
    },
  ];

  const current = steps.find((s) => s.id === activeTab)!;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* 4 STAGE SELECTOR TABS */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 rounded-2xl bg-muted/60 p-1.5 border border-border/60">
        {steps.map((step) => {
          const isActive = activeTab === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`rounded-xl py-2.5 px-3 text-left transition-all flex items-center justify-between ${
                isActive
                  ? "bg-foreground text-background font-bold shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs ${isActive ? "text-accent" : "opacity-60"}`}>
                  {step.num}
                </span>
                <span className="text-xs font-semibold">{step.name}</span>
              </div>
              <ArrowRight
                className={`h-3.5 w-3.5 transition-transform ${isActive ? "translate-x-0.5 text-accent" : "opacity-0"}`}
              />
            </button>
          );
        })}
      </div>

      {/* ACTIVE STAGE HEADER */}
      <div className="mt-6 max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
          {current.eyebrow}
        </div>
        <h3 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-foreground">
          {current.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* ACTIVE STAGE CARDS GRID */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {current.cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-background p-4 shadow-sm transition-all hover:border-accent/40 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3">
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="font-display text-sm font-bold text-foreground">{card.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// DEXTER PROMPT COMMAND CENTER
export function DexterInteractiveGrid({
  prompts,
}: {
  prompts: Array<{ category: string; prompt: string; answer: string }>;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-12">
      {/* PROMPT BUTTON LIST */}
      <div className="md:col-span-5 space-y-1.5">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${
              selectedIdx === idx
                ? "border-indigo-500 bg-indigo-500/10 font-semibold text-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="truncate">
              <span className="text-[9px] font-bold uppercase tracking-wider text-accent block">
                {p.category}
              </span>
              <span className="truncate block font-medium">"{p.prompt}"</span>
            </div>
            <ArrowRight
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${selectedIdx === idx ? "translate-x-1 text-accent" : "opacity-40"}`}
            />
          </button>
        ))}
      </div>

      {/* DEXTER RESPONSE INTERFACE */}
      <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-xs text-white">Dexter AI Engine</div>
                <div className="text-[10px] text-slate-400">GTM Intelligence Layer</div>
              </div>
            </div>
            <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-mono text-indigo-300">
              {prompts[selectedIdx]?.category}
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5">
            <div className="rounded-lg bg-slate-900 border border-white/5 p-2.5 text-[11px] text-slate-300 font-mono">
              Prompt: "{prompts[selectedIdx]?.prompt}"
            </div>
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-4 text-xs leading-relaxed text-slate-200">
              <p className="font-sans font-medium">{prompts[selectedIdx]?.answer}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-slate-400">
          <span>Grounded in Skout's live workspace data</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("skout-open-dexter"))}
            className="font-semibold text-white underline underline-offset-4 hover:text-indigo-400 transition-colors"
          >
            Ask Dexter with your data →
          </button>
        </div>
      </div>
    </div>
  );
}

// BALANCED 2-COLUMN EQUAL GRID FAQ ACCORDION COMPONENT
export function FaqAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const half = Math.ceil(items.length / 2);
  const leftCol = items.slice(0, half);
  const rightCol = items.slice(half);

  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
      {/* LEFT COLUMN FAQs */}
      <div className="space-y-3">
        {leftCol.map((item, idx) => {
          const actualIdx = idx;
          const isOpen = openIndex === actualIdx;
          return (
            <div
              key={actualIdx}
              className={`overflow-hidden rounded-2xl border transition-all ${
                isOpen
                  ? "border-foreground/30 bg-card shadow-md"
                  : "border-border bg-card/80 hover:bg-card"
              }`}
            >
              <button
                onClick={() => toggle(actualIdx)}
                className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-foreground transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 text-accent shrink-0" />
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-3 pl-10">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN FAQs */}
      <div className="space-y-3">
        {rightCol.map((item, idx) => {
          const actualIdx = idx + half;
          const isOpen = openIndex === actualIdx;
          return (
            <div
              key={actualIdx}
              className={`overflow-hidden rounded-2xl border transition-all ${
                isOpen
                  ? "border-foreground/30 bg-card shadow-md"
                  : "border-border bg-card/80 hover:bg-card"
              }`}
            >
              <button
                onClick={() => toggle(actualIdx)}
                className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-foreground transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 text-accent shrink-0" />
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-3 pl-10">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
