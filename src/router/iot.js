//iot
// import BasicStruc from '@/components/iot/basicStruc'                     //导航
//
// import IotHome from '@/components/iot/iotHome'                   //首页信息
// import IotDeviceType from '@/components/iot/deviceType'          //设备型号
// import IotDeviceList from '@/components/iot/deviceList'          //设备列表
// import IotDeviceTree from '@/components/iot/deviceTree'          //设备树形结构
// import IotSystemLog from '@/components/iot/iotLog/systemLog'     //系统日志
// import NowStatus from '@/components/iot/iotLog/nowStatus'        //实时数据

const iot = [
    //iot
    {
        name: 'BasicStruc',
        path: '/basicStruc',
        component: resolve => require(['@/components/iot/basicStruc'], resolve),
        redirect: '/basicStruc/iotHome',
        children: [
            {path: '/basicStruc/iotHome', name: 'IotHome', component: resolve => require(['@/components/iot/iotHome'], resolve)},
            {path: '/basicStruc/deviceModel/:category', name: 'IotDeviceType', component: resolve => require(['@/components/iot/deviceType'], resolve)},
            {path: '/basicStruc/deviceList/:category', name: 'IotDeviceList', component: resolve => require(['@/components/iot/deviceList'], resolve)},
            {path: '/basicStruc/deviceTree/:category', name: 'IotDeviceTree', component: resolve => require(['@/components/iot/deviceTree'], resolve)},
            {path:'/basicStruc/iotLog/systemLog',name:'IotSystemLog',component: resolve => require(['@/components/iot/iotLog/systemLog'], resolve)},
            {path:'/basicStruc/iotLog/nowStatus',name:'NowStatus',component: resolve => require(['@/components/iot/iotLog/nowStatus'], resolve)},
        ]
    },
]
export default iot
