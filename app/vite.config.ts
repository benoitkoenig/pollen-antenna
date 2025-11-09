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
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "formatjs",
            {
              idInterpolationPattern: "[sha512:contenthash:base64:6]",
              ast: true,
            },
          ],
        ],
      },
    }),
    tsconfigPaths({ root: ".." }),
    tailwindcss(),
  ],
  server: {
    strictPort: true,
    proxy: {
      "/api/pollen-antenna": {
        target: "http://localhost:7071",
        changeOrigin: true,
      },
    },
  },
});
