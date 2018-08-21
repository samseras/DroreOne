// 数据分析（图表）
// import Analysis from '@/components/analysis'
// import Passenger from '@/components/analysisSystem/analysis/passengerFlow'

const analyze = [
    //  分析
    {
        path: '/analysis',
        name: 'analysis',
        component: resolve => require(['@/components/analysis'], resolve),
        children: [
            {path: '/analysis/:id',name: 'Passenger', component: resolve => require(['@/components/analysisSystem/analysis/passengerFlow'], resolve)}
        ]
    }
]

export default analyze
