import { getPageContent } from "@/lib/content/get-content";
import PricingClient from "./client";

export const metadata = {
  title: "Pricing | Skout AI",
  description:
    "Start free with Skout AI. Find prospects, enrich contacts, manage your CRM, and build outbound sequences. Upgrade to automate and scale your sales outreach.",
};

export default async function PricingPage() {
  const content = await getPageContent("pricing");
  return <PricingClient content={content} />;
}
