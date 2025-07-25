import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const roomId = Number(req.query.id);

    if (req.method === 'PUT') {
        const { name, description } = req.body;

        const updatedRoom = await prisma.meetingRoom.update({
            where: { id: roomId },
            data: { name, description },
        });

        return res.status(200).json(updatedRoom);
    }

    if (req.method === 'DELETE') {
        await prisma.meetingRoom.delete({
            where: { id: roomId },
        });

        return res.status(204).end();
    }

    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
