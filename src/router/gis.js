//地图
// import gis from '@/components/pages/gis'
// import mapManage from '@/components/gis/mapManage/mapManage'
// import mapData from '@/components/gis/mapManage/mapData'
// import labelManage from '@/components/gis/labelManage/labelManage'
// import labelLibrary from '@/components/gis/labelManage/labelLibrary'

const GIS = [
    //GIS
    {
        path: '/gisMap',
        name: 'gisMap',
        component: resolve => require(['@/components/pages/gis'], resolve),
        redirect: '/mapManage',
        children: [
            {
                path: '/mapManage',
                name: 'mapManage',
                redirect: '/mapManage/mapData',
                component: resolve => require(['@/components/gis/mapManage/mapManage'], resolve),
                children: [
                    {path: '/mapManage/mapData',name: 'mapData', component: resolve => require(['@/components/gis/mapManage/mapData'], resolve)}
                ]
            },
            {
                path: '/labelManage',
                name: 'labelManage',
                redirect: '/labelManage/labelLibrary',
                component: resolve => require(['@/components/gis/labelManage/labelManage'], resolve),
                children: [
                    {path: '/labelManage/labelLibrary',name: 'labelLibrary', component:resolve => require(['@/components/gis/labelManage/labelLibrary'], resolve)}
                ]
            }
        ]
    },
]

export default GIS
