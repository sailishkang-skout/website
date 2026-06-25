"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

interface Tier {
  name: string;
  price: string;
  per: string;
  desc: string;
  cta: string;
  ctaHref?: string;
  highlight?: boolean;
  features: string[];
}

interface Props {
  content: Record<string, unknown>;
}

export default function PricingClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const tiers = (content.tiers as Tier[]) ?? [];
  const compare = (content.compare as Record<string, unknown>) ?? {};
  const compareRows = (compare.rows as string[][]) ?? [];

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>{String(hero.eyebrow ?? "Pricing")}</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {String(hero.title ?? "Pay for results,")}{" "}
            <GradientText>{String(hero.titleHighlight ?? "not per seat.")}</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {String(hero.description ?? "")}
          </p>
        </Section>
      </div>

      <Section className="pt-0!">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col overflow-hidden rounded-3xl border ${
                tier.highlight ? "border-primary/50" : "border-border"
              }`}
              style={{
                background: "var(--gradient-card)",
                boxShadow: tier.highlight ? "var(--shadow-glow)" : undefined,
              }}
            >
              {tier.highlight && (
                <div className="absolute left-1/2 top-4 -translate-x-1/2">
                  <div
                    className="rounded-full px-3 py-1 text-xs font-medium text-background"
                    style={{ background: "var(--foreground)" }}
                  >
                    Most popular
                  </div>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className={tier.highlight ? "pt-6" : ""}>
                  <h3 className="text-base font-semibold">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.desc}</p>
                </div>
                <div className="mt-6">
                  <div className="flex items-end gap-2">
                    <span className="font-display text-3xl tracking-tight md:text-4xl">
                      {tier.price}
                    </span>
                    <span className="pb-1 text-xs text-muted-foreground">{tier.per}</span>
                  </div>
                </div>
                <Link
                  href={tier.ctaHref ?? "/contact"}
                  className={`mt-6 inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition ${
                    tier.highlight
                      ? "text-background hover:opacity-90"
                      : "border border-border bg-background hover:bg-secondary"
                  }`}
                  style={tier.highlight ? { background: "var(--foreground)" } : undefined}
                >
                  {tier.cta}
                </Link>
                <ul className="mt-6 space-y-3">
                  {(tier.features ?? []).map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {compareRows.length > 0 && (
        <Section className="pt-0!">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>{String(compare.eyebrow ?? "Compare")}</Eyebrow>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
                {String(compare.title ?? "Compare plans")}
              </h2>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-150 text-sm">
              <thead className="bg-card/60 backdrop-blur">
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-left font-medium text-foreground md:px-6">
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className="px-4 py-4 text-left font-medium text-foreground md:px-6"
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-none">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-4 md:px-6 ${
                          cellIndex === 0
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </div>
  );
}
