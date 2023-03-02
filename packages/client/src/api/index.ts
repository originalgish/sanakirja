import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
