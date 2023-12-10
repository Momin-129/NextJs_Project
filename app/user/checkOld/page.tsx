import { cycleDates } from "@/app/assets/interfaces";
import { getServerSession } from "next-auth/next";
import OldRecords from "./OldRecords";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function getData(id: string) {
    const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/users/checkold/${id}`);
    return response.data;
}

export default async function CheckOldRecords() {
    const session = await getServerSession(authOptions);
    const id = session?.user.id!;
    const data: cycleDates[] = await getData(id);

    return (
        <OldRecords data={data} />
    );
}
