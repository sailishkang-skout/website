import { Metadata } from "next";
import IntelligenceClient from "../intelligence/client";

export const metadata: Metadata = {
  title: "Platform Intelligence | Skout AI",
  description:
    "The intelligence layer behind your GTM stack. Skout enriches, verifies, contextualizes, scores, and connects information across your revenue workflow.",
};

export default function PlatformIntelligencePage() {
  return <IntelligenceClient />;
}
