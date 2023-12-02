
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

const monthNumberToNameMap: Record<number, string> = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
  7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
};



export async function GET(req:NextRequest,params:{params:{id:string}}){
    const id = params.params.id;
    const lastrecord = await prisma.cycle.findFirst({
      where: {
         user_id: id, 
     },
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

    const result = {
  startDate: lastrecord
    ? `${lastrecord.startDay} ${monthNumberToNameMap[lastrecord.startMonth as number]} ${lastrecord.startYear}`
    : 'Unknown', 
    endDate: lastrecord
    ? `${lastrecord.endDay} ${monthNumberToNameMap[lastrecord.endMonth as number]} ${lastrecord.endYear}`
    : 'Unknown', 
    afterDays:lastrecord?.afterDays
};
    return NextResponse.json(result,{status:200});

}