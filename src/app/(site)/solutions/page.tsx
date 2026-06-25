import { getPageContent } from "@/lib/content/get-content";
import SolutionsClient from "./client";

export const metadata = {
  title: "Solutions",
  description:
    "Purpose-built workflows for outbound sales, demand generation, recruiting, agencies, founders and RevOps — all on one platform.",
};

export default async function SolutionsPage() {
  const content = await getPageContent("solutions");
  return <SolutionsClient content={content} />;
}
