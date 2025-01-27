import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  test: {
    environment: "happy-dom",
  },
});
