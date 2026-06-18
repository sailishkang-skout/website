import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IWaitlist extends Document {
  email: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: "waitlist", // match the existing raw-driver collection
  },
);

const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist ?? mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);

export default Waitlist;
