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
  Database,
  RefreshCw,
  Sliders,
  Bot,
  Mail,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Section, Eyebrow } from "@/components/site/Section";
import { WORKSPACE_URL } from "@/lib/constants";

interface Props {
  content: Record<string, unknown>;
}

export default function PricingClient({ content }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = [
    {
      id: "free",
      name: "FREE",
      price: "$0",
      period: "/ month",
      popular: false,
      tagline: "Get started with outbound.",
      description:
        "For founders and individuals who want to discover Skout AI and build their first outbound workflows.",
      subtext: "No credit card required.",
      ctaText: "Start Free →",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-border/80 bg-card/70 hover:border-accent/40",
      badgeStyle: "bg-muted text-muted-foreground",
      includes: [
        "Prospect search",
        "Basic company information",
        "Basic contact information",
        "Limited contact enrichment",
        "Email verification",
        "1,000 emails/month",
        "Manual sequence builder",
        "Manual email sending",
        "Basic CRM",
        "Contact management",
        "Company management",
        "CSV import",
        "CSV export",
        "Basic email tracking",
        "Basic tasks",
        "Basic inbox",
        "Limited AI assistance",
        "Basic personalization",
        "Suppression and unsubscribe management",
        "Standard integrations",
      ],
      limits: [
        "Limited enrichment",
        "Limited sending volume",
        "Manual sequences",
        "Limited connected mailboxes",
        "No advanced automation",
        "No multi-channel automation",
        "No advanced AI workflows",
        "No API access",
        "No advanced analytics",
      ],
    },
    {
      id: "starter",
      name: "STARTER",
      price: "$54",
      period: "/ month",
      popular: false,
      tagline: "Automate your outbound.",
      description:
        "For founders, consultants, agencies, SDRs, and small sales teams ready to move beyond manual outreach.",
      subtext: "Everything in Free, plus:",
      ctaText: "Start Starter →",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-indigo-500/40 bg-card/85 hover:border-indigo-500/80 shadow-md",
      badgeStyle: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
      includes: [
        "5,000 enrichment credits/month",
        "Multiple connected mailboxes",
        "Automated email sequences",
        "Multi-step sequences",
        "Automated follow-ups",
        "Personalization variables",
        "AI-assisted personalization",
        "Automated prospect enrichment",
        "Smart lists",
        "Advanced prospect filters",
        "CRM automation",
        "Pipeline management",
        "Reply detection",
        "Unified inbox",
        "Email tracking",
        "Basic deliverability monitoring",
        "DNS checks",
        "Suppression management",
        "Basic outbound analytics",
        "Standard integrations",
        "Priority email support",
      ],
      limits: [],
    },
    {
      id: "scale",
      name: "SCALE",
      price: "$79",
      period: "/ month",
      popular: true,
      badge: "★ MOST POPULAR",
      tagline: "Build a serious outbound engine.",
      description:
        "For growing sales teams that need more automation, intelligence, and scale.",
      subtext: "Everything in Starter, plus:",
      ctaText: "Start Scale →",
      ctaHref: WORKSPACE_URL,
      accentBorder: "border-accent bg-gradient-to-b from-indigo-950/40 via-card to-card shadow-2xl shadow-indigo-500/20 scale-[1.02] lg:scale-[1.04] z-10",
      badgeStyle: "bg-gradient-to-r from-accent via-indigo-500 to-purple-500 text-white font-bold shadow-lg",
      includes: [
        "15,000 enrichment credits/month",
        "Increased sending capacity",
        "More connected mailboxes",
        "Mailbox rotation",
        "Automated prospect ingestion",
        "Advanced sequence automation",
        "Multi-channel workflows",
        "Email + LinkedIn + call tasks",
        "Advanced personalization",
        "AI-powered prospect research",
        "AI-assisted sequence creation",
        "AI outbound review",
        "Advanced CRM",
        "Two-way CRM synchronization",
        "HubSpot integration",
        "Advanced pipeline management",
        "Advanced sales analytics",
        "Revenue analytics",
        "Advanced deliverability monitoring",
        "Automated DNS auditing",
        "Warm-up capabilities",
        "Advanced suppression controls",
        "Chrome extension",
        "Priority support",
      ],
      limits: [],
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      price: "Custom",
      period: "",
      popular: false,
      badge: "ORGANIZATION SCALE",
      tagline: "Your sales infrastructure, built around your organization.",
      description:
        "For larger teams that require higher volumes, custom workflows, advanced controls, integrations, security requirements, and dedicated support.",
      subtext:
        "Pricing is based on your team size, usage, data requirements, integrations, and operational requirements. Everything in Scale, plus:",
      ctaText: "Talk to Sales →",
      ctaHref: "/contact",
      accentBorder: "border-purple-500/40 bg-gradient-to-b from-purple-950/20 via-card to-card hover:border-purple-500/80 shadow-md",
      badgeStyle: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
      includes: [
        "Custom enrichment volumes",
        "Custom sending requirements",
        "Custom mailbox limits",
        "Multiple teams",
        "Multiple workspaces",
        "Advanced user permissions",
        "Role-based access controls",
        "Custom CRM field mapping",
        "Advanced CRM integrations",
        "API access",
        "Webhooks",
        "Custom workflow automation",
        "Advanced reporting",
        "Custom data workflows",
        "Custom retention requirements",
        "Enterprise onboarding",
        "Dedicated customer success",
        "Priority support",
        "Custom SLA options",
        "Security documentation",
        "Data Processing Agreement",
        "Custom data-processing requirements",
        "Enterprise procurement support",
        "Volume-based pricing",
        "Custom billing",
      ],
      limits: [],
    },
  ];

  const quickCards = [
    {
      title: "Free",
      price: "$0",
      icon: Zap,
      accent: "border-blue-500/30 bg-card/60",
      subtitle: "Find prospects. Enrich contacts. Manage your CRM. Send your first 1,000 emails.",
      bestFor: "Best for: Getting started",
      cta: "Start Free",
      href: WORKSPACE_URL,
    },
    {
      title: "Starter",
      price: "$54/mo",
      icon: Mail,
      accent: "border-indigo-500/30 bg-card/60",
      subtitle: "Automate your email outbound. Build sequences. Personalize outreach. Manage your pipeline.",
      bestFor: "Best for: Founders & small teams",
      cta: "Start Starter",
      href: WORKSPACE_URL,
    },
    {
      title: "Scale",
      price: "$79/mo",
      icon: Sparkles,
      highlight: true,
      accent: "border-accent bg-accent/10 shadow-lg shadow-indigo-500/15",
      subtitle: "Automate serious outbound. Add multi-channel workflows. Use AI prospect intelligence. Scale your sales operation.",
      bestFor: "Best for: Growing sales teams",
      cta: "Start Scale",
      href: WORKSPACE_URL,
    },
    {
      title: "Enterprise",
      price: "Custom",
      icon: Building2,
      accent: "border-purple-500/30 bg-card/60",
      subtitle: "Custom infrastructure. Advanced permissions. Custom integrations. Dedicated support.",
      bestFor: "Best for: Larger organizations",
      cta: "Talk to Sales",
      href: "/contact",
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
      category: "Prospecting & Data Sourcing",
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
      category: "Outbound Sequences & Multi-Channel",
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
      category: "CRM & Pipeline Management",
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
      category: "AI Sales Intelligence",
      rows: [
        { feature: "AI Assistance", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "AI Personalization", free: "Limited", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
        { feature: "AI Prospect Research", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "AI Sequence Creation", free: "—", starter: "Basic", scale: "✓", enterprise: "✓" },
        { feature: "AI Outbound Review", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
      ],
    },
    {
      category: "Infrastructure & Deliverability",
      rows: [
        { feature: "Connected Mailboxes", free: "Limited", starter: "Multiple", scale: "More", enterprise: "Custom" },
        { feature: "Mailbox Rotation", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "Deliverability Monitoring", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
        { feature: "DNS Checks", free: "—", starter: "✓", scale: "Automated", enterprise: "Advanced" },
        { feature: "Warm-up Capabilities", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "Suppression Management", free: "✓", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
      ],
    },
    {
      category: "Analytics & Enterprise Controls",
      rows: [
        { feature: "Analytics", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Custom" },
        { feature: "Revenue Analytics", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
        { feature: "API", free: "—", starter: "—", scale: "Limited/optional", enterprise: "✓" },
        { feature: "Webhooks", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Advanced Permissions", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Multiple Workspaces", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Custom Workflows", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "Custom Integrations", free: "—", starter: "—", scale: "—", enterprise: "✓" },
        { feature: "DPA", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
        { feature: "Security Documentation", free: "Standard", starter: "Standard", scale: "Standard", enterprise: "Advanced" },
        { feature: "Support", free: "Standard", starter: "Priority", scale: "Priority", enterprise: "Dedicated" },
        { feature: "SLA", free: "—", starter: "—", scale: "—", enterprise: "Custom" },
      ],
    },
  ];

  const whyUpgrade = [
    {
      title: "From manual → automated",
      description:
        "Build sequences that automatically follow up with prospects instead of manually managing every interaction.",
      icon: RefreshCw,
      badge: "Automation",
    },
    {
      title: "From data → intelligence",
      description:
        "Go beyond basic contact information with enrichment, prospect research, personalization, and AI-assisted workflows.",
      icon: Sparkles,
      badge: "AI & Data",
    },
    {
      title: "From one channel → multiple channels",
      description:
        "Bring email, LinkedIn, tasks, and other outbound activities into a single workflow.",
      icon: Layers,
      badge: "Multi-Channel",
    },
    {
      title: "From individual → team",
      description:
        "Give your sales team the CRM, automation, analytics, permissions, and collaboration tools needed to operate at scale.",
      icon: Users,
      badge: "Scale & Team",
    },
  ];

  const trustBlocks = [
    {
      title: "Privacy-first data handling",
      desc: "We don't sell customer data.",
      icon: Shield,
    },
    {
      title: "Encrypted transmission",
      desc: "Data transmitted through the platform is protected using encrypted transport protocols.",
      icon: Lock,
    },
    {
      title: "Access controls",
      desc: "Production access is restricted to authorized personnel with a legitimate operational need.",
      icon: Key,
    },
    {
      title: "Responsible AI",
      desc: "Customer data isn't used to train generalized AI models for other customers unless expressly agreed.",
      icon: Sparkles,
    },
    {
      title: "International privacy support",
      desc: "Our agreements and processes are designed to support applicable international data-protection requirements.",
      icon: Globe,
    },
    {
      title: "Incident response",
      desc: "We maintain procedures for investigating and responding to security incidents.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: "Is Skout AI really free?",
      a: "Yes. The Free plan is designed to let you use the core Skout AI workflow without paying. It includes prospecting, basic enrichment, CRM functionality, manual sequences, and up to 1,000 emails per month, subject to our applicable usage and acceptable-use limits.",
    },
    {
      q: "Do I need a credit card to start?",
      a: "No. You can start with the Free plan without providing a payment method.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes. You can upgrade from Free to Starter or Scale as your outbound requirements grow.",
    },
    {
      q: "What is the difference between Starter and Scale?",
      a: "Starter is designed primarily for automated email outbound. Scale adds more advanced automation, higher usage, multi-channel workflows, AI prospect intelligence, advanced CRM functionality, deliverability capabilities, and analytics.",
    },
    {
      q: "Can I use my own email accounts?",
      a: "Yes, where supported. Skout AI may allow you to connect supported email accounts or mailboxes for outbound communication. You are responsible for ensuring that you have the necessary authorization to connect and use those accounts and that your communications comply with applicable laws and third-party provider requirements.",
    },
    {
      q: "Does Skout AI guarantee email delivery?",
      a: "No. Email delivery can depend on recipient systems, sender reputation, mailbox configuration, domain configuration, spam filtering, third-party providers, recipient behavior, and many other factors outside Skout AI's control. Skout AI provides tools intended to support responsible sending and deliverability, but does not guarantee delivery, inbox placement, open rates, replies, meetings, revenue, or other business outcomes.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes. Paid subscriptions can be cancelled using the cancellation method made available through your account or by contacting Skout AI support. Your subscription will generally remain active until the end of the applicable billing period unless otherwise required by law or stated in your applicable agreement.",
    },
    {
      q: "Does Skout AI sell my data?",
      a: "No. Skout AI does not sell customer data. Your use of the platform and the handling of personal information are governed by the Skout AI Privacy Policy and, where applicable, a Data Processing Agreement.",
    },
    {
      q: "Does Skout AI use customer data to train AI models?",
      a: "Skout AI does not use customer data to train generalized AI or machine-learning models for the benefit of other customers unless expressly agreed otherwise in writing. Some AI features may use authorized third-party AI providers to process inputs solely for providing the requested functionality.",
    },
    {
      q: "Is Skout AI GDPR compliant?",
      a: "Skout AI is designed to support customers operating under applicable privacy and data-protection requirements. Depending on the customer's location and use case, this may include GDPR, UK GDPR, CCPA/CPRA, CASL, Australia's Privacy Act and Australian Privacy Principles, New Zealand's Privacy Act, China's applicable data-protection and cybersecurity requirements, and other applicable laws. However, Skout AI does not provide legal or compliance advice, and customers remain responsible for determining the legal requirements applicable to their own use of the platform.",
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
      {/* 1. HERO SECTION WITH CLEAN STRUCTURAL LAYOUT */}
      <div className="relative border-b border-border/60 bg-background">
        <Section className="py-12! md:py-20! text-center relative z-10">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>SKOUT AI PRICING</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
              Start free. Scale when your outbound <span className="text-accent">grows.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-muted-foreground">
              Everything you need to find prospects, enrich contacts, organize your pipeline, and start outbound — with more automation, intelligence, and scale as your team grows. No long-term commitment. Upgrade when you need more.
            </p>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={WORKSPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] hover:bg-accent/90"
              >
                <span>Start Free — $0</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#feature-comparison"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted hover:border-accent/40"
              >
                <span>Compare Plans ↓</span>
              </a>
            </div>

            {/* SUBTEXT PILLS */}
            <div className="pt-2 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No credit card required
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Upgrade anytime
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Cancel anytime
              </span>
            </div>

            {/* MONTHLY BILLING NOTICE */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/90">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Monthly billing — Transparent infrastructure pricing</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. PRICING CARDS SECTION */}
      <Section className="py-12! md:py-16! relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${plan.accentBorder}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-foreground shadow-lg flex items-center gap-1.5">
                  <Star className="h-3 w-3 fill-current text-amber-300" /> {plan.badge}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                      {plan.name}
                    </h3>
                    {!plan.popular && plan.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${plan.badgeStyle}`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-accent mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 border-b border-border/60 pb-4">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-semibold text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  {plan.description}
                </p>

                <p className="text-[11px] font-bold text-foreground/90 italic pt-1">
                  {plan.subtext}
                </p>

                {/* INCLUDES LIST */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold text-accent uppercase tracking-wider">Features Included</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {plan.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-snug">
                        <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LIMITS LIST FOR FREE PLAN */}
                {plan.limits.length > 0 && (
                  <div className="pt-3 border-t border-border/50 space-y-2">
                    <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Limits</p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground/80">
                      {plan.limits.map((lim, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-snug">
                          <X className="h-3.5 w-3.5 text-rose-400/80 mt-0.5 shrink-0" />
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-extrabold transition-all shadow-sm ${
                    plan.popular
                      ? "bg-accent text-accent-foreground shadow-accent/20 hover:scale-[1.02] hover:bg-accent/90"
                      : "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. QUICK SUMMARY VISITOR CARDS */}
      <Section className="py-10! md:py-14! border-t border-border/40 bg-card/20">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <Eyebrow>Quick Summary</Eyebrow>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Simple plan comparison at a glance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((qc, i) => {
            const IconComponent = qc.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-5 space-y-4 flex flex-col justify-between transition-all ${qc.accent}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-display font-bold text-base text-foreground">{qc.title}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-accent">{qc.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{qc.subtitle}</p>
                </div>
                <div className="space-y-3 pt-3 border-t border-border/40">
                  <span className="block text-[11px] font-bold text-foreground/90">
                    {qc.bestFor}
                  </span>
                  <a
                    href={qc.href}
                    target={qc.href.startsWith("http") ? "_blank" : undefined}
                    rel={qc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-center gap-1.5 w-full text-center rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:border-accent hover:text-accent transition-colors shadow-sm"
                  >
                    <span>{qc.cta}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. DETAILED FEATURE COMPARISON MATRIX */}
      <section id="feature-comparison" className="scroll-mt-24 border-t border-border/60">
        <Section className="py-12! md:py-16!">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <Eyebrow>Feature Matrix</Eyebrow>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Everything you need to build and scale outbound.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Compare features across Free, Starter, Scale, and Enterprise plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-16 z-20 bg-card border-b border-border">
                <tr className="font-display font-bold text-foreground">
                  <th className="p-4 sm:p-5 min-w-[220px]">Feature</th>
                  <th className="p-4 sm:p-5 text-center min-w-[100px]">Free ($0)</th>
                  <th className="p-4 sm:p-5 text-center min-w-[110px]">Starter ($54)</th>
                  <th className="p-4 sm:p-5 text-center min-w-[120px] text-accent bg-accent/10 border-x border-accent/20">
                    Scale ⭐ ($79)
                  </th>
                  <th className="p-4 sm:p-5 text-center min-w-[120px]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {comparisonCategories.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    {/* CATEGORY HEADER ROW */}
                    <tr className="bg-muted/70 border-y border-border">
                      <td
                        colSpan={5}
                        className="py-3 px-4 sm:px-5 font-display font-extrabold text-xs text-accent uppercase tracking-wider flex items-center gap-2"
                      >
                        <Sliders className="h-3.5 w-3.5" />
                        <span>{cat.category}</span>
                      </td>
                    </tr>
                    {cat.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3.5 sm:p-4 font-semibold text-foreground/90 pl-6 sm:pl-8">
                          {row.feature}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center">{renderTableCell(row.free)}</td>
                        <td className="p-3.5 sm:p-4 text-center">{renderTableCell(row.starter)}</td>
                        <td className="p-3.5 sm:p-4 text-center bg-accent/5 border-x border-accent/15">
                          {renderTableCell(row.scale, true)}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center">{renderTableCell(row.enterprise)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </section>

      {/* 5. WHY UPGRADE? SECTION */}
      <Section className="py-12! md:py-16! border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Why Upgrade?</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Start free. Upgrade when your workflow demands more.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUpgrade.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-md hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent uppercase tracking-wider border border-accent/20">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-12">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 6. NO SEAT-BASED COMPLEXITY SECTION */}
      <Section className="py-10! md:py-14! border-t border-border/60">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-10 shadow-xl text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-accent">
            <Building2 className="h-3.5 w-3.5" /> No Seat-Based Complexity
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Pay for the outbound infrastructure you need — not unnecessary complexity.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
            Skout AI is designed to let individuals start free and let growing teams upgrade based on the amount of prospecting, enrichment, automation, and infrastructure they actually need. For Enterprise customers, pricing can be customized around usage, team structure, integrations, and operational requirements.
          </p>
        </div>
      </Section>

      {/* 7. TRUST & SECURITY SECTION (directly above FAQ) */}
      <Section className="py-12! md:py-16! border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Security & Compliance</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Built with privacy and security in mind.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Skout AI uses administrative, technical, and organizational safeguards designed to protect customer information and maintain the security and reliability of the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustBlocks.map((tb, i) => {
            const Icon = tb.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-sm hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 text-accent font-bold text-sm">
                  <div className="p-1.5 rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  <h4>{tb.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-1">{tb.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 8. FAQ SECTION */}
      <Section className="py-12! md:py-16! border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Everything you need to know
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen ? "border-accent/50 bg-card" : "border-border bg-card/70"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display font-semibold text-sm sm:text-base text-foreground hover:text-accent transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 9. PRICING-PAGE LEGAL FOOTER */}
      <Section className="py-8! border-t border-border/60 bg-card/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed text-left sm:text-center font-normal">
            Pricing and feature availability may vary by plan, usage, region, integrations, and applicable service terms. Certain features may be subject to usage limits, fair-use requirements, third-party provider restrictions, or additional terms. Skout AI does not guarantee specific business outcomes, including email delivery, inbox placement, open rates, reply rates, meetings, leads, pipeline, revenue, or return on investment. Use of Skout AI is subject to our Terms of Service, Privacy Policy, and Acceptable Use Policy.
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
