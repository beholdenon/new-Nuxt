<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
</template>