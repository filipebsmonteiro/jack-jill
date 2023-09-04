<script setup>
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import EventForm from 'Resources/pages/Events/EventForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useEventStore } from 'Resources/stores/event'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  id = window.location.pathname === '/event/create'
    ? null
    : window.location.pathname.split('/').pop();

const handleSubmit = (data) => {
  if (id) {
    useEventStore().update(id, data)
      .then(() => router.get('/event/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useEventStore().create(data)
      .then(() => router.get('/event/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  }
};

onMounted(async () => {
  if (id) {
    const { current } = storeToRefs( useEventStore() );
    await useEventStore().find(id)
    Object.entries(current.value).forEach(([key, value]) => values[key] = value)
  }
})
</script>

<template>
  <Head :title="true ? 'Create Event' : 'Edit Event'" />
  <EventForm
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
