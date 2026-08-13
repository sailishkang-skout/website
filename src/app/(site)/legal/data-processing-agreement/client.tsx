"use client";

import React from "react";
import { FileCheck } from "lucide-react";
import LegalUnderConstruction from "@/components/legal/LegalUnderConstruction";

export default function DPAClient() {
  return (
    <LegalUnderConstruction
      badgeText="SKOUT AI — DPA & ENTERPRISE COMPLIANCE"
      title="Data Processing"
      gradientWord="Agreement (DPA)"
      description="Standard Contractual Clauses (SCCs), GDPR Data Processor terms, and enterprise subprocessor guarantees for European and global enterprise customers."
      icon={<FileCheck className="h-4 w-4 text-accent" />}
      statusLabel="Enterprise Review"
      expectedDate="Q1 2026"
      topics={[
        {
          title: "Standard Contractual Clauses (SCCs)",
          description:
            "EU and UK approved Standard Contractual Clauses governing lawful cross-border data transfers between data controllers and processors.",
        },
        {
          title: "Data Processor Rights & Obligations",
          description:
            "Strict contractual commitments specifying data processing boundaries, confidentiality, and technical/organizational security measures (TOMs).",
        },
        {
          title: "Subprocessor Transparency & Approval",
          description:
            "30-day advance notice window for subprocessor modifications and clear auditing rights for enterprise customers.",
        },
        {
          title: "Data Return & Permanent Destruction",
          description:
            "Guaranteed protocols for post-termination data extraction and verified cryptographic deletion from all production databases.",
        },
      ]}
    />
  );
}