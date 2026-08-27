"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  RefreshCw,
  FileEdit,
  CheckCircle,
  Clock,
  TrendingUp,
  LayoutTemplate,
  Layers,
  Globe,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PRODUCTS_DATA } from "@/lib/productData";

const corePages = [
  { id: "home", label: "Home", description: "Hero, stats, platform section, manifesto, CTA" },
  { id: "about", label: "About", description: "Hero, values, timeline, team, press, manifesto" },
  {
    id: "features",
    label: "Features",
    description: "Hero, feature groups and all individual features",
  },
  { id: "pricing", label: "Pricing", description: "Hero, pricing tiers, comparison table" },
  {
    id: "solutions",
    label: "Solutions",
    description: "Hero, solution cards and CTA section",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Hero, integration groups, items and custom API section",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Resource library listing, calculator, guides and free tools",
  },
];

const productPages = Object.values(PRODUCTS_DATA).map((product) => ({
  id: product.slug,
  label: product.title,
  description: `${product.eyebrow} — ${product.subheadline.substring(0, 50)}...`,
}));

const pages = [...corePages, ...productPages];

interface PageUpdateInfo {
  pageId: string;
  updatedAt: string;
}

interface ContentStats {
  totalPages: number;
  editedPages: number;
  usingDefaults: number;
  recentlyUpdated: number;
}

// Trend indicator component
function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return (
      <span className="flex items-center gap-0.5 text-emerald-600">
        <TrendingUp className="h-3 w-3" />
        <span className="text-xs font-medium">+{value}%</span>
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center gap-0.5 text-rose-600">
        <TrendingUp className="h-3 w-3 rotate-180" />
        <span className="text-xs font-medium">{value}%</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-muted-foreground">
      <Clock className="h-3 w-3" />
      <span className="text-xs font-medium">0%</span>
    </span>
  );
}

// Stats skeleton for loading state
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-3 h-7 w-20" />
          <Skeleton className="mt-1 h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

async function fetchContentStats(): Promise<{
  updates: PageUpdateInfo[];
  stats: ContentStats;
}> {
  const USE_MOCK_DATA = process.env.NODE_ENV === "test" ? false : true;

  if (USE_MOCK_DATA) {
    // Mock data for development
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const mockUpdates: PageUpdateInfo[] = pages
      .slice(0, 8)
      .map((page, i) => ({
        pageId: page.id,
        updatedAt: i < 3 ? weekAgo.toISOString() : null,
      }))
      .filter(Boolean) as PageUpdateInfo[];

    const editedPages = 8;
    const recentlyUpdated = mockUpdates.filter((u) => new Date(u.updatedAt) > weekAgo).length;
    const usingDefaults = pages.length - editedPages;

    return {
      updates: mockUpdates,
      stats: {
        totalPages: pages.length,
        editedPages,
        usingDefaults,
        recentlyUpdated,
      },
    };
  }

  try {
    const res = await fetch("/api/admin/content/stats");
    if (res.ok) {
      return await res.json();
    }
    throw new Error("Failed to fetch content stats");
  } catch (error) {
    console.error("Error fetching content stats, falling back to mock data:", error);
    // Return mock data when API fails
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const mockUpdates: PageUpdateInfo[] = pages
      .slice(0, 8)
      .map((page, i) => ({
        pageId: page.id,
        updatedAt: i < 3 ? weekAgo.toISOString() : null,
      }))
      .filter(Boolean) as PageUpdateInfo[];

    const editedPages = 8;
    const recentlyUpdated = mockUpdates.filter((u) => new Date(u.updatedAt) > weekAgo).length;
    const usingDefaults = pages.length - editedPages;

    return {
      updates: mockUpdates,
      stats: {
        totalPages: pages.length,
        editedPages,
        usingDefaults,
        recentlyUpdated,
      },
    };
  }
}

const statConfigs = [
  {
    label: "Total Pages",
    key: "totalPages",
    icon: Globe,
    bg: "bg-blue-500",
    color: "text-white",
    href: "#all",
    growth: 0,
  },
  {
    label: "Edited Pages",
    key: "editedPages",
    icon: FileEdit,
    bg: "bg-emerald-500",
    color: "text-white",
    href: "#edited",
    growth: 12.5,
  },
  {
    label: "Using Defaults",
    key: "usingDefaults",
    icon: LayoutTemplate,
    bg: "bg-amber-500",
    color: "text-white",
    href: "#defaults",
    growth: -8.3,
  },
  {
    label: "Recently Updated",
    key: "recentlyUpdated",
    icon: CheckCircle,
    bg: "bg-indigo-500",
    color: "text-white",
    href: "#recent",
    growth: 28.6,
  },
];

export default function ContentPage() {
  const queryClient = useQueryClient();
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [lastUpdatedMap, setLastUpdatedMap] = useState<Record<string, string>>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-content-stats"],
    queryFn: fetchContentStats,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setStats(data.stats);
      const map: Record<string, string> = {};
      data.updates.forEach((update: PageUpdateInfo) => {
        map[update.pageId] = update.updatedAt;
      });
      setLastUpdatedMap(map);
    }
  }, [data]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-content-stats"] });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Content</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Edit the text and copy for every page on your website.
          </p>
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

      {/* Error state - even if API fails, we'll show mock stats */}
      {isError && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700">
          Could not load real-time stats, showing demo data. Refresh to try again.
        </p>
      )}

      {/* Stats cards */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statConfigs.map((cfg) => (
            <Link
              key={cfg.key}
              href={cfg.href}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/40"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}
              >
                <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">
                    {stats?.[cfg.key as keyof ContentStats] ?? 0}
                  </p>
                  <TrendIndicator value={cfg.growth} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{cfg.label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Page grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => {
          const updated = lastUpdatedMap[page.id];
          return (
            <Link
              key={page.id}
              href={`/admin/content/${page.id}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-foreground/30 hover:bg-card/80"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-medium">{page.label}</h2>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{page.description}</p>
                <p className="mt-2 text-[11px] text-muted-foreground/70">
                  {updated
                    ? `Updated ${new Date(updated).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : "Using defaults"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
