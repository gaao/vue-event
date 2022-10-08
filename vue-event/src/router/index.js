import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import store from '@/store'

import Register from '@/views/register'
import Login from '@/views/login'
const HomeView = () => import('@/views/layout') // 这种方式个人感觉没有下面那种好，这种还需要起变量名字
// import ArtCat from '@/views/art/art-cat'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.懒加载方式
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/', // 默认首页路径
    component: HomeView,
    redirect: '/home', // 重定向为后台返回路径首页路径
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/UserInfo')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/UserAvatar')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/UserPwd')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/ArtCate')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/ArtList')
      }
    ]
  },
  // {
  //   path: '/home',
  //   component: HomeView,
  // },
  {
    path: '/reg',
    component: Register
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})
// 白名单，未登录可以访问的地址
const whiteList = ['/login', '/reg']
// 全局前置守卫 进入路由之前
router.beforeEach((to, from, next) => {
  const token = store.state.token
  // 有 token 值代表登录了
  if (token) {
    // 且用户信息为空
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoAction')
    }
    next()
  } else {
    // 未登录跳到登陆页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
