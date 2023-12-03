'use client';

interface Data {
    startDay: number,
    startMonth: number,
    startYear: number,
    endDay: number,
    endMonth: number,
    endYear: number,
    afterDays: number
}

import { useSearchParams } from "next/navigation";
import OldRecords from "./OldRecords";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getOldRecords } from "@/app/assets/getOldRecords";
import { useState } from "react";

const CheckOldRecords = () => {
    const [cycleData, setData] = useState<Data[]>([])
    const searchParams = useSearchParams();
    const id: string = searchParams.get('id') ?? "";

    const { data, isLoading } = useQuery<Data[], Error>({
        queryKey: ['getOldRecords'],
        queryFn: () => getOldRecords(id),
        onSuccess: (fetchData: Data[]) => {
            setData(fetchData);
        },
        onError: (error: Error) => {
            console.error('Error fetching data:', error);
        },
    } as UseQueryOptions<Data[], Error>);

    console.log(cycleData);
    return (
        <div className="h-auto flex flex-col justify-center items-center gap-10 py-32">
            {isLoading ? (
                <p className="h-full"><span className="loading loading-spinner text-secondary"></span></p>
            ) : (
                data && data.map((item, index) => <OldRecords key={index} data={item} />)
            )}
        </div>
    )
}



export default CheckOldRecords