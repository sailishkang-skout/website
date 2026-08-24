"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowLeft, Mail, FileText, Construction } from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";

export interface LegalUnderConstructionProps {
  badgeText: string;
  title: string;
  gradientWord: string;
  description: string;
  icon: React.ReactNode;
  statusLabel?: string;
  expectedDate?: string;
  contactEmail?: string;
}

export default function LegalUnderConstruction({
  badgeText,
  title,
  gradientWord,
  description,
  icon,
  statusLabel = "Under Construction & Review",
  expectedDate = "Q1 2027",
  contactEmail = "legal@skoutai.io",
}: LegalUnderConstructionProps) {
  return (
    <div className="flex flex-col gap-0 text-foreground">
      {/* HERO SECTION - MATCHING INTEGRATIONS / PRICING HERO DESIGN */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-10! md:py-16! text-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-accent">
              {icon}
              <span>{badgeText}</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
              {title} <GradientText>{gradientWord}</GradientText>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground text-center">
              {description}
            </p>

            {/* STATUS BADGES */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-medium text-amber-400">
                <Construction className="h-3.5 w-3.5 shrink-0" />
                <span>Status: {statusLabel}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Target: {expectedDate}</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* SUBSECTION - CLEAN SITE COMPONENT DESIGN */}
      <Section className="py-8! md:py-12! text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Document In Preparation
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              This policy document is currently under construction to match Skout AI&apos;s latest
              platform standards. Please reference our active legal policies below.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/legal/terms-of-service"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Terms of Service</span>
            </Link>

            <Link
              href="/legal/privacy-policy"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
            >
              <FileText className="h-4 w-4 text-accent" />
              <span>Privacy Policy</span>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
