import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { paymentId } = await req.json();

    const order = await Order.findOne({ paymentId });

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
  }
}