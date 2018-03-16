import Vue from 'vue'
import Router from 'vue-router'
import '../../static/js/jquery-1.8.3.min.js'
// import ElementUI from 'element-ui'
//
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/index.js'
// import '../../static/css/font.css'


import '../../static/js/echarts.min.js'
// import HelloWorld from '@/components/HelloWorld'
import MicServiceManagementSystem from '@/pages/MicroService/MicroServiceManagementSystem'
import Index from '@/pages/index'
import login from '@/pages/login'

import eye from '@/pages/eye'
import Controler from '@/components/controler'
import Analyze from '@/components/analyze'
import Facility from '@/components/facility'
import HomePage from '@/components/homePage'
import Deploy from '@/components/deploy'




Vue.use(Router)
// Vue.use(ElementUI)

export default new Router({
	mode:"history", //切换路径模式，变成history模式,不然路径为/#/home
	scrollBehavior:()=>({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
　　　　y:0
　　}),
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Index
    },
    {
      path: '/MicServiceManagementSystem',
      component: MicServiceManagementSystem
    },
      // 主页面
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: login
    },
      //全视之眼
    {
      path: '/eye',
      name: 'eye',
      redirect: '/controler',
      component: eye,
        children: [
            {
                path: '/homePage',
                name: 'homePage',
                component: HomePage
            },
            {
                path: '/controler',
                name: 'controler',
                component: Controler
            },
            {
                path: '/analyze',
                name: 'analyze',
                component: Analyze
            },
            {
                path: '/facility',
                name: 'facility',
                component: Facility
            },
            {
                path: '/deploy',
                name: 'deploy',
                component: Deploy
            }
        ]
    }
  ]
})
