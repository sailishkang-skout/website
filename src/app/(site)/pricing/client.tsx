"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building2,
  Lock,
  Layers,
  Users,
  TrendingUp,
  X,
  Star,
  Shield,
  Key,
  Globe,
  Database,
  RefreshCw,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { WORKSPACE_URL } from "@/lib/constants";

interface Props {
  content: Record<string, unknown>;
}

export default function PricingClient({ content }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"all" | "included" | "limits">("all");

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
      badge: "Most Popular",
      tagline: "Build a serious outbound engine.",
      description:
        "For growing sales teams that need more automation, intelligence, and scale.",
      subtext: "Everything in Starter, plus:",
      ctaText: "Start Scale →",
      ctaHref: WORKSPACE_URL,
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
      tagline: "Your sales infrastructure, built around your organization.",
      description:
        "For larger teams that require higher volumes, custom workflows, advanced controls, integrations, security requirements, and dedicated support.",
      subtext:
        "Pricing is based on your team size, usage, data requirements, integrations, and operational requirements. Everything in Scale, plus:",
      ctaText: "Talk to Sales →",
      ctaHref: "/contact",
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
      subtitle: "Find prospects. Enrich contacts. Manage your CRM. Send your first 1,000 emails.",
      bestFor: "Best for: Getting started",
      cta: "Start Free",
      href: WORKSPACE_URL,
    },
    {
      title: "Starter",
      price: "$54/mo",
      subtitle: "Automate your email outbound. Build sequences. Personalize outreach. Manage your pipeline.",
      bestFor: "Best for: Founders & small teams",
      cta: "Start Starter",
      href: WORKSPACE_URL,
    },
    {
      title: "Scale",
      price: "$79/mo",
      highlight: true,
      subtitle: "Automate serious outbound. Add multi-channel workflows. Use AI prospect intelligence. Scale your sales operation.",
      bestFor: "Best for: Growing sales teams",
      cta: "Start Scale",
      href: WORKSPACE_URL,
    },
    {
      title: "Enterprise",
      price: "Custom",
      subtitle: "Custom infrastructure. Advanced permissions. Custom integrations. Dedicated support.",
      bestFor: "Best for: Larger organizations",
      cta: "Talk to Sales",
      href: "/contact",
    },
  ];

  const comparisonRows = [
    { feature: "Pricing", free: "$0", starter: "$54/mo", scale: "$79/mo", enterprise: "Custom" },
    { feature: "Prospect Search", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Company Data", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Contact Data", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Contact Enrichment", free: "Limited", starter: "5K/mo", scale: "15K/mo", enterprise: "Custom" },
    { feature: "Email Verification", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Email Sending", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Emails / Month", free: "1,000", starter: "Higher limits", scale: "Higher limits", enterprise: "Custom" },
    { feature: "Manual Sequences", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Automated Sequences", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Multi-Step Sequences", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Automated Follow-ups", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Multi-Channel Outreach", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "LinkedIn Workflows", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "Call Tasks", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "CRM", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Pipeline Management", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Custom" },
    { feature: "CSV Import", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "CSV Export", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Smart Lists", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Automated Prospect Ingestion", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "Email Tracking", free: "✓", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Reply Detection", free: "—", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "Unified Inbox", free: "Basic", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "AI Assistance", free: "Limited", starter: "✓", scale: "✓", enterprise: "✓" },
    { feature: "AI Personalization", free: "Limited", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
    { feature: "AI Prospect Research", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "AI Sequence Creation", free: "—", starter: "Basic", scale: "✓", enterprise: "✓" },
    { feature: "AI Outbound Review", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "Connected Mailboxes", free: "Limited", starter: "Multiple", scale: "More", enterprise: "Custom" },
    { feature: "Mailbox Rotation", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "Deliverability Monitoring", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
    { feature: "DNS Checks", free: "—", starter: "✓", scale: "Automated", enterprise: "Advanced" },
    { feature: "Warm-up Capabilities", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "Suppression Management", free: "✓", starter: "✓", scale: "Advanced", enterprise: "Advanced" },
    { feature: "Analytics", free: "Basic", starter: "✓", scale: "Advanced", enterprise: "Custom" },
    { feature: "Revenue Analytics", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
    { feature: "HubSpot", free: "—", starter: "Standard", scale: "Two-way", enterprise: "Custom" },
    { feature: "Chrome Extension", free: "—", starter: "—", scale: "✓", enterprise: "✓" },
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
  ];

  const whyUpgrade = [
    {
      title: "From manual → automated",
      description:
        "Build sequences that automatically follow up with prospects instead of manually managing every interaction.",
      icon: RefreshCw,
    },
    {
      title: "From data → intelligence",
      description:
        "Go beyond basic contact information with enrichment, prospect research, personalization, and AI-assisted workflows.",
      icon: Sparkles,
    },
    {
      title: "From one channel → multiple channels",
      description:
        "Bring email, LinkedIn, tasks, and other outbound activities into a single workflow.",
      icon: Layers,
    },
    {
      title: "From individual → team",
      description:
        "Give your sales team the CRM, automation, analytics, permissions, and collaboration tools needed to operate at scale.",
      icon: Users,
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

  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* 1. HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-12! md:py-20! text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <Eyebrow>Pricing</Eyebrow>

            <h1 className="mx-auto max-w-3xl font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
              Start free. Scale when your outbound <GradientText>grows.</GradientText>
            </h1>

            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              Everything you need to find prospects, enrich contacts, organize your pipeline, and start outbound — with more automation, intelligence, and scale as your team grows. No long-term commitment. Upgrade when you need more.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WORKSPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:scale-105 hover:bg-accent/90"
              >
                Start Free — $0
              </a>
              <a
                href="#feature-comparison"
                className="w-full sm:w-auto rounded-xl border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-card hover:border-accent/40"
              >
                Compare Plans ↓
              </a>
            </div>

            <div className="pt-1 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-medium">
              <span>No credit card required</span>
              <span>•</span>
              <span>Upgrade anytime</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>

            <div className="pt-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Monthly billing — transparent, flexible pricing</span>
            </div>
          </div>
        </Section>
      </div>

      {/* 2. PRICING CARDS */}
      <Section className="py-12! md:py-16!">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                plan.popular
                  ? "border-accent/80 bg-gradient-to-b from-accent/10 via-card to-card shadow-2xl shadow-accent/15 scale-102 z-10"
                  : "border-border bg-card/70 hover:border-border/80 hover:bg-card shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent via-indigo-500 to-purple-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-md flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-wide text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-semibold text-accent mt-0.5">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 border-b border-border/60 pb-4">
                  <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs font-medium text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>

                <p className="text-[11px] font-semibold text-foreground/80 italic">
                  {plan.subtext}
                </p>

                {/* FEATURES LIST */}
                <ul className="space-y-2 pt-2 text-xs text-muted-foreground">
                  {plan.includes.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                {/* LIMITS LIST FOR FREE PLAN */}
                {plan.limits.length > 0 && (
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Limits</p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground/75">
                      {plan.limits.map((lim, idx) => (
                        <li key={idx} className="flex items-start gap-2">
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
                  className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-all shadow-md ${
                    plan.popular
                      ? "bg-accent text-accent-foreground shadow-accent/20 hover:scale-[1.02] hover:bg-accent/90"
                      : "bg-muted/80 text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. SIMPLE COMPARISON FOR VISITORS CARDS */}
      <Section className="py-8! md:py-12! border-t border-border/40">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <Eyebrow>Quick Summary</Eyebrow>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Simple plan comparison at a glance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((qc, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 space-y-3 flex flex-col justify-between transition-all ${
                qc.highlight
                  ? "border-accent bg-accent/10 shadow-lg"
                  : "border-border bg-card/50 hover:bg-card"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-foreground">{qc.title}</span>
                  <span className="font-mono text-sm font-bold text-accent">{qc.price}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{qc.subtitle}</p>
              </div>
              <div className="space-y-3 pt-2 border-t border-border/40">
                <span className="inline-block text-[11px] font-semibold text-foreground/80">
                  {qc.bestFor}
                </span>
                <a
                  href={qc.href}
                  target={qc.href.startsWith("http") ? "_blank" : undefined}
                  rel={qc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block w-full text-center rounded-lg border border-border bg-background py-2 text-xs font-bold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {qc.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. DETAILED FEATURE COMPARISON MATRIX */}
      <section id="feature-comparison" className="scroll-mt-24 border-t border-border/60">
        <Section className="py-12! md:py-16!">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <Eyebrow>Feature Comparison</Eyebrow>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Everything you need to build and scale outbound.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Compare features across Free, Starter, Scale, and Enterprise plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card/80 shadow-xl backdrop-blur-xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-muted/50 font-display font-bold text-foreground">
                  <th className="p-4 sm:p-5 min-w-[200px]">Feature</th>
                  <th className="p-4 sm:p-5 text-center min-w-[100px]">Free</th>
                  <th className="p-4 sm:p-5 text-center min-w-[110px]">Starter</th>
                  <th className="p-4 sm:p-5 text-center min-w-[110px] text-accent">Scale ⭐</th>
                  <th className="p-4 sm:p-5 text-center min-w-[120px]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-foreground">{row.feature}</td>
                    <td className="p-3.5 sm:p-4 text-center text-muted-foreground">{row.free}</td>
                    <td className="p-3.5 sm:p-4 text-center text-muted-foreground">{row.starter}</td>
                    <td className="p-3.5 sm:p-4 text-center font-bold text-accent bg-accent/5">{row.scale}</td>
                    <td className="p-3.5 sm:p-4 text-center text-muted-foreground font-semibold">{row.enterprise}</td>
                  </tr>
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
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Start free. Upgrade when your workflow demands more.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyUpgrade.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card/70 p-6 space-y-3 shadow-lg hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-accent/30 bg-accent/10 p-2.5 text-accent">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
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
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-card to-card p-6 sm:p-10 shadow-2xl text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
            <Building2 className="h-3.5 w-3.5" /> No Seat-Based Complexity
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Pay for the outbound infrastructure you need — not unnecessary complexity.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Skout AI is designed to let individuals start free and let growing teams upgrade based on the amount of prospecting, enrichment, automation, and infrastructure they actually need. For Enterprise customers, pricing can be customized around usage, team structure, integrations, and operational requirements.
          </p>
        </div>
      </Section>

      {/* 7. TRUST & SECURITY SECTION (directly above FAQ) */}
      <Section className="py-12! md:py-16! border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Security & Compliance</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
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
                className="rounded-2xl border border-border bg-card/60 p-5 space-y-2 shadow-md hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 text-accent font-bold text-sm">
                  <Icon className="h-4 w-4 shrink-0" />
                  <h4>{tb.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{tb.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 8. FAQ SECTION */}
      <Section className="py-12! md:py-16! border-t border-border/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Everything you need to know
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card/70 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display font-semibold text-sm sm:text-base text-foreground hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-accent shrink-0 transition-transform ${
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
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed text-left sm:text-center">
            Pricing and feature availability may vary by plan, usage, region, integrations, and applicable service terms. Certain features may be subject to usage limits, fair-use requirements, third-party provider restrictions, or additional terms. Skout AI does not guarantee specific business outcomes, including email delivery, inbox placement, open rates, reply rates, meetings, leads, pipeline, revenue, or return on investment. Use of Skout AI is subject to our Terms of Service, Privacy Policy, and Acceptable Use Policy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-accent">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/trust" className="hover:underline">
              Trust & Security
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
