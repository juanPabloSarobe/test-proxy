import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/foo": "http://fullcontroldedicado.ddns.net",
      "^/fallback/.*": {
        target: "http://fullcontroldedicado.ddns.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      "/api": {
        target: "http://fullcontroldedicado.ddns.net",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});

//",
/*   "/api": {
        target: "http://fullcontroldedicado.ddns.net",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }, */
