'use client';

import { extractDates } from '@/app/assets/dateExtractor';
import React, { useState } from 'react'



const AddOldRecords = () => {
    const [string, setString] = useState("");
    const handleAdd = () => {
        const result = extractDates(string);
        console.log(result);
    }
    return (
        <div className="h-4/5 flex flex-col justify-center items-center gap-10">
            <p className='text-3xl'>Add Old Record</p>
            <input type="text" placeholder="Example: 16 October 2019 to 25 October 2019" className="input input-bordered input-primary w-full max-w-lg" value={string} onChange={(e) => setString(e.target.value)} />
            <button className="btn btn-active btn-secondary" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default AddOldRecords