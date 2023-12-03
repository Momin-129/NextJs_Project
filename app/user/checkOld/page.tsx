import { cycleDate } from "@/app/assets/interfaces";
import OldRecords from "./OldRecords";


async function getData() {
    try {
        const res = await fetch('http://localhost:3000/api/users/checkold')
        return res.json()
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default async function CheckOldRecords() {
    const data: cycleDate[] = await getData()
    return (
        <OldRecords data={data} />
    );
}