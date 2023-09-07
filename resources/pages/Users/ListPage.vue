<template>
  <div class="flex justify-between my-5">
    <InertiaLink href="/user/create" class="btn">
      {{ `${$t('system.actions.create')} ${$t('user.new')} ${$t('user.label')}` }}
    </InertiaLink>
  </div>
  <SimpleTable :columns="columns" :rows="list">
    <template #name="{ row }">
      {{ row.first_name }} {{ row.last_name }}
    </template>
    <template #actions="{ row }">
      <div class="tooltip" :data-tip="$t('system.actions.edit')">
        <InertiaLink :href="`/user/edit/${row.id}`">
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
import { useUserStore } from 'Resources/stores/user';
import SimpleTable from 'Resources/components/Table/SimpleTable';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useUserStore, ['list']),
    columns() {
      return [
        { key: 'name', label: this.$t('user.name') },
        { key: 'phone', label: this.$t('user.phone') },
        { key: 'email', label: this.$t('user.email') },
        { key: 'state', label: this.$t('user.state') },
        { key: 'country', label: this.$t('user.country') },
        { key: 'actions', label: this.$t('system.actions.label') },
      ]
    }
  },
  methods: {
    ...mapActions(useUserStore, ['delete', 'load']),
    async deleteHandler(row) {
      await this.delete(row.id)
      toast.success(`
        ${this.$t('user.label')} <b>${row.first_name}</b>
        ${this.$t('user.deleted')}
        ${this.$t('system.actions.with_success')}!
      `)
      this.load()
    },
  },
  async created() {
    await this.load()
  },
}
</script>
