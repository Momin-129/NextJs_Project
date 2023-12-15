import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";



export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const id = params.id;

    const record= await prisma.cycle.findMany({
      where: {
         user_id: id, 
         endDay:{
            gt:0
         }
     },
     select:{
        startDay:true,
        startMonth:true,
        startYear:true,
        endDay:true,
        endMonth:true,
        endYear:true,
        afterDays:true,
     }
    });


    if(record.length>0)
        return NextResponse.json(record);
    else 
        return NextResponse.json({message:"Invalid user id"});


}