import { NextFunction, Request, Response } from "express";
import { createUserValidator } from "./create-user.validator";
import { createUserUseCase } from "./create-user.usecase";

export const createUserController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request);
  const createUserDTO = createUserValidator(request.body);
  const [error, isUserCreated] = await createUserUseCase(createUserDTO);
  if (error) {
    return next(error);
  }
  return response.status(201).json({ isUserCreated });
};
