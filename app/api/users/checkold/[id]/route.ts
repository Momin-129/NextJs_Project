import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";



export async function GET(req:NextRequest,params:{params:{id:string}}){
    const id = params.params.id;
    const record= await prisma.cycle.findMany({
      where: {
         user_id: id, 
     },
     select:{
      startDay:true,
      startMonth:true,
      startYear:true,
      endDay:true,
      endMonth:true,
      endYear:true,
      afterDays:true
     }
    });

    return NextResponse.json(record);



}