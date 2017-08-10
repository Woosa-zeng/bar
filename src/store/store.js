import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    gender: ''
  },
  mutations: {
    [type.GENDER](state, payload) {
      state.gender = payload.gender
    }
  }
})

export default store
