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
      viewport: 'width=device-width, initial-scale=1',
      title:'Artisan'
    }
  },
  modules: ['nuxt-icon']
})
