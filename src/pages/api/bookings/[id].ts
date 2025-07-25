import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const bookingId = Number(req.query.id);

    if (req.method === 'PUT') {
        const { startTime, endTime, description } = req.body;

        const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
        if (!existing) return res.status(404).json({ error: 'Бронювання не знайдено' });

        const conflicting = await prisma.booking.findFirst({
            where: {
                id: { not: bookingId },
                meetingRoomId: existing.meetingRoomId,
                startTime: { lt: new Date(endTime) },
                endTime: { gt: new Date(startTime) },
            },
        });

        if (conflicting) {
            return res.status(409).json({ error: 'Час конфліктує з іншим бронюванням' });
        }

        const updated = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                description,
            },
        });

        return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
        await prisma.booking.delete({
            where: { id: bookingId },
        });
        return res.status(204).end();
    }

    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
