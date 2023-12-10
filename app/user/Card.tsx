'use client';

import { useQuery } from "@tanstack/react-query";
import { getLastRecord } from "../assets/getLast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Card = () => {

    const { data: session, status } = useSession();
    const [prevSession, setPrevSession] = useState(session);
    const [isEnabled, setEnabled] = useState(false);
    const { data: cycleDate, isLoading, refetch } = useQuery({
        queryKey: ['getlast'],
        queryFn: () => getLastRecord(session?.user.id as string),
        enabled: isEnabled
    })

    useEffect(() => {
        if (status == "loading") return;

        if (prevSession != session) {
            refetch();
            setPrevSession(session);
        }

        setEnabled(true);
    }, [status, session, prevSession, refetch])

    return (
        <div className="card sm:w-11/12 md:w-2/4 lg:w-1/5 h-max rounded-2xl bg-primary text-primary-content flex justify-center items-center p-10">
            <div>
                {isLoading ? <span className="loading loading-spinner text-info"></span> :
                    <table className="table">
                        <thead className="sm:text-4xl md:text-xl lg:text-xl text-black">
                            <tr><th>Start</th><td>{cycleDate && cycleDate.startDate}</td></tr>
                            <tr><th>End</th><td>{cycleDate && cycleDate.endDate}</td></tr>
                            <tr><th>After</th><td>{cycleDate && cycleDate.afterDays} days</td></tr>
                        </thead>
                    </table>}
            </div>
        </div>
    )
}

export default Card