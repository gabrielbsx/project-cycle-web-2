import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error("Unauthorized");
    }
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);
