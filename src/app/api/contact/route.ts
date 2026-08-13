import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import Contact from "@/lib/models/contact.model";
import { sendContactEmail } from "@/lib/email/contact.email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  size: z.string().min(1, "Team size is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const conn = await connectDB();
    if (!conn) {
      // In a real app, you'd want to handle this more gracefully
      console.error("[contact/POST] DB connection failed");
      throw new Error("Could not connect to the database.");
    }

    await Contact.create(data);
    await sendContactEmail(data);

    return NextResponse.json({
      success: true,
      message: "Message received. We'll be in touch soon!",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten().fieldErrors },
        { status: 422 },
      );
    }
    console.error("[contact/POST]", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
