import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Booking from "@/lib/models/booking.model";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = 20;
  const search = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "";

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (status) query.status = status;

  const [items, total] = await Promise.all([
    Booking.find(query)
      .sort({ startTime: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Booking.countDocuments(query),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}
