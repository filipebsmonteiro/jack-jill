<template>
  <div class="container mx-auto">
    <SimpleTable :columns="columns" :rows="list" class="mt-4">
      <template #image="{ row }">
        <!-- <object data="/fallback/competition.webp" type="image/png" class="w-16"> -->
          <img :src="`/file/${row.image}`" :alt="row.name" />
        <!-- </object> -->
      </template>
      <template #start_date="{ row }">
        {{ formatDateToLocale(row.schedules[0]?.start_date) }}
      </template>
      <template #actions="{ row }">
        <InertiaLink
          v-if="isDateInThePast(row.schedules[0]?.start_date)"
          class="btn btn-sm btn-outline"
          :href="`/competition/${row.id}/scores`"
        >
          {{ $t('competition.scores') }}
          <font-awesome-icon icon="list-ol" class="text-info" />
        </InertiaLink>
        <a
          v-else
          class="btn btn-sm btn-outline"
          :href="`/competition/${row.id}/subscribe`"
        >
          {{ $t('competition.register') }}
            <font-awesome-icon icon="pencil" class="text-info" />
        </a>
      </template>
    </SimpleTable>
  </div>
</template>

<script>
import FullPageLayout from 'Resources/layouts/FullPageLayout'
import { mapActions, mapState } from 'pinia';
import { formatDateToLocale } from 'Resources/helpers/functions';
import { useCompetitionStore } from 'Resources/stores/competition';
import { useSystemStore } from "Resources/stores/system";
import SimpleTable from 'Resources/components/Table/SimpleTable';

export default {
  name: 'ListPage',
  layout: FullPageLayout,
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useCompetitionStore, ['list']),
    columns() {
      return [
        { key: 'image', label: this.$t('competition.image') },
        { key: 'name', label: this.$t('competition.name') },
        { key: 'start_date', label: this.$t('schedule.start_date') },

        { key: 'actions', label: this.$t('system.actions.label') },
      ]
    }
  },
  methods: {
    ...mapActions(useCompetitionStore, ['load']),
    formatDateToLocale(date) {
      const { getLocale } = useSystemStore();
      const locale = getLocale || navigator.language || navigator.userLanguage

      return formatDateToLocale(date, locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    isDateInThePast(date) {
    return new Date(date) < new Date(new Date().toDateString());
}
  },
  async created() {
    await this.load({ relationships: [`schedules`], orderBy: `created_at`, orderDirection: `desc` })
  },
}
</script>
