import Vue from 'vue'
import Router from 'vue-router'
// import '../../static/js/jquery-1.8.3.min.js'


import '../../static/js/echarts.min.js'
// import HelloWorld from '@/components/HelloWorld'
import MicServiceManagementSystem from '@/components/pages/MicroService/MicroServiceManagementSystem'
import Index from '@/components/pages/index'
import login from '@/components/pages/login'

import eye from '@/components/pages/eye'
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
// import Origin from '@/components/eye/analyze/passengerOrigin'
// import Ticket from '@/components/eye/analyze/ticketBusiness'

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

import Property from '@/components/property'
import AreaDeploy from '@/components/propertyChildren/basicDeploy/areaDeploy'       //片区
import BoatDeploy from '@/components/propertyChildren/basicDeploy/boatCarDeploy'       //车船
import IndicatorDeploy from '@/components/propertyChildren/basicDeploy/indicatorDeploy'       //指示牌
import OtherDeploy from '@/components/propertyChildren/basicDeploy/otherDeploy'       //其他
import ParkDeploy from '@/components/propertyChildren/basicDeploy/parkDeploy'       //停车场
import PersonDeploy from '@/components/propertyChildren/basicDeploy/personDeploy'       //人员
import RoatDeploy from '@/components/propertyChildren/basicDeploy/roatDeploy'       //路网
import ScenicDeploy from '@/components/propertyChildren/basicDeploy/scenicDeploy'       //景点
import ShopDeploy from '@/components/propertyChildren/basicDeploy/shopDeploy'       //商圈
import ToiletDeploy from '@/components/propertyChildren/basicDeploy/toiletDeploy'       //洗手间
import TrashDeploy from '@/components/propertyChildren/basicDeploy/trashDeploy'       //垃圾桶


import CameraHware from '@/components/propertyChildren/hardwareDeploy/cameraHardware'
import BroadcastHware from '@/components/propertyChildren/hardwareDeploy/broadcastHardware'
import GateHware from '@/components/propertyChildren/hardwareDeploy/gateHardware'
import LightHware from '@/components/propertyChildren/hardwareDeploy/lampLightHardware'
import LedHware from '@/components/propertyChildren/hardwareDeploy/ledHardware'
import MonitorsHware from '@/components/propertyChildren/hardwareDeploy/monitorsHardware'
import WifiHware from '@/components/propertyChildren/hardwareDeploy/wifiHardware'
import VoiceHware from '@/components/propertyChildren/hardwareDeploy/voiceHardware'
import PoliceHware from '@/components/propertyChildren/hardwareDeploy/policeHardware'

import broadcastDmis from '@/components/eye/deployChildren/dispatchDeploy/broadcastDmis' //广播播放
import lamppostDmis from '@/components/eye/deployChildren/dispatchDeploy/lamppostDmis' //路灯照明
import screenDmis from '@/components/eye/deployChildren/dispatchDeploy/screenDmis' //大屏播放
import securityDmis from '@/components/eye/deployChildren/dispatchDeploy/securityDmis' //巡更巡检
import purifierDmis from '@/components/eye/deployChildren/dispatchDeploy/purifierDmis' //保洁排版
import conductorDmis from '@/components/eye/deployChildren/dispatchDeploy/conductorDmis' //售票排版
import tellersDmis from '@/components/eye/deployChildren/dispatchDeploy/tellersDmis' //检票排版

import dispatchRecord from '@/components/eye/deployChildren/recordDeploy/dispatchRecord' //调度统计

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
                // redirect: '/analyze/:id',
                component: Analyze,
                children: [
                    {path: '/analyze/:id',name: 'Passenger', component:Passenger}
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
                redirect: '/deploy/broadcast-Dmis',
                component: Deploy,
                children:[

                    {path:'/deploy/broadcast-Dmis',name:'boatcartDmis',component:broadcastDmis},
                    {path:'/deploy/lamppost-Dmis',name:'lamppostDmis',component:lamppostDmis},
                    {path:'/deploy/screen-Dmis',name:'screenDmis',component:screenDmis},
                    {path:'/deploy/security-Dmis',name:'securityDmis',component:securityDmis},
                    {path:'/deploy/purifier-Dmis',name:'purifierDmis',component:purifierDmis},
                    {path:'/deploy/conductor-Dmis',name:'conductorDmis',component:conductorDmis},
                    {path:'/deploy/tellers-Dmis',name:'tellersDmis',component:tellersDmis},

                    {path:'/deploy/dispatch-Record',name:'dispatchRecord',component:dispatchRecord}
                ]
            }
        ]
    },
    //资产
    {
        path: '/property',
        name: 'property',
        redirect: '/property/person-deploy',
        component: Property,
        children: [
            {path: '/property/area-deploy',name: 'AreaDeploy',component: AreaDeploy},
            {path: '/property/boat-deploy',name: 'BoatDeploy',component: BoatDeploy },
            {path: '/property/indicator-deploy',name: 'IndicatorDeploy',component: IndicatorDeploy },
            {path: '/property/other-deploy',name: 'OtherDeploy',component: OtherDeploy },
            {path: '/property/park-deploy',name: 'ParkDeploy',component: ParkDeploy },
            {path: '/property/person-deploy',name: 'PersonDeploy',component: PersonDeploy },
            {path: '/property/roat-deploy',name: 'RoatDeploy',component: RoatDeploy },
            {path: '/property/scenic-deploy',name: 'ScenicDeploy',component: ScenicDeploy },
            {path: '/property/shop-deploy',name: 'ShopDeploy',component: ShopDeploy },
            {path: '/property/toilet-deploy',name: 'ToiletDeploy',component: ToiletDeploy },
            {path: '/property/trash-deploy',name: 'TrashDeploy',component: TrashDeploy },

            {path:'/property/camera-Hware',name:'CameraHware',component:CameraHware},
            {path:'/property/broadcast-Hware',name:'BroadcastHware',component:BroadcastHware},
            {path:'/property/gate-Hware',name:'GateHware',component:GateHware},
            {path:'/property/lampLight-Hware',name:'LightHware',component:LightHware},
            {path:'/property/lampLight-Hware',name:'LightHware',component:LightHware},
            {path:'/property/led-Hware',name:'LedHware',component:LedHware},
            {path:'/property/wifi-Hware',name:'WifiHware',component:WifiHware},
            {path:'/property/voice-Hware',name:'VoiceHware',component:VoiceHware},
            {path:'/property/police-Hware',name:'PoliceHware',component:PoliceHware},
            {path:'/property/monitors-Hware',name:'MonitorsHware',component:MonitorsHware},
        ]
    }
  ]
const router = new Router({
    mode: 'history',
    routes
})
export default router
// })
