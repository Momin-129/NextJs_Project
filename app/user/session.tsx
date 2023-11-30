'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Session = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user_id') ?? null)
    console.log(isLoggedIn);
    const handleLogout = () => {
        sessionStorage.removeItem('user_id');
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setIsLoggedIn(null);
        router.push('/');
    }

    return (
        <>
            {isLoggedIn && <button className="btn btn-outline btn-secondary" onClick={handleLogout}>Logout</button>}
        </>
    )
}

export default Session;