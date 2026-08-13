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
      expectedDate="Q1 2026"
      topics={[
        {
          title: "Anti-Spam & Deliverability Standards",
          description:
            "Strict compliance with CAN-SPAM, CASL, and GDPR outbound directives requiring valid opt-out mechanisms and verified email targeting.",
        },
        {
          title: "Prohibited Outreach Content",
          description:
            "Absolute prohibition of deceptive messaging, illegal commercial solicitations, malware links, or non-compliant bulk mailing practices.",
        },
        {
          title: "Domain & Infrastructure Protection",
          description:
            "Automated sending rate controls and health monitoring designed to maintain high domain reputation and inbox placement across email providers.",
        },
        {
          title: "Account Suspension & Enforcement",
          description:
            "Fair investigation workflows and immediate enforcement measures for violations of platform health protocols or excessive hard bounce rates.",
        },
      ]}
    />
  );
}
