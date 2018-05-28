import Vue from 'vue'
import Router from 'vue-router'
// import '../../static/js/jquery-1.8.3.min.js'


// import '../../static/js/echarts.min.js'
// import HelloWorld from '@/components/HelloWorld'
import MicServiceManagementSystem from '@/components/pages/MicroService/MicroServiceManagementSystem'
import Index from '@/components/pages/index'
import login from '@/components/pages/login'
import screen from '@/components/pages/screenShow'
// import Error from '@/components/pages/err'

import eye from '@/components/pages/eye'

// 全视之眼-----管控
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
import Light from '@/components/eye/controlChildren/lightControl' //

//地图
import gis from '@/components/pages/gis'
import mapManage from '@/components/gis/mapManage/mapManage'
import mapData from '@/components/gis/mapManage/mapData'
import labelManage from '@/components/gis/labelManage/labelManage'
import labelLibrary from '@/components/gis/labelManage/labelLibrary'

// 全视之眼----设施
import Facility from '@/components/facility'
import Road from "@/components/eye/facilityChildren/roadFacility"//路网
import Park from "@/components/eye/facilityChildren/parkFacility"//停车场
import Toilet from "@/components/eye/facilityChildren/toiletFacility"//卫生间
import Shop from "@/components/eye/facilityChildren/shopFacility"//商铺
import Build from "@/components/eye/facilityChildren/buildFacility"//建筑
import ScenicName from "@/components/eye/facilityChildren/scenicNameFacility"//景点
import Plant from "@/components/eye/facilityChildren/plantFacility"//植物
import Indicator from "@/components/eye/facilityChildren/indicatorFacility"//指示牌
import Trash from "@/components/eye/facilityChildren/trashFacility"//垃圾桶





// 全视之眼----主页（目前隐藏）
import HomePage from '@/components/homePage'

//全视之眼-----调度
import Deploy from '@/components/deploy'
import broadcastDmis from '@/components/eye/deployChildren/dispatchDeploy/broadcastDmis' //广播播放
import lamppostDmis from '@/components/eye/deployChildren/dispatchDeploy/lamppostDmis' //路灯照明
import screenDmis from '@/components/eye/deployChildren/dispatchDeploy/screenDmis' //LED
import securityDmis from '@/components/eye/deployChildren/dispatchDeploy/securityDmis' //巡更巡检
import purifierDmis from '@/components/eye/deployChildren/dispatchDeploy/purifierDmis' //保洁
import dispatchRecord from '@/components/eye/deployChildren/recordDeploy/dispatchRecord' //调度统计


//数据中心
import Property from '@/components/property'
import ProBasicMenu from '@/components/propertyChildren/basicMenu'
import HardWareMenu from '@/components/propertyChildren/hardWareMenu'
import BasicType from '@/components/propertyChildren/basicDeploy/basicType'
import HardWareType from '@/components/propertyChildren/hardwareDeploy/hardWareType'
//建筑


// 数据中心--设备
import wifiType from '@/components/propertyChildren/hardwareDeploy/wifiType'          //wifi型号
import broadcastType from '@/components/propertyChildren/hardwareDeploy/broadcastType'//广播型号
import cameraType from '@/components/propertyChildren/hardwareDeploy/cameraType'    //摄像头型号
import ledType from '@/components/propertyChildren/hardwareDeploy/ledType'          //led型号
import monitorType from '@/components/propertyChildren/hardwareDeploy/monitorType' //传感器型号
import gateType from '@/components/propertyChildren/hardwareDeploy/gateType'        //闸机型号
import lightType from '@/components/propertyChildren/hardwareDeploy/lightType'      //路灯型号
import policeType from '@/components/propertyChildren/hardwareDeploy/policeType'    //报警柱型号
import gpsType from '@/components/propertyChildren/hardwareDeploy/gpsType'          //GPS型号
import CameraHware from '@/components/propertyChildren/hardwareDeploy/cameraHardware'
import BroadcastHware from '@/components/propertyChildren/hardwareDeploy/broadcastHardware'
import GateHware from '@/components/propertyChildren/hardwareDeploy/gateHardware'
import LightHware from '@/components/propertyChildren/hardwareDeploy/lampLightHardware'
import LedHware from '@/components/propertyChildren/hardwareDeploy/ledHardware'
import MonitorsHware from '@/components/propertyChildren/hardwareDeploy/monitorsHardware'
import WifiHware from '@/components/propertyChildren/hardwareDeploy/wifiHardware'
import VoiceHware from '@/components/propertyChildren/hardwareDeploy/voiceHardware'
import PoliceHware from '@/components/propertyChildren/hardwareDeploy/policeHardware'

//数据中心-----设施
import AreaDeploy from '@/components/propertyChildren/basicDeploy/areaDeploy'       //片区
import BoatDeploy from '@/components/propertyChildren/basicDeploy/boatCarDeploy'       //车船
import IndicatorDeploy from '@/components/propertyChildren/basicDeploy/indicatorDeploy'       //指示牌
import OtherDeploy from '@/components/propertyChildren/basicDeploy/otherDeploy'       //其他
import ParkDeploy from '@/components/propertyChildren/basicDeploy/parkDeploy'       //停车场
import PersonDeploy from '@/components/personChildren/personDeploy'       //人员
import RoatDeploy from '@/components/propertyChildren/basicDeploy/roatDeploy'       //路网
import ScenicDeploy from '@/components/propertyChildren/basicDeploy/scenicDeploy'       //景点
import ShopDeploy from '@/components/propertyChildren/basicDeploy/shopDeploy'       //商圈
import ToiletDeploy from '@/components/propertyChildren/basicDeploy/toiletDeploy'       //洗手间
import TrashDeploy from '@/components/propertyChildren/basicDeploy/trashDeploy'       //垃圾桶
import PlantDeploy from '@/components/propertyChildren/basicDeploy/plantDeploy'       //植物
import BuildDeploy from '@/components/propertyChildren/basicDeploy/buildingDeploy'       //建筑
//  建筑  （目前在设施）
// import BuildingMenu from '@/components/propertyChildren/buildingMenu'
// import BuildingType from '@/components/propertyChildren/buildingDeploy/buildingType'
// import LandmarkBuilding from '@/components/propertyChildren/buildingDeploy/landmarkBuilding'
// import ServiceBuilding from '@/components/propertyChildren/buildingDeploy/serviceBuilding'

//数据中心-----人员
import PersonPlat from '@/components/person'
import PersonType from '@/components/personChildren/personType'


//告警
import Alarm from '@/components/alarm'
import alarmcolumnRule from '@/components/eye/alarm/alarmRule/alarmcolumnRule'
import warningEvent from '@/components/eye/alarm/alarmEvent/warningEvent'
import firefightingRule from '@/components/eye/alarm/alarmRule/firefightingRule'
import crossborderRule from  '@/components/eye/alarm/alarmRule/crossborderRule'
import offtrackRule from '@/components/eye/alarm/alarmRule/offtrackRule'
import overlimitRule from '@/components/eye/alarm/alarmRule/overlimitRule'
import waterlevelRule from  '@/components/eye/alarm/alarmRule/waterlevelRule'
import conditionRule from '@/components/eye/alarm/alarmRule/conditionRule'
// 数据分析（图表）
import Analyze from '@/components/analyze'
import Passenger from '@/components/analysisSystem/analyze/passengerFlow'

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
    // //404页面
    // {
    //     path: '/err',
    //     component: Error
    // },
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
            // 管控
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
                    {path: '/controler/light',name: 'Light', component:Light},
                ]
            },
            //分析
            // {
            //     path: '/analyze',
            //     name: 'analyze',
            //     // redirect: '/analyze/:id',
            //     component: Analyze,
            //     children: [
            //         {path: '/analyze/:id',name: 'Passenger', component:Passenger}
            //     ]
            // },
            // 设施
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
                    {path: '/facility/scenic',name: 'ScenicName', component:ScenicName},
                    {path: '/facility/build',name: 'Build', component:Build},
                    {path: '/facility/plant',name: 'Plant', component:Plant},
                    {path: '/facility/indicator',name: 'Indicator', component:Indicator},
                    {path: '/facility/trash',name: 'Trash', component:Trash}

                ]
            },
            //调度
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
                    {path:'/deploy/dispatch-Record',name:'dispatchRecord',component:dispatchRecord}
                ]
            },
            {
                path: '/alarm',
                name: 'alarm',
                redirect: '/alarm/warning-Event',
                component: Alarm,
                children:[

                    {path:'/alarm/alarmcolumn-Rule',name:'alarmcolumnRule',component:alarmcolumnRule},
                    {path:'/alarm/firefighting-Rule',name:'firefightingRule',component:firefightingRule},
                    {path:'/alarm/crossborder-Rule',name:'crossborderRule',component:crossborderRule},
                    // {path:'/alarm/speeding-Rule',name:'speendingRule',component:speendingRule},
                    {path:'/alarm/offtrack-Rule',name:'offtrackRule',component:offtrackRule},
                    {path:'/alarm/overlimit-Rule',name:'overlimitRule',component:overlimitRule},
                    {path:'/alarm/waterlevel-Rule',name:'waterlevelRule',component:waterlevelRule},
                    {path:'/alarm/condition-Rule',name:'conditionRule',component:conditionRule},
                    {path:'/alarm/warning-Event',name:'warningEvent',component:warningEvent}
                ]
            }
        ]
    },
    //数据中心
    {
        path: '/property',
        name: 'property',
        redirect: '/basic-property',
        component: Property,
        children: [
            // 设施
            {
                path: '/basic-property',
                name: 'ProBasicMenu',
                redirect: '/basic-property/basictype',
                component: ProBasicMenu,
                children: [
                    {path: '/basic-property/basictype', name: 'BasicType', component: BasicType},
                    {path: '/basic-property/area-deploy', name: 'AreaDeploy', component: AreaDeploy},
                    {path: '/basic-property/boat-deploy', name: 'BoatDeploy', component: BoatDeploy},
                    {path: '/basic-property/indicator-deploy', name: 'IndicatorDeploy', component: IndicatorDeploy},
                    {path: '/basic-property/other-deploy', name: 'OtherDeploy', component: OtherDeploy},
                    {path: '/basic-property/park-deploy', name: 'ParkDeploy', component: ParkDeploy},
                    // {path: '/basic-property/person-deploy', name: 'PersonDeploy', component: PersonDeploy},
                    {path: '/basic-property/roat-deploy', name: 'RoatDeploy', component: RoatDeploy},
                    {path: '/basic-property/scenic-deploy', name: 'ScenicDeploy', component: ScenicDeploy},
                    {path: '/basic-property/shop-deploy', name: 'ShopDeploy', component: ShopDeploy},
                    {path: '/basic-property/toilet-deploy', name: 'ToiletDeploy', component: ToiletDeploy},
                    {path: '/basic-property/trash-deploy', name: 'TrashDeploy', component: TrashDeploy},
                    {path: '/basic-property/plant-deploy', name: 'PlantDeploy', component: PlantDeploy},
                    {path: '/basic-property/construction-deploy', name: 'BuildDeploy', component: BuildDeploy},
                ]
            },
            // 设备
            {
                path: '/hard-property',
                name: 'HardWareMenu',
                redirect: '/hard-property/camera-Hware',
                component: HardWareMenu,
                children: [
                    {path: '/hard-property/cameraType', name: 'cameraType', component: cameraType},
                    {path: '/hard-property/wifitype', name: 'wifiType', component: wifiType},
                    {path: '/hard-property/broadcastType', name: 'broadcastType', component:broadcastType},
                    {path: '/hard-property/ledType', name: 'ledType', component: ledType},
                    {path: '/hard-property/monitorType', name: 'monitorType', component: monitorType},
                    {path: '/hard-property/gateType', name: 'gateType', component: gateType},
                    {path: '/hard-property/lightType', name: 'lightType', component: lightType},
                    {path: '/hard-property/policeType', name: 'policeType', component: policeType},
                    {path: '/hard-property/gpsType', name: 'gpsType', component: gpsType},


                    {path: '/hard-property/camera-Hware', name: 'CameraHware', component: CameraHware},
                    {path: '/hard-property/broadcast-Hware', name: 'BroadcastHware', component: BroadcastHware},
                    {path: '/hard-property/gate-Hware', name: 'GateHware', component: GateHware},
                    {path: '/hard-property/lampLight-Hware', name: 'LightHware', component: LightHware},
                    {path: '/hard-property/led-Hware', name: 'LedHware', component: LedHware},
                    {path: '/hard-property/wifi-Hware', name: 'WifiHware', component: WifiHware},
                    {path: '/hard-property/voice-Hware', name: 'VoiceHware', component: VoiceHware},
                    {path: '/hard-property/police-Hware', name: 'PoliceHware', component: PoliceHware},
                    {path: '/hard-property/monitors-Hware', name: 'MonitorsHware', component: MonitorsHware},
                ]
            },
            // 人员
            {
                path: '/person',
                name: PersonPlat,
                component: PersonPlat,
                redirect: '/person/personType',
                children: [
                    {path: '/person/personType', name: "PersonType", component: PersonType},
                    { path: '/person/:id',name: 'PersonDeploy', component:PersonDeploy }
                ]
            },
        ]
    },
    //GIS
    {
        path: '/gisMap',
        name: 'gisMap',
        component: gis,
        redirect: '/mapManage',
        children: [
            {
                path: '/mapManage',
                name: 'mapManage',
                redirect: '/mapManage/mapData',
                component: mapManage,
                children: [
                    {path: '/mapManage/mapData',name: 'mapData', component: mapData}
                ]
            },
            {
                path: '/labelManage',
                name: 'labelManage',
                redirect: '/labelManage/labelLibrary',
                component: labelManage,
                children: [
                    {path: '/labelManage/labelLibrary',name: 'labelLibrary', component:labelLibrary}
                ]
            }
            // ,
            // {
            //     path: '/styleManage',
            //     name: 'styleManage',
            //     redirect: '/styleManage/styleLibrary',
            //     component: styleManage,
            //     children: [
            //         {path: '/styleManage/styleLibrary',name: 'styleLibrary', component:styleLibrary}
            //     ]
            // }
        ]
    },
  //  分析
    {
        path: '/analyze',
        name: 'analyze',
        component: Analyze,
        children: [
            {path: '/analyze/:id',name: 'Passenger', component:Passenger}
        ]
    },

  ]
const router = new Router({
    mode: 'history',
    routes
})
export default router
// })
