import dbConnect from "@/lib/DB_Connection/dbConnection";
import { UserSchema } from "@/lib/Schema/schema";
import { NextRequest, NextResponse } from "next/server";

import Jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = Jwt.decode(token);
    const sessionData = await getServerSession(authOption);
    const Id =
      sessionData?.user?._id?.toString() || decodedToken?._id?.toString();
    const findUser = await UserSchema.findById({ _id: Id });
    return NextResponse.json({
      message: "Token is found",
      success: true,
      findUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Data not found", success: false });
  }
}
