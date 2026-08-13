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
import type { LucideIcon } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const SOLUTION_ICONS: LucideIcon[] = [
  Briefcase,
  Rocket,
  Users,
  Building2,
  GraduationCap,
  HeartHandshake,
];

interface Solution {
  title: string;
  description: string;
  bullets: string[];
}

interface Props {
  content: Record<string, unknown>;
}

export default function SolutionsClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const solutions = (content.solutions as Solution[]) ?? [];
  const cta = (content.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? {
    text: "View pricing",
    href: "/pricing",
  };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "Book demo",
    href: "/contact",
  };

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>{String(hero.eyebrow ?? "Solutions")}</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {String(hero.title ?? "Built for the way")}{" "}
            <GradientText>{String(hero.titleHighlight ?? "your team works.")}</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {String(hero.description ?? "")}
          </p>
        </Section>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution, i) => {
            const Icon = SOLUTION_ICONS[i % SOLUTION_ICONS.length];
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
                    {(solution.bullets ?? []).map((bullet) => (
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
              <Eyebrow>{String(cta.eyebrow ?? "Use cases")}</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
                {String(cta.title ?? "One platform for every")}{" "}
                <GradientText>{String(cta.titleHighlight ?? "revenue workflow.")}</GradientText>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                {String(cta.description ?? "")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href={ctaPrimary.href}
                className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
              >
                {ctaPrimary.text}
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium transition hover:bg-secondary"
              >
                {ctaSecondary.text}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
