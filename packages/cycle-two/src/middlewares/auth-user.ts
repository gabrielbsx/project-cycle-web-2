import { NextFunction, Request, Response } from "express";
import { tokenizer } from "../services/tokenizer/jwt";
import { eitherWrapper } from "../utils/either";
import { User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

export const authUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: "You are not logged in",
    });
  }
  const [_, token] = authorization.split(" ");
  if (!token) {
    return response.status(401).json({
      message: "You are not logged in",
    });
  }
  const [error, userDecoded] = await eitherWrapper<UserWithoutPassword>(
    tokenizer.verify(token, process.env.TOKEN_SECRET as string)
  );
  if (error) {
    return response.status(401).json({
      message: "You are not logged in",
    });
  }
  request.user = userDecoded!;
  next();
};
