// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon", "nuxt-auth-utils"],
  // routeRules: {
  //   '/': { prerender: true, noScripts: true },
  //   '/types/**': { prerender: true, noScripts: true },
  //   '/tag/**': { prerender: true, noScripts: true },
  // },
  fonts: {
    defaults: {
      weights: [500, 700, 800, 900],
    },
  },
  vite: {
    build: {
      modulePreload: {
        polyfill: false,
      },
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
      itemDataStore: {
        driver: "fs",
        base: "server/data/itemData",
        ignore: ".*",
      },
      imageStore: {
        driver: "fs",
        base: "server/data/images",
        ignore: ".*",
      },
    },
  },
});