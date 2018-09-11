import Vue from 'vue'
import Router from 'vue-router'

// 数据中心
import property from './property'

// 全视之眼
import eye from './eye'

// gis 地图
import GIS from './gis'

// iot
import iot from './iot'

// 数据分析 (图表)
import analyze from './analyze'

import organization from './organization'

// import MicServiceManagementSystem from '@/components/pages/MicroService/MicroServiceManagementSystem'
// import Index from '@/components/pages/index'
import login from '@/components/pages/login'
// import screen from '@/components/pages/screenShow'




Vue.use(Router)
const routes = [

    {
      path: '/',
      redirect: '/droreone',
      name: 'Index',
      component: resolve => require(['@/components/pages/index'], resolve)
    },
    {
      path: '/MicServiceManagementSystem',
      component: resolve => require(['@/components/pages/MicroService/MicroServiceManagementSystem'], resolve)
    },
      // 主页面
    {
      path: '/droreone',
      name: 'Droreone',
        component: resolve => require(['@/components/pages/index'], resolve)
      // component: Index
    },
    {
      path: '/login',
      name: 'Login',
      // component: resolve => require(['@/components/pages/login'], resolve)
        component: login
    },
    {
        path: "/screen/:id",
        component: resolve => require(['@/components/pages/screenShow'], resolve)
    },

    //数据中心
    ...property,

    // 全视之眼
    ...eye,

  //  gis 地图
    ...GIS,

  //   iot
    ...iot,
  //  分析（图表）
    ...analyze,

  //  用户管理
        ...organization
  ]
const router = new Router({
    mode: 'history',
    routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
    next(true)
    let token = localStorage.getItem('token')
    let role = JSON.parse(localStorage.getItem('role') || '[]')
    if (token) {
        if (to.path === '/login') {
            next()
        }
        if (role[0] == 1) {
            next()
        } else {
            if (to.meta.id && role.includes(to.meta.id)) {
                next()
            } else if (to.meta.id) {
                next(from.path)
            }
        }
    } else {
        next('/login')
    }
})
export default router
