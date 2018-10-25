<template>
    <div class="station">
        <ScrollContainer>
            <div class="content">
                <div class="contentTitle">
                    <span>旅游路线信息</span>
                </div>
                <el-carousel :interval="5000" indicator-position="none">
                    <el-carousel-item v-for="schedule in schedules" :key="schedule">
                        <div class="contentDiv"  v-for="route in schedule.routes">
                            <div class="contentBody">
                                <div class="desc">
                                    <div class="left">
                                        <span>{{route.name}}</span>
                                    </div>
                                    <div  class="center">
                                        <span  v-if="route.willArriveVe"><{{route.willArriveVe.vehicle.serialNum}}>还有{{route.willArriveVe.willArriveTime}}分钟到达</span>
                                    </div>
                                    <div  class="right">
                                        <span v-if="route.willArriveVe">空余座位：{{route.willArriveVe.vacancy}}人</span>
                                    </div>
                                </div>
                                <div class="trend">
                                    <div class="route"></div>

                                    <div class="stationContent" :id="route.key">
                                        <div class="vehicleStyle" :id="item.vehicle.id" v-if="item.distance" v-for="item in route.vehicles">
                                            <span>{{item.vehicle.serialNum}}</span>
                                            <img src="../../../static/img/icon/station/vehicleShip.png">
                                        </div>
                                        <div class="stationFlex" v-for="station in route.stations">
                                            <div class="stationInfo">
                                                <img :id = "station.key" v-if="station.status == 'FROM'" src="../../../static/img/icon/station/firstStation.png">
                                                <img :id = "station.key"  v-if="station.status == 'TO'" src="../../../static/img/icon/station/endStation.png">

                                                <img :id = "station.key" v-if="station.status == 'CURRENT'" src="../../../static/img/icon/station/currentStation1.png">
                                                <img :id = "station.key" v-if="station.status == 'CURRENT'"  class="currentImg"  src="../../../static/img/icon/station/currentStation2.png">

                                                <img :id = "station.key" v-if="station.status == 'OTHER'" src="../../../static/img/icon/station/normalStation2.png">

                                                <div :class="{'stationName': station.status == 'OTHER','stationStartEndName':station.status == 'FROM'|| station.status == 'TO',
                                                     'stationCurrentName': station.status == 'CURRENT',
                                                     'firstEnd': station.status == 'FROM' || station.status == 'TO',
                                                     'normal':station.status == 'OTHER','current':station.status == 'CURRENT'}">
                                                    {{station.name}}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <!--<div class="contentDiv"  v-for="route in routes">
                    <div class="contentBody">
                        <div class="desc">
                            <div class="left">
                                <span>{{route.name}}</span>
                            </div>
                            <div  class="center">
                                <span  v-if="route.willArriveVe"><{{route.willArriveVe.vehicle.serialNum}}>还有{{route.willArriveVe.willArriveTime}}分钟到达</span>
                            </div>
                            <div  class="right">
                                <span v-if="route.willArriveVe">空余座位：{{route.willArriveVe.vacancy}}人</span>
                            </div>
                        </div>
                        <div class="trend">
                            <div class="route"></div>

                            <div class="stationContent" :id="route.key">
                                <div class="vehicleStyle" :id="item.vehicle.id" v-if="item.distance" v-for="item in route.vehicles">
                                    <span>{{item.vehicle.serialNum}}</span>
                                    <img src="../../../static/img/icon/station/vehicleShip.png">
                                </div>
                                <div class="stationFlex" v-for="station in route.stations">
                                    <div class="stationInfo">
                                        <img :id = "station.key" v-if="station.status == 'FROM'" src="../../../static/img/icon/station/firstStation.png">
                                        <img :id = "station.key"  v-if="station.status == 'TO'" src="../../../static/img/icon/station/endStation.png">

                                        <img :id = "station.key" v-if="station.status == 'CURRENT'" src="../../../static/img/icon/station/currentStation1.png">
                                        <img :id = "station.key" v-if="station.status == 'CURRENT'"  class="currentImg"  src="../../../static/img/icon/station/currentStation2.png">

                                        <img :id = "station.key" v-if="station.status == 'OTHER'" src="../../../static/img/icon/station/normalStation.png">

                                        <div :class="{'stationName': station.status == 'OTHER','stationStartEndName':station.status == 'FROM'|| station.status == 'TO',
                                                     'stationCurrentName': station.status == 'CURRENT',
                                                     'firstEnd': station.status == 'FROM' || station.status == 'TO',
                                                     'normal':station.status == 'OTHER','current':station.status == 'CURRENT'}">
                                            {{station.name}}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>-->
            </div>
        </ScrollContainer>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        name:'station',
        data() {
            return {
                stationId:'',
                result:[
                    {
                        "id": "a435e789-f922-4c65-91ea-ca09324e4ce5",
                        "creator": "admin",
                        "createTime": "2018-10-17",
                        "modifier": "admin",
                        "modifyTime": "2018-10-17",
                        "name": "船只计划=",
                        "days": "1,2,3,4,5,6,7",
                        "startDate": null,
                        "endDate": null,
                        "startTime": "08:24:59",
                        "endTime": "21:24:59",
                        "routeId": "6f5a899b-9cb6-4b37-ac80-8f4c46d3a7d7",
                        "description": "sdf",
                        "scenicAreaId": null,
                        "type": "1",
                        "svDriverMaps": [
                            {
                                "vehicleId": "753e56f3-fa3a-4f83-9c47-3c6fef52b40d",
                                "driverIds": [
                                    "166153e1798-c168105afba35c5c"
                                ]
                            }
                        ],
                        "stations": [
                            {
                                "id": "34ba111f-9a92-49a8-84be-bde6e3bc8478",
                                "creator": "admin",
                                "createTime": "2018-10-17",
                                "modifier": "admin",
                                "modifyTime": "2018-10-17",
                                "name": "二号码头",
                                "pictureId": null,
                                "capacity": 63,
                                "description": null,
                                "scenicAreaId": null,
                                "type": "1",
                                "status": null,
                                "regionId": "9752ae86-c863-4adb-9c2a-8c75a081fb64",
                                "regionName": "浙窑",
                                "longitude": 120.13243626077417,
                                "latitude": 30.307825346211757,
                                "epsg": 4326,
                                "deleted": false
                            },
                            {
                                "id": "59e5e6f0-e730-4dd0-8d04-506fcd400a60",
                                "creator": "admin",
                                "createTime": "2018-10-08",
                                "modifier": "admin",
                                "modifyTime": "2018-10-08",
                                "name": "结婚后",
                                "pictureId": null,
                                "capacity": 32,
                                "description": "桑",
                                "scenicAreaId": null,
                                "type": "1",
                                "status": null,
                                "regionId": "a23c0a6e-e146-427e-b94a-ea79f4ab6316",
                                "regionName": "富义仓",
                                "longitude": 120.13486638109748,
                                "latitude": 30.306761263274716,
                                "epsg": 4326,
                                "deleted": false
                            },
                            {
                                "id": "66c2b041-e9cd-4759-b688-82770bd3fc3e",
                                "creator": "admin",
                                "createTime": "2018-10-17",
                                "modifier": "admin",
                                "modifyTime": "2018-10-17",
                                "name": "一号码头",
                                "pictureId": null,
                                "capacity": 33,
                                "description": "打的费",
                                "scenicAreaId": null,
                                "type": "1",
                                "status": null,
                                "regionId": "2d5807d6-87c9-4031-a07d-8bdf60eb4168",
                                "regionName": "小河",
                                "longitude": 120.13756309096141,
                                "latitude": 30.303278761154342,
                                "epsg": 4326,
                                "deleted": false
                            }
                        ],
                        "status": "ONLINE",
                        "state": null,
                        "vehicles": [
                            {
                                "vehicle": {
                                    "id": "753e56f3-fa3a-4f83-9c47-3c6fef52b40d",
                                    "createTime": "2018-09-27 12:51:43",
                                    "creator": "admin",
                                    "modifyTime": "2018-09-27 12:51:43",
                                    "modifier": "admin",
                                    "serialNum": "运河行02",
                                    "capacity": 0,
                                    "type": 1,
                                    "model": null,
                                    "gpsDeviceId": "1d9472f0-1719-48fd-bd2b-71a5deacbc3e",
                                    "pictureId": null,
                                    "maintenanceStatus": 0,
                                    "maintenanceDate": null,
                                    "purchaseDate": null,
                                    "description": null,
                                    "scenicAreaId": null,
                                    "deleted": false
                                },
                                "gpsDeviceId": null,
                                "gpsDeviceName": null,
                                "pictureId": null,
                                "picturePath": null,
                                "gpsData": {
                                    "deviceId": "1019092",
                                    "ioTDeviceId": "1019092",
                                    "deviceName": "\ufffd˺\ufffd\ufffd\ufffd02",
                                    "createTime": "2018-10-17 14:29:22",
                                    "longitude": 120.157898,
                                    "latitude": 30.276783,
                                    "altitude": null,
                                    "direction": null,
                                    "speed": 0,
                                    "telephone": null,
                                    "deviceNum": "1019092",
                                    "coordinate": "",
                                    "tag": "753e56f3-fa3a-4f83-9c47-3c6fef52b40d"
                                },
                                "realTimeRatio": null,
                                "driver": null,
                                "prevStation": null,
                                "curStation": {
                                    "id": "34ba111f-9a92-49a8-84be-bde6e3bc8478",
                                    "creator": "admin",
                                    "createTime": "2018-10-17",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-17",
                                    "name": "二号码头",
                                    "pictureId": null,
                                    "capacity": 63,
                                    "description": null,
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "CURRENT",
                                    "regionId": "9752ae86-c863-4adb-9c2a-8c75a081fb64",
                                    "regionName": "浙窑",
                                    "longitude": 120.13243626077417,
                                    "latitude": 30.307825346211757,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                "nextStation": {
                                    "id": "59e5e6f0-e730-4dd0-8d04-506fcd400a60",
                                    "creator": "admin",
                                    "createTime": "2018-10-08",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-08",
                                    "name": "结婚后",
                                    "pictureId": null,
                                    "capacity": 32,
                                    "description": "桑",
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "OTHER",
                                    "regionId": "a23c0a6e-e146-427e-b94a-ea79f4ab6316",
                                    "regionName": "富义仓",
                                    "longitude": 120.13486638109748,
                                    "latitude": 30.306761263274716,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                "arriveTime": 0,
                                "willArriveTime": 3,
                                "direction": false,
                                "upNum": null,
                                "downNum": null,
                                "vacancy": 10
                            }
                        ],
                        "willArriveVeFW": null,
                        "willArriveVeRE": null,
                        "route": {
                            "id": "6f5a899b-9cb6-4b37-ac80-8f4c46d3a7d7",
                            "name": "2-结婚-1",
                            "type": 3,
                            "description": null,
                            "creator": "admin",
                            "createTime": "2018-10-17",
                            "modifier": null,
                            "modifyTime": null,
                            "scenicAreaId": null,
                            "stations": [
                                {
                                    "id": "34ba111f-9a92-49a8-84be-bde6e3bc8478",
                                    "creator": "admin",
                                    "createTime": "2018-10-17",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-17",
                                    "name": "二号码头",
                                    "pictureId": null,
                                    "capacity": 63,
                                    "description": null,
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "CURRENT",
                                    "regionId": "9752ae86-c863-4adb-9c2a-8c75a081fb64",
                                    "regionName": "浙窑",
                                    "longitude": 120.13243626077417,
                                    "latitude": 30.307825346211757,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                {
                                    "id": "59e5e6f0-e730-4dd0-8d04-506fcd400a60",
                                    "creator": "admin",
                                    "createTime": "2018-10-08",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-08",
                                    "name": "结婚后",
                                    "pictureId": null,
                                    "capacity": 32,
                                    "description": "桑",
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "OTHER",
                                    "regionId": "a23c0a6e-e146-427e-b94a-ea79f4ab6316",
                                    "regionName": "富义仓",
                                    "longitude": 120.13486638109748,
                                    "latitude": 30.306761263274716,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                {
                                    "id": "66c2b041-e9cd-4759-b688-82770bd3fc3e",
                                    "creator": "admin",
                                    "createTime": "2018-10-17",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-17",
                                    "name": "一号码头",
                                    "pictureId": null,
                                    "capacity": 33,
                                    "description": "打的费",
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "TO",
                                    "regionId": "2d5807d6-87c9-4031-a07d-8bdf60eb4168",
                                    "regionName": "小河",
                                    "longitude": 120.13756309096141,
                                    "latitude": 30.303278761154342,
                                    "epsg": 4326,
                                    "deleted": false
                                }
                            ],
                            "reStations": [
                                {
                                    "id": "66c2b041-e9cd-4759-b688-82770bd3fc3e",
                                    "creator": "admin",
                                    "createTime": "2018-10-17",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-17",
                                    "name": "一号码头",
                                    "pictureId": null,
                                    "capacity": 33,
                                    "description": "打的费",
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "FROM",
                                    "regionId": "2d5807d6-87c9-4031-a07d-8bdf60eb4168",
                                    "regionName": "小河",
                                    "longitude": 120.13756309096141,
                                    "latitude": 30.303278761154342,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                {
                                    "id": "59e5e6f0-e730-4dd0-8d04-506fcd400a60",
                                    "creator": "admin",
                                    "createTime": "2018-10-08",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-08",
                                    "name": "结婚后",
                                    "pictureId": null,
                                    "capacity": 32,
                                    "description": "桑",
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "OTHER",
                                    "regionId": "a23c0a6e-e146-427e-b94a-ea79f4ab6316",
                                    "regionName": "富义仓",
                                    "longitude": 120.13486638109748,
                                    "latitude": 30.306761263274716,
                                    "epsg": 4326,
                                    "deleted": false
                                },
                                {
                                    "id": "34ba111f-9a92-49a8-84be-bde6e3bc8478",
                                    "creator": "admin",
                                    "createTime": "2018-10-17",
                                    "modifier": "admin",
                                    "modifyTime": "2018-10-17",
                                    "name": "二号码头",
                                    "pictureId": null,
                                    "capacity": 63,
                                    "description": null,
                                    "scenicAreaId": null,
                                    "type": "1",
                                    "status": "CURRENT",
                                    "regionId": "9752ae86-c863-4adb-9c2a-8c75a081fb64",
                                    "regionName": "浙窑",
                                    "longitude": 120.13243626077417,
                                    "latitude": 30.307825346211757,
                                    "epsg": 4326,
                                    "deleted": false
                                }
                            ],
                            "deleted": false,
                            "geo": "[[120.1324194524691,30.30783244120617],[120.13381520508307,30.3064637281329],[120.13489169935139,30.306753311263034],[120.13742407971495,30.303364795731383]]"
                        },
                        "enabled": true,
                        "deleted": false,
                        "customizedDays": false
                    }
                ],
                routes:[],
                schedules:[]
            }
        },
        components: {
            ScrollContainer
        },
        methods: {
            getStationData(){
                let that = this
                $.ajax({
                    url:'/v1/schedule/vehicle?stationId='+this.stationId,
                    type:'get',
                    dataType:'json',
                    success:function(res){
                        console.log(res,'stationData  res')
                        that.routes = []
                        that.schedules = []
                        //假数据
                        if(res instanceof Array && res.length >0){
                            res.forEach(schedule=>{
                                let cloneItemFW = Object.assign({},schedule.route)
                                let cloneItemRE = Object.assign({},schedule.route)
                                cloneItemRE.stations = cloneItemRE.reStations

                                let positiveVes = []
                                let reverseVes = []
                                if(schedule.vehicles.length > 0){
                                    schedule.vehicles.forEach(ve=>{
                                        ve['distance'] = true
                                    })

                                    schedule.vehicles.forEach(vehicle=>{
                                        if(vehicle.direction){     //正向
                                            if(vehicle.curStation){
                                                vehicle['curStation']['key'] = vehicle['curStation']['id']+"FW"
                                            }
                                            if(vehicle.nextStation){
                                                vehicle['nextStation']['key'] = vehicle['nextStation']['id']+"FW"
                                            }
                                            positiveVes.push(vehicle)
                                        }else{
                                            if(vehicle.curStation){
                                                vehicle['curStation']['key'] = vehicle['curStation']['id']+"RE"
                                            }
                                            if(vehicle.nextStation){
                                                vehicle['nextStation']['key'] = vehicle['nextStation']['id']+"RE"
                                            }
                                            reverseVes.push(vehicle)
                                        }
                                    })

                                    cloneItemFW['vehicles'] = positiveVes
                                    cloneItemRE['vehicles'] = reverseVes
                                }

                                if(cloneItemFW.stations.length >0){
                                    cloneItemFW.stations.forEach(station=>{
                                        station['key'] = station.id + "FW"
                                    })
                                }

                                if(cloneItemRE.stations.length >0){
                                    cloneItemRE.stations.forEach(reStation=>{
                                        reStation['key'] = reStation.id+"RE"
                                    })
                                }


                                if(schedule.willArriveVeFW){
                                    schedule.willArriveVeFW['distance'] = true
                                    cloneItemFW['willArriveVe'] = schedule.willArriveVeFW
                                }


                                if(schedule.willArriveVeRE){
                                    schedule.willArriveVeRE['distance'] = true
                                    cloneItemRE['willArriveVe'] = schedule.willArriveVeRE
                                }

                                cloneItemFW['key'] = cloneItemFW.id+"FW"
                                cloneItemRE['key'] = cloneItemRE.id+"RE"

                                cloneItemFW.name = cloneItemFW.name+"(去)"
                                cloneItemRE.name = cloneItemRE.name+"(返)"

                                let routeArray = []
                                routeArray.push(cloneItemFW)
                                routeArray.push(cloneItemRE)

                                that.schedules.push({
                                    routes:routeArray
                                })

                            })

                            console.log(that.schedules,'schedules')
                            that.$nextTick(function () {
                                that.initVehiclePosition()
                            })

                            setTimeout(() => {
                                console.log("aaaaaaaaaaaaaaaaaa")
                                that.getStationData();
                            },5000)

                        }
                    }
                })


//                await api.transport.getRouteById(this.stationId).then(res=>{
//                    console.log(res,'stationData  res')
//                    this.routes = []
//                    this.schedules = []
//                    //假数据
////                    res = this.result
//                    if(res instanceof Array && res.length >0){
//                        res.forEach(schedule=>{
//
//                            let cloneItemFW = Object.assign({},schedule.route)
//                            let cloneItemRE = Object.assign({},schedule.route)
//                            cloneItemRE.stations = cloneItemRE.reStations
//
//                            let positiveVes = []
//                            let reverseVes = []
//                            if(schedule.vehicles.length > 0){
//                                schedule.vehicles.forEach(ve=>{
//                                    ve['distance'] = true
//                                })
//
//                                schedule.vehicles.forEach(vehicle=>{
//                                    if(vehicle.direction){     //正向
//                                        if(vehicle.curStation){
//                                            vehicle['curStation']['key'] = vehicle['curStation']['id']+"FW"
//                                        }
//                                        if(vehicle.nextStation){
//                                            vehicle['nextStation']['key'] = vehicle['nextStation']['id']+"FW"
//                                        }
//                                        positiveVes.push(vehicle)
//                                    }else{
//                                        if(vehicle.curStation){
//                                            vehicle['curStation']['key'] = vehicle['curStation']['id']+"RE"
//                                        }
//                                        if(vehicle.nextStation){
//                                            vehicle['nextStation']['key'] = vehicle['nextStation']['id']+"RE"
//                                        }
//                                        reverseVes.push(vehicle)
//                                    }
//                                })
//
//                                cloneItemFW['vehicles'] = positiveVes
//                                cloneItemRE['vehicles'] = reverseVes
//                            }
//
//                            if(cloneItemFW.stations.length >0){
//                                cloneItemFW.stations.forEach(station=>{
//                                        station['key'] = station.id + "FW"
//                                })
//                            }
//
//                            if(cloneItemRE.stations.length >0){
//                                cloneItemRE.stations.forEach(reStation=>{
//                                    reStation['key'] = reStation.id+"RE"
//                                })
//                            }
//
//
//                            if(schedule.willArriveVeFW){
//                                schedule.willArriveVeFW['distance'] = true
//                                cloneItemFW['willArriveVe'] = schedule.willArriveVeFW
//                            }
//
//
//                            if(schedule.willArriveVeRE){
//                                schedule.willArriveVeRE['distance'] = true
//                                cloneItemRE['willArriveVe'] = schedule.willArriveVeRE
//                            }
//
//                            cloneItemFW['key'] = cloneItemFW.id+"FW"
//                            cloneItemRE['key'] = cloneItemRE.id+"RE"
//
//                            cloneItemFW.name = cloneItemFW.name+"(去)"
//                            cloneItemRE.name = cloneItemRE.name+"(返)"
//
//                            let routeArray = []
//                            routeArray.push(cloneItemFW)
//                            routeArray.push(cloneItemRE)
//
//                            this.schedules.push({
//                                routes:routeArray
//                            })
//
//                        })
//
//                        console.log(this.schedules,'schedules')
//                        this.$nextTick(function () {
//                            this.initVehiclePosition()
//                        })
//
//                        setTimeout(() => {
//                            console.log("aaaaaaaaaaaaaaaaaa")
//                            this.getStationData();
////                            let route = this.$route.path
////                            if (route.includes('/station')) {
////                                this.getStationData();//长轮询
////                            }
//                        },5000)
//
//                    }
//                })
            },

            initVehiclePosition(){
                console.log(this.routes,'this.routes')
                if(this.schedules.length > 0){
                    this.schedules.forEach(schedule=>{
                          if(schedule.routes.length>0) {
                              schedule.routes.forEach(route=>{
                                  route.vehicles.forEach(item=>{
                                      if(!item.curStation || !item.nextStation){
                                          item.distance = false
                                          return
                                      }
                                      let stationPrevious = document.getElementById(item.curStation.key)
                                      let stationNext  =document.getElementById(item.nextStation.key)
                                      let stationCurrent
                                      if(item.direction){
                                          stationCurrent = document.getElementById(this.stationId+"FW")
                                      }else{
                                          stationCurrent = document.getElementById(this.stationId+"RE")
                                      }
                                      let stationContent = document.getElementById(route.key)
                                      let prevDistance = stationPrevious.getBoundingClientRect().left - stationContent.getBoundingClientRect().left
                                      let prevDistanceBig = stationCurrent.getBoundingClientRect().left - stationContent.getBoundingClientRect().left
                                      let totalDistance

                                      if(item.realTimeRatio){
                                          if(item.realTimeRatio < 1){
                                              totalDistance = prevDistance + (1-item.realTimeRatio)*(stationCurrent.getBoundingClientRect().left - stationPrevious.getBoundingClientRect().left)
                                              item.distance = true
                                          }else if(item.realTimeRatio > 1){
                                              totalDistance = prevDistanceBig + item.realTimeRatio*(stationPrevious.getBoundingClientRect().left - stationCurrent.getBoundingClientRect().left)
                                              item.distance = true
                                          }
                                      } else{
                                          totalDistance = prevDistance + item.realTimeRatio*(stationNext.getBoundingClientRect().left -stationPrevious.getBoundingClientRect().left)
                                          item.distance = true
                                      }

                                      let el = document.getElementById(item.vehicle.id)
                                      el.style.left = totalDistance+"px"

                                  })
                              })
                          }

                    })
                }

            }
        },
        watch:{

        },
        created() {

            let url
            if(window.parent.document.getElementById("stationIframe")){
                url = window.parent.document.getElementById("stationIframe").contentWindow.location.href;
            }else{
                url = window.location.href
            }
            console.log(url)

            let reg=new RegExp('[?&]'+'stationId'+'=([^&#]+)');
            let query=url.match(reg);
            this.stationId = query?query[1]:null;
            console.log(this.stationId,'stationId')
            this.getStationData()
        },
        mounted() {

        },
        computed: {
            ...mapGetters([''])
        }
    }
</script>

<style lang="scss">
    @media all and (max-width: 450px){
        .station {
            .content{
                .el-carousel{
                    width:100%;
                    height: 90%;
                    .el-carousel__container{
                        height: 100%;
                        .el-carousel__item{
                            height:100%;
                        }
                    }
                }
            }
        }
    }

    @media all and (min-width: 451px){
        .station {
            .content{
                .el-carousel{
                    width:100%;
                    height: 96%;
                    .el-carousel__container{
                        height: 100%;
                        .el-carousel__item{
                            height:100%;
                        }
                    }
                }
            }
        }
    }

</style>

<style lang="scss" scoped>
    @media all and (max-width: 450px) {
        .station {
            width: 100%;
            height: 100%;
            .content{
                width: 100%;
                height:100%;
                .contentTitle{
                    height:10%;
                    width:100%;
                    text-align: center;
                    span{
                        display:block;
                        position: relative;
                        top:0;
                        /*top:50%;
                        transform:translateY(-50%);*/
                        font-size:rem(15);
                        color: #26bbf0;
                    }
                }
                .contentDiv{
                    width:100%;
                    height:50%;
                    position:relative;
                    .contentBody{
                        width:95%;
                        height:95%;
                        border-radius: rem(10);
                        border:1px solid #dcdfe6;
                        position: absolute;
                        margin: auto;
                        top:0;
                        bottom:0;
                        left:0;
                        right:0;
                        display: flex;
                        flex-direction: column;
                        .desc{
                            height:20%;
                            display: flex;
                            flex-direction: row;
                            font-size: rem(12);
                            border-radius: rem(10) rem(10) 0 0;
                            .left{
                                flex:1;
                                text-align: center;
                                span{
                                    color: #cf9236;
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                            .right{
                                flex:1;
                                text-align: center;
                                span{
                                    color:#cf9236;
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                            .center{
                                flex:1.5;
                                text-align: center;
                                span{
                                    color:#cf9236;
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                        }
                        .trend{
                            height:80%;
                            position: relative;
                            border-radius: 0 0 rem(10) rem(10) ;
                            .route{
                                width:100%;
                                height:2px;
                                /*     margin-top:60px;*/
                                margin-top:40px;
                                padding:0px;
                                background-color: #ffc600;
                                overflow:hidden;
                            }
                            .stationContent{
                                margin: auto;
                                position: absolute;
                                top: 0; left: 0; bottom: 0; right: 0;
                                width:95%;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                .stationFlex{
                                    flex:1;
                                    display:flex;
                                    justify-content:center;
                                    align-items:center;
                                    .stationInfo{
                                        position: absolute;
                                        top: 32px;
                                        text-align: center;
                                        .stationName{
                                            width:100%;
                                            margin-top: 10px;
                                            font-size: rem(12);
                                            line-height: 1em;
                                        }
                                        .currentImg{
                                            display: block;
                                            position: absolute;
                                            left:35%;
                                            /*transform:translateX(-50%);*/
                                        }
                                        .stationStartEndName{
                                            width:100%;
                                            margin-top: 6px;
                                            font-size: rem(12);
                                            line-height: 1em;
                                        }
                                        .stationCurrentName{
                                            width:100%;
                                            margin-top: 10px;
                                            font-size: rem(12);
                                            line-height: 1em;
                                        }
                                    }
                                    .firstEnd{
                                        color: #26bbf0;
                                    }
                                    .normal{
                                        color: #62c062;
                                    }
                                    .current{
                                        color: #f36a5a;
                                    }
                                }
                                .vehicleStyle{
                                    position: absolute;
                                    top: 0;
                                    left: 5px;
                                    bottom: 0;
                                    right: 0;
                                    font-size: rem(12);
                                    img{
                                        display: block;
                                    }
                                    span{
                                        color: #26bbf0;
                                    }
                                }

                            }


                        }
                    }
                }
            }
        }
    }
    @media all and (min-width: 451px) {
        .station {
            width: 100%;
            height: 100%;
            .content{
                width: 100%;
                height:100%;
                .contentTitle{
                    height:4%;
                    width:100%;
                    text-align: center;
                    span{
                        display:block;
                        position: relative;
                        top:50%;
                        transform:translateY(-50%);
                        font-size:rem(15);
                        color: #26bbf0;
                    }
                }
                .contentDiv{
                    width:100%;
                    height:16%;
                    position:relative;
                    .contentBody{
                        width:95%;
                        height:97%;
                        border-radius: rem(10);
                        border:1px solid #dcdfe6;
                        background-color: #f2f2f2;
                        position: absolute;
                        margin: auto;
                        top:0;
                        bottom:0;
                        left:0;
                        right:0;
                        display: flex;
                        flex-direction: column;
                        .desc{
                            height:20%;
                            background-color: #f2f2f2;
                            display: flex;
                            flex-direction: row;
                            font-size: rem(15);
                            border-radius: rem(10) rem(10) 0 0;
                            .left{
                                flex:1;
                                text-align: center;
                                span{
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                            .right{
                                flex:1;
                                text-align: center;
                                span{
                                    color:#cf9236;
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                            .center{
                                flex:1;
                                text-align: center;
                                span{
                                    color:#cf9236;
                                    display:block;
                                    position: relative;
                                    top:50%;
                                    transform:translateY(-50%);
                                }
                            }
                        }
                        .trend{
                            height:80%;
                            background-color: #f2f2f2;
                            position: relative;
                            border-radius: 0 0 rem(10) rem(10) ;
                            .route{
                                width:100%;
                                height:2px;
                                /*     margin-top:60px;*/
                                margin-top:45px;
                                padding:0px;
                                background-color: #ffc600;
                                overflow:hidden;
                            }
                            .stationContent{
                                margin: auto;
                                position: absolute;
                                top: 0; left: 0; bottom: 0; right: 0;
                                width:95%;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                .stationFlex{
                                    flex:1;
                                    display:flex;
                                    justify-content:center;
                                    align-items:center;
                                    .stationInfo{
                                        position: absolute;
                                        top: 35px;
                                        text-align: center;
                                        .stationName{
                                            width:100%;
                                            margin-top: 12px;
                                            font-size: rem(14);
                                            line-height: 1em;
                                        }
                                        .currentImg{
                                            /*vertical-align: top;*/
                                            display: block;
                                            position: absolute;
                                            left:50%;
                                            transform:translateX(-50%);
                                        }
                                        .stationStartEndName{
                                            width:100%;
                                            margin-top: 8px;
                                            font-size: rem(14);
                                            line-height: 1em;
                                        }
                                        .stationCurrentName{
                                            width:100%;
                                            margin-top: 12px;
                                            font-size: rem(14);
                                            line-height: 1em;
                                        }
                                    }
                                    .firstEnd{
                                        color: #26bbf0;
                                    }
                                    .normal{
                                        color: #909090;
                                    }
                                    .current{
                                        color: #f36a5a;
                                    }
                                }
                                .vehicleStyle{
                                    position: absolute;
                                    top: 0;
                                    left: 5px;
                                    bottom: 0;
                                    right: 0;
                                    font-size: rem(12);
                                    img{
                                        display: block;
                                    }
                                }

                            }


                        }
                    }
                }
            }
        }
    }
</style>
