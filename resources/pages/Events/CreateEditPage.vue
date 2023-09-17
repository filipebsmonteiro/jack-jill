<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';
import EventForm from 'Resources/pages/Events/EventForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useEventStore } from 'Resources/stores/event'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  id = window.location.pathname === '/event/create'
    ? null
    : window.location.pathname.split('/').pop();
const { t } = useI18n()

const handleSubmit = (data) => {
  if (id) {
    useEventStore().update(id, data)
      .then(() => {
        toast.success(`${t('event.label')} <b>${data.name}</b> ${t('event.updated')} ${t('system.actions.with_success')}!`)
        router.get('/event/list')
      })
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useEventStore().create(data)
      .then(() => {
        toast.success(`${t('event.label')} <b>${data.name}</b> ${t('event.created')} ${t('system.actions.with_success')}!`)
        router.get('/event/list')
      })
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
    Object.entries(current.value).forEach(([key, value]) => (key !== 'image' ? values[key] = value :  null))
  }
})

onBeforeUnmount(() => useEventStore().$reset())
</script>

<template>
  <Head :title="id ? 'Edit Event' : 'Create Event'" />
  <EventForm
    :errors="errors"
    :values="values"
    @submit="handleSubmit"
  />
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {
  @apply p-6;
}
</style>
