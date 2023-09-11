<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import UserForm from 'Resources/pages/Users/UserForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useUserStore } from 'Resources/stores/user'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  id = window.location.pathname === '/user/create'
    ? null
    : window.location.pathname.split('/').pop();

const handleSubmit = (data) => {
  if (id) {
    useUserStore().update(id, data)
      .then(() => router.get('/user/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useUserStore().create(data)
      .then(() => router.get('/user/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  }
};

onMounted(async () => {
  if (id) {
    const { current } = storeToRefs( useUserStore() );
    await useUserStore().find(id)
    const { password, ...user } = current.value
    Object.entries(user).forEach(([key, value]) => values[key] = value)
  }
})

onBeforeUnmount(() => useUserStore().$reset())
</script>

<template>
  <Head :title="id ? 'Edit User' : 'Create User'" />
  <UserForm
    :errors="errors"
    :values="values"
    :password-required="!id"
    @submit="handleSubmit"
  />
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {
  @apply flex-row flex-wrap justify-center p-6;

  .formkit-outer {
    margin: 0 2rem 2rem 0;
  }
}
</style>
