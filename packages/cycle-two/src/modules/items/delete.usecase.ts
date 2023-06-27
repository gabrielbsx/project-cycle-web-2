import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";

export const deleteItemUseCase = async (request: Request, response: Response) => {
    const { params } = request;
    const { id } = params;
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
    const itemDeleted = await db.item.delete({
        where: {
            id,
        },
    });
    return response.status(200).json(itemDeleted);
};