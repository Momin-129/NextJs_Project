'use client';

import login from '@/assets/login';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link'
import React, { FormEvent, use, useState } from 'react'
import { User } from '../../assets/interfaces'
import axios from 'axios';
import Toast from '../components/Toaster';
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastData, setToastData] = useState({
        isVisible: false,
        type: 'success', // 'success' or 'error'
        message: '',
    });


    const { mutate, isPending } = useMutation({
        mutationFn: (user: User) => login(user),
        onSuccess: (data) => {
            sessionStorage.setItem('user_id', data.id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('token', data.token);
            router.push('/user');
        },
        onError: (error) => {
            setToastData({
                isVisible: true,
                type: 'error',
                message: axios.isAxiosError(error) && error.response?.data?.message || 'Login failed.',
            });
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = { email: email, password: password }
        mutate(user)
    }
    const handleCloseToast = () => {
        setToastData({ ...toastData, isVisible: false });
    };
    return (
        <main className="flex justify-center align-middle h-4/5">
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">“Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.” — Mark Twain</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login{isPending && <span className="loading loading-spinner text-info"></span>}</button>
                                <p className="text-center mt-1 mb-1">Or</p>
                                <Link href="/" className="btn btn-secondary">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toast
                isVisible={toastData.isVisible}
                type={toastData.type}
                message={toastData.message}
                onClose={handleCloseToast}
            />
        </main>
    )
}

export default Login