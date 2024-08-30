import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import { PdfSchemaStr } from "@/lib/Schema/schema";
export async function POST(request:NextRequest){
    await dbConnect()
    try{

            const reqBody = await request.json()
            const{
                pdf_name,pdf,recentDate
            }=reqBody

            const presave = await new PdfSchemaStr({
                pdf_name,pdf,recentDate
            })
            const savePdf = await presave.save()
        return NextResponse.json({message:"PDF uploaded",success:true})
    }catch(error:any){
        return NextResponse.json({message:"Something went wrong",success:false})
    }
}

export async function GET(){
    await dbConnect()
    try{
        const gotPdf = await PdfSchemaStr.find()
        return NextResponse.json({message:"PDF Files Got",success:true,gotPdf}) 
    }catch(error:any){
        return NextResponse.json({message:"Something went wrong",success:false})
    }
}