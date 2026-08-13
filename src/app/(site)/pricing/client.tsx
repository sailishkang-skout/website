"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Building2,
  Lock,
  Layers,
  Users,
  X,
  Star,
  Shield,
  Key,
  Globe,
  RefreshCw,
  Sliders,
  Mail,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { WORKSPACE_URL } from "@/lib/constants";

interface Props {
  content: Record<string, unknown>;
}

export default function PricingClient({ content }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const plans = [
    {
      id: "free",
      name: "FREE",
      price: "$0",
      period: "/ mo",
      popular: false,
      tagline: "Get started with outbound.",
      description: "For founders & individuals building their first outbound workflows.",
      ctaText: "Start Free",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-border bg-card hover:border-accent/40 shadow-sm",
      badgeStyle: "bg-muted text-muted-foreground",
      bullets: [
        "1,000 emails/month & prospect search",
        "Basic CRM & CSV import/export",
        "Manual sequence builder & tracking",
      ],
    },
    {
      id: "starter",
      name: "STARTER",
      price: "$54",
      period: "/ mo",
      popular: false,
      tagline: "Automate your outbound.",
      description: "For founders, SDRs, and small sales teams moving beyond manual outreach.",
      ctaText: "Start Starter",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-border bg-card hover:border-accent/40 shadow-sm",
      badgeStyle: "bg-accent/10 text-accent border border-accent/20",
      bullets: [
        "5,000 enrichment credits/month",
        "Automated multi-step email sequences",
        "Smart lists, reply detection & unified inbox",
      ],
    },
    {
      id: "scale",
      name: "SCALE",
      price: "$79",
      period: "/ mo",
      popular: true,
      badge: "★ MOST POPULAR",
      tagline: "Build a serious outbound engine.",
      description: "For growing revenue teams scaling multi-channel outbound outreach.",
      ctaText: "Start Scale",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-accent border-2 bg-card shadow-xl shadow-accent/15 z-10",
      badgeStyle: "bg-accent text-accent-foreground font-bold shadow-sm",
      bullets: [
        "15,000 enrichment credits & mailbox rotation",
        "Multi-channel (Email + LinkedIn + Calls)",
        "AI prospect research & 2-way HubSpot sync",
      ],
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      price: "Custom",
      period: "",
      popular: false,
      badge: "ORGANIZATION SCALE",
      tagline: "Your sales infrastructure.",
      description: "For larger organizations needing custom scale, API access & SLAs.",
      ctaText: "Talk to Sales",
      ctaHref: "/contact",
      accentBorder: "border-border bg-card hover:border-accent/40 shadow-sm",
      badgeStyle: "bg-muted text-muted-foreground border border-border",
      bullets: [
        "Custom enrichment & sending volumes",
        "Multiple workspaces, SSO & custom field mapping",
        "API, Webhooks & dedicated customer success",
      ],
    },
  ];

  const comparisonCategories = [
    {
      category: "Pricing & Core Volume",
      rows: [
        { feature: "Pricing", free: "$0", starter: "$54/mo", scale: "$79/mo", enterprise: "Custom" },
        { feature: "Emails / Month", free: "1,000", starter: "Higher limits", scale: "Higher limits", enterprise: "Custom" },
        { feature: "Contact Enrichment", free: "Limited", starter: "5K/mo", scale: "15K/mo", enterprise: "Custom" },
        { feature: "Email Verification", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Email Sending", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
      ],
    },
    {
      category: "Prospecting & Sourcing",
      rows: [
        { feature: "Prospect Search", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Company Data", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Contact Data", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "CSV Import", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "CSV Export", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Smart Lists", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Automated Prospect Ingestion", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
      ],
    },
    {
      category: "Outbound Sequences",
      rows: [
        { feature: "Manual Sequences", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Automated Sequences", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Multi-Step Sequences", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Automated Follow-ups", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Multi-Channel Outreach", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "LinkedIn Workflows", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "Call Tasks", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
      ],
    },
    {
      category: "CRM & Inbox",
      rows: [
        { feature: "CRM", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Pipeline Management", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Custom" },
        { feature: "Email Tracking", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Reply Detection", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Unified Inbox", free: "Basic", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "HubSpot", free: "—", starter: "Standard", scale: "Two-way", enterprise: "Custom" },
        { feature: "Chrome Extension", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
      ],
    },
    {
      category: "AI & Deliverability",
      rows: [
        { feature: "AI Personalization", free: "Limited", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
        { feature: "AI Prospect Research", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "Connected Mailboxes", free: "Limited", starter: "Multiple", scale: "More", enterprise: "Custom" },
        { feature: "Mailbox Rotation", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "Deliverability Monitoring", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
        { feature: "Automated DNS Auditing", free: "—", starter: "✓", scale: "Automated", enterprise: "Advanced" },
      ],
    },
    {
      category: "Enterprise Controls",
      rows: [
        { feature: "API & Webhooks", free: "—", starter: "—", scale: "Optional", enterprise: "✓" },
        { feature: "Advanced Permissions", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Multiple Workspaces", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Custom Integrations", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "DPA & Security", free: "✓", starter: "✓", scale: "✓", enterprise: "Advanced" },
        { feature: "Support & SLA", free: "Standard", starter: "Priority", scale: "Priority", enterprise: "Dedicated / Custom" },
      ],
    },
  ];

  const whyUpgrade = [
    { title: "From manual → automated", text: "Auto-follow ups & smart sequences.", icon: RefreshCw },
    { title: "From data → intelligence", text: "Contact enrichment & AI research.", icon: Sparkles },
    { title: "From one → multi-channel", text: "Email, LinkedIn & call workflows.", icon: Layers },
    { title: "From individual → team", text: "CRM, analytics & team permissions.", icon: Users },
  ];

  const trustBlocks = [
    { title: "Privacy-first handling", desc: "We don't sell customer data.", icon: Shield },
    { title: "Encrypted transmission", desc: "Protected via encrypted protocols.", icon: Lock },
    { title: "Access controls", desc: "Restricted to authorized personnel.", icon: Key },
    { title: "Responsible AI", desc: "Data isn't used to train general AI.", icon: Sparkles },
    { title: "Global privacy", desc: "Built for GDPR & international laws.", icon: Globe },
    { title: "Incident response", desc: "Strict security incident procedures.", icon: ShieldCheck },
  ];

  const faqs = [
    {
      q: "Is Skout AI really free?",
      a: "Yes. The Free plan includes prospecting, basic enrichment, CRM functionality, manual sequences, and up to 1,000 emails per month with no credit card required.",
    },
    {
      q: "Do I need a credit card to start?",
      a: "No. You can start with the Free plan without providing a payment method.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes. You can upgrade from Free to Starter or Scale anytime as your outbound grows.",
    },
    {
      q: "What is the difference between Starter and Scale?",
      a: "Starter is designed for automated email outbound. Scale adds multi-channel workflows (Email + LinkedIn + Calls), AI prospect intelligence, mailbox rotation, two-way HubSpot sync, and advanced deliverability.",
    },
    {
      q: "Can I use my own email accounts?",
      a: "Yes. You can connect supported email accounts or mailboxes for outbound communication.",
    },
    {
      q: "Does Skout AI guarantee email delivery?",
      a: "No. Delivery depends on recipient servers, domain config, and sender reputation outside Skout AI's control. We provide tools to support deliverability but do not guarantee specific open or delivery rates.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes. Paid subscriptions can be cancelled through your account settings anytime.",
    },
    {
      q: "Does Skout AI sell my data?",
      a: "No. Skout AI does not sell customer data.",
    },
    {
      q: "Does Skout AI use customer data to train AI models?",
      a: "No. Skout AI does not use customer data to train generalized AI models for other customers.",
    },
    {
      q: "Is Skout AI GDPR compliant?",
      a: "Yes. Skout AI is designed to support international privacy standards including GDPR, CCPA, and Indian DPDP framework.",
    },
  ];

  const renderTableCell = (val: string, isScale = false) => {
    if (val === "✓") {
      return (
        <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${isScale ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500/10 text-emerald-400"}`}>
          <Check className="h-3.5 w-3.5" />
        </span>
      );
    }
    if (val === "—") {
      return <span className="text-muted-foreground/40 font-mono">—</span>;
    }
    return (
      <span className={`font-semibold ${isScale ? "text-accent" : "text-foreground/90"}`}>
        {val}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-x-hidden">
      {/* 1. HERO SECTION (MATCHES INTEGRATIONS HERO EXACTLY) */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>TRANSPARENT OUTBOUND PRICING</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] break-words text-foreground font-semibold">
              Start free. Scale when your outbound <GradientText>grows.</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Everything you need to find prospects, enrich contacts, organize your pipeline, and start outbound. No long-term commitment.
            </p>

            <div className="pt-1 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No credit card required</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Monthly billing</span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Cancel anytime</span>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. BRAND NEW SLEEK COMPACT 4-CARD GRID */}
      <Section className="py-8! md:py-12!">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${plan.accentBorder}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  {!plan.popular && plan.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${plan.badgeStyle}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 border-b border-border/60 pb-3">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-semibold text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-snug">
                  {plan.description}
                </p>

                {/* BULLETS */}
                <ul className="space-y-1.5 pt-1 text-xs text-muted-foreground">
                  {plan.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-tight">
                      <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 space-y-2">
                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    plan.popular
                      ? "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
                      : "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. INTERACTIVE TABBED FEATURE COMPARISON MATRIX */}
      <section id="feature-comparison" className="scroll-mt-20 border-t border-border/60 bg-card/20">
        <Section className="py-8! md:py-12!">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
            <Eyebrow>Feature Comparison</Eyebrow>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
              Everything you need to build and scale outbound
            </h2>
            <p className="text-xs text-muted-foreground">
              Click a category tab below to compare specific features across plans.
            </p>

            {/* TAB SELECTOR BUTTONS */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5">
              {comparisonCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === idx
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* TABBED TABLE CONTENT */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-md max-w-4xl mx-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/80 border-b border-border font-display font-bold text-foreground">
                <tr>
                  <th className="p-3.5 min-w-[180px]">{comparisonCategories[activeCategory].category}</th>
                  <th className="p-3.5 text-center min-w-[80px]">Free</th>
                  <th className="p-3.5 text-center min-w-[90px]">Starter ($54)</th>
                  <th className="p-3.5 text-center min-w-[100px] text-accent bg-accent/10 border-x border-accent/20">
                    Scale ⭐ ($79)
                  </th>
                  <th className="p-3.5 text-center min-w-[100px]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {comparisonCategories[activeCategory].rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-semibold text-foreground/90 pl-4">{row.feature}</td>
                    <td className="p-3 text-center">{renderTableCell(row.free)}</td>
                    <td className="p-3 text-center">{renderTableCell(row.starter)}</td>
                    <td className="p-3 text-center bg-accent/5 border-x border-accent/15">
                      {renderTableCell(row.scale, true)}
                    </td>
                    <td className="p-3 text-center">{renderTableCell(row.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </section>

      {/* 4. WHY UPGRADE? (COMPACT STRIP) */}
      <Section className="py-8! md:py-12! border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <Eyebrow>Why Upgrade?</Eyebrow>
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
            Start free. Upgrade when your workflow demands more.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {whyUpgrade.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <IconComp className="h-4 w-4 shrink-0" />
                  <h4>{item.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{item.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 5. NO SEAT-BASED COMPLEXITY */}
      <Section className="py-6! md:py-10! border-t border-border/60">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-0.5 text-xs font-bold text-accent">
            <Building2 className="h-3.5 w-3.5" /> No Seat-Based Complexity
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
            Pay for the outbound infrastructure you need — not unnecessary complexity.
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Skout AI is designed to let individuals start free and let growing teams upgrade based on prospecting, enrichment, automation, and infrastructure requirements.
          </p>
        </div>
      </Section>

      {/* 6. TRUST & SECURITY */}
      <Section className="py-8! md:py-12! border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <Eyebrow>Security & Compliance</Eyebrow>
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
            Built with privacy and security in mind.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {trustBlocks.map((tb, i) => {
            const Icon = tb.icon;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-3.5 space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-accent font-bold text-xs">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <h4>{tb.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{tb.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 7. FAQ SECTION */}
      <Section className="py-8! md:py-12! border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
            Everything you need to know
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-colors overflow-hidden ${
                  isOpen ? "border-accent/40 bg-card" : "border-border bg-card/70"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-display font-semibold text-xs sm:text-sm text-foreground hover:text-accent transition-colors"
                >
                  <span className="pr-3">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 8. LEGAL FOOTER */}
      <Section className="py-6! border-t border-border/60 bg-card/30">
        <div className="max-w-3xl mx-auto space-y-3 text-center">
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-normal">
            Pricing and feature availability may vary by plan, usage, region, integrations, and applicable service terms. Skout AI does not guarantee specific business outcomes. Use of Skout AI is subject to our Terms of Service, Privacy Policy, and Acceptable Use Policy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-accent">
            <Link href="/terms" className="hover:underline flex items-center gap-1">
              <span>Terms of Service</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <span className="text-border">•</span>
            <Link href="/privacy-policy" className="hover:underline flex items-center gap-1">
              <span>Privacy Policy</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <span className="text-border">•</span>
            <Link href="/trust" className="hover:underline flex items-center gap-1">
              <span>Trust & Security</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
