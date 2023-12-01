"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
    const { data: session } = useSession();
    return (
        <div className="ml-auto hidden sm:hidden md:hidden lg:flex gap-2">
            {session?.user ? (
                <>
                    <p className="flex items-center">{session?.user.name}</p>
                    <button className="btn btn-outline btn-secondary" onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>SignOut</button>
                </>
            ) : <button className="btn btn-outline btn-primary" onClick={() => signIn()}>Log In</button>
            }
        </div>
    )
}

export default LoginButton