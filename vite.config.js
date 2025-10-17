import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ensure output folder is dist
  },
  base: "", // leave empty (Vercel samajh lega)
});
