"use client";

import Link from "next/link";
import { Database, Cloud, MessageSquare, Workflow, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const GROUP_ICONS: Record<string, LucideIcon> = {
  CRM: Database,
  "Warehouse & ETL": Cloud,
  "Outreach & Comms": MessageSquare,
  "Workflow & Data": Workflow,
};

interface IntegrationItem {
  name: string;
  caption: string;
  key: string;
}

interface IntegrationGroup {
  name: string;
  blurb: string;
  items: IntegrationItem[];
}

interface Props {
  content: Record<string, unknown>;
}

export default function IntegrationsClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const groups = (content.groups as IntegrationGroup[]) ?? [];
  const custom = (content.custom as Record<string, unknown>) ?? {};
  const customFeatures = (custom.features as string[]) ?? [];

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }}>
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>{String(hero.eyebrow ?? "Integrations")}</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            {String(hero.title ?? "Plays nicely with")}{" "}
            <GradientText>{String(hero.titleHighlight ?? "everything you already use.")}</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {String(hero.description ?? "")}
          </p>
        </Section>
      </div>

      <Section>
        <div className="space-y-16 md:space-y-24">
          {groups.map((group) => {
            const GroupIcon = GROUP_ICONS[group.name] ?? Database;
            return (
              <div key={group.name}>
                <div className="grid gap-8 md:grid-cols-[240px_1fr]">
                  <div className="md:sticky md:top-24 md:self-start">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background">
                        <GroupIcon className="h-4 w-4" />
                      </div>
                      <Eyebrow>{group.name}</Eyebrow>
                    </div>
                    <h2 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                      {group.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {group.blurb}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {(group.items ?? []).map((item) => (
                      <Link
                        key={item.name}
                        href="#"
                        className="group relative flex items-center gap-4 bg-card p-4 transition hover:bg-secondary/60 md:p-5"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background font-display text-xs md:text-sm">
                          {item.key}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-medium">{item.name}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {item.caption}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-16 rounded-3xl border border-border p-6 md:mt-24 md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>{String(custom.eyebrow ?? "Custom")}</Eyebrow>
              <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                {String(custom.title ?? "Don't see")}{" "}
                <GradientText>{String(custom.titleHighlight ?? "your stack?")}</GradientText>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {String(custom.description ?? "")}
              </p>
            </div>
            {customFeatures.length > 0 && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {customFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-medium"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
