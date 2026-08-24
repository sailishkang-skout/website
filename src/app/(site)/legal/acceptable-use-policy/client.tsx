"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import LegalUnderConstruction from "@/components/legal/LegalUnderConstruction";

export default function AcceptableUsePolicyClient() {
  return (
    <LegalUnderConstruction
      badgeText="SKOUT AI — PLATFORM COMPLIANCE"
      title="Acceptable Use"
      gradientWord="Policy"
      description="Standards governing authorized platform usage, anti-spam outbound rules, domain reputation safeguards, and system rate limits across all Skout AI accounts."
      icon={<ShieldCheck className="h-4 w-4 text-accent" />}
      statusLabel="Finalizing Compliance Guidelines"
      expectedDate="Q1 2027"
    />
  );
}