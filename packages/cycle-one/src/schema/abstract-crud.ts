export enum OperatorEnum {
  Create = "create",
  Read = "read",
  ReadAll = "readAll",
  Update = "update",
  Delete = "delete",
}

export enum OrderByEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  Name = "name",
  Identifier = "identifier",
  ServerName = "serverName",
  Effects = "effects",
  Author = "author",
}

export enum OrderTypeEnum {
  Asc = "asc",
  Desc = "desc",
}

export type Operator = "create" | "read" | "readAll" | "update" | "delete";

export interface Pagination {
  skip: number;
  take: number;
  search: any;
  searchBy: any;
  orderBy: "createdAt" | "updatedAt";
  orderType: "asc" | "desc";
}