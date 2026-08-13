import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { PageView } from "@/lib/models/pageview.model";

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "127.0.0.1"
  );
}

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") ?? "";

    try {
      const conn = await connectDB();
      if (conn) {
        await PageView.create({ ip, path, userAgent });
      }
    } catch (dbErr) {
      // Gracefully ignore DB connection failure for pageview tracking
      console.warn("[analytics/pageview] DB offline, tracking skipped silently.");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, fallback: true });
  }
}
