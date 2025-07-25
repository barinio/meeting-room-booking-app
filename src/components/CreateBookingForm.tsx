'use client';

import {useState} from 'react';
import {useBookings} from '@/hooks/useBookings';

type Props = {
    roomId: number;
    userId: string;
    onClose: () => void;
    isOpen: boolean;
};

export default function CreateBookingForm({roomId, userId, onClose, isOpen}: Props) {
    const {createBooking} = useBookings();

    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        console.log({
            meetingRoomId: roomId,
            userId,
            description,
            startTime,
            endTime,
        })

        const result = await createBooking({
            meetingRoomId: roomId,
            userId,
            description,
            startTime,
            endTime,
        });

        if (result.success) {
            setMessage('✅ Бронювання створено успішно!');
            setDescription('');
            setStartTime('');
            setEndTime('');
        } else {
            setMessage(`❌ Помилка: ${result.error}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-[rgba(15,15,15,0.3)] bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />
            <form onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-[300px] relative bg-blue-100 p-6 rounded-lg max-w-md shadow-xl z-10">
                <label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опис"
                className="border p-2 rounded border-black text-black placeholder-black w-full"
            />
                </label>
                <label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border p-2 rounded border-black text-black w-full"
                        required
                    />
                </label>

                <label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border p-2 rounded border-black text-black w-full"
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-900"
                >
                    Забронювати
                </button>
                {message && <p className="text-sm text-black">{message}</p>}
            </form>
        </div>
    );
}
