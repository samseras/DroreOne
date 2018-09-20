<template>
    <div class="car">
        <div class="reveal">
            <el-tabs v-model="activeName" @tab-click="tabClick" stretch>
                <el-tab-pane label="车船调度" name="transportVehicle">

                    <div class="middle">
                        <div class="boottom">
                            <ScrollContainer>
                                <broadcast-ztree
                                    :title="title"
                                    :Info="transportVehicleInfo"
                                    :lightCheckout="vehicleCheckout"
                                    :regionId="regionId"
                                    :lightList="transportVehicleList"
                                    :number="number"
                                    :fault="fault">
                                </broadcast-ztree>
                            </ScrollContainer>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="车船计划调度" name="transportSchedule">
                    <div class="middle">
                        <div class="boottom">
                            <ScrollContainer>
                                <schedule-ztree
                                    :title="title"
                                    :Info="transportScheduleInfo"
                                    :lightCheckout="scheduleCheckout"
                                    :regionId="regionId"
                                    :lightList="transportScheduleList"
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
        name:'car',
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
                transportVehicleInfo: [],
                transportScheduleInfo: [],
                transportVehicleList:[],
                transportScheduleList:[],
                regionId:[],
                transportList:[],
                selectAll:[],
                title:'车船',
                online: '0',
                faultlist:[],
                drivers:[],
                crew:[],
                vehicleCheckout:[],
                scheduleCheckout:[],
                activeName:'transportVehicle',
                transportRoutes:[]

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
                if(tab.name == 'transportVehicle'){
                    this.title = '车船'
                    this.initVehicle()
                    this.treeShow('vehicle')
                }else if(tab.name == 'transportSchedule'){
                    this.title = '车船计划'
                    this.initSchedule()
                    this.treeShow('schedule')
                }
            },
            treeShow(type){
                console.log(this.getcontroTransportVehicle,'1');
                console.log(this.getcontroTransportSchedule,'2');
                if(type == 'vehicle'){
                    if(this.getcontroTransportVehicle){
                        this.vehicleCheckout=this.getcontroTransportVehicle
                    }
                }else if(type == 'schedule'){
                    if(this.getcontroTransportSchedule){
                        this.scheduleCheckout=this.getcontroTransportSchedule
                    }
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
            async initVehicle(){
                Promise.all([this.getAllVehicle()]).then(result=>{
                    let vehicles = result[0]
                    // let vehicles =  [
                    //     {
                    //         "vehicle": {
                    //             "id": "05579c25-8abb-4bfa-83ae-2a1e50a071ee",
                    //             "createTime": null,
                    //             "creator": null,
                    //             "modifyTime": "2018-09-11 17:32:51",
                    //             "modifier": "admin",
                    //             "serialNum": "船001",
                    //             "capacity": 33,
                    //             "type": 1,
                    //             "model": "363",
                    //             "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                    //             "pictureId": null,
                    //             "maintenanceStatus": 0,
                    //             "maintenanceDate": "2018-08-07",
                    //             "purchaseDate": "2010-03-23",
                    //             "description": "反感和的",
                    //             "scenicAreaId": null,
                    //             "deleted": false
                    //         },
                    //         "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                    //         "gpsDeviceName": "gps1",
                    //         "pictureId": null,
                    //         "picturePath": null,
                    //         "gpsData":
                    //             //null,
                    //             {
                    //             "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                    //             "ioTDeviceId": null,
                    //             "createTime": "2017-12-31 12:21:39",
                    //             "longitude": 120.13310087077178,
                    //             "latitude": 30.30729423238902,
                    //             "altitude": null,
                    //             "direction": null,
                    //             "speed": 4,
                    //             "telephone": null,
                    //             "deviceNum": null,
                    //             "coordinate": null
                    //         },
                    //         "driver": {
                    //             "id": "1",
                    //             "creator": null,
                    //             "createTime": null,
                    //             "modifier": "admin",
                    //             "modifyTime": "2018-09-11 18:00:00",
                    //             "name": "admin",
                    //             "cnName": " 系统管理员",
                    //             "gender": 0,
                    //             "iconId": null,
                    //             "mobileNum": "18800000000",
                    //             "fixedPhoneNum": null,
                    //             "idCardNum": null,
                    //             "email": null,
                    //             "workAddress": null,
                    //             "description": null,
                    //             "departmentId": null,
                    //             "jobId": null,
                    //             "roleId": "1"
                    //         }
                    //     }
                    //     ]
                    this.transportVehicleList = vehicles
                    this.number=this.transportVehicleList.length
                    this.transportVehicleInfo=[]
                    let carObj = {
                        label:'车辆',
                        id:100010,
                        children:[]
                    }
                    let boatObj = {
                        label:'船只',
                        id:100011,
                        children:[]
                    }
                    vehicles.forEach(veObj=>{
                        let childObj;
                        if(veObj.vehicle.type == 0){
                            childObj = {
                                label:veObj.vehicle.serialNum,
                                id:veObj.vehicle.id,
                                url:'/static/img/icon/bus_small.png',
                                type:'transport',
                                subtype:'transportCar',
                                icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude+0.49693734262853-0.0025647127: '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            carObj.children.push(childObj)
                        }else if(veObj.vehicle.type == 1){
                            // let arr = ['../../../static/img/boat_icon.svg','../../../static/img/boat_gray.svg'];
                            // let icon = arr[Math.floor(Math.random()*arr.length)];
                            childObj = {
                                label:veObj.vehicle.serialNum,
                                id:veObj.vehicle.id,
                                url:'/static/img/icon/boat_small.png',
                                type:'transport',
                                subtype:'transportBoat',
                                icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude +0.49693734262853-0.0025647127: '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            boatObj.children.push(childObj)
                        }
                    })
                    this.transportVehicleInfo.push(carObj)
                    this.transportVehicleInfo.push(boatObj)
                    this.fault=0
                    this.online= this.number - this.fault
                    // this.drawLine();
                    console.log(this.transportVehicleInfo)
                })
                // setTimeout(() => {
                //     let route = this.$route.path
                //     if (route.includes('controler/car')) {
                //         this.initVehicle();//长轮询
                //         this.treeShow('vehicle');
                //     }
                // },5000)
            },
            async initSchedule(){
                Promise.all([this.getAllTransport()]).then(result=>{
                    // let schedules = result[0]

                    let schedules = [
                            {
                                "id": "0a9c3e8a-99c7-4c5f-90c4-54128115fd40",
                                "creator": "admin",
                                "createTime": "2018-09-12",
                                "modifier": "admin",
                                "modifyTime": "2018-09-12",
                                "name": "船001",
                                "days": "1,2,3,4,5,6,7",
                                "startDate": null,
                                "endDate": null,
                                "startTime": "00:20:39",
                                "endTime": "23:59:40",
                                "routeId": "0e2d936d-b75a-4bc1-8309-84b2b21dfe3f",
                                "description": "三十",
                                "scenicAreaId": null,
                                "type": "1",
                                "svDriverMaps": [
                                    {
                                        "vehicleId": "ceb54f57-08d4-49a0-81db-a3e7c486b154",
                                        "driverIds": [
                                            "1"
                                        ]
                                    }
                                ],
                                "stations": [],
                                "status": "ONLINE",
                                "enabled": true,
                                "customizedDays": false,
                                "deleted": false,
                                "vehicles":[
                                    {
                                     "id":"ceb54f57-08d4-49a0-81db-a3e7c486b154",
                                     "createTime": "2018-09-12 11:08:50",
                                     "creator": "admin",
                                     "modifyTime": "2018-09-12 11:08:50",
                                     "modifier": "admin",
                                     "serialNum": "船test1",
                                     "capacity": 36,
                                     "type": 1,
                                     "model": null,
                                     "pictureId": null,
                                     "maintenanceStatus": 0,
                                     "maintenanceDate": null,
                                     "purchaseDate": null,
                                     "description": null,
                                     "scenicAreaId": null,
                                     "deleted": false,
                                     "gpsDeviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                                     "gpsData": {
                                        "deviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                                        "ioTDeviceId": "1000000",
                                        "deviceName": "\ufffd\ufffd\ufffd\ufffd",
                                        "createTime": "2018-09-19 14:09:22",
                                        "longitude": 119.680681,
                                        "latitude": 29.810524,
                                        "altitude": null,
                                        "direction": null,
                                        "speed": 0,
                                        "telephone": null,
                                        "deviceNum": "1000000",
                                        "coordinate": "",
                                        "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
                                     },
                                    }
                                ]
                            }
                        ]

                    console.log(JSON.stringify(schedules))
                    this.transportScheduleList = schedules
                    this.number=this.transportScheduleList.length
                    this.transportScheduleInfo=[]
                    if(schedules.length >0){
                        if(this.transportRoutes.length>0){
                            schedules.forEach(scObj=>{
                                this.transportRoutes.forEach(routeObj=>{
                                    if(scObj.routeId == routeObj.id){
                                        scObj['routeObj'] = routeObj
                                    }
                                })
                            })
                        }

                        schedules.forEach(obj=>{
                            let scheduleObj = {
                                label:obj.name,
                                id:obj.id,
                                children:[]
                            }

                            if(obj.vehicles.length >0){
                                obj.vehicles.forEach(veObj=>{
                                    let childObj;
                                    if(obj.type == 0){
                                        childObj = {
                                            label:veObj.serialNum,
                                            id:veObj.id,
                                            url:'/static/img/icon/bus_small.png',
                                            type:'transport',
                                            subtype:'transportSchedule',
                                            icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
                                            status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                            longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                            latitude:veObj.gpsData ? veObj.gpsData.latitude+0.49693734262853-0.0025647127: '',
                                            gpsDeviceId:veObj.gpsDeviceId,
                                            routeObj:obj.routeObj
                                        }
                                    }else if(obj.type == 1){
                                        childObj = {
                                            label:veObj.serialNum,
                                            id:veObj.id,
                                            url:'/static/img/icon/boat_small.png',
                                            type:'transport',
                                            subtype:'transportSchedule',
                                            icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
                                            status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                            longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                            latitude:veObj.gpsData ? veObj.gpsData.latitude +0.49693734262853-0.0025647127: '',
                                            gpsDeviceId:veObj.gpsDeviceId,
                                            routeObj:obj.routeObj
                                        }
                                    }
                                    scheduleObj.children.push(childObj)
                                })
                            }
                            this.transportScheduleInfo.push(scheduleObj)
                        })
                    }

                    // this.fault=0
                    // this.online= this.number - this.fault
                    // this.drawLine();
                    console.log(this.transportScheduleInfo)
                })
                // setTimeout(() => {
                //     let route = this.$route.path
                //     if (route.includes('controler/car')) {
                //         this.initSchedule();//长轮询
                //         this.treeShow('schedule');
                //     }
                // },5000)
            },
            async getAllTransport(){
                return api.transport.getTransport()
            },
            async getAllVehicle(){
                return await api.boat.getAllVehicleGps()
            },
            async getAllDriver(id){
                return await api.person.getJobPerson(id)
            },
            cmsocxDown(){
                window.open('http://112.17.128.126:89/download/OCX.exe');
            },
            async getAllTransportRoute(){
                Promise.all([this.getTransportRouteCar(),this.getTransportRouteBoat()]).then(result=>{
                   this.transportRoutes = result[0].concat(result[1])
                }).catch(err=>{
                    console.log(err)
                })
            },
            async getTransportRouteCar(){
                return await api.roat.getTransportRoat(2)
            },
            async getTransportRouteBoat(){
                return await api.roat.getTransportRoat(3)
            },
        },
        watch:{

        },
        created: function () {
            this.treeShow('vehicle');
            this.getAllTransportRoute()
        },
        mounted() {

            this.initVehicle();
        },
        computed: {
            ...mapGetters(['getcontroTransportVehicle','getcontroTransportSchedule'])
        }
    }
</script>

<style lang="scss" scoped>
    .car {
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
