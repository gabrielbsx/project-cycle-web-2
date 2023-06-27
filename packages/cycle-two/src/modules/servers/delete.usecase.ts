import { Request, Response } from 'express';
import { db } from "../../data/prisma.repository";

export const deleteServerUseCase = async (request: Request, response: Response) => {
    const { params } = request;
    const { id } = params;
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
    const serverDeleted = await db.server.delete({
        where: {
            id,
        },
    });
    
    return response.status(200).json(serverDeleted);
};