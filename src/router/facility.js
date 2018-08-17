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

const facility = [
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
    }
]

export default facility
