import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const createServerUseCase = async (request: Request, response: Response) => {
    const { body, user } = request;
    const schema = z.object({
        name: z.string().min(3).max(255),
    });
    const data = schema.parse(body);
    const serverCreated = await db.server.create({
        data: {
            name: data.name,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    return response.status(201).json(serverCreated);
};