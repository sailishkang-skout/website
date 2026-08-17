"use client";

import Link from "next/link";
import { FileText, Calculator, BookOpen, Video, Download, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, Eyebrow, GradientText } from "@/components/site/Section";
import { RESOURCES_DATA, ResourceData } from "@/lib/resourceData";

const RESOURCE_ICONS: LucideIcon[] = [FileText, Calculator, BookOpen, Video, Download];

// Extend ResourceData to include bullets for all resources
interface ResourceWithBullets extends ResourceData {
  bullets: string[];
}

interface Props {
  content: Record<string, unknown>;
}

export default function ResourcesClient({ content }: Props) {
  const hero = (content.hero as Record<string, unknown>) ?? {};
  const cta = (content.cta as Record<string, unknown>) ?? {};
  const ctaPrimary = (cta.primaryCta as { text: string; href: string }) ?? {
    text: "View pricing",
    href: "/pricing",
  };
  const ctaSecondary = (cta.secondaryCta as { text: string; href: string }) ?? {
    text: "Book demo",
    href: "/contact",
  };

  // Map CMS content's resources (same structure as solutions) if available, else fallback to RESOURCES_DATA
  const cmsResources = (content.resources as ResourceWithBullets[]) ?? [];
  const resources =
    cmsResources.length > 0
      ? cmsResources
      : Object.values(RESOURCES_DATA).map((resource) => {
          // Extract up to 3 key bullets from resource categories or subheadline to match solution card structure
          const bullets =
            resource.categories.length > 0
              ? resource.categories.slice(0, 3).map((cat) => cat.summary.split(".")[0]) // first sentence of each category summary
              : resource.subheadline
                  .split(".")
                  .slice(0, 3)
                  .filter((s) => s.trim()); // first 3 sentences of subheadline
          return { ...resource, bullets };
        });

  return (
    <div>
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border">
        <Section className="py-12! text-center md:py-20!">
          <Eyebrow>{String(hero.eyebrow ?? "Resources")}</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {String(hero.title ?? "Built for the way")}{" "}
            <GradientText>{String(hero.titleHighlight ?? "you learn and grow.")}</GradientText>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            {String(
              hero.description ??
                "Free tools, calculators, guides, and resources to level up your GTM and outbound sales strategy.",
            )}
          </p>
        </Section>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource, i) => {
            const Icon = RESOURCE_ICONS[i % RESOURCE_ICONS.length];
            return (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border transition-all hover:border-primary/50 hover:-translate-y-1"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {resource.eyebrow}
                    </span>
                    <h3 className="mt-1 text-base font-semibold md:text-lg">{resource.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {resource.subheadline}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {(resource.bullets || []).slice(0, 3).map((bullet: string) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition group-hover:gap-3">
                      Access resource <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0!">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 md:p-12"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>{String(cta.eyebrow ?? "Use cases")}</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
                {String(cta.title ?? "One platform for every")}{" "}
                <GradientText>{String(cta.titleHighlight ?? "revenue workflow.")}</GradientText>
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                {String(
                  cta.description ??
                    "Combine these free resources with Skout AI's full platform to automate and scale your entire GTM motion.",
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href={ctaPrimary.href}
                className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
              >
                {ctaPrimary.text}
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium transition hover:bg-secondary"
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
