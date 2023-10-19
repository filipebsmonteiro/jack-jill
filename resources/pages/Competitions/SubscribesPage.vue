<script setup>
import { onMounted, reactive, ref, useAttrs, watch, markRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify'
import { plugin } from 'Resources/components/Form/SubmitLoading';
import { normalizeTimestamp } from 'Resources/helpers/functions';
import { useCompetitionStore } from 'Resources/stores/competition';
import { useSubscriptionStore } from 'Resources/stores/subscription';
import UserList from 'Resources/components/Form/User/ListComponent.vue';

const props = defineProps({ errors: Object, values: Object })
const { t } = useI18n()
const { id } = useAttrs()
const { loadSubscribes, subscribe, unsubscribe } = useCompetitionStore()
const { current, subscribes } = storeToRefs(useCompetitionStore())
const { getStatuses } = useCompetitionStore()

const subscribeHandler = async (user) => {
  await subscribe(id, user.id)
    .then(() =>
      toast.success(`${t('user.label')} ${user.first_name} ${t('competition.subscribed')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('competition.subscribed')} ${t('user.label')} ${user.first_name}`)
    )
}
const unsubscribeHandler = async (user) => {
  await unsubscribe(id, user.id)
    .then(() =>
      toast.success(`${t('user.label')} ${user.first_name} ${t('competition.unsubscribed')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('competition.unsubscribed')} ${t('user.label')} ${user.first_name}`)
    )
}

const updateSubscription = async (userId, data) => {
  await useCompetitionStore().updateSubscription({ competitionId: id, userId, ...data })
  .then(() =>
      toast.success(`${t('subscription.label')} ${t('competition.updated')} ${t('system.actions.with_success')}`)
    )
  .catch(() =>
      toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
    )
}

onMounted(() => loadSubscribes({ id }))
</script>

<template>
  <div class="flex-center flex-col p-4">
    <span class="my-3">{{ current?.name }}</span>
    <UserList
      :additional-columns="['status', 'score']"
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
          @input="status => updateSubscription(user.id, { status })"
        />
      </template>
      <template #score="{ user }">
        <FormKit
          type="number"
          input-class="formkit-input-sm"
          wrapper-class="w-50"
          :value="user.score"
          @input="score => updateSubscription(user.id, { score })"
        />
      </template>
    </UserList>
  </div>
</template>
