<script setup>
import { onMounted, useAttrs } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { toast } from 'Resources/helpers/notifications';
import { useEventStore } from 'Resources/stores/event';
import UserList from 'Resources/components/Form/User/UserList.vue';

const { t } = useI18n()
const { id } = useAttrs()
const { loadSubscribes, subscribe, unsubscribe } = useEventStore()
const { current, subscribes } = storeToRefs(useEventStore())
const { getStatuses } = useEventStore()

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

const updateStatus = async (userId, status) => {
  await useEventStore().updateSubscription({ eventId: id, userId, status })
  .then(() =>
      toast.success(`${t('subscription.label')} ${t('event.updated')} ${t('system.actions.with_success')}`)
    )
  .catch(() =>
      toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
    )
}

onMounted(() => loadSubscribes({ id, relationships: ['users'] }))
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
        <FormKit
          type="select"
          input-class="formkit-input-sm"
          wrapper-class="w-50"
          :options="getStatuses"
          :value="user.status"
          @input="evt => updateStatus(user.id, evt)"
        />
      </template>
    </UserList>
  </div>
</template>
