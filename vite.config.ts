import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set the base path for GitHub Pages deployment
  // When deploying to GitHub Pages, this should be '/your-repo-name/'
  base: mode === "production" ? "/dent-for-one/" : "/dent-for-one/",
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
