'use client'

import {useParams} from 'next/navigation'
import {useMeetingRooms} from "@/hooks/useMeetingRooms";

const RoomPage = () => {
    const params = useParams();

    const {rooms} = useMeetingRooms();
    console.log(params);
    const room = rooms.find((room) => room.id.toString() === params?.roomId);

    if (!room) {
        return <p className="p-5 text-red-500">Кімнату не знайдено</p>;
    }

    return (
        <section className="gap-2 p-5 w-full">
            <div className="header border border-gray-400 py-5 border-b-0 p-10 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold">{room.name}</h1>
                <p className="text-gray-400">{room.description}</p>
            </div>
            <div className="main-container flex items-center justify-center gap-2 shadow-lg h-[350px]">
                <p>Room page</p>

            </div>
        </section>
    );
};

export default RoomPage;
