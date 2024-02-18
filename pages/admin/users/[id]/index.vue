<script setup lang="ts">
import { format } from 'date-fns'
const { data, status, getCsrfToken, getProviders } = useAuth();
const route = useRoute();
const form = ref();
const studentId = route.params.id;

const { data: user, pending, error, refresh } = await useFetch('/api/users/findOne', {
  key: 'user-' + studentId,
  query: { _id: studentId }
})

async function refreshUserData() {
  await refreshNuxtData('user-' + studentId);
}




const columns = [
{
  key: 'date',
  label: 'Date',
  sortable: true,
},
{
  key: 'advisor',
  label: 'Advisor',
  sortable: true,
},
{
  key: 'body',
  label: 'Notes',
  class: 'w-1/2'
},
{
  key: 'count',
  label: 'Count'
},
{
  key: 'actions'
}
]

const items = (row) => [
  [
  {
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    to: '/admin/users/' + studentId + '/meetings/' + row._id + '/edit'
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash',
    click: () => deleteMeeting(row._id, studentId)
  }
]
]

const links = [
  {
    label: user.value.data.email,
    icon: 'i-heroicons-envelope'
  },
  {
    label: user.value.data.phone,
    icon: 'i-heroicons-device-phone-mobile'
  },
  {
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    label: 'Total Counted Meetings ' + user.value.data.countedMeetings
  }
]

</script>

<template>
    <UContainer class="max-w-7xl w-full">
      
      <div class="container py-10 mx-auto flex-none">
        <div class="flex space-x-4 justify-items-center align-center">
          <div><UAvatar :alt="user.data.firstName + ' ' + user.data.lastName" size="xl" />
        </div>

        <div class="self-center grow">
          <SectionTitle :title="user.data.firstName + ' ' + user.data.lastName" class=""/>
      </div>

      <div class="self-center flex-none">
        <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="gray"
        variant="outline"
        label="Edit User Profile"
        :to="'/admin/users/' + studentId + '/edit'"
        :trailing="false"
      />
      </div>
</div>
      
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</div>

    <div class="container py-10 mx-auto">


      <div class="flex space-x-4 justify-items-center align-center">


        <div class="self-center grow">
          <SectionTitle :title="'Meetings (' + user.data.countedMeetings + ')'" />
      </div>

      <div class="self-center flex-none">
        <UButton
        icon="i-heroicons-plus-circle"
        size="sm"
        color="gray"
        variant="outline"
        label="Add Meeting"
        :to="'/admin/users/' + studentId + '/meetings/add'"
        :trailing="false"
      />
      </div>
</div>
      
<div class="container py-10 mx-auto">

    <UTable :columns="columns" :rows="user.data.meetings" class="border-collapse border border-gray-800 table-auto whitespace-wrap overflow-hidden"  >
   
    <template #date-data="{ row }" >
       {{formatDate(row.date)}}
    </template>

    <template #count-data="{ row }">
      <UIcon v-if="row.count === true" class="text-xl" name="i-heroicons-check-circle" />
      <p v-else></p>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" @click="row.click" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
      </UTable>
  </div>
</div>
    </UContainer>
</template>