import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db/connect";
import Contact from "@/lib/models/contact.model";
import { adminReplyTemplate } from "@/lib/email/templates/admin-reply.template";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const contact = await Contact.findById(params.id);
  if (!contact) {
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }

  const body = await request.json();
  const subject: string = body.subject?.trim();
  const message: string = body.message?.trim();

  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  await transporter.sendMail({
    from: `"Skout AI Team" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject,
    html: adminReplyTemplate(contact.name, message),
  });

  contact.repliedAt = new Date();
  await contact.save();

  return NextResponse.json({ ok: true, repliedAt: contact.repliedAt });
}
