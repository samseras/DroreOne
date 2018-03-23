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
import AreaDeploy from '@/components/eye/deployChildren/basicDeploy/areaDeploy'       //片区
import BoatDeploy from '@/components/eye/deployChildren/basicDeploy/boatCarDeploy'       //车船
import IndicatorDeploy from '@/components/eye/deployChildren/basicDeploy/indicatorDeploy'       //指示牌
import OtherDeploy from '@/components/eye/deployChildren/basicDeploy/otherDeploy'       //其他
import ParkDeploy from '@/components/eye/deployChildren/basicDeploy/parkDeploy'       //停车场
import PersonDeploy from '@/components/eye/deployChildren/basicDeploy/personDeploy'       //人员
import RoatDeploy from '@/components/eye/deployChildren/basicDeploy/roatDeploy'       //路网
import ScenceDeploy from '@/components/eye/deployChildren/basicDeploy/scenicDeploy'       //景点
import ShopDeploy from '@/components/eye/deployChildren/basicDeploy/shopDeploy'       //商圈
import ToiletDeploy from '@/components/eye/deployChildren/basicDeploy/toiletDeploy'       //洗手间
import TrashDeploy from '@/components/eye/deployChildren/basicDeploy/trashDeploy'       //垃圾桶





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
                redirect: '/deploy/person-deploy',
                component: Deploy,
                children:[
                    {path: '/deploy/area-deploy',name: 'AreaDeploy',component: AreaDeploy},
                    {path: '/deploy/boat-deploy',name: 'BoatDeploy',component: BoatDeploy },
                    {path: '/deploy/indicator-deploy',name: 'IndicatorDeploy',component: IndicatorDeploy },
                    {path: '/deploy/other-deploy',name: 'OtherDeploy',component: OtherDeploy },
                    {path: '/deploy/park-deploy',name: 'ParkDeploy',component: ParkDeploy },
                    {path: '/deploy/person-deploy',name: 'PersonDeploy',component: PersonDeploy },
                    {path: '/deploy/roat-deploy',name: 'RoatDeploy',component: RoatDeploy },
                    {path: '/deploy/scence-deploy',name: 'ScenceDeploy',component: ScenceDeploy },
                    {path: '/deploy/shop-deploy',name: 'ShopDeploy',component: ShopDeploy },
                    {path: '/deploy/toilet-deploy',name: 'ToiletDeploy',component: ToiletDeploy },
                    {path: '/deploy/trash-deploy',name: 'TrashDeploy',component: TrashDeploy }
                ]
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
