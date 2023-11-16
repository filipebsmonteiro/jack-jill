<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from 'Resources/stores/user';
import AutoComplete from 'Resources/components/Form/User/AutoComplete';

export default {
  components: { AutoComplete },
  emits: ['addRow', 'removeRow'],
  props: {
    additionalColumns: {
      type: Array,
      required: false,
      default: () => [],
    },
    users: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    ...mapWritableState(useUserStore, ['suggestions', 'loading']),
  },
  methods: {
    ...mapActions(useUserStore, ['autocomplete']),
    addNode(values = {}) {
      if (this.users.some(u => u.id === values.id)) return;
      const newest = { id: null, first_name: '', last_name: '', ...values }
      this.$emit('addRow', newest)
    },
    removeNode(index) {
      const removable = {...this.users.find((_, i) => i === index)}
      this.$emit('removeRow', removable)
    },
    searchUsers(value) {
      if (
        (typeof value === 'object' && value?.type === 'blur') ||
        this.loading ||
        !value
      ) {
        this.suggestions = []
        return
      }

      if (value.length <= 2) {
        this.suggestions = [{ first_name: 'Type more than 2 Characters' }]
        return
      }

      this.autocomplete({ name: value })
    },
  },
}
</script>

<template>
  <AutoComplete @select="addNode" />

  <table class="table table-sm table-zebra mt-4 shadow">
    <tbody>
      <tr v-for="(user, index) in users" :key="index" class="hover">
        <td>
          <FormKit
            type="hidden"
            :name="`users[${index}][id]`"
            v-model="user.id"
          />
        </td>
        <td>
          {{ `${user?.first_name || ''} ${user?.last_name || ''}` }}
        </td>
        <td v-for="(column, idx) in additionalColumns" :key="idx">
          <slot :name="column" :user="user">
            {{ user[column] }}
          </slot>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-sm btn-error rounded text-white"
            @click="removeNode(index)"
          >
            {{ $t('schedule.remove') }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
:root {
  --fk-margin-outer: 0px
}
</style>
