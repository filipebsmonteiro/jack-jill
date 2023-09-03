<template>
  <InertiaLink href="user/create" class="btn btn-link">Criar</InertiaLink>
  <SimpleTable :columns="columns" :rows="users">
    <template #name="{ row }">
      {{ row.first_name }} {{ row.last_name }}
    </template>
    <template #actions="{ row }">
      <div class="tooltip" data-tip="Editar">
        <InertiaLink :to="{ name: 'pessoa.edit', params: { id: row.id } }">
          <font-awesome-icon icon="pencil" class="text-info" />
        </InertiaLink>
      </div>
      <div class="tooltip" data-tip="Excluir">
        <font-awesome-icon icon="trash-can" class="text-error" @click="deleteHandler(row)" />
      </div>
    </template>
  </SimpleTable>
</template>

<script>
import { useForm } from "@inertiajs/vue3";
import { useUserStore } from 'Resources/stores/user';
import { mapActions, mapState } from 'pinia';
import SimpleTable from 'Resources/components/Table/SimpleTable.vue';

export default {
  name: 'ListPage',
  components: {
    SimpleTable,
  },
  computed: {
    ...mapState(useUserStore, { users: 'list' }),
  },
  data() {
    return {
      columns: [
        { key: 'name', label: 'Nome' },
        { key: 'phone', label: 'Telefone' },
        { key: 'email', label: 'Email' },
        { key: 'state', label: 'Estado' },
        { key: 'country', label: 'País' },
        { key: 'actions', label: 'Ações' },
      ],
    }
  },
  methods: {
    ...mapActions(useUserStore, ['delete', 'load']),
    async deleteHandler(row) {
      // this.$dialog
      //   .confirm(`Deseja excluir a pessoa ${row.nome}?`)
      //   .then(() => this.delete(row.id))
      this.current = row
      await this.delete()
      this.load()
      this.current = null
    },
  },
  async created() {
    await this.load(useForm({}))
  },
}
</script>

<style>
td .tooltip {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
</style>
