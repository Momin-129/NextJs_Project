'use client';

import { createDateArrays } from "../assets/dateArray"


const Calender = () => {
    const { dates, months, years } = createDateArrays();
    return (
        <>
            <p className="text-3xl">New Cycle</p>
            <div className="flex gap-10">
                <select className="select select-primary w-full max-w-xs">
                    <option disabled selected>Date</option>
                    {dates.map((item, index) => <option key={index} value={item}>{item}</option>)}
                </select>
                <select className="select select-primary w-full max-w-md">
                    <option disabled selected>Month</option>
                    {months.map((item, index) => <option key={index} value={item}>{item}</option>)}
                </select>
                <select className="select select-primary w-full max-w-xs">
                    <option disabled selected>Year</option>
                    {years.map((item, index) => <option key={index} value={item}>{item}</option>)}
                </select>
            </div>
            <button className="btn btn-active btn-secondary">Start Cycle</button>
        </>
    )
}

export default Calender