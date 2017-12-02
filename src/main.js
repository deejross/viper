// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Promise from 'promise-polyfill'
if (window && !window.Promise) {
  window.Promise = Promise
}

import Vue from 'vue'
import router from './router'
import 'quasar-extras/material-icons'
import Vuelidate from 'vuelidate'
import Quasar, {
  Loading,
  QAlert,
  QBtn,
  QCard,
  QCardMain,
  QCardSeparator,
  QCardTitle,
  QChip,
  QDataTable,
  QField,
  QIcon,
  QInnerLoading,
  QInput,
  QItem,
  QItemMain,
  QItemSeparator,
  QItemSide,
  QItemTile,
  QKnob,
  QLayout,
  QList,
  QListHeader,
  QScrollArea,
  QSelect,
  QSideLink,
  QSpinner,
  QSpinnerGears,
  QTab,
  QTabs,
  QTabPane,
  QToolbar,
  QToolbarTitle
} from 'quasar'

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: {
    Loading,
    QAlert,
    QBtn,
    QCard,
    QCardMain,
    QCardSeparator,
    QCardTitle,
    QChip,
    QDataTable,
    QField,
    QIcon,
    QInnerLoading,
    QInput,
    QItem,
    QItemMain,
    QItemSeparator,
    QItemSide,
    QItemTile,
    QKnob,
    QLayout,
    QList,
    QListHeader,
    QScrollArea,
    QSelect,
    QSideLink,
    QSpinner,
    QSpinnerGears,
    QTab,
    QTabs,
    QTabPane,
    QToolbar,
    QToolbarTitle
  },
  directives: {}
}) // Install Quasar Framework

// Install Additional plugins
Vue.use(Vuelidate)

if (__THEME === 'mat') {
  // require('quasar-extras/roboto-font')
}
// import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  router,
  render: h => h(require('./App').default)
})
