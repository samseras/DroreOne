import Alarm from '@/components/alarm'
import alarmcolumnRule from '@/components/eye/alarm/alarmRule/alarmcolumnRule'
import warningEvent from '@/components/eye/alarm/alarmEvent/warningEvent'
import firefightingRule from '@/components/eye/alarm/alarmRule/firefightingRule'
import crossborderRule from  '@/components/eye/alarm/alarmRule/crossborderRule'
import offtrackRule from '@/components/eye/alarm/alarmRule/offtrackRule'
import overlimitRule from '@/components/eye/alarm/alarmRule/overlimitRule'
import waterlevelRule from  '@/components/eye/alarm/alarmRule/waterlevelRule'
import conditionRule from '@/components/eye/alarm/alarmRule/conditionRule'
import speedingRule from '@/components/eye/alarm/alarmRule/speedingRule'

const alarm = [
    {
        path: '/alarm',
        name: 'alarm',
        redirect: '/alarm/warning-Event',
        component: Alarm,
        children:[

            {path:'/alarm/alarmcolumn-Rule',name:'alarmcolumnRule',component:alarmcolumnRule},
            {path:'/alarm/firefighting-Rule',name:'firefightingRule',component:firefightingRule},
            {path:'/alarm/crossborder-Rule',name:'crossborderRule',component:crossborderRule},
            {path:'/alarm/speeding-Rule',name:'speedingRule',component:speedingRule},
            {path:'/alarm/offtrack-Rule',name:'offtrackRule',component:offtrackRule},
            {path:'/alarm/overlimit-Rule',name:'overlimitRule',component:overlimitRule},
            {path:'/alarm/waterlevel-Rule',name:'waterlevelRule',component:waterlevelRule},
            {path:'/alarm/condition-Rule',name:'conditionRule',component:conditionRule},
            {path:'/alarm/warning-Event',name:'warningEvent',component:warningEvent}
        ]
    }
]
export default alarm
