import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { defaultContent } from "./defaults";

export async function getPageContent(pageId: string): Promise<Record<string, unknown>> {
  try {
    await connectDB();
    const doc = await Content.findOne({ pageId }).lean();
    if (doc && doc.data) return doc.data as Record<string, unknown>;
  } catch (e) {
    console.error(`[CMS] Failed to load content for "${pageId}":`, e);
  }
  return (defaultContent[pageId] ?? {}) as Record<string, unknown>;
}
