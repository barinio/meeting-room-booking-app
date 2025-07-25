'use client';

import {Dispatch, SetStateAction, useState} from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description?: string) => void;
    newRoom: { name: string; description: string; };
    setNewRoom: Dispatch<SetStateAction<{
        name: string;
        description: string;
    }>>
};

export default function CreateRoomModal({isOpen, onClose, onCreate, newRoom, setNewRoom}: Props) {

    const handleSubmit = () => {
        onCreate(newRoom.name.trim(), newRoom.description.trim());
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-[rgba(15,15,15,0.3)] bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl z-10">
                <h2 className="text-xl text-black font-semibold mb-4">Створити кімнату</h2>

                <div className="mb-6">
                    <label>
                        <input
                            className="border p-2 mr-2 text-black border-gray-700"
                            placeholder="Назва"
                            value={newRoom.name}
                            onChange={e => setNewRoom(prev => ({...prev, name: e.target.value}))}
                        />
                    </label>

                    <label>
                        <input
                            className="border p-2 mr-2 text-black border-gray-700"
                            placeholder="Опис"
                            value={newRoom.description}
                            onChange={e => setNewRoom(prev => ({...prev, description: e.target.value}))}
                        />
                    </label>
                </div>


                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Створити
                    </button>
                </div>
            </div>
        </div>
    );
}
