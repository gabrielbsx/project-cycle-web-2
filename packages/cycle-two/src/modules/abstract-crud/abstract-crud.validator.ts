import * as zod from "zod";

export type Operator = "create" | "read" | "readAll" | "update" | "delete";

export interface Pagination {
  skip: number;
  take: number;
  search: any;
  searchBy: any;
  orderBy: "createdAt" | "updatedAt";
  orderType: "asc" | "desc";
}

export const validateEntity = (entity: string) => {
  switch (entity) {
    case "server":
      return true;
    case "item":
      return true;
    default:
      return false;
  }
};

export const validateOperator = (operator: any) => {
  switch (operator) {
    case "create":
      return true;
    case "read":
      return true;
    case "readAll":
      return true;
    case "update":
      return true;
    case "delete":
      return true;
    default:
      return false;
  }
};

const convertPagination = (pagination: any) => {
  const paginationConverted = {
    skip: Number(pagination.skip),
    take: Number(pagination.take),
    search: pagination.search,
    searchBy: pagination.searchBy,
    orderBy: pagination.orderBy,
    orderType: pagination.orderType,
  };
  return paginationConverted;
};

export const validatePagination = (pagination: any) => {
  const schemaConverted = convertPagination(pagination);
  const schema = zod.object({
    skip: zod.number().min(0),
    take: zod.number().min(1),
    search: zod.string(),
    searchBy: zod.string(),
    orderBy: zod.enum(["createdAt", "updatedAt"]),
    orderType: zod.enum(["asc", "desc"]),
  });
  return schema.parse(schemaConverted);
};

export const abstractCRUDValidator = (
  body: any,
  entityWithOperator: string
) => {
  const schemaObject = getSchemaByEntity(entityWithOperator);
  const schema = zod.object(schemaObject || {});
  return schema.parse(body);
};

const getSchemaByEntity = (entityWithOperator: string) => {
  const schemas = {
    "server:create": {
      name: zod.string().min(1).max(255),
    },
  };
  return schemas[entityWithOperator];
};
