// 数据分析（图表）
// import Analysis from '@/components/analysis'
// import Passenger from '@/components/analysisSystem/analysis/passengerFlow'
//数据可视化
import dataVisualization from '@/components/dataVisualization'
import originTrip from '@/components/visualChild/originTrip'
import parking from '@/components/visualChild/parking'
import passengerFlow from '@/components/visualChild/passengerFlow'
import scenicHeaTMap from '@/components/visualChild/scenicHeaTMap'
import ticket from '@/components/visualChild/ticket'

const analyze = [
    //  分析
    {
        path: '/analysis',
        name: 'analysis',
        component: resolve => require(['@/components/analysis'], resolve),
        meta: {id: '02'},
        children: [
            {path: '/analysis/:id',name: 'Passenger', component: resolve => require(['@/components/analysisSystem/analysis/passengerFlow'], resolve), meta: {id: '02'}}
        ]
    },
    //数据可视化
    {
        path: '/dataVisualization',
        name: 'dataVisualization',
        component: dataVisualization,
        redirect: '/dataVisualization/passengerFlow',
        meta: {id: '03'},
        children: [
            {path: 'passengerFlow', name: 'passengerFlow', component: passengerFlow, meta: {id: '03'}},
            {path: 'originTrip', name: 'originTrip', component: originTrip, meta: {id: '03'}},
            {path: 'parking', name: 'parking', component: parking, meta: {id: '03'}},
            {path: 'scenicHeaTMap', name: 'scenicHeaTMap', component: scenicHeaTMap, meta: {id: '03'}},
            {path: 'ticket', name: 'ticket', component: ticket, meta: {id: '03'}}
        ]
    },
]

export default analyze
