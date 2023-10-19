<template>
  <div class="layout-wrapper">
    <header>
      <span>Jack and Jill</span>

      <div v-if="user" @click="toggleRightDrawer">
        <div :class="{ 'avatar rounded overflow-auto': true, placeholder: !avatar}">
          <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
            <img v-if="avatar" :src="`/file/${avatar}`" />
            <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <InertiaLink href="/auth/register">Register</InertiaLink>
        <InertiaLink href="/auth/login"  class="btn btn-sm ml-3">Login</InertiaLink>
      </div>
    </header>

    <div class="full-content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
import { router } from "@inertiajs/vue3";
import RightDrawer from "Resources/layouts/DefaultLayout/RightDrawer.vue";
import { useAuthStore } from "Resources/stores/auth";
import { mapState } from 'pinia'

export default {
  components: {
    RightDrawer,
  },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
    linksList() {
      return [
        {
          label: this.$t("system.left_menu.dashboard.label"),
          caption: this.$t("system.left_menu.dashboard.description"),
          icon: "house",
          link: `/dashboard`,
        },
      ];
    },
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
    router.on('navigate', () => {
      this.leftDrawerOpen = false;
      this.rightDrawerOpen = false;
    })
  },
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  @apply min-h-full flex flex-col;

  header {
    @apply flex justify-between items-center bg-primary px-3;
    z-index: 1000;
    height: var(--header-height);
  }

  .full-content {
    @apply flex-1 px-6;
  }

  // .aside-right{
  //   width: 300px;
  //   top: var(--header-height);
  //   z-index: 500;
  //   @apply w-1/4 fixed translate-x-0 right-0 bottom-0 bg-neutral-content shadow-lg flex flex-col;
  // }
}
</style>
