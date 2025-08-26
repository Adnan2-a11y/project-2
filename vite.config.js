import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // allow access from LAN
    port: 3000,         // change to 5173 if you prefer
    open: true          // auto-open browser tab
  },
  esbuild: {
    logOverride: {
      "ignored-directive": "silent", // silence specific warnings
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // ignore harmless warnings
        if (
          warning.message.includes("Module level directives") ||
          warning.message.includes('"use client"') ||
          warning.message.includes('"was ignored"')
        ) {
          return;
        }

        // let Vite/rollup handle others (don’t hard fail unless really needed)
        warn(warning);
      },
    },
  },
});