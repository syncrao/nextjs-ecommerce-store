import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Product from "../../../lib/models/Product";


export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();
  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT( req: Request, context: { params: Promise<{ id: string }> } ) {
  const { id } = await context.params;
  const body = await req.json();
  await connectDB();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}


export async function DELETE( req: Request, context: { params: Promise<{ id: string }> } ) {
  const { id } = await context.params;
  await connectDB();
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted ✅" });
}
