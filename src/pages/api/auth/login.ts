import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {NextApiRequest, NextApiResponse} from "next";

const secret: string = process.env.JWT_SECRET!;

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });


    const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: '7d',
    });

    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
}
