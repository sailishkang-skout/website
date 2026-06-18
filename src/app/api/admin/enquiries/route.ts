import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Contact from "@/lib/models/contact.model";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 20;
  const search = searchParams.get("q") ?? "";

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Contact.countDocuments(query),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}
