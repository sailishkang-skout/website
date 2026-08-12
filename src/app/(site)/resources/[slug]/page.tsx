import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESOURCES_DATA } from "@/lib/resourceData";
import ResourceDetailClient from "@/components/resources/ResourceDetailClient";
import GTMOutboundCalculator from "@/components/resources/GTMOutboundCalculator";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(RESOURCES_DATA).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const resource = RESOURCES_DATA[params.slug];
  if (!resource) {
    return {
      title: "Resource Not Found | Skout AI",
    };
  }

  return {
    title: `${resource.title} - ${resource.eyebrow} | Skout AI`,
    description: `${resource.headline} ${resource.subheadline}`,
    openGraph: {
      title: `${resource.title} | Skout AI Resources`,
      description: resource.subheadline,
      url: `https://skoutai.io/resources/${resource.slug}`,
    },
  };
}

export default function ResourcePage({ params }: Props) {
  const resource = RESOURCES_DATA[params.slug];

  if (!resource) {
    notFound();
  }

  if (params.slug === "gtm-outbound-calculator") {
    return <GTMOutboundCalculator />;
  }

  return <ResourceDetailClient resource={resource} />;
}
