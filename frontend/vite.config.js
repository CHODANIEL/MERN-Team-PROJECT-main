// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 로컬 프록시 쓰면 localhost로 튀니 주석/삭제 권장
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  // },
});