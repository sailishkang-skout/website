"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  Database,
  Cloud,
  MessageSquare,
  Workflow,
  Search,
  Check,
  Zap,
  Bot,
  Chrome,
  ShieldCheck,
  Calendar,
  Code,
  ArrowRight,
  ExternalLink,
  Lock,
  Cpu,
  Layers,
} from "lucide-react";

interface IntegrationTool {
  id: string;
  name: string;
  category: "crm" | "outbound" | "ai" | "data" | "calendar" | "webhooks";
  categoryLabel: string;
  badge: "Native 2-Way" | "OAuth 2.0" | "BYOK AI" | "Bi-Directional" | "Webhook";
  description: string;
  iconLetter: string;
  capabilities: string[];
}

export default function IntegrationsClient({
  content,
}: { content?: Record<string, unknown> } = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const integrations: IntegrationTool[] = [
    {
      id: "hubspot",
      name: "HubSpot CRM",
      category: "crm",
      categoryLabel: "CRM Sync",
      badge: "Native 2-Way",
      description:
        "Bi-directional 2-way sync for contacts, companies, deals, call logs, and sequence activities.",
      iconLetter: "HS",
      capabilities: [
        "Real-time property mapping",
        "Deal pipeline stage sync",
        "Automated activity logging",
      ],
    },
    {
      id: "google-workspace",
      name: "Google Workspace & Gmail",
      category: "outbound",
      categoryLabel: "Email & Outreach",
      badge: "OAuth 2.0",
      description:
        "Connect unlimited Google Workspace sending accounts via secure 1-click OAuth 2.0 authorization.",
      iconLetter: "GW",
      capabilities: [
        "Automatic SPF/DKIM verification",
        "Inbox reply tracking",
        "Peer-to-peer warmup",
      ],
    },
    {
      id: "microsoft-365",
      name: "Microsoft 365 & Outlook",
      category: "outbound",
      categoryLabel: "Email & Outreach",
      badge: "OAuth 2.0",
      description:
        "Native Exchange/Outlook OAuth sending connection with automated deliverability health monitoring.",
      iconLetter: "M365",
      capabilities: [
        "Exchange API integration",
        "Auto mailbox rotation pool",
        "Bounce rate protection",
      ],
    },
    {
      id: "chrome-extension",
      name: "Skout Chrome Extension V3",
      category: "outbound",
      categoryLabel: "Browser Automation",
      badge: "Native 2-Way",
      description:
        "Extract, enrich, and score LinkedIn prospects directly inside your Chrome browser sidepanel.",
      iconLetter: "CR",
      capabilities: [
        "1-click LinkedIn profile capture",
        "Clerk session authorization",
        "Bulk search export",
      ],
    },
    {
      id: "openai-byok",
      name: "OpenAI GPT-4o (BYOK)",
      category: "ai",
      categoryLabel: "AI Models",
      badge: "BYOK AI",
      description:
        "Bring your own secret OpenAI API key to power Dexter AI for account research and copywriting.",
      iconLetter: "OA",
      capabilities: [
        "Zero data retention policy",
        "GPT-4o & GPT-4o-mini support",
        "Custom prompt templates",
      ],
    },
    {
      id: "anthropic-byok",
      name: "Anthropic Claude 3.5 Sonnet",
      category: "ai",
      categoryLabel: "AI Models",
      badge: "BYOK AI",
      description:
        "Connect Anthropic API keys for high-precision prospect context summarization and thread analysis.",
      iconLetter: "ANT",
      capabilities: [
        "Claude 3.5 Sonnet model",
        "200k token context window",
        "Private LLM processing",
      ],
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      category: "calendar",
      categoryLabel: "Meetings & Booking",
      badge: "Bi-Directional",
      description:
        "Sync booked sales demo calls, detect meeting attendance, and attribute revenue to sequence steps.",
      iconLetter: "GC",
      capabilities: [
        "Cal.com / Calendly support",
        "No-show tracking",
        "Automated CRM deal creation",
      ],
    },
    {
      id: "snowflake",
      name: "Snowflake Data Cloud",
      category: "data",
      categoryLabel: "Data Warehouse",
      badge: "Bi-Directional",
      description:
        "Stream enriched lead data and campaign engagement events directly into your Snowflake warehouse.",
      iconLetter: "SNOW",
      capabilities: ["Automated SQL sync", "Lead score exports", "Custom schema tables"],
    },
    {
      id: "webhooks-api",
      name: "Outbound Webhooks & REST API",
      category: "webhooks",
      categoryLabel: "Developer Tools",
      badge: "Webhook",
      description:
        "HMAC SHA-256 signed webhooks and REST API endpoints for custom GTM engineering workflows.",
      iconLetter: "API",
      capabilities: [
        "Real-time event payloads",
        "HMAC security signatures",
        "Custom payload schemas",
      ],
    },
  ];

  const filteredIntegrations = integrations.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>NATIVE GTM INTEGRATIONS ECOSYSTEM</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] wrap-break-word text-foreground font-semibold">
              Plays nicely with <br />
              <GradientText>everything in your revenue stack.</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Connect your CRM, sending mailboxes, LinkedIn extension, calendars, and BYOK AI models
              to turn Skout AI into your central GTM control center.
            </p>

            {/* SEARCH BAR */}
            <div className="pt-2 mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search integrations (HubSpot, Gmail, Chrome Extension, Claude...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-card/80 pl-11 pr-4 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md"
                />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CATEGORY FILTER TABS & INTEGRATION CARDS GRID */}
      <Section className="py-8! md:py-12!">
        {/* CATEGORY TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Integrations" },
            { id: "crm", label: "CRM Sync" },
            { id: "outbound", label: "Email & Outreach" },
            { id: "ai", label: "BYOK AI Models" },
            { id: "calendar", label: "Meetings" },
            { id: "data", label: "Data Warehouse" },
            { id: "webhooks", label: "Developer Webhooks" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-foreground text-background shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* INTEGRATIONS GRID */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((tool) => (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border p-5 md:p-6 transition hover:-translate-y-1"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground font-mono text-xs font-bold text-background">
                    {tool.iconLetter}
                  </div>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {tool.categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>

                <ul className="space-y-1.5 pt-2 text-xs">
                  {tool.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground font-medium">
                      <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-border/60 pt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-accent flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" /> Workspace Ready
                </span>
                <Link
                  href="/contact"
                  className="font-semibold text-foreground hover:underline inline-flex items-center gap-1"
                >
                  Configure <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOM INTEGRATION REQUEST BANNER */}
      <Section className="py-8! md:py-12! bg-card/20! border-y border-border/60">
        <div
          className="rounded-3xl border border-border p-6 md:p-10 shadow-2xl mx-auto max-w-4xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <Eyebrow>Custom Integration</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Don&apos;t see your stack in our catalog?
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Skout AI provides custom REST API endpoints, OAuth connectors, and webhook relays
                for proprietary enterprise sales architectures.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background p-4 shadow-xl text-xs">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Code className="h-4 w-4 text-accent" /> Custom Webhook Relay Specs
              </div>
              <div className="font-mono text-accent bg-muted/60 p-2.5 rounded-xl overflow-x-auto text-[11px]">
                POST /your-unique-webhook-url
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">
                Every customer receives a dedicated, secure webhook endpoint tailored to your
                integration needs.
              </p>
              <ul className="space-y-1 text-muted-foreground text-[11px]">
                <li className="flex items-center gap-1.5">
                  ✓ HMAC SHA-256 payload signing for security
                </li>
                <li className="flex items-center gap-1.5">
                  ✓ Custom field mapping and transformation
                </li>
                <li className="flex items-center gap-1.5">✓ Enterprise-grade 99.99% uptime SLA</li>
              </ul>
              <Link
                href="/contact"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
              >
                Request Custom Connector <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
