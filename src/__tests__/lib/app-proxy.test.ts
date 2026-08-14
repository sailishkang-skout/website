import { NextRequest } from "next/server";
import { mapAppPathToUpstream, rewriteWorkspaceBody } from "@/lib/app-proxy";

describe("mapAppPathToUpstream", () => {
  it("treats /app as the sign-in page", () => {
    const paths = mapAppPathToUpstream("/app", "");
    expect(paths[0]).toBe("/app/signin");
    expect(paths).toContain("/signin");
  });

  it("maps /app/signin onto Clerk sign-in paths", () => {
    const paths = mapAppPathToUpstream("/app/signin", "");
    expect(paths[0]).toBe("/app/signin");
    expect(paths).toContain("/signin");
  });

  it("forwards dashboard under /app", () => {
    const paths = mapAppPathToUpstream("/app/dashboard", "?x=1");
    expect(paths[0]).toBe("/app/dashboard?x=1");
  });

  it("maps /app/_next chunks onto AWS /_next as a fallback", () => {
    const paths = mapAppPathToUpstream("/app/_next/static/chunks/webpack.js", "");
    expect(paths).toContain("/app/_next/static/chunks/webpack.js");
    expect(paths).toContain("/_next/static/chunks/webpack.js");
  });
});

describe("rewriteWorkspaceBody", () => {
  const request = new NextRequest("https://www.skoutai.io/app/signin");

  it("rewrites webpack publicPath /_next/ to /app/_next/", () => {
    const js = `self.u="/_next/";self.p="/_next/static/chunks/7464.js"`;
    expect(rewriteWorkspaceBody(js, request)).toBe(
      `self.u="/app/_next/";self.p="/app/_next/static/chunks/7464.js"`,
    );
  });

  it("does not double-prefix /app/_next", () => {
    const js = `"/app/_next/static/chunks/webpack.js"`;
    expect(rewriteWorkspaceBody(js, request)).toBe(`"/app/_next/static/chunks/webpack.js"`);
  });
});
