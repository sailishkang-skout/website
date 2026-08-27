"use client";

import { Suspense, useState, useEffect } from "react";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  RefreshCw,
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Booking {
  _id: string;
  name: string;
  email: string;
  eventType: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
  status: "created" | "cancelled" | "rescheduled";
  createdAt: string;
}

interface Result {
  items: Booking[];
  total: number;
  page: number;
  pages: number;
}

const STATUS_STYLES: Record<string, string> = {
  created: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rescheduled: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "created", label: "Active" },
  { value: "rescheduled", label: "Rescheduled" },
  { value: "cancelled", label: "Cancelled" },
];

async function fetchBookings(page: number, query: string, status: string): Promise<Result> {
  const params = new URLSearchParams({ page: String(page) });
  if (query) params.set("q", query);
  if (status) params.set("status", status);
  const res = await fetch(`/api/admin/bookings?${params}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
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

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-border last:border-0">
          <td className="px-4 py-3">
            <Skeleton className="mb-1.5 h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="mb-1.5 h-4 w-24" />
            <Skeleton className="h-3 w-28" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-12" />
          </td>
        </tr>
      ))}
    </>
  );
}

// Booking stats interface
interface BookingStats {
  total: number;
  active: number;
  rescheduled: number;
  cancelled: number;
  thisWeek: number;
}

function BookingsContent() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["admin-bookings", { page, query, status }],
    queryFn: () => fetchBookings(page, query, status),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });

  // Calculate stats from data
  const [stats, setStats] = useState<BookingStats>({
    total: 0,
    active: 0,
    rescheduled: 0,
    cancelled: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    if (data?.items) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const active = data.items.filter((b) => b.status === "created").length;
      const rescheduled = data.items.filter((b) => b.status === "rescheduled").length;
      const cancelled = data.items.filter((b) => b.status === "cancelled").length;
      const thisWeek = data.items.filter((b) => new Date(b.createdAt) > weekAgo).length;

      setStats({
        total: data.total,
        active,
        rescheduled,
        cancelled,
        thisWeek,
      });
    }
  }, [data]);

  // Handle refresh
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  const statConfigs = [
    {
      label: "Total Bookings",
      key: "total",
      icon: Calendar,
      bg: "bg-blue-500",
      color: "text-white",
      href: "#all",
      growth: 10.2,
    },
    {
      label: "Active Bookings",
      key: "active",
      icon: CheckCircle,
      bg: "bg-emerald-500",
      color: "text-white",
      href: "#active",
      growth: 8.5,
    },
    {
      label: "Rescheduled",
      key: "rescheduled",
      icon: CalendarDays,
      bg: "bg-amber-500",
      color: "text-white",
      href: "#rescheduled",
      growth: -1.2,
    },
    {
      label: "This Week",
      key: "thisWeek",
      icon: Activity,
      bg: "bg-indigo-500",
      color: "text-white",
      href: "#weekly",
      growth: 18.3,
    },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setQuery(input);
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track all your meeting and consultation bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            <Activity className="h-3 w-3" />
            <span>Live</span>
          </div>
          <Button size="sm" onClick={handleRefresh} disabled={isLoading} className="gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statConfigs.map((cfg) => {
            const value = stats[cfg.key as keyof BookingStats];
            return (
              <Link
                key={cfg.key}
                href={cfg.href}
                className="group relative overflow-hidden rounded-xl border border-border bg-linear-to-br from-card to-card/80 px-4 py-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${cfg.bg} opacity-0 transition-opacity group-hover:opacity-10`}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}
                  >
                    <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                  </div>
                  <TrendIndicator value={cfg.growth} />
                </div>
                <div className="relative mt-3">
                  <div className="text-2xl font-bold leading-none">{value.toLocaleString()}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{cfg.label}</div>
                </div>
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      )}

      {isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load bookings.
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search name or email…"
              className="w-56 rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
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

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Guest</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Event</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date & Time</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Link</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : !data?.items.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-muted-foreground">
                  {query || status ? "No bookings match your filters." : "No bookings yet."}
                </td>
              </tr>
            ) : (
              data.items.map((b) => (
                <tr key={b._id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {b.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{b.eventType}</td>
                  <td className="px-4 py-3">
                    <div>{format(new Date(b.startTime), "MMM d, yyyy")}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(b.startTime), "h:mm a")} –{" "}
                      {format(new Date(b.endTime), "h:mm a")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                        STATUS_STYLES[b.status] ?? "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.status === "created" ? "Active" : b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.meetingLink ? (
                      <a
                        href={b.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:underline"
                      >
                        Join <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
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

export default function BookingsPage() {
  return (
    <Suspense>
      <BookingsContent />
    </Suspense>
  );
}
