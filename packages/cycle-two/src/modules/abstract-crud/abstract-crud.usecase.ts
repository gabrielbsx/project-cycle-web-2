import { db } from "../../data/prisma.repository";
import { left, right } from "../../utils/either";
import { badRequest, ok } from "../../utils/http";
import { Operator, Pagination } from "./abstract-crud.validator";

export interface AuthData {
  id: string;
  role?: string;
}

export interface Relation {
  table: string;
  id: string;
}

const getIncludeFromEntity = (entity: string) => {
  switch (entity) {
    case "server":
      return {
        user: true,
      };
    case "item":
      return {
        server: true,
      };
    default:
      return {};
  }
};

const addRelationAndInputsToPersistEntity = (
  data: any,
  relation: Relation[]
) => {
  return {
    ...data,
    ...relation.reduce((acc, curr) => ({
      ...acc,
      [curr.table]: {
        connect: {
          id: curr.id,
        },
      },
    }), {}),
  };
};

export const abstractCRUDUseCase = async (
  data: any,
  entity: string,
  operator: Operator,
  pagination: Pagination,
  relation: Relation[]
) => {
  const { id, ...dataWithoutId } = data;
  switch (operator) {
    case "create":
      return right(
        ok({
          data: await db[entity].create({
            data: {
              ...addRelationAndInputsToPersistEntity(dataWithoutId, relation),
            },
          }),
          statusCode: 201,
        })
      );
    case "read":
      return right(
        ok({
          data: await db[entity].findFirst({
            where: {
              id,
            },
          }),
          statusCode: 200,
        })
      );
    case "readAll":
      const data = await db[entity].findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: {
          [pagination.searchBy]: {
            contains: pagination.search,
          },
        },
        orderBy: {
          [pagination.orderBy]: pagination.orderType,
        },
        include: {
          ...getIncludeFromEntity(entity),
        },
      });
      const count = await db[entity].count({
        where: {
          [pagination.searchBy]: {
            contains: pagination.search,
          },
        },
      });
      return right(
        ok({
          data,
          pagination: {
            count,
            skip: pagination?.skip,
            take: pagination?.take,
          },
          statusCode: 200,
        })
      );
    case "update":
      return right(
        ok({
          data: await db[entity].update({
            data: {
              ...dataWithoutId,
            },
            where: {
              id,
            },
          }),
          statusCode: 200,
        })
      );
    case "delete":
      return right(
        ok({
          data: await db[entity].delete({
            where: {
              id,
            },
          }),
          statusCode: 204,
        })
      );
    default:
      return left(badRequest("Invalid operator"));
  }
};
