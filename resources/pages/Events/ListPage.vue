<template>
  <div class="flex justify-between my-5">
    <InertiaLink href="/event/create" class="btn">
      {{ `${$t('system.actions.create')} ${$t('event.new')} ${$t('event.label')}` }}
    </InertiaLink>
  </div>
  <SimpleTable :columns="columns" :rows="list">
    <template #image="{ row }">
      <div v-if="row.image" class="w-16 avatar rounded overflow-auto">
        <img :src="`/file/${row.image}`" :alt="row.name" />
      </div>
    </template>
    <template #date="{ row }">
      {{ formatDateToLocale(row.start_date) }} - {{ formatDateToLocale(row.end_date) }}
    </template>
    <template #actions="{ row }">
      <div class="tooltip" :data-tip="`${$t('event.subscribed')}s`">
        <InertiaLink :href="`/event/${row.id}/subscribes`">
          <font-awesome-icon icon="users" class="text-accent" />
        </InertiaLink>
      </div>
      <div class="tooltip" :data-tip="$t('system.actions.edit')">
        <InertiaLink :href="`/event/edit/${row.id}`">
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
import { formatDateToLocale } from 'Resources/helpers/functions';
import { useEventStore } from 'Resources/stores/event';
import { useSystemStore } from "Resources/stores/system";
import SimpleTable from 'Resources/components/Table/SimpleTable';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useEventStore, ['list']),
    columns() {
      return [
        { key: 'image', label: this.$t('event.image') },
        { key: 'name', label: this.$t('event.name') },
        { key: 'location', label: this.$t('event.location') },
        { key: 'type', label: this.$t('event.type') },
        { key: 'status', label: this.$t('event.status') },
        { key: 'date', label: this.$t('event.date') },

        { key: 'actions', label: this.$t('system.actions.label') },
      ]
    }
  },
  methods: {
    ...mapActions(useEventStore, ['delete', 'load']),
    async deleteHandler(row) {
      await this.delete(row.id)
      toast.success(`
        ${this.$t('event.label')} <b>${row.name}</b>
        ${this.$t('event.deleted')}
        ${this.$t('system.actions.with_success')}!
      `)
      this.load()
    },
    formatDateToLocale(date) {
      const { getLocale } = useSystemStore();
      const locale = getLocale || navigator.language || navigator.userLanguage

      return formatDateToLocale(date, locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
  },
  async created() {
    await this.load()
  },
}
</script>
