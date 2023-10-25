<template>
  <div class="flex justify-between my-5">
    <InertiaLink href="/competition/level/create" class="btn">
      {{ `${$t('system.actions.create')} ${$t('competition.level.new')} ${$t('competition.level.label')}` }}
    </InertiaLink>
  </div>
  <SimpleTable :columns="columns" :rows="list">
    <template #actions="{ row }">
      <div class="tooltip" :data-tip="$t('system.actions.edit')">
        <InertiaLink :href="`/competition/level/edit/${row.id}`">
          <font-awesome-icon icon="pencil" class="text-info" />
        </InertiaLink>
      </div>
      <div class="tooltip" :data-tip="$t('system.actions.delete')">
        <font-awesome-icon icon="trash-can" class="text-error" @click="deleteHandler(row)" />
      </div>
    </template>
  </SimpleTable>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { toast } from 'vue3-toastify';
import { useCompetitionLevelStore } from 'Resources/stores/competition/level';
import SimpleTable from 'Resources/components/Table/SimpleTable';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useCompetitionLevelStore, ['list']),
    columns() {
      return [
        { key: 'name', label: this.$t('competition.name') },
        { key: 'actions', label: this.$t('system.actions.label') },
      ]
    }
  },
  methods: {
    ...mapActions(useCompetitionLevelStore, ['delete', 'load']),
    async deleteHandler(row) {
      await this.delete(row.id)
      toast.success(`${this.$t('competition.level.label')} <b>${row.name}</b> ${this.$t('competition.level.deleted')} ${this.$t('system.actions.with_success')}!`)
      this.load()
    },
  },
  async created() {
    await this.load()
  },
}
</script>
