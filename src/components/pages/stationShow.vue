<template>
    <div class="station">
        <ScrollContainer>
            <div class="content">
                <div class="contentDiv"  v-for="route in routes">
                    <div class="contentBody">
                        <div class="desc">
                            <div class="left">
                                <span>{{route.name}}</span>
                            </div>
                            <div  class="center" v-if="route.willArriveVe">
                                <span >{{route.willArriveVe.vehicle.serialNum}}还有{{route.willArriveVe.willArriveTime}}分钟到达</span>
                            </div>
                            <div  class="right" v-if="route.willArriveVe">
                                <span>剩余人数：{{route.willArriveVe.vacancy}}人</span>
                            </div>
                        </div>
                        <div class="trend">
                            <div class="route"></div>

                            <div class="stationContent" :id="route.id">
                                <div class="vehicleStyle" :id="item.vehicle.id" v-if="item.distance" v-for="item in route.vehicles">
                                    <span style="font-size: 10px;display: block;">{{item.vehicle.serialNum}}</span>
                                    <img src="../../../static/img/icon/station/vehicleShip.png">
                                </div>
                                <div class="stationFlex" v-for="station in route.stations">
                                    <div class="stationInfo">
                                        <img :id = "station.id" v-if="station.status == 'FROM'" src="../../../static/img/icon/station/firstStation.png">
                                        <img :id = "station.id"  v-if="station.status == 'TO'" src="../../../static/img/icon/station/endStation.png">

                                        <img :id = "station.id" v-if="station.status == 'CURRENT'" src="../../../static/img/icon/station/currentStation1.png">
                                        <img :id = "station.id" v-if="station.status == 'CURRENT'"  class="currentImg"  src="../../../static/img/icon/station/currentStation2.png">

                                        <img :id = "station.id" v-if="station.status == 'OTHER'" src="../../../static/img/icon/station/normalStation.png">

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
                routes:[]
            }
        },
        components: {
            ScrollContainer
        },
        methods: {
            async getStationData(){
                await api.transport.getRouteById(this.stationId).then(res=>{
                    console.log(res,'stationData  res')
                    this.routes = []
                    //假数据
//                    res = this.result
                    if(res instanceof Array && res.length >0){
                        res.forEach(schedule=>{

                            let cloneItem = Object.assign({},schedule.route)
                            cloneItem.stations = cloneItem.reStations

                            let positiveVes = []
                            let reverseVes = []
                            if(schedule.vehicles.length > 0){
                                schedule.vehicles.forEach(ve=>{
//                                    this.$set(ve,'distance',true)
                                    ve['distance'] = true
                                })

                                schedule.vehicles.forEach(vehicle=>{
                                    if(vehicle.direction){
                                        positiveVes.push(vehicle)
                                    }else{
                                        reverseVes.push(vehicle)
                                    }
                                })
//                                this.$set(schedule.route,'vehicles',positiveVes)
//                                this.$set(cloneItem,'vehicles',reverseVes)
                                schedule.route['vehicles'] = positiveVes
                                cloneItem['vehicles'] = reverseVes
                            }

                            if(schedule.willArriveVeFW){
//                                this.$set(schedule.willArriveVeFW,'distance',true)
//                                this.$set(schedule.route,'willArriveVe',schedule.willArriveVeFW)
                                schedule.willArriveVeFW['distance'] = true
                                schedule.route['willArriveVe'] = schedule.willArriveVeFW
                            }

                            if(schedule.willArriveVeRE){
//                                this.$set(schedule.willArriveVeRE,'distance',true)
//                                this.$set(cloneItem,'willArriveVe',schedule.willArriveVeRE)

                                schedule.willArriveVeRE['distance'] = true
                                cloneItem['willArriveVe'] = schedule.willArriveVeRE
                            }

                            this.routes.push(schedule.route)
                            this.routes.push(cloneItem)
                        })

                        this.$nextTick(function () {
                            this.initVehiclePosition()
                        })


                        setTimeout(() => {
                            let route = this.$route.path
                            if (route.includes('/station')) {
                                this.getStationData();//长轮询
                            }
                        },6000)

                    }
                })
            },

            initVehiclePosition(){
                console.log(this.routes,'this.routes')
                if(this.routes.length > 0){
                    this.routes.forEach(route=>{
                            route.vehicles.forEach(item=>{

                                if(!item.curStation || !item.nextStation){
                                    item.distance = false
                                    return
                                }
                                let stationPrevious = document.getElementById(item.curStation)
                                let stationNext = document.getElementById(item.nextStation)
                                let stationContent = document.getElementById(route.id)
                                let prevDistance = stationPrevious.getBoundingClientRect().left - stationContent.getBoundingClientRect().left
                                let totalDistance

//                                item.realTimeRatio = Math.random().toFixed(1)
                                if(item.realTimeRatio){
                                    totalDistance = prevDistance + (1-item.realTimeRatio)*(stationNext.getBoundingClientRect().left - stationPrevious.getBoundingClientRect().left)
                                    item.distance = true
                                }
                                let el = document.getElementById(item.vehicle.id)
                                el.style.left = totalDistance+"px"
                            })
                    })
                }

            },
            async saveVehicleDetail(){
                let params = {
                    "vehicleId":"753e56f3-fa3a-4f83-9c47-3c6fef52b40d",
                    "stationId":"34ba111f-9a92-49a8-84be-bde6e3bc8478",
                    "arriveTime":"2018-10-16 16:30:00",
                    "downNum":0,
                    "upNum":10,
                    "vacancy":10
                }

//                let params = {
//                    "vehicleId":"753e56f3-fa3a-4f83-9c47-3c6fef52b40d",
//                    "stationId":"59e5e6f0-e730-4dd0-8d04-506fcd400a60",
//                    "arriveTime":"2018-10-16 17:30:00",
//                    "downNum":1,
//                    "upNum":12,
//                    "vacancy":21
//                }
                await api.transport.saveVehicleDetail(params).then(res=>{
                    console.log(res,'插入成功')

                })
            }
        },
        watch:{

        },
        created() {

//            this.saveVehicleDetail()

            let url = window.parent.document.getElementById("stationIframe").contentWindow.location.href;
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

<style lang="scss" scoped>
    .station {
        width: 100%;
        height: 100%;
        .content{
            width: 100%;
            height:100%;
            .contentDiv{
                width:100%;
                height:35%;
                position:relative;
                .contentBody{
                    width:85%;
                    height:90%;
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
                        font-size: 1.14em;
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
                            margin-top:60px;
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
                                    top: 50px;
                                    width: 20px;
                                    text-align: center;
                                    .stationName{
                                        width:100%;
                                        margin-top: 10px;
                                        font-size: 14px;
                                        line-height: 1em;
                                    }
                                    .currentImg{
                                        vertical-align: top;
                                    }
                                    .stationStartEndName{
                                        width:100%;
                                        margin-top: 6px;
                                        font-size: 14px;
                                        line-height: 1em;
                                    }
                                    .stationCurrentName{
                                        width:100%;
                                        margin-top: -10px;
                                        font-size: 14px;
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
                            }

                        }


                    }
                }
            }
        }
    }
</style>
