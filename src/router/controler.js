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
        meta: {id: '0101'},
        children: [
            {path: '/controler/broad',name: 'Broad', component: resolve => require(['@/components/eye/controlChildren/broadcast'], resolve), meta: {id: '0101'}},
            {path: '/controler/person',name: 'Person', component: resolve => require(['@/components/eye/controlChildren/securityperson'], resolve), meta: {id: '0101'}},
            {path: '/controler/warn',name: 'Warn', component: resolve => require(['@/components/eye/controlChildren/warningControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/wifi',name: 'Wifi', component: resolve => require(['@/components/eye/controlChildren/wifiControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/screen',name: 'Screen', component: resolve => require(['@/components/eye/controlChildren/screenControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/car',name: 'Car', component: resolve => require(['@/components/eye/controlChildren/carControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/camera',name: 'Camera', component: resolve => require(['@/components/eye/controlChildren/cameraControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/other',name: 'Other', component: resolve => require(['@/components/eye/controlChildren/otherControl'], resolve), meta: {id: '0101'}},
            {path: '/controler/environment',name: 'Environment', component: resolve => require(['@/components/eye/controlChildren/environment'], resolve), meta: {id: '0101'}},
            {path: '/controler/light',name: 'Light', component: resolve => require(['@/components/eye/controlChildren/lightControl'], resolve), meta: {id: '0101'}},
        ]
    }
]
export default controler
