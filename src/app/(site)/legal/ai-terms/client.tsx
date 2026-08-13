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
      statusLabel="In Final Legal Review"
      expectedDate="Q1 2026"
      topics={[
        {
          title: "Generative Output Ownership",
          description:
            "Customers retain full intellectual property rights and ownership over all AI-generated email copy, sequences, and prospecting insights produced by Skout AI.",
        },
        {
          title: "Zero Generalized Model Training",
          description:
            "Your workspace content, CRM integrations, and private campaign data are strictly isolated and never used to train public or shared foundation models.",
        },
        {
          title: "Ethical Outbound AI Guardrails",
          description:
            "Automated content filtering, anti-spam heuristics, and deliverability verification are embedded into every AI pipeline step.",
        },
        {
          title: "Model Transparency & Auditability",
          description:
            "Clear provenance and confidence scoring for data enrichment, email verification, and automated agent actions.",
        },
      ]}
    />
  );
}