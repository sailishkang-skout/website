import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

const ADMIN_SECRET = "test-secret-abc";

function makeRequest(path: string, cookieToken?: string) {
  const req = new NextRequest(`http://localhost${path}`);
  if (cookieToken) {
    req.cookies.set("admin_token", cookieToken);
  }
  return req;
}

describe("Admin middleware", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, ADMIN_SECRET };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it("redirects unauthenticated requests to /admin/login", () => {
    const req = makeRequest("/admin/dashboard");
    const res = middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin/login");
  });

  it("redirects when token is wrong", () => {
    const req = makeRequest("/admin/dashboard", "wrong-token");
    const res = middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/admin/login");
  });

  it("allows through requests with the correct token", () => {
    const req = makeRequest("/admin/dashboard", ADMIN_SECRET);
    const res = middleware(req);

    expect(res.status).not.toBe(307);
  });

  it("always allows /admin/login through (no token required)", () => {
    const req = makeRequest("/admin/login");
    const res = middleware(req);

    expect(res.status).not.toBe(307);
  });

  it("protects /admin/enquiries without a token", () => {
    const req = makeRequest("/admin/enquiries");
    const res = middleware(req);

    expect(res.status).toBe(307);
  });

  it("protects /admin/bookings without a token", () => {
    const req = makeRequest("/admin/bookings");
    const res = middleware(req);

    expect(res.status).toBe(307);
  });

  it("allows /admin/bookings with correct token", () => {
    const req = makeRequest("/admin/bookings", ADMIN_SECRET);
    const res = middleware(req);

    expect(res.status).not.toBe(307);
  });
});
