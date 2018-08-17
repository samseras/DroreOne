// 数据分析（图表）
import Analysis from '@/components/analysis'
import Passenger from '@/components/analysisSystem/analysis/passengerFlow'

const analyze = [
    //  分析
    {
        path: '/analysis',
        name: 'analysis',
        component: Analysis,
        children: [
            {path: '/analysis/:id',name: 'Passenger', component:Passenger}
        ]
    }
]

export default analyze
