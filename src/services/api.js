import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://api.dahabminers.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
