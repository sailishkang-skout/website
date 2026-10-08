import { WORKSPACE_FALLBACK_ORIGIN, resolveWorkspaceOrigin } from "@/lib/constants";

describe("resolveWorkspaceOrigin", () => {
  it("accepts a skoutai.io subdomain as the workspace origin (stg.skoutai.io used to be swapped for the AWS address)", () => {
    expect(resolveWorkspaceOrigin("https://stg.skoutai.io")).toBe("https://stg.skoutai.io");
    expect(resolveWorkspaceOrigin("https://app.skoutai.io/anything?x=1")).toBe(
      "https://app.skoutai.io",
    );
  });

  it("accepts a non-skoutai.io origin and returns just the origin", () => {
    expect(resolveWorkspaceOrigin("https://workspace.example.com/app/")).toBe(
      "https://workspace.example.com",
    );
  });

  it("falls back when the value is missing, blank, or not an http(s) URL", () => {
    expect(resolveWorkspaceOrigin(undefined)).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("   ")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("not a url")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("ftp://stg.skoutai.io")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("http://")).toBe(WORKSPACE_FALLBACK_ORIGIN);
  });

  it("refuses the marketing site itself, which would make /app proxy to itself in a loop", () => {
    expect(resolveWorkspaceOrigin("https://skoutai.io")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("https://www.skoutai.io/app")).toBe(WORKSPACE_FALLBACK_ORIGIN);
    expect(resolveWorkspaceOrigin("https://WWW.SkoutAI.io")).toBe(WORKSPACE_FALLBACK_ORIGIN);
  });

  it("never falls back to the shut-down AWS address", () => {
    expect(WORKSPACE_FALLBACK_ORIGIN).not.toMatch(/amazonaws|execute-api/i);
    expect(WORKSPACE_FALLBACK_ORIGIN).toBe("https://stg.skoutai.io");
  });
});
