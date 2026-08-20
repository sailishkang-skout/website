"use client";

import React from "react";
import { Cpu } from "lucide-react";
import LegalUnderConstruction from "@/components/legal/LegalUnderConstruction";

export default function AITermsClient() {
  return (
    <LegalUnderConstruction
      badgeText="SKOUT AI — GOVERNANCE & AI TERMS"
      title="AI & Model Usage"
      gradientWord="Terms"
      description="Our Responsible AI Governance, Generative Data Privacy, Model Safety, and Output Ownership Terms are currently undergoing final legal review to support enterprise deployments."
      icon={<Cpu className="h-4 w-4 text-accent" />}
      statusLabel="Under Construction & Review"
      expectedDate="Q1 2027"
    />
  );
}