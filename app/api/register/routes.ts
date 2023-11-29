import { NextRequest } from "next/server";
import { prisma } from "@prisma/client"
export async function POST(request:NextRequest){
    const body = await request.json();
    prisma.user.create
}

