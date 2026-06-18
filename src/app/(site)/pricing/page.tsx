export const metadata = {
  title: "Pricing",
  description:
    "Credit-based pricing — Free forever, Growth at $79/user, Scale at $199/user, and Enterprise custom plans. No per-seat tax.",
};

import PricingClient from "./client";
export default function PricingPage() {
  return <PricingClient />;
}
