import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";

export const findAllServerUseCase = async (request: Request, response: Response) => {
    const servers = await db.server.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: true,
        },
    });
    return response.status(200).json({
        data: servers,
    });
}; 