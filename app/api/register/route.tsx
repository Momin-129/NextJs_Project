import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import { z } from 'zod';

const User = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(12)
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = User.safeParse(body);

    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors })

    const hashPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.users.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashPassword
        }
    });

    if (user)
        return NextResponse.json({ name: user.name, email: user.email });
}

