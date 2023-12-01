"use client";

import { useSession } from "next-auth/react";

const UserButtons = () => {
    const { data: session } = useSession();
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
                            <li className="cursor-pointer">
                                <a>Check Old Records</a>
                            </li>
                            <li className="cursor-pointer">
                                <a>Add Old Records</a>
                            </li>
                            <li className="cursor-pointer">
                                <a>Sign Out</a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden sm:hidden md:hidden lg:flex gap-2 ">
                        <button className="btn btn-outline btn-primary">Check Old Records</button>
                        <button className="btn btn-outline btn-accent">Add Old Records</button>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default UserButtons