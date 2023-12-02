'use client';

import { createDateArrays } from "../assets/dateArray"


const Calender = () => {
    const { dates, months, years } = createDateArrays();
    return (
        <>
            <p className="text-3xl">New Cycle</p>
            <div className="flex gap-10">
                <div className="flex-col">
                    <label className="text-2xl">Date</label>
                    <select className="select select-primary w-full">
                        {dates.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="flex-col">
                    <label className="text-2xl">Month</label>
                    <select className="select select-primary w-full">
                        {months.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="flex-col">
                    <label className="text-2xl">Year</label>
                    <select className="select select-primary w-full">
                        {years.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <button className="btn btn-active btn-secondary">Start Cycle</button>
        </>
    )
}

export default Calender