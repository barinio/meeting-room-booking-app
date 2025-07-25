'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "../../context/AuthContext";


export default function Header() {
    const {isAuth, setIsAuth, loading, setUserName, userName, setUserId} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem('name');
        const userId = localStorage.getItem('userId');
        if (name) setUserName(name);
        if (userId) setUserId(userId);
    }, [isAuth, setUserName, setUserId]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            setIsAuth(false);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('userId');

            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) return null;

    return (
        <header className="flex justify-between items-center px-8 py-4 sticky top-0 z-10">
            <Link href="/" className="">
                Meeting <span>App</span>
            </Link>

            {isAuth ? (
                <div className="">
                    <span className="mr-4 text-yellow-600 font-bold capitalize">{userName}</span>
                    <button onClick={handleLogout} className="border bg-red-400 py-1 px-2 rounded-xl hover:bg-red-950">
                        Вийти
                    </button>
                </div>
            ) : (
                <nav className="flex gap-4">
                    <Link href="/login">Вхід</Link>
                    <Link href="/register">Реєстрація</Link>
                </nav>
            )}
        </header>
    );
}
