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

const controler = [
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
    }
]
export default controler
