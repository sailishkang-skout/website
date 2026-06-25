import mongoose, { Schema, Model } from "mongoose";

interface IContent {
  pageId: string;
  data: Record<string, unknown>;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>({
  pageId: { type: String, required: true, unique: true, index: true },
  data: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", contentSchema);
