import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",          // keep the dot-slash for safe asset loading
  build: {
    outDir: "dist",
  },
});
