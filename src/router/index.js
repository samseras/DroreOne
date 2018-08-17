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

import MicServiceManagementSystem from '@/components/pages/MicroService/MicroServiceManagementSystem'
import Index from '@/components/pages/index'
import login from '@/components/pages/login'
import screen from '@/components/pages/screenShow'




Vue.use(Router)
const routes = [

    {
      path: '/',
      redirect: '/droreone',
      component: Index
    },
    {
      path: '/MicServiceManagementSystem',
      component: MicServiceManagementSystem
    },
      // 主页面
    {
      path: '/droreone',
      component: Index
    },
    {
      path: '/login',
      component: login
    },
    {
        path: "/screen/:id",
        component: screen
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
    ...analyze
  ]
const router = new Router({
    mode: 'history',
    routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
    next(true)
    let token = localStorage.getItem('token')
    if (token) {
        if (to.path === '/login') {
            next()
        }
    } else {
        next('/login')
    }
})
export default router
