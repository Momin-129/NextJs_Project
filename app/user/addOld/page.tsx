'use client';

import { addOldRecords } from '@/app/assets/addOld';
import { extractDates } from '@/app/assets/dateExtractor';
import { cycleDate } from '@/app/assets/interfaces';
import Toast from '@/app/components/Toaster';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'



const AddOldRecords = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const [string, setString] = useState("");

    const [toastData, setToastData] = useState({
        isVisible: false,
        type: 'success', // 'success' or 'error'
        message: '',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: cycleDate) => addOldRecords(data),
        onSuccess: (data) => {
            setToastData({
                isVisible: true,
                type: 'success',
                message: 'Record Added successful!'
            });
            setString("");
        },
        onError: (error) => {
            setToastData({
                isVisible: true,
                type: 'error',
                message: axios.isAxiosError(error) && error.response?.data?.message || 'Record addition failed.',
            });
        },
    })

    const handleCloseToast = () => {
        setToastData({ ...toastData, isVisible: false });
    };

    const handleAdd = () => {

        const pattern = /^\d{1,2}\s[A-Za-z]+\s\d{4}\sto\s\d{1,2}\s[A-Za-z]+\s\d{4}$/;
        if (pattern.test(string)) {
            const date = extractDates(string);
            const result = { ...date, user_id: user_id }
            mutate(result);
        } else {
            setToastData({
                isVisible: true,
                type: 'error',
                message: "Please write in the given example pattern",
            });
            setString("");
        }

    }
    return (
        <div className="h-4/5 flex flex-col justify-center items-center gap-10">
            <p className='text-3xl'>Add Old Record</p>
            <input type="text" placeholder="Example: 16 October 2019 to 25 October 2019" className="input input-bordered input-primary w-full max-w-lg" value={string} onChange={(e) => setString(e.target.value)} />
            <button className="btn btn-active btn-secondary" onClick={handleAdd}>Add {isPending && <span className="loading loading-spinner text-info"></span>}</button>
            <Toast
                isVisible={toastData.isVisible}
                type={toastData.type}
                message={toastData.message}
                onClose={handleCloseToast}
            />
        </div>
    )
}

export default AddOldRecords