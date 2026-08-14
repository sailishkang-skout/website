import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { WORKSPACE_ORIGIN } from "@/lib/constants";

const WORKSPACE = WORKSPACE_ORIGIN.replace(/\/$/, "");

function publicOrigin(request: NextRequest): string {
  return request.nextUrl.origin.replace(/\/$/, "");
}

/** Map marketing /app URLs onto the current web service (with or without basePath). */
export function mapAppPathToUpstream(pathname: string, search: string): string[] {
  const rest = pathname === "/app" || pathname === "/app/" ? "/" : pathname.replace(/^\/app/, "") || "/";
  const q = search || "";
  const candidates: string[] = [];

  if (rest === "/" || rest === "") {
    candidates.push(`/app/signin${q}`, `/signin${q}`, `/sign-in${q}`, `/app${q}`);
    return candidates;
  }

  if (rest.startsWith("/signin") || rest.startsWith("/singin")) {
    candidates.push(`/app/signin${q}`, `/signin${q}`, `/sign-in${q}`);
    return candidates;
  }

  if (rest.startsWith("/login")) {
    candidates.push(`/app${rest}${q}`, `/sign-in${rest.slice("/login".length)}${q}`, `/login${rest.slice("/login".length)}${q}`);
    return candidates;
  }

  if (rest.startsWith("/sign-in")) {
    candidates.push(`/app/signin${q}`, `/signin${q}`, `/sign-in${rest.slice("/sign-in".length)}${q}`);
    return candidates;
  }

  candidates.push(`/app${rest}${q}`, `${rest}${q}`);
  return candidates;
}

export function rewriteLocation(location: string, request: NextRequest): string {
  const pub = publicOrigin(request);
  let value = location;

  value = value.split(WORKSPACE).join(`${pub}/app`);
  value = value.split(encodeURIComponent(WORKSPACE)).join(encodeURIComponent(`${pub}/app`));
  value = value.replace(/\/app\/app/g, "/app");
  value = value.replace(/\/app\/sign-in/g, "/app/signin");
  value = value.replace(/\/app\/login/g, "/app/signin");

  if (value.startsWith("/")) {
    if (value.startsWith("/sign-in")) {
      value = `${pub}/app/signin${value.slice("/sign-in".length)}`;
    } else if (value.startsWith("/login")) {
      value = `${pub}/app/signin${value.slice("/login".length)}`;
    } else if (!value.startsWith("/app")) {
      value = `${pub}/app${value}`;
    } else {
      value = `${pub}${value}`;
    }
  }

  return value;
}

function rewriteHtml(html: string, request: NextRequest): string {
  const pub = publicOrigin(request);
  let out = html;
  out = out.split(WORKSPACE).join(`${pub}/app`);
  out = out.replace(/\/app\/app/g, "/app");
  out = out.replace(/(src|href|action)=(["'])\/_next/g, `$1=$2/app/_next`);
  out = out.replace(/(src|href|action)=(["'])\/__clerk/g, `$1=$2/app/__clerk`);
  out = out.replace(/(src|href|action)=(["'])\/sign-in/g, `$1=$2/app/signin`);
  out = out.replace(/(src|href|action)=(["'])\/login/g, `$1=$2/app/signin`);
  return out;
}

function rewriteSetCookie(cookie: string): string {
  return cookie.replace(/;\s*Domain=[^;]*/gi, "");
}

const DROP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "accept-encoding",
  "content-encoding",
  "content-length",
]);

function upstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!DROP_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });
  headers.set("x-forwarded-host", request.nextUrl.host);
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", "") || "https");
  headers.set("x-skout-public-origin", publicOrigin(request));
  return headers;
}

export async function proxyWorkspaceApp(
  request: NextRequest,
  pathnameOverride?: string
): Promise<NextResponse> {
  const origin = WORKSPACE.replace(/\/$/, "");
  if (!origin || /skoutai\.io$/i.test(new URL(origin).host)) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_WORKSPACE_URL must be the AWS origin, not www.skoutai.io" },
      { status: 502 }
    );
  }

  const pathname = pathnameOverride ?? request.nextUrl.pathname;
  const candidates = mapAppPathToUpstream(pathname, request.nextUrl.search);
  const headers = upstreamHeaders(request);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? await request.arrayBuffer() : undefined;

  let upstream: Response | null = null;
  let lastError: unknown;
  for (const path of candidates) {
    const dest = `${origin}${path.startsWith("/") ? path : `/${path}`}`;
    try {
      const res = await fetch(dest, {
        method: request.method,
        headers,
        body: body ? body.slice(0) : undefined,
        redirect: "manual",
      });
      if (res.status !== 404 || path === candidates[candidates.length - 1]) {
        upstream = res;
        break;
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!upstream) {
    const detail = lastError instanceof Error ? lastError.message : "Workspace unavailable";
    return NextResponse.json({ message: detail }, { status: 502 });
  }

  const outHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "content-encoding" || lower === "content-length" || lower === "transfer-encoding") return;
    if (lower === "location") {
      outHeaders.set("location", rewriteLocation(value, request));
      return;
    }
    if (lower === "set-cookie") {
      outHeaders.append("set-cookie", rewriteSetCookie(value));
      return;
    }
    outHeaders.set(key, value);
  });

  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("text/html") || contentType.includes("javascript") || contentType.includes("json")) {
    const text = await upstream.text();
    const rewritten = contentType.includes("text/html") ? rewriteHtml(text, request) : text.split(WORKSPACE).join(`${publicOrigin(request)}/app`);
    return new NextResponse(rewritten, { status: upstream.status, headers: outHeaders });
  }

  return new NextResponse(upstream.body, { status: upstream.status, headers: outHeaders });
}
