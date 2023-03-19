import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  optimizeDeps: {
    include: ["@sanakirja/shared"],
  },
  build: {
    commonjsOptions: {
      include: [/@sanakirja\/shared/, /node_modules/, /dist/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ["antd"],
        },
      },
    },
  },
});
