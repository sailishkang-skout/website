import { NextRequest } from "next/server";
import { proxyWorkspaceApp } from "@/lib/app-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { path?: string[] } };

async function handle(request: NextRequest, ctx: Ctx) {
  const rest = ctx.params.path?.join("/") ?? "";
  const pathname = rest ? `/app/${rest}` : "/app";
  return proxyWorkspaceApp(request, pathname);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export const HEAD = handle;
