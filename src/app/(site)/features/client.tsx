"use client";

import Link from "next/link";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  Database,
  Sparkles,
  ShieldCheck,
  Workflow,
  Bot,
  Activity,
  Mail,
  Plug,
  BarChart3,
  Filter,
  Layers,
  Search,
  GitBranch,
  Zap,
  Cpu,
  Users,
  Phone,
  Linkedin,
  Building2,
  DollarSign,
  FileSpreadsheet,
  ListChecks,
  Brain,
  Target,
  PenLine,
  FlaskConical,
  Inbox,
  Repeat,
  MousePointerClick,
  KanbanSquare,
  CalendarClock,
  StickyNote,
  Boxes,
  MoveRight,
  Chrome,
  LineChart,
  TrendingUp,
  UserCheck,
  Send,
} from "lucide-react";

const groups = [
  {
    title: "Lead Intelligence",
    icon: Database,
    features: [
      {
        icon: Building2,
        title: "Company search",
        description: "Filter 45M companies by industry, size, geo, funding stage and revenue band.",
      },
      {
        icon: Users,
        title: "Employee search",
        description: "Surface decision-makers across 200M profiles with 40+ persona filters.",
      },
      {
        icon: Mail,
        title: "Email finder",
        description: "Resolve verified work emails from a name, domain or LinkedIn URL.",
      },
      {
        icon: Phone,
        title: "Phone finder",
        description: "Compliant mobile and direct dials with carrier validation and DNC screening.",
      },
      {
        icon: Linkedin,
        title: "LinkedIn enrichment",
        description:
          "Hydrate profiles with titles, tenure, skills and recent activity in one call.",
      },
      {
        icon: Cpu,
        title: "Technology stack detection",
        description: "Track 30,000+ tools across your TAM with adoption and churn signals.",
      },
      {
        icon: DollarSign,
        title: "Funding & growth data",
        description: "Rounds, investors, hiring velocity and M&A — refreshed every 4 hours.",
      },
      {
        icon: FileSpreadsheet,
        title: "CSV import & export",
        description: "Drop any list — we match, enrich and return it without changing the schema.",
      },
      {
        icon: Sparkles,
        title: "Bulk enrichment",
        description:
          "Run waterfall enrichment across millions of rows with vendor-priority routing.",
      },
      {
        icon: ListChecks,
        title: "Saved lists & smart filters",
        description: "Living ICPs that auto-refresh as new matches appear in the graph.",
      },
      {
        icon: Filter,
        title: "Advanced search",
        description: "Boolean operators, exclusion logic and lookalike search built in.",
      },
      {
        icon: Layers,
        title: "Lookalike accounts",
        description: "Feed in 10 best customers — get the 1,000 closest twins ranked by fit.",
      },
    ],
  },
  {
    title: "AI Research",
    icon: Brain,
    features: [
      {
        icon: Search,
        title: "AI lead research",
        description: "Autonomous agent scans 50+ sources per lead and returns a structured brief.",
      },
      {
        icon: Building2,
        title: "AI company summaries",
        description: "Plain-English overviews of strategy, products and recent milestones.",
      },
      {
        icon: PenLine,
        title: "AI personalized first lines",
        description: "Hooks grounded in real signals — never generic filler.",
      },
      {
        icon: Mail,
        title: "AI cold email generation",
        description: "Full sequences in your brand voice, tuned for the recipient's persona.",
      },
      {
        icon: Target,
        title: "AI lead scoring",
        description: "Fit + intent + timing scored on a 0-100 scale you can trust.",
      },
      {
        icon: UserCheck,
        title: "AI ICP matching",
        description: "Train a custom ICP from 5 closed-won examples in under 60 seconds.",
      },
      {
        icon: Workflow,
        title: "GPT-based workflows",
        description: "Drop AI steps anywhere — extraction, classification, rewriting, scoring.",
      },
      {
        icon: StickyNote,
        title: "AI-generated notes",
        description: "Meeting summaries, call recaps and follow-up drafts written automatically.",
      },
    ],
  },
  {
    title: "Cold Outreach",
    icon: Send,
    features: [
      {
        icon: Mail,
        title: "Campaign creation",
        description: "Launch multi-step campaigns in minutes with reusable templates and blocks.",
      },
      {
        icon: Inbox,
        title: "Unlimited mailboxes",
        description: "Connect as many sending inboxes as you need — no per-seat tax.",
      },
      {
        icon: Activity,
        title: "Email warmup",
        description: "Built-in warm-up network keeps domains healthy before and during sending.",
      },
      {
        icon: Repeat,
        title: "Inbox rotation",
        description: "Distribute volume across mailboxes automatically.",
      },
      {
        icon: GitBranch,
        title: "Follow-up sequences",
        description: "Conditional branches based on opens, clicks and replies.",
      },
      {
        icon: FlaskConical,
        title: "A/B testing",
        description: "Test subject lines, CTAs and send times with statistical confidence.",
      },
      {
        icon: Zap,
        title: "Smart sending",
        description: "Adaptive throttling and bounce handling.",
      },
      {
        icon: MousePointerClick,
        title: "Tracking",
        description: "Open / click / reply tracking with full attribution.",
      },
      {
        icon: Bot,
        title: "AI-generated sequences",
        description: "Generate a full 5-touch cadence from one product description.",
      },
    ],
  },
  {
    title: "CRM",
    icon: KanbanSquare,
    features: [
      {
        icon: KanbanSquare,
        title: "Deal pipelines",
        description: "Drag-and-drop boards with forecasts and custom stages.",
      },
      {
        icon: ListChecks,
        title: "Tasks",
        description: "Auto-created from triggers and activities.",
      },
      {
        icon: StickyNote,
        title: "Notes",
        description: "Rich-text notes attached to contacts and deals.",
      },
      {
        icon: CalendarClock,
        title: "Meeting scheduling",
        description: "Native scheduler with round-robin and buffers.",
      },
      {
        icon: Users,
        title: "Team collaboration",
        description: "Shared inboxes, deal rooms and mentions.",
      },
      {
        icon: Activity,
        title: "Activity tracking",
        description: "Every touch auto-stitched to the right record.",
      },
    ],
  },
  {
    title: "Workflow Automation",
    icon: Workflow,
    features: [
      {
        icon: Boxes,
        title: "Drag-and-drop builder",
        description: "Visual no-code workflow builder.",
      },
      {
        icon: MoveRight,
        title: "200+ blocks",
        description: "Pre-built enrichment and automation blocks.",
      },
      {
        icon: GitBranch,
        title: "Conditional branching",
        description: "Nested logic with visual conditions.",
      },
      {
        icon: Plug,
        title: "HTTP & webhook nodes",
        description: "Call any API directly inside workflows.",
      },
      { icon: Brain, title: "AI nodes", description: "Drop GPT steps into any workflow." },
      {
        icon: Repeat,
        title: "Schedules & triggers",
        description: "Run on cron jobs, forms or CRM events.",
      },
    ],
  },
  {
    title: "Chrome Extension",
    icon: Chrome,
    features: [
      {
        icon: Linkedin,
        title: "LinkedIn sidebar",
        description: "Full prospect profile on any LinkedIn page.",
      },
      {
        icon: Zap,
        title: "One-click enrichment",
        description: "Grab verified data without leaving the tab.",
      },
      {
        icon: KanbanSquare,
        title: "Save to CRM",
        description: "Push contacts and notes instantly.",
      },
      { icon: Mail, title: "Find email instantly", description: "Verified email in under 400ms." },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    features: [
      { icon: LineChart, title: "Leads analytics", description: "Funnel and source analytics." },
      {
        icon: Mail,
        title: "Open & reply rates",
        description: "Deliverability and engagement insights.",
      },
      {
        icon: ShieldCheck,
        title: "Deliverability monitoring",
        description: "Spam-trap and blacklist monitoring.",
      },
      {
        icon: TrendingUp,
        title: "Revenue tracking",
        description: "Closed-won attribution analytics.",
      },
      {
        icon: BarChart3,
        title: "Campaign analytics",
        description: "Per-step performance insights.",
      },
      {
        icon: Users,
        title: "Team performance",
        description: "Rep leaderboards and contribution tracking.",
      },
      {
        icon: Brain,
        title: "AI insights",
        description: "Weekly written summaries and anomaly detection.",
      },
      {
        icon: Activity,
        title: "Recent activities",
        description: "Unified activity feed across the team.",
      },
    ],
  },
  {
    title: "AI SDR Agent",
    icon: Bot,
    features: [
      {
        icon: Search,
        title: "Finds leads automatically",
        description: "Searches the graph 24/7 for ICP matches.",
      },
      {
        icon: PenLine,
        title: "Generates outreach",
        description: "Writes personalized first touches.",
      },
      {
        icon: Repeat,
        title: "Sends follow-ups",
        description: "Smart timing and branching sequences.",
      },
      {
        icon: UserCheck,
        title: "Qualifies leads",
        description: "Conversational qualification workflows.",
      },
      {
        icon: CalendarClock,
        title: "Books meetings",
        description: "Schedules meetings automatically.",
      },
    ],
  },
];

export default function FeaturesClient() {
  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }}>
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>Platform</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            One platform.
            <br />
            <GradientText>Five tools you can cancel.</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            From the first ICP search to a closed-won deal — every step lives in Skout AI.
          </p>
        </Section>
      </div>

      {groups.map((group, index) => {
        const GroupIcon = group.icon;
        return (
          <Section key={group.title} className={`py-5! md:py-8! ${index % 2 ? "bg-card/20!" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <GroupIcon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{group.title}</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {group.features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-border p-5 transition hover:-translate-y-1"
                    style={{ background: "var(--gradient-card)" }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FeatureIcon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold md:text-base">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        );
      })}

      <Section className="py-12!">
        <div
          className="rounded-3xl border border-border p-6 text-center md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <h2 className="text-2xl font-semibold md:text-3xl">Ready to consolidate your stack?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Replace five disconnected tools with one unified revenue operating system.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Start free
          </Link>
        </div>
      </Section>
    </div>
  );
}
