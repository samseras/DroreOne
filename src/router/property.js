




//数据中心
// import Property from '@/components/property'




//设施
import basic from './basic'

// 设备
import hardware from './hardware'
// 文件
import file from './file'

const property = [
    //数据中心
    {
        path: '/property',
        name: 'property',
        component: resolve => require(['@/components/property'], resolve),
        meta: {id: '04'},
        children: [
            // 设施
            ...basic,
            // 设备
            ...hardware,
            //    文件
            ...file
        ]
    },
]

export default property
