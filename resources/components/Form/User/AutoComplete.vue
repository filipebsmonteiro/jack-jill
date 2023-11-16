<template>
  <div class="dropdown dropdown-open">
    <FormKit
      type="text"
      autocomplete="off"
      v-model="input"
      :disabled="loading"
      :delay="1000"
      :outer-class="{ 'shown-list': suggestions.length }"
      :placeholder="`${$t('system.actions.typeIt')} ${$t('user.name')}`"
      @input="searchUsers"
      @blur="searchUsers"
    >
      <template #suffixIcon="context">
        <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
      </template>
      <template #messages="context">
        <ul v-if="suggestions.length > 0" class="menu bg-base-200 shadow absolute rounded-bottom z-50 w-full">
          <li v-for="(user, index) in suggestions" :key="index">
            <a @click="select(user)" class="flex column items-start gap-0">
              <span class="font-normal">{{ `${user?.first_name || ''} ${user?.last_name || ''}` }}</span>
              <span class="text-xs font-extralight">{{ user.email }}</span>
            </a>
          </li>
        </ul>
      </template>
    </FormKit>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from 'Resources/stores/user';

export default {
  emits: ['select'],
  computed: {
    ...mapWritableState(useUserStore, ['suggestions', 'loading']),
  },
  data: () => ({
    input: ''
  }),
  methods: {
    ...mapActions(useUserStore, ['autocomplete']),
    async searchUsers(value) {
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

      await this.autocomplete({ name: value })
    },
    select(user) {
      this.$emit('select', user)
      this.suggestions = []
      this.input = ''
    },
  },
}
</script>

<style lang="scss" scoped>
:deep(.formkit-outer.shown-list) {
  .formkit-inner, input {
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
