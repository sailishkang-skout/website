/**
 * Where the product app (served under /app) lives. Used when NEXT_PUBLIC_WORKSPACE_URL is missing or unusable.
 * This replaces the old AWS API Gateway address; AWS has been shut off.
 */
export const WORKSPACE_FALLBACK_ORIGIN = "https://stg.skoutai.io";

/** Hosts that would make /app proxy back to this site (a loop). Other skoutai.io subdomains are fine. */
const SELF_HOSTS = new Set(["skoutai.io", "www.skoutai.io"]);

export function resolveWorkspaceOrigin(raw: string | undefined): string {
  const value = String(raw ?? "").trim();
  if (!/^https?:\/\//i.test(value)) return WORKSPACE_FALLBACK_ORIGIN;
  try {
    const url = new URL(value);
    if (SELF_HOSTS.has(url.hostname.toLowerCase())) return WORKSPACE_FALLBACK_ORIGIN;
    return url.origin;
  } catch {
    return WORKSPACE_FALLBACK_ORIGIN;
  }
}

/** Product UI is served under /app on the marketing domain, proxied to the workspace origin. */
export const WORKSPACE_ORIGIN = resolveWorkspaceOrigin(process.env.NEXT_PUBLIC_WORKSPACE_URL);

export const APP_PATH = "/app";

export const LOGIN_URL = "/app/signin";

export const WORKSPACE_URL = "/app";
