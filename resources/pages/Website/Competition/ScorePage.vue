<template>
  <div class="container mx-auto">
    <Tabs :tabs="levelTabs" class="shadow rounded mt-4">
      <template v-for="(level, i) in levelTabs" #[`tab-`+level.key]>
        <span v-if="level?.rounds?.length == 0" class="p-4">No Scores found!</span>
        <Tabs
          v-else
          :tabs="level.rounds"
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
                {{ getScore(level.key, round.key, judge.id, competitor.id) }}
              </template>
            </SimpleTable>

          </template>
        </Tabs>
      </template>
    </Tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { router, route } from '@inertiajs/vue3'
import { useCompetitionStore } from 'Resources/stores/competition'
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'
import { useCompetitionScoreStore } from 'Resources/stores/competition/score'
import SimpleTable from 'Resources/components/Table/SimpleTable';
import Tabs from 'Resources/components/Tabs/TabComponent';
import FullPageLayout from 'Resources/layouts/FullPageLayout'

export default {
  layout: FullPageLayout,
  components: { Tabs, SimpleTable },
  computed: {
    ...mapState(useCompetitionStore, ['current', 'competitorsGroupByLevel', 'getJudges', 'loading']),
    ...mapState(useCompetitionScoreStore, ['getScore']),
    ...mapState(useCompetitionLevelStore, { levels: 'list' }),
    levelTabs() {
      return Object.keys(this.competitorsGroupByLevel)
        .map((levelId, i) => {
          const level = this.levels.find(l => l.id === levelId)
          const rounds = [...new Set(this.getScore(level.id).map(s => s.round))]

          return {
            active: i === 0,
            key: level.id,
            label: level.name,
            rounds: rounds.map(r => ({ key: r, label: `${this.$t('competition.round.label')} ${r}` })),
          }
        })
    },
    columns() {
      return [
        {
          key: 'first_name',
          label: this.$t('competition.competitor.singular'),
          formatter: u => `${u.first_name} ${u.last_name}`
        },
        ...this.getJudges.map((judge, i) => ({
          key: `judge-${i}`,
          label: `${this.$t('competition.judge.singular')} ${judge.first_name}`
        }))
      ]
    },
  },
  methods: {
    ...mapActions(useCompetitionStore, { findCompetition: 'find' }),
    ...mapActions(useCompetitionScoreStore, { loadScores: 'load' }),
    ...mapActions(useCompetitionLevelStore, { loadLevels: 'load' }),
  },
  async mounted() {
    const id = router.page.props.id
    this.loadLevels()
    await this.findCompetition(id, { relationships: ['users'] })
    this.loadScores({ competition_id: this.current.id })
  }
}
</script>
