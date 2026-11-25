/* eslint-disable @typescript-eslint/no-require-imports */
const { publicApiRewrites, resolvePublicApiOrigin } = require("../../../public-api-origin");
const nextConfig = require("../../../next.config");

describe("public API edge rewrite (PAPI-001)", () => {
  it("sends /api/public/* to the API origin", () => {
    expect(publicApiRewrites({ PUBLIC_API_ORIGIN: "https://api-origin.example.com/x" })).toEqual([
      { source: "/api/public/:path*", destination: "https://api-origin.example.com/api/public/:path*" },
    ]);
  });

  it("falls back to the workspace host /app already uses", () => {
    expect(resolvePublicApiOrigin({ NEXT_PUBLIC_WORKSPACE_URL: "https://app-origin.example.com" })).toBe(
      "https://app-origin.example.com",
    );
  });

  it("refuses plain http and skoutai.io origins, so it can't leak keys or loop", () => {
    expect(resolvePublicApiOrigin({ PUBLIC_API_ORIGIN: "http://api-origin.example.com" })).toBeNull();
    expect(resolvePublicApiOrigin({ PUBLIC_API_ORIGIN: "https://www.skoutai.io" })).toBeNull();
    expect(publicApiRewrites({})).toEqual([]);
  });

  it("runs before the site's own routes and keeps the /app proxy", async () => {
    const prev = process.env.PUBLIC_API_ORIGIN;
    process.env.PUBLIC_API_ORIGIN = "https://api-origin.example.com";
    try {
      const rewrites = await nextConfig.rewrites();
      expect(rewrites.beforeFiles[0].source).toBe("/api/public/:path*");
      expect(rewrites.afterFiles.map((r: { source: string }) => r.source)).toEqual(["/app", "/app/:path*"]);
    } finally {
      if (prev === undefined) delete process.env.PUBLIC_API_ORIGIN;
      else process.env.PUBLIC_API_ORIGIN = prev;
    }
  });
});
