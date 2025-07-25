import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
}
