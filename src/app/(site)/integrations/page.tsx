import { getPageContent } from "@/lib/content/get-content";
import IntegrationsClient from "./client";

export const metadata = {
  title: "Integrations",
  description:
    "Native connectors for Salesforce, HubSpot, Snowflake, BigQuery, Slack, Gmail and 50+ more. Plus REST & GraphQL API and webhooks.",
};

export default async function IntegrationsPage() {
  const content = await getPageContent("integrations");
  return <IntegrationsClient content={content} />;
}
