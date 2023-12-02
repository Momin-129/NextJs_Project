import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { daysBetweenDates } from "@/app/assets/noOfDays";

export async function POST(req:NextRequest){
    const body = await req.json();
    const lastrecord = await prisma.cycle.findFirst({
      orderBy: [
        {
          endYear: 'desc',
        },
        {
          endMonth: 'desc',
        },
        {
          endDay: 'desc',
        },
      ],
      take: 1,
    });

    let afterDays:number;
    if(lastrecord==null) afterDays=0;
    else {
      afterDays = daysBetweenDates(lastrecord.endDay, lastrecord.endMonth, lastrecord.endYear, body.startDay, body.startMonth, body.startYear);
    }

    const result = {...body,afterDays:afterDays}
    const cycle = await prisma.cycle.create({
        data:result
    })

    if(cycle) return NextResponse.json({message:"Record added."},{status:200});
}