import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/foo": {
        target: "https://plataforma.fullcontrolgps.com.ar",
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              console.log("Cookies from API:", cookies);
            }
          });
        },
      },
      "^/fallback/.*": {
        target: "https://plataforma.fullcontrolgps.com.ar",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              console.log("Cookies from API:", cookies);
            }
          });
        },
      },
      "/api": {
        target: "https://plataforma.fullcontrolgps.com.ar",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const cookies = proxyRes.headers["Set-Cookie"];
            if (cookies) {
              console.log("Cookies from API:", cookies);
            }
          });
        },
      },
    },
  },
  plugins: [react()],
});
