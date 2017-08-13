import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    genderFlag: false,
    activeRoute: 'goods',
    companyId: null,
    companyName: null,
    selfSeat: '8号桌',
    chatSate: null,
    nickname: null
  },
  mutations: {
    [type.GENDER_FLAG](state, payload) {
      state.genderFlag = payload.genderFlag
    },
    [type.ROUTE_CHANGE](state, payload) {
      state.activeRoute = payload.activeRoute
    },
    [type.COMPANY_ID](state, payload) {
      state.companyId = payload.companyId
    },
    [type.COMPANY_NAME](state, payload) {
      state.companyName = payload.companyName
    },
    [type.SELF_SEAT](state, payload) {
      state.selfSeat = payload.selfSeat
    },
    [type.CHAT_SEAT](state, payload) {
      state.chatSate = payload.chatSate
    },
    [type.NICKNAME](state, payload) {
      state.nickname = payload.nickname
    }
  }
})

export default store
