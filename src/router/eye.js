// import eyes from '@/components/pages/eye'

//管控
import controler from './controler'

//调度
import dispatch from './dispatch'

// 设施
import facility from './facility'

//告警
import alarm from './alarm'

const eye = [
    //全视之眼
    {
        path: '/eye',
        name: 'eye',
        redirect: '/controler',
        component: resolve => require(['@/components/pages/eye'], resolve),
        children: [
            // 管控
            ...controler,
            // 设施
            ...facility,
            //调度
            ...dispatch,
            // 告警
            ...alarm
        ]
    },
]
export default eye
