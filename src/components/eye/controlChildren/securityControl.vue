<template>
    <div class="security">
        <div class="reveal">
            <div class="top">
                <div :class="[activePerson, stretchClass,itemClass]" @click="tabClick('person')">
                    人员调度
                </div>
                <div :class="[activeSchedule, stretchClass,itemClass]" @click="tabClick('schedule')">
                    巡检计划调度
                </div>
                <div :class="[barClass,stretchClass,positionClass]"></div>
            </div>
            <div class="middle" v-show="isPerson">
                <div class="boottom">
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="securityPersonInfo"
                            :lightCheckout="sePersonCheckout"
                            :regionId="regionId"
                            :lightList="securityPersonlist"
                            :number="personNumber">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>

            <div class="middle"  v-show="!isPerson">
                <div class="boottom">
                    <ScrollContainer>
                        <schedule-ztree
                            :title="title"
                            :Info="securityScheduleInfo"
                            :lightCheckout="seScheduleCheckout"
                            :regionId="regionId"
                            :list="securitySchedulelist"
                            :number="scheduleNumber">
                        </schedule-ztree>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import broadcastZtree from "./children/broadcastzTree.vue"
    import scheduleZtree from "./children/schedulezTree.vue"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        name:'security',
        data() {
            return {
                positionClass:'',
                activePerson:'',
                activeSchedule:'',
                stretchClass:'stretch',
                barClass:'bar',
                itemClass:'item',
                isPerson:true,
                open:false,
                isShow: true,
                options: [],
                boatObjs:[],
                value: '',
                personNumber: '0',
                scheduleNumber: '0',
                fault: '0',
                optionMisic: [],
                isShowBroadCard: false,
                securityPersonInfo:[],
                securityScheduleInfo:[],
                securityPersonlist:[],
                securitySchedulelist:[],
                sePersonCheckout:[],
                seScheduleCheckout:[],
                regionId:[],
                selectAll:[],
                title:'人员',
                online: '0',
                faultlist:[],
                drivers:[],
                crew:[],
                scheduleRoutes:[],
                activeName:'securityPerson'
            }
        },
        components: {
            broadcastZtree,
            scheduleZtree,
            ScrollContainer
        },
        methods: {
            tabClick(type){
                if(type == 'person'){
                    this.title = '人员'
                    this.initPersonData()
                    this.treeShow('person')
                    this.positionClass = 'personBar'
                    this.activePerson = 'isActive'
                    this.activeSchedule=''
                    this.isPerson = true
                }else if(type == 'schedule'){
                    this.title = '巡检计划'
                    this.initScheduleData()
                    this.treeShow('schedule')
                    this.positionClass = 'scheduleBar'
                    this.activePerson = ''
                    this.activeSchedule = 'isActive'
                    this.isPerson = false
                }
            },
            treeShow(type){
                console.log(this.getcontrolSecurityPerson,'1');
                console.log(this.getcontrolSecuritySchedule,'2');
                if(type == 'person'){
                    if(this.getcontrolSecurityPerson){
                        this.sePersonCheckout=this.getcontrolSecurityPerson
                    }
                }else if(type == 'schedule'){
                    if(this.getcontrolSecuritySchedule){
                        this.seScheduleCheckout=this.getcontrolSecuritySchedule
                    }
                }
            },
            showBroadCard() {
                this.isShowBroadCard = true
            },
            newagenda: function () {
                $(".newagenda").show();

            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('pie'))
                // 绘制图表
                myChart.setOption({
                    series: [
                        {
                            laber: {
                                color: "#7d7d7d"
                            },
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            startAngle: 60,
                            label: {            //饼图图形上的文本标签
                                normal: {
                                    formatter: '{d}%'
                                }
                            },
                            data: [
                                {
                                    value: this.online,
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: this.fault,
                                    label: {normal: {show: true, color: "#646464", fontSize: 12}},
                                    labelLine: {
                                        normal: {
                                            length: 4,
                                            lineStyle: {
                                                color: "#646464",
                                                type: "dashed",

                                            }
                                        }
                                    }
                                }
                            ],
                            labelLine: {
                                show: false
                            }

                        }
                    ],
                    color: ['#26bbf0', '#f36a5a']
                });
            },
            async initPersonData(){
//                 let users = [
//                     {
//                         "id": "165d0c3918c-2706abc77a5ee8e8",
//                         "creator": "admin",
//                         "createTime": "2018-09-13 10:30:02",
//                         "modifier": "admin",
//                         "modifyTime": "2018-09-13 10:30:02",
//                         "name": "binge",
//                         "cnName": "斌",
//                         "gender": 1,
//                         "iconId": null,
//                         "mobileNum": "18629086642",
//                         "fixedPhoneNum": "",
//                         "idCardNum": "",
//                         "email": null,
//                         "workAddress": null,
//                         "description": null,
//                         "departmentId": null,
//                         "jobId": null,
//                         "roleId": "1",
//                         "gpsId": null,
//                         "gpsData": {
//                             "deviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
//                             "ioTDeviceId": "1000000",
//                             "deviceName": "gps0",
//                             "createTime": "2018-09-21 10:15:56",
//                             "longitude": 120.13337197656278,
//                             "latitude": 30.307558496764344,
//                             "altitude": null,
//                             "direction": null,
//                             "speed": 0,
//                             "telephone": null,
//                             "deviceNum": "1000000",
//                             "coordinate": "",
//                             "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
//                         },
//                         "role": {
//                             "id": "1",
//                             "creator": null,
//                             "createTime": null,
//                             "modifier": null,
//                             "modifyTime": null,
//                             "name": "admin",
//                             "description": "",
//                             "permissions": null
//                         },
//                         "job": null,
//                         "department": null
//                     },
//                     {
//                         "id": "3p696d8b-7f38-41dc-8b3c-8db147c05269",
//                         "creator": null,
//                         "createTime": null,
//                         "modifier": "admin",
//                         "modifyTime": "2018-09-11 18:00:00",
//                         "name": "admin",
//                         "cnName": " 系统管理员",
//                         "gender": 0,
//                         "iconId": null,
//                         "mobileNum": "18800000000",
//                         "fixedPhoneNum": null,
//                         "idCardNum": null,
//                         "email": null,
//                         "workAddress": null,
//                         "description": null,
//                         "departmentId": null,
//                         "jobId": null,
//                         "roleId": "1",
//                         "gpsId": null,
//                         "gpsData":{
//                             "deviceId": "2b696d8b-7f38-41dc-8b3c-8db147c02c32",
//                             "ioTDeviceId": "1000007",
//                             "deviceName": "gps1",
//                             "createTime": "2018-09-21 10:15:56",
//                             "longitude": 120.13500857210744,
//                             "latitude": 30.305894893713628,
//                             "altitude": null,
//                             "direction": null,
//                             "speed": 0,
//                             "telephone": null,
//                             "deviceNum": "1000007",
//                             "coordinate": "",
//                             "tag": "966fda56-8cc3-4847-86cc-7e939df14369"
//                         },
//                         "role": {
//                             "id": "1",
//                             "creator": null,
//                             "createTime": null,
//                             "modifier": null,
//                             "modifyTime": null,
//                             "name": "admin",
//                             "description": "",
//                             "permissions": null
//                         },
//                         "job": null,
//                         "department": null
//                     }
//                 ]
//                 this.personNumber=users.length
//                 this.securityPersonInfo=[]
//                 this.securityPersonlist = []
//                 let personObj = {
//                     label:'人员',
//                     id:'100000',
//                     children:[]
//                 }
//                 this.regionId = ['100000']
//                 let childObj
//                 if(users.length >0){
//                     users.forEach(userObj=>{
//                         childObj = {
//                             label:userObj.cnName,
//                             id:userObj.id,
//                             url:'/static/img/icon/people_small.svg',
//                             type:'security',
//                             subtype:'securityPerson',
//                             regionId:'100000',
//                             status:userObj.gpsData ? "ONLINE" : "OFFLINE",
//                             icon:userObj.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
//                             longitude:userObj.gpsData ? userObj.gpsData.longitude : '',
//                             latitude:userObj.gpsData ? userObj.gpsData.latitude : '',
//                             gpsDeviceId:userObj.gpsId
//                         }
//                         this.securityPersonlist.push(childObj)
//                         personObj.children.push(childObj)
//                     })
//                 }
//
//                 this.securityPersonInfo.push(personObj)
//                 console.log(this.securityPersonInfo)

                let param = {
                        "entityId":null,
                        "from":null,
                        "to":null,
                        "status":null
                }
                Promise.all([this.getAllUser(),this.getAllPunchRecord(param)]).then(result=>{
                    console.log(result,'00000')
                    let users = result[0]
                    let punch = result[1]
                    this.personNumber=users.length
                    this.securityPersonInfo=[]
                    this.securityPersonlist = []

                    let personObj = {
                        label:'人员',
                        id:'100000',
                        children:[]
                    }
                    this.regionId = ['100000']
                    let childObj
                    if(users.length >0){
                        if(punch.length >0){
                            punch.forEach(punchObj=>{
                                users.forEach(userobj=>{
                                    if(punchObj.userId == userobj.id){
                                        userobj['isNormal'] = punchObj.status
                                    }
                                })
                            })
                        }

                        users.forEach(userObj=>{
                            if(userObj.id == '1665d640b49-c45d01a1a0e0910e'){
                                userObj.gpsData =  {
                                    "deviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                                    "ioTDeviceId": "1000000",
                                    "deviceName": "gps0",
                                    "createTime": "2018-09-21 10:15:56",
                                    "longitude": 120.13500857210744,
                                    "latitude": 30.307558496764344,
                                    "altitude": null,
                                    "direction": null,
                                    "speed": 0,
                                    "telephone": null,
                                    "deviceNum": "1000000",
                                    "coordinate": "",
                                    "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
                                }
                                userObj.gpsId = "c13e503f-713d-4cd7-9a5d-c62220e1f612"
                            }

                            let icon = ''
                            if(userObj.isNormal == "ABNORMAL"){
                                    icon = '../../../static/img/people_damage.svg'
                            }else{
                                if(userObj.gpsData){
                                    icon = '../../../static/img/people_open.svg'
                                }else{
                                    icon = '../../../static/img/people_gray.svg'
                                }
                            }

                            childObj = {
                                label:userObj.cnName,
                                id:userObj.id,
                                url:'/static/img/icon/people_small.svg',
                                type:'security',
                                subtype:'securityPerson',
                                regionId:'100000',
                                status:userObj.gpsData ? "ONLINE" : "OFFLINE",
//                                icon:userObj.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                                icon:icon,
                                longitude:userObj.gpsData ? userObj.gpsData.longitude : '',
                                latitude:userObj.gpsData ? userObj.gpsData.latitude : '',
                                gpsDeviceId:userObj.gpsId
                            }
                            this.securityPersonlist.push(childObj)
                            personObj.children.push(childObj)
                        })
                    }

                    this.securityPersonInfo.push(personObj)
                    if(this.securityPersonInfo.length >0){
                        this.securityPersonInfo.forEach(item=>{
                            item.label = item.label+'（'+item.children.length+'个）'
                        })
                    }
                    console.log(this.securityPersonInfo)
                })

                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/security')) {
                        this.initPersonData();//长轮询
                        this.treeShow('person');
                    }
                },10000)
            },
            async initScheduleData(){
//                 let schedules = [
//                     {
//                         "inspectionSchedule": {
//                             "id": "568a2df5-4f4f-4724-84e6-a6d050331db7",
//                             "creator": "admin",
//                             "createTime": "2018-10-31",
//                             "modifier": "admin",
//                             "modifyTime": "2018-10-31",
//                             "name": "测试计划",
//                             "days": "1,2,3,4,5,6,7",
//                             "startDate": null,
//                             "endDate": null,
//                             "shifts": "1,2,3",
//                             "customizedStartTime": null,
//                             "customizedEndTime": null,
//                             "description": "his的哦我按实际大街上了的加拉商家登录 ",
//                             "routeId": "d5918ac5-2e64-494d-b85e-87b2b959f035",
//                             "scenicAreaId": null,
//                             "enabled": true,
//                             "deleted": false,
//                             "customizedDays": false,
//                             "customizedShift": false
//                         },
//                         "iScheduleMaps": [
//                             {
//                                 "securityId": "1665d640b49-c45d01a1a0e0910e",
//                                 "gpsId": "cf2e849f-35a9-4e93-aee8-6a9a70b87ff3"
//                             }
//                         ],
//                         "routeName": "测试线路",
//                         "persons": [
//                             {
//                                 "id": "1665d640b49-c45d01a1a0e0910e",
//                                 "creator": "admin",
//                                 "createTime": "2018-10-10 17:52:09",
//                                 "modifier": "admin",
//                                 "modifyTime": "2018-10-23 14:11:16",
//                                 "name": "wang",
//                                 "cnName": "王司机",
//                                 "gender": 1,
//                                 "iconId": null,
//                                 "mobileNum": null,
//                                 "fixedPhoneNum": null,
//                                 "idCardNum": null,
//                                 "email": null,
//                                 "workAddress": null,
//                                 "description": null,
//                                 "departmentId": "1665d613663-ab3f7860a94b7eca",
//                                 "jobId": "1669a577d5b-6d3132a183fa2eee",
//                                 "roleId": "165d1e76037-f99c8ddf41f4dea3",
//                                 "gpsId": "cf2e849f-35a9-4e93-aee8-6a9a70b87ff3",
//                                 "gpsData": {
//                                             "deviceId": "cf2e849f-35a9-4e93-aee8-6a9a70b87ff3",
//                                             "ioTDeviceId": "1000000",
//                                             "deviceName": "gps0",
//                                             "createTime": "2018-09-21 10:15:56",
//                                             "longitude": 120.13492966687454,
//                                             "latitude": 30.308066310370048,
//                                             "altitude": null,
//                                             "direction": null,
//                                             "speed": 0,
//                                             "telephone": null,
//                                             "deviceNum": "1000000",
//                                             "coordinate": "",
//                                             "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
//                                 }
//                             }
//                         ],
//                         "status": "ONLINE",
//                         "stations": [
//                             {
//                                 "id": "4e37d3fc-aa83-40c8-8683-a054c8e86625",
//                                 "createTime": "2018-10-30 14:09:49",
//                                 "creator": "admin",
//                                 "modifyTime": "2018-10-30 14:09:49",
//                                 "modifier": "admin",
//                                 "name": "的卡點2",
//                                 "cardNumber": "79561",
//                                 "description": "白色的",
//                                 "scenicAreaId": null,
//                                 "regionId": "5de2b008-ce75-4d13-9e28-e7d42c380504",
//                                 "regionName": "大兜",
//                                 "longitude": 120.1347253445096,
//                                 "latitude": 30.30802703629303,
//                                 "epsg": 4326,
//                                 "deleted": false
//                             },
//                             {
//                                 "id": "ddd71221-9768-4912-a4ff-d1ae6f7bae00",
//                                 "createTime": "2018-10-30 11:42:39",
//                                 "creator": "admin",
//                                 "modifyTime": "2018-10-30 11:42:39",
//                                 "modifier": "admin",
//                                 "name": "打卡點為1",
//                                 "cardNumber": "4616+1",
//                                 "description": "的溝通",
//                                 "scenicAreaId": null,
//                                 "regionId": "a23c0a6e-e146-427e-b94a-ea79f4ab6316",
//                                 "regionName": "富义仓",
//                                 "longitude": 120.1328186661886,
//                                 "latitude": 30.307338435165367,
//                                 "epsg": 4326,
//                                 "deleted": false
//                             }
//                         ]
//                     }
//                 ]
//                 this.securitySchedulelist = schedules
//                 this.scheduleNumber=this.securitySchedulelist.length
//                 this.securityScheduleInfo=[]
//
//
//                 if(schedules.length >0){
//                     if(this.scheduleRoutes.length>0){
//                         schedules.forEach(scObj=>{
//                             this.scheduleRoutes.forEach(routeObj=>{
//                                 if(scObj.inspectionSchedule.routeId == routeObj.id){
//                                      scObj['routeObj'] = routeObj
//                                 }
//                             })
//                         })
//                     }
//                     schedules.forEach(obj=>{
//                         let scheduleObj = {
//                             label:obj.inspectionSchedule.name,
//                             id:obj.inspectionSchedule.id,
//                             children:[]
//                         }
//                         if(obj.persons && obj.persons.length > 0){
//                             obj.persons.forEach(user=>{
//                                 scheduleObj.children.push({
//                                     label:user.name,
//                                     id:user.id,
//                                     url:'/static/img/icon/people_small.png',
//                                     type:'security',
//                                     subtype:'securitySchedule',
//                                     status:user.gpsData ? "ONLINE" : "OFFLINE",
//                                     icon:user.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
//                                     longitude:user.gpsData ? user.gpsData.longitude : '',
//                                     latitude:user.gpsData ? user.gpsData.latitude : '',
//                                     gpsDeviceId:user.gpsId?user.gpsId:'',
//                                     routeObj:obj.routeObj,
//                                     stations:obj.stations
//                                 })
//                             })
//                         }
//                         this.securityScheduleInfo.push(scheduleObj)
//                     })
//                 }
//
//
//                 console.log(this.securityScheduleInfo,'securityScheduleInfo')

                Promise.all([this.getAllSchedule()]).then(result=>{
                    console.log(result,'00000')
                    let schedules = result[0]
                    if(schedules.length >0){
                        schedules = schedules.filter(item=>{
                            return item.inspectionSchedule.enabled
                        })
                    }
                    this.scheduleNumber=schedules.length
                    this.securityScheduleInfo=[]
                    this.securitySchedulelist=[]
                    this.regionId = []
                    if(schedules.length >0){
                        if(this.scheduleRoutes.length>0){
                            schedules.forEach(scObj=>{
                                this.scheduleRoutes.forEach(routeObj=>{
                                    if(scObj.inspectionSchedule.routeId == routeObj.id){
                                        scObj['routeObj'] = routeObj
                                    }
                                })
                            })
                        }
                        schedules.forEach(obj=>{
                            let scheduleObj = {
                                label:obj.inspectionSchedule.name,
                                id:obj.inspectionSchedule.id,
                                state:obj.status,
                                children:[]
                            }
                            this.regionId.push(obj.inspectionSchedule.id)
                            let childInfo = {}
                            if(obj.persons instanceof Array && obj.persons.length > 0){
                                obj.persons.forEach(user=>{

                                    if(user.id == '1665d640b49-c45d01a1a0e0910e'){
                                        user.gpsData =  {
                                            "deviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                                            "ioTDeviceId": "1000000",
                                            "deviceName": "gps0",
                                            "createTime": "2018-09-21 10:15:56",
                                            "longitude": 120.13500857210744,
                                            "latitude": 30.307558496764344,
                                            "altitude": null,
                                            "direction": null,
                                            "speed": 0,
                                            "telephone": null,
                                            "deviceNum": "1000000",
                                            "coordinate": "",
                                            "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
                                        }
                                        user.gpsId = "c13e503f-713d-4cd7-9a5d-c62220e1f612"
                                    }


                                    childInfo = {
                                        label:user.cnName,
                                        id:user.id,
                                        url:'/static/img/icon/people_small.svg',
                                        type:'security',
                                        subtype:'securitySchedule',
                                        regionId:obj.inspectionSchedule.id,
                                        status:user.gpsData ? "ONLINE" : "OFFLINE",
                                        icon:user.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                                        longitude:user.gpsData ? user.gpsData.longitude : '',
                                        latitude:user.gpsData ? user.gpsData.latitude : '',
                                        gpsDeviceId:user.gpsId?user.gpsId:'',
                                        stations:obj.stations,
                                        routeObj:obj.routeObj
                                    }
                                    scheduleObj.children.push(childInfo)
                                    this.securitySchedulelist.push(childInfo)
                                })
                            }
                            this.securityScheduleInfo.push(scheduleObj)
                        })
                    }

                    if(this.securityScheduleInfo.length >0){
                        this.securityScheduleInfo.forEach(item=>{
                            item.label = item.label+'（'+item.children.length+'个）'
                        })
                    }
                    this.securityScheduleInfo.sort(this.compare("state"))
                    console.log(this.securityScheduleInfo)
                })

                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/security')) {
                        this.initScheduleData();//长轮询
                        this.treeShow('schedule');
                    }
                },10000)
            },
            compare(prop){
                return function(x,y){
                    let valx = x[prop];
                    let valy = y[prop];
                    if(valx == 'ONLINE' && valy == "OFFLINE"){
                        return -1;
                    }else if(valx == 'OFFLINE' && valy == "ONLINE"){
                        return 1;
                    }else{
                        return 0;
                    }
                }
            },
            async getAllUser(){
                return await api.user.getUserGPSInfo()
            },
            async getAllPunchRecord(param){
                return await api.punch.getAllPunchRecord(JSON.stringify(param))
            },
            async getAllSchedule(){
                return api.patrol.getAllPatrol()
            },
            async getScheduleRoute(){
                await api.roat.getTransportRoat(1).then(res=>{
                    console.log(res,'巡检路线')
                    this.scheduleRoutes = res
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        watch:{

        },
        created: function () {
            this.activePerson = 'isActive'
            this.positionClass = 'personBar'
            this.activeSchedule=''
            this.treeShow('person');
            this.getScheduleRoute()
        },
        mounted() {
            this.initPersonData();
        },
        computed: {
            ...mapGetters(['getcontrolSecurityPerson','getcontrolSecuritySchedule'])
        }
    }
</script>

<style lang="scss" scoped>
    .security {
        width: 100%;
        height: 100%;
        .reveal {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .top {
                /*width: 100%;*/
                min-width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                background: #fff;

                transition: transform .3s,-webkit-transform .3s;
                float: left;
                z-index: 2;
                white-space: nowrap;
                position: relative;
                .stretch{
                    flex: 1;
                    text-align: center;
                }
                .item{
                    padding: 0 20px;
                    height: 40px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    line-height: 40px;
                    display: inline-block;
                    list-style: none;
                    font-size: 14px;
                    font-weight: 500;
                    color: #303133;
                    position: relative;
                }
                .item:hover {
                    color: #409EFF;
                    cursor: pointer;
                }
                .item.is-active {
                    color: #409EFF;
                }
                .bar{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    background-color: #409EFF;
                    z-index: 1;
                    -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
                    transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
                    transition: transform .3s cubic-bezier(.645,.045,.355,1);
                    transition: transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
                    transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
                    list-style: none;
                }
                .personBar{
                    width: 105px;
                    transform: translateX(0px);
                }
                .scheduleBar{
                    width: 105px;
                    transform: translateX(145px);
                }
                .isActive{
                    color: #409EFF;
                }
            }
            .list_search{
                background: #f2f2f2;
                padding: rem(10);
                input {
                    width: 100%;
                    text-indent: 10px;
                    font-size: 10px;
                    color: #646464;
                    height: 22px;
                    border: 1px solid #52c4f2;
                    outline: none;
                }
            }

            .middle {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .manage {
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    border-top: 1px solid #f2f2f2;
                    .check {
                        margin-left: 10px;
                    }
                    .el-checkbox:last-child {
                        color: #f36a5a;
                    }
                }
                .boottom {
                    width: 100%;
                    flex: 1;
                    overflow-y: auto;
                    ::-webkit-scrollbar {
                        width: rem(6);
                    }
                    ::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0);
                    }
                    &:hover{
                        .scroll-container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            overflow: hidden;
                            .scroll-inner {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                overflow: auto;
                                padding-bottom: rem(20);
                                // &::-webkit-scrollbar {
                                // }
                            }
                        }
                        ::-webkit-scrollbar {
                            width: rem(6);
                        }
                        ::-webkit-scrollbar-thumb {
                            position: absolute;
                            right: rem(-10);
                            background: rgba(0, 0, 0, .5);
                            border-radius: rem(6);
                        }
                    }

                }
            }
            .last {
                width: 100%;
                height: 210px;
                overflow: hidden;
                h5 {
                    line-height: 40px;
                    margin-left: 15px;
                }
                h5 + div {
                    width: 100%;
                    height: 170px;
                    background: #fff;
                }
                .broadCard {
                    width: 500px;
                    height: 350px;
                    position: fixed;
                    left: 20%;
                    top: 30%;
                }
            }
            #pie {
                width: 80%;
                height: 95%;
                margin: 0 auto;
                padding-top: 5%;
            }
        }
    }
</style>
