const { defineConfig } = require('@vue/cli-service')
// 需要排除的对象
let externals = {}
// 需要配置的 CDN 链接
let CDN = { css: [], js: [] }
// 判断是否生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 如果是生产环境执行以下逻辑
if (isProduction) {
  externals = {
    echarts: 'echarts',
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor',
    'vuex-persistedstate': 'createPersistedState'
  }
  CDN = {
    css: [
      'https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css',
      'https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css',
      'https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css',
      'https://cdn.staticfile.org/element-ui/2.15.10/theme-chalk/index.css'
    ],
    js: [
      'https://unpkg.com/echarts@5.4.0/dist/echarts.min.js',
      'https://unpkg.com/vue@2.6.14/dist/vue.js',
      'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
      'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
      'https://unpkg.com/dayjs@1.11.5/dayjs.min.js',
      'https://unpkg.com/element-ui@2.15.10/lib/index.js',
      'https://unpkg.com/quill@1.3.7/dist/quill.js',
      'https://unpkg.com/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
      'https://unpkg.com/vuex-persistedstate@3.2.1/dist/vuex-persistedstate.umd.js'
    ]
  }
}
module.exports = defineConfig({
  // publicPath: './',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  transpileDependencies: true,
  configureWebpack: {
    externals: externals
  },
  chainWebpack(config) {
    // 注入 cdn 变量打包时会执行
    config.plugin('html').tap(args => {
      args[0].cdn = CDN
      return args
    })
  }
})
