import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const body = await request.json();

    // to chekc if fields are empty or not
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ message: "Fields can't be empty." })

    // to chekc if user exists
    const user = await prisma.users.findUnique({ where: { email: body.email } });
    if (!user)
        return NextResponse.json({ message: "User dosen't exists." })

    // to check if user has entered correct password
    const check = await bcrypt.compare(body.password, user.password);
    if (!check)
        return NextResponse.json({ message: "Inccorect Password." })

    // create a json web token for user
    const key = process.env.JWT_KEY;
    const token = jwt.sign({ id: user.id }, key!, { expiresIn: '60d' });

    return NextResponse.json({
        id: user.id,
        name: user.name,
        token: token
    })
}