"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Shield, Globe2, Zap } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const values = [
  {
    icon: Shield,
    number: "01",
    title: "Data with consent",
    description:
      "We only ingest public and consented signals. Privacy is a product feature, not a policy page.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "One bill, no surprises",
    description: "Transparent credit pricing. No per-seat tax, no usage shock at quarter end.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Quality over volume",
    description: "98.5% verified accuracy beats one billion unverified rows every single quarter.",
  },
  {
    icon: Globe2,
    number: "04",
    title: "Open by default",
    description: "Your data flows out as easily as in — REST, GraphQL, exports, warehouse sync.",
  },
];

const timeline = [
  {
    year: "2024",
    time: "Spring",
    description: "Founded by ex-RevOps leaders frustrated with five-vendor outbound stacks.",
  },
  {
    year: "2024",
    time: "Summer",
    description: "First 100 design partners. Waterfall enrichment ships in private beta.",
  },
  {
    year: "2024",
    time: "Winter",
    description: "Public launch. 1,200 teams across 22 countries onboard in 90 days.",
  },
  {
    year: "2025",
    time: "Spring",
    description: "$18M Series A. Native CRM, warehouse and AI SDR agent shipped.",
  },
  {
    year: "2026",
    time: "Today",
    description: "3,200+ revenue teams. SOC 2 Type II. Nine timezones, one mission.",
  },
];

const team = [
  { name: "Ava Larsen", role: "Co-founder & CEO", location: "Oslo" },
  { name: "Mateo Rivera", role: "Co-founder & CTO", location: "Lisbon" },
  { name: "Priya Shah", role: "Head of Product", location: "Bangalore" },
  { name: "Jonas Weber", role: "Head of Data", location: "London" },
  { name: "Mira Tanaka", role: "Design Director", location: "Tokyo" },
  { name: "Léa Dupont", role: "Head of GTM", location: "Paris" },
];

const press = ["TechCrunch", "Forbes", "The Information", "Sifted", "Bloomberg"];

export default function AboutClient() {
  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! md:py-20!">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>The company</Eyebrow>
              <h1 className="mt-4 font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
                Rebuilding the <GradientText>B2B data stack</GradientText> — from the schema up.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Modern revenue teams glue together five vendors just to ship one outbound campaign.
                We thought that was nuts — so we built Skout AI. One graph, one bill, one workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Work with us <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  Explore the product
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
                {[
                  ["2024", "Founded"],
                  ["40+", "Countries"],
                  ["$18M", "Series A"],
                  ["3,200+", "Teams"],
                  ["98.5%", "Accuracy"],
                  ["9", "Timezones"],
                ].map(([key, value]) => (
                  <div key={value} className="bg-card p-5 md:p-6">
                    <h3 className="font-display text-2xl md:text-3xl">
                      <GradientText>{key}</GradientText>
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Manifesto</Eyebrow>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
              We believe <GradientText>data is a craft,</GradientText> not a CSV.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-relaxed lg:col-span-8 lg:border-l lg:border-border lg:pl-10">
            <p className="text-muted-foreground">
              For two decades the B2B data industry sold volume. Bigger lists. More rows. More
              seats. The result: bloated CRMs, bounced emails, and revenue teams who trust nothing.
            </p>
            <p className="text-muted-foreground">
              Skout AI is a bet in the other direction. Fewer signals, verified deeper. Sources
              stitched into one graph. Workflows composed instead of stitched together.
            </p>
            <p className="text-muted-foreground">
              We don't think this is the end state. But it's the right next one.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Values</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
              Four rules we don't break.
            </h2>
          </div>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {values.map((item) => {
            const Icon = item.icon;
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
              <Eyebrow>Timeline</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
                A short, <GradientText>fast</GradientText> story.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Two years in. Plenty left to build.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border-l border-border pl-6 md:pl-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pb-10 last:pb-0">
                    <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full border border-border bg-background md:-left-[38px]">
                      <div
                        className="m-auto mt-[4px] h-1.5 w-1.5 rounded-full"
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
            <Eyebrow>Team</Eyebrow>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
              Operators, <GradientText>not pundits.</GradientText>
            </h2>
          </div>
          <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
            View open roles →
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4 bg-card p-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-base text-white"
                style={{ background: "var(--gradient-accent)" }}
              >
                {member.name
                  .split(" ")
                  .map((w) => w[0])
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

      <div className="border-t border-border">
        <Section className="py-12!">
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>Featured in</Eyebrow>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {press.map((item) => (
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

      <Section className="pt-0!">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>Join us</Eyebrow>
              <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
                Help us build the <GradientText>last data tool</GradientText> your team installs.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
