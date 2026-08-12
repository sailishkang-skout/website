"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ArrowRight, Zap, ShieldCheck, Sparkles, HelpCircle, ChevronDown, Bot, Building2 } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";

interface Props {
  content: Record<string, unknown>;
}

export default function PricingClient({ content }: Props) {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [prospectVolume, setProspectVolume] = useState(5000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tiers = [
    {
      name: "Starter",
      desc: "For solo SDRs and early founders starting outbound prospecting.",
      monthlyPrice: "$49",
      annualPrice: "$39",
      per: "/month",
      highlight: false,
      cta: "Start Free Trial",
      ctaHref: "/contact",
      badge: null,
      features: [
        "1,000 Verified Contact Enrichments / mo",
        "2 Connected Sender Mailboxes",
        "OpenSearch Prospect Sourcing Matrix",
        "Multi-Step Automated Email Sequences",
        "Basic Inbox & Reply Handling",
        "Email & Chat Support",
      ],
    },
    {
      name: "Growth",
      desc: "For growing outbound teams scaling lead generation & pipeline.",
      monthlyPrice: "$99",
      annualPrice: "$79",
      per: "/month",
      highlight: false,
      cta: "Get Started",
      ctaHref: "/contact",
      badge: null,
      features: [
        "5,000 Verified Contact Enrichments / mo",
        "5 Connected Sender Mailboxes",
        "Automated Smart Lists & Auto-Ingest",
        "Multi-Channel Sequences (Email, Calls, LinkedIn)",
        "Automated Peer Inbox Warmup & DNS Audit",
        "Dexter AI Copilot (Standard Model)",
      ],
    },
    {
      name: "Scale",
      desc: "Our most popular plan for high-velocity revenue teams.",
      monthlyPrice: "$199",
      annualPrice: "$159",
      per: "/month",
      highlight: true,
      cta: "Start Scale Plan",
      ctaHref: "/contact",
      badge: "MOST POPULAR",
      features: [
        "15,000 Verified Contact Enrichments / mo",
        "15 Connected Sender Mailboxes with Rotation",
        "Chrome Extension for LinkedIn 1-Click Capture",
        "Native GTM CRM & 2-Way HubSpot Sync",
        "Visual Kanban Deal Pipeline & Revenue Forecast",
        "AI Review Pre-Flight Copy QA Scanner",
        "Dexter AI Copilot (BYOK Model Support)",
      ],
    },
    {
      name: "Enterprise",
      desc: "For enterprise sales organizations requiring custom scale & SLAs.",
      monthlyPrice: "$399",
      annualPrice: "$319",
      per: "/month",
      highlight: false,
      cta: "Contact Sales",
      ctaHref: "/contact",
      badge: "CUSTOM SCALE",
      features: [
        "Unlimited Verified Enrichments & Export",
        "Unlimited Connected Sender Mailboxes",
        "Dedicated Domain IP & Private Warmup Pool",
        "Custom API Access & Webhook Workflows",
        "BYOK (Bring Your Own Key) for OpenAI & Claude",
        "Dedicated Account Manager & Priority 24/7 SLA",
      ],
    },
  ];

  const comparisonMatrix = [
    { feature: "Verified Contact Credits / mo", starter: "1,000", growth: "5,000", scale: "15,000", enterprise: "Custom / Unlimited" },
    { feature: "Connected Sender Mailboxes", starter: "2", growth: "5", scale: "15 (Auto Rotation)", enterprise: "Unlimited" },
    { feature: "Prospect Search & Smart Lists", starter: "Basic", growth: "Full OpenSearch", scale: "Automated Triggers", enterprise: "Unlimited Workspace" },
    { feature: "Chrome Extension (LinkedIn)", starter: "—", growth: "—", scale: "Full Sidepanel Capture", enterprise: "Bulk Search Extraction" },
    { feature: "Waterfall Email & Direct Dials", starter: "Standard", growth: "Multi-Provider", scale: "Priority Waterfall", enterprise: "Dedicated Provider Mesh" },
    { feature: "Sequence Outreach Channels", starter: "Email Only", growth: "Email + Tasks", scale: "Email + Call + LinkedIn", enterprise: "Multi-Channel Custom" },
    { feature: "Deliverability Warmup & DNS Audit", starter: "—", growth: "Automated Warmup", scale: "Full 24/7 DNS Audit", enterprise: "Dedicated IP Pool" },
    { feature: "CRM & HubSpot 2-Way Sync", starter: "Basic Record", growth: "Basic Sync", scale: "Native 2-Way Sync", enterprise: "Custom Field Mapping" },
    { feature: "Dexter AI Sales Copilot", starter: "—", growth: "Standard AI", scale: "BYOK Models (GPT-4o/Claude)", enterprise: "Custom Fine-tuned LLMs" },
    { feature: "Support SLA", starter: "Email Support", growth: "Priority Email", scale: "Live Chat & Email", enterprise: "Dedicated CSM & 24/7 SLA" },
  ];

  const faqs = [
    {
      question: "What counts as a verified enrichment credit?",
      answer: "A credit is consumed only when Skout AI successfully finds and verifies a valid work email address or direct phone number. Unsuccessful searches do not consume credits.",
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes! You can upgrade or adjust your subscription tier anytime from Workspace Settings. Prorated credits will be applied immediately.",
    },
    {
      question: "What is BYOK (Bring Your Own Key) for Dexter AI?",
      answer: "BYOK allows Scale and Enterprise customers to use their own OpenAI, Anthropic, or OpenRouter API keys for Dexter AI, ensuring full model privacy and cost control.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer: "Yes, all annual plans come with a 14-day risk-free guarantee. If you're not satisfied, contact our support team for a full refund.",
    },
  ];

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-hidden">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
              <Zap className="h-3.5 w-3.5" />
              <span>TRANSPARENT VALUE-BASED PRICING</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-5xl text-foreground font-semibold">
              Pay for pipeline results,{" "}
              <br />
              <GradientText>not per-seat limits.</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              All plans include complete access to prospecting, enrichment, sequences, and CRM. Scale your outbound engine without seat penalties.
            </p>

            {/* BILLING TOGGLE */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-semibold ${!annualBilling ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly Billing
              </span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className="relative h-6 w-12 rounded-full bg-card border border-border p-1 transition-colors"
                aria-label="Toggle Annual Billing"
              >
                <div
                  className={`h-4 w-4 rounded-full bg-accent transition-transform ${
                    annualBilling ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold ${annualBilling ? "text-foreground" : "text-muted-foreground"}`}>
                Annual Billing
              </span>
              <span className="rounded-full bg-accent/15 border border-accent/30 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                Save 20%
              </span>
            </div>
          </div>
        </Section>
      </div>

      {/* PRICING TIER CARDS GRID */}
      <Section className="py-8! md:py-12!">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col overflow-hidden rounded-3xl border ${
                tier.highlight ? "border-accent shadow-2xl shadow-accent/10" : "border-border"
              } p-5 md:p-6 transition-all hover:-translate-y-1`}
              style={{ background: "var(--gradient-card)" }}
            >
              {tier.badge && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl bg-accent px-3 py-0.5 text-[10px] font-bold text-background uppercase tracking-wider">
                  {tier.badge}
                </div>
              )}

              <div className={tier.badge ? "pt-3" : ""}>
                <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tier.desc}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {annualBilling ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-xs text-muted-foreground">{tier.per}</span>
                </div>
                {annualBilling && (
                  <span className="text-[10px] text-accent font-medium">Billed annually (${parseInt(tier.annualPrice.slice(1)) * 12}/yr)</span>
                )}
              </div>

              <Link
                href={tier.ctaHref}
                className={`mt-6 inline-flex h-10 items-center justify-center rounded-full px-5 text-xs font-semibold transition ${
                  tier.highlight
                    ? "bg-foreground text-background hover:opacity-90 shadow-md"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {tier.cta}
              </Link>

              <div className="mt-6 border-t border-border/60 pt-4 space-y-2.5 flex-1">
                <div className="text-[11px] font-bold text-foreground uppercase tracking-wider">Included Features</div>
                <ul className="space-y-2 text-xs">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* INTERACTIVE USAGE ESTIMATOR */}
      <Section className="py-8! md:py-12! bg-card/20! border-y border-border/60">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <Eyebrow>Estimator</Eyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Estimate Your Monthly Volume
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Drag the slider to calculate recommended tier based on target lead volume.
          </p>

          <div
            className="rounded-3xl border border-border p-6 shadow-xl"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-center justify-between text-xs font-bold text-foreground">
              <span>Target Lead Enrichments:</span>
              <span className="font-mono text-accent text-base">{prospectVolume.toLocaleString()} / mo</span>
            </div>

            <input
              type="range"
              min={1000}
              max={30000}
              step={1000}
              value={prospectVolume}
              onChange={(e) => setProspectVolume(Number(e.target.value))}
              className="mt-4 w-full accent-accent cursor-pointer"
            />

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-border/60 pt-4 gap-3 text-xs">
              <div className="text-left">
                <span className="text-muted-foreground">Recommended Plan: </span>
                <span className="font-bold text-foreground">
                  {prospectVolume <= 2000 ? "Starter Plan" : prospectVolume <= 8000 ? "Growth Plan" : prospectVolume <= 20000 ? "Scale Plan" : "Enterprise Plan"}
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background"
              >
                Choose Recommended Plan <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FEATURE COMPARISON MATRIX */}
      <Section className="py-8! md:py-12!">
        <div className="text-center space-y-2">
          <Eyebrow>Comparison</Eyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Detailed Feature Comparison
          </h2>
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card/60">
          <table className="w-full min-w-180 text-xs">
            <thead>
              <tr className="border-b border-border bg-card/80 text-left">
                <th className="p-4 font-bold text-foreground">Plan Feature</th>
                <th className="p-4 font-bold text-foreground">Starter</th>
                <th className="p-4 font-bold text-foreground">Growth</th>
                <th className="p-4 font-bold text-accent">Scale (Popular)</th>
                <th className="p-4 font-bold text-foreground">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/40 transition-colors">
                  <td className="p-4 font-medium text-foreground">{row.feature}</td>
                  <td className="p-4 text-muted-foreground">{row.starter}</td>
                  <td className="p-4 text-muted-foreground">{row.growth}</td>
                  <td className="p-4 font-semibold text-foreground">{row.scale}</td>
                  <td className="p-4 text-muted-foreground">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section className="py-8! md:py-12!">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
              Pricing & Subscription FAQs
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden transition-colors">
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-foreground"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border/60 p-4 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BOTTOM CTA BANNER */}
      <Section className="py-8! md:py-12!">
        <div
          className="rounded-3xl border border-border p-6 text-center md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <h2 className="font-display text-2xl font-semibold md:text-3xl text-foreground">
            Ready to accelerate your GTM pipeline with <GradientText>Skout AI</GradientText>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Start free or schedule a custom workspace demo with our revenue team.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/coming-soon"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
