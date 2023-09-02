<template>
  <div class="layout-wrapper">
    <header class="bg-primary">
      <div class="toolbar">
        <button class="btn btn-ghost" @click="toggleLeftDrawer">
          <!-- <font-awesome-icon icon="bars" /> -->
        </button>

        <span class="toolbar__title">
          Jack and Jill
        </span>

        <div v-if="user" class="toolbar__avatar" @click="toggleRightDrawer">
          <img v-if="this.avatar" :src="this.avatar" referrerpolicy="no-referrer" />
          <span v-else class="first_letter">{{ user.first_name[0] }}</span>
        </div>
        <div v-else>
          <InertiaLink href="/auth/register">Register</InertiaLink>
          <InertiaLink href="/auth/login"  class="btn btn-sm ml-3">Login</InertiaLink>
        </div>
      </div>
    </header>

    <aside v-show="leftDrawerOpen" class="aside-left">
      <!-- <MenuLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      /> -->
    </aside>

    <aside v-show="rightDrawerOpen" class="aside-right flex column">
      <div class="user-profile">
        <div v-if="user" class="pt-10 px-2 bg-blur">
          <div class="avatar mb-2">
            <img :src="this.avatar" />
          </div>
          <div class="text-weight-bold">{{ user.displayName }}</div>
          <div>{{ user.email }}</div>
        </div>
      </div>
      <div class="overflow-auto">
        <pre>{{ this.user }}</pre>
      </div>
      <div class="w-100 text-center bg-white p-1">
        <button class="btn btn-sm btn-wide btn-error btn-outline" @click="handlerLogout">
          <!-- <font-awesome-icon icon="right-from-bracket" /> -->
          Logout
        </button>
      </div>
    </aside>

    <div class="container" :style="{marginTop: `${headerHeigth}px`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { router, useForm } from "@inertiajs/vue3";
// import MenuLink from "@/components/Navigation/MenuLink.vue";
import { useAuthStore } from "Resources/stores/auth";
import { mapState, mapActions } from 'pinia'

const linksList = [
  // {
  //   title: "Docs",
  //   caption: "quasar.dev",
  //   icon: "school",
  //   link: "https://quasar.dev",
  //   external: true,
  // },
  {
    title: "Home",
    caption: "Inicio do site",
    icon: "house",
    link: { name: `home` },
  },
  {
    title: "Pessoas",
    caption: "Listagem de Pessoas",
    icon: "person",
    link: { name: `pessoa.list` },
  },
];

export default {
  components: {
    // MenuLink,
  },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
  },
  data() {
    return {
      headerHeigth: 58,
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
  },
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  width: 100%;
  outline: 0;
  direction: ltr;

  header {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .toolbar {
      display: flex;
      align-items: center;
      flex-wrap: no-wrap;
      position: relative;
      min-height: 50px;
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

      .first_letter {
        border: 2px solid white;
        padding: .25rem .75rem;
        border-radius: 1rem;
        text-transform: uppercase;
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
  width: 300px;
  transform: translateX(0px);
  position: fixed;
  top: 58px;
  bottom: 0;
  background: #fff;
  z-index: 500;

  &.aside-left{
    left: 0;
    border-right: 1px solid rgba(0,0,0,.12);
  }
  &.aside-right{
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
}
</style>
