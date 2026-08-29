"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

async function fetchPageContent(pageId: string): Promise<Record<string, unknown>> {
  const res = await fetch(`/api/admin/content/${pageId}`);
  if (!res.ok) throw new Error("Failed to fetch page content");
  const data = await res.json();
  return data.data;
}

export default function ContentPageEditor({ params }: { params: { page: string } }) {
  const { page } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!VALID_PAGES.includes(page)) notFound();

  const {
    data: pageContent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-content-page", page],
    queryFn: () => fetchPageContent(page),
    staleTime: 600000, // Cache content for 10 minutes client-side
    gcTime: 86400000, // Keep in cache for 24 hours
    refetchOnWindowFocus: true, // Auto-refresh in background if stale
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-content-page", page] });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Page header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        {/* Content editor skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !pageContent) {
    return (
      <div className="space-y-6">
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
            Retry
          </Button>
        </div>
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-700">
          Failed to load page content. Please refresh to try again.
        </p>
      </div>
    );
  }

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
      <ContentEditor
        pageId={page}
        pageLabel={PAGE_LABELS[page]}
        initialContent={pageContent ?? undefined}
      />
    </div>
  );
}
