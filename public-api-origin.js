/**
 * PAPI-001: where www.skoutai.io/api/public/* is sent.
 *
 * The public API is served by the Skout API service, not by this website. Next applies this as a
 * `beforeFiles` external rewrite, so src/app/api routes never match these paths, and src/middleware.ts
 * only runs on /admin.
 *
 * Origin order: PUBLIC_API_ORIGIN, then NEXT_PUBLIC_WORKSPACE_URL (the same host /app is proxied to,
 * where Caddy sends /api/* to the API). A skoutai.io value is ignored, so the rewrite can't loop back to www.
 */
function resolvePublicApiOrigin(env = process.env) {
  for (const raw of [env.PUBLIC_API_ORIGIN, env.NEXT_PUBLIC_WORKSPACE_URL]) {
    const value = String(raw ?? "").trim();
    if (!/^https:\/\//i.test(value)) continue;
    try {
      const url = new URL(value);
      if (/(^|\.)skoutai\.io$/i.test(url.hostname)) continue;
      return url.origin;
    } catch {
      // try the next one
    }
  }
  return null;
}

function publicApiRewrites(env = process.env) {
  const origin = resolvePublicApiOrigin(env);
  if (!origin) return [];
  return [{ source: "/api/public/:path*", destination: `${origin}/api/public/:path*` }];
}

module.exports = { resolvePublicApiOrigin, publicApiRewrites };
