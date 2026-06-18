export const metadata = {
  title: "Integrations",
  description:
    "Native connectors for Salesforce, HubSpot, Snowflake, BigQuery, Slack, Gmail and 50+ more. Plus REST & GraphQL API and webhooks.",
};

import IntegrationsClient from "./client";
export default function IntegrationsPage() {
  return <IntegrationsClient />;
}
