export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
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
      apiBaseUrl: process.env.API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  experimental: {
    asyncContext: true,
  },
});
