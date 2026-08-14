import { connectDB } from "@/lib/db/connect";
import { Content } from "@/lib/models/content.model";
import { defaultContent } from "./defaults";

export async function getPageContent(pageId: string): Promise<Record<string, unknown>> {
  const defaults = (defaultContent[pageId] ?? {}) as Record<string, unknown>;
  try {
    const conn = await connectDB();
    if (conn) {
      const doc = await Content.findOne({ pageId }).lean();
      if (doc && doc.data) {
        // Deep merge defaults with MongoDB Atlas custom data so no section is ever missing
        return {
          ...defaults,
          ...(doc.data as Record<string, unknown>),
        };
      }
    }
  } catch (e) {
    console.error(`[CMS] Failed to load content for "${pageId}":`, e);
  }
  return defaults;
}


