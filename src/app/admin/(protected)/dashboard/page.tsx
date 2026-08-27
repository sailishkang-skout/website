"use client";

export const dynamic = "force-dynamic";

import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  growth?: {
    enquiries: number;
    bookings: number;
    visitors: number;
  };
  series: { date: string; enquiries: number; bookings: number; visitors: number }[];
  statusChart: { name: string; value: number }[];
  sizeChart: { name: string; value: number }[];
  recentActivity?: {
    id: string;
    type: string;
    title: string;
    time: string;
    description: string;
  }[];
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
        <TrendingDown className="h-3 w-3" />
        <span className="text-xs font-medium">{value}%</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-muted-foreground">
      <Minus className="h-3 w-3" />
      <span className="text-xs font-medium">0%</span>
    </span>
  );
}

export default function DashboardPage() {
  const queryClient = useQueryClient();
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

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
  };

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            <Activity className="h-3 w-3" />
            <span>Live</span>
          </div>
          <Button size="sm" onClick={handleRefresh} disabled={isLoading} className="gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {isError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          Failed to load stats — please refresh.
        </p>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {isLoading
          ? Array.from({ length: 7 }).map((_, i) => <StatCardSkeleton key={i} />)
          : STAT_CONFIG.map((cfg) => {
              // Get growth value if available
              const growthKey =
                cfg.key === "totalEnquiries"
                  ? "enquiries"
                  : cfg.key === "totalBookings"
                    ? "bookings"
                    : cfg.key === "uniqueVisitorsToday"
                      ? "visitors"
                      : null;
              const growth = growthKey ? (stats?.growth?.[growthKey] ?? 0) : null;

              return (
                <Link
                  key={cfg.key}
                  href={cfg.href}
                  className="group relative overflow-hidden rounded-xl border border-border bg-linear-to-br from-card to-card/80 px-4 py-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${cfg.bg} opacity-0 transition-opacity group-hover:opacity-50`}
                  />
                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}
                    >
                      <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                    </div>
                    {growth !== null && <TrendIndicator value={growth} />}
                  </div>
                  <div className="relative mt-3">
                    <div className="text-2xl font-bold leading-none">
                      {(stats?.totals[cfg.key] ?? 0).toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{cfg.label}</div>
                  </div>
                  <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
      </div>

      {/* Activity chart */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Activity — last 30 days
            </h2>
          </div>
          {isLoading ? (
            <ChartSkeleton height={280} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={stats?.series ?? []}
                margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
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
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="enquiries"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fill="url(#gradEnq)"
                  name="Enquiries"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradBook)"
                  name="Bookings"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#gradVis)"
                  name="Visitors"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Bottom row: charts + recent activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Booking status donut */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4">
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
        </Card>

        {/* Company size bar */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4">
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
                <BarChart
                  data={stats.sizeChart}
                  margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
                >
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
        </Card>

        {/* Recent Activity */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Recent Activity
            </h2>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="mt-1 h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !stats?.recentActivity?.length ? (
              <div className="flex h-45 items-center justify-center text-xs text-muted-foreground">
                No recent activity
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "enquiry" ? (
                        <MessageSquare className="h-4 w-4 text-primary" />
                      ) : activity.type === "booking" ? (
                        <CalendarDays className="h-4 w-4 text-primary" />
                      ) : (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
