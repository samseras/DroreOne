// import Deploy from '@/components/deploy'
// import broadcastDmis from '@/components/eye/deployChildren/dispatchDeploy/broadcastDmis' //广播播放
// import lamppostDmis from '@/components/eye/deployChildren/dispatchDeploy/lamppostDmis' //路灯照明
// import screenDmis from '@/components/eye/deployChildren/dispatchDeploy/screenDmis' //LED
// import securityDmis from '@/components/eye/deployChildren/dispatchDeploy/securityDmis' //巡更巡检
// import purifierDmis from '@/components/eye/deployChildren/dispatchDeploy/purifierDmis' //保洁
// import dispatchRecord from '@/components/eye/deployChildren/recordDeploy/dispatchRecord' //调度统计

const dispatch = [
    {
        path: '/deploy',
        name: 'deploy',
        redirect: '/deploy/security-Dmis',
        component: resolve => require(['@/components/deploy'], resolve),
        meta: {id: '0103'},
        children:[
            {path:'/deploy/broadcast-Dmis',name:'boatcartDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/broadcastDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/lamppost-Dmis',name:'lamppostDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/lamppostDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/screen-Dmis',name:'screenDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/screenDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/security-Dmis',name:'securityDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/securityDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/purifier-Dmis',name:'purifierDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/purifierDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/transport-Dmis',name:'transportDmis',component: resolve => require(['@/components/eye/deployChildren/dispatchDeploy/transportDmis'], resolve), meta: {id: '0103'}},
            {path:'/deploy/dispatch-Record',name:'dispatchRecord',component: resolve => require(['@/components/eye/deployChildren/recordDeploy/dispatchRecord'], resolve), meta: {id: '0103'}},
        ]
    }
]

export default dispatch
