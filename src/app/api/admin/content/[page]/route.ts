import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { defaultContent } from "@/lib/content/defaults";
import { PRODUCTS_DATA } from "@/lib/productData";

const CORE_PAGES = [
  "home",
  "about",
  "features",
  "pricing",
  "solutions",
  "integrations",
  "resources",
];
const PRODUCT_SLUGS = Object.keys(PRODUCTS_DATA);
const VALID_PAGES = [...CORE_PAGES, ...PRODUCT_SLUGS];

// Generate simple ETag from data + updatedAt for caching
function generateETag(data: unknown, updatedAt: Date): string {
  const str = JSON.stringify(data) + updatedAt.toISOString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `"${hash.toString(16)}"`;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!VALID_PAGES.includes(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 404 });
  }

  await connectDB();
  const doc = await Content.findOne({ pageId: page }).lean();
  const pageData = (doc?.data ?? defaultContent[page] ?? {}) as Record<string, unknown>;
  const updatedAt = doc?.updatedAt ?? new Date(); // Use default if no doc (first load)

  // Generate ETag and get client's if-none-match header
  const etag = generateETag(pageData, updatedAt);
  const ifNoneMatch = req.headers.get("if-none-match");

  // If content hasn't changed, return 304 to save bandwidth!
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304 });
  }

  // Add proper caching headers: cache for 5 minutes, stale-while-revalidate
  const headers = new Headers();
  headers.set("ETag", etag);
  headers.set("Cache-Control", "public, s-max-age=300, stale-while-revalidate=86400");
  headers.set("Last-Modified", updatedAt.toUTCString());

  return NextResponse.json({ pageId: page, data: pageData }, { headers });
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
