import Calender from "./Calender"
import Card from "./Card"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/prisma/client";
import axios from "axios";



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

async function getLastRecord(id: string) {
    'use server'
    const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/getlast/${id}`);
    return result.data;
}


const UserPage = async () => {
    const data: [boolean, string, string] = await isCycle();
    const IsCycle = data[0];
    const user_id = data[1];
    const cycle_id = data[2];
    const lastRecord: {
        startDate: string,
        endDate: string,
        afterDays: number
    } = await getLastRecord(user_id);

    return (
        <div className="h-4/5 flex flex-col justify-center items-center gap-10">
            <p className="text-3xl">Last Cycle</p>
            <Card {...lastRecord} />
            <Calender IsCycle={IsCycle} user_id={user_id} cycle_id={cycle_id} />
        </div>
    )
}

export default UserPage