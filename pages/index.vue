<script setup lang="ts">
const modules = [{
  title: 'VueUse',
  description: 'Collection of essential Vue Composition Utilities for Vue 2 and 3.',
  to: 'https://github.com/vueuse/vueuse',
  icon: 'i-simple-icons-nuxtdotjs'
}, {
  title: 'ESLint',
  description: 'ESLint module for Nuxt.',
  to: 'https://github.com/nuxt-community/eslint-module',
  icon: 'i-simple-icons-eslint'
}, {
  title: 'Tailwind CSS',
  description: 'Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.',
  to: 'https://github.com/nuxt-modules/tailwindcss',
  icon: 'i-simple-icons-tailwindcss'
}]

const heroLinks = [{ 
    label: 'Get Started', 
    icon: 'i-heroicons-rocket-launch', 
    size: 'lg' 
  }, 
  {
    label: 'Learn more',
    icon: 'i-heroicons-arrow-small-right',
    color: 'gray',
    size: 'lg' 
  }]
</script>

<template>
  <UContainer>

  <ULandingHero title="Turn Your Vision into Reality" description="Watch your dreams materialize before your eyes with us."  :links="heroLinks" />

    <UPageGrid>
    <UPageCard v-for="(module, index) in modules" :key="index" v-bind="module" target="_blank">
      <template #description>
        <span class="line-clamp-2">{{ module.description }}</span>
      </template>
    </UPageCard>
  </UPageGrid>

  
  </UContainer>
</template>