import { store } from 'quasar/wrappers'
import Vuex from 'vuex'

import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StoreInterface {
  darkMode: boolean | null;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StoreInterface>({
    modules: {
      example
    },
    strict: !!process.env.DEV
  })

  return Store
})
