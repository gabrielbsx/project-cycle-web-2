import { NextFunction, Request, Response } from "express";
import { abstractCRUDUseCase } from "./abstract-crud.usecase";
import {
  Operator,
  Pagination,
  abstractCRUDValidator,
  validateEntity,
  validateOperator,
  validatePagination,
} from "./abstract-crud.validator";
import { not } from "../../utils/operators";
import { validationError } from "../../utils/http";

const convertMethodToOperator = (method: string, hasId: boolean) => {
  switch (method) {
    case "POST":
      return "create";
    case "GET":
      if (hasId) {
        return "read";
      }
      return "readAll";
    case "PUT":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "readAll";
  }
};

export const abstractCRUDController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (not(validateEntity(request.params.entity))) {
    return next(validationError("Invalid entity"));
  }
  const operator = convertMethodToOperator(request.method, !!request.params.id);
  if (not(validateOperator(operator))) {
    return next(validationError("Invalid operator"));
  }
  if (operator === "readAll") {
    const pagination = validatePagination(request.query);
    Object.assign(request.query, pagination);
    if (not(pagination)) {
      return next(validationError("Invalid pagination"));
    }
  }
  const abstractDTO = abstractCRUDValidator(
    request.body,
    request.params.entity + ":" + operator
  );
  const [error, abstractData] = await abstractCRUDUseCase(
    abstractDTO,
    request.params.entity,
    operator as Operator,
    request.query as unknown as Pagination
  );
  if (error) {
    return next(error);
  }
  const { statusCode, ...data } = abstractData;
  return response.status(statusCode).json(data);
};
