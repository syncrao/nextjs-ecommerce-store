import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Order from "@/app/lib/models/Order";
import Inventory from "@/app/lib/models/Inventory";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { txnId } = await req.json();

    const order = await Order.findOne({ paymentId: txnId });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    for (const item of order.items) {
      await Inventory.findOneAndUpdate(
        {
          _id: item.inventoryId,
        },
        {
          $inc: { stock: -item.qty },
        }
      );
    }

    order.status = "paid";
    await order.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false });
  }
}