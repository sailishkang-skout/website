import { Metadata } from "next";
import GTMOutboundCalculator from "@/components/resources/GTMOutboundCalculator";

export const metadata: Metadata = {
  title: "GTM Outbound ROI & Cost Calculator | Skout AI",
  description: "Calculate contact sourcing, email finding, verification, and inbox infrastructure costs for your outbound strategy. Benchmark Apollo, Hunter, ZeroBounce, and Smartlead costs against Skout AI.",
};

export default function CalculatorPage() {
  return <GTMOutboundCalculator />;
}
