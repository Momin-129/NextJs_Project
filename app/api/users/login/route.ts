import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import { signJwtAccessToken } from "@/app/assets/jwt";

export async function POST(request: NextRequest) {

    const body = await request.json();

    // to check if fields are empty or not
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ message: "Fields can't be empty." }, { status: 400 })


    // to chekc if user exists
    const user = await prisma.users.findUnique({ where: { email: body.email } });
    if (!user)
        return NextResponse.json({ message: "User dosen't exists." }, { status: 400 })

    // to check if user has entered correct password
    const check = await bcrypt.compare(body.password, user.password);
    if (!check)
        return NextResponse.json({ message: "Inccorect Password." }, { status: 400 })


    const {password,...userWithoutPassword} = user;
    const accessToken = signJwtAccessToken(userWithoutPassword);
    const result = {
        ...userWithoutPassword,
        accessToken
    }

    return NextResponse.json(result, { status: 200 })
}