/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        include: ["**/*.test.jsx"],
        setupFiles: "./setupTests.js",
      },
    },
  },
  test: {
    framework: "vitest",
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@client": path.resolve(__dirname),
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});
