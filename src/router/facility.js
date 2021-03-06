// 全视之眼----设施
// import Facility from '@/components/facility'
// import Road from "@/components/eye/facilityChildren/roadFacility"//路网
// import Park from "@/components/eye/facilityChildren/parkFacility"//停车场
// import Toilet from "@/components/eye/facilityChildren/toiletFacility"//卫生间
// import Shop from "@/components/eye/facilityChildren/shopFacility"//商铺
// import Build from "@/components/eye/facilityChildren/buildFacility"//建筑
// import ScenicName from "@/components/eye/facilityChildren/scenicNameFacility"//景点
// import Plant from "@/components/eye/facilityChildren/plantFacility"//植物
// import Indicator from "@/components/eye/facilityChildren/indicatorFacility"//指示牌
// import Trash from "@/components/eye/facilityChildren/trashFacility"//垃圾桶

const facility = [
    {
        path: '/facility',
        name: 'facility',
        redirect: '/facility/build',
        component: resolve => require(['@/components/facility'], resolve),
        meta: {id: '0102'},
        children: [
            {path: '/facility/toilet',name: 'Toilet', component: resolve => require(['@/components/eye/facilityChildren/toiletFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/park',name: 'Park', component: resolve => require(['@/components/eye/facilityChildren/parkFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/shop',name: 'Shop', component: resolve => require(['@/components/eye/facilityChildren/shopFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/road',name: 'Road', component: resolve => require(['@/components/eye/facilityChildren/roadFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/scenic',name: 'ScenicName', component: resolve => require(['@/components/eye/facilityChildren/scenicNameFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/build',name: 'Build', component: resolve => require(['@/components/eye/facilityChildren/buildFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/plant',name: 'Plant', component: resolve => require(['@/components/eye/facilityChildren/plantFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/indicator',name: 'Indicator', component: resolve => require(['@/components/eye/facilityChildren/indicatorFacility'], resolve), meta: {id: '0102'}},
            {path: '/facility/trash',name: 'Trash', component: resolve => require(['@/components/eye/facilityChildren/trashFacility'], resolve), meta: {id: '0102'}}
        ]
    }
]

export default facility
