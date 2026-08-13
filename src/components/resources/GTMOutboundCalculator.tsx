"use client";

import { useState } from "react";
import Link from "next/link";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  Calculator,
  Users,
  Target,
  DollarSign,
  Zap,
  Check,
  TrendingDown,
  ArrowRight,
  Sparkles,
  PieChart,
  Layers,
  BarChart3,
  ExternalLink,
} from "lucide-react";

export default function GTMOutboundCalculator() {
  // 1. Team & Goal State
  const [sdrsCount, setSdrsCount] = useState<number>(1);
  const [costPerSdr, setCostPerSdr] = useState<number>(10000);
  const [includeHeadcount, setIncludeHeadcount] = useState<boolean>(false);
  const [targetMeetings, setTargetMeetings] = useState<number>(20);

  // 2. Conversion Rate Assumptions
  const [emailsPerMeeting, setEmailsPerMeeting] = useState<number>(350); // ~0.28% meeting conversion rate
  const [verifiedEmailRate, setVerifiedEmailRate] = useState<number>(0.75); // 75% valid emails

  // 3. Provider Selection Rates ($ per unit)
  const sourcingProviders = [
    { id: "apollo", name: "Apollo.io", cost: 0.05 },
    { id: "peopledatalabs", name: "People Data Labs", cost: 0.28 },
    { id: "apify", name: "Apify Scraper", cost: 0.003 },
    { id: "crustdata", name: "CRUSTdata", cost: 0.03 },
    { id: "skout_search", name: "Skout AI OpenSearch (Included)", cost: 0.0 },
  ];

  const emailFindingProviders = [
    { id: "leadmagic", name: "LeadMagic", cost: 0.024 },
    { id: "icypeas", name: "Icypeas", cost: 0.019 },
    { id: "prospeo", name: "Prospeo", cost: 0.039 },
    { id: "findymail", name: "FindyMail", cost: 0.049 },
    { id: "hunter", name: "Hunter.io", cost: 0.068 },
    { id: "dropcontact", name: "Dropcontact", cost: 0.79 },
    { id: "snovio", name: "Snov.io", cost: 0.02 },
    { id: "skout_enrich", name: "Skout AI Waterfall (Included)", cost: 0.0 },
  ];

  const emailVerificationProviders = [
    { id: "none", name: "None", cost: 0.0 },
    { id: "zerobounce", name: "ZeroBounce", cost: 0.01 },
    { id: "neverbounce", name: "NeverBounce", cost: 0.008 },
    { id: "millionverifier", name: "MillionVerifier", cost: 0.004 },
    { id: "skout_verify", name: "Skout AI 24/7 Verification (Included)", cost: 0.0 },
  ];

  const sendingProviders = [
    { id: "instantly", name: "Instantly", cost: 47 },
    { id: "smartlead", name: "Smartlead", cost: 39 },
    { id: "lemlist", name: "Lemlist", cost: 59 },
    { id: "skout_sending", name: "Skout AI Unified Platform", cost: 0 },
  ];

  const [selectedSourcing, setSelectedSourcing] = useState(sourcingProviders[0]);
  const [selectedEmailFind, setSelectedEmailFind] = useState(emailFindingProviders[0]);
  const [selectedVerify, setSelectedVerify] = useState(emailVerificationProviders[1]);
  const [selectedSending, setSelectedSending] = useState(sendingProviders[0]);

  // Calculations
  const totalEmailsNeeded = targetMeetings * emailsPerMeeting;
  const rawContactsNeeded = Math.ceil(totalEmailsNeeded / verifiedEmailRate);

  const sourcingCost = rawContactsNeeded * selectedSourcing.cost;
  const emailFindCost = rawContactsNeeded * selectedEmailFind.cost;
  const verifyCost = rawContactsNeeded * selectedVerify.cost;
  const sendingCost = selectedSending.cost;
  const headcountCost = includeHeadcount ? sdrsCount * costPerSdr : 0;

  const totalToolingCost = sourcingCost + emailFindCost + verifyCost + sendingCost;
  const totalMonthlyCost = totalToolingCost + headcountCost;
  const costPerMeeting = totalMonthlyCost / targetMeetings;

  // Skout AI Cost Comparison (Scale Plan $159/mo flat rate)
  const skoutMonthlyCost = 159 + (includeHeadcount ? headcountCost : 0);
  const skoutCostPerMeeting = skoutMonthlyCost / targetMeetings;
  const monthlySavings = totalToolingCost - 159;
  const savingsPercent = totalToolingCost > 0 ? Math.max(0, Math.round((monthlySavings / totalToolingCost) * 100)) : 0;

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-hidden">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
              <Calculator className="h-3.5 w-3.5 text-accent" />
              <span>GTM OUTBOUND ROI & COST CALCULATOR</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] break-words text-foreground font-semibold">
              GTM Outbound Cost Calculator{" "}
              <br />
              <GradientText>Estimate tooling & pipeline acquisition costs.</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Calculate contact sourcing, email finding, verification, and inbox infrastructure costs for your outbound strategy. See how much you save with Skout AI&apos;s unified GTM platform.
            </p>
          </div>
        </Section>
      </div>

      {/* CALCULATOR INTERACTIVE DASHBOARD */}
      <Section className="py-8! md:py-12!">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: INPUT CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. TEAM SIZE & HEADCOUNT */}
            <div className="rounded-3xl border border-border bg-card p-5 md:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Users className="h-4 w-4 text-accent" />
                <h2 className="text-base font-semibold text-foreground">1. Team Size & Headcount</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Number of SDRs</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={sdrsCount}
                    onChange={(e) => setSdrsCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Cost per SDR / Month ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={costPerSdr}
                    onChange={(e) => setCostPerSdr(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">Benchmark: $7,500–$13,000/mo per SDR</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inc-hc"
                  checked={includeHeadcount}
                  onChange={(e) => setIncludeHeadcount(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-accent cursor-pointer"
                />
                <label htmlFor="inc-hc" className="text-xs font-medium text-foreground cursor-pointer">
                  Include SDR headcount in total monthly cost calculation
                </label>
              </div>
            </div>

            {/* 2. CAMPAIGN GOAL & CONVERSION RATES */}
            <div className="rounded-3xl border border-border bg-card p-5 md:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Target className="h-4 w-4 text-accent" />
                <h2 className="text-base font-semibold text-foreground">2. Campaign Pipeline Goal</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Target Meetings / Month</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={targetMeetings}
                    onChange={(e) => setTargetMeetings(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Emails Sent Per Booked Meeting</label>
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    value={emailsPerMeeting}
                    onChange={(e) => setEmailsPerMeeting(Math.max(50, parseInt(e.target.value) || 350))}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">Industry avg: 300–400 emails per meeting</p>
                </div>
              </div>
            </div>

            {/* 3. STACK PROVIDER SELECTION */}
            <div className="rounded-3xl border border-border bg-card p-5 md:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Layers className="h-4 w-4 text-accent" />
                <h2 className="text-base font-semibold text-foreground">3. Outbound Stack Providers</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Contact Sourcing Provider</label>
                  <select
                    value={selectedSourcing.id}
                    onChange={(e) => setSelectedSourcing(sourcingProviders.find((p) => p.id === e.target.value)!)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {sourcingProviders.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.cost}/contact)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Finding Provider</label>
                  <select
                    value={selectedEmailFind.id}
                    onChange={(e) => setSelectedEmailFind(emailFindingProviders.find((p) => p.id === e.target.value)!)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {emailFindingProviders.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.cost}/email)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Verification Provider</label>
                  <select
                    value={selectedVerify.id}
                    onChange={(e) => setSelectedVerify(emailVerificationProviders.find((p) => p.id === e.target.value)!)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {emailVerificationProviders.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.cost}/check)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Outreach Sending Platform</label>
                  <select
                    value={selectedSending.id}
                    onChange={(e) => setSelectedSending(sendingProviders.find((p) => p.id === e.target.value)!)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {sendingProviders.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.cost}/mo)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CALCULATED RESULTS & SKOUT SAVINGS */}
          <div className="lg:col-span-5 space-y-6">
            {/* COST SUMMARY CARD */}
            <div
              className="rounded-3xl border border-border p-6 shadow-2xl space-y-5"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimated Monthly Cost</span>
                <span className="rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                  Fragmented Stack
                </span>
              </div>

              <div>
                <div className="font-display text-4xl font-bold text-foreground">
                  ${Math.round(totalMonthlyCost).toLocaleString()}
                  <span className="text-xs font-sans font-normal text-muted-foreground"> / month</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-accent flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" /> ${Math.round(costPerMeeting)} per Booked Meeting
                </div>
              </div>

              {/* COST BREAKDOWN MATRIX */}
              <div className="space-y-2 border-t border-border/60 pt-4 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Contacts Needed:</span>
                  <span className="font-bold text-foreground">{rawContactsNeeded.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Sourcing ({selectedSourcing.name}):</span>
                  <span className="font-semibold text-foreground">${Math.round(sourcingCost)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Email Finding ({selectedEmailFind.name}):</span>
                  <span className="font-semibold text-foreground">${Math.round(emailFindCost)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Email Verification ({selectedVerify.name}):</span>
                  <span className="font-semibold text-foreground">${Math.round(verifyCost)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Sending Tool ({selectedSending.name}):</span>
                  <span className="font-semibold text-foreground">${selectedSending.cost}</span>
                </div>
                {includeHeadcount && (
                  <div className="flex justify-between text-muted-foreground border-t border-border/40 pt-1">
                    <span>SDR Headcount ({sdrsCount} SDRs):</span>
                    <span className="font-semibold text-foreground">${headcountCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SKOUT AI UNIFIED SAVINGS COMPARISON CARD */}
            <div className="rounded-3xl border border-accent/40 bg-gradient-to-b from-accent/10 via-card to-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                  <Zap className="h-4 w-4 text-accent" /> With Skout AI Unified Workspace
                </div>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-background uppercase">
                  Save ~{savingsPercent}%
                </span>
              </div>

              <div>
                <div className="font-display text-3xl font-bold text-foreground">
                  ${Math.round(skoutMonthlyCost).toLocaleString()}
                  <span className="text-xs font-sans font-normal text-muted-foreground"> / month</span>
                </div>
                <div className="mt-1 text-xs text-accent font-semibold flex items-center gap-1">
                  <TrendingDown className="h-3.5 w-3.5" /> ${Math.round(skoutCostPerMeeting)} per Booked Meeting (Flat Rate)
                </div>
              </div>

              <div className="rounded-2xl bg-background/80 border border-border p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>Monthly Tooling Savings:</span>
                  <span className="text-accent text-sm font-mono">+${Math.round(monthlySavings).toLocaleString()} / mo</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Skout AI replaces Apollo + Hunter + ZeroBounce + Smartlead with one flat-rate workspace. Zero per-seat penalties.
                </p>
              </div>

              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs sm:text-sm font-bold text-background transition hover:opacity-90 shadow-lg"
              >
                Switch to Skout AI & Save <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
