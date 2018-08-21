// import Alarm from '@/components/alarm'
// import alarmcolumnRule from '@/components/eye/alarm/alarmRule/alarmcolumnRule'
// import warningEvent from '@/components/eye/alarm/alarmEvent/warningEvent'
// import firefightingRule from '@/components/eye/alarm/alarmRule/firefightingRule'
// import crossborderRule from  '@/components/eye/alarm/alarmRule/crossborderRule'
// import offtrackRule from '@/components/eye/alarm/alarmRule/offtrackRule'
// import overlimitRule from '@/components/eye/alarm/alarmRule/overlimitRule'
// import waterlevelRule from  '@/components/eye/alarm/alarmRule/waterlevelRule'
// import conditionRule from '@/components/eye/alarm/alarmRule/conditionRule'
// import speedingRule from '@/components/eye/alarm/alarmRule/speedingRule'

const alarm = [
    {
        path: '/alarm',
        name: 'alarm',
        redirect: '/alarm/warning-Event',
        component: resolve => require(['@/components/alarm'], resolve),
        children:[
            {path:'/alarm/alarmcolumn-Rule',name:'alarmcolumnRule',component: resolve => require(['@/components/eye/alarm/alarmRule/alarmcolumnRule'], resolve)},
            {path:'/alarm/firefighting-Rule',name:'firefightingRule',component: resolve => require(['@/components/eye/alarm/alarmRule/firefightingRule'], resolve)},
            {path:'/alarm/crossborder-Rule',name:'crossborderRule',component: resolve => require(['@/components/eye/alarm/alarmRule/crossborderRule'], resolve)},
            {path:'/alarm/speeding-Rule',name:'speedingRule',component: resolve => require(['@/components/eye/alarm/alarmRule/speedingRule'], resolve)},
            {path:'/alarm/offtrack-Rule',name:'offtrackRule',component: resolve => require(['@/components/eye/alarm/alarmRule/offtrackRule'], resolve)},
            {path:'/alarm/overlimit-Rule',name:'overlimitRule',component: resolve => require(['@/components/eye/alarm/alarmRule/overlimitRule'], resolve)},
            {path:'/alarm/waterlevel-Rule',name:'waterlevelRule',component: resolve => require(['@/components/eye/alarm/alarmRule/waterlevelRule'], resolve)},
            {path:'/alarm/condition-Rule',name:'conditionRule',component: resolve => require(['@/components/eye/alarm/alarmRule/conditionRule'], resolve)},
            {path:'/alarm/warning-Event',name:'warningEvent',component: resolve => require(['@/components/eye/alarm/alarmEvent/warningEvent'], resolve)}
        ]
    }
]
export default alarm
