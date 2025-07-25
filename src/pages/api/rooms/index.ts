import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ error: 'Назва обов’язкова' });

        const room = await prisma.meetingRoom.create({
            data: { name, description },
        });

        return res.status(201).json(room);
    }

    if (req.method === 'GET') {
        const rooms = await prisma.meetingRoom.findMany();
        return res.status(200).json(rooms);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
