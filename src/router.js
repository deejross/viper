import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/login/Login.vue'
import Home from '@/home/Home.vue'

import client from '@/util/vault/client'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

let router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  } else if (client.url() === null || client.token() === null) {
    next('/login')
    return
  }

  client.capabilitiesSelf('').then(() => {
    next()
  }).catch((err) => {
    console.error(err)
    next('/login')
  })
})

export default router
