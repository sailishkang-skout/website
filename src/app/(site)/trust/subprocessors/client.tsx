"use client";

import React from "react";
import { Server } from "lucide-react";
import LegalUnderConstruction from "@/components/legal/LegalUnderConstruction";

export default function SubprocessorsClient() {
  return (
    <LegalUnderConstruction
      badgeText="SKOUT TRUST — SUBPROCESSOR DIRECTORY"
      title="Authorized Third-Party"
      gradientWord="Subprocessors"
      description="Transparency directory of authorized third-party cloud infrastructure hosts, data enrichment vendors, and AI processing APIs utilized by Skout AI."
      icon={<Server className="h-4 w-4 text-accent" />}
      statusLabel="Directory Updating"
      expectedDate="Q1 2026"
      topics={[
        {
          title: "Tier-1 Cloud Hosting Infrastructure",
          description:
            "ISO 27001 & SOC 2 certified cloud hosts (Amazon Web Services / Google Cloud Platform) operating encrypted data centers.",
        },
        {
          title: "Verified Data Enrichment Partners",
          description:
            "Authorized public B2B contact verification and email deliverability scoring providers bound by strict DPA covenants.",
        },
        {
          title: "AI API Service Providers",
          description:
            "Zero-retention enterprise API endpoints for real-time natural language synthesis and outbound sequence generation.",
        },
        {
          title: "30-Day Subprocessor Change Notices",
          description:
            "Subprocessor change notification registry allowing enterprise data controllers to review and object to infrastructure additions.",
        },
      ]}
      contactEmail="privacy@skoutai.io"
    />
  );
}