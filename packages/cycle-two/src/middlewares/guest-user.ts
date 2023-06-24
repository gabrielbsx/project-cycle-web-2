import { Request, Response, NextFunction } from "express";

export const guestUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;
  if (authorization) {
    return response.status(401).json({
      message: "You are already logged in",
    });
  }
  next();
};
