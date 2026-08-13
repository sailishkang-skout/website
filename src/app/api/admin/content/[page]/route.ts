import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { defaultContent } from "@/lib/content/defaults";

const VALID_PAGES = ["home", "about", "features", "pricing", "solutions", "integrations"];

export async function GET(_req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!VALID_PAGES.includes(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  await connectDB();
  const doc = await Content.findOne({ pageId: page }).lean();
  const data = (doc?.data ?? defaultContent[page] ?? {}) as Record<string, unknown>;

  return NextResponse.json({ pageId: page, data });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!VALID_PAGES.includes(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  let body: { data: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "Missing data field" }, { status: 422 });
  }

  await connectDB();
  await Content.findOneAndUpdate(
    { pageId: page },
    { data: body.data, updatedAt: new Date() },
    { upsert: true, new: true },
  );

  return NextResponse.json({ success: true });
}
