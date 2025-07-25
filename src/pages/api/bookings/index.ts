import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {meetingRoomId, userId, description, startTime, endTime} = req.body;

            if (!userId || !meetingRoomId || !startTime || !endTime) {
                return res.status(400).json({error: 'Всі поля обов’язкові'});
            }

            const conflictingBooking = await prisma.booking.findFirst({
                where: {
                    meetingRoomId,
                    startTime: {lt: new Date(endTime)},
                    endTime: {gt: new Date(startTime)},
                },
            });

            if (conflictingBooking) {
                return res.status(409).json({error: 'Час зайнятий. Виберіть інший.'});
            }

            const booking = await prisma.booking.create({
                data: {
                    meetingRoomId,
                    userId,
                    description,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                },
            });

            return res.status(201).json(booking);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Помилка при створенні бронювання:', error.message);
            } else {
                console.error('Помилка при створенні бронювання:', error);
            }

            return res.status(500).json({error: 'Внутрішня помилка сервера'});
        }
    }


    if (req.method === 'GET') {
        try {
            const {roomId} = req.query;

            const bookings = await prisma.booking.findMany({
                where: {
                    meetingRoomId: roomId ? Number(roomId) : undefined,
                },
                include: {
                    meetingRoom: true,
                    user: true,
                },
                orderBy: {
                    startTime: 'asc',
                },
            });

            return res.status(200).json(bookings);
        } catch (e) {
            return res.status(500).json({error: 'Помилка при отриманні бронювань'});
        }
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
