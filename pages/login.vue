<script setup lang="ts">
const { data, status, getCsrfToken, getProviders, signIn } = useAuth()
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
definePageMeta({ auth: false })

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}
async function onSubmit (data: any) {
    const { error, url } = await signIn('credentials', { email: data.email, password: data.password });
}


</script>

<template>
<UContainer>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome back!"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink to="/" class="text-primary font-medium">Sign up</NuxtLink>.
      </template>

      <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>
      </template>

      <template #footer>
        By signing in, you agree to our <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>

  </UContainer>
</template>
