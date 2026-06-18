import { NextRequest } from "next/server";
import { GET } from "@/app/api/admin/stats/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

jest.mock("@/lib/models/contact.model", () => ({
  __esModule: true,
  default: {
    countDocuments: jest.fn().mockResolvedValue(10),
    aggregate: jest.fn().mockResolvedValue([
      { _id: "11-50", count: 4 },
      { _id: "51-200", count: 3 },
    ]),
  },
}));

jest.mock("@/lib/models/booking.model", () => ({
  __esModule: true,
  default: {
    countDocuments: jest.fn().mockResolvedValue(7),
    aggregate: jest.fn(),
  },
}));

jest.mock("@/lib/models/pageview.model", () => ({
  __esModule: true,
  default: {
    countDocuments: jest.fn().mockResolvedValue(42),
    distinct: jest.fn().mockResolvedValue(["1.2.3.4", "5.6.7.8"]),
    aggregate: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock("@/lib/models/waitlist.model", () => ({
  __esModule: true,
  default: {
    countDocuments: jest.fn().mockResolvedValue(15),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Booking = require("@/lib/models/booking.model").default;

beforeEach(() => {
  jest.clearAllMocks();

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Contact = require("@/lib/models/contact.model").default;
  (Contact.countDocuments as jest.Mock).mockResolvedValue(10);
  (Contact.aggregate as jest.Mock).mockResolvedValue([
    { _id: "11-50", count: 4 },
    { _id: "51-200", count: 3 },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PageView = require("@/lib/models/pageview.model").default;
  (PageView.countDocuments as jest.Mock).mockResolvedValue(42);
  (PageView.distinct as jest.Mock).mockResolvedValue(["1.2.3.4", "5.6.7.8"]);
  (PageView.aggregate as jest.Mock).mockResolvedValue([]);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Waitlist = require("@/lib/models/waitlist.model").default;
  (Waitlist.countDocuments as jest.Mock).mockResolvedValue(15);

  (Booking.countDocuments as jest.Mock).mockResolvedValue(7);
  (Booking.aggregate as jest.Mock)
    .mockResolvedValueOnce([
      { _id: "created", count: 5 },
      { _id: "cancelled", count: 2 },
    ])
    .mockResolvedValueOnce([]); // bookings by day
});

describe("GET /api/admin/stats", () => {
  it("returns correct totals including pageviews, visitors, and waitlist", async () => {
    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.totals).toEqual(
      expect.objectContaining({
        totalEnquiries: 10,
        totalBookings: 7,
        activeBookings: 5,
        cancelledBookings: 2,
        totalPageViews: 42,
        uniqueVisitorsToday: 2,
        totalWaitlist: 15,
      }),
    );
  });

  it("returns a 30-day series with enquiries, bookings, and visitors", async () => {
    const res = await GET();
    const body = await res.json();

    expect(body.series).toHaveLength(30);
    expect(body.series[0]).toHaveProperty("date");
    expect(body.series[0]).toHaveProperty("enquiries");
    expect(body.series[0]).toHaveProperty("bookings");
    expect(body.series[0]).toHaveProperty("visitors");
  });

  it("returns statusChart and sizeChart arrays", async () => {
    const res = await GET();
    const body = await res.json();

    expect(Array.isArray(body.statusChart)).toBe(true);
    expect(Array.isArray(body.sizeChart)).toBe(true);
  });

  it("calculates activeBookings as created + rescheduled count", async () => {
    (Booking.aggregate as jest.Mock)
      .mockReset()
      .mockResolvedValueOnce([
        { _id: "created", count: 3 },
        { _id: "rescheduled", count: 2 },
        { _id: "cancelled", count: 1 },
      ])
      .mockResolvedValueOnce([]);

    const res = await GET();
    const body = await res.json();

    expect(body.totals.activeBookings).toBe(5);
    expect(body.totals.cancelledBookings).toBe(1);
  });

  it("handles empty database gracefully", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Contact = require("@/lib/models/contact.model").default;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const PageView = require("@/lib/models/pageview.model").default;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Waitlist = require("@/lib/models/waitlist.model").default;

    (Contact.countDocuments as jest.Mock).mockResolvedValue(0);
    (Contact.aggregate as jest.Mock).mockResolvedValue([]);
    (Booking.countDocuments as jest.Mock).mockResolvedValue(0);
    (Booking.aggregate as jest.Mock).mockReset().mockResolvedValue([]);
    (PageView.countDocuments as jest.Mock).mockResolvedValue(0);
    (PageView.distinct as jest.Mock).mockResolvedValue([]);
    (PageView.aggregate as jest.Mock).mockResolvedValue([]);
    (Waitlist.countDocuments as jest.Mock).mockResolvedValue(0);

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.totals.totalEnquiries).toBe(0);
    expect(body.totals.totalBookings).toBe(0);
    expect(body.totals.totalPageViews).toBe(0);
    expect(body.totals.uniqueVisitorsToday).toBe(0);
    expect(body.totals.totalWaitlist).toBe(0);
    expect(body.series).toHaveLength(30);
    expect(body.statusChart).toHaveLength(0);
    expect(body.sizeChart).toHaveLength(0);
  });
});
