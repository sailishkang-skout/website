import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IPageView extends Document {
  ip: string;
  path: string;
  userAgent: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    ip: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    userAgent: { type: String, trim: true, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

// Index for fast aggregation queries
PageViewSchema.index({ createdAt: 1 });
PageViewSchema.index({ ip: 1, createdAt: 1 });

const PageView: Model<IPageView> =
  mongoose.models.PageView ?? mongoose.model<IPageView>("PageView", PageViewSchema);

export default PageView;
