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
import Broad from '@/components/eye/controlChildren/broadcast'
import Person from '@/components/eye/controlChildren/securityperson'
import Warn from '@/components/eye/controlChildren/warningControl'
import Wifi from '@/components/eye/controlChildren/wifiControl'
import Screen from '@/components/eye/controlChildren/screenControl'
import Car from '@/components/eye/controlChildren/carControl'
import Other from '@/components/eye/controlChildren/otherControl'
import Camera from '@/components/eye/controlChildren/cameraControl'
import Environment from '@/components/eye/controlChildren/environment'



import Analyze from '@/components/analyze'
import Passenger from '@/components/eye/analyze/passengerFlow'
import Origin from '@/components/eye/analyze/passengerOrigin'
import Ticket from '@/components/eye/analyze/ticketBusiness'

import Facility from '@/components/facility'
import Toilet from "@/components/eye/facilityChildren/toiletFacility"
import Park from "@/components/eye/facilityChildren/parkFacility"
import Shop from "@/components/eye/facilityChildren/shopFacility"
import Road from "@/components/eye/facilityChildren/roadFacility"
import Dustbin from "@/components/eye/facilityChildren/dustbinFacility"
import ScenicName from "@/components/eye/facilityChildren/scenicNameFacility"
import Build from "@/components/eye/facilityChildren/buildFacility"

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
                redirect: '/controler/broad',
                component: Controler,
                children: [
                    {path: '/controler/broad',name: 'Broad', component:Broad},
                    {path: '/controler/person',name: 'Person', component:Person},
                    {path: '/controler/warn',name: 'Warn', component:Warn},
                    {path: '/controler/wifi',name: 'Wifi', component:Wifi},
                    {path: '/controler/screen',name: 'Screen', component:Screen},
                    {path: '/controler/car',name: 'Car', component:Car},
                    {path: '/controler/camera',name: 'Camera', component:Camera},
                    {path: '/controler/other',name: 'Other', component:Other},
                    {path: '/controler/environment',name: 'Environment', component:Environment},
                ]
            },
            {
                path: '/analyze',
                name: 'analyze',
                redirect: '/analyze/passenger',
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
                redirect: '/facility/build',
                component: Facility,
                children: [
                    {path: '/facility/toilet',name: 'Toilet', component:Toilet},
                    {path: '/facility/park',name: 'Park', component:Park},
                    {path: '/facility/shop',name: 'Shop', component:Shop},
                    {path: '/facility/road',name: 'Road', component:Road},
                    {path: '/facility/dustbin',name: 'Dustbin', component:Dustbin},
                    {path: '/facility/scenicName',name: 'ScenicName', component:ScenicName},
                    {path: '/facility/build',name: 'Build', component:Build}
                ]
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
