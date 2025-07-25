import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

declare module 'next' {
    interface NextApiRequest {
        userId?: string;
    }
}

type ApiHandler = (
    req: NextApiRequest,
    res: NextApiResponse
) => Promise<void> | void;

export const authenticate = (handler: ApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, secret) as { userId: string };
            req.userId = decoded.userId; // Тепер це типобезпечно
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
};
