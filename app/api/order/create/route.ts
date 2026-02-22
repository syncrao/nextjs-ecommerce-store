import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const order = await Order.create({
      items: body.items,
      totalPrice: body.totalPrice,
      userId: body.userId || "guest",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Order Failed" }, { status: 500 });
  }
}