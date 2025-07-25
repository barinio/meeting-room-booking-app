'use client'

import {useParams} from 'next/navigation'
import {useMeetingRooms} from "@/hooks/useMeetingRooms";
import CreateBookingForm from "@/components/CreateBookingForm";
import {useAuth} from "../../../../context/AuthContext";
import {useState, useEffect} from "react";

type Booking = {
    id: string;
    userId: string;
    meetingRoomId: number;
    startTime: string;
    endTime: string;
    description: string;
    user?: {
        name: string;
    };
};

const RoomPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const {userId} = useAuth();

    const {rooms} = useMeetingRooms();
    const room = rooms.find((room) => room.id.toString() === params?.roomId);
    const [bookings, setBookings] = useState<Booking[]>([]);
    console.log(bookings)
    useEffect(() => {
        if (!room?.id) return;

        const fetchBookings = async () => {
            const res = await fetch(`/api/bookings?roomId=${room.id}`);
            const data = await res.json();
            setBookings(data);
        };

        fetchBookings();
    }, [room?.id]);

    if (!room) {
        return <p className="p-5 text-red-500">Кімнату не знайдено</p>;
    }

    return (
        <section className="gap-2 p-5 w-full">
            <div
                className="header border flex justify-between border-gray-400 py-5 border-b-0 p-10 shadow-lg rounded-lg">
                <div>
                    <h1 className="text-2xl font-bold">{room.name}</h1>
                    <p className="text-gray-400">{room.description}</p>
                </div>

                <p>Room page</p>

            </div>
            <div className="main-container relative flex p-3 gap-2 shadow-lg ">
                {bookings.length === 0 ? (
                    <p className="text-gray-500">Немає активних бронювань</p>
                ) : (
                    <ul className="flex flex-wrap justify-between gap-4">
                        {bookings.map((b) => (
                            <li key={b.id} className="border p-3 rounded-md shadow-sm bg-white text-black">
                                <p className="capitalize">{b.description}</p>
                                <p><strong>З:</strong> {new Date(b.startTime).toLocaleString()}</p>
                                <p><strong>До:</strong> {new Date(b.endTime).toLocaleString()}</p>
                                {b.user?.name && (
                                    <p className="text-sm text-gray-600 capitalize"><strong>Користувач:</strong> {b.user.name}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-[-70px] right-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                >
                    Додати бронювання
                </button>
                <CreateBookingForm roomId={room.id} userId={userId} isOpen={isModalOpen}
                                   onClose={() => setIsModalOpen(false)}/>
            </div>
        </section>
    );
};

export default RoomPage;
