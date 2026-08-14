import { NextRequest } from "next/server";
import { proxyWorkspaceApp } from "@/lib/app-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { path?: string[] } | Promise<{ path?: string[] }> };

async function handle(request: NextRequest, ctx: Ctx) {
  try {
    const params = await ctx.params;
    const rest = params.path?.join("/") ?? "";
    const pathname = rest ? `/app/${rest}` : "/app";
    return await proxyWorkspaceApp(request, pathname);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Workspace proxy failed";
    return Response.json({ message }, { status: 502 });
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export const HEAD = handle;
