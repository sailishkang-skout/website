import { NextRequest } from "next/server";
import { mapAppPathToUpstream, oversizedWorkspaceRedirect, rewriteWorkspaceBody } from "@/lib/app-proxy";

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

describe("oversizedWorkspaceRedirect", () => {
  it("bounces gate URLs that nested a Clerk handshake (HTTP 431)", () => {
    const request = new NextRequest(
      "https://www.skoutai.io/app/gate?next=%2Fapp%2Fgate%3F__clerk_handshake%3DeyJhbGciOiJSUzI1NiJ9.aaa",
    );
    const url = oversizedWorkspaceRedirect(request);
    expect(url).not.toBeNull();
    expect(url?.pathname).toBe("/app/gate");
    expect(url?.searchParams.get("next")).toBe("/signin");
    expect(url?.search ?? "").not.toContain("clerk_handshake");
  });

  it("leaves a normal Clerk handshake on sign-in alone", () => {
    const request = new NextRequest(
      "https://www.skoutai.io/app/signin?__clerk_handshake=eyJhbGciOiJSUzI1NiJ9.aaa",
    );
    expect(oversizedWorkspaceRedirect(request)).toBeNull();
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
