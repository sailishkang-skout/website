import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Waitlist from "@/lib/models/waitlist.model";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 25;
  const search = searchParams.get("q") ?? "";

  const query = search ? { email: { $regex: search, $options: "i" } } : {};

  const [items, total] = await Promise.all([
    Waitlist.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Waitlist.countDocuments(query),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}
