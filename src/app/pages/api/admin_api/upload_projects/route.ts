import dbConnect from "@/lib/DB_Connection/dbConnection";
import { Projects_Str } from "@/lib/Schema/schema";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const {
      NanoId,
      projectTitle,
      projectLink,
      descriptions,
      projectImage,
      projectType,
      recentDate,
    } = reqBody;
    const preUploadData = await new Projects_Str({
      NanoId,
      projectTitle,
      projectLink,
      descriptions,
      projectImage,
      projectType,
      recentDate,
    });
    await preUploadData.save();
    return NextResponse.json(
      { message: "Data is uploaded", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Data is not uploaded", success: true },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const ProjectsData = await Projects_Str.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Data found", success: true, ProjectsData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Data not found", success: false },
      { status: 404 }
    );
  }
}
