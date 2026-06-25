import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content/get-content";
import ContentEditor from "./ContentEditor";

const VALID_PAGES = ["home", "about", "features", "pricing", "solutions", "integrations"];

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  features: "Features",
  pricing: "Pricing",
  solutions: "Solutions",
  integrations: "Integrations",
};

export default async function ContentPageEditor({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!VALID_PAGES.includes(page)) notFound();

  const content = await getPageContent(page);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <a href="/admin/content" className="text-sm text-muted-foreground hover:text-foreground">
          Content
        </a>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">{PAGE_LABELS[page]}</span>
      </div>
      <ContentEditor pageId={page} pageLabel={PAGE_LABELS[page]} initialContent={content} />
    </div>
  );
}
