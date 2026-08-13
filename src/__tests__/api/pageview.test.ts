import { NextRequest } from "next/server";
import { POST } from "@/app/api/analytics/pageview/route";

jest.mock("@/lib/db/connect", () => ({ connectDB: jest.fn().mockResolvedValue(true) }));

jest.mock("@/lib/models/pageview.model", () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PageView = require("@/lib/models/pageview.model").default;

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/analytics/pageview", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  (PageView.create as jest.Mock).mockResolvedValue({});
});

describe("POST /api/analytics/pageview", () => {
  it("saves pageview and returns ok: true", async () => {
    const req = makeRequest({ path: "/home" });
    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(PageView.create).toHaveBeenCalledTimes(1);
    expect(PageView.create).toHaveBeenCalledWith(
      expect.objectContaining({ path: "/home", ip: "127.0.0.1" }),
    );
  });

  it("extracts IP from x-forwarded-for header", async () => {
    const req = makeRequest({ path: "/contact" }, { "x-forwarded-for": "203.0.113.5, 10.0.0.1" });
    await POST(req);

    expect(PageView.create).toHaveBeenCalledWith(expect.objectContaining({ ip: "203.0.113.5" }));
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", async () => {
    const req = makeRequest({ path: "/about" }, { "x-real-ip": "198.51.100.9" });
    await POST(req);

    expect(PageView.create).toHaveBeenCalledWith(expect.objectContaining({ ip: "198.51.100.9" }));
  });

  it("defaults IP to 127.0.0.1 when no headers present", async () => {
    const req = makeRequest({ path: "/" });
    await POST(req);

    expect(PageView.create).toHaveBeenCalledWith(expect.objectContaining({ ip: "127.0.0.1" }));
  });

  it("returns 400 when path is missing", async () => {
    const req = makeRequest({});
    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBeDefined();
    expect(PageView.create).not.toHaveBeenCalled();
  });

  it("returns 400 when path is not a string", async () => {
    const req = makeRequest({ path: 42 });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(PageView.create).not.toHaveBeenCalled();
  });

  it("returns 200 when database write fails", async () => {
    (PageView.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const req = makeRequest({ path: "/crash" });
    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
  });
});
