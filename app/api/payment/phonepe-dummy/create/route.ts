import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Order from "@/app/lib/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const txnId = "PHONEPE_DUMMY_" + Date.now();

    const order = await Order.create({
      items: body.items,
      totalPrice: body.totalPrice,
      userId: body.userId || "guest",
      paymentId: txnId,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      txnId,
      orderId: order._id,
    });
  } catch {
    return NextResponse.json({ error: "Create Failed" }, { status: 500 });
  }
}