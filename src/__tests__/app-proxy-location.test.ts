import type { NextRequest } from "next/server";
import { rewriteLocation } from "@/lib/app-proxy";

const request = { nextUrl: { origin: "https://www.skoutai.io" } } as unknown as NextRequest;

describe("rewriteLocation", () => {
  it("keeps a single /app in the URL-encoded Google redirect_uri (was /app/app, a redirect_uri_mismatch)", () => {
    const upstream =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=abc&redirect_uri=" +
      encodeURIComponent("https://stg.skoutai.io/app/api/auth/google/callback");

    const out = rewriteLocation(upstream, request);

    expect(new URL(out).searchParams.get("redirect_uri")).toBe(
      "https://www.skoutai.io/app/api/auth/google/callback",
    );
  });

  it("still maps a plain upstream redirect onto the public /app path", () => {
    expect(rewriteLocation("https://stg.skoutai.io/app/dashboard", request)).toBe(
      "https://www.skoutai.io/app/dashboard",
    );
  });
});
