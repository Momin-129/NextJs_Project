"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

const UserButtons = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {

        if (status == "loading") return;

        if (session && session?.user) router.push('/user')
        else router.push("/login");
    }, [status, session, router])


    const handleAdd = () => {
        router.push(`/user/addOld`);
    }

    const handleCheck = () => {
        router.push(`/user/checkOld?id=${session?.user.id}`);
    }

    return (
        <div className="">
            {session?.user && (
                <>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-secondary text-neutral font-bold rounded-box w-52">
                            <li className="cursor-pointer" >
                                <Link href="/">Home</Link>
                            </li>
                            <li className="cursor-pointer" >
                                <Link href="/user/checkOld">Check Old Records</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link href="/user/addOld">Add Old Records</Link>
                            </li>
                            <li className="cursor-pointer" onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>
                                <a href="#">Sign Out</a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden sm:hidden md:hidden lg:flex gap-2 ">
                        <button className="btn btn-outline btn-primary" onClick={handleCheck}>Check Old Records</button>
                        <button className="btn btn-outline btn-accent" onClick={handleAdd}>Add Old Records</button>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default UserButtons