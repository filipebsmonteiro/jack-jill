<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useCompetitionStore } from 'Resources/stores/competition'
import SimpleTable from 'Resources/components/Table/SimpleTable';

const { t } = useI18n()
let { current, getCompetitors, getJudges, getScore } = storeToRefs( useCompetitionStore() ),
  columns = computed(() => {
    return [
      {
        key: 'first_name',
        label: t('competition.competitor.singular'),
        formatter: u => `${u.first_name} ${u.last_name}`
      },
      ...getJudges.value.map((judge, index) => ({
        key: `judge-${index}`,
        label: `${t('competition.judge.singular')} ${judge.first_name}`
      }))
    ]
  });

const persistScore = async (competitorId, judgeId, score) => {
  await useCompetitionStore().persistScore({ competitionId: current.value.id, competitorId, judgeId, score })
    .then(() =>
      toast.success(`${t('subscription.label')} ${t('competition.updated')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
    )
}
</script>

<template>
  <SimpleTable :columns="columns" :rows="getCompetitors" class="shadow overflow-hidden">
    <template v-for="(judge, i) in getJudges" #[`judge-`+i]="{ row: competitor }">
      <FormKit
        type="number"
        input-class="formkit-input-sm"
        wrapper-class="w-50"
        :value="getScore(competitor.id, judge.id)"
        @change="evt => persistScore(competitor.id, judge.id, evt.target.value)"
      />
    </template>
  </SimpleTable>
</template>
