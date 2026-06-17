// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon"],
  fonts: {
    defaults: {
      weights: [500, 700, 800, 900],
    },
  },
  nitro: {
    preset: "bun",
    storage: {
      itemStore: {
        driver: "fs",
        base: "server/data/items",
        ignore: ".*",
      },
      images: {
        driver: "fs",
        base: "./public/images/data",
      },
    },
  },
});
