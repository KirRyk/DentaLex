import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: "/", // Это гарантирует, что пути /images/... всегда будут искаться от корня сайта
});
