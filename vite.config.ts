import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/dent/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define the @ alias
      // You can add more aliases as needed
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@utils': path.resolve(__dirname, './src/utils'),
      // ...
    },
  },
});
