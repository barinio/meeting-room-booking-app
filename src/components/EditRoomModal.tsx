'use client';
import { MeetingRoom } from '@/types/meeting-room';
import { FC, useState, useEffect } from 'react';

interface EditRoomModalProps {
    room: MeetingRoom | null;
    onClose: () => void;
    onSave: (updated: { name: string; description: string }) => void;
}

export const EditRoomModal: FC<EditRoomModalProps> = ({ room, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (room) {
            setName(room.name);
            setDescription(room.description || '');
        }
    }, [room]);

    if (!room) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-[rgba(15,15,15,0.3)] bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl z-10">
                <h2 className="text-xl font-bold mb-4 text-black">Редагувати кімнату</h2>
                <input
                    type="text"
                    className="w-full mb-3 p-2 border rounded text-black"
                    placeholder="Назва"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    className="w-full mb-3 p-2 border rounded text-black"
                    placeholder="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 bg-gray-300 rounded text-black" onClick={onClose}>
                        Скасувати
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => onSave({ name, description })}
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
};
