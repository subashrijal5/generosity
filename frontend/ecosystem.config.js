module.exports = {
  apps: [
    {
      name: "frontend-app",
      exec_mode: "cluster",
      instances: 1,
      script: ".output/server/index.mjs",
      env: {
        NODE_ENV: "production",
        NUXT_PUBLIC_API_BASE_URL: "https://generosity-be.subashrijal.com.np",
        NUXT_PUBLIC_API_BASE: "https://generosity.subashrijal.com.np",
      },
    },
  ],
};
