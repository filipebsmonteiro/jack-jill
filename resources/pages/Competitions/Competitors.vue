<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import SimpleTable from 'Resources/components/Table/SimpleTable';
import { useCompetitorStore } from 'Resources/stores/competitor'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  { competitors } = storeToRefs( useCompetitorStore() );

onMounted(async () => {
  await useCompetitorStore().loadCompetitorsResume()
})

onBeforeUnmount(() => useCompetitorStore().$reset())
</script>

<template>
  <Head :title="'Competitors'" />
  <SimpleTable :columns="[]" :rows="[]">
    <!-- <template #name="{ row }">
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
    </template> -->
  </SimpleTable>
</template>

<style lang="scss" scoped>
</style>
