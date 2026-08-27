"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS_DATA } from "@/lib/productData";
import ContentEditor from "./ContentEditor";

const corePages = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "solutions", label: "Solutions" },
  { id: "integrations", label: "Integrations" },
  {
    id: "resources",
    label: "Resources",
  },
];

const productPages = Object.values(PRODUCTS_DATA).map((product) => ({
  id: product.slug,
  label: product.title,
}));

const allPages = [...corePages, ...productPages];
const VALID_PAGES = allPages.map((p) => p.id);
const PAGE_LABELS: Record<string, string> = Object.fromEntries(
  allPages.map((p) => [p.id, p.label]),
);

export default function ContentPageEditor({ params }: { params: { page: string } }) {
  const { page } = params;
  const router = useRouter();

  if (!VALID_PAGES.includes(page)) notFound();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/content"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Content
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{PAGE_LABELS[page]}</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <ContentEditor pageId={page} pageLabel={PAGE_LABELS[page]} initialContent={{}} />
    </div>
  );
}
