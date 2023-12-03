'use client';

import { useQuery } from "@tanstack/react-query";
import { getLastRecord } from "../assets/getLast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Card = () => {

    const { data: session, status } = useSession();
    const [isEnabled, setEnabled] = useState(false);
    const { data: cycleDate, isLoading, refetch } = useQuery({
        queryKey: ['getlast'],
        queryFn: () => getLastRecord(session?.user.id as string),
        enabled: isEnabled
    })

    useEffect(() => {
        if (status == "loading") return;

        setEnabled(true);
    }, [status])

    return (
        <div className="card min-w-max bg-primary h-min text-primary-content">
            <div className="card-body">
                {isLoading ? <span className="loading loading-spinner text-info"></span> :
                    <table className="table">
                        <thead className="text-xl text-black">
                            <tr><th>Start Date</th><td>{cycleDate && cycleDate.startDate}</td></tr>
                            <tr><th>End Date</th><td>{cycleDate && cycleDate.endDate}</td></tr>
                            <tr><th>Happened After</th><td>{cycleDate && cycleDate.afterDays} days</td></tr>
                        </thead>
                    </table>}
            </div>
        </div>
    )
}

export default Card