// 数据中心--设备
import DeviceType from '@/components/propertyChildren/hardwareDeploy/deviceType'
import HardWareMenu from '@/components/propertyChildren/hardWareMenu'
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

const hardware = [
    {
        path: '/hard-property',
        name: 'HardWareMenu',
        // redirect: '/hard-property/camera-Hware',
        component: HardWareMenu,
        children: [
            {path: '/hard-property/deviceType', name: 'DeviceType', component: DeviceType},

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
]

export default hardware
