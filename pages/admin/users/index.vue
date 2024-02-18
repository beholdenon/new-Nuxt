<script setup lang="ts">
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  key: 'users'
})
const userList = users.value.data;
const q = ref('')
const selected = ref()

const filteredRows = computed(() => {
  if (!q.value) {
    return users.value.data
  }
  return users.value.data.filter((u) => {
    return Object.values(u).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const columns = [{
  key: '_id',
  label: 'ID'
}, 
{
  key: 'firstName',
  label: 'First Name',
  sortable: true
},
{
  key: 'lastName',
  label: 'Last Name',
  sortable: true
}, 
{
  key: 'email',
  label: 'Email'
},
{
  key: 'phone',
  label: 'Phone'
}, 
{
  key: 'role',
  label: 'Role',
  sortable: true
},
{
  key: 'actions'
}
]

const items = (row) => [
  [
  {
    label: 'View',
    icon: 'i-heroicons-eye',
    to: '/admin/users/' + row._id
  },
  {
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    to: '/admin/users/' + row._id + '/edit'
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash',
    click: () => deleteUser(row._id)
  }]
]

async function refreshUserData() {
  await refreshNuxtData('users');
}

async function deleteUser(userId) {
  console.log(userId)
  const { data: responseData } = await useFetch('/api/users/delete', {
        method: 'post',
        body: {userId: userId}
    })

    refreshUserData();
}

</script>

<template>
    <UContainer class="max-w-7xl w-full">

      <div class="container py-10 mx-auto flex-none">

    <div class="flex space-x-4 justify-items-center align-center">


<div class="self-center grow">
  <SectionTitle title="Users" />
</div>

<div class="self-center flex-none">
<UButton
icon="i-heroicons-plus-circle"
size="sm"
color="gray"
variant="outline"
label="Add User"
to="/admin/users/add"
:trailing="false"
/>
</div>
</div>
</div>

    <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter users..." />
    </div>

    <UTable :columns="columns" :rows="filteredRows" v-model="selected">
    <template #name-data="{ row }">
      <span :class="[selected.find(filteredRows => filteredRows._id === row._id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" @click="row.click" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
    </UTable>
  </div>
  </UContainer>
</template>