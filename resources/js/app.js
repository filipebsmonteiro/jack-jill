import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import DefaultLayout from '../layouts/DefaultLayout.vue'

setTimeout(() =>
  createInertiaApp({
    // resolve: name => import(`../pages/${name}.vue`),
    resolve: name => {
      // return import(`../pages/${name}.vue`)
      const page = require(`../pages/${name}.vue`).default
      page.layout = page.layout || DefaultLayout
      return page
    },
    setup ({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .mount(el)
    },
  })
, 1000)
