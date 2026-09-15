// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://tonglianggurong.com",
  output: "server",
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: "compile",
  }),
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://tonglianggurong.com/404/",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});