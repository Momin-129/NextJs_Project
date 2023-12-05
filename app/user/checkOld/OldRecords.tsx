'use client';

import { cycleDates } from "@/app/assets/interfaces";
import { useState } from "react";
import { number } from "zod";

const monthNumberToNameMap: Record<number, string> = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
};



const OldRecords = ({ data }: { data: cycleDates[] }) => {
    const [cycleRecord, setCycleRecord] = useState(data)
    const [sortBy, setSortBy] = useState("");
    const [groupBy, setGroupBy] = useState<number[]>([]);
    const [groupValue, setGroupValue] = useState<string>()

    const sortByStartMonth = (month: number) => {
        const sortedData = data.filter((item) => item.startMonth === month || item.endMonth === month);
        setCycleRecord(sortedData);
    };

    const sortByStartYear = (year: number) => {
        const sortedData = data.filter((item) => item.startYear === year || item.endYear === year);
        setCycleRecord(sortedData);
    };
    const distinctStartYears = Array.from(new Set(data.map(item => item.startYear)));
    const distinctStartMonths = Array.from(new Set(data.map(item => item.startMonth)));

    const handleSort = () => {
        if (sortBy == 'month') sortByStartMonth(parseInt(groupValue as string))
        else sortByStartYear(parseInt(groupValue as string))
    }

    return (
        <div className="h-auto flex flex-col justify-center items-center gap-10 py-20">
            <div className="flex gap-10">
                <div className="flex-col">
                    <select className="select select-primary w-full" defaultValue="sort by" onChange={
                        (e) => {
                            setSortBy(e.target.value)
                            e.target.value == "month" ? setGroupBy(distinctStartMonths) : setGroupBy(distinctStartYears)
                        }
                    }>
                        <option value="sort by" disabled>Sort By</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div className="flex-col">
                    <select className="select select-primary w-full" defaultValue="get only" disabled={sortBy.length == 0} onChange={(e) => setGroupValue(e.target.value)}>
                        <option value="get only" disabled>Get Only</option>
                        {groupBy.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="flex-col">
                    <button className="btn btn-outline btn-secondary w-full" disabled={sortBy.length == 0 || !groupBy.length} onClick={handleSort}>Sort</button>
                </div>
            </div>
            {
                cycleRecord && cycleRecord.map((item, index) =>
                    < div key={index} className="card w-max bg-primary h-min text-primary-content" >
                        <div className="card-body">
                            <table className="table">
                                <thead className="text-xl text-black">
                                    <tr>
                                        <th>Start Date</th>
                                        <td>
                                            {item.startDay} {monthNumberToNameMap[item.startMonth]} {item.startYear}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>End Date</th>
                                        <td>
                                            {item.endDay} {monthNumberToNameMap[item.endMonth]} {item.endYear}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Happened After</th>
                                        <td>{item.afterDays} days</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div >)
            }
        </div>
    )
}

export default OldRecords