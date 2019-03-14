import Vue from 'vue'
import ElementUI from 'element-ui'
import echarts from "echarts"
import wordCloud from 'echarts-wordcloud'
import router from './router'
import  'element-ui/lib/theme-default/index.css'
import './assets/sass/base.scss'
import './assets/sass/public.scss'
import $axios from './config/base.js'
import 'babel-polyfill'
//import './config/china'
import App from './App'
import store from './store'
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = $axios;
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  echarts,
  wordCloud,
  template: '<App/>',
  components: { App },
})
