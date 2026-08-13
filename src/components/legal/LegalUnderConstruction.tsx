"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowLeft,
  Mail,
  FileText,
  CheckCircle2,
  Send,
  Lock,
} from "lucide-react";
import { Section, GradientText } from "@/components/site/Section";

export interface PreviewTopic {
  title: string;
  description: string;
}

export interface LegalUnderConstructionProps {
  badgeText: string;
  title: string;
  gradientWord: string;
  description: string;
  icon: React.ReactNode;
  statusLabel?: string;
  expectedDate?: string;
  topics: PreviewTopic[];
  contactEmail?: string;
}

export default function LegalUnderConstruction({
  badgeText,
  title,
  gradientWord,
  description,
  icon,
  statusLabel = "Final Legal Review",
  expectedDate = "Q1 2026",
  topics,
  contactEmail = "legal@skoutai.io",
}: LegalUnderConstructionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="flex flex-col gap-0 text-foreground min-h-[75vh]">
      {/* HERO SECTION */}
      <div style={{ background: "var(--gradient-hero)" }} className="border-b border-border/60">
        <Section className="py-12! md:py-20! text-center">
          <div className="mx-auto max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-sm backdrop-blur-md">
              {icon}
              <span className="uppercase tracking-wider">{badgeText}</span>
            </div>

            <h1 className="mx-auto max-w-3xl font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground">
              {title} <GradientText>{gradientWord}</GradientText>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-muted-foreground text-center">
              {description}
            </p>

            {/* STATUS BANNER */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 font-medium text-amber-400">
                <Clock className="h-4 w-4 shrink-0 animate-pulse" />
                <span>Status: <strong>{statusLabel}</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 font-medium text-muted-foreground">
                <Lock className="h-4 w-4 text-accent shrink-0" />
                <span>Target Publication: <strong>{expectedDate}</strong></span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* MAIN CONTENT AREA */}
      <Section className="py-10! md:py-16!">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* PREVIEW TOPICS GRID */}
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                What This Document Will Cover
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Key regulatory frameworks, governance policies, and compliance guarantees currently in preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:border-accent/40 transition-all duration-300 space-y-2 group"
                >
                  <div className="flex items-center gap-2.5 font-semibold text-foreground text-sm sm:text-base">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                    <h3>{topic.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NOTIFICATION SUBSCRIBE CARD */}
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/5 to-card p-6 sm:p-8 shadow-xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="mx-auto w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center text-accent">
              <Mail className="h-6 w-6" />
            </div>

            <div className="max-w-xl mx-auto space-y-1.5">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                Get Notified Upon Publication
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Subscribe to receive an immediate email notification as soon as this official policy document is published.
              </p>
            </div>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>Thank you! We will notify you when published.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-md hover:bg-accent/90 transition-colors shrink-0"
                >
                  <span>Notify Me</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* QUICK LINKS & SUPPORT CTAS */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60 text-xs sm:text-sm">
            <Link
              href="/legal/terms-of-service"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Terms of Service</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/legal/privacy-policy"
                className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Privacy Policy</span>
              </Link>

              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-medium"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Legal Team</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
