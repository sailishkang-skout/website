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
      expectedDate="Q1 2027"
    />
  );
}