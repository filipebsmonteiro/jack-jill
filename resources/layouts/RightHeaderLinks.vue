<template>
  <div class="flex items-center gap-x-4">
    <InertiaLink href="/competitors">
      {{ $t('competition.competitor.plural') }}
    </InertiaLink>

    <div
      v-if="user"
      :class="{ 'cursor-pointer avatar rounded overflow-auto': true, placeholder: !avatar}"
      @click="$emit('avatar-click')"
    >
      <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
        <img v-if="avatar" :src="`/file/${avatar}`" />
        <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
      </div>
    </div>
    <InertiaLink v-else href="/auth/login"  class="btn btn-sm btn-outline">
      Login
      <font-awesome-icon icon="arrow-right" />
    </InertiaLink>
  </div>
</template>

<script>
import { useAuthStore } from "Resources/stores/auth";
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
  }
}
</script>
