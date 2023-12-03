import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";



export async function GET(req:NextApiRequest){
    const session = await getSession({req});
    const id = session?.user.id;
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