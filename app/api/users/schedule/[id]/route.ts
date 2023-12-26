import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import axios from "axios";
import { cycleDates } from "@/app/assets/interfaces";
import { ScheduleMail } from "../email";

type MonthNumberMapping = {
  [key: string]: number;
};

const getMonthNumber = (monthName: string): number | undefined => ({
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12,
})[monthName];



export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const id = params.id;
    const record:cycleDates[]= await prisma.cycle.findMany({
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
      {
         const response = await axios.post("https://cycle.onrender.com/predict_start_date",record)
         const date = response.data['predicted_start_date'].split(" ")
         const [day,month,year]= date;
         const user_email = await prisma.users.findFirst({where:{id:id},select:{email:true}});
         ScheduleMail(parseInt(day),getMonthNumber(month) as number,parseInt(year),user_email!.email);
         return NextResponse.json({day,month:getMonthNumber(month),year});
        }
    else 
        return NextResponse.json({message:"Invalid user id"});


}