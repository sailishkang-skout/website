import { Metadata } from "next";
import { RESOURCES_DATA } from "@/lib/resourceData";
import ResourceDetailClient from "@/components/resources/ResourceDetailClient";

export const metadata: Metadata = {
  title: "Setup Guides & Technical Documentation | Skout AI",
  description:
    "Production-grade setup documentation for sales engineers and GTM ops. Domain DNS authentication, mailbox rotation, OpenSearch ICP matrix, Chrome Extension V3, and HubSpot 2-way sync.",
};

export default function GuidesPage() {
  const resource = RESOURCES_DATA["setup-guides"];
  return <ResourceDetailClient resource={resource} />;
}
