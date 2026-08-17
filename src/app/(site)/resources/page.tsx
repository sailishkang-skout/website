
import { getPageContent } from "@/lib/content/get-content";
import ResourcesClient from "./client";

export const metadata = {
  title: "Resources",
  description:
    "Access free tools, calculators, guides, and resources to help you optimize your GTM and outbound sales strategy.",
};

export default async function ResourcesPage() {
  const content = await getPageContent("resources");
  return <ResourcesClient content={content} />;
}