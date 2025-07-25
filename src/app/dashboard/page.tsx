'use client';

import {useMeetingRooms} from "@/hooks/useMeetingRooms";
import CreateRoomModal from "@/components/CreateRoomModal";
import {useState} from "react";
import {EditRoomModal} from "@/components/EditRoomModal";
import Image from "next/image";
import penIcon from "../../../public/edit-pen.svg"
import trashIcon from "../../../public/trash-bin.svg"
import Link from "next/link";


export default function DashboardPage() {
    const {
        newRoom,
        setNewRoom,
        rooms,
        createRoom,
        deleteRoom,
        updateRoom,
        roomToEdit,
        setRoomToEdit,
        saveUpdatedRoom
    } = useMeetingRooms()

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Переговорні кімнати</h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
                Додати кімнату
            </button>

            <ul className="space-y-2 flex flex-wrap gap-4">
                {rooms.map(room => (
                    <li key={room.id} className="p-4 border rounded flex justify-between items-center gap-3">
                        <div>
                            <Link href={{
                                pathname: `/dashboard/${room.id}`,
                            }}>
                                <strong>{room.name}</strong>
                            </Link>
                            <p className="text-sm text-gray-600">{room.description}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => updateRoom(room)} className="text-gray-400">
                                <Image
                                    src={penIcon}
                                    width={24}
                                    height={24}
                                    alt="penIcon"
                                />
                            </button>
                            <button onClick={() => deleteRoom(room.id)} className="text-red-600">
                                <Image
                                    src={trashIcon}
                                    width={24}
                                    height={24}
                                    alt="trashIcon"
                                />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <CreateRoomModal onCreate={createRoom} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                             newRoom={newRoom} setNewRoom={setNewRoom}
            />

            <EditRoomModal
                room={roomToEdit}
                onClose={() => setRoomToEdit(null)}
                onSave={saveUpdatedRoom}
            />
        </div>
    );
}
