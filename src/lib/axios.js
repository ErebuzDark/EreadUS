import axios from "axios";

const api = axios.create({
  baseURL: "/api", // hits local proxy in dev, Vercel function in prod
  timeout: 10000,
});

// const api = axios.create({
//   baseURL: import.meta.env.DEV
//     ? "/api" // use Vite proxy in development
//     : import.meta.env.VITE_API_BASE_URL, // use full URL in production
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default api;
