<template>
  <header class="sticky top-0">
    <div class="lg:w-1/5 sm:w-1/3">
      <font-awesome-icon
        v-if="isMobile && user?.system_role === 'admin'"
        icon="bars"
        @click="$emit('menuBarsClick')"
      />
      <InertiaLink v-else :href="user ? `/dashboard` : `/`">
        <img src="/logo.png" class="w-16">
      </InertiaLink>
    </div>

    <div class="flex justify-around grow gap-x-4">
      <InertiaLink href="/competition/newest">
        {{ $t('system.header.competitions') }}
      </InertiaLink>
    </div>

    <div class="lg:w-1/5 sm:w-1/3 flex justify-end">
      <div
        v-if="user"
        :class="{ 'cursor-pointer avatar rounded overflow-auto': true, placeholder: !avatar}"
        @click="toggleRightDrawer"
      >
        <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
          <img v-if="avatar" :src="`/file/${avatar}`" />
          <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
        </div>
      </div>
      <InertiaLink v-else href="/auth/login" class="btn btn-sm btn-outline">
        Login
        <font-awesome-icon icon="arrow-right" />
      </InertiaLink>
    </div>
  </header>
  <RightDrawer v-if="rightDrawerOpen" />
</template>

<script>
import { router } from "@inertiajs/vue3";
import { useAuthStore } from "Resources/stores/auth";
import { mapState } from 'pinia'
import RightDrawer from "Resources/layouts/components/RightDrawer.vue";
import { isMobile } from "Resources/helpers/functions";

export default {
  emits: ['menuBarsClick'],
  components: { RightDrawer },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
    isMobile() {
      return isMobile()
    }
  },
  data() {
    return {
      rightDrawerOpen: false,
    };
  },
  methods: {
    toggleRightDrawer() {
        this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
  mounted() {
    router.on('navigate', () => this.rightDrawerOpen = false);
  }
}
</script>

<style lang="scss" scoped>
header {
  @apply flex items-center bg-primary bg-opacity-60 px-3;
  width: 100%;
  z-index: 1000;
  height: var(--header-height);
}
</style>
