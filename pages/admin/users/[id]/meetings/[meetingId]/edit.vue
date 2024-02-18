<script setup lang="ts">
import { format } from 'date-fns'
const { data, status, getCsrfToken, getProviders } = useAuth();
const route = useRoute();
const form = ref();
const userId = route.params.id;
const meetingId = route.params.meetingId;

var state = reactive({
  meetingId: undefined,
  body: undefined,
  date: undefined,
  count: undefined,
  studentId: userId,
  advisor: undefined,
  semester: undefined
})
console.log(meetingId)
const { data: user } = await useFetch('/api/users/findOne', {
    query: { _id: userId }
})

console.log(user);
user.value.data.meetings.map((meeting) => {
  if(meeting._id === meetingId) {
    state.meetingId = meeting._id;
    state.body = meeting.body;
    state.date = meeting.date;
    state.count = meeting.count;
    state.advisor = meeting.advisor;
    state.semester = meeting.semester;

  }
})
console.log(state);

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.body) errors.push({ path: 'body', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  try {
    console.log(state);
     const { data: responseData } = await useFetch('/api/meeting/update', {
        method: 'post',
        body: state,
        key: 'updateMeeting'
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

    
      <UPageHeader title="Update Meeting" description="Fill out the form below to update the meeting" />
    <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" >

      <UFormGroup label="Date" name="date">
    <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton color="gray" variant="solid" icon="i-heroicons-calendar-days-20-solid" :label="format(state.date, 'd MMM, yyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="state.date" @close="close" />
      </template>
    </UPopover>
  </UFormGroup>

  <UFormGroup label="Meeting Notes" name="body">
    <UTextarea v-model="state.body" color="gray"  />
  </UFormGroup>

  <UFormGroup label="Count Meeting" name="count">
  <UToggle v-model="state.count" />
  </UFormGroup>

<UButton type="submit">
      Update Meeting
    </UButton>
</UForm>

  </UContainer>
</template>