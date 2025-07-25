import { useState, useEffect } from 'react';

type BookingInput = {
    meetingRoomId: number;
    userId?: string;
    description?: string;
    startTime: string;
    endTime: string;
};

type Booking = {
    id: number;
    description?: string;
    startTime: string;
    endTime: string;
};

export function useBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const fetchBookings = async () => {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        setBookings(data);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const createBooking = async (booking: BookingInput) => {
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });

            if (!res.ok) {
                const err = await res.json();
                return { success: false, error: err.error || 'Unknown error' };
            }

            const newBooking = await res.json();
            setBookings((prev) => [...prev, newBooking]);
            return { success: true };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return { success: false, error: error.message };
            } else {
                return { success: false, error: 'Unknown error occurred' };
            }
        }
    };

    return {
        bookings,
        fetchBookings,
        createBooking,
    };
}
