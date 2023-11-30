'use client';

import { Register } from '@/assets/interfaces';
import register from '@/assets/register';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import Toast from './Toaster';
import { z } from 'zod';

const User = z.object({
    name: z.string().regex(/^[A-Za-z ]+$/, {
        message: "Name must contain only alphabets and spaces",
    }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Za-z]/, {
            message: "Password must contain at least one alphabet character",
        })
        .regex(/\d/, { message: "Password must contain at least one digit" }).regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one special character",
        })
})

const Form = () => {

    const [toastData, setToastData] = useState({
        isVisible: false,
        type: 'success', // 'success' or 'error'
        message: '',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (user: Register) => register(user),
        onSuccess: (data) => {
            setToastData({
                isVisible: true,
                type: 'success',
                message: 'Registration successful!'
            });
        },
        onError: (error) => {
            setToastData({
                isVisible: true,
                type: 'error',
                message: axios.isAxiosError(error) && error.response?.data?.message || 'Registration failed.',
            });
        },
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = {
            name: formData.get('name')?.toString() || "",
            email: formData.get('email')?.toString() || "",
            password: formData.get("password")?.toString() || ""

        }

        const validate = User.safeParse(user);

        if (!validate.success) {
            let errorMessage = "";
            validate.error.errors.forEach((error, index) => {
                if (error.message) {
                    errorMessage += `${error.message}\n`;
                }
            });
            setToastData({
                isVisible: true,
                type: 'error',
                message: errorMessage,
            });
        }
        else {
            mutate(user)
        }
    }

    const handleCloseToast = () => {
        setToastData({ ...toastData, isVisible: false });
    };

    return (
        <>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Full Name" name='name' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary"  >Register {isPending && <span className="loading loading-spinner text-info"></span>}</button>
                    <p className="text-center mt-1 mb-1">Or</p>
                    <Link href="/login" className="btn btn-secondary">Login</Link>
                </div>
            </form>
            <Toast
                isVisible={toastData.isVisible}
                type={toastData.type}
                message={toastData.message}
                onClose={handleCloseToast}
            />
        </>
    )
}

export default Form