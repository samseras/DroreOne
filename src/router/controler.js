// 全视之眼-----管控
import Controler from '@/components/controler'
import Broad from '@/components/eye/controlChildren/broadcast'
import Person from '@/components/eye/controlChildren/securityperson'
import Warn from '@/components/eye/controlChildren/warningControl'
import Wifi from '@/components/eye/controlChildren/wifiControl'
import Screen from '@/components/eye/controlChildren/screenControl'
import Car from '@/components/eye/controlChildren/carControl'
import Camera from '@/components/eye/controlChildren/cameraControl'
import Other from '@/components/eye/controlChildren/otherControl'
import Environment from '@/components/eye/controlChildren/environment'
import Light from '@/components/eye/controlChildren/lightControl'

const controler = [
    {
        path: '/controler',
        name: 'controler',
        redirect: '/controler/broad',
        component: resolve => require(['@/components/controler'], resolve),
        children: [
            {path: '/controler/broad',name: 'Broad', component: resolve => require(['@/components/eye/controlChildren/broadcast'], resolve)},
            {path: '/controler/person',name: 'Person', component: resolve => require(['@/components/eye/controlChildren/securityperson'], resolve)},
            {path: '/controler/warn',name: 'Warn', component: resolve => require(['@/components/eye/controlChildren/warningControl'], resolve)},
            {path: '/controler/wifi',name: 'Wifi', component: resolve => require(['@/components/eye/controlChildren/wifiControl'], resolve)},
            {path: '/controler/screen',name: 'Screen', component: resolve => require(['@/components/eye/controlChildren/screenControl'], resolve)},
            {path: '/controler/car',name: 'Car', component: resolve => require(['@/components/eye/controlChildren/carControl'], resolve)},
            {path: '/controler/camera',name: 'Camera', component: resolve => require(['@/components/eye/controlChildren/cameraControl'], resolve)},
            {path: '/controler/other',name: 'Other', component: resolve => require(['@/components/eye/controlChildren/otherControl'], resolve)},
            {path: '/controler/environment',name: 'Environment', component: resolve => require(['@/components/eye/controlChildren/environment'], resolve)},
            {path: '/controler/light',name: 'Light', component: resolve => require(['@/components/eye/controlChildren/lightControl'], resolve)},
        ]
    }
]
export default controler
