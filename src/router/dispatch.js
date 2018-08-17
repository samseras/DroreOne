import Deploy from '@/components/deploy'
import broadcastDmis from '@/components/eye/deployChildren/dispatchDeploy/broadcastDmis' //广播播放
import lamppostDmis from '@/components/eye/deployChildren/dispatchDeploy/lamppostDmis' //路灯照明
import screenDmis from '@/components/eye/deployChildren/dispatchDeploy/screenDmis' //LED
import securityDmis from '@/components/eye/deployChildren/dispatchDeploy/securityDmis' //巡更巡检
import purifierDmis from '@/components/eye/deployChildren/dispatchDeploy/purifierDmis' //保洁
import dispatchRecord from '@/components/eye/deployChildren/recordDeploy/dispatchRecord' //调度统计

const dispatch = [
    {
        path: '/deploy',
        name: 'deploy',
        redirect: '/deploy/broadcast-Dmis',
        component: Deploy,
        children:[
            {path:'/deploy/broadcast-Dmis',name:'boatcartDmis',component:broadcastDmis},
            {path:'/deploy/lamppost-Dmis',name:'lamppostDmis',component:lamppostDmis},
            {path:'/deploy/screen-Dmis',name:'screenDmis',component:screenDmis},
            {path:'/deploy/security-Dmis',name:'securityDmis',component:securityDmis},
            {path:'/deploy/purifier-Dmis',name:'purifierDmis',component:purifierDmis},
            {path:'/deploy/dispatch-Record',name:'dispatchRecord',component:dispatchRecord}
        ]
    }
]

export default dispatch
