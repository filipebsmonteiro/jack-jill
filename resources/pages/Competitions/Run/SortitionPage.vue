<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useCompetitionStore } from 'Resources/stores/competition'
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'
import SimpleTable from 'Resources/components/Table/SimpleTable';
import Tabs from 'Resources/components/Tabs/TabComponent';

const { t } = useI18n()
let { current, competitorsGroupByLevel, getJudges, getScore, scores } = storeToRefs( useCompetitionStore() ),
  { list } = storeToRefs( useCompetitionLevelStore() ),
  levelTabs = computed(() => {
    return Object.entries(competitorsGroupByLevel.value)
      .map(([levelId, competitors]) => {
        const level = list.value.find(l => l.id === levelId)
        const competitorsIds = competitors.map(competitor => competitor.id)
        const rounds = [...new Set(scores.value.map(s => s.round))]

        return {
          key: level.id,
          label: level.name,
          rounds: rounds.map(r => ({ key: r, label: `Round ${r}` })),
        }
      })
  }),
  columns = computed(() => {
    return [
      {
        key: 'first_name',
        label: t('competition.competitor.singular'),
        formatter: u => `${u.first_name} ${u.last_name}`
      },
      ...getJudges.value.map((judge, i) => ({
        key: `judge-${i}`,
        label: `${t('competition.judge.singular')} ${judge.first_name}`
      }))
    ]
  });

const persistScore = async (competitorId, judgeId, round, score) => {
  await useCompetitionStore().persistScore({ competitionId: current.value.id, competitorId, judgeId, round, score })
    .then(() =>
      toast.success(`${t('subscription.label')} ${t('competition.updated')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
    )
}
</script>

<template>
  <Tabs :tabs="levelTabs" class="shadow rounded mt-4">
    <template v-for="(level, i) in levelTabs" #[`tab-`+level.key]>
      <Tabs
        :tabs="level.rounds"
        allow-delete
        allow-increase
        @delete=""
        class="p-4"
        tab-class="tabs-boxed"
      >
        <template v-for="(round, i) in level.rounds" #[`tab-`+round.key]>

          <SimpleTable
            :columns="columns"
            :rows="competitorsGroupByLevel[level.key]"
            class="overflow-hidden"
          >
            <template v-for="(judge, i) in getJudges" #[`judge-`+i]="{ row: competitor }">
              <FormKit
                type="number"
                input-class="formkit-input-sm"
                wrapper-class="w-50"
                :value="getScore(competitor.id, judge.id, round.key)"
                @change="evt => persistScore(competitor.id, judge.id, round.key, evt.target.value)"
              />
            </template>
          </SimpleTable>

        </template>
      </Tabs>
    </template>
  </Tabs>
</template>
