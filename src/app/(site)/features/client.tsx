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
import type { LucideIcon } from "lucide-react";

const GROUP_ICONS: Record<string, LucideIcon> = {
  "Lead Intelligence": Database,
  "AI Research": Brain,
  "Cold Outreach": Send,
  CRM: KanbanSquare,
  "Workflow Automation": Workflow,
  "Chrome Extension": Chrome,
  Analytics: BarChart3,
  "AI SDR Agent": Bot,
};

const FEATURE_ICONS: Record<string, LucideIcon> = {
  "Company search": Building2,
  "Employee search": Users,
  "Email finder": Mail,
  "Phone finder": Phone,
  "LinkedIn enrichment": Linkedin,
  "Technology stack detection": Cpu,
  "Funding & growth data": DollarSign,
  "CSV import & export": FileSpreadsheet,
  "Bulk enrichment": Sparkles,
  "Saved lists & smart filters": ListChecks,
  "Advanced search": Filter,
  "Lookalike accounts": Layers,
  "AI lead research": Search,
  "AI company summaries": Building2,
  "AI personalized first lines": PenLine,
  "AI cold email generation": Mail,
  "AI lead scoring": Target,
  "AI ICP matching": UserCheck,
  "GPT-based workflows": Workflow,
  "AI-generated notes": StickyNote,
  "Campaign creation": Mail,
  "Unlimited mailboxes": Inbox,
  "Email warmup": Activity,
  "Inbox rotation": Repeat,
  "Follow-up sequences": GitBranch,
  "A/B testing": FlaskConical,
  "Smart sending": Zap,
  Tracking: MousePointerClick,
  "AI-generated sequences": Bot,
  "Deal pipelines": KanbanSquare,
  Tasks: ListChecks,
  Notes: StickyNote,
  "Meeting scheduling": CalendarClock,
  "Team collaboration": Users,
  "Activity tracking": Activity,
  "Drag-and-drop builder": Boxes,
  "200+ blocks": MoveRight,
  "Conditional branching": GitBranch,
  "HTTP & webhook nodes": Plug,
  "AI nodes": Brain,
  "Schedules & triggers": Repeat,
  "LinkedIn sidebar": Linkedin,
  "One-click enrichment": Zap,
  "Save to CRM": KanbanSquare,
  "Find email instantly": Mail,
  "Leads analytics": LineChart,
  "Open & reply rates": Mail,
  "Deliverability monitoring": ShieldCheck,
  "Revenue tracking": TrendingUp,
  "Campaign analytics": BarChart3,
  "Team performance": Users,
  "AI insights": Brain,
  "Recent activities": Activity,
  "Finds leads automatically": Search,
  "Generates outreach": PenLine,
  "Sends follow-ups": Repeat,
  "Qualifies leads": UserCheck,
  "Books meetings": CalendarClock,
};

interface FeatureGroup {
  title: string;
  features: Array<{ title: string; description: string }>;
}

interface Props {
  content: Record<string, unknown>;
}

export default function FeaturesClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const groups = (content.groups as FeatureGroup[]) ?? [];
  const cta = (content.cta as Record<string, unknown>) ?? {};

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }}>
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>{String(hero.eyebrow ?? "Platform")}</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            {String(hero.title ?? "One platform.")}
            <br />
            <GradientText>{String(hero.titleHighlight ?? "Five tools you can cancel.")}</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {String(hero.description ?? "")}
          </p>
        </Section>
      </div>

      {groups.map((group, index) => {
        const GroupIcon = GROUP_ICONS[group.title] ?? Database;
        return (
          <Section
            key={group.title}
            className={`py-5! md:py-8! ${index % 2 ? "bg-card/20!" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <GroupIcon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{group.title}</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {group.features.map((feature) => {
                const FeatureIcon = FEATURE_ICONS[feature.title] ?? Sparkles;
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
          <h2 className="text-2xl font-semibold md:text-3xl">
            {String(cta.title ?? "Ready to consolidate your stack?")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            {String(cta.description ?? "")}
          </p>
          <Link
            href={String(cta.ctaHref ?? "/contact")}
            className="mt-6 inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            {String(cta.ctaText ?? "Start free")}
          </Link>
        </div>
      </Section>
    </div>
  );
}
