<script setup lang="ts">
import { format } from 'date-fns'
const { data, status, getCsrfToken, getProviders } = useAuth();
const route = useRoute();
const form = ref();
const userId = route.params.id;

const state = reactive({
  body: undefined,
  date: new Date(),
  count: true,
  studentId: userId,
  advisor: data.value?.user.name,
  semester: 'Spring 2024'
})


const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.body) errors.push({ path: 'body', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
    console.log(state);
     const { data: responseData } = await useFetch('/api/meeting', {
        method: 'post',
        body: state,
        key: 'addMeeting'
    })
    console.log(responseData.value);

    if(responseData) {
      navigateTo('/admin/users/' + userId);
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
    <UContainer class="max-w-3xl w-full">
      <UPageHeader title="Add Meeting" description="Fill out the form below to add a meeting" />

    
    <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" >

      <UFormGroup label="Date" name="date">
    <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(state.date, 'd MMM, yyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="state.date" @close="close" />
      </template>
    </UPopover>
  </UFormGroup>

  <UFormGroup label="Meeting Notes" name="body">
    <UTextarea color="primary" v-model="state.body" />
  </UFormGroup>

  <UFormGroup label="Count Meeting" name="count">
  <UToggle color="primary" v-model="state.count" />
  </UFormGroup>

<UButton type="submit">
      Add Meeting
    </UButton>
</UForm>

  </UContainer>
</template>