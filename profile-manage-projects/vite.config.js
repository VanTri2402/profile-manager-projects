import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ... phần còn lại của file cấu hình
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
