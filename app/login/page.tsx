'use client';

import Link from 'next/link'
import React, { FormEvent, use, useState } from 'react'
import Toast from '../components/Toaster';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastData, setToastData] = useState({
        isVisible: false,
        type: 'success', // 'success' or 'error'
        message: '',
    });



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        })

        if (result?.error) {
            setToastData({
                isVisible: true,
                type: 'error',
                message: result.error
            });
        } else {
            router.push("/user")
        }
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
                                <button className="btn btn-primary">Login</button>
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