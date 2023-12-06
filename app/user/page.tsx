import Calender from "./Calender"
import Card from "./Card"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/prisma/client";

async function isCycle(): Promise<[boolean, string, string]> {
    'use server'
    const session = await getServerSession(authOptions);
    let cycle_id: string = "";
    if (session?.user.isCycle) {
        const result = await prisma.cycle.findFirst({
            where: {
                AND: [
                    { user_id: session.user.id },
                    { endDay: 0 },
                    { endMonth: 0 },
                    { endYear: 0 }
                ]
            },
            select: { id: true }
        })
        cycle_id = result?.id as string;
    }
    return [session?.user.isCycle!, session?.user.id!, cycle_id];
}


const UserPage = async () => {
    const data: [boolean, string, string] = await isCycle();
    const IsCycle = data[0];
    const user_id = data[1];
    const cycle_id = data[2];

    return (
        <div className="h-4/5 flex flex-col justify-center items-center gap-10">
            <p className="text-3xl">Last Cycle</p>
            <Card />
            <Calender IsCycle={IsCycle} user_id={user_id} cycle_id={cycle_id} />
        </div>
    )
}

export default UserPage