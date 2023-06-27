import { Request, Response, NextFunction } from "express";
import { eitherWrapper } from "../utils/either";
import { tokenizer } from "../services/tokenizer/jwt";

export const guestUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;
  console.log(authorization)
  if (!authorization) {
    return next();
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    return next();
  }
  const [error, _] = await eitherWrapper(
    tokenizer.verify(token, process.env.TOKEN_SECRET as string)
  );
  if (error) {
    next();
  }
};
