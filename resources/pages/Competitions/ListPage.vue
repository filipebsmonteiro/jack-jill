<template>
  <div class="flex justify-between my-5">
    <InertiaLink href="/competition/create" class="btn">
      {{ `${$t('system.actions.create')} ${$t('competition.new')} ${$t('competition.label')}` }}
    </InertiaLink>
  </div>
  <SimpleTable :columns="columns" :rows="list">
    <template #type="{ row }">
      {{ $t(`competition.types.${row.type}`) }}
    </template>
    <template #actions="{ row }">
      <div class="tooltip" :data-tip="`${$t('competition.subscribed')}s`">
        <InertiaLink :href="`/competition/${row.id}/subscribes`">
          <font-awesome-icon icon="users" class="text-accent" />
        </InertiaLink>
      </div>
      <div class="tooltip" :data-tip="`RUN`">
        <InertiaLink :href="`/competition/${row.id}/run`">
          <font-awesome-icon icon="play-circle" />
        </InertiaLink>
      </div>
      <div class="tooltip" :data-tip="$t('system.actions.edit')">
        <InertiaLink :href="`/competition/edit/${row.id}`">
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
import { toast } from 'Resources/helpers/notifications'
import { useCompetitionStore } from 'Resources/stores/competition';
import SimpleTable from 'Resources/components/Table/SimpleTable';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useCompetitionStore, ['list']),
    columns() {
      return [
        { key: 'name', label: this.$t('competition.name') },
        { key: 'type', label: this.$t('competition.type') },

        { key: 'actions', label: this.$t('system.actions.label') },
      ]
    }
  },
  methods: {
    ...mapActions(useCompetitionStore, ['delete', 'load']),
    async deleteHandler(row) {
      await this.delete(row.id)
      toast.success(`${this.$t('competition.label')} <b>${row.name}</b> ${this.$t('competition.deleted')} ${this.$t('system.actions.with_success')}!`)
      this.load()
    },
  },
  async created() {
    await this.load()
  },
}
</script>
