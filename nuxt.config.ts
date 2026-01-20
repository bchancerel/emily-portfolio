import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },

  app: {
    head: {
      title: 'Emily Market Com',
      meta: [
        { name: 'description', content: 'Portfolio Social Média manager' },
      ],
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  css: ['./app/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
})
