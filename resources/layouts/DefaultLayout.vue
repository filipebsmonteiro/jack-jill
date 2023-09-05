<template>
  <div class="layout-wrapper">
    <aside class="aside-left">
      <header>
        <!-- <button class="btn btn-ghost" @click="toggleLeftDrawer">
          <font-awesome-icon icon="bars" />
        </button> -->
        <span class="toolbar__title">
          Jack and Jill
        </span>
      </header>
      <ul class="menu w-56">
        <li>
          <MenuLink
            v-for="link in linksList"
            :key="link.label"
            v-bind="link"
          />
        </li>
      </ul>
    </aside>

    <div class="container">
      <header>
        <span></span>

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

      <div class="px-6">
        <slot></slot>
      </div>
    </div>

    <aside v-show="rightDrawerOpen" class="aside-right">
      <RightDrawer />
    </aside>
  </div>
</template>

<script>
import { router } from "@inertiajs/vue3";
import MenuLink from "Resources/components/Navigation/MenuLink.vue";
import RightDrawer from "Resources/layouts/DefaultLayout/RightDrawer.vue";
import { useAuthStore } from "Resources/stores/auth";
import { mapState } from 'pinia'

export default {
  components: {
    MenuLink,
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
        {
          label: this.$t("system.left_menu.users.label"),
          caption: this.$t("system.left_menu.users.description"),
          icon: "person",
          link: `/user/list`,
        },
        {
          label: this.$t("system.left_menu.events.label"),
          caption: this.$t("system.left_menu.events.description"),
          icon: "calendar-days",
          link: `/event/list`,
        },
      ];
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
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
  width: 100%;
  outline: 0;
  direction: ltr;
  display: grid;
  grid-auto-columns: max-content auto;
}

header {
  @apply flex items-center bg-primary;
  z-index: 1000;
  height: var(--header-height);
}

.aside-left{
  height: 100dvh;

  header {
    @apply justify-start pl-3;
  }
}

.container {
  margin: 0 auto;
  grid-column-start: 2;
  // grid-row-start: 1;

  header {
    @apply justify-between pr-3;
  }
}

.aside-right{
  width: 300px;
  top: var(--header-height);
  z-index: 500;
  @apply w-1/4 fixed translate-x-0 right-0 bottom-0 bg-neutral-content shadow-lg flex flex-col;
}
</style>
