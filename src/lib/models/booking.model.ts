import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  startTime: Date;
  endTime: Date;
  eventType: string;
  meetingLink: string;
  status: string;
  payload: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    eventType: { type: String, required: true, default: "Demo" },
    meetingLink: { type: String, trim: true, default: "" },
    status: { type: String, default: "created", enum: ["created", "cancelled", "rescheduled"] },
    payload: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
