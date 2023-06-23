import { Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: () => void
) => {
  console.error(error);
  return response.status(500).json({ message: error.message });
};
