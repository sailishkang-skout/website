"use client";

import { Suspense, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Mail } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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

function BookingsContent() {
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
          <h1 className="text-xl font-semibold">Bookings</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {isLoading ? (
              <Skeleton className="inline-block h-3.5 w-16" />
            ) : (
              `${data?.total ?? 0} total`
            )}
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-xs text-muted-foreground animate-pulse">Refreshing…</span>
        )}
      </div>

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
