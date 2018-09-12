// 数据中心--设备
// import DeviceType from '@/components/propertyChildren/hardwareDeploy/deviceType'
// import HardWareMenu from '@/components/propertyChildren/hardWareMenu'
// import wifiType from '@/components/propertyChildren/hardwareDeploy/wifiType'          //wifi型号
// import broadcastType from '@/components/propertyChildren/hardwareDeploy/broadcastType'//广播型号
// import cameraType from '@/components/propertyChildren/hardwareDeploy/cameraType'    //摄像头型号
// import ledType from '@/components/propertyChildren/hardwareDeploy/ledType'          //led型号
// import monitorType from '@/components/propertyChildren/hardwareDeploy/monitorType' //传感器型号
// import gateType from '@/components/propertyChildren/hardwareDeploy/gateType'        //闸机型号
// import lightType from '@/components/propertyChildren/hardwareDeploy/lightType'      //路灯型号
// import policeType from '@/components/propertyChildren/hardwareDeploy/policeType'    //报警柱型号
// import gpsType from '@/components/propertyChildren/hardwareDeploy/gpsType'          //GPS型号
// import CameraHware from '@/components/propertyChildren/hardwareDeploy/cameraHardware'
// import BroadcastHware from '@/components/propertyChildren/hardwareDeploy/broadcastHardware'
// import GateHware from '@/components/propertyChildren/hardwareDeploy/gateHardware'
// import LightHware from '@/components/propertyChildren/hardwareDeploy/lampLightHardware'
// import LedHware from '@/components/propertyChildren/hardwareDeploy/ledHardware'
// import MonitorsHware from '@/components/propertyChildren/hardwareDeploy/monitorsHardware'
// import WifiHware from '@/components/propertyChildren/hardwareDeploy/wifiHardware'
// import VoiceHware from '@/components/propertyChildren/hardwareDeploy/voiceHardware'
// import PoliceHware from '@/components/propertyChildren/hardwareDeploy/policeHardware'

const hardware = [
    {
        path: '/hard-property',
        name: 'HardWareMenu',
        // redirect: '/hard-property/camera-Hware',
        component: resolve => require(['@/components/propertyChildren/hardWareMenu'], resolve),
        meta: {id : '0403'},
        children: [
            {path: '/hard-property/deviceType', name: 'DeviceType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/deviceType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/cameraType', name: 'cameraType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/cameraType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/wifitype', name: 'wifiType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/wifiType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/broadcastType', name: 'broadcastType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/broadcastType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/ledType', name: 'ledType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/ledType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/monitorType', name: 'monitorType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/monitorType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/gateType', name: 'gateType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/gateType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/lightType', name: 'lightType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/lightType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/policeType', name: 'policeType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/policeType'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/gpsType', name: 'gpsType', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/gpsType'], resolve), meta: {id : '0403'}},

            {path: '/hard-property/camera-Hware', name: 'CameraHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/cameraHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/broadcast-Hware', name: 'BroadcastHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/broadcastHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/gate-Hware', name: 'GateHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/gateHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/lampLight-Hware', name: 'LightHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/lampLightHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/led-Hware', name: 'LedHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/ledHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/wifi-Hware', name: 'WifiHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/wifiHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/voice-Hware', name: 'VoiceHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/voiceHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/police-Hware', name: 'PoliceHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/policeHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/monitors-Hware', name: 'MonitorsHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/monitorsHardware'], resolve), meta: {id : '0403'}},
            {path: '/hard-property/gps-Hware', name: 'GpsHware', component: resolve => require(['@/components/propertyChildren/hardwareDeploy/gpsHardware'], resolve), meta: {id : '0403'}},
        ]
    },
]

export default hardware
