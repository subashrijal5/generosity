export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@nuxt/test-utils/module",
  ],

  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "" },
  typescript: { shim: false },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },

  app: {
    head: {
      title: "Generosity",
      titleTemplate: "%s - Generosity",
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "https://generosity-be.subashrijal.com.np",
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  experimental: {
    asyncContext: true,
  },
});
