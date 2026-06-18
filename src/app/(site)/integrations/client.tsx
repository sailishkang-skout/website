"use client";

import Link from "next/link";
import { Database, Cloud, MessageSquare, Workflow, ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

const groups = [
  {
    name: "CRM",
    icon: Database,
    blurb: "Two-way sync with the systems of record your revenue team lives in.",
    items: [
      { name: "Salesforce", caption: "Bi-directional sync", key: "SF" },
      { name: "HubSpot", caption: "Native app", key: "HS" },
      { name: "Pipedrive", caption: "Real-time push", key: "PD" },
      { name: "Close", caption: "Activity sync", key: "CL" },
      { name: "Attio", caption: "Workspace sync", key: "AT" },
      { name: "Folk", caption: "Contact sync", key: "FK" },
    ],
  },
  {
    name: "Warehouse & ETL",
    icon: Cloud,
    blurb: "Land enriched data in your warehouse with reverse ETL out of the box.",
    items: [
      { name: "Snowflake", caption: "Reverse ETL", key: "SN" },
      { name: "BigQuery", caption: "Streaming", key: "BQ" },
      { name: "Redshift", caption: "Batch loads", key: "RS" },
      { name: "Postgres", caption: "Direct connect", key: "PG" },
      { name: "Segment", caption: "Event stream", key: "SG" },
      { name: "Fivetran", caption: "Managed sync", key: "FT" },
    ],
  },
  {
    name: "Outreach & Comms",
    icon: MessageSquare,
    blurb: "Send from your inbox, log calls, and book meetings without context switching.",
    items: [
      { name: "Slack", caption: "Alerts & DMs", key: "SL" },
      { name: "Gmail", caption: "Send & track", key: "GM" },
      { name: "Outlook", caption: "Send & track", key: "OL" },
      { name: "Zoom", caption: "Meeting logs", key: "ZM" },
      { name: "Calendly", caption: "Auto-booking", key: "CD" },
      { name: "Aircall", caption: "Dialer", key: "AC" },
    ],
  },
  {
    name: "Workflow & Data",
    icon: Workflow,
    blurb: "Compose Skout AI into anything via low-code, no-code, or raw HTTP.",
    items: [
      { name: "Zapier", caption: "5,000+ apps", key: "ZP" },
      { name: "Make", caption: "Visual scenarios", key: "MK" },
      { name: "n8n", caption: "Self-hosted", key: "N8" },
      { name: "Webhook", caption: "Real-time events", key: "WH" },
      { name: "REST API", caption: "Full coverage", key: "RA" },
      { name: "GraphQL", caption: "Typed queries", key: "GQ" },
    ],
  },
];

const apiFeatures = ["REST API", "GraphQL", "Webhooks", "OAuth 2.0", "SCIM", "Audit logs"];

export default function IntegrationsClient() {
  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }}>
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>Integrations</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Plays nicely with <GradientText>everything you already use.</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Native connectors, an open API and webhooks for the rest. Your data, your warehouse —
            always.
          </p>
        </Section>
      </div>

      <Section>
        <div className="space-y-16 md:space-y-24">
          {groups.map((group) => {
            const GroupIcon = group.icon;
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
                    {group.items.map((item) => (
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
              <Eyebrow>Custom</Eyebrow>
              <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                Don't see <GradientText>your stack?</GradientText>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Every Skout AI object is exposed through a typed REST and GraphQL API, plus signed
                webhooks for every event. If it has an HTTP endpoint, it integrates.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {apiFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-border bg-background px-4 py-3 font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
