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
    />
  );
}