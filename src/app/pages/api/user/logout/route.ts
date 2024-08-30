import dbConnect from "@/lib/DB_Connection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    const response = NextResponse.json({
      message: "Logout not Successful",
      success: false,
    });
  }
}
