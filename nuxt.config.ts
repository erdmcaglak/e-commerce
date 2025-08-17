// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/colors.scss";@import "@/assets/styles/mixins.scss";@import "@/assets/styles/transition.scss";@import "@/assets/styles/fonts.scss";@import "@/assets/styles/classes.scss";'
        }
      }
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      titleTemplate: 'Artisan | %s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Dummy e-ticaret sitesi - Vue3 & Nuxt3 ile hazırlandı' },
        { name: 'keywords', content: 'e-ticaret, vue3, nuxt3, dummy shop, artisan' },
        { name: 'author', content: 'Erdem Çağlak' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Artisan' },
        { property: 'og:description', content: 'Vue3 & Nuxt3 ile yapılmış dummy e-ticaret sitesi.' },
        { property: 'og:image', content: '/logo.png' }, // static içine koy
        { property: 'og:url', content: 'https://artisanzen.vercel.app' },
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Artisan' },
        { name: 'twitter:description', content: 'Vue3 & Nuxt3 ile yapılmış dummy e-ticaret sitesi.' },
        { name: 'twitter:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },
  modules: ['nuxt-icon', 'nuxt-swiper', "@nuxt/image"]
})