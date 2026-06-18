import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  company: string;
  size: string;
  message: string;
  repliedAt?: Date | null;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    repliedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Contact: Model<IContact> =
  mongoose.models.Contact ?? mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
