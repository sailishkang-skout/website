import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Database,
  Sparkles,
  ShieldCheck,
  Workflow,
  Bot,
  Activity,
  Mail,
  BarChart3,
  Plug,
  Bell,
} from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { getPageContent } from "@/lib/content/get-content";

const EXTRA_ICONS = [Plug, Workflow, BarChart3, ShieldCheck, Bot, Activity, Mail, Database];

export default async function HomePage() {
  const content = await getPageContent("home");

  const hero = (content.hero as Record<string, unknown>) ?? {};
  const heroStats = (hero.stats as Array<{ key: string; value: string }>) ?? [];
  const heroPrimary = (hero.primaryCta as { text: string; href: string }) ?? { text: "Start free", href: "/contact" };
  const heroSecondary = (hero.secondaryCta as { text: string; href: string }) ?? { text: "Tour the platform →", href: "/features" };

  const platform = (content.platform as Record<string, unknown>) ?? {};
  const bigCard = (platform.bigCard as Record<string, unknown>) ?? {};
  const enrichmentCard = (platform.enrichmentCard as Record<string, unknown>) ?? {};
  const verificationCard = (platform.verificationCard as Record<string, unknown>) ?? {};
  const outreachCard = (platform.outreachCard as Record<string, unknown>) ?? {};
  const intentCard = (platform.intentCard as Record<string, unknown>) ?? {};

  const manifesto = (content.manifesto as Record<string, unknown>) ?? {};
  const extras = (content.extras as Record<string, unknown>) ?? {};
  const extraItems = (extras.items as Array<{ title: string }>) ?? [];

  const cta = (content.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? { text: "Get started", href: "/contact" };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? { text: "See pricing", href: "/pricing" };

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "var(--gradient-hero)" }}>
        <Section className="py-10! md:py-24!">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow>{String(hero.eyebrow ?? "Issue 01 · Revenue Intelligence")}</Eyebrow>
              <h1 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                {String(hero.title ?? "Find the right\npeople.").split("\n").map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
                {hero.titleHighlight ? (
                  <> <GradientText>{String(hero.titleHighlight)}</GradientText></>
                ) : null}
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {String(hero.description ?? "")}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={heroPrimary.href}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  {heroPrimary.text} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={heroSecondary.href}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  {heroSecondary.text}
                </Link>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          {heroStats.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.value} className="bg-background p-4 md:p-6">
                  <div className="font-display text-2xl md:text-3xl">{s.key}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      {/* BENTO GRID */}
      <Section>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>{String(platform.eyebrow ?? "The platform")}</Eyebrow>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl">
              {String(platform.title ?? "A modular")}{" "}
              <GradientText>{String(platform.titleHighlight ?? "revenue stack.")}</GradientText>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {String(platform.description ?? "Pick the pieces you need — they're built to compose, not collide.")}
          </p>
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* BIG CARD */}
          <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 md:col-span-2 md:p-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Database className="h-3.5 w-3.5" /> {String(bigCard.tag ?? "Prospect Graph")}
              </div>
              <h3 className="font-display mt-4 text-xl leading-tight sm:text-2xl">
                {String(bigCard.title ?? "200M people.")}{" "}
                <span className="italic-serif">{String(bigCard.titleItalic ?? "40+ filters.")}</span>{" "}
                {String(bigCard.subtitle ?? "One search bar.")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {String(bigCard.description ?? "")}
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-background p-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border pb-3 text-xs text-muted-foreground">
                Series B SaaS · US · hiring AE
              </div>
              <div className="mt-3 space-y-1">
                {[
                  { n: "Mira Kapoor", r: "VP Marketing · Loom", s: "Hiring +12%" },
                  { n: "David Chen", r: "Head of RevOps · Notion", s: "Intent surge" },
                  { n: "Sofia Alvarez", r: "CMO · Linear", s: "HubSpot user" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm hover:bg-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{p.n}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.r}</div>
                    </div>
                    <span
                      className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] text-white"
                      style={{ background: "var(--gradient-accent)" }}
                    >
                      {p.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2 STACKED SMALL CARDS */}
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-1 flex-col rounded-3xl border border-border p-5 text-white md:p-6"
              style={{ background: "var(--gradient-accent)" }}
            >
              <Sparkles className="h-5 w-5" />
              <h3 className="font-display mt-4 text-lg leading-tight">
                {String(enrichmentCard.title ?? "Waterfall enrichment")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {String(enrichmentCard.description ?? "")}
              </p>
            </div>
            <div className="flex flex-1 flex-col rounded-3xl border border-border bg-card p-5 md:p-6">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-display mt-4 text-lg leading-tight">
                {String(verificationCard.title ?? "Real-time verification")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {String(verificationCard.description ?? "")}
              </p>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-border bg-foreground p-6 text-background">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
              <Workflow className="h-3.5 w-3.5" /> {String(outreachCard.tag ?? "Outreach engine")}
            </div>
            <h3 className="font-display mt-4 text-lg leading-tight sm:text-xl">
              {String(outreachCard.title ?? "Multi-channel cadences")}{" "}
              <span className="italic-serif opacity-80">
                {String(outreachCard.titleItalic ?? "that actually land.")}
              </span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">
              {String(outreachCard.description ?? "")}
            </p>
          </div>
          <div className="flex flex-col rounded-3xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Bell className="h-3.5 w-3.5" /> {String(intentCard.tag ?? "Buyer intent")}
            </div>
            <h3 className="font-display mt-4 text-lg leading-tight sm:text-xl">
              {String(intentCard.title ?? "Reach accounts")}{" "}
              <GradientText>{String(intentCard.titleHighlight ?? "before")}</GradientText>{" "}
              {String(intentCard.subtitle ?? "they fill out forms.")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {String(intentCard.description ?? "")}
            </p>
          </div>
        </div>
      </Section>

      {/* MANIFESTO */}
      <div className="border-y border-border bg-card">
        <Section className="py-10! md:py-20!">
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Manifesto</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <ManifestoText
                text={String(manifesto.text ?? "")}
                highlight={String(manifesto.highlight ?? "")}
                italic={String(manifesto.italic ?? "")}
              />
            </div>
          </div>
        </Section>
      </div>

      {/* EXTRAS */}
      <Section>
        <Eyebrow>{String(extras.eyebrow ?? "Also in the box")}</Eyebrow>
        <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl">
          {String(extras.title ?? "Eight more things")}{" "}
          <span className="italic-serif">{String(extras.titleItalic ?? "you'd usually pay extra for.")}</span>
        </h2>
        {extraItems.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {extraItems.map((item, i) => {
              const Icon = EXTRA_ICONS[i % EXTRA_ICONS.length];
              return (
                <div key={i} className="bg-background p-4 md:p-6">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="mt-3 text-sm font-medium">{item.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="py-12!">
        <div
          className="grid items-end gap-6 rounded-3xl border border-border p-6 md:grid-cols-2 md:p-12"
          style={{ background: "var(--gradient-hero)" }}
        >
          <h2 className="font-display text-2xl sm:text-3xl leading-[1.05] md:text-4xl">
            {String(cta.title ?? "Replace 5 tools.")}
            <br />
            <GradientText>{String(cta.titleHighlight ?? "Ship this week.")}</GradientText>
          </h2>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="text-sm text-muted-foreground md:text-right">
              {String(cta.description ?? "50 free credits. No credit card. Cancel anytime.")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              >
                {ctaPrimary.text} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={ctaSecondary.href}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium"
              >
                {ctaSecondary.text}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ManifestoText({
  text,
  highlight,
  italic,
}: {
  text: string;
  highlight: string;
  italic: string;
}) {
  if (!text) return null;

  let result: ReactNode = text;

  if (highlight && text.includes(highlight)) {
    const parts = text.split(highlight);
    result = (
      <>
        {parts[0]}
        <GradientText>{highlight}</GradientText>
        {italic && parts[1]?.includes(italic) ? (
          <>
            {parts[1].split(italic)[0]}
            <span className="italic-serif">{italic}</span>
            {parts[1].split(italic)[1]}
          </>
        ) : (
          parts[1]
        )}
      </>
    );
  }

  return (
    <p className="font-display text-2xl sm:text-3xl leading-snug md:text-4xl">{result}</p>
  );
}
