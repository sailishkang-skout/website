import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Workflow,
  Kanban,
  Zap,
  Building2,
  Calendar,
  Key,
  HelpCircle,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { getPageContent } from "@/lib/content/get-content";
import {
  HeroWorkspaceVisual,
  PlatformTabbedShowcase,
  DexterInteractiveGrid,
  FaqAccordion,
} from "@/components/home/HomePageClient";
import { IntelligenceArchitectureSection } from "@/components/home/IntelligenceArchitectureSection";

export default async function HomePage() {
  const content = await getPageContent("home");

  const hero = (content.hero as Record<string, unknown>) ?? {};
  const trust = (content.trust as Record<string, unknown>) ?? {};
  const valueProp = (content.valueProp as Record<string, unknown>) ?? {};
  const discover = (content.discover as Record<string, unknown>) ?? {};
  const understand = (content.understand as Record<string, unknown>) ?? {};
  const engage = (content.engage as Record<string, unknown>) ?? {};
  const convert = (content.convert as Record<string, unknown>) ?? {};
  const icp = (content.icp as Record<string, unknown>) ?? {};
  const dexterDeepDive = (content.dexterDeepDive as Record<string, unknown>) ?? {};
  const outboundIntel = (content.outboundIntel as Record<string, unknown>) ?? {};
  const crmSection = (content.crmSection as Record<string, unknown>) ?? {};
  const integrations = (content.integrations as Record<string, unknown>) ?? {};
  const differentiation = (content.differentiation as Record<string, unknown>) ?? {};
  const pricingTeaser = (content.pricingTeaser as Record<string, unknown>) ?? {};
  const faqList = (content.faq as Array<{ question: string; answer: string }>) ?? [];
  const finalCta = (content.finalCta as Record<string, unknown>) ?? {};

  const heroPrimary = (hero.primaryCta as { text: string; href: string }) ?? {
    text: "Book a demo",
    href: "/contact",
  };
  const heroSecondary = (hero.secondaryCta as { text: string; href: string }) ?? {
    text: "Explore platform",
    href: "#scavenger-hunt",
  };

  return (
    <div className="flex flex-col gap-0">
      {/* 1. HERO SECTION & DEXTER INTRO */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-6! md:py-10!">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI-POWERED GTM PLATFORM · DEXTER 2.0 LIVE</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
                Find the right prospects. <br />
                <GradientText>Know why they matter.</GradientText>
                <br />
                Sell with context.
              </h1>

              <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {String(
                  hero.subheadline ??
                    "Skout AI brings prospecting, enrichment, outreach, CRM, and GTM intelligence into one workspace — so your team can spend less time moving data between tools and more time creating pipeline.",
                )}
              </p>

              {/* HERO CTAS - MOBILE RESPONSIVE */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <Link
                  href={heroPrimary.href}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background shadow-lg transition-transform hover:scale-[1.02]"
                >
                  {heroPrimary.text} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={heroSecondary.href}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold shadow-sm transition-colors hover:bg-muted"
                >
                  {heroSecondary.text}
                </Link>
              </div>

              <p className="text-[11px] font-medium text-muted-foreground">
                {String(
                  hero.supportingLine ??
                    "From first prospect to active opportunity — Skout keeps the context connected.",
                )}
              </p>

              {/* HERO DEXTER MESSAGE CARD */}
              <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-bold">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-foreground">Meet Dexter</div>
                    <div className="text-[10px] text-accent font-medium">
                      Your GTM intelligence layer.
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {String(
                    hero.dexterDescription ??
                      "Dexter helps your team turn prospect and account information into decisions — from who to target and what to know about them, to how to approach them and what to do next.",
                  )}
                </p>

                {/* EXAMPLE DEXTER INTERACTION */}
                <div className="mt-2.5 space-y-2 rounded-xl border border-border/70 bg-muted/40 p-3 text-[11px]">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 font-bold text-foreground">You:</span>
                    <span className="italic text-muted-foreground">
                      "
                      {String(
                        hero.dexterPrompt ??
                          "Find accounts that look like our best customers and identify the right people to contact.",
                      )}
                      "
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 border-t border-border/40 pt-2 text-foreground">
                    <span className="shrink-0 font-bold text-accent flex items-center gap-1">
                      <Bot className="h-3.5 w-3.5" /> Dexter:
                    </span>
                    <span className="leading-snug">
                      "
                      {String(
                        hero.dexterReply ??
                          "Here are the accounts that match your ICP. I've prioritized them based on the signals available in Skout and identified the contacts most relevant to your target roles.",
                      )}
                      "
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO VISUAL WORKSPACE */}
            <div className="lg:col-span-6">
              <HeroWorkspaceVisual />
            </div>
          </div>
        </Section>
      </div>

      {/* 2. TRUST / SOCIAL PROOF BANNER */}
      <div className="border-b border-border bg-card/70 py-3">
        <Section className="py-0.5!">
          <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:gap-3">
            <span className="font-bold text-xs text-foreground uppercase tracking-wider">
              {String(trust.headline ?? "Built for modern GTM teams")}
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="text-xs text-muted-foreground">
              {String(
                trust.subheadline ??
                  "One workspace for prospecting, intelligence, outreach, and pipeline execution.",
              )}
            </span>
          </div>
        </Section>
      </div>

      {/* 3. PRIMARY VALUE PROPOSITION ("SCAVENGER HUNT") */}
      <div id="scavenger-hunt" className="border-b border-border bg-background">
        <Section className="py-8! md:py-12!">
          <div className="max-w-3xl">
            <Eyebrow>{String(valueProp.eyebrow ?? "Primary Value Proposition")}</Eyebrow>
            <h2 className="font-display mt-1.5 text-3xl sm:text-4xl text-foreground">
              Your sales stack shouldn't feel like a <GradientText>scavenger hunt.</GradientText>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {String(
                valueProp.body ??
                  "Sales teams shouldn't have to discover an account in one platform, find contacts in another, enrich them somewhere else, write messaging with an AI tool, send from another system, and finally update the CRM by hand. Skout connects those workflows.",
              )}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-accent/40 transition-all">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent mb-2.5">
                <Workflow className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Less context switching
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Keep prospect intelligence, outreach, conversations, and pipeline activity
                connected.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-accent/40 transition-all">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent mb-2.5">
                <Bot className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">Better decisions</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Give your team more context before they decide who to contact and why.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-accent/40 transition-all">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent mb-2.5">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                One connected workflow
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Move from discovery to outreach to opportunity without constantly moving data
                between systems.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* 4. UNIFIED 4-STEP PLATFORM SHOWCASE */}
      <div className="border-b border-border bg-card/30">
        <Section className="py-8! md:py-12!">
          <PlatformTabbedShowcase
            discover={discover}
            understand={understand}
            engage={engage}
            convert={convert}
          />
        </Section>
      </div>

      {/* NEW: INTELLIGENCE ARCHITECTURE SECTION (PLACED RIGHT AFTER DISCOVER/UNDERSTAND/ENGAGE/CONVERT SHOWCASE) */}
      <IntelligenceArchitectureSection />

      {/* 5. DEXTER AI COMMAND CENTER SPOTLIGHT */}
      <div id="dexter" className="border-b border-border bg-background">
        <Section className="py-8! md:py-12!">
          <div className="max-w-3xl">
            <Eyebrow>{String(dexterDeepDive.eyebrow ?? "Meet Dexter")}</Eyebrow>
            <h2 className="font-display mt-1.5 text-3xl sm:text-4xl text-foreground">
              Your GTM <GradientText>intelligence layer.</GradientText>
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {String(
                dexterDeepDive.description ??
                  "Most AI sales tools start with a blank chat box. Dexter starts with your GTM workflow. Because Dexter operates inside Skout, it can help your team work with the prospect, account, targeting, outreach, and pipeline context already available in the platform.",
              )}
            </p>
          </div>

          <DexterInteractiveGrid
            prompts={
              (dexterDeepDive.prompts as Array<{
                category: string;
                prompt: string;
                answer: string;
              }>) ?? []
            }
          />

          <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4 text-center">
            <p className="font-display text-base sm:text-lg text-foreground font-bold">
              {String(
                dexterDeepDive.coreStatement ??
                  "Dexter doesn't replace your sales team. It gives your sales team better context to act on.",
              )}
            </p>
          </div>
        </Section>
      </div>

      {/* 6. SPLIT BANNER: ICP TARGETING & OUTBOUND INTELLIGENCE */}
      <div className="border-b border-border bg-card/40">
        <Section className="py-8! md:py-12!">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* LEFT: ICP TARGETING */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <Eyebrow>{String(icp.eyebrow ?? "Your ICP. Built into the workflow.")}</Eyebrow>
                <h3 className="font-display mt-2 text-2xl font-bold text-foreground">
                  Stop treating your ideal customer profile like a{" "}
                  <GradientText>slide deck.</GradientText>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {String(
                    icp.description ??
                      "Skout brings ICP configuration into the product so your targeting strategy can become part of the actual prospecting workflow.",
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-muted/60 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-foreground border-b border-border/50 pb-2">
                  <span>Active ICP Targeting Engine</span>
                  <span className="text-emerald-500 font-mono text-[10px]">Live Filter</span>
                </div>
                <div className="space-y-1 text-muted-foreground text-[11px]">
                  <div className="flex justify-between">
                    <span>Industry Fit:</span>
                    <span className="font-medium text-foreground">B2B SaaS / DevTools</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Company Size:</span>
                    <span className="font-medium text-foreground">50 - 250 Employees</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: OUTBOUND INTELLIGENCE */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <Eyebrow>Outbound Intelligence</Eyebrow>
                <h3 className="font-display mt-2 text-2xl font-bold text-foreground">
                  More automation isn't the goal. <GradientText>Better outbound is.</GradientText>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {String(
                    outboundIntel.description ??
                      "Automation can make a bad process faster. Skout is built to connect intelligence with execution — helping your team start with better targeting and context.",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-muted/60 p-3 border border-border/60">
                  <div className="font-mono text-[9px] font-bold text-accent">01 KNOW</div>
                  <div className="mt-1 font-semibold text-foreground text-[11px]">
                    Account Context
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-3 border border-border/60">
                  <div className="font-mono text-[9px] font-bold text-accent">02 DECIDE</div>
                  <div className="mt-1 font-semibold text-foreground text-[11px]">Target Fit</div>
                </div>
                <div className="rounded-xl bg-muted/60 p-3 border border-border/60">
                  <div className="font-mono text-[9px] font-bold text-accent">03 ENGAGE</div>
                  <div className="mt-1 font-semibold text-foreground text-[11px]">Outreach</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 7. SPLIT BANNER: CRM & INTEGRATIONS ECOSYSTEM */}
      <div className="border-b border-border bg-background">
        <Section className="py-8! md:py-12!">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* LEFT: CRM CONNECTED CONTEXT */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <Eyebrow>CRM Workflow</Eyebrow>
                <h3 className="font-display mt-2 text-2xl font-bold text-foreground">
                  A CRM that starts <GradientText>before the opportunity.</GradientText>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {String(
                    crmSection.description ??
                      "Skout connects the earlier stages of the journey — discovery, enrichment, outreach, conversations — with companies, contacts, deals, tasks, and meetings.",
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 p-3.5">
                <p className="font-display text-sm text-foreground italic">
                  "
                  {String(
                    crmSection.keyStatement ??
                      "Your CRM shouldn't be where context goes to disappear. It should be where context comes together.",
                  )}
                  "
                </p>
              </div>
            </div>

            {/* RIGHT: INTEGRATIONS GRID */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <Eyebrow>{String(integrations.eyebrow ?? "Works with your tools")}</Eyebrow>
                <h3 className="font-display mt-2 text-2xl font-bold text-foreground">
                  Connect Skout to your <GradientText>existing stack.</GradientText>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {String(
                    integrations.description ??
                      "Skout is designed to complement your existing GTM stack rather than force your team to rebuild everything from scratch.",
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border p-3 text-center bg-muted/30">
                  <Building2 className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                  <div className="font-bold text-xs">HubSpot</div>
                  <div className="text-[10px] text-muted-foreground">Sync CRM</div>
                </div>
                <div className="rounded-xl border border-border p-3 text-center bg-muted/30">
                  <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-xs">Google Calendar</div>
                  <div className="text-[10px] text-muted-foreground">Meetings</div>
                </div>
                <div className="rounded-xl border border-border p-3 text-center bg-muted/30">
                  <Key className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <div className="font-bold text-xs">BYOK</div>
                  <div className="text-[10px] text-muted-foreground">AI Key</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 8. DIFFERENTIATION & WORKFLOW STORY */}
      <div className="border-b border-border bg-card/30">
        <Section className="py-8! md:py-12!">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-foreground">
              The problem isn't that sales teams <GradientText>need another tool.</GradientText>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              They need fewer disconnected workflows. Skout connects the journey between
              prospecting, enrichment, outreach, and CRM pipeline.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold">
                  The Skout Connected Journey
                </div>
                <div className="font-display text-lg font-bold text-foreground mt-0.5">
                  Discover → Understand → Engage → Convert
                </div>
              </div>
              <span className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background whitespace-nowrap shadow-sm">
                One connected GTM workspace
              </span>
            </div>
          </div>
        </Section>
      </div>

      {/* 9. PRICING TEASER */}
      <div className="border-b border-border bg-background">
        <Section className="py-6!">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border p-6 md:flex-row md:p-8 bg-muted/20">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-foreground font-bold">
                {String(pricingTeaser.headline ?? "Built around the way your team sells.")}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Flexible credit tiers designed for modern outbound sales teams.
              </p>
            </div>
            <Link
              href={String(pricingTeaser.ctaHref ?? "/pricing")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background transition-transform hover:scale-[1.02] shrink-0"
            >
              {String(pricingTeaser.ctaText ?? "See Skout AI")}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Section>
      </div>

      {/* 10. FAQ SECTION - CENTERED HEADER WITH EQUAL 2-COLUMN BALANCED ACCORDION GRID */}
      <div className="border-b border-border bg-card/30">
        <Section className="py-8! md:py-12!">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl text-foreground font-bold">
              Everything you need to <GradientText>know about Skout AI.</GradientText>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Got questions about how Skout AI fits into your sales workflow or CRM stack? We have
              answers.
            </p>
          </div>

          {/* EQUAL 2-COLUMN BALANCED ACCORDION GRID */}
          <FaqAccordion items={faqList} />

          {/* HORIZONTAL HELP BANNER ACROSS BOTTOM */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Still have questions?</div>
                <div className="text-xs text-muted-foreground">
                  Talk to our GTM specialists for a live walkthrough tailored to your target ICP.
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-bold text-background transition-transform hover:scale-[1.02] shrink-0"
            >
              Book a live demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Section>
      </div>

      {/* 11. FINAL CTA */}
      <div>
        <Section className="py-10! md:py-14!">
          <div
            className="rounded-3xl border border-border p-8 md:p-12 text-center shadow-2xl flex flex-col items-center"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Eyebrow>
              {String(
                finalCta.eyebrow ??
                  "Your next pipeline opportunity is probably buried in your workflow.",
              )}
            </Eyebrow>

            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl max-w-2xl leading-tight text-foreground">
              Give your GTM team one place to{" "}
              <GradientText>find it, understand it, and act on it.</GradientText>
            </h2>

            <p className="mt-3 max-w-lg text-xs sm:text-sm text-muted-foreground">
              {String(
                finalCta.body ??
                  "Bring prospecting, intelligence, outreach, and pipeline together with Skout AI.",
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background transition-transform hover:scale-[1.02]"
              >
                Book a demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold transition-colors hover:bg-muted"
              >
                See Skout AI
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-muted-foreground font-medium">
              {String(
                finalCta.supportingLine ?? "Discover better. Engage smarter. Sell with context.",
              )}
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
