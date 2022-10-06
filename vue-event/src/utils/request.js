import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000
})
// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
}
)
// 相应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应 http 状态码为 2xx，3xx 时触发成功的回掉形参的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应 http 状态码为 4xx，5xx 时触发成功的回掉形参的 error 是“失败的结果”
  console.dir('error', error)
  // 无效的 token
  if (error.response.state === 401) {
    // 把 Vuex 中的 token 重置为空，并跳转到登录页
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
    Message.error('用户身份已过期')
  }
  return Promise.reject(error)
}
)
// myAxios.interceptors.response
export default myAxios
