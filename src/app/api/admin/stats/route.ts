import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Contact from "@/lib/models/contact.model";
import Booking from "@/lib/models/booking.model";
import PageView from "@/lib/models/pageview.model";
import Waitlist from "@/lib/models/waitlist.model";
import { subDays, startOfDay, format } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET() {
  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json({
      totals: {
        totalEnquiries: 0,
        totalBookings: 0,
        activeBookings: 0,
        cancelledBookings: 0,
        totalPageViews: 0,
        uniqueVisitorsToday: 0,
        totalWaitlist: 0,
      },
      series: Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i);
        return {
          date: format(date, "MMM d"),
          enquiries: 0,
          bookings: 0,
          visitors: 0,
        };
      }),
      statusChart: [],
      sizeChart: [],
    });
  }

  const since30 = subDays(new Date(), 29);
  const todayStart = startOfDay(new Date());

  const [
    totalEnquiries,
    totalBookings,
    bookingsByStatus,
    totalPageViews,
    uniqueVisitorsToday,
    totalWaitlist,
  ] = await Promise.all([
    Contact.countDocuments(),
    Booking.countDocuments(),
    Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    PageView.countDocuments(),
    PageView.distinct("ip", { createdAt: { $gte: todayStart } }).then((ips) => ips.length),
    Waitlist.countDocuments(),
  ]);

  const activeBookings =
    (bookingsByStatus.find((b: { _id: string }) => b._id === "created")?.count ?? 0) +
    (bookingsByStatus.find((b: { _id: string }) => b._id === "rescheduled")?.count ?? 0);
  const cancelledBookings =
    bookingsByStatus.find((b: { _id: string }) => b._id === "cancelled")?.count ?? 0;

  // Last 30 days daily counts
  const [enquiriesByDay, bookingsByDay, visitorsByDay] = await Promise.all([
    Contact.aggregate([
      { $match: { createdAt: { $gte: since30 } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]),
    Booking.aggregate([
      { $match: { createdAt: { $gte: since30 } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]),
    // Unique IPs per day
    PageView.aggregate([
      { $match: { createdAt: { $gte: since30 } } },
      {
        $group: {
          _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, ip: "$ip" },
        },
      },
      { $group: { _id: "$_id.day", count: { $sum: 1 } } },
    ]),
  ]);

  // Build full 30-day series
  const toMap = (arr: { _id: string; count: number }[]) =>
    Object.fromEntries(arr.map((d) => [d._id, d.count]));

  const enquiryMap = toMap(enquiriesByDay);
  const bookingMap = toMap(bookingsByDay);
  const visitorMap = toMap(visitorsByDay);

  const series = Array.from({ length: 30 }, (_, i) => {
    const raw = format(subDays(new Date(), 29 - i), "yyyy-MM-dd");
    return {
      date: format(subDays(new Date(), 29 - i), "MMM d"),
      enquiries: enquiryMap[raw] ?? 0,
      bookings: bookingMap[raw] ?? 0,
      visitors: visitorMap[raw] ?? 0,
    };
  });

  // Booking status pie
  const statusChart = bookingsByStatus.map((b: { _id: string; count: number }) => ({
    name: b._id,
    value: b.count,
  }));

  // Company size distribution
  const sizeAgg = await Contact.aggregate([
    { $group: { _id: "$size", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  const sizeChart = sizeAgg.map((s: { _id: string; count: number }) => ({
    name: s._id || "Unknown",
    value: s.count,
  }));

  return NextResponse.json({
    totals: {
      totalEnquiries,
      totalBookings,
      activeBookings,
      cancelledBookings,
      totalPageViews,
      uniqueVisitorsToday,
      totalWaitlist,
    },
    series,
    statusChart,
    sizeChart,
  });
}
