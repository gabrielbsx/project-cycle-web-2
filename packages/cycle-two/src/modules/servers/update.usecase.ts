import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const updateServerUseCase = async (request: Request, response: Response) => {
    const { params, body } = request;
    const { id } = params;
    const schema = z.object({
        name: z.string().min(3).max(255),
    });
    const data = schema.parse(body);
    const isServerExists = await db.server.findUnique({
        where: {
            id,
        },
    });
    if (!isServerExists) {
        return response.status(404).json({
            message: 'Server not found',
        });
    }
    const serverUpdated = await db.server.update({
        where: {
            id,
        },
        data: {
            name: data.name,
        },
    });
    return response.status(200).json(serverUpdated);
};