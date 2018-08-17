//iot
import BasicStruc from '@/components/iot/basicStruc'                     //导航

import IotHome from '@/components/iot/iotHome'                   //首页信息
import IotDeviceType from '@/components/iot/deviceType'          //设备型号
import IotDeviceList from '@/components/iot/deviceList'          //设备列表
import IotDeviceTree from '@/components/iot/deviceTree'          //设备树形结构
import IotSystemLog from '@/components/iot/iotLog/systemLog'     //系统日志
import NowStatus from '@/components/iot/iotLog/nowStatus'        //实时数据

const iot = [
    //iot
    {
        name: 'BasicStruc',
        path: '/basicStruc',
        component:BasicStruc,
        redirect: '/basicStruc/iotHome',
        children: [
            {path: '/basicStruc/iotHome', name: 'IotHome', component: IotHome},
            {path: '/basicStruc/deviceModel/:category', name: 'IotDeviceType', component:IotDeviceType},
            {path: '/basicStruc/deviceList/:category', name: 'IotDeviceList', component:IotDeviceList},
            {path: '/basicStruc/deviceTree/:category', name: 'IotDeviceTree', component:IotDeviceTree},
            {path:'/basicStruc/iotLog/systemLog',name:'IotSystemLog',component:IotSystemLog},
            {path:'/basicStruc/iotLog/nowStatus',name:'NowStatus',component:NowStatus},
        ]
    },
]
export default iot
