import { daysBetweenDates } from "@/app/assets/noOfDays";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {day,month,year,user_id,IsCycle,cycle_id}:{day:number,month:number,year:number,user_id:string,IsCycle:boolean,cycle_id:string} = await req.json();

    if(!IsCycle){
        await prisma.cycle.create({
         data:{
            user_id:user_id,
            startDay:day,
            startMonth:month,
            startYear:year
         }
        })
    }
    else{
        const lastrecord = await prisma.cycle.findFirst({
             where: {
            user_id: user_id, 
        },
         orderBy: [ 
            { endYear: 'desc', },
            { endMonth: 'desc',  },
            {  endDay: 'desc', },
        ],
        take: 1,
        });

        const newCycle = await prisma.cycle.findFirst({where:{id:cycle_id}});

        const afterDays = daysBetweenDates(lastrecord?.endDay!,lastrecord?.endMonth!,lastrecord?.endYear!,newCycle?.startDay!,newCycle?.startMonth!,newCycle?.startYear!);

        await prisma.cycle.update({
            where:{ id:cycle_id },
            data:{
                endDay:day,
                endMonth:month,
                endYear:year,
                afterDays:afterDays
            }
        });
    }

     await prisma.users.update({
            where:{id:user_id},
            data:{
                isCycle:!IsCycle
            }
        });


    return NextResponse.json({day,month,year,user_id,IsCycle});
}