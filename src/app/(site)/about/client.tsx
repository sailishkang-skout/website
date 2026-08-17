"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Shield, Globe2, Zap } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const VALUE_ICONS = [Shield, Sparkles, Zap, Globe2];

interface Props {
  content: Record<string, unknown>;
}

export default function AboutClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const heroStats = (hero.stats as Array<{ key: string; value: string }>) ?? [];
  const heroPrimary = (hero.primaryCta as { text: string; href: string }) ?? {
    text: "Work with us",
    href: "/contact",
  };
  const heroSecondary = (hero.secondaryCta as { text: string; href: string }) ?? {
    text: "Explore the product",
    href: "/features",
  };

  const manifesto = (content.manifesto as Record<string, unknown>) ?? {};
  const manifestoParagraphs = (manifesto.paragraphs as string[]) ?? [];

  const values = (content.values as Record<string, unknown>) ?? {};
  const valueItems =
    (values.items as Array<{ number: string; title: string; description: string }>) ?? [];

  const timeline = (content.timeline as Record<string, unknown>) ?? {};
  const timelineItems =
    (timeline.items as Array<{ year: string; time: string; description: string }>) ?? [];

  const team = (content.team as Record<string, unknown>) ?? {};
  const teamMembers =
    (team.members as Array<{ name: string; role: string; location: string }>) ?? [];

  const press = (content.press as Record<string, unknown>) ?? {};
  const pressPublications = (press.publications as string[]) ?? [];

  const cta = (content.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? {
    text: "Get in touch",
    href: "/contact",
  };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "See pricing",
    href: "/pricing",
  };

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! md:py-20!">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{String(hero.eyebrow ?? "The company")}</Eyebrow>
              <h1 className="mt-4 font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
                {String(hero.title ?? "Rebuilding the")}{" "}
                <GradientText>{String(hero.titleHighlight ?? "B2B data stack")}</GradientText>{" "}
                {String(hero.titleSuffix ?? "— from the schema up.")}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {String(hero.description ?? "")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={heroPrimary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  {heroPrimary.text} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href={heroSecondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  {heroSecondary.text}
                </Link>
              </div>
            </div>
            {heroStats.length > 0 && (
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
                  {heroStats.map((stat) => (
                    <div key={stat.value} className="bg-card p-5 md:p-6">
                      <h3 className="font-display text-2xl md:text-3xl">
                        <GradientText>{stat.key}</GradientText>
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{String(manifesto.eyebrow ?? "Manifesto")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
              {String(manifesto.title ?? "We believe")}{" "}
              <GradientText>{String(manifesto.titleHighlight ?? "data is a craft,")}</GradientText>{" "}
              {String(manifesto.titleSuffix ?? "not a CSV.")}
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-relaxed lg:col-span-8 lg:border-l lg:border-border lg:pl-10">
            {manifestoParagraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>{String(values.eyebrow ?? "Values")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
              {String(values.title ?? "Four rules we don't break.")}
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {valueItems.map((item, index) => {
            const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
            return (
              <div key={item.title} className="group bg-card p-6 transition hover:bg-secondary/60">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-muted-foreground">{item.number}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-8 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="border-y border-border bg-secondary/40">
        <Section>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>{String(timeline.eyebrow ?? "Timeline")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
                {String(timeline.title ?? "A short,")}{" "}
                <GradientText>{String(timeline.titleHighlight ?? "fast")}</GradientText>{" "}
                {String(timeline.titleSuffix ?? "story.")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {String(timeline.subtitle ?? "Two years in. Plenty left to build.")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border-l border-border pl-6 md:pl-8">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative pb-10 last:pb-0">
                    <div className="absolute -left-8.5 top-1 h-4 w-4 rounded-full border border-border bg-background md:-left-9.5">
                      <div
                        className="m-auto mt-1 h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--gradient-accent)" }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{item.year}</span>
                      <span className="h-px w-6 bg-border" />
                      <span>{item.time}</span>
                    </div>
                    <p className="mt-2 font-display text-lg leading-snug md:text-xl">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{String(team.eyebrow ?? "Team")}</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
              {String(team.title ?? "Operators,")}{" "}
              <GradientText>{String(team.titleHighlight ?? "not pundits.")}</GradientText>
            </h2>
          </div>
          <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
            View open roles →
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center gap-4 bg-card p-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-base text-white"
                style={{ background: "var(--gradient-accent)" }}
              >
                {member.name
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <span className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">
                {member.location}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {pressPublications.length > 0 && (
        <div className="border-t border-border">
          <Section className="py-12!">
            <div className="flex flex-col items-center gap-5 text-center">
              <Eyebrow>{String(press.eyebrow ?? "Featured in")}</Eyebrow>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {pressPublications.map((item) => (
                  <span
                    key={item}
                    className="font-display text-xl text-muted-foreground/80 md:text-2xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      )}

      <Section className="pt-0!">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>{String(cta.eyebrow ?? "Join us")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
                {String(cta.title ?? "Help us build the")}{" "}
                <GradientText>{String(cta.titleHighlight ?? "last data tool")}</GradientText>{" "}
                {String(cta.titleSuffix ?? "your team installs.")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                {ctaPrimary.text} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary"
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
