import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`;
const TOKEN_KEY = process.env.REACT_APP_LS_TOKEN_KEY ?? "";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const auth = token ? `Bearer ${token}` : "";

    if (config.headers) {
      config.headers.Authorization = auth;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
