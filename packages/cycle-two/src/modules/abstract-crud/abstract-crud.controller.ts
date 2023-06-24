import { NextFunction, Request, Response } from "express";
import { AuthData, abstractCRUDUseCase } from "./abstract-crud.usecase";
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

const getRelationToPersistEntity = (entity: string, data: any) => {
  switch (entity) {
    case "server":
      return [
        {
          table: "user",
          id: data.userId,
        },
      ];
    case "item":
      return [
        {
          table: "server",
          id: data.serverId,
        },
      ];
    default:
      return [];
  }
};

export const abstractCRUDController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { method, query, body, params } = request;
  const { entity, id } = params;
  if (not(validateEntity(entity))) {
    return next(validationError("Invalid entity"));
  }
  const operator = convertMethodToOperator(method, !!id);
  if (not(validateOperator(operator))) {
    return next(validationError("Invalid operator"));
  }
  if (operator === "readAll") {
    const pagination = validatePagination(query);
    Object.assign(query, pagination);
    if (not(pagination)) {
      return next(validationError("Invalid pagination"));
    }
  }
  const abstractDTO = abstractCRUDValidator(body, entity + ":" + operator);
  const userId = request.user.id;
  const [error, abstractData] = await abstractCRUDUseCase(
    abstractDTO,
    entity,
    operator as Operator,
    query as unknown as Pagination,
    getRelationToPersistEntity(entity, { ...body, ...params, userId })
  );
  if (error) {
    return next(error);
  }
  const { statusCode, ...data } = abstractData;
  return response.status(statusCode).json(data);
};
