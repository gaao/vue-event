import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    // userInfo: {id, username, nickname, email, user_pic}
    userInfo: {}
  },
  getters: {
    // id: (state) => state.userInfo.id,
    username: (state) => state.userInfo.username,
    nickname: (state) => state.userInfo.nickname,
    user_pic: (state) => state.userInfo.user_pic
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken
    },
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 请求->用户信息
    async getUserInfoAction(store) {
      const res = await getUserInfoAPI()
      console.log('res', res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
