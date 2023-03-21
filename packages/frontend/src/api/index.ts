import axios from "axios";
import { config } from "config";

const BASE_URL = `${config.base_url}/api/v1`;
const TOKEN_KEY = config.token_key ?? "";

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
