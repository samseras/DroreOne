//地图
import gis from '@/components/pages/gis'
import mapManage from '@/components/gis/mapManage/mapManage'
import mapData from '@/components/gis/mapManage/mapData'
import labelManage from '@/components/gis/labelManage/labelManage'
import labelLibrary from '@/components/gis/labelManage/labelLibrary'

const GIS = [
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
        ]
    },
]

export default GIS
