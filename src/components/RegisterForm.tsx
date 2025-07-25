'use client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function RegisterForm() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        });
        router.push('/login');

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 max-w-md mx-auto">

            <label className="border p-2 rounded-xl">
                <input type="text" placeholder="Name" className="input" value={form.name}
                       onChange={e => setForm({...form, name: e.target.value})}/>
            </label>
            <label className="border p-2 rounded-xl">
                <input type="email" placeholder="Email" className="input" value={form.email}
                       onChange={e => setForm({...form, email: e.target.value})}/>
            </label>
            <label className="border p-2 rounded-xl">
                <input type="password" placeholder="Password" className="input" value={form.password}
                       onChange={e => setForm({...form, password: e.target.value})}/>
            </label>
            <button type="submit" className="btn mt-4 border-t border-l">Register</button>
        </form>
    );
}
