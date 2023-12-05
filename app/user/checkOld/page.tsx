import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cycleDate } from "@/app/assets/interfaces";
import { getServerSession } from "next-auth/next";
import OldRecords from "./OldRecords";
import axios from "axios";

async function getData(id: string) {
    const response = await axios.get(`http://localhost:3000/api/users/checkold/${id}`);
    return response.data;
}

export default async function CheckOldRecords() {
    const session = await getServerSession(authOptions);
    const id = session?.user.id!;
    const data: cycleDate[] = await getData(id);

    return (
        <OldRecords data={data} />
    );
}
