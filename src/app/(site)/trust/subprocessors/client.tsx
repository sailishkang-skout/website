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
      contactEmail="privacy@skoutai.io"
    />
  );
}