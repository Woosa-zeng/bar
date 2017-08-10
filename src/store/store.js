import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    gender: '',
    activeRoute: 'goods'
  },
  mutations: {
    [type.GENDER](state, payload) {
      state.gender = payload.gender
    },
    [type.ROUTE_CHANGE](state, payload) {
      state.activeRoute = payload.activeRoute
    }
  }
})

export default store
