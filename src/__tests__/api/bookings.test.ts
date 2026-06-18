import { NextRequest } from "next/server";
import { GET } from "@/app/api/admin/bookings/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

const mockBookings = [
  {
    _id: "b1",
    name: "Carol White",
    email: "carol@example.com",
    eventType: "Demo",
    startTime: new Date("2024-03-15T10:00:00Z"),
    endTime: new Date("2024-03-15T10:30:00Z"),
    meetingLink: "https://meet.example.com/abc",
    status: "created",
    createdAt: new Date(),
  },
  {
    _id: "b2",
    name: "Dan Brown",
    email: "dan@example.com",
    eventType: "Demo",
    startTime: new Date("2024-03-16T14:00:00Z"),
    endTime: new Date("2024-03-16T14:30:00Z"),
    meetingLink: "",
    status: "cancelled",
    createdAt: new Date(),
  },
];

function makeChain(result: unknown[]) {
  const chain: {
    sort: () => typeof chain;
    skip: () => typeof chain;
    limit: () => typeof chain;
    lean: () => Promise<unknown[]>;
  } = {
    sort: () => chain,
    skip: () => chain,
    limit: () => chain,
    lean: () => Promise.resolve(result),
  };
  return chain;
}

jest.mock("@/lib/models/booking.model", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    countDocuments: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Booking = require("@/lib/models/booking.model").default;

beforeEach(() => {
  jest.clearAllMocks();
  (Booking.find as jest.Mock).mockReturnValue(makeChain(mockBookings));
  (Booking.countDocuments as jest.Mock).mockResolvedValue(mockBookings.length);
});

describe("GET /api/admin/bookings", () => {
  it("returns paginated bookings with correct structure", async () => {
    const req = new NextRequest("http://localhost/api/admin/bookings");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.items).toHaveLength(2);
    expect(body.total).toBe(2);
    expect(body.page).toBe(1);
  });

  it("filters by status when provided", async () => {
    (Booking.find as jest.Mock).mockReturnValue(makeChain([mockBookings[1]]));
    (Booking.countDocuments as jest.Mock).mockResolvedValue(1);

    const req = new NextRequest("http://localhost/api/admin/bookings?status=cancelled");
    const res = await GET(req);
    const body = await res.json();

    expect(Booking.find).toHaveBeenCalledWith(expect.objectContaining({ status: "cancelled" }));
    expect(body.items).toHaveLength(1);
  });

  it("applies search filter for name and email", async () => {
    const req = new NextRequest("http://localhost/api/admin/bookings?q=carol");
    await GET(req);

    expect(Booking.find).toHaveBeenCalledWith(expect.objectContaining({ $or: expect.any(Array) }));
  });

  it("combines search and status filter", async () => {
    const req = new NextRequest("http://localhost/api/admin/bookings?q=carol&status=created");
    await GET(req);

    expect(Booking.find).toHaveBeenCalledWith(
      expect.objectContaining({ $or: expect.any(Array), status: "created" }),
    );
  });

  it("returns empty list when no bookings match", async () => {
    (Booking.find as jest.Mock).mockReturnValue(makeChain([]));
    (Booking.countDocuments as jest.Mock).mockResolvedValue(0);

    const req = new NextRequest("http://localhost/api/admin/bookings");
    const res = await GET(req);
    const body = await res.json();

    expect(body.items).toHaveLength(0);
    expect(body.total).toBe(0);
  });

  it("calculates pages correctly", async () => {
    (Booking.countDocuments as jest.Mock).mockResolvedValue(45);

    const req = new NextRequest("http://localhost/api/admin/bookings");
    const res = await GET(req);
    const body = await res.json();

    expect(body.pages).toBe(3); // ceil(45/20)
  });
});
