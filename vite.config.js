import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: "9999",
    // proxy: {
    //   "/api": {
    //     target: "https://gomanga-api.vercel.app",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, "/api"),
    //   },
    // },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
