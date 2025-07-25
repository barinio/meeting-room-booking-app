import {useState, useEffect} from 'react';
import {MeetingRoom} from "@/types/meeting-room";

export const useMeetingRooms = () => {
    const [rooms, setRooms] = useState<MeetingRoom[]>([]);
    const [newRoom, setNewRoom] = useState({name: '', description: ''});
    const [roomToEdit, setRoomToEdit] = useState<MeetingRoom | null>(null);

    const fetchRooms = async () => {
        try {
            const response = await fetch('/api/rooms');
            if (!response.ok) throw new Error('Failed to fetch rooms');
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    };

    const createRoom = async () => {
        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRoom),
            });
            if (!response.ok) throw new Error('Failed to create room');
            setNewRoom({name: '', description: ''});
            await fetchRooms();
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const updateRoom = async (room: MeetingRoom) => {
        setRoomToEdit(room);
    };
    const saveUpdatedRoom = async (updated: { name: string; description: string }) => {
        if (!roomToEdit) return;

        try {
            const response = await fetch(`/api/rooms/${roomToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated),
            });
            if (!response.ok) throw new Error('Failed to update room');
            setRoomToEdit(null);
            await fetchRooms();
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    const deleteRoom = async (id: number) => {
        if (!confirm('Ви дійсно хочете видалити кімнату?')) return;

        try {
            const response = await fetch(`/api/rooms/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete room');
            await fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return {
        setNewRoom,
        newRoom,
        setRooms,
        rooms,
        createRoom,
        deleteRoom,
        refetch: fetchRooms,
        updateRoom,
        saveUpdatedRoom,
        roomToEdit,
        setRoomToEdit,
    };
};
