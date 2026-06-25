import { getPageContent } from "@/lib/content/get-content";
import AboutClient from "./client";

export const metadata = {
  title: "About Us",
  description:
    "Skout AI is rebuilding the B2B data stack from the schema up. One graph, one bill, one workflow — built by ex-RevOps leaders who were tired of five-vendor outbound stacks.",
};

export default async function AboutPage() {
  const content = await getPageContent("about");
  return <AboutClient content={content} />;
}
