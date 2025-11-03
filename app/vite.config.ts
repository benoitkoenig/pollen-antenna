import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: "./src",
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../dist/",
  },
  plugins: [react(), tsconfigPaths({ root: ".." }), tailwindcss()],
  server: {
    strictPort: true,
  },
});
