"use client";

import Link from "next/link";
import { useState } from "react";
import { SolutionData } from "@/lib/solutionData";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  Target,
  Layers,
  LineChart,
  Bot,
  Workflow,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  X,
  Zap,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Briefcase,
  Award,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  Layers,
  LineChart,
  Bot,
  Workflow,
  Sparkles,
};

interface Props {
  solution: SolutionData;
}

export default function SolutionDetailClient({ solution }: Props) {
  const SolutionIcon = ICON_MAP[solution.iconName] || Sparkles;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* 1. DISTINCT HERO LAYOUT: SPLIT 2-COLUMN DESIGN (USING SITE HERO GRADIENT & SITE COLORS) */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14!">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
                <SolutionIcon className="h-3.5 w-3.5 text-accent" />
                <span>USE CASE · {solution.eyebrow}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] wrap-break-word text-foreground font-semibold">
                {solution.headline} <br />
                <GradientText>{solution.headlineGradient}</GradientText>
              </h1>

              <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {solution.subheadline}
              </p>

              {/* CTAS & PROOF BADGES */}
              <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition-transform hover:scale-[1.02] shadow-lg"
                >
                  Schedule Solution Demo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-muted/80"
                >
                  Explore Pricing Plans
                </Link>
              </div>

              {/* HERO METRICS CARDS - MOBILE RESPONSIVE */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 border-t border-border/60">
                {solution.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border/80 bg-card/40 p-3 text-left backdrop-blur-md"
                  >
                    <div className="font-display text-lg font-bold text-foreground sm:text-xl">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO RIGHT COLUMN: INTERACTIVE SOLUTION EXECUTION CARD */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-2xl md:p-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80 animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">
                      Skout Solution Engine
                    </span>
                  </div>
                  <span className="rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                    Live Operational
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <SolutionHeroInteractiveCard slug={solution.slug} />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. THE CHALLENGE VS SKOUT SOLUTION COMPARISON (STYLING MATCHES SITE CARD SYSTEM) */}
      <Section className="py-8! md:py-12!">
        <div className="text-center">
          <Eyebrow>Transformation</Eyebrow>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
            Traditional Sales Friction vs <GradientText>The Skout Solution</GradientText>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
            See how Skout AI eliminates manual complexity and accelerates your revenue motion.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* TRADITIONAL WAY CARD */}
          <div className="rounded-3xl border border-border bg-card/40 p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                <X className="h-4 w-4 text-muted-foreground" /> Traditional Fragmented Sales Stack
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                High Friction
              </span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  Stitching together 5 separate tools for search, enrichment, sequencing, CRM, and
                  warmup.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  Manual CSV downloads and upload errors leading to duplicate outreach and burned
                  prospect relationships.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  High bounce rates and spam folder placement ruining sending domain reputation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                <span>
                  Single-threaded conversations with low-level contacts causing deals to stall in
                  pipeline.
                </span>
              </li>
            </ul>
          </div>

          {/* THE SKOUT SOLUTION CARD */}
          <div
            className="rounded-3xl border border-border p-5 md:p-6 space-y-4 shadow-xl"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                <CheckCircle2 className="h-4 w-4 text-accent" /> Skout AI Unified Solution
              </div>
              <span className="text-[10px] font-semibold text-accent uppercase">
                Single Workspace
              </span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <span>
                  All-in-one platform connecting prospecting, waterfall enrichment, multi-channel
                  outreach, and CRM.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <span>
                  Automated workspace deduplication and global suppressions to protect team
                  efficiency.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <span>
                  Peer-to-peer automated warmup, SPF/DKIM/DMARC audits, and 99.4% inbox delivery
                  rates.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                <span>
                  Multi-threaded buying committee mapping and Dexter AI context briefings to close
                  deals faster.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. INTERACTIVE TABBED CAPABILITIES LAYOUT */}
      <Section className="py-8! md:py-12! bg-card/20! border-y border-border/60">
        <div className="text-center">
          <Eyebrow>Solution Pillars</Eyebrow>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
            Core Capabilities for <GradientText>{solution.title}</GradientText>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Explore the specialized capabilities that drive this solution.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {solution.capabilities.map((cap, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === i
                  ? "bg-foreground text-background shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cap.title}
            </button>
          ))}
        </div>

        {/* ACTIVE TAB DISPLAY CARD */}
        <div
          className="mt-6 mx-auto max-w-3xl rounded-3xl border border-border p-5 md:p-7 shadow-2xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <SolutionIcon className="h-4 w-4" />
            </div>
            {solution.capabilities[activeTab]?.badge && (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                {solution.capabilities[activeTab].badge}
              </span>
            )}
          </div>
          <h3 className="mt-4 font-display text-lg md:text-xl font-semibold text-foreground">
            {solution.capabilities[activeTab]?.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {solution.capabilities[activeTab]?.description}
          </p>

          <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between text-xs">
            <span className="font-semibold text-accent flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Skout Production Engine Active
            </span>
            <Link
              href="/contact"
              className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
            >
              Talk to a solution specialist <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. STEP-BY-STEP SOLUTION WORKFLOW */}
      <Section className="py-8! md:py-12!">
        <div className="text-center">
          <Eyebrow>Execution Plan</Eyebrow>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
            How Your Team Executes This Solution
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {solution.workflow.map((st) => (
            <div
              key={st.stepNumber}
              className="relative rounded-3xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-accent">{st.stepNumber}</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                  PHASE {st.stepNumber}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold md:text-base text-foreground">
                {st.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. DEXTER AI SOLUTION SPOTLIGHT */}
      <Section className="py-8! md:py-12!">
        <div
          className="rounded-3xl border border-border p-6 md:p-10 shadow-2xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                <Bot className="h-3.5 w-3.5" /> Dexter AI Assistant Connected
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                AI Copilot Tailored for {solution.title}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Dexter AI integrates into your daily workflow to eliminate account research
                overhead, summarize complex deal threads, and write high-converting personalized
                copy.
              </p>

              <ul className="pt-2 space-y-2">
                {solution.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                  >
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-border bg-background p-4 shadow-xl">
                <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Dexter Solution Copilot</div>
                    <div className="text-[10px] text-muted-foreground">
                      Connected to {solution.title}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="rounded-xl bg-muted/60 p-2.5 text-muted-foreground">
                    &quot;Dexter, optimize our team workflow for {solution.title}.&quot;
                  </div>
                  <div className="rounded-xl bg-accent/15 border border-accent/20 p-2.5 text-foreground font-medium text-[11px] leading-relaxed">
                    &quot;Analyzed account signals. Multi-threaded buying committee, verified work
                    emails, and queued personalized sequence steps.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. FAQ SECTION */}
      <Section className="py-8! md:py-12!">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {solution.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-colors"
              >
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-foreground"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border/60 p-4 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. BOTTOM CTA BANNER */}
      <Section className="py-8! md:py-12!">
        <div
          className="rounded-3xl border border-border p-6 text-center md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <h2 className="font-display text-2xl font-semibold md:text-3xl text-foreground">
            Ready to deploy the <GradientText>{solution.title}</GradientText> Solution?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Transform your sales workflow with Skout AI. Talk to a GTM specialist today.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition hover:opacity-90"
            >
              Schedule Solution Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

function SolutionHeroInteractiveCard({ slug }: { slug: string }) {
  if (slug === "outbound-prospecting") {
    return (
      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-border bg-background/90 p-3 space-y-2">
          <div className="flex items-center justify-between font-bold text-foreground">
            <span>Outbound Sourcing Campaign</span>
            <span className="text-emerald-400 font-mono">1,240 Verified Prospects</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="bg-accent h-full w-[84%]" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Filter: VP Sales (B2B SaaS)</span>
            <span className="text-emerald-400 font-bold">84% Verification Rate</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground font-bold">OUTREACH</div>
            <div className="font-bold text-foreground mt-0.5">3-Step Sequence</div>
            <div className="text-emerald-400 font-semibold text-[10px]">Active Enrolled</div>
          </div>
          <div className="rounded-xl border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground font-bold">CRM SYNC</div>
            <div className="font-bold text-foreground mt-0.5">HubSpot 2-Way</div>
            <div className="text-emerald-400 font-semibold text-[10px]">Synced Realtime</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "account-based-sales") {
    return (
      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-border bg-background/90 p-3">
          <div className="font-bold text-foreground">Target Account: CloudScale Technologies</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">
            Multi-Threaded Buying Committee (4 Stakeholders)
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
            <span className="font-semibold text-foreground">Sarah J. (VP Sales)</span>
            <span className="text-accent text-[10px] font-bold">Sequence Step 2</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
            <span className="font-semibold text-foreground">Alex M. (CTO)</span>
            <span className="text-emerald-400 text-[10px] font-bold">Demo Requested</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-xs">
      <div className="rounded-xl border border-border bg-background/90 p-3 space-y-1">
        <div className="font-bold text-foreground text-sm">Skout Solution Engine</div>
        <div className="text-[11px] text-accent font-semibold">
          Unified Prospecting + Outreach + CRM
        </div>
        <div className="text-[10px] text-muted-foreground">
          Zero tool fragmentation • Realtime Data Sync
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-lg border border-border bg-background p-2">
          <div className="text-muted-foreground text-[10px]">DELIVERABILITY</div>
          <div className="font-bold text-emerald-400">99.4% Primary Inbox</div>
        </div>
        <div className="rounded-lg border border-border bg-background p-2">
          <div className="text-muted-foreground text-[10px]">AI COPILOT</div>
          <div className="font-bold text-foreground">Dexter Connected</div>
        </div>
      </div>
    </div>
  );
}
