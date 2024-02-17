<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types';
const route = useRoute();
const msg = ref();

const toast = useToast();
const form = ref();
const state = reactive({
    id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  phone: undefined,
  role: undefined
})
const roles = [{
  name: 'Admin',
  value: 'admin'
}, {
  name: 'User',
  value: 'user'
}]

console.log(route.params.id);
    const { data: user } = await useFetch('/api/users/findOne', {
        query: { _id: route.params.id }
    })
    
    const foundUser = user.value.data;
    state.id = foundUser._id;
    state.email = foundUser.email;
    state.firstName = foundUser.firstName;
    state.lastName = foundUser.lastName;
    state.phone = foundUser.phone;
    state.role = foundUser.role;

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.firstName) errors.push({ path: 'firstName', message: 'Required' })
  if (!state.lastName) errors.push({ path: 'lastName', message: 'Required' })
  if (!state.phone) errors.push({ path: 'lastNphoneame', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
     const responseData = await useFetch('/api/users/update', {
        method: 'post',
        body: state
    })

    toast.add({ title: 'User has been updated.' });

    if(responseData) {
      navigateTo('/admin/users');
    }
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
  {{ msg }}
<UContainer class="max-w-3xl w-full">
    <UPageHeader title="Edit User" description="Update user information." />
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

    <UFormGroup label="Role" name="role">
        <USelect v-model="state.role" :options="roles" option-attribute="name" />
    </UFormGroup>

    <UButton type="submit">
      Update
    </UButton>
  </UForm>
  </UContainer>
</template>