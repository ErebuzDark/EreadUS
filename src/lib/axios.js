import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
    ? "/api" // Vite proxy in dev
    : "https://gomanga-api.vercel.app/api", // direct URL in production
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
