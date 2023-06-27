import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const createItemUseCase = async (request: Request, response: Response) => {
    const { body } = request;
    console.log(body);
    const schema = z.object({
        name: z.string().min(3).max(255),
        serverId: z.string().min(3).max(255),
        identifier: z.string().min(1).max(255).transform((val) => Number(val)),
        effects: z.string(),
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
    const itemCreated = await db.item.create({
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
    return response.status(201).json(itemCreated);
};