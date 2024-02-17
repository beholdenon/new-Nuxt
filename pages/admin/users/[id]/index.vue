<script setup lang="ts">
import { format } from 'date-fns'
const { data, status, getCsrfToken, getProviders } = useAuth();
const route = useRoute();

const { data: user } = await useFetch('/api/users/findOne', {
  query: { _id: route.params.id }
})


const state = reactive({
  body: undefined,
  date: new Date(),
  count: true,
  studentId: user.value.data._id,
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
     const { data: responseData } = await useFetch('/api/meeting', {
        method: 'post',
        body: state
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

const columns = [
{
  key: 'date',
  label: 'Date',
  sortable: true
},
{
  key: 'advisor',
  label: 'Advisor',
  sortable: true
},
{
  key: 'body',
  label: 'Notes'
},
{
  key: 'count',
  label: 'Count'
}
]

const sortedMeetings = user.value.data.meetings.sort(function(a, b) {
  let dateA = new Date(a.date);
  let dateB = new Date(b.date);
  return dateA - dateB;
});

</script>

<template>
    <UContainer class="max-w-3xl w-full">
      
      <div class="container py-10 mx-auto">

      <UAvatar :alt="user.data.firstName + ' ' + user.data.lastName" size="xl" />

        <UPageHeader :title="user.data.firstName + ' ' + user.data.lastName" :links="[{ label: 'Edit', color: 'white', icon: 'i-heroicons-pencil', to: '/admin/users/' + user.data._id + '/edit', target: '_self' }]" />
        <UPageLinks
    :links="[{ icon: 'i-heroicons-envelope', label: user.data.email }, { icon: 'i-heroicons-device-phone-mobile', label: user.data.phone }]" />
  </div>

    <div class="container py-10 mx-auto">
    <SectionTitle title="Meetings" />
    <UTable :columns="columns" :rows="sortedMeetings" v-model="selected" >
    <template #date-data="{ row }">
       {{formatDate(row.date)}}
    </template>
      </UTable>
  </div>

  <div class="container py-10 mx-auto">
   <SectionTitle title="Add Meeting" />
    <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">

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
</div>

    </UContainer>
</template>