"use client";

export const dynamic = "force-dynamic";

import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  MessageSquare,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  ArrowUpRight,
  Eye,
  Users,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  totals: {
    totalEnquiries: number;
    totalBookings: number;
    activeBookings: number;
    cancelledBookings: number;
    totalPageViews: number;
    uniqueVisitorsToday: number;
    totalWaitlist: number;
  };
  series: { date: string; enquiries: number; bookings: number; visitors: number }[];
  statusChart: { name: string; value: number }[];
  sizeChart: { name: string; value: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  created: "#4f46e5",
  rescheduled: "#f59e0b",
  cancelled: "#ef4444",
};
const PIE_FALLBACK = ["#4f46e5", "#f59e0b", "#ef4444", "#10b981"];

const STAT_CONFIG = [
  {
    key: "totalEnquiries" as const,
    label: "Enquiries",
    icon: MessageSquare,
    href: "/admin/enquiries",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    key: "totalBookings" as const,
    label: "Total Bookings",
    icon: CalendarDays,
    href: "/admin/bookings",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    key: "activeBookings" as const,
    label: "Active",
    icon: CalendarCheck,
    href: "/admin/bookings?status=created",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    key: "cancelledBookings" as const,
    label: "Cancelled",
    icon: CalendarX,
    href: "/admin/bookings?status=cancelled",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    key: "totalPageViews" as const,
    label: "Page Views",
    icon: Eye,
    href: "/admin/dashboard",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    key: "uniqueVisitorsToday" as const,
    label: "Visitors Today",
    icon: Users,
    href: "/admin/dashboard",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    key: "totalWaitlist" as const,
    label: "Waitlist",
    icon: Bell,
    href: "/admin/waitlist",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const TOOLTIP_STYLE = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,.06)",
};

function StatCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="mt-1 h-3 w-20" />
      </div>
    </div>
  );
}

function ChartSkeleton({ height }: { height: number }) {
  return <Skeleton className="w-full rounded-lg" style={{ height }} />;
}

export default function DashboardPage() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<Stats>({
    queryKey: ["admin-stats"],
    queryFn: () => fetch("/api/admin/stats").then((r) => r.json()),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Dashboard</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">Enquiries &amp; bookings overview</p>
        </div>
      </div>

      {isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          Failed to load stats — please refresh.
        </p>
      )}

      {/* Compact stat strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {isLoading
          ? Array.from({ length: 7 }).map((_, i) => <StatCardSkeleton key={i} />)
          : STAT_CONFIG.map((cfg) => (
              <Link
                key={cfg.key}
                href={cfg.href}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}
                >
                  <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-bold leading-none">
                    {(stats?.totals[cfg.key] ?? 0).toLocaleString()}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{cfg.label}</div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
      </div>

      {/* Activity chart */}
      <div className="rounded-xl border border-border bg-card px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Activity — last 30 days
          </h2>
        </div>
        {isLoading ? (
          <ChartSkeleton height={200} />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={stats?.series ?? []}
              margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
            >
              <defs>
                <linearGradient id="gradEnq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={5}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="enquiries"
                stroke="#4f46e5"
                strokeWidth={1.5}
                fill="url(#gradEnq)"
                name="Enquiries"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#10b981"
                strokeWidth={1.5}
                fill="url(#gradBook)"
                name="Bookings"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#f97316"
                strokeWidth={1.5}
                fill="url(#gradVis)"
                name="Visitors"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bottom row: pie + bar */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Booking status donut */}
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Booking Status
          </h2>
          {isLoading ? (
            <ChartSkeleton height={180} />
          ) : !stats?.statusChart.length ? (
            <div className="flex h-45 items-center justify-center text-xs text-muted-foreground">
              No bookings yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={stats.statusChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {stats.statusChart.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] ?? PIE_FALLBACK[i % PIE_FALLBACK.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11 }}
                  formatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Company size bar */}
        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Enquiries by Company Size
          </h2>
          {isLoading ? (
            <ChartSkeleton height={180} />
          ) : !stats?.sizeChart.length ? (
            <div className="flex h-45 items-center justify-center text-xs text-muted-foreground">
              No enquiries yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={stats.sizeChart} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="value" fill="#4f46e5" radius={[3, 3, 0, 0]} name="Enquiries" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
