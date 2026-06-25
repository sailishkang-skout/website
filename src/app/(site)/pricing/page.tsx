import { getPageContent } from "@/lib/content/get-content";
import PricingClient from "./client";

export const metadata = {
  title: "Pricing",
  description:
    "Credit-based pricing — Free forever, Growth at $79/user, Scale at $199/user, and Enterprise custom plans. No per-seat tax.",
};

export default async function PricingPage() {
  const content = await getPageContent("pricing");
  return <PricingClient content={content} />;
}
