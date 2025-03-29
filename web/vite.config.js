import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4597,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Creates alias '@' for 'src'
    },
  },
});
