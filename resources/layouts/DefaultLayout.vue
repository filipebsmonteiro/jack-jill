<template>
  <div class="layout-wrapper">
    <aside class="aside-left">
      <header class="bg-primary">
        <button class="btn btn-ghost" @click="toggleLeftDrawer">
          <font-awesome-icon icon="bars" />
        </button>
        <span class="toolbar__title">
          Jack and Jill
        </span>
      </header>
      <ul class="menu w-56">
        <li>
          <MenuLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </li>
      </ul>
    </aside>

    <div class="container">
      <header class="bg-primary">
        <div class="toolbar">
          <span class="toolbar__title"></span>

          <div v-if="user" class="toolbar__avatar" @click="toggleRightDrawer">
            <div :class="{ avatar: true, placeholder: !avatar}">
              <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
                <img v-if="avatar" :src="avatar" />
                <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <InertiaLink href="/auth/register">Register</InertiaLink>
            <InertiaLink href="/auth/login"  class="btn btn-sm ml-3">Login</InertiaLink>
          </div>
        </div>
      </header>

      <div class="px-6">
        <slot></slot>
      </div>
    </div>

    <aside v-show="rightDrawerOpen" class="aside-right flex column">
      <div class="user-profile">
        <div v-if="user" class="pt-10 px-2 bg-blur">
          <div :class="{ 'avatar mb-2': true, placeholder: !avatar}">
            <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
              <img v-if="avatar" :src="avatar" />
              <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
            </div>
          </div>
          <div class="text-weight-bold">{{ user.first_name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </div>
      <div class="overflow-auto p-6">
        <ul class="list">
          <li v-for="key in Object.keys(user)" :key="key" class="mb-3">
            <b>{{ key }}: </b>{{ user[key] }}
          </li>
        </ul>
      </div>
      <div class="w-100 text-center bg-white p-1">
        <button class="btn btn-sm btn-wide btn-error btn-outline" @click="handlerLogout">
          <font-awesome-icon icon="right-from-bracket" />
          Logout
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
import { router, useForm } from "@inertiajs/vue3";
import MenuLink from "Resources/components/Navigation/MenuLink.vue";
import { useAuthStore } from "Resources/stores/auth";
import { mapState, mapActions } from 'pinia'

const linksList = [
  {
    title: "Home",
    caption: "Inicio do site",
    icon: "house",
    link: `/dashboard`,
  },
  {
    title: "Pessoas",
    caption: "Listagem de Pessoas",
    icon: "person",
    link: `/user/list`,
  },
];

export default {
  components: {
    MenuLink,
  },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
  },
  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    async handlerLogout() {
      const form = useForm({});
      await this.logout(form)
      router.get("/auth/login")
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
  mounted() {
    this.getUser;
    // router.on('navigate', (event) => {
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

  header {
    z-index: 1000;
    height: var(--header-height);

    .toolbar {
      display: flex;
      align-items: center;
      flex-wrap: no-wrap;
      position: relative;
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      padding: 0 12px;

      &__title {
        flex: 1 1 0%;
        min-width: 1px;
        max-width: 100%;
        font-size: 21px;
        font-weight: 400;
        letter-spacing: .01em;
        padding: 0 12px;
      }

      &__avatar {
        @apply avatar;
        margin: 4px;
        cursor: pointer;
      }

    }
  }
}

.avatar {
  max-height: 50px;
  max-width: 50px;
  border-radius: 50%;
  overflow: hidden;
}

aside {
  &.aside-left{
    height: 100dvh;
    // border-right: 1px solid rgba(0,0,0,.12);
  }

  &.aside-right{
    width: 300px;
    transform: translateX(0px);
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    background: #fff;
    z-index: 500;
    right: 0;
    border-left: 1px solid rgba(0,0,0,.12);
  }
}

.user-profile {
  // background-image: url("@/assets/bkg.jpg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  background-size: cover;
}

.container {
  margin: 0 auto;
  // flex-grow: 1;
  grid-column-start: 2;
  // grid-row-start: 1;
}
</style>
