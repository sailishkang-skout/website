"use client";

import Link from "next/link";
import { useState } from "react";
import { ResourceData } from "@/lib/resourceData";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import {
  ShieldCheck,
  Target,
  Chrome,
  Database,
  Check,
  Copy,
  Clock,
  ArrowRight,
  ChevronDown,
  Zap,
  Sparkles,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Target,
  Chrome,
  Database,
};

interface Props {
  resource: ResourceData;
}

export default function ResourceDetailClient({ resource }: Props) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const categoriesList = resource.categories || [];
  const [activeCategory, setActiveCategory] = useState<string>(categoriesList[0]?.id || "");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const selectedCategory = categoriesList.find((c) => c.id === activeCategory) || categoriesList[0];

  return (
    <div className="flex flex-col gap-0 text-foreground overflow-hidden">
      {/* HERO SECTION - CLEAN & SIMPLE HEADER */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-8! md:py-14! text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-accent">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span>SIMPLE SETUP GUIDE</span>
            </div>

            <h1 className="mx-auto max-w-2xl font-display text-2xl sm:text-4xl md:text-5xl leading-[1.15] break-words text-foreground font-semibold">
              {resource.headline}{" "}
              <br />
              <GradientText>{resource.headlineGradient}</GradientText>
            </h1>

            <p className="mx-auto max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {resource.subheadline}
            </p>
          </div>
        </Section>
      </div>

      {/* CLEAN CATEGORY PILL TABS */}
      <Section className="py-8! md:py-12!">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categoriesList.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || ShieldCheck;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-foreground text-background shadow-md"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* SELECTED CATEGORY STEPS DISPLAY CARD */}
        {selectedCategory && (
          <div
            className="mt-8 mx-auto max-w-3xl rounded-3xl border border-border p-6 md:p-8 shadow-2xl space-y-6"
            style={{ background: "var(--gradient-card)" }}
          >
            {/* CATEGORY HEADER */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">
                  {selectedCategory.badge}
                </span>
                <h2 className="mt-2 font-display text-xl md:text-2xl font-semibold text-foreground">
                  {selectedCategory.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedCategory.summary}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium shrink-0">
                <Clock className="h-3.5 w-3.5 text-accent" /> {selectedCategory.time}
              </span>
            </div>

            {/* STEPS LIST */}
            <div className="space-y-4">
              {selectedCategory.steps.map((st) => (
                <div key={st.number} className="rounded-2xl border border-border bg-background/80 p-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent font-mono text-xs font-bold shrink-0">
                      {st.number}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{st.title}</h3>
                  </div>

                  <p className="pl-0 sm:pl-8 text-xs text-muted-foreground leading-relaxed">{st.desc}</p>

                  {/* COPYABLE CODE BLOCK (IF ANY) */}
                  {st.code && (
                    <div className="ml-0 sm:ml-8 rounded-xl border border-border bg-card p-3 font-mono text-xs text-foreground flex items-center justify-between gap-2 overflow-x-auto">
                      <code className="text-accent break-all">{st.code}</code>
                      <button
                        onClick={() => handleCopy(st.code!)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[11px] font-sans font-semibold text-foreground hover:bg-accent hover:text-background transition-colors"
                      >
                        {copiedText === st.code ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* TIPS BADGES */}
                  {st.tips && st.tips.length > 0 && (
                    <div className="ml-8 flex flex-wrap gap-2 pt-1">
                      {st.tips.map((tip, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-md">
                          <Check className="h-3 w-3 text-accent" /> {tip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* FAQ SECTION */}
      <Section className="py-8! md:py-12!">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">
              Setup Questions
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {resource.faqs.map((faq, i) => (
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
          className="rounded-3xl border border-border p-6 text-center md:p-12 mx-auto max-w-3xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <h2 className="font-display text-2xl font-semibold md:text-3xl text-foreground">
            Want us to help you set up?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Book a 1-on-1 setup session with our GTM team. We will configure your mailboxes and DNS records together.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background transition hover:opacity-90"
            >
              Book 1-on-1 Setup Session <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
