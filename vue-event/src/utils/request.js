import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timeout: 10000
})

export default myAxios
