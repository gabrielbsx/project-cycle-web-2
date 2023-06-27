import axios from "axios";
import { toast } from "react-toastify";
import { Operator, OperatorEnum, Pagination } from "../schema/abstract-crud";

export interface AbstractCRUD {
  entity: string;
  operator: Operator;
  pagination?: Pagination;
  data?: any;
  id?: string;
}

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    if (error.response?.status === 403) {
      toast.error("You don't have permission to do this action");
    }
    if (error.response?.status === 404) {
      toast.error("Not found");
    }
    if (error.response?.status === 500) {
      toast.error("Internal server error");
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  return config;
});

const convertOperatorToMethod = (operator: Operator) => {
  switch (operator) {
    case OperatorEnum.Create:
      return "POST";
    case OperatorEnum.Read:
      return "GET";
    case OperatorEnum.ReadAll:
      return "GET";
    case OperatorEnum.Update:
      return "PUT";
    case OperatorEnum.Delete:
      return "DELETE";
    default:
      return "GET";
  }
};

export const apiService = {
  handleAbstractCRUD: async ({
    entity,
    operator,
    pagination,
    data,
    id,
  }: AbstractCRUD) => {
    const method = convertOperatorToMethod(operator);
    const response = await api({
      method,
      url: `/abstract-crud/${entity}${id ? "/" + id : ""}`,
      params: pagination,
      data,
    });
    return response.data;
  },
};
