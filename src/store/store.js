import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userId: '',
    genderFlag: false,
    sex: '',
    activeRoute: 'goods',
    companyId: '',
    companyName: '',
    selfSeat: '', // 自己的坐位号
    selfAvatar: '', // 自己的头像
    chatId: '', // 当前聊天对象的id
    chatName: '', // 当前聊天对象的昵称或桌号
    nickname: '', // 自己的昵称
    orderId: ''
  },
  mutations: {
    [type.USER_ID](state, payload) {
      state.userId = payload.userId
    },
    [type.GENDER_FLAG](state, payload) {
      state.genderFlag = payload.genderFlag
    },
    [type.SEX](state, payload) {
      state.sex = payload.sex
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
    [type.CHAT_ID](state, payload) {
      state.chatId = payload.chatId
    },
    [type.CHAT_NAME](state, payload) {
      state.chatName = payload.chatName
    },
    [type.NICKNAME](state, payload) {
      state.nickname = payload.nickname
    },
    [type.ORDER_ID](state, payload) {
      state.orderId = payload.orderId
    },
    [type.SELF_AVATAR](state, payload) {
      state.selfAvatar = payload.selfAvatar
    }
  }
})

export default store
