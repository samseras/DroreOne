//数据中心-----设施
// import BasicType from '@/components/propertyChildren/basicDeploy/basicType'
// import ProBasicMenu from '@/components/propertyChildren/basicMenu'
// import AreaDeploy from '@/components/propertyChildren/basicDeploy/areaDeploy'       //片区
// import BoatDeploy from '@/components/propertyChildren/basicDeploy/boatCarDeploy'       //车船
// import IndicatorDeploy from '@/components/propertyChildren/basicDeploy/indicatorDeploy'       //指示牌
// import OtherDeploy from '@/components/propertyChildren/basicDeploy/otherDeploy'       //其他
// import ParkDeploy from '@/components/propertyChildren/basicDeploy/parkDeploy'       //停车场
// import RoatDeploy from '@/components/propertyChildren/basicDeploy/roatDeploy'       //路网
// import ScenicDeploy from '@/components/propertyChildren/basicDeploy/scenicDeploy'       //景点
// import ShopDeploy from '@/components/propertyChildren/basicDeploy/shopDeploy'       //商圈
// import ToiletDeploy from '@/components/propertyChildren/basicDeploy/toiletDeploy'       //洗手间
// import TrashDeploy from '@/components/propertyChildren/basicDeploy/trashDeploy'       //垃圾桶
// import PlantDeploy from '@/components/propertyChildren/basicDeploy/plantDeploy'       //植物
// import BuildDeploy from '@/components/propertyChildren/basicDeploy/buildingDeploy'       //建筑
// import WharfDeploy from '@/components/propertyChildren/basicDeploy/WharfDeploy'       //码头

const basic = [
    {
        path: '/basic-property',
        name: 'ProBasicMenu',
        redirect: '/basic-property/park-deploy',
        component: resolve => require(['@/components/propertyChildren/basicMenu'], resolve),
        meta: {id: '0402'},
        children: [
            {path: '/basic-property/basictype', name: 'BasicType', component: resolve => require(['@/components/propertyChildren/basicDeploy/basicType'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/area-deploy', name: 'AreaDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/areaDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/boat-deploy', name: 'BoatDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/boatCarDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/indicator-deploy', name: 'IndicatorDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/indicatorDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/other-deploy', name: 'OtherDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/otherDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/park-deploy', name: 'ParkDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/parkDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/roat-deploy', name: 'RoatDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/roatDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/scenic-deploy', name: 'ScenicDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/scenicDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/shop-deploy', name: 'ShopDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/shopDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/toilet-deploy', name: 'ToiletDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/toiletDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/trash-deploy', name: 'TrashDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/trashDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/plant-deploy', name: 'PlantDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/plantDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/construction-deploy', name: 'BuildDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/buildingDeploy'], resolve), meta: {id: '0402'}},
            {path: '/basic-property/station-deploy', name: 'StationDeploy', component: resolve => require(['@/components/propertyChildren/basicDeploy/stationDeploy'], resolve), meta: {id: '0402'}},
        ]
    },
]
export default basic
