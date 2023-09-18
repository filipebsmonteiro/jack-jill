<script setup>
import { onMounted, reactive, ref, useAttrs, watch, markRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify'
import { plugin } from 'Resources/components/Form/SubmitLoading';
import { normalizeTimestamp } from 'Resources/helpers/functions';
import { useEventStore } from 'Resources/stores/event';
import UserList from 'Resources/components/Form/User/ListComponent.vue';

const props = defineProps({ errors: Object, values: Object })
const { t } = useI18n()
const { loadSubscribes, subscribe, unsubscribe } = useEventStore()
const { current, subscribes } = storeToRefs(useEventStore())
const { id } = useAttrs()
const subscribeHandler = async (user) => {
  await subscribe(id, user.id)
    .then(() =>
      toast.success(`${t('user.label')} ${user.first_name} ${t('event.subscribed')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('event.subscribed')} ${t('user.label')} ${user.first_name}`)
    )
}
const unsubscribeHandler = async (user) => {
  await unsubscribe(id, user.id)
    .then(() =>
      toast.success(`${t('user.label')} ${user.first_name} ${t('event.unsubscribed')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('event.unsubscribed')} ${t('user.label')} ${user.first_name}`)
    )
}

onMounted(() => loadSubscribes({ id }))
</script>

<template>
  <div class="flex-center flex-col p-4">
    <span class="my-3">{{ current?.name }}</span>
    <UserList
      :additional-columns="['status']"
      :users="subscribes"
      @addRow="subscribeHandler"
      @removeRow="unsubscribeHandler"
    >
      <template #status="{ user }">
        {{ user.status }}
      </template>
    </UserList>
  </div>
  <!-- <FormKitSchema :schema="schema" :data="data" :library="library" /> -->
</template>
