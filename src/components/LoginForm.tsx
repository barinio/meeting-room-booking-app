'use client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from "../../context/AuthContext";

export default function LoginForm() {
    const {setIsAuth, setUserName, setUserId} = useAuth();
    const [form, setForm] = useState({email: '', password: ''});

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        });


        const data = await res.json();
        console.log(data);
        if (data.token) {
            setIsAuth(true)
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('userId', data.user.id);
            setUserName(data.user.name);
            setUserId(data.user.id);

            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 max-w-md mx-auto">
            <label className="border p-2 rounded-xl ">
                <input type="email" placeholder="Email" className="input" value={form.email}
                       onChange={e => setForm({...form, email: e.target.value})}/>
            </label>
            <label className="border p-2 rounded-xl">
                <input type="password" placeholder="Password" className="input" value={form.password}
                       onChange={e => setForm({...form, password: e.target.value})}/>
            </label>
            <button type="submit" className="btn mt-4 border-t border-l ">Login</button>
        </form>
    );
}
