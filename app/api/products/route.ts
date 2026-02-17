import { NextResponse } from "next/server";
import connectDB from "../../lib/db"
import Product from "../../lib/models/Product"

export async function POST(req: Request) {
    try {
        await connectDB()
        const body:any = await req.json()
        console.log("body : ", body)
        const product = Product.create(body)
        return NextResponse.json(product, {status:201})
    } catch (error) {
        return NextResponse.json({error:"Create Failed"}, {status:500})
    }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}