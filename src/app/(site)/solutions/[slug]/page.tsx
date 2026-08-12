import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS_DATA } from "@/lib/solutionData";
import SolutionDetailClient from "@/components/solutions/SolutionDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(SOLUTIONS_DATA).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = SOLUTIONS_DATA[params.slug];
  if (!solution) {
    return {
      title: "Solution Not Found | Skout AI",
    };
  }

  return {
    title: `${solution.title} - ${solution.eyebrow} | Skout AI`,
    description: `${solution.headline} ${solution.subheadline}`,
    openGraph: {
      title: `${solution.title} | Skout AI Solutions`,
      description: solution.subheadline,
      url: `https://skoutai.io/solutions/${solution.slug}`,
    },
  };
}

export default function SolutionPage({ params }: Props) {
  const solution = SOLUTIONS_DATA[params.slug];

  if (!solution) {
    notFound();
  }

  return <SolutionDetailClient solution={solution} />;
}
