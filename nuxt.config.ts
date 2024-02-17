// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {  
    mongoUrl: process.env.MONGO_URL,
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth'],
  typescript: {
    shim: false
  },
    auth: {
      isEnabled: true,
      globalAppMiddleware: true,
        provider: {
            type: 'authjs',
        }
    }
})