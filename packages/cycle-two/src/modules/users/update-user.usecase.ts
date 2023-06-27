import { Request, Response } from "express";
import { z } from "zod";
import { cryptography } from "../../services/cryptography/bcrypt";
import { db } from "../../data/prisma.repository";

export const updateUserUseCase = async (request: Request, response: Response) => {
    const schema = z.object({
        name: z.string().optional(),
        password: z.string().optional(),
    });
    const data = schema.partial().parse(request.body);
    const user = await db.user.findUnique({
        where: {
            id: request.user.id,
        },
    });
    if (!user) {
        return response.status(404).json({
            message: 'User not found',
        });
    }
    let passwordHashed: string | undefined
    if (data.password) {
        passwordHashed = await cryptography.hash(data?.password);
    }

    const dataToUpdate = {
        name: data.name,
        password: passwordHashed,
    }
    const dataWithoutUndefined = Object.fromEntries(Object.entries(dataToUpdate).filter(([_, v]) => v != undefined));
    if (Object.keys(dataWithoutUndefined).length === 0) {
        return response.status(400).json({
            message: 'No data to update',
        });
    }
    if (dataWithoutUndefined.password && dataWithoutUndefined.password.length < 4) {
        return response.status(400).json({
            message: 'Password must be at least 4 characters',
        });
    }
    if (dataWithoutUndefined.name && dataWithoutUndefined.name.length < 4) {
        return response.status(400).json({
            message: 'Name must be at least 4 characters',
        });
    }
    const userUpdated = await db.user.update({
        where: {
            id: request.user.id,
        },
        data: dataWithoutUndefined,
    });
    const userUpdatedWithoutPassword = Object.assign(userUpdated, {
        password: undefined,
    });
    return response.status(200).json(userUpdatedWithoutPassword);
};