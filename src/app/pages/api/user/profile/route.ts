import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import { UserSchema } from "@/lib/Schema/schema";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqProfileData = await request.json();
    const {
      name,
      email,
      contact,
      division,
      district,
      thana,
      postOffice,
      postCode,
      userImg,
      userid,
    } = reqProfileData;

    if (userImg == "") {
      await UserSchema.findByIdAndUpdate(
        { _id: userid },
        {
          name: name,
          email: email,
          contact: contact,
          address: {
            division: division,
            district: district,
            thana: thana,
            postOffice: postOffice,
            postCode: postCode,
          },
        }
      );

      return NextResponse.json({
        message: "Profile is updated",
        success: true,
      });
    } else {
      await UserSchema.findByIdAndUpdate(
        { _id: userid },
        {
          userImg: userImg,
        }
      );

      return NextResponse.json({
        message: "Image is updated",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Profile is not updated",
      success: false,
    });
  }
}
