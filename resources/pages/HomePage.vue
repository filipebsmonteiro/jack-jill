<script>
import FullPageLayout from 'Resources/layouts/FullPageLayout'
import CompetitionsPreview from 'Resources/components/Samples/CompetitionsPreview'
import StatsComponent from 'Resources/components/Samples/StatsComponent'
import TeamsSection from 'Resources/components/Samples/TeamsSection'
import TestimonialComponent from 'Resources/components/Samples/TestimonialComponent'
import TopBanner from 'Resources/components/Samples/TopBanner'
import { mapActions } from 'pinia';
import { useCompetitionStore } from 'Resources/stores/competition';

export default {
  layout: FullPageLayout,
  components: {
    CompetitionsPreview,
    StatsComponent,
    TeamsSection,
    TestimonialComponent,
    TopBanner,
  },
  methods: {
    ...mapActions(useCompetitionStore, ['load']),
  },
  async created() {
    await this.load({ currentPage: 1, perPage: 3, orderBy: 'created_at', orderDirection: 'desc' })
  },
}
</script>

<template>
  <TopBanner />
  <hr>
  <CompetitionsPreview />
  <hr>
  <StatsComponent />
  <hr>
  <TeamsSection />
  <hr>
  <TestimonialComponent />
</template>
