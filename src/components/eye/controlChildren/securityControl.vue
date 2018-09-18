<template>
    <div class="security">
        <div class="reveal">
            <el-tabs v-model="activeName" @tab-click="tabClick" stretch>
                <el-tab-pane label="人员调度" name="securityPerson">

                    <div class="middle">
                        <div class="boottom">
                            <ScrollContainer>
                                <broadcast-ztree
                                    :title="title"
                                    :Info="securityPersonInfo"
                                    :lightCheckout="transportCheckout"
                                    :regionId="regionId"
                                    :lightList="securityPersonlist"
                                    :number="number">
                                </broadcast-ztree>
                            </ScrollContainer>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="巡检计划调度" name="securitySchedule">
                    <div class="middle">
                        <div class="boottom">
                            <ScrollContainer>
                                <schedule-ztree
                                    :title="title"
                                    :Info="securityScheduleInfo"
                                    :lightCheckout="transportCheckout"
                                    :regionId="regionId"
                                    :lightList="securitySchedulelist"
                                    :number="number">
                                </schedule-ztree>
                            </ScrollContainer>
                        </div>
                    </div>

                </el-tab-pane>
            </el-tabs>
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
                open:false,
                isShow: true,
                options: [],
                boatObjs:[],
                value: '',
                number: '0',
                fault: '0',
                optionMisic: [],
                isShowBroadCard: false,
                securityPersonInfo:[],
                securityScheduleInfo:[],
                securityPersonlist:[],
                securitySchedulelist:[],
                transportCheckout:[],
                regionId:[],
                selectAll:[],
                title:'人员',
                online: '0',
                faultlist:[],
                drivers:[],
                crew:[],
                activeName:'securityPerson'
            }
        },
        components: {
            broadcastZtree,
            scheduleZtree,
            ScrollContainer
        },
        methods: {
            tabClick(tab,event){
                console.log(tab,event)
                if(tab.name == 'securitySchedule'){
                    this.title = '巡检计划'
                    this.initScheduleData()
                }else if(tab.name == 'securityPerson'){
                    this.title = '人员'
                    this.initPersonData()
                }
            },
            treeShow(){
                console.log(this.getcontroTransport,'1');
                if(this.getcontroTransport){
                    this.transportCheckout=this.getcontroTransport
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

                let users =
                    [
                        {
                            "id": "1",
                            "creator": null,
                            "createTime": null,
                            "modifier": "admin",
                            "modifyTime": "2018-09-11 18:00:00",
                            "name": "admin",
                            "cnName": " 系统管理员",
                            "gender": 0,
                            "iconId": null,
                            "mobileNum": "18800000000",
                            "fixedPhoneNum": null,
                            "idCardNum": null,
                            "email": null,
                            "workAddress": null,
                            "description": null,
                            "departmentId": null,
                            "jobId": null,
                            "roleId": "1",
                            "role": {
                                "id": "1",
                                "creator": null,
                                "createTime": null,
                                "modifier": null,
                                "modifyTime": null,
                                "name": "admin",
                                "description": "",
                                "permissions": null
                            },
                            "job": null,
                            "department": null,
                            "gpsId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                            "gpsData":  {
                                "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                "ioTDeviceId": null,
                                "createTime": "2017-12-31 12:21:39",
                                "longitude": 120.13310087077178,
                                "latitude": 30.30729423238902,
                                "altitude": null,
                                "direction": null,
                                "speed": 4,
                                "telephone": null,
                                "deviceNum": null,
                                "coordinate": null
                            }
                        }
                    ]

                this.securityPersonList = users
                this.number=this.securityPersonList.length
                this.securityPersonInfo=[]

                let personObj = {
                    label:'人员',
                    id:100010,
                    children:[]
                }
                if(users.length >0){
                    users.forEach(userObj=>{
                        personObj.children.push({
                            label:userObj.name,
                            id:userObj.id,
                            url:'/static/img/icon/people_small.png',
                            type:'security',
                            subtype:'securityPerson',
                            status:userObj.gpsData ? "ONLINE" : "OFFLINE",
                            icon:userObj.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                            longitude:userObj.gpsData ? userObj.gpsData.longitude : '',
                            latitude:userObj.gpsData ? userObj.gpsData.latitude : '',
                            gpsDeviceId:userObj.gpsId
                        })
                    })
                }

                this.securityPersonInfo.push(personObj)
                this.fault=0
                this.online= this.number - this.fault
                console.log(this.securityPersonInfo)

                // Promise.all([this.getAllUser()]).then(result=>{
                //     console.log(result,'00000')
                //     let users = result[0]
                //
                //     this.securityPersonList = users
                //     this.number=this.securityPersonList.length
                //     this.securityPersonInfo=[]
                //
                //     let personObj = {
                //         label:'人员',
                //         id:100010,
                //         children:[]
                //     }
                //     if(users.length >0){
                //         users.forEach(userObj=>{
                //             personObj.children.push({
                //                 label:userObj.name,
                //                 id:userObj.id,
                //                 url:'/static/img/icon/people_small.png',
                //                 type:'security',
                //                 subtype:'securityPerson',
                //                 status:userObj.gpsData ? "ONLINE" : "OFFLINE",
                //                 icon:userObj.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                //                 longitude:userObj.gpsData ? userObj.gpsData.longitude : '',
                //                 latitude:userObj.gpsData ? userObj.gpsData.latitude : '',
                //                 gpsDeviceId:userObj.gpsId
                //             })
                //         })
                //     }
                //
                //     this.securityPersonInfo.push(personObj)
                //     console.log(this.securityPersonInfo)
                // })

                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/security')) {
                        this.initPersonData();//长轮询
                        this.treeShow();
                    }
                },5000)
            },
            async initScheduleData(){
                Promise.all([this.getAllSchedule()]).then(result=>{
                    console.log(result,'00000')
                    // let schedules = result[0]
                    let schedules = [
                        {
                            "inspectionSchedule": {
                                "id": "c426fd5c-31b5-49d4-be34-1e916b0546f3",
                                "creator": "admin",
                                "createTime": "2018-09-11",
                                "modifier": "admin",
                                "modifyTime": "2018-09-13",
                                "name": "巡检1",
                                "days": "1",
                                "startDate": null,
                                "endDate": null,
                                "shifts": "1",
                                "customizedStartTime": null,
                                "customizedEndTime": null,
                                "description": "看看",
                                "routeId": "de53ac21-3e2b-48a3-9dfd-4e18a322c4b5",
                                "scenicAreaId": null,
                                "enabled": true,
                                "deleted": false,
                                "customizedDays": false,
                                "customizedShift": false
                            },
                            "iScheduleMaps": [
                                {
                                    "securityId": "1",
                                    "gpsId": "21a435fd-f067-4cb5-841e-0482bbe1c230"
                                }
                            ],
                            "routeName": "巡检路线11",
                            "persons": [
                                {
                                    "id": "1",
                                    "creator": null,
                                    "createTime": null,
                                    "modifier": "admin",
                                    "modifyTime": "2018-09-11 18:00:00",
                                    "name": "admin",
                                    "cnName": " 系统管理员",
                                    "gender": 0,
                                    "iconId": null,
                                    "mobileNum": "18800000000",
                                    "fixedPhoneNum": null,
                                    "idCardNum": null,
                                    "email": null,
                                    "workAddress": null,
                                    "description": null,
                                    "departmentId": null,
                                    "jobId": null,
                                    "roleId": "1",
                                    "gpsId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                    "gpsData":  {
                                        "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                        "ioTDeviceId": null,
                                        "createTime": "2017-12-31 12:21:39",
                                        "longitude": 120.13310087077178,
                                        "latitude": 30.30729423238902,
                                        "altitude": null,
                                        "direction": null,
                                        "speed": 4,
                                        "telephone": null,
                                        "deviceNum": null,
                                        "coordinate": null
                                    }
                                }
                            ]
                        }
                    ]
                    this.securitySchedulelist = schedules
                    this.number=this.securitySchedulelist.length
                    this.securityScheduleInfo=[]


                    if(schedules.length >0){
                        schedules.forEach(obj=>{

                            let scheduleObj = {
                                label:obj.inspectionSchedule.name,
                                id:obj.inspectionSchedule.id,
                                children:[]
                            }
                            if(obj.persons && obj.persons.length > 0){
                                obj.persons.forEach(user=>{
                                    scheduleObj.children.push({
                                        label:user.name,
                                        id:user.id,
                                        url:'/static/img/icon/people_small.png',
                                        type:'security',
                                        subtype:'securitySchedule',
                                        status:user.gpsData ? "ONLINE" : "OFFLINE",
                                        icon:user.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                                        longitude:user.gpsData ? user.gpsData.longitude : '',
                                        latitude:user.gpsData ? user.gpsData.latitude : '',
                                        gpsDeviceId:user.gpsId?user.gpsId:''
                                    })
                                })
                            }
                            this.securityScheduleInfo.push(scheduleObj)
                        })
                    }


                    console.log(this.securityScheduleInfo)
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/security')) {
                        this.initScheduleData();//长轮询
                        this.treeShow();
                    }
                },5000)
            },

            async getAllUser(){
                return await api.user.getUserGPSInfo()
            },
            async getAllSchedule(){
                return api.patrol.getAllPatrol()
            }
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {

            this.initPersonData();
        },
        computed: {
            ...mapGetters(['getcontroTransport'])
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
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                background: #fff;
                h5 {
                    margin-left: 15px;
                }
                ul {
                    display: flex;
                    li {
                        margin: 0 5px;
                        .multiwindow{
                            width: 24px;
                            vertical-align: middle;
                            cursor: pointer;
                            outline: none;
                        }
                    }
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
