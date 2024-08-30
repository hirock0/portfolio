import dbConnect from "@/lib/DB_Connection/dbConnection";
import { UserSchema } from "@/lib/Schema/schema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  await dbConnect();
  const reqEmail = await request.json();
  const findUser = await UserSchema.findOne(reqEmail);
  if (findUser == null) {
    return NextResponse.json({ message: "user not found", success: false });
  } else {
  }

  return NextResponse.json({ message: "user found", success: true });
}
