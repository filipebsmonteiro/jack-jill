<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { confirm, toast } from 'Resources/helpers/notifications'
import { useCompetitionStore } from 'Resources/stores/competition'
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'
import { useCompetitionScoreStore } from 'Resources/stores/competition/score'
import SimpleTable from 'Resources/components/Table/SimpleTable';
import Tabs from 'Resources/components/Tabs/TabComponent';

const { t } = useI18n()
let { current, competitorsGroupByLevel, getJudges } = storeToRefs( useCompetitionStore() ),
  { getScore } = useCompetitionScoreStore(),
  { list: levels } = storeToRefs( useCompetitionLevelStore() ),
  levelTabs = computed(() => {
    return Object.keys(competitorsGroupByLevel.value)
      .map((levelId) => {
        const level = levels.value.find(l => l.id === levelId)
        const rounds = [...new Set(getScore(level.id).map(s => s.round))]

        return {
          key: level.id,
          label: level.name,
          rounds: rounds.map(r => ({ key: r, label: `${t('competition.round.label')} ${r}` })),
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

const addRound = async (levelId) => {
  if (getJudges.value.length === 0) {
    toast.error(`No ${t('competition.judge.plural')}`)
    return;
  }
  const level = levels.value.find(l => l.id === levelId)
  const rounds = [...new Set(getScore(level.id).map(s => s.round))]
  let scoresToPersist = []

  competitorsGroupByLevel.value[levelId]
    .forEach(competitor =>
      getJudges.value.forEach(judge => {
        scoresToPersist.push({
          competitionId: current.value.id,
          competitorId: competitor.id,
          judgeId: judge.id,
          levelId: level.id,
          score: 0,
          round: `${rounds.length+1}`,
        })
      })
    )

    await useCompetitionScoreStore().persistBatch(scoresToPersist)
}

const deleteRound = async (levelId, round) => {
  confirm({
    title: `${t('system.actions.delete')} ${t('competition.round.label')}`,
    text: t('competition.round.deletion_message'),
    confirmButtonText: 'Delete',
  }).then(async result => {
    if (result.isConfirmed) {
      await useCompetitionScoreStore().deleteRound({ competitionId: current.value.id, levelId, round })
      await useCompetitionScoreStore().load({ competition_id: current.value.id })
      toast.success(`${t('competition.round.label')} ${t('competition.deleted')} ${t('system.actions.with_success')}`)
    }
  })
}

const persistScore = async (competitorId, judgeId, levelId, round, score) => {
  await useCompetitionScoreStore().persist({
    competitionId: current.value.id,
    competitorId,
    judgeId,
    levelId,
    round,
    score
  }).then(() =>
      toast.success(`${t('subscription.label')} ${t('competition.updated')} ${t('system.actions.with_success')}`)
    )
    .catch(() =>
      toast.error(`Error ${t('subscription.label')} ${t('subscription.label')}`)
    )
}
</script>

<template>
  <p v-if="!levelTabs.length" class="text-center mt-6">Zero {{ t('competition.competitor.plural') }}</p>
  <Tabs v-else :tabs="levelTabs" class="shadow rounded mt-4">
    <template v-for="(level, i) in levelTabs" #[`tab-`+level.key]>
      <Tabs
        :tabs="level.rounds"
        allow-delete
        allow-increase
        @delete="round => deleteRound(level.key, round.key)"
        @increase="addRound(level.key)"
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
                :value="getScore(level.key, round.key, judge.id, competitor.id)"
                @change="evt => persistScore(competitor.id, judge.id, level.key, round.key, evt.target.value)"
              />
            </template>
          </SimpleTable>

        </template>
      </Tabs>
    </template>
  </Tabs>
</template>
