<template>
  <div class="flex justify-between my-5">
    <InertiaLink href="/user/create" class="btn ">Cadastrar nova Pessoa</InertiaLink>
    <!-- <InertiaLink href="/user/create" class="btn ">Criar</InertiaLink> -->
  </div>
  <SimpleTable :columns="columns" :rows="users">
    <template #name="{ row }">
      {{ row.first_name }} {{ row.last_name }}
    </template>
    <template #actions="{ row }">
      <div class="tooltip" data-tip="Editar">
        <InertiaLink :href="`/user/edit/${row.id}`">
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
import { mapActions, mapState } from 'pinia';
import { toast } from 'vue3-toastify'
import { useForm } from "@inertiajs/vue3";
import { useUserStore } from 'Resources/stores/user';
import SimpleTable from 'Resources/components/Table/SimpleTable';
import UndoDelete from 'Resources/components/UndoDelete';

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
      await this.delete(row.id)
      toast.success(`Pessoa <b>${row.first_name}</b> Excluida com sucesso!`)
      this.load()
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
