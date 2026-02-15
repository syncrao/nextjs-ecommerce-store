import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import { User } from "../../models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newUser = await User.create(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

