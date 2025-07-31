import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "/api", // works in both dev & prod
  timeout: 10000,
});

export default api;
