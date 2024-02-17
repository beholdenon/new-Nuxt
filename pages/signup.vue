<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
definePageMeta({ auth: false })

const state = reactive({
  email: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  phone: undefined
})

const form = ref()

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  if (!state.firstName) errors.push({ path: 'firstName', message: 'Required' })
  if (!state.lastName) errors.push({ path: 'lastName', message: 'Required' })
  if (!state.phone) errors.push({ path: 'phone', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
     const { data: responseData } = await useFetch('/api/users', {
        method: 'post',
        body: { 
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          phone: state.phone,
          role: 'user'
        }
    })

    console.log(responseData.value)
  } catch (err) {
    if (err.statusCode === 422) {
      form.value.setErrors(err.data.errors.map((err) => {
        // Map validation errors to { path: string, message: string }
      }))
    }
  }

}

async function onError (event: FormErrorEvent) {
  console.log(event.errors);
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <UContainer class="max-w-3xl w-full">
    <UPageHeader title="Sign Up" description="Fill out the form below to sign up." />

  <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">

    <UFormGroup label="First Name" name="firstName">
      <UInput v-model="state.firstName" icon="i-heroicons-user-circle" />
    </UFormGroup>

    <UFormGroup label="Last Name" name="lastName">
      <UInput v-model="state.lastName" icon="i-heroicons-user-circle" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="you@example.com" />
    </UFormGroup>

    <UFormGroup label="Phone" name="phone">
        <UInput v-model="state.phone" icon="i-heroicons-device-phone-mobile" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" icon="i-heroicons-lock-closed"  />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
  </UContainer>
</template>