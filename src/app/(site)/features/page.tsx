import { getPageContent } from "@/lib/content/get-content";
import FeaturesClient from "./client";

export const metadata = {
  title: "Features",
  description:
    "200M contacts, waterfall enrichment, AI SDR, multi-channel outreach, CRM and analytics — one platform, five tools you can cancel.",
};

export default async function FeaturesPage() {
  const content = await getPageContent("features");
  return <FeaturesClient content={content} />;
}
