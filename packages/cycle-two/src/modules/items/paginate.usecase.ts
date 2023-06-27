import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const paginateItemUseCase = async (request: Request, response: Response) => {
    const { query } = request;
    const schema = z.object({
        page: z.string().min(1).max(255).default('1'),
        limit: z.string().min(1).max(255).default('10'),
    });
    const data = schema.parse(query);
    const page = Number(data.page);
    const limit = Number(data.limit);
    const total = await db.item.count();
    if (page > Math.ceil(total / limit) && total > 0) {
        return response.status(400).json({
            message: 'Invalid page',
        });
    }
    const items = await db.item.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            server: true,
        },
    });
    return response.status(200).json({
        data: items,
        total,
    });
};