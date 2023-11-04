// Style imports
import '../css/app.scss'
import '../css/icons'

// Global imports
import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Local imports
import formKitConfig from '../../formkit/formkit.config'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Store from '../stores'
import i18n from '../i18n'

setTimeout(async () =>
  createInertiaApp({
    title: title => `${title ? title+ ' - ' : ''}Jack and Jill`,
    resolve: name => {
      const page = require(`../pages/${name}.vue`).default
      page.layout = page.layout || DefaultLayout
      return page
    },
    // render: createApp({ render: () => h('div', 'Loading...') }),
    setup ({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(Store)
        .use(i18n)
        .use(formKitPlugin, defaultConfig(formKitConfig))
        .component('InertiaLink', Link)
        .component('FontAwesomeIcon', FontAwesomeIcon)
        .mount(el)
    },
  })
, 300)
