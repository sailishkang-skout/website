import { NextRequest } from "next/server";
import { POST } from "@/app/api/webhooks/cal/route";
import crypto from "crypto";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(undefined) }));

jest.mock("@/lib/models/booking.model", () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Booking = require("@/lib/models/booking.model").default;

const WEBHOOK_SECRET = "test-webhook-secret";

const basePayload = {
  attendees: [{ name: "Alice Smith", email: "alice@example.com" }],
  startTime: "2024-06-01T10:00:00Z",
  endTime: "2024-06-01T10:30:00Z",
  title: "Product Demo",
  videoCallData: { link: "https://meet.example.com/abc" },
};

function makeBody(triggerEvent: string, payload = basePayload) {
  return JSON.stringify({ triggerEvent, payload });
}

function makeRequest(body: string, signature?: string, secret?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (signature !== undefined) {
    headers["x-cal-signature-256"] = signature;
  } else if (secret) {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(body);
    headers["x-cal-signature-256"] = hmac.digest("hex");
  }

  return new NextRequest("http://localhost/api/webhooks/cal", {
    method: "POST",
    body,
    headers,
  });
}

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...ORIGINAL_ENV, CAL_WEBHOOK_SECRET: WEBHOOK_SECRET };
  (Booking.create as jest.Mock).mockResolvedValue({});
  (Booking.findOneAndUpdate as jest.Mock).mockResolvedValue({});
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

describe("POST /api/webhooks/cal", () => {
  describe("BOOKING_CREATED", () => {
    it("creates a booking record and returns success", async () => {
      const body = makeBody("BOOKING_CREATED");
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(Booking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Alice Smith",
          email: "alice@example.com",
          status: "created",
          eventType: "Product Demo",
          meetingLink: "https://meet.example.com/abc",
        }),
      );
    });
  });

  describe("BOOKING_CANCELLED", () => {
    it("updates booking status to cancelled", async () => {
      const body = makeBody("BOOKING_CANCELLED");
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(Booking.findOneAndUpdate).toHaveBeenCalledWith(
        { email: "alice@example.com", startTime: expect.any(Date) },
        expect.objectContaining({ status: "cancelled" }),
        { new: true },
      );
    });
  });

  describe("BOOKING_RESCHEDULED", () => {
    it("updates booking status to rescheduled", async () => {
      const body = makeBody("BOOKING_RESCHEDULED");
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(Booking.findOneAndUpdate).toHaveBeenCalledWith(
        { email: "alice@example.com", status: { $ne: "cancelled" } },
        expect.objectContaining({ status: "rescheduled" }),
        { new: true, sort: { createdAt: -1 } },
      );
    });
  });

  describe("Signature verification", () => {
    it("rejects requests with invalid signature", async () => {
      const body = makeBody("BOOKING_CREATED");
      const req = makeRequest(body, "invalid-signature");

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json.error).toMatch(/signature/i);
      expect(Booking.create).not.toHaveBeenCalled();
    });

    it("accepts requests when no secret is configured (no signature check)", async () => {
      delete process.env.CAL_WEBHOOK_SECRET;
      const body = makeBody("BOOKING_CREATED");
      const req = makeRequest(body);

      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(Booking.create).toHaveBeenCalled();
    });

    it("accepts when secret is set and signature matches", async () => {
      const body = makeBody("BOOKING_CREATED");
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);

      expect(res.status).toBe(200);
    });
  });

  describe("Validation", () => {
    it("returns 400 when attendee email is missing", async () => {
      const body = JSON.stringify({
        triggerEvent: "BOOKING_CREATED",
        payload: { attendees: [{ name: "No Email" }], startTime: "2024-01-01T10:00:00Z" },
      });
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBeDefined();
    });

    it("ignores unknown triggerEvent types without creating records", async () => {
      const body = makeBody("BOOKING_UNKNOWN");
      const req = makeRequest(body, undefined, WEBHOOK_SECRET);

      const res = await POST(req);

      expect(res.status).toBe(200);
      expect(Booking.create).not.toHaveBeenCalled();
      expect(Booking.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });
});
