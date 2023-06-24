import { Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: () => void
) => {
  switch (error.name) {
    case "ValidationError":
      return response.status(400).json({ message: error.message });
    case "UnauthorizedError":
      return response.status(401).json({ message: error.message });
    case "NotFoundError":
      return response.status(404).json({ message: error.message });
    case "BadRequestError":
      return response.status(400).json({ message: error.message });
    default:
      return response.status(500).json({ message: error.message });
  }
};
