import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
import '@/elementUI'

import VueQuillEditor from 'vue-quill-editor'
// require vue-quill-editor styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import dayjs from 'dayjs'
Vue.prototype.$formatDate = (dataObj) => { return dayjs(dataObj).format('YYYY-MM-DD HH:mm:ss') }

Vue.use(VueQuillEditor, { placeholder: '请输入内容' }) // 此方法会在 Vue.compinent 注册 quillEditor 名字的全局组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
