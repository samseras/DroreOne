//数据中心-----设施
import BasicType from '@/components/propertyChildren/basicDeploy/basicType'
import ProBasicMenu from '@/components/propertyChildren/basicMenu'
import AreaDeploy from '@/components/propertyChildren/basicDeploy/areaDeploy'       //片区
import BoatDeploy from '@/components/propertyChildren/basicDeploy/boatCarDeploy'       //车船
import IndicatorDeploy from '@/components/propertyChildren/basicDeploy/indicatorDeploy'       //指示牌
import OtherDeploy from '@/components/propertyChildren/basicDeploy/otherDeploy'       //其他
import ParkDeploy from '@/components/propertyChildren/basicDeploy/parkDeploy'       //停车场
import RoatDeploy from '@/components/propertyChildren/basicDeploy/roatDeploy'       //路网
import ScenicDeploy from '@/components/propertyChildren/basicDeploy/scenicDeploy'       //景点
import ShopDeploy from '@/components/propertyChildren/basicDeploy/shopDeploy'       //商圈
import ToiletDeploy from '@/components/propertyChildren/basicDeploy/toiletDeploy'       //洗手间
import TrashDeploy from '@/components/propertyChildren/basicDeploy/trashDeploy'       //垃圾桶
import PlantDeploy from '@/components/propertyChildren/basicDeploy/plantDeploy'       //植物
import BuildDeploy from '@/components/propertyChildren/basicDeploy/buildingDeploy'       //建筑
import WharfDeploy from '@/components/propertyChildren/basicDeploy/WharfDeploy'       //码头

const basic = [
    {
        path: '/basic-property',
        name: 'ProBasicMenu',
        // redirect: '/basic-property/park-deploy',
        component: ProBasicMenu,
        children: [
            {path: '/basic-property/basictype', name: 'BasicType', component: BasicType},
            {path: '/basic-property/area-deploy', name: 'AreaDeploy', component: AreaDeploy},
            {path: '/basic-property/boat-deploy', name: 'BoatDeploy', component: BoatDeploy},
            {path: '/basic-property/indicator-deploy', name: 'IndicatorDeploy', component: IndicatorDeploy},
            {path: '/basic-property/other-deploy', name: 'OtherDeploy', component: OtherDeploy},
            {path: '/basic-property/park-deploy', name: 'ParkDeploy', component: ParkDeploy},
            {path: '/basic-property/roat-deploy', name: 'RoatDeploy', component: RoatDeploy},
            {path: '/basic-property/scenic-deploy', name: 'ScenicDeploy', component: ScenicDeploy},
            {path: '/basic-property/shop-deploy', name: 'ShopDeploy', component: ShopDeploy},
            {path: '/basic-property/toilet-deploy', name: 'ToiletDeploy', component: ToiletDeploy},
            {path: '/basic-property/trash-deploy', name: 'TrashDeploy', component: TrashDeploy},
            {path: '/basic-property/plant-deploy', name: 'PlantDeploy', component: PlantDeploy},
            {path: '/basic-property/construction-deploy', name: 'BuildDeploy', component: BuildDeploy},
            {path: '/basic-property/wharf-deploy', name: 'WharfDeploy', component: WharfDeploy},
        ]
    },
]
export default basic
