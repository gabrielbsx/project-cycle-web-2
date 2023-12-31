import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const paginateServerUseCase = async (request: Request, response: Response) => {
    const { query } = request;
    const schema = z.object({
        page: z.string().min(1).max(255).default('1').transform((val) => Number(val)),
        limit: z.string().min(1).max(255).default('10').transform((val) => Number(val)),
    });
    const { orderBy, orderType } = query as { orderBy: string, orderType: string }
    const data = schema.parse(query);
    const page = data.page;
    const limit = data.limit;
    const total = await db.server.count();
    if (page > Math.ceil(total / limit) && total > 0) {
        return response.status(400).json({
            message: 'Invalid page',
        });
    }
    const paginate = {
        skip: (page - 1) * limit,
        take: limit,
    }
    let orderByObj: any = {};
    if (orderBy && orderType) {
        if (orderBy === 'author') {
            orderByObj = {
                user: {
                    name: orderType,
                },
            };
        } else {
            orderByObj = {
                [orderBy]: orderType,
            };
        }
    } else {
        orderByObj = {
            createdAt: 'desc',
        };
    }
    const servers = await db.server.findMany({
        ...paginate,
        orderBy: orderByObj,
        include: {
            user: true,
        },
    });
    return response.status(200).json({
        data: servers,
        total,
    });
};