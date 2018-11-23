<template>
    <div class="car">
        <div class="reveal">
            <div class="top">
                <div :class="[activeVehicle, stretchClass,itemClass]" @click="tabClick('vehicle')">
                    车船调度
                </div>
                <div :class="[activeSchedule, stretchClass,itemClass]" @click="tabClick('schedule')">
                    车船计划调度
                </div>
                <div :class="[barClass,stretchClass,positionClass]"></div>
            </div>
            <div class="middle" v-show="isVehicle">
                <div class="boottom">
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="transportVehicleInfo"
                            :lightCheckout="vehicleCheckout"
                            :regionId="regionId"
                            :lightList="transportVehicleList"
                            :number="vehicleNumber">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>

            <div class="middle"  v-show="!isVehicle">
                <div class="boottom">
                    <ScrollContainer>
                        <schedule-ztree
                            :title="title"
                            :Info="transportScheduleInfo"
                            :lightCheckout="scheduleCheckout"
                            :regionId="regionId"
                            :lightList="transportScheduleList"
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
        name:'car',
        data() {
            return {
                positionClass:'',
                activeVehicle:'',
                activeSchedule:'',
                stretchClass:'stretch',
                barClass:'bar',
                itemClass:'item',
                isVehicle:true,
                vehicleNumber: '0',
                scheduleNumber: '0',
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
            tabClick(type){
                if(type == 'vehicle'){
                    this.title = '车船'
                    this.initVehicle()
                    this.treeShow('vehicle')
                    this.positionClass = 'vehicleBar'
                    this.activeVehicle = 'isActive'
                    this.activeSchedule=''
                    this.isVehicle = true
                }else if(type == 'schedule'){
                    this.title = '车船计划'
                    this.initSchedule()
                    this.treeShow('schedule')
                    this.positionClass = 'scheduleBar'
                    this.activeVehicle = ''
                    this.activeSchedule = 'isActive'
                    this.isVehicle = false
                }
            },
            treeShow(type){
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
                    //             "id": "ceb54f57-08d4-49a0-81db-a3e7c486b154",
                    //             "createTime": "2018-09-12 11:08:50",
                    //             "creator": "admin",
                    //             "modifyTime": "2018-09-12 11:08:50",
                    //             "modifier": "admin",
                    //             "serialNum": "船test1",
                    //             "capacity": 36,
                    //             "type": 1,
                    //             "model": null,
                    //             "gpsDeviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                    //             "pictureId": null,
                    //             "maintenanceStatus": 0,
                    //             "maintenanceDate": null,
                    //             "purchaseDate": null,
                    //             "description": null,
                    //             "scenicAreaId": null,
                    //             "deleted": false
                    //         },
                    //         "gpsDeviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                    //         "gpsDeviceName": "testgps1",
                    //         "pictureId": null,
                    //         "picturePath": null,
                    //         "gpsData": {
                    //             "deviceId": "c13e503f-713d-4cd7-9a5d-c62220e1f612",
                    //             "ioTDeviceId": "1000000",
                    //             "deviceName": "\ufffd\ufffd\ufffd\ufffd",
                    //             "createTime": "2018-09-21 10:15:56",
                    //             "longitude": 120.133034358847,
                    //             "latitude": 30.308330545773803,
                    //             "altitude": null,
                    //             "direction": null,
                    //             "speed": 0,
                    //             "telephone": null,
                    //             "deviceNum": "1000000",
                    //             "coordinate": "",
                    //             "tag": "ceb54f57-08d4-49a0-81db-a3e7c486b154"
                    //         },
                    //         "driver": null
                    //     },
                    //     {
                    //         "vehicle": {
                    //             "id": "966fda56-8cc3-4847-86cc-7e939df14369",
                    //             "createTime": "2018-09-12 11:09:17",
                    //             "creator": "admin",
                    //             "modifyTime": "2018-09-12 11:09:17",
                    //             "modifier": "admin",
                    //             "serialNum": "船test2",
                    //             "capacity": 0,
                    //             "type": 1,
                    //             "model": null,
                    //             "gpsDeviceId": "2b696d8b-7f38-41dc-8b3c-8db147c02c32",
                    //             "pictureId": null,
                    //             "maintenanceStatus": 0,
                    //             "maintenanceDate": null,
                    //             "purchaseDate": null,
                    //             "description": null,
                    //             "scenicAreaId": null,
                    //             "deleted": false
                    //         },
                    //         "gpsDeviceId": "2b696d8b-7f38-41dc-8b3c-8db147c02c32",
                    //         "gpsDeviceName": "testgps2",
                    //         "pictureId": null,
                    //         "picturePath": null,
                    //         "gpsData": {
                    //             "deviceId": "2b696d8b-7f38-41dc-8b3c-8db147c02c32",
                    //             "ioTDeviceId": "1000007",
                    //             "deviceName": "\ufffd\ufffd\ufffd豸\ufffd\ufffd\ufffd߲\ufffd\ufffd\ufffd",
                    //             "createTime": "2018-09-21 10:15:56",
                    //             "longitude": 120.13500857210744,
                    //             "latitude": 30.305894893713628,
                    //             "altitude": null,
                    //             "direction": null,
                    //             "speed": 0,
                    //             "telephone": null,
                    //             "deviceNum": "1000007",
                    //             "coordinate": "",
                    //             "tag": "966fda56-8cc3-4847-86cc-7e939df14369"
                    //         },
                    //         "driver": null
                    //     }]


                    this.vehicleNumber=vehicles.length
                    this.transportVehicleInfo=[]
                    this.transportVehicleList=[]
                    let carObj = {
                        label:'车辆',
                        id:'100010',
                        children:[]
                    }
                    let boatObj = {
                        label:'船只',
                        id:'100011',
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
                                regionId:'100010',
                                icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                // longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541: '',
                                // latitude:veObj.gpsData ? veObj.gpsData.latitude+0.49693734262853-0.0025647127: '',
                                longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            carObj.children.push(childObj)
                        }else if(veObj.vehicle.type == 1){
                            childObj = {
                                label:veObj.vehicle.serialNum,
                                id:veObj.vehicle.id,
                                url:'/static/img/icon/boat_small.png',
                                type:'transport',
                                subtype:'transportBoat',
                                regionId:'100011',
                                icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                // longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541: '',
                                // latitude:veObj.gpsData ? veObj.gpsData.latitude+0.49693734262853-0.0025647127: '',
                                longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            boatObj.children.push(childObj)
                        }
                        this.transportVehicleList.push(childObj)
                    })
                    this.transportVehicleInfo.push(carObj)
                    this.transportVehicleInfo.push(boatObj)

                    if(this.transportVehicleInfo.length >0){
                        this.transportVehicleInfo.forEach(item=>{
                            item.label = item.label+'（'+item.children.length+'个）'
                        })
                    }
                    // this.drawLine();
                    console.log(this.transportVehicleInfo)
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/car')) {
                        this.initVehicle();//长轮询
                        this.treeShow('vehicle');
                    }
                },5000)
            },
            async initSchedule(){
                Promise.all([this.getAllTransport()]).then(result=>{
                    let schedules = result[0]
                    console.log(schedules)

                    if(schedules.length >0){
                        schedules = schedules.filter(item=>{
                            return item.enabled
                        })
                    }
                    this.scheduleNumber=schedules.length
                    this.transportScheduleInfo=[]
                    this.transportScheduleList=[]
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
                                state:obj.status,
                                children:[]
                            }

                            if(obj.vehicles.length >0){
                                obj.vehicles.forEach(veObj=>{
                                    let childObj;
                                    if(obj.type == 0){
                                        childObj = {
                                            label:veObj.vehicle.serialNum,
                                            id:veObj.vehicle.id,
                                            url:'/static/img/icon/bus_small.png',
                                            type:'transport',
                                            subtype:'transportSchedule',
                                            regionId:obj.id,
                                            icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
                                            status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                            // longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                            // latitude:veObj.gpsData ? veObj.gpsData.latitude+0.49693734262853-0.0025647127: '',
                                            longitude:veObj.gpsData ? veObj.gpsData.longitude: '',
                                            latitude:veObj.gpsData ? veObj.gpsData.latitude: '',
                                            gpsDeviceId:veObj.gpsDeviceId,
                                            stations:obj.stations,
                                            routeObj:obj.routeObj
                                        }
                                    }else if(obj.type == 1){
                                        childObj = {
                                            label:veObj.vehicle.serialNum,
                                            id:veObj.vehicle.id,
                                            url:'/static/img/icon/boat_small.png',
                                            type:'transport',
                                            subtype:'transportSchedule',
                                            regionId:obj.id,
                                            icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
                                            status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                            // longitude:veObj.gpsData ? veObj.gpsData.longitude+0.451536705535+0.0048011541 : '',
                                            // latitude:veObj.gpsData ? veObj.gpsData.latitude +0.49693734262853-0.0025647127: '',
                                            longitude:veObj.gpsData ? veObj.gpsData.longitude: '',
                                            latitude:veObj.gpsData ? veObj.gpsData.latitude: '',
                                            gpsDeviceId:veObj.gpsDeviceId,
                                            stations:obj.stations,
                                            routeObj:obj.routeObj
                                        }
                                    }
                                    this.transportScheduleList.push(childObj)
                                    scheduleObj.children.push(childObj)
                                })
                            }
                            this.transportScheduleInfo.push(scheduleObj)
                        })
                    }

                    if(this.transportScheduleInfo.length >0){
                        this.transportScheduleInfo.forEach(item=>{
                            item.label = item.label+'（'+item.children.length+'个）'
                        })
                    }
                    this.transportScheduleInfo.sort(this.compare('state'))
                    // this.drawLine();
                    console.log(this.transportScheduleInfo)
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/car')) {
                        this.initSchedule();//长轮询
                        this.treeShow('schedule');
                    }
                },5000)
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
            }
        },
        watch:{

        },
        created: function () {

            this.activeVehicle = 'isActive'
            this.positionClass = 'vehicleBar'
            this.activeSchedule=''
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
                .vehicleBar{
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
