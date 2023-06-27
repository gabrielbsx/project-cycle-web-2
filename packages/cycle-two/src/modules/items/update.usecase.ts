import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const updateItemUseCase = async (request: Request, response: Response) => {
    const { params, body } = request;
    const { id } = params;
    const schema = z.object({
        name: z.string().min(3).max(255),
        serverId: z.string().min(3).max(255),
        identifier: z.string().min(1).transform((val) => Number(val)),
    });
    const data = schema.parse(body);
    const server = await db.server.findUnique({
        where: {
            id: data.serverId,
        },
    });
    if (!server) {
        return response.status(404).json({
            message: 'Server not found',
        });
    }
    const isItemExists = await db.item.findUnique({
        where: {
            id,
        },
    });
    if (!isItemExists) {
        return response.status(404).json({
            message: 'Item not found',
        });
    }
    const serverUpdated = await db.item.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            identifier: data.identifier,
            effects: data.effects,
            server: {
                connect: {
                    id: server.id,
                },
            },
        },
    });
    return response.status(200).json(serverUpdated);
};