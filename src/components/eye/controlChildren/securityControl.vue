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
                                    :number="number"
                                    :fault="fault">
                                </broadcast-ztree>
                            </ScrollContainer>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="巡检计划调度" name="securitySchedule">
                    <div class="middle">
                        <div class="boottom">
                            <ScrollContainer>
                                <broadcast-ztree
                                    :title="title"
                                    :Info="securityPersonInfo"
                                    :lightCheckout="transportCheckout"
                                    :regionId="regionId"
                                    :lightList="securityPersonlist"
                                    :number="number"
                                    :fault="fault">
                                </broadcast-ztree>
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
            ScrollContainer
        },
        methods: {
            tabClick(tab,event){
               console.log(tab,event)
                if(tab.name == 'securitySchedule'){
                   // this.initsecuritySchedule()
                    this.title = '巡检计划'
                }else if(tab.name == 'securityPerson'){
                   this.initPersonData()
                    this.title = '人员'
                }
            },
            treeShow(){
                console.log(this.getcontroTransport,'1');
                if(this.getcontroTransport){
                    this.transportCheckout=this.getcontroTransport
                }
            },
            showBroadCard() {
                console.log(777)
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
                Promise.all([this.getAllUser()]).then(result=>{
                    console.log(result,'00000')
                    // let users = result[0]
                    let users =  [
                        {
                            "vehicle": {
                                "id": "05579c25-8abb-4bfa-83ae-2a1e50a071ee",
                                "createTime": null,
                                "creator": null,
                                "modifyTime": "2018-09-11 17:32:51",
                                "modifier": "admin",
                                "serialNum": "船001",
                                "capacity": 33,
                                "type": 1,
                                "model": "363",
                                "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                "pictureId": null,
                                "maintenanceStatus": 0,
                                "maintenanceDate": "2018-08-07",
                                "purchaseDate": "2010-03-23",
                                "description": "反感和的",
                                "scenicAreaId": null,
                                "deleted": false
                            },
                            "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                            "gpsDeviceName": "gps1",
                            "pictureId": null,
                            "picturePath": null,
                            "gpsData":
                            //null,
                                {
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
                                },
                            "driver": {
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
                                "roleId": "1"
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
                                label:userObj.vehicle.serialNum,
                                id:userObj.vehicle.id,
                                url:'/static/img/icon/people_small.png',
                                type:'security',
                                subtype:'securityPerson',
                                icon:userObj.gpsData ? '../../../static/img/people_open.svg' : '../../../static/img/people_gray.svg' ,
                                longitude:userObj.gpsData ? userObj.gpsData.longitude : '',
                                latitude:userObj.gpsData ? userObj.gpsData.latitude : '',
                                gpsDeviceId:userObj.gpsDeviceId
                            })
                        })
                    }

                    this.securityPersonInfo.push(personObj)
                    this.fault=0
                    this.online= this.number - this.fault
                    console.log(this.securityPersonInfo)
                })
                // setTimeout(() => {
                //     let route = this.$route.path
                //     if (route.includes('controler/security')) {
                //         this.initPersonData();//长轮询
                //         this.treeShow();
                //     }
                // },5000)
            },
            // async initScheduleData(){
            //     Promise.all([this.getAllVehicle()]).then(result=>{
            //         let vehicles = result[0]
            //         // let vehicles = [
            //         //     {
            //         //         "vehicle": {
            //         //             "id": "30c87807-a8cc-45e2-b6fe-8e9e7a29c790",
            //         //             "createTime": null,
            //         //             "creator": null,
            //         //             "modifyTime": "2018-08-30 16:04:37",
            //         //             "modifier": "anonymous",
            //         //             "serialNum": "湘湖605",
            //         //             "capacity": 0,
            //         //             "type": 1,
            //         //             "model": "001144",
            //         //             "gpsDeviceId": "b0849754-7b4d-428b-b4de-d96f28eb7eb9",
            //         //             "pictureId": null,
            //         //             "maintenanceStatus": 0,
            //         //             "maintenanceDate": null,
            //         //             "purchaseDate": null,
            //         //             "description": null,
            //         //             "scenicAreaId": null,
            //         //             "deleted": false
            //         //         },
            //         //         "gpsDeviceId": "b0849754-7b4d-428b-b4de-d96f28eb7eb9",
            //         //         "gpsDeviceName": "船605",
            //         //         "pictureId": null,
            //         //         "picturePath": null,
            //         //         "gpsData":
            //         //             // null,
            //         //             {
            //         //             "deviceId": "b0849754-7b4d-428b-b4de-d96f28eb7eb9",
            //         //             "ioTDeviceId": null,
            //         //             "createTime": "2017-12-31 12:21:39",
            //         //             "longitude": 120.21455,
            //         //             "latitude": 30.1379,
            //         //             "altitude": null,
            //         //             "direction": null,
            //         //             "speed": 4,
            //         //             "telephone": null,
            //         //             "deviceNum": null,
            //         //             "coordinate": null
            //         //         },
            //         //         "driver": {
            //         //             "id": "5b27d86e-af2e-4de9-8d99-3f6b0f2e0f27",
            //         //             "createTime": "2018-08-31 11:41:32",
            //         //             "creator": "anonymous",
            //         //             "modifyTime": "2018-08-31 11:41:32",
            //         //             "modifier": "anonymous",
            //         //             "name": "test李四",
            //         //             "gender": 1,
            //         //             "idNum": null,
            //         //             "phone": "18602987796",
            //         //             "pictureId": null,
            //         //             "description": "just a test",
            //         //             "scenicAreaId": null,
            //         //             "deleted": false
            //         //         }
            //         //     }
            //         // ]
            //         this.carlist = vehicles
            //         this.number=this.carlist.length
            //         this.transportInfo=[]
            //         let carObj = {
            //             label:'车辆',
            //             id:100010,
            //             children:[]
            //         }
            //         let boatObj = {
            //             label:'船只',
            //             id:100011,
            //             children:[]
            //         }
            //         vehicles.forEach(veObj=>{
            //             let childObj;
            //             if(veObj.vehicle.type == 0){
            //                 childObj = {
            //                     label:veObj.vehicle.serialNum,
            //                     id:veObj.vehicle.id,
            //                     url:'/static/img/icon/bus_small.png',
            //                     type:'transport',
            //                     subtype:'car',
            //                     icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
            //                     status:veObj.gpsData ? "ONLINE" : "OFFLINE",
            //                     longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
            //                     latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
            //                     gpsDeviceId:veObj.gpsDeviceId
            //                 }
            //                 carObj.children.push(childObj)
            //             }else if(veObj.vehicle.type == 1){
            //                 // let arr = ['../../../static/img/boat_icon.svg','../../../static/img/boat_gray.svg'];
            //                 // let icon = arr[Math.floor(Math.random()*arr.length)];
            //                 childObj = {
            //                     label:veObj.vehicle.serialNum,
            //                     id:veObj.vehicle.id,
            //                     url:'/static/img/icon/boat_small.png',
            //                     type:'transport',
            //                     subtype:'boat',
            //                     // icon:icon,
            //                     icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
            //                     status:veObj.gpsData ? "ONLINE" : "OFFLINE",
            //                     longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
            //                     latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
            //                     gpsDeviceId:veObj.gpsDeviceId
            //                 }
            //                 boatObj.children.push(childObj)
            //             }
            //         })
            //         this.transportInfo.push(carObj)
            //         this.transportInfo.push(boatObj)
            //         this.fault=0
            //         this.online= this.number - this.fault
            //         // this.drawLine();
            //         console.log(this.transportInfo)
            //     })
            //     setTimeout(() => {
            //         let route = this.$route.path
            //         if (route.includes('controler/car')) {
            //             this.initData();//长轮询
            //             this.treeShow();
            //         }
            //     },5000)
            // },

            async getAllUser(){
                return await api.user.getUserGPSInfo()
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
