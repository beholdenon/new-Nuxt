<script setup lang="ts">
const { data, status, getCsrfToken, getProviders, signOut } = useAuth();
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))


const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Profile',
    icon: 'i-heroicons-cog-8-tooth',
    href: '/profile'
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open'
  }, {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone'
  }, {
    label: 'Status',
    icon: 'i-heroicons-signal'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: signOut
  }]
]

const links = [{
  label: 'Home',
  icon: 'i-heroicons-book-open',
  to: '/'
}, {
  label: 'Users',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/admin/users'
}, {
  label: 'Semesters',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/admin/semester'
}]

</script>

<template>
  <UHeader>
    <template #logo>
      Logo
    </template>

    <template #center>
      <UHeaderLinks :links="links" v-if="status === 'authenticated'" />
      
    </template>

    <template #right>

  <UDropdown v-if="status === 'authenticated'" :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar :alt="data.user.name" size="sm" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ data.user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UButton v-if="status === 'unauthenticated'" href="/login" icon="i-heroicons-user-circle">Sign In</UButton>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>

	  <UButton v-if="status === 'unauthenticated'" href="/login" icon="i-heroicons-user-circle">Sign In</UButton>
		</template>
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
