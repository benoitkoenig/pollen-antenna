import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  root: "./src",
  base: "./",
  build: {
    emptyOutDir: true,
    outDir: "../dist/",
  },
  plugins: [
    ...(mode === "production"
      ? []
      : [
          viteStaticCopy({
            targets: [
              {
                src: path.resolve("../cdn/public"),
                dest: "",
              },
            ],
            structured: true,
          }),
        ]),
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
  },
}));
