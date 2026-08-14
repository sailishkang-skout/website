"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductData } from "@/lib/productData";
import { WORKSPACE_URL } from "@/lib/constants";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  Search,
  ListFilter,
  FileSpreadsheet,
  Sparkles,
  Chrome,
  Workflow,
  Inbox,
  CheckCircle2,
  ShieldCheck,
  Database,
  Kanban,
  CalendarCheck,
  BarChart3,
  Bot,
  ArrowRight,
  ChevronDown,
  Check,
  Zap,
  Activity,
  Users,
  Building2,
  Mail,
  Send,
  Clock,
  UserCheck,
  TrendingUp,
  Cpu,
  Layers,
  AlertTriangle,
  FileText,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  ListFilter,
  FileSpreadsheet,
  Sparkles,
  Chrome,
  Workflow,
  Inbox,
  CheckCircle2,
  ShieldCheck,
  Database,
  Kanban,
  CalendarCheck,
  BarChart3,
  Bot,
  Target,
};

interface Props {
  product: ProductData;
}

export default function ProductDetailClient({ product }: Props) {
  const ProductIcon = ICON_MAP[product.iconName] || Sparkles;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* HERO SECTION & MOCKUP STAGE - SEAMLESS HERO GRADIENT */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
              <ProductIcon className="h-3.5 w-3.5" />
              <span>{product.eyebrow} · SKOUT PLATFORM</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] break-words text-foreground font-semibold">
              {product.headline} <br />
              <GradientText>{product.headlineGradient}</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground px-2">
              {product.subheadline}
            </p>

            <div className="pt-3 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition-transform hover:scale-[1.02] shadow-lg"
              >
                Book a demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={WORKSPACE_URL}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-muted/80"
              >
                Log in to workspace
              </a>
            </div>

            {/* METRICS STRIP - HOMEPAGE MATCHING & MOBILE RESPONSIVE */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-2xl border border-border/80 bg-card/40 p-3.5 sm:p-5 backdrop-blur-xl">
              {product.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between sm:flex-col sm:justify-center p-2 rounded-xl bg-background/50 sm:bg-transparent border sm:border-0 border-border/40 text-left sm:text-center"
                >
                  <span className="text-[11px] sm:text-xs text-muted-foreground font-medium sm:order-2">
                    {m.label}
                  </span>
                  <span className="font-display text-base sm:text-2xl font-bold text-foreground sm:order-1">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FEATURE MOCKUP PREVIEW INSIDE HERO STAGE */}
        <Section className="pb-8! pt-0!">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/90 p-3.5 sm:p-5 shadow-2xl backdrop-blur-2xl md:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shrink-0" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shrink-0" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shrink-0" />
                <span className="ml-1 text-[10px] sm:text-xs font-mono text-muted-foreground truncate">
                  app.skoutai.io/{product.slug}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full shrink-0">
                <ProductIcon className="h-3 w-3" />
                <span>{product.title}</span>
              </div>
            </div>

            {/* MOCKUP PREVIEW CONTENT */}
            <MockupPreview slug={product.slug} />
          </div>
        </Section>
      </div>

      {/* CORE CAPABILITIES GRID - HOMEPAGE CARD STYLING */}
      <Section className="py-8! md:py-12!">
        <div className="text-center">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
            Everything you need for <GradientText>{product.title}</GradientText>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Grounded directly in Skout AI core production architecture and features.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {product.features.map((feat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-border p-5 transition hover:-translate-y-1"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ProductIcon className="h-4 w-4" />
                </div>
                {feat.badge && (
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                    {feat.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-sm font-semibold md:text-base text-foreground">
                {feat.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* WORKFLOW / STEP-BY-STEP */}
      <Section className="py-8! md:py-12! bg-card/20! border-y border-border/60">
        <div className="text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
            Simple 3-Step Workflow
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {product.workflow.map((st) => (
            <div
              key={st.stepNumber}
              className="relative rounded-2xl border border-border/80 bg-card p-5 shadow-sm"
            >
              <div className="font-display text-3xl font-bold text-accent/50">{st.stepNumber}</div>
              <h3 className="mt-2 text-sm font-semibold md:text-base text-foreground">
                {st.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* DEXTER AI INTEGRATION SPOTLIGHT */}
      <Section className="py-8! md:py-12!">
        <div
          className="rounded-3xl border border-border/80 p-6 md:p-10 shadow-2xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                <Bot className="h-3.5 w-3.5" /> Dexter AI Assistant Connected
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Power your {product.title} workflow with Dexter AI
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Dexter AI connects natively to your Skout database and {product.title} modules. Ask
                Dexter to recommend targeting criteria, draft tailored outreach steps, synthesize
                prospect research, or automate next sales actions.
              </p>

              <ul className="pt-2 space-y-2">
                {product.highlights.map((h, i) => (
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
                    <div className="text-xs font-bold text-foreground">Dexter Assistant</div>
                    <div className="text-[10px] text-muted-foreground">
                      Connected to {product.title}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="rounded-xl bg-muted/60 p-2.5 text-muted-foreground">
                    &quot;Dexter, analyze this {product.title} context and recommend next best
                    actions.&quot;
                  </div>
                  <div className="rounded-xl bg-accent/15 border border-accent/20 p-2.5 text-foreground font-medium leading-relaxed text-[11px]">
                    &quot;Analyzed 48 records. Identified 12 high-priority decision makers matching
                    your ICP. Drafted custom campaign steps and updated deal priorities.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section className="py-8! md:py-12!">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {product.faqs.map((faq, i) => (
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

      {/* BOTTOM CTA BANNER */}
      <Section className="py-8! md:py-12!">
        <div
          className="rounded-3xl border border-border p-6 text-center md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <h2 className="font-display text-2xl font-semibold md:text-3xl text-foreground">
            Ready to supercharge your GTM motion with <GradientText>{product.title}</GradientText>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Get started in minutes with Skout AI. Discover, enrich, engage, and convert in one
            unified workspace.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted"
            >
              View pricing plans
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

function MockupPreview({ slug }: { slug: string }) {
  if (slug === "prospect-search") {
    return (
      <div className="space-y-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-accent/15 border border-accent/30 text-accent px-2.5 py-0.5 font-medium text-[10px]">
            VP Sales
          </span>
          <span className="rounded-full bg-muted border border-border text-foreground px-2.5 py-0.5 text-[10px]">
            B2B SaaS
          </span>
          <span className="rounded-full bg-muted border border-border text-foreground px-2.5 py-0.5 text-[10px]">
            50-250 EE
          </span>
          <span className="rounded-full bg-muted border border-border text-foreground px-2.5 py-0.5 text-[10px]">
            Salesforce + React
          </span>
        </div>

        {/* MOBILE CARD VIEW FOR < 640px */}
        <div className="block sm:hidden space-y-2">
          <div className="rounded-xl border border-border/80 bg-background/90 p-3 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-foreground">Sarah Jenkins</span>
              <span className="rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[9px] font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Email
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              VP of Global Sales • CloudScale Tech
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/90 p-3 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-foreground">David Miller</span>
              <span className="rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[9px] font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Verified Direct Dial
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Head of Revenue Ops • Nexus AI Solutions
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW FOR >= 640px */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-border/80 bg-background/80 p-3 sm:p-4">
          <div className="min-w-[480px]">
            <div className="grid grid-cols-4 gap-4 border-b border-border/60 pb-2 font-bold text-muted-foreground">
              <span>Contact Name</span>
              <span>Title</span>
              <span>Company</span>
              <span>Verification Status</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-4 gap-4 items-center font-medium">
                <span className="text-foreground">Sarah Jenkins</span>
                <span className="text-muted-foreground">VP of Global Sales</span>
                <span className="text-foreground">CloudScale Technologies</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified SMTP Email
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 items-center font-medium border-t border-border/40 pt-2">
                <span className="text-foreground">David Miller</span>
                <span className="text-muted-foreground">Head of Revenue Ops</span>
                <span className="text-foreground">Nexus AI Solutions</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified Direct Dial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "smart-lists" || slug === "icp-setup") {
    return (
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between rounded-xl border border-accent/40 bg-accent/10 p-3">
          <div className="flex items-center gap-3">
            <ListFilter className="h-5 w-5 text-accent" />
            <div>
              <div className="font-bold text-foreground">
                Smart List / ICP: Tier 1 SaaS VP Sales (Series A+)
              </div>
              <div className="text-[11px] text-muted-foreground">
                Auto Ingest Rule: Title contains &quot;VP Sales&quot; AND Tech = Salesforce
              </div>
            </div>
          </div>
          <span className="rounded-full bg-accent/20 px-3 py-1 font-mono font-bold text-accent">
            142 Lead Contacts
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-border bg-background p-3">
            <div className="text-muted-foreground font-semibold text-[10px]">AUTO ACTION</div>
            <div className="mt-1 font-bold text-foreground">Sequence Auto-Enroll</div>
            <div className="mt-1 text-emerald-400 font-semibold">Active Trigger</div>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <div className="text-muted-foreground font-semibold text-[10px]">SUPPRESSIONS</div>
            <div className="mt-1 font-bold text-foreground">Workspace Exclusions</div>
            <div className="mt-1 text-accent font-semibold">Global Guardrails</div>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <div className="text-muted-foreground font-semibold text-[10px]">SCORING</div>
            <div className="mt-1 font-bold text-foreground">AI ICP Match Score</div>
            <div className="mt-1 text-foreground font-semibold">Avg 92/100</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "import") {
    return (
      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-dashed border-accent/50 bg-accent/5 p-3.5 text-center">
          <FileSpreadsheet className="mx-auto h-6 w-6 text-accent" />
          <div className="mt-1.5 font-bold text-foreground">
            leads_q3_outbound_list.csv (4,250 Rows)
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            Auto Column Mapping Executed: 8 Columns Mapped, 0 Errors
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 font-mono text-[11px]">
          <div className="flex justify-between border-b border-border pb-1 font-bold text-muted-foreground">
            <span>CSV HEADER</span>
            <span>SKOUT CRM PROPERTY</span>
            <span>STATUS</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-foreground">
              <span>email_address</span>
              <span className="text-accent">Contact.Email</span>
              <span className="text-emerald-400">Mapped</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>linkedin_url</span>
              <span className="text-accent">Contact.LinkedIn</span>
              <span className="text-emerald-400">Mapped</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>company_name</span>
              <span className="text-accent">Account.Name</span>
              <span className="text-emerald-400">Mapped</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "enrichment") {
    return (
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/20 text-accent font-bold">
              WF
            </div>
            <div>
              <div className="font-bold text-foreground">Waterfall Enrichment Pipeline</div>
              <div className="text-[10px] text-muted-foreground">
                Provider 1 (Apollo) → Provider 2 (Hunter) → Live SMTP Handshake
              </div>
            </div>
          </div>
          <span className="rounded-md bg-emerald-500/20 text-emerald-400 px-2.5 py-1 font-bold">
            Verified Match
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background/80 p-3 space-y-1">
            <div className="font-bold text-foreground">Alex Mercer</div>
            <div className="text-[11px] text-muted-foreground">
              Chief Technology Officer @ DataPulse
            </div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1 pt-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> alex.m@datapulse.io
            </div>
            <div className="text-foreground font-mono text-[10px]">
              +1 (415) 892-XXXX (Direct Mobile)
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/80 p-3 space-y-1">
            <div className="font-bold text-foreground">Company Technographics</div>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">
                AWS Cloud
              </span>
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">
                Salesforce CRM
              </span>
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">
                React
              </span>
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-foreground">
                HubSpot
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "chrome-extension") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
        <div className="md:col-span-7 rounded-xl border border-border bg-background p-3.5 space-y-2.5">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Chrome className="h-4 w-4 text-accent" /> LinkedIn Profile View (/in/sarah-jenkins)
            </div>
            <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
              Extension Active
            </span>
          </div>
          <div>
            <div className="font-bold text-sm text-foreground">Sarah Jenkins</div>
            <div className="text-muted-foreground text-[11px]">
              Vice President of Global Sales @ CloudScale
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-accent/15 px-2.5 py-1 text-accent font-semibold text-[11px]">
              <Zap className="h-3.5 w-3.5" /> ICP Match Score: 96 / 100 (Tier 1 Fit)
            </div>
          </div>
        </div>
        <div className="md:col-span-5 rounded-xl border border-accent/40 bg-accent/10 p-3.5 space-y-2.5">
          <div className="font-bold text-accent">Skout Sidepanel Actions</div>
          <button className="w-full rounded-lg bg-foreground py-2 text-center font-bold text-background text-xs hover:opacity-90">
            + Add to Smart List
          </button>
          <button className="w-full rounded-lg border border-border bg-background py-2 text-center font-semibold text-foreground text-xs hover:bg-muted">
            Enrich Email & Phone
          </button>
        </div>
      </div>
    );
  }

  if (slug === "sequences") {
    return (
      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-accent font-bold">
            1
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">
              Email Step 1: Personalized Cold Intro
            </div>
            <div className="text-[10px] text-muted-foreground">
              Subject: Quick question regarding &#123;&#123;company.name&#125;&#125; tech stack
            </div>
          </div>
          <span className="rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">
            68% Open Rate
          </span>
        </div>
        <div className="ml-6 border-l-2 border-dashed border-border pl-4 py-1 text-[11px] text-muted-foreground flex items-center gap-2">
          <Clock className="h-3 w-3" /> Wait 3 days if no reply
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-foreground font-bold">
            2
          </div>
          <div className="flex-1">
            <div className="font-semibold text-foreground">
              Email Step 2: Value Proposition & Case Study
            </div>
            <div className="text-[10px] text-muted-foreground">
              Subject: Re: Quick question regarding &#123;&#123;company.name&#125;&#125;
            </div>
          </div>
          <span className="rounded-md bg-accent/15 text-accent px-2 py-0.5 text-[10px] font-semibold">
            24% Reply Rate
          </span>
        </div>
      </div>
    );
  }

  if (slug === "inbox") {
    return (
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <Inbox className="h-5 w-5 text-accent" />
            <div>
              <div className="font-bold text-foreground">
                Re: Scaling outbound prospecting engine
              </div>
              <div className="text-[10px] text-muted-foreground">
                From: sarah.j@cloudscale.io • Account: CloudScale
              </div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1 font-bold">
            AI Tag: Meeting Requested
          </span>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-foreground leading-relaxed">
          &quot;Hi Alex, thanks for reaching out. This fits right into our Q3 priorities. Do you
          have 15 mins available this Thursday afternoon for a demo?&quot;
        </div>
        <div className="flex items-center justify-between rounded-xl bg-accent/10 border border-accent/20 p-2.5">
          <span className="font-medium text-accent">
            Dexter AI Suggestion: Book 15-min Demo via Google Calendar
          </span>
          <button className="rounded bg-foreground px-3 py-1 text-background font-bold text-[11px]">
            Book Call
          </button>
        </div>
      </div>
    );
  }

  if (slug === "ai-review") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-center space-y-1">
          <div className="text-[10px] font-bold text-emerald-400">SPAM SCORE</div>
          <div className="text-2xl font-black text-emerald-400">0 / 100</div>
          <div className="text-[10px] text-muted-foreground">Clean - Zero Spam Words</div>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-center space-y-1">
          <div className="text-[10px] font-bold text-accent">READABILITY</div>
          <div className="text-2xl font-black text-accent">Grade 6.2</div>
          <div className="text-[10px] text-muted-foreground">Mobile Optimized</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 text-center space-y-1">
          <div className="text-[10px] font-bold text-foreground">SUBJECT LINE</div>
          <div className="text-2xl font-black text-foreground">98 / 100</div>
          <div className="text-[10px] text-emerald-400 font-semibold">High Open Potential</div>
        </div>
      </div>
    );
  }

  if (slug === "deliverability") {
    return (
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="rounded-lg border border-border bg-background p-2.5 text-center">
            <div className="text-[10px] text-muted-foreground">SPF RECORD</div>
            <div className="font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" /> Valid
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5 text-center">
            <div className="text-[10px] text-muted-foreground">DKIM SIGNATURE</div>
            <div className="font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" /> 2048-bit
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5 text-center">
            <div className="text-[10px] text-muted-foreground">DMARC POLICY</div>
            <div className="font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" /> Enforced
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5 text-center">
            <div className="text-[10px] text-muted-foreground">WARMUP POOL</div>
            <div className="font-bold text-accent mt-1">99.4% Inboxing</div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 flex justify-between items-center">
          <span className="font-semibold text-foreground">
            Blacklist Monitor: 52 Databases Scanned
          </span>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
            Clean (0 Flags)
          </span>
        </div>
      </div>
    );
  }

  if (slug === "crm") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl border border-border bg-background p-3 space-y-1.5">
          <div className="font-bold text-foreground">Account: CloudScale Inc</div>
          <div className="text-[11px] text-muted-foreground">Industry: B2B Enterprise SaaS</div>
          <div className="text-[11px] text-accent font-semibold">Deal Value: $48,000 / yr</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 space-y-1.5">
          <div className="font-bold text-foreground">Primary Contact</div>
          <div className="text-[11px] text-foreground font-medium">Sarah Jenkins (VP Sales)</div>
          <div className="text-[11px] text-emerald-400">Last Touchpoint: Email Replied 2h ago</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-3 space-y-1.5">
          <div className="font-bold text-foreground">HubSpot 2-Way Sync</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Synced Realtime
          </div>
          <div className="text-[10px] text-muted-foreground">Last Sync: 1 min ago</div>
        </div>
      </div>
    );
  }

  if (slug === "pipeline") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="rounded-xl border border-border bg-background/90 p-3 space-y-2">
          <div className="font-bold text-foreground flex justify-between">
            <span>Discovery Stage</span>
            <span className="text-muted-foreground font-normal">$42,000</span>
          </div>
          <div className="rounded-lg border border-border/80 bg-card p-2.5">
            <div className="font-semibold text-foreground">Acme Corp - Enterprise</div>
            <div className="mt-1 text-[10px] text-muted-foreground">Owner: Alex R. • $18,000</div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background/90 p-3 space-y-2">
          <div className="font-bold text-foreground flex justify-between">
            <span>Demo Scheduled</span>
            <span className="text-muted-foreground font-normal">$75,000</span>
          </div>
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-2.5">
            <div className="font-semibold text-foreground">Vertex Labs - Pro Plan</div>
            <div className="mt-1 text-[10px] text-accent font-medium">Demo on Aug 15 • $25,000</div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background/90 p-3 space-y-2">
          <div className="font-bold text-foreground flex justify-between">
            <span>Closed Won</span>
            <span className="text-muted-foreground font-normal">$120,000</span>
          </div>
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2.5">
            <div className="font-semibold text-foreground">Starlight Inc</div>
            <div className="mt-1 text-[10px] text-emerald-400 font-medium">
              Contract Signed • $50,000
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "tasks-meetings") {
    return (
      <div className="space-y-2 text-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-accent/20 text-accent px-2 py-0.5 font-mono font-bold">
              [CALL]
            </span>
            <div>
              <div className="font-semibold text-foreground">Call Sarah Jenkins (CloudScale)</div>
              <div className="text-[10px] text-muted-foreground">
                Topic: Pre-demo discovery touchpoint
              </div>
            </div>
          </div>
          <button className="w-full sm:w-auto rounded bg-foreground px-3 py-1 font-bold text-background text-[11px]">
            Execute Call
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 font-mono font-bold">
              [MEETING]
            </span>
            <div>
              <div className="font-semibold text-foreground">Demo Call with Nexus AI Team</div>
              <div className="text-[10px] text-muted-foreground">
                Google Calendar Synced • Today @ 3:00 PM
              </div>
            </div>
          </div>
          <span className="text-emerald-400 font-semibold text-[11px]">Synced</span>
        </div>
      </div>
    );
  }

  if (slug === "analytics") {
    return (
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground">SENT</div>
            <div className="text-base font-bold text-foreground">12,450</div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground">OPEN RATE</div>
            <div className="text-base font-bold text-emerald-400">68.4%</div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground">REPLY RATE</div>
            <div className="text-base font-bold text-accent">24.2%</div>
          </div>
          <div className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-[10px] text-muted-foreground">DEMOS BOOKED</div>
            <div className="text-base font-bold text-foreground">148</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "dexter-ai") {
    return (
      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-border bg-background p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Bot className="h-4 w-4 text-accent" /> Dexter AI Context Window
          </div>
          <span className="rounded bg-accent/20 text-accent px-2.5 py-0.5 font-mono text-[10px] font-bold">
            BYOK Model: Claude 3.5 Sonnet
          </span>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-3 space-y-2">
          <div className="font-bold text-accent">
            Query: &quot;Summarize CloudScale account priorities and draft 1-sentence intro
            line.&quot;
          </div>
          <div className="text-foreground leading-relaxed pt-1">
            &quot;CloudScale recently raised $15M Series B to expand EMEA sales operations. Intro
            line: &apos;Noticed CloudScale&apos;s recent Series B expansion into EMEA — wanted to
            share how we helped similar SaaS teams scale outreach safely.&apos;&quot;
          </div>
        </div>
      </div>
    );
  }

  return null;
}
