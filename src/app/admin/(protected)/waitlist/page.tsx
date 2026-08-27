"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Mail,
  RefreshCw,
  Activity,
  Users,
  UserPlus,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Users2,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WaitlistEntry {
  _id: string;
  email: string;
  createdAt: string;
}

interface Result {
  items: WaitlistEntry[];
  total: number;
  page: number;
  pages: number;
}

async function fetchWaitlist(page: number, query: string): Promise<Result> {
  const params = new URLSearchParams({ page: String(page) });
  if (query) params.set("q", query);
  const res = await fetch(`/api/admin/waitlist?${params}`);
  if (!res.ok) throw new Error("Failed to fetch waitlist");
  return res.json();
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="mt-3 h-7 w-20" />
          <Skeleton className="mt-1 h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <tr key={i} className="border-b border-border last:border-0">
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-48" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-24" />
          </td>
        </tr>
      ))}
    </>
  );
}

// Waitlist stats interface
interface WaitlistStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
}

export default function WaitlistPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["admin-waitlist", { page, query }],
    queryFn: () => fetchWaitlist(page, query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });

  // Calculate stats from data
  const [stats, setStats] = useState<WaitlistStats>({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    if (data?.items) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const thisWeek = data.items.filter((e) => new Date(e.createdAt) > weekAgo).length;
      const thisMonth = data.items.filter((e) => new Date(e.createdAt) > monthAgo).length;

      setStats({
        total: data.total,
        thisWeek,
        thisMonth,
      });
    }
  }, [data]);

  // Handle refresh
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-waitlist"] });
  };

  const statConfigs = [
    {
      label: "Total Waitlist",
      key: "total",
      icon: Users2,
      bg: "bg-blue-500",
      color: "text-white",
      href: "#all",
      growth: 22.4,
    },
    {
      label: "This Week",
      key: "thisWeek",
      icon: UserPlus,
      bg: "bg-emerald-500",
      color: "text-white",
      href: "#weekly",
      growth: 15.8,
    },
    {
      label: "This Month",
      key: "thisMonth",
      icon: Activity,
      bg: "bg-indigo-500",
      color: "text-white",
      href: "#monthly",
      growth: 31.2,
    },
  ];

  // Fetch ALL emails for copy (no pagination limit)
  async function copyAllEmails() {
    const res = await fetch("/api/notify");
    const json = await res.json();
    const text: string = (json.list as string[]).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setQuery(input);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Waitlist</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {isLoading ? (
              <Skeleton className="inline-block h-3.5 w-16" />
            ) : (
              `${data?.total ?? 0} signups`
            )}
          </p>
        </div>
        <button
          onClick={copyAllEmails}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-muted-foreground" />
              Copy all emails
            </>
          )}
        </button>
      </div>

      {isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load waitlist.
        </p>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search email…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setInput("");
              setPage(1);
            }}
            className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
          >
            Clear
          </button>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-border">
        <table className="w-full min-w-100 text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : !data?.items.length ? (
              <tr>
                <td colSpan={2} className="px-4 py-16 text-center text-muted-foreground">
                  {query ? `No results for "${query}"` : "No signups yet."}
                </td>
              </tr>
            ) : (
              data.items.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{entry.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {format(new Date(entry.createdAt), "MMM d, yyyy")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {data.page} of {data.pages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              disabled={page === data.pages || isFetching}
              className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-muted"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
