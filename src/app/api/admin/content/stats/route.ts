import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { PRODUCTS_DATA } from "@/lib/productData";

const corePages = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "solutions", label: "Solutions" },
  { id: "integrations", label: "Integrations" },
  { id: "resources", label: "Resources" },
];

const productPages = Object.values(PRODUCTS_DATA).map((product) => ({
  id: product.slug,
  label: product.title,
}));

const pages = [...corePages, ...productPages];

export async function GET() {
  try {
    await connectDB();

    const pageIds = pages.map((p) => p.id);
    const docs = await Content.find({ pageId: { $in: pageIds } })
      .select("pageId updatedAt")
      .lean();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const editedPages = docs.length;
    const usingDefaults = pages.length - editedPages;
    const recentlyUpdated = docs.filter((d) => new Date(d.updatedAt) > weekAgo).length;

    return NextResponse.json({
      updates: docs.map((d) => ({
        pageId: d.pageId,
        updatedAt: d.updatedAt,
      })),
      stats: {
        totalPages: pages.length,
        editedPages,
        usingDefaults,
        recentlyUpdated,
      },
    });
  } catch (error) {
    console.error("Error fetching content stats:", error);
    return NextResponse.json({ error: "Failed to fetch content stats" }, { status: 500 });
  }
}
