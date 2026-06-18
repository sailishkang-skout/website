import { NextRequest } from "next/server";
import { POST, DELETE } from "@/app/api/admin/auth/route";

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV, ADMIN_SECRET: "test-secret-123" };
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

describe("POST /api/admin/auth", () => {
  it("returns 200 and sets cookie when password is correct", async () => {
    const req = new NextRequest("http://localhost/api/admin/auth", {
      method: "POST",
      body: JSON.stringify({ password: "test-secret-123" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(res.headers.get("set-cookie")).toContain("admin_token");
  });

  it("returns 401 when password is wrong", async () => {
    const req = new NextRequest("http://localhost/api/admin/auth", {
      method: "POST",
      body: JSON.stringify({ password: "wrong-password" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body.error).toBeDefined();
  });

  it("returns 401 when ADMIN_SECRET is not set", async () => {
    delete process.env.ADMIN_SECRET;

    const req = new NextRequest("http://localhost/api/admin/auth", {
      method: "POST",
      body: JSON.stringify({ password: "anything" }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
  });
});

describe("DELETE /api/admin/auth", () => {
  it("returns 200 and clears the admin_token cookie", async () => {
    const res = await DELETE();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("admin_token");
    expect(cookie).toMatch(/max-age=0|expires=.*1970/i);
  });
});
