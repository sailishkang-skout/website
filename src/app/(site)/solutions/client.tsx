"use client";

import Link from "next/link";
import {
  Briefcase,
  Users,
  Building2,
  Rocket,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const solutions = [
  {
    icon: Briefcase,
    title: "Outbound sales",
    description:
      "Build verified lists, launch multi-channel cadences and pipe replies straight into your CRM.",
    bullets: ["ICP & lookalikes", "Sequence builder", "Reply routing"],
  },
  {
    icon: Rocket,
    title: "Demand generation",
    description:
      "Identify intent surges and trigger ad audiences + email plays before competitors notice.",
    bullets: ["Intent topics", "Audience sync", "Lift reports"],
  },
  {
    icon: Users,
    title: "Recruiting & sourcing",
    description: "Source passive talent with people-graph filters and verified personal emails.",
    bullets: ["Talent search", "Job change alerts", "ATS sync"],
  },
  {
    icon: Building2,
    title: "Agencies & lead-gen",
    description:
      "White-label dashboards, per-client workspaces and pooled credits with margin control.",
    bullets: ["Workspaces", "White label", "Margin pricing"],
  },
  {
    icon: GraduationCap,
    title: "Founders & GTM",
    description: "Skip the data-vendor maze. One subscription that scales from PMF to Series C.",
    bullets: ["Self-serve onboarding", "Usage-based pricing", "Founder support"],
  },
  {
    icon: HeartHandshake,
    title: "RevOps",
    description: "Keep your CRM clean with continuous enrichment, dedup and field standardization.",
    bullets: ["Bi-directional sync", "Dedup engine", "Field mapping"],
  },
];

export default function SolutionsClient() {
  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>Solutions</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Built for the way <GradientText>your team works.</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Purpose-built workflows for sales, recruiting, RevOps, founders and agencies — all on
            one platform.
          </p>
        </Section>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border transition-all hover:border-primary/50 hover:-translate-y-1"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold md:text-lg">{solution.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {solution.description}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {solution.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
                    >
                      Talk to us <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0!">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>Use cases</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
                One platform for every <GradientText>revenue workflow.</GradientText>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                Replace disconnected point solutions with one unified data, outreach and automation
                layer.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/pricing"
                className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
              >
                View pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium transition hover:bg-secondary"
              >
                Book demo
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
