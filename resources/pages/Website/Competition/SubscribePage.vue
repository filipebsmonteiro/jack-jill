<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n';
import { toast } from 'Resources/helpers/notifications'
import { useAuthStore } from "Resources/stores/auth";
import { useCompetitionStore } from 'Resources/stores/competition';
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'

const { t } = useI18n()
const { subscribe, getRolesAsOptions } = useCompetitionStore()
const roles = computed(() => getRolesAsOptions.filter(r => r.value !== 'judge'))
const { current, loading, subscribes } = storeToRefs(useCompetitionStore())
const { getLevelsAsOptions } = storeToRefs(useCompetitionLevelStore())
const { getUser: user } = storeToRefs(useAuthStore())
const subscription = computed(() => subscribes.value.find(subscription => subscription.user_id === user.value.id))

const subscribeHandler = async ({ level, role }) => {
  console.log('current :>> ', current);
  await subscribe({ id: current.value.id, userId: user.value.id, level_id: level, role })
    .then(() =>
      toast.success(`${t('user.label')} ${user.value.first_name} ${t('competition.subscribed')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('competition.subscribed')} ${t('user.label')} ${user.first_name}`)
    )
}
// const unsubscribeHandler = async (user) => {
//   await unsubscribe(id, user.id)
//     .then(() =>
//       toast.success(`${t('user.label')} ${user.first_name} ${t('competition.unsubscribed')} ${t('system.actions.with_success')}`)
//     )
//     .catch(() =>
//       toast.error(`Error ${t('competition.unsubscribed')} ${t('user.label')} ${user.first_name}`)
//     )
// }

// const updateSubscription = async (userId, data) => {
//   await useCompetitionStore().updateSubscription({ competitionId: id, userId, ...data })
//   .then(() =>
//       toast.success(`${t('subscription.label')} ${t('competition.updated')} ${t('system.actions.with_success')}`)
//     )
//   .catch(() =>
//       toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
//     )
// }

onMounted(async () => {
  if (!user.value) {
    await this.logout(form);
    router.get("/auth/login");
  }

  await useCompetitionLevelStore().load()
  useCompetitionStore().loadSubscription({
    competitionId: router.page.props.id,
    userId: user.value.id
  })
})
</script>

<template>
  <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
  <div v-else class="flex column flex-center">
    <span class="my-5">{{ current?.name }}</span>
    <span v-if="subscription" class="my-5">
      <b>Status:</b> {{ $t(`subscription.status.${subscription.status}`, subscription.status) }}
    </span>
    <FormKit type="form" @submit="subscribeHandler"  :actions="!subscription">
      <FormKit
        type="select"
        input-class="formkit-input-sm"
        name="level"
        :label="$t('competition.level.label')"
        :options="getLevelsAsOptions"
        :value="subscription?.level_id "
        :disabled="subscription"
        validation="required"
      />
      <FormKit
        type="select"
        input-class="formkit-input-sm"
        name="role"
        :label="$t('competition.competitor.role')"
        :options="roles"
        :value="subscription?.role"
        :disabled="subscription"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {
  @apply flex-row flex-wrap justify-center p-6;

  .formkit-outer {
    margin: 0 2rem 2rem 0;
  }
}
</style>
