import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { LocalStorage, SessionStorage } from 'quasar'
import { Constants } from 'src/boot/Constants'
import { axiosInstance } from 'src/boot/axios'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.beforeEach(async (to, from, next) => {
    let token = LocalStorage.getItem('ua_a_pt')
    // const configResponse = await axiosInstance.get('https://tconfig.megasop.com/config.json')
    // const isMaintenance = configResponse.data.portal.maintenance
    const configResponse = await fetch('https://tconfig.megasop.com/config.json').then(response => response.json())
    const isMaintenance = configResponse.portal.maintenance
    const isMegasopStaff = SessionStorage.getItem('is_mgs_s') || 0
    
    if (to.matched.some(record => record.meta.requireLogin) && !token) {
      next('/')
    } else if (
      to.matched.some(
        record =>
          record.meta.backpropagation &&
          LocalStorage.getItem(record.meta.key) == null
      )
    ) {
      let back = to.matched[1].meta.back
      next(back)
    } else {
      if (to.path == '/' && token) {
        next('/account')
        return
      }
      
      if (isMaintenance == 1 && isMegasopStaff == 0 && to.path !== '/maintenance') {
        next('/maintenance')
        return
      }

      let customer = LocalStorage.getItem('a_st_t')
      if (
        to.matched.some(record => record.meta.requireAdmin) &&
        customer != null
      ) {
        next('/403')
        return
      }
      if (to.matched.some(record => record.meta.removeKey)) {
        let keys = Object.keys(Constants)
        keys.forEach(element => {
          if (element === 'WAREHOUSE_IMPORT_TICKET_ITEMS') return
          LocalStorage.remove(Constants[element])
        })
      }

      if (to.matched.some(record => record.meta.removeDeterminedKey)) {
        let record = to.matched.find(record => record.meta.removeDeterminedKey)
        let keys = record.meta.determinedKey
        keys.forEach(element => {
          if (element === 'WAREHOUSE_IMPORT_TICKET_ITEMS') return
          LocalStorage.remove(Constants[element])
        })
      }

      
      next()
    }
  })

  return Router
})
