"use client";

import React from "react";
import { Cookie } from "lucide-react";
import LegalUnderConstruction from "@/components/legal/LegalUnderConstruction";

export default function CookiePolicyClient() {
  return (
    <LegalUnderConstruction
      badgeText="SKOUT AI — COOKIES & TELEMETRY"
      title="Cookie & Tracking"
      gradientWord="Policy"
      description="Learn how Skout AI uses essential session tokens, performance telemetry, and privacy-preserving cookies to operate, optimize, and secure our websites and SaaS platform."
      icon={<Cookie className="h-4 w-4 text-accent" />}
      statusLabel="Under Policy Review"
      expectedDate="Q1 2026"
      topics={[
        {
          title: "Strictly Necessary Cookies",
          description:
            "Essential security tokens and session state cookies required for authentication, workspace authorization, and account access.",
        },
        {
          title: "Performance & Analytics Telemetry",
          description:
            "Privacy-focused site telemetry used strictly to monitor platform latency, optimize query speeds, and improve application reliability.",
        },
        {
          title: "Zero Cross-Site Tracking",
          description:
            "We do not sell personal data, nor do we employ intrusive cross-site third-party tracking pixels for external advertising brokers.",
        },
        {
          title: "User Consent & Preference Control",
          description:
            "Granular cookie preference controls allowing visitors to toggle non-essential analytics cookies directly via our banner interface.",
        },
      ]}
    />
  );
}