<script setup lang="ts">
const { data: semester } = await useFetch('/api/semester');

const columns = [{
  key: '_id',
  label: 'ID'
}, 
{
  key: 'name',
  label: 'Name',
  sortable: true
},
{
  key: 'slug',
  label: 'Slug',
  sortable: true
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
    to: '/admin/semester/' + row._id + '/edit'
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

</script>

<template>
  <UContainer>
    <UPageHeader title="Semesters" :links="[{ label: 'Add Semester', color: 'white', icon: 'i-heroicons-plus-circle', to: '/admin/semester/add', target: '_self' }]" />
    
    <UTable :columns="columns" :rows="semester.data" >
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
    </UTable>
  </UContainer>
</template>