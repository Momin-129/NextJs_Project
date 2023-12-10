'use client';
import { FormEvent, useState } from "react";
import { createDateArrays } from "../assets/dateArray"
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
    IsCycle: boolean,
    user_id: string,
    cycle_id: string
}


const Calender = ({ IsCycle, user_id, cycle_id }: Props) => {
    const { dates, months, years } = createDateArrays();
    const [msg, setMsg] = useState<string>("");
    const [isCycle, setIsCycle] = useState<boolean>(IsCycle)
    const [day, setDay] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const { data: session, update } = useSession();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isCycle && cycle_id == "") {
            setMsg("It just started wait a while.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = {
            day: parseInt(formData.get('day') as string, 10),
            month: parseInt(formData.get('month') as string, 10),
            year: parseInt(formData.get('year') as string, 10),
            user_id: user_id,
            IsCycle: isCycle,
            cycle_id: cycle_id
        }
        try {
            const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/users/addNew`, data);
            update({
                ...session,
                user: {
                    ...session?.user,
                    isCycle: !session?.user.isCycle
                }
            });
            setIsCycle(!session?.user.isCycle);
            setDay(0);
            setMonth(0);
            setYear(0);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
                <p className="text-3xl flex justify-center">{isCycle ? "End Cycle" : "Start New Cycle"}</p>
                <div className="flex gap-10">
                    <div className="flex-col">
                        <select className="select select-primary w-full" name="day" defaultValue="day" onChange={(e) => setDay(parseInt(e.target.value))}>
                            <option value="day" disabled>Day</option>
                            {dates.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="flex-col">
                        <select className="select select-primary w-full" name="month" defaultValue="month" onChange={(e) => setMonth(parseInt(e.target.value))}>
                            <option value="month" disabled>Month</option>
                            {months.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="flex-col">
                        <select className="select select-primary w-full" name="year" defaultValue="year" onChange={(e) => setYear(parseInt(e.target.value))}>
                            <option value="year" disabled>Year</option>
                            {years.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                </div>
                {!isCycle && <button type="submit" className="btn btn-active btn-secondary" disabled={day == 0 || month == 0 || year == 0}>Start Cycle</button>}
                {isCycle && <button type="submit" className="btn btn-active btn-secondary" disabled={day == 0 || month == 0 || year == 0}>End Cycle</button>}
                {msg.length > 0 && <p className="text-secondary text-xl">{msg}</p>}
            </form>
        </>
    )
}

export default Calender