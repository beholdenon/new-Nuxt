<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'

const state = reactive({
  name: undefined,
  slug: undefined
})

const form = ref()

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.slug) errors.push({ path: 'slug', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
     const { data: responseData } = await useFetch('/api/semester', {
        method: 'post',
        body: { 
            name: state.name,
          slug: state.slug
        }
    })

    if(responseData) {
      navigateTo('/admin/semester');
    }

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
    <UPageHeader title="Add Semester" description="Fill out the form below to add a user" />

  <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" icon="i-heroicons-user-circle" />
    </UFormGroup>

    <UFormGroup label="Slug" name="slug">
      <UInput v-model="state.slug" icon="i-heroicons-user-circle" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
  </UContainer>
</template>