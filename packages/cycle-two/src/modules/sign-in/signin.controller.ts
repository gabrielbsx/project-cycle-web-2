import { NextFunction, Request, Response } from "express";
import { signInValidator } from "./signin.validator";
import { signInUseCase } from "./signin.usecase";

export const signInController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const signInDTO = signInValidator(request.body);
  const [error, user] = await signInUseCase(signInDTO);
  if (error) {
    return next(error);
  }
  return response.status(200).json(user);
};
