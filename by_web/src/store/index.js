// axios配置
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import echartsData from '../config/echartsData.js'
Vue.use(Vuex)

const state = {
  echartsData,
  active_index:'6',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
