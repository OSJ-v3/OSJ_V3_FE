import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
