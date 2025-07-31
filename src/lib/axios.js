import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ? "/api" : "/api", // works in both dev & prod
  timeout: 10000,
});

export default api;
