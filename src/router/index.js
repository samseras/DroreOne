import Vue from 'vue'
import Router from 'vue-router'
// import '../../static/js/jquery-1.8.3.min.js'


import '../../static/js/echarts.min.js'
// import HelloWorld from '@/components/HelloWorld'
import MicServiceManagementSystem from '@/pages/MicroService/MicroServiceManagementSystem'
import Index from '@/pages/index'
import login from '@/pages/login'

import eye from '@/pages/eye'
import Controler from '@/components/controler'


import Analyze from '@/components/analyze'
import Passenger from '@/components/eye/analyze/passengerFlow'
import Origin from '@/components/eye/analyze/passengerOrigin'
import Ticket from '@/components/eye/analyze/ticketBusiness'
import Facility from '@/components/facility'
import HomePage from '@/components/homePage'
import Deploy from '@/components/deploy'




Vue.use(Router)
const routes = [
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
                component: Analyze,
                children: [
                    {path: '/analyze/passenger',name: 'Passenger', component:Passenger},
                    {path: '/analyze/origin',name: 'Origin', component:Origin},
                    {path: '/analyze/ticket',name: 'Ticket', component:Ticket}
                ]
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
const router = new Router({
    mode: 'history',
    routes
})
export default router
// })
