import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";
import { z } from 'zod';

export const paginateItemUseCase = async (request: Request, response: Response) => {
    const { query } = request;
    const schema = z.object({
        page: z.string().min(1).max(255).default('1').transform((val) => Number(val)),
        limit: z.string().min(1).max(255).default('10').transform((val) => Number(val)),
    });
    const data = schema.parse(query);
    const { orderBy, orderType } = query as { orderBy: string, orderType: string }
    const { page, limit } = data;
    const total = await db.item.count();
    if (page > Math.ceil(total / limit) && total > 0) {
        return response.status(400).json({
            message: 'Invalid page',
        });
    }
    let orderByObj: any = {};
    if (orderBy && orderType) {
        if (orderBy === 'serverName') {
            orderByObj = {
                server: {
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
    const items = await db.item.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: orderByObj,
        include: {
            server: true,
        },
    });
    return response.status(200).json({
        data: items,
        total,
    });
};