<template>
    <Scrollcontainer>
        <div id="map" class="map">

        </div>
        <div id="contextmenu_container" class="contextmenu">
            <i @click="menuDelete"></i>
            <el-tooltip class="item" effect="dark" content="启停" placement="top">
                <el-switch
                    class="mapSwitch"
                    v-model="open"
                    :width="26"
                    active-color="#53b6a7"
                    inactive-color="#808080"
                    @change="mapSwitch">
                </el-switch>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <button @click="menuShow" class="menuShow"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="广播操作" placement="top">
                <button @click="showCast" class="showCast"></button>
            </el-tooltip>
            <musicedit :dialogisshow="dialogVisible" :selectedCast="selectedCast" @closeDialog="closeMusicEdit"></musicedit>
            <el-tooltip class="item" effect="dark" content="操作" placement="top">
                 <button @click="menuOperation" class="menuOperation"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="电话" placement="top">
                <button @click="menuPhone" class="menuPhone"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="广播" placement="top">
                <button @click="menuBroadcast" class="menuBroadcast"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看摄像头" placement="top">
                <button @click="menuCamera" class="menuCamera"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看周围摄像头" placement="top">
                <button @click="warnCamera" class="warnCamera"></button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改广播声音" placement="top">
                <button @click="menuBroad" class="menuBroad"></button>
            </el-tooltip>
        </div>
        <PersonDetail v-if="visible"
                      :Info="buildInfo"
                      :title="title"
                      :visible="visible"
                      @closeInfoDialog ="closeDialog">
        </PersonDetail>
        <controlcameraDialog v-if="cameravisible"
                      :Info="buildInfo"
                      :title="title"
                      :width="width"
                      :visible="cameravisible"
                      @closeInfoDialog ="closeDialog">
        </controlcameraDialog>
        <AlarmDetail v-if="AlarmDetailShow"
                     :visible="AlarmDetailShow"
                     :Info="warningEventInfo"
                     :readOnly="readOnly"
                     @closeDialog ="closeDialog"
                     :title = "title"
                     @saveEditInfo="saveEditInfo"
                     :isBatchEdit="isBatchEdit"
                     :choseInfos = 'choseInfos'>
        </AlarmDetail>
        <ledDialog v-if="ledvisible" :ledvisible="ledvisible"  @closeDialog ="closeDialog">
        </ledDialog>
    </Scrollcontainer>

</template>

<script>
    import droreMap from "../../static/js/droreMap.js"
    import Event from "../../static/js/static.js"
    import Scrollcontainer from '@/components/ScrollContainer'
    import { mapMutations,mapGetters } from 'vuex'
    import api from '@/api'
    import PersonDetail from '@/components/controlDialog'
    import controlcameraDialog from '@/components/controlcameraDialog'

    import musicedit from '@/components/intelligentBox/musicedit'

    import AlarmDetail from '@/components/eye/alarm/alarmEvent/alarmEventDialog'
    import ledDialog from '@/components/ledDialog'


    export default {
        name: "map1",
        data () {
            return {
                heatEmShow:false,
                AlarmDetailShow:false,
                warningEventInfo: [],
                choseInfos: [],
                choseInfoId:[],
                readOnly: true,
                title:'',
                selection:[],
                loading: false,
                isBatchEdit:false,
                open:false,
                menulist: {},
                ledvisible:false,
                controleLightList:[],
                controleEnvironmentList:[],
                controleWifiList:[],
                controleBroadList:[],
                controleCameraList:[],
                controleLedList:[],
                controleTransportList:[],
                controleSecurityPersonList:[],
                facilityPark:[],
                facilityToilet:[],
                facilityShop:[],
                facilityBuild:[],
                facilityScenic:[],
                facilityTrash:[],
                facilityPlant:[],
                facilityIndicator:[],
                facilityRoad:[],
                buildInfo:[],
                visible:false,
                title:'',
                width:'1080px',
                cameravisible:false,
                isDisabled: true,
                lightCheckout:[],
                searchFacilityList:[],
                jsonAttrList:[],
                menuBroadvolume:false,
                heatShow:true,
                heatEmTime:'',
                heatEmNameOne:'',
                heatEmNameTwo:'0℃',
                heatEmNameThree:'0℃',
                heatEmNameFour:'——',
                heatEmNameFive:'0',
                heatEmNameSix:'0',
                heatEmNameSeven:'',
                heatEmNameEight:'——',
                heatEmNameNine:'0',
                carcameravisible:false,
                dialogVisible:false,
                selectedCast:[]

            }
        },
        created () {

        },
        mounted() {
            this.requestGisMain();//加载地图
            droreMap.object.getMap().getLayers().getArray()[1].setVisible(false)
            // droreMap.status.limitExtent = true
            let route = this.$route.path
            if (route.includes('facility')) {
                droreMap.interaction.enableMapClick = true
                this.getAllIndicator();//指示牌现有标注
                this.getAllTrash();//垃圾桶现有标注
                this.getAllScenic();//景点现有标注
                this.getAllShop();//商圈现有标注
                this.getAllPark();//停车场现有标注
                this.getAllToilet();//卫生间现有标注
                this.getAllTree();//植物现有标注
                this.getAllBuild();//建筑现有标注
                this.overView();//鹰眼
                this.getAllRoat();// 路线输出
                this.getAllArea();// 片区输出
            }else if (route.includes('controler')) {
                droreMap.interaction.enableMapClick = true
                // droreMap.interaction.showMove()
                this.getAllLight();//路灯现有标注
                this.getAllGate();//闸机现有标注
                this.getAllWifi();//wifi现有标注
                this.getAllLed();//Led现有标注
                this.getAllPolice();//报警柱现有标注
                this.getAllMonitor();//传感器现有标注
                this.getAllBroadcast();//广播现有标注
                this.getAllCamera();//摄像头现有标注
                this.overView();//鹰眼
                // this.rangeSearch();// 范围查找
                this.getAllRoute();//调度路线
                this.getAllAlarmEvent();//告警事件现有标注
                //this.getAllTransportRoute();// 车船调度路线输出
                //this.getAllStation();
                this.getAllVehicle();// 车船信息
                // this.heatEmShow=true
                // this.heatEm();//环境数据
                this.getAllPerson();
            } else if (route.includes('area-deploy')) {
                if(!this.getLocationId){
                    this.getAllArea();// 片区输出
                    this.district(); // 片区打点
                }else {
                    this.getAllAreaEdit();// 片区输出修改
                }
            } else if (route.includes('roat-deploy')) {
                if(!this.getLocationId){
                    this.getAllRoat();// 路线输出
                    this.road(); // 路线打点
                }else {
                    this.getAllRoatedit();//修改路线
                }
            }else if (route.includes('security-Dmis')) {
                if(!this.getLocationId){
                    this.getSecurityRoute();// 调度路线输出
                    this.road(); // 路线打点
                }else {
                    this.getSecurityRouteEdit();//修改路线调度
                }
            } else if (route.includes('indicator-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllIndicator();//指示牌现有标注
                    this.labelDot();// 指示牌打点
                }else {
                    this.getAllIndicatorEdit();// 指示牌修改
                }
            }else if (route.includes('station-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getStation();//站点现有标注
                    this.labelDot();// 站点打点
                }else {
                    this.getAllStationEdit();// 站点修改
                }
            } else if (route.includes('transport-Dmis')) {
                if(!this.getLocationId){
                    this.getTransportRoute(); //车船调度路线输出
                    this.getStation(); //站点现有标注
                    this.road(); // 路线打点
                }else {
                    this.getStation();
                    this.getAllTransportRouteEdit();//修改车船路线调度
                    this.road();
                }
            } else if (route.includes('trash-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllTrash();//垃圾桶现有标注
                    this.labelDot();// 垃圾桶打点
                }else {
                    this.getAllTrashEdit();// 垃圾桶修改
                }
            } else if (route.includes('scenic-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllScenic();//景点现有标注
                    this.labelDot();// 景点打点
                }else {
                    this.getAllScenicEdit();// 景点修改
                }
            } else if (route.includes('shop-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllShop();//商圈现有标注
                    this.labelDot();// 商圈打点
                }else {
                    this.getAllShopEdit();// 商圈修改
                }
            } else if (route.includes('park-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllPark();//停车场现有标注
                    this.labelDot();// 停车场打点
                }else {
                    this.getAllParkEdit();// 停车场修改
                }
            }else if (route.includes('toilet-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllToilet();//卫生间现有标注
                    this.labelDot();// 卫生间打点
                }else {
                    this.getAllToiletEdit();// 卫生间修改
                }
            }else if (route.includes('lampLight-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllLight();//路灯现有标注
                    this.labelDot();// 路灯打点
                }else {
                    this.getAllLightEdit();// 路灯修改
                }
            }else if (route.includes('gate-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllGate();//闸机现有标注
                    this.labelDot();// 闸机打点
                }else {
                    this.getAllGateEdit();// 闸机修改
                }
            }else if (route.includes('wifi-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllWifi();//wifi现有标注
                    this.labelDot();// wifi打点
                }else {
                    this.getAllWifiEdit();// wifi修改
                }
            }else if (route.includes('led-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllLed();//Led现有标注
                    this.labelDot();// Led打点
                }else {
                    this.getAllLedEdit();// Led修改
                }
            }else if (route.includes('police-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllPolice();//报警柱现有标注
                    this.labelDot();// 报警柱打点
                }else {
                    this.getAllPoliceEdit();// 报警柱修改
                }
            }else if (route.includes('monitors-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllMonitor();//环境监测传感器现有标注
                    this.labelDot();// 传感器打点
                }else {
                    this.getAllMonitorEdit();// 环境监测传感器修改
                }
            }else if (route.includes('broadcast-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllBroadcast();//广播现有标注
                    this.labelDot();// 广播打点
                }else {
                    this.getAllBroadcastEdit();// 广播修改
                }
            }else if (route.includes('camera-Hware'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllCamera();//摄像头现有标注
                    this.labelDot();// 摄像头打点
                }else {
                    this.getAllCameraEdit();// 摄像头修改
                }
            }else if (route.includes('plant-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllTree();//植物现有标注
                    this.labelDot();// 植物打点
                }else {
                    this.getAllTreeEdit();// 植物修改
                }
            }else if (route.includes('construction-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllBuild();//建筑现有标注
                    this.labelDot();// 建筑打点
                }else {
                    this.getAllBuildEdit();// 建筑修改
                }
            }
            if(this.getSearchInfo.id){
                this.searchShow();
            }
        },
        methods:{
            ...mapMutations([
                'MAP_LOCATION',
                'MAP_REGION_LOCATION',
                'REGION_LOCATION_STATE',
                'ROAT_LOCATION_STATE',
                'MAP_ROAT_LOCATION'
            ]),
            closeDialog () {
                this.visible = false
                this.cameravisible = false
                this.ledvisible = false
                this.AlarmDetailShow = false
                this.carcameravisible=false
                let route = this.$route.path
                if (route.includes('facility')) {
                    $("#contextmenu_container").hide();
                }
            },
            saveEditInfo(param){ //编辑保存
                if(this.isBatchEdit){
                    this.updateAlarmEvent(param.data)
                }else{
                    this.addUpload(param)
                }
            },
            addUpload(param){
                let objArray = param.data
                let fileAddList = param.fileAddList
                let params = []
                if(fileAddList.length > 0){
                    fileAddList.forEach((item)=>{
                        var data = new FormData();
                        data.append('f1',item);
                        params.push(this.uploadFile(data));

                    })
                    console.log(params)
                    Promise.all(params).then((result)=>{
                        console.log(result)
                        objArray[0].attachmentIds = objArray[0].attachmentIds.concat(result.map(item=>item.id))
                        this.updateParams = objArray

                    }).then(objArray=>{
                        this.updateAlarmEvent(this.updateParams)
                    })
                }else{
                    this.updateAlarmEvent(objArray)
                }
            },
            async updateAlarmEvent(objArray){
                await api.alarm.updateAlarmEvent(objArray).then(res => {
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.choseInfos = []
                    this.AlarmDetailShow = false
                    this.getAllAlarmEvent();
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                    console.log(err)
                    this.choseInfos = []
                })
            },
            requestGisMain() {
                document.getElementById('map').innerHTML = ""
                $.ajax({
                    type: "get",
                    url: "/static/xxsd_mapData.json",
                    async: false,
                    success: function(data) {
                        console.log(data);
                        var obj = data.data;
                        var mapdata = {
                            "olTileX": obj.olTileX,
                            "olTileY": obj.olTileY,
                            "centerX": obj.sceinitx,//120.07951802513782
                            "centerY": obj.sceinity,//30.267776483960148
                            "path": "http://img.weyoo.cn/map/map_sec_zhejiang0152/map{z}/{x},{y}.jpg",
                            "curZoom": obj.scefit + obj.initlevel,
                            "minZoom": obj.scefit,
                            "maxZoom": obj.scefit + obj.zoom - 1
                        }
                        droreMap.init(mapdata, data.data,'map');
                        let Circle = new droreMap.geom.Circle()
                        Circle.setCenter([0,0],0);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            },
            labelDot(){//打点标注
                let that = this
                var icon = new droreMap.icon.Marker({
                    coordinate: [0,0],
                    name:  "标注",
                    subtype: "labelDot",
                    id: "12214_",
                    url: "/static/img/icon/location.png",
                });
                droreMap.icon.addChild(icon);
                droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                    droreMap.interaction.ifDrag = true;
                    icon.setPosition(evt.coordinate)
                    console.log(evt.coordinate)
                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                })
                droreMap.event.DragEvent(function(tabInfor) {
                    var data = tabInfor.data
                    if(data.data.id === '12214_'){
                        console.log(droreMap.trans.transLayerToWgs(data.end));
                        that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                    }
                })
            },

            async getAllVehicleGps(){
                return await api.boat.getAllVehicleGps()
            },
            async getAllVehicle(){ //车船
                //具体的车船信息，包括关联的人员信息
                Promise.all([this.getAllVehicleGps()]).then(result=>{
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
                    //         //null,
                    //             {
                    //                 "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                    //                 "ioTDeviceId": null,
                    //                 "createTime": "2017-12-31 12:21:39",
                    //                 "longitude": 120.13310087077178,
                    //                 "latitude": 30.30729423238902,
                    //                 "altitude": null,
                    //                 "direction": null,
                    //                 "speed": 4,
                    //                 "telephone": null,
                    //                 "deviceNum": null,
                    //                 "coordinate": null
                    //             },
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
                    // ]
                    if(vehicles.length > 0){
                        vehicles.forEach(obj=>{
                            let latitude = ''
                            let longitude = ''
                            // var latitude = 30.121381873225815+Math.random()*0.01
                            // var longitude = 120.20690542885497+Math.random()*0.01
                            if(obj.gpsData){
                                latitude = obj.gpsData.latitude+0.49693734262853-0.0025647127,
                                longitude = obj.gpsData.longitude+0.451536705535+0.0048011541
                            }
                            obj.status=obj.gpsData ? "ONLINE" : "OFFLINE";
                            obj.location=[longitude,latitude];
                            var icon = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(obj.location),
                                name:obj.vehicle.serialNum,
                                subtype:obj.vehicle.type == 0 ? 'car':'boat',
                                id:obj.vehicle.id,
                                url:obj.vehicle.type == 0 ?'/static/img/icon/bus_small.png':'/static/img/icon/boat_small.png',
                                type:'transport',
                                status:obj.gpsData ? "ONLINE" : "OFFLINE",
                                description:obj.vehicle.description,
                                driver:obj.driver,
                                gpsData:obj.gpsData,
                                vehicle:obj.vehicle,
                                data:obj,
                            });
                            droreMap.icon.addChild(icon);
                            icon.showName=true
                            droreMap.icon.showLayer(icon.id,false);
                            let that = this;
                            icon.onclick(function (e) {
                                that.menulist = e.data;

                                var div = document.getElementById('contextmenu_container')
                                var popup = new  droreMap.pop.Popup(div,droreMap.trans.transFromWgsToLayer([longitude,latitude]),"contextmenu_container")
                                droreMap.pop.addChild(popup,e.data.id);
                                $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                                if(e.data.status =="FAULT"){
                                    that.open=false
                                }else if(e.data.status =="OFFLINE"){
                                    that.open=false
                                }else {
                                    that.open= true
                                }
                                $("#contextmenu_container").show();
                            });
                        })
                    }
                })
                setTimeout(() => {
                    this.getAllLangVehicle();//长轮询
                },5000)
            },
            async getAllLangVehicle(){ //车船轮询
                //具体的车船信息，包括关联的人员信息
                Promise.all([this.getAllVehicleGps()]).then(result=>{
                    let vehicles = result[0]
                    if(vehicles.length > 0){
                        vehicles.forEach(obj=>{
                            // var latitude = obj.gpsData.latitude+Math.random()*0.01
                            // var longitude = obj.gpsData.longitude+Math.random()*0.01
                            let latitude = ''
                            let longitude = ''
                            if(obj.gpsData){
                                latitude = obj.gpsData.latitude+0.49693734262853-0.0025647127,
                                longitude = obj.gpsData.longitude+0.451536705535+0.0048011541
                            }
                            obj.location=[longitude,latitude];
                            let layer = droreMap.icon.returnLayer(obj.vehicle.id)
                            layer.setPosition(droreMap.trans.transFromWgsToLayer(obj.location))
                            if(this.menulist.id == obj.vehicle.id){
                                let Popup = droreMap.pop.returnPopup(obj.vehicle.id)
                                if(Popup!=undefined){
                                    Popup.setPosition(droreMap.trans.transFromWgsToLayer(obj.location))
                                }
                            }
                            let that = this;
                            layer.onclick(function (e) {
                                that.menulist = e.data;
                                var div = document.getElementById('contextmenu_container')
                                var popup = new  droreMap.pop.Popup(div,droreMap.trans.transFromWgsToLayer([longitude,latitude]),"contextmenu_container")
                                droreMap.pop.addChild(popup,e.data.id);
                                $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                                if(e.data.status =="FAULT"){
                                    that.open=false
                                }else if(e.data.status =="OFFLINE"){
                                    that.open=false
                                }else {
                                    that.open= true
                                }
                                $("#contextmenu_container").show();
                            });
                        })
                    }
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler')) {
                        this.getAllLangVehicle();//长轮询
                    }
                },5000)
            },
            async getStation(){ //站点
                await api.station.getAllStation().then(res=>{
                    if(this.getTransportType == '0'){
                        this.iconList=res.filter(item=>{
                            if(item.type == '0'){
                                return true
                            }
                        })
                    }else if(this.getTransportType == '1'){
                        this.iconList=res.filter(item=>{
                            if(item.type == '1'){
                                return true
                            }
                        })
                    }

                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].type == "0"){
                            this.iconList[i].type == "车站"
                            this.iconList[i].subtype = "station"
                            this.iconList[i].url="/static/img/icon/station_check.png"
                        }else if(this.iconList[i].type == "1"){
                            this.iconList[i].type == "码头"
                            this.iconList[i].subtype = "landing"
                            this.iconList[i].url="/static/img/icon/landing_check.png"
                        }
                    }
                    this.iconShow();
                }).catch(err=>{
                    console.log(err)
                })
            },
            async getAllStation(){ //站点
                await api.station.getAllStation().then(res=>{
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].type == "0"){
                            // //假数据
                            // this.iconList[i].type == "transport"
                            // this.iconList[i].subtype = "car"
                            this.iconList[i].type ="车站"
                            this.iconList[i].subtype = "station"
                            this.iconList[i].url="/static/img/icon/station_check.png"
                        }else if(this.iconList[i].type == "1"){
                            // //假数据
                            // this.iconList[i].type == "transport"
                            // this.iconList[i].subtype = "boat"
                            this.iconList[i].type = "码头"
                            this.iconList[i].subtype = "landing"
                            this.iconList[i].url="/static/img/icon/landing_check.png"
                        }
                    }
                    this.iconShow();
                }).catch(err=>{
                    console.log(err)
                })
            },
            async getAllStationEdit(){//站点修改
                await api.station.getAllStation().then(res => {
                    if(this.getTransportType == '0'){
                        this.stationList=res.filter(item=>{
                            if(item.type == '0'){
                                return true
                            }
                        })
                    }else if(this.getTransportType == '1'){
                        this.stationList=res.filter(item=>{
                            if(item.type == '1'){
                                return true
                            }
                        })
                    }

                    for (let i = 0; i < this.stationList.length; i++) {
                        if(this.stationList[i].id === this.getLocationId){
                            this.stationList[i].location = [this.stationList[i].longitude,this.stationList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.stationList[i].location),
                                name: this.stationList[i].name,
                                subtype: this.stationList[i].type=='0'?"station":"landing",
                                id: this.stationList[i].id,
                                url: this.stationList[i].type=='0'?"/static/img/icon/station_edit.png":"/static/img/icon/landing_edit.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else{
                            this.stationList[i].location = [this.stationList[i].longitude,this.stationList[i].latitude];
                            var urlImage = ''
                            console.log(this.stationList[i].type)
                            if(this.stationList[i].type=='0'){
                                urlImage = "/static/img/icon/station_check.png"
                            }else{
                                urlImage = "/static/img/icon/landing_check.png"
                            }
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.stationList[i].location),
                                name: this.stationList[i].name,
                                subtype: this.stationList[i].type=='0'?"station":"landing",
                                id: this.stationList[i].id,
                                // url:this.stationList[i].type=='0'?"/static/img/icon/station_check.png":"/static/img/icon/landing_check.png"
                                url:urlImage
                            });
                            console.log(icon1)
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            async getTransportRoute(){
                console.log(this.getTransportType)
                await api.roat.getTransportRoat(this.getTransportType == '0'?2:3).then(res=>{
                    for (var i = 0; i < res.length; i++) {
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#26bbf0', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        let route = this.$route.path
                        if(route.includes('controler')){
                            droreMap.road.removeStyleById(res[i].id,false)
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            async getAllTransportRoute(){
                console.log(this.getTransportType)
                Promise.all([this.getTransportRouteCar(),this.getTransportRouteBoat()]).then(result=>{
                    let res = result[0].concat(result[1])
                    for (var i = 0; i < res.length; i++) {
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#26bbf0', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        let route = this.$route.path
                        if(route.includes('controler')){
                            droreMap.road.removeStyleById(res[i].id,false)
                        }
                    }
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
            async getAllTransportRouteEdit () {
                await api.roat.getTransportRoat(this.getTransportType == '0'?2:3).then(res => {
                    for (var i = 0; i < res.length; i++) {
                        if(res[i].id === this.getLocationId){
                            var areaEvts =new droreMap.road.RoadLayer('ROUTE_show', 'red', 'red')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvts.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvts,res[i].id)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        }
                    }
                    let that =this
                    areaEvts.ifModify = true;
                    areaEvts.ifSelect = true;
                    areaEvts.addEventListener('select', "select", function(e) {
                        if(e.select){
                            that.$store.commit('ROAT_LOCATION_STATE', false)
                            if(e.select.type == 'Point') {
                                //点击路网中的点，出现面板，包括延长、拆分和关键点
                                alert('请点击路网进行拖拽编辑！')
                            }
                        }else if(e.unSelect){
                            let arrayObj = new Array();
                            for (var i = 0; i < e.unSelect.area.length; i++) {
                                let wgs = droreMap.trans.transLayerToWgs(e.unSelect.area[i])
                                arrayObj.push(wgs);
                            }
                            console.log(arrayObj);
                            that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                            that.$store.commit('ROAT_LOCATION_STATE', true)
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllIndicator () {//指示牌
                await api.indicator.getAllIndicator().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].id=this.iconList[i].signboardBean.id
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/indicator.png"
                        this.iconList[i].subtype='indicator'
                        this.iconList[i].type='指示牌'
                        if(this.iconList[i].signboardBean.type=='0'){
                            this.iconList[i].name='标语';
                        }else if(this.iconList[i].signboardBean.type=='1'){
                            this.iconList[i].name='路线';
                        }else {
                            this.iconList[i].name='设施';
                        }
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err)
                })
            },

            async getAllIndicatorEdit () {//指示牌修改
                await api.indicator.getAllIndicator().then(res => {
                    this.indicatorList = res
                    for (let i = 0; i < this.indicatorList.length; i++) {
                        if(this.indicatorList[i].signboardBean.type=='0'){
                            this.indicatorList[i].name='标语';
                        }else if(this.indicatorList[i].signboardBean.type=='1'){
                            this.indicatorList[i].name='路线';
                        }else {
                            this.indicatorList[i].name='设施';
                        }
                        if(this.indicatorList[i].signboardBean.id === this.getLocationId){
                            this.indicatorList[i].location = [this.indicatorList[i].longitude,this.indicatorList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.indicatorList[i].location),
                                name: this.indicatorList[i].name,
                                subtype: "indicator",
                                id: this.indicatorList[i].signboardBean.id,
                                url: "/static/img/icon/indicator_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else{
                            this.indicatorList[i].location = [this.indicatorList[i].longitude,this.indicatorList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.indicatorList[i].location),
                                name: this.indicatorList[i].name,
                                subtype: "indicator",
                                id: this.indicatorList[i].signboardBean.id,
                                url:"/static/img/icon/indicator.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            async getAllTrash () { //垃圾桶现有标注
                await api.dustbin.getAllDustbin().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="垃圾桶"
                        this.iconList[i].id=this.iconList[i].dustbinBean.id
                        this.iconList[i].name =this.iconList[i].dustbinBean.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/trash.png"
                        this.iconList[i].subtype='trash'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            async getAllTrashEdit () { //垃圾桶现有标注修改
                await api.dustbin.getAllDustbin().then(res => {
                    this.trashList = res
                    for (let i = 0; i < this.trashList.length; i++) {
                        if(this.trashList[i].dustbinBean.id === this.getLocationId){
                            this.trashList[i].location = [this.trashList[i].longitude,this.trashList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.trashList[i].location),
                                name: this.trashList[i].dustbinBean.name,
                                subtype: "trash",
                                id: this.trashList[i].dustbinBean.id,
                                url: "/static/img/icon/trash_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else{
                            this.trashList[i].location = [this.trashList[i].longitude,this.trashList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.trashList[i].location),
                                name: this.trashList[i].dustbinBean.name,
                                subtype: "trash",
                                id: this.trashList[i].dustbinBean.id,
                                url: "/static/img/icon/trash.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            async getAllScenic () {//景点列表
                await api.scenic.getAllScenic().then((res) => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="景点"
                        this.iconList[i].id=this.iconList[i].scenicspotBean.id
                        this.iconList[i].name =this.iconList[i].scenicspotBean.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/scenic.png"
                        this.iconList[i].subtype='scenic'
                    }
                    this.iconShow();
                }).catch((err)=> {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            async getAllScenicEdit () {//景点列表修改
                await api.scenic.getAllScenic().then((res) => {
                    this.scenicList = res
                    for (let i = 0; i < this.scenicList.length; i++) {
                        if(this.scenicList[i].scenicspotBean.id === this.getLocationId){
                            this.scenicList[i].location = [this.scenicList[i].longitude,this.scenicList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.scenicList[i].location),
                                name: this.scenicList[i].scenicspotBean.name,
                                subtype: "scenic",
                                id: this.scenicList[i].scenicspotBean.id,
                                url: "/static/img/icon/scenic_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.scenicList[i].location = [this.scenicList[i].longitude, this.scenicList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.scenicList[i].location),
                                name: this.scenicList[i].scenicspotBean.name,
                                subtype: "scenic",
                                id: this.scenicList[i].scenicspotBean.id,
                                url: "/static/img/icon/scenic.png"
                            });
                            droreMap.icon.addChild(icon1)
                        }
                    }
                }).catch((err)=> {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            async getAllShop () { //商圈列表
                await api.shop.getAllShop().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="商圈"
                        this.iconList[i].id=this.iconList[i].businessBean.id
                        this.iconList[i].name =this.iconList[i].businessBean.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/shop.png"
                        this.iconList[i].subtype='shop'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err)
                })
            },
            async getAllShopEdit () { //商圈列表
                await api.shop.getAllShop().then(res => {
                    this.shopList = res
                    for (let i = 0; i < this.shopList.length; i++) {
                        if(this.shopList[i].businessBean.id === this.getLocationId){
                            this.shopList[i].location = [this.shopList[i].longitude,this.shopList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.shopList[i].location),
                                name: this.shopList[i].businessBean.name,
                                subtype: "shop",
                                id: this.shopList[i].businessBean.id,
                                url: "/static/img/icon/shop_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.shopList[i].location = [this.shopList[i].longitude, this.shopList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.shopList[i].location),
                                name: this.shopList[i].businessBean.name,
                                subtype: "shop",
                                id: this.shopList[i].businessBean.id,
                                url: "/static/img/icon/shop.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            async getAllPark () {//停车场列表
                await api.park.getAllPark().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="停车场"
                        this.iconList[i].id=this.iconList[i].parkingBean.id
                        this.iconList[i].name =this.iconList[i].parkingBean.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/park.png"
                        this.iconList[i].subtype='park'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err)
                })
            },
            async getAllParkEdit () {//停车场列表
                await api.park.getAllPark().then(res => {
                    this.parkList = res
                    for (let i = 0; i < this.parkList.length; i++) {
                        if(this.parkList[i].parkingBean.id === this.getLocationId){
                            this.parkList[i].location = [this.parkList[i].longitude,this.parkList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.parkList[i].location),
                                name: this.parkList[i].parkingBean.name,
                                subtype: "park",
                                id: this.parkList[i].parkingBean.id,
                                url: "/static/img/icon/park_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.parkList[i].location = [this.parkList[i].longitude, this.parkList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.parkList[i].location),
                                name: this.parkList[i].parkingBean.name,
                                subtype: "park",
                                id: this.parkList[i].parkingBean.id,
                                url: "/static/img/icon/park.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            async getAllToilet () {//卫生间列表
                await api.toilet.getAllToilet().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="卫生间"
                        this.iconList[i].id=this.iconList[i].toiletBean.id
                        this.iconList[i].name =this.iconList[i].toiletBean.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/toilet.png"
                        this.iconList[i].subtype='toilet'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllToiletEdit () {//卫生间列表修改
                await api.toilet.getAllToilet().then(res => {
                    this.toiletList = res
                    for (let i = 0; i < this.toiletList.length; i++) {
                        if(this.toiletList[i].toiletBean.id === this.getLocationId){
                            this.toiletList[i].location = [this.toiletList[i].longitude,this.toiletList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.toiletList[i].location),
                                name: this.toiletList[i].toiletBean.name,
                                subtype: "toilet",
                                id: this.toiletList[i].toiletBean.id,
                                url: "/static/img/icon/toilet_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.toiletList[i].location = [this.toiletList[i].longitude, this.toiletList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.toiletList[i].location),
                                name: this.toiletList[i].toiletBean.name,
                                subtype: "toilet",
                                id: this.toiletList[i].toiletBean.id,
                                url: "/static/img/icon/toilet.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllLight(){//路灯列表
                await api.light.getAllLight().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="路灯"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].status =="FAULT"){
                            this.iconList[i].url="/static/img/icon/Light_damage.png"
                            this.iconList[i].subtype='Light_damage'
                        } else if(this.iconList[i].status =="OFFLINE") {
                            this.iconList[i].url="/static/img/icon/Light_close.png"
                            this.iconList[i].subtype='Light_close'
                        }else {
                            this.iconList[i].url="/static/img/icon/Light.png"
                            this.iconList[i].subtype='Light'
                        }
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllLightEdit(){//路灯列表修改
                await api.light.getAllLight().then((res)=>{
                    this.lightList=res.devices
                    for (let i=0;i<this.lightList.length;i++){
                        if(this.lightList[i].status ==="FAULT"){
                            this.lightList[i].url="/static/img/icon/Light_damage.png"
                            this.lightList[i].subtype='Light_damage'
                        } else if(this.lightList[i].status ==="OFFLINE") {
                            this.lightList[i].url="/static/img/icon/Light_close.png"
                            this.lightList[i].subtype='Light_close'
                        }else {
                            this.lightList[i].url="/static/img/icon/Light.png"
                            this.lightList[i].subtype='Light'
                        }
                        if(this.lightList[i].id === this.getLocationId){
                            this.lightList[i].location = [this.lightList[i].longitude,this.lightList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.lightList[i].location),
                                name: this.lightList[i].name,
                                subtype:this.lightList[i].subtype,
                                id: this.lightList[i].id,
                                url: "/static/img/icon/light_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.lightList[i].location = [this.lightList[i].longitude,this.lightList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.lightList[i].location),
                                name: this.lightList[i].name,
                                subtype: this.lightList[i].subtype,
                                id: this.lightList[i].id,
                                url: this.lightList[i].url
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },

            async getAllGate(){//闸机列表
                await api.gate.getAllGate().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="闸机"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/gate.png"
                        this.iconList[i].subtype='gate'
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllGateEdit(){//闸机列表修改
                await api.gate.getAllGate().then((res)=>{
                    this.gateList=res.devices
                    for (let i=0;i<this.gateList.length;i++){
                        if(this.gateList[i].id === this.getLocationId){
                            this.gateList[i].location = [this.gateList[i].longitude,this.gateList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.gateList[i].location),
                                name: this.gateList[i].name,
                                subtype: "gate",
                                id: this.gateList[i].id,
                                url: "/static/img/icon/gate_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.gateList[i].location = [this.gateList[i].longitude,this.gateList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.gateList[i].location),
                                name: this.gateList[i].name,
                                subtype: "gate",
                                id: this.gateList[i].id,
                                url: "/static/img/icon/gate.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllWifi(){//wifi列表
                await api.wifi.getAllWifi().then((res)=>{
                    this.iconList=res.devices
                    this.iconList.forEach(item => {
                        item.type="wifi"
                        item.location = [item.longitude,item.latitude]
                        if(item.status =="FAULT"){
                            item.url="/static/img/icon/wifi_damage.png"
                            item.subtype='wifi_damage'
                        } else if(item.status =="OFFLINE") {
                            item.url="/static/img/icon/wifi_close.png"
                            item.subtype='wifi_close'
                        }else {
                            item.url="/static/img/icon/wifi.png"
                            item.subtype='wifi'
                        }
                    })
                    this.iconShow();
                 }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllWifiEdit(){//wifi列表修改
                await api.wifi.getAllWifi().then((res)=>{
                    this.wifiList=res.devices
                    for(let i=0;i<this.wifiList.length;i++){
                        if(this.wifiList[i].status =="FAULT"){
                            this.wifiList[i].url="/static/img/icon/wifi.png"
                            this.wifiList[i].subtype='wifi'
                        } else if(this.wifiList[i].status =="OFFLINE"){
                            this.wifiList[i].url="/static/img/icon/wifi_close.png"
                            this.wifiList[i].subtype='wifi_close'
                        }else {
                            this.wifiList[i].url="/static/img/icon/wifi.png"
                            this.wifiList[i].subtype='wifi'
                        }
                        if(this.wifiList[i].id === this.getLocationId){
                            this.wifiList[i].location = [this.wifiList[i].longitude,this.wifiList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.wifiList[i].location),
                                name: this.wifiList[i].name,
                                subtype: this.wifiList[i].subtype,
                                id: this.wifiList[i].id,
                                url: "/static/img/icon/wifi_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.wifiList[i].location = [this.wifiList[i].longitude, this.wifiList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.wifiList[i].location),
                                name: this.wifiList[i].name,
                                subtype:this.wifiList[i].subtype,
                                id: this.wifiList[i].id,
                                url: this.wifiList[i].url
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllLed(){//Led列表
                await api.led.getAllLed().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="大屏"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].status =="FAULT"){
                            this.iconList[i].url="/static/img/icon/monitors_damage.png"
                            this.iconList[i].subtype='led_damage'
                        } else if(this.iconList[i].status =="OFFLINE") {
                            this.iconList[i].url="/static/img/icon/led_close.png"
                            this.iconList[i].subtype='led_close'
                        }else {
                            this.iconList[i].url="/static/img/icon/led.png"
                            this.iconList[i].subtype='led'
                        }
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllLedEdit(){//Led列表修改
                await api.led.getAllLed().then((res)=>{
                    this.ledList=res.devices
                    for (let i=0;i<this.ledList.length;i++){
                        if(this.ledList[i].status =="FAULT"){
                            this.ledList[i].url="/static/img/icon/led_damage.png"
                            this.ledList[i].subtype='led_damage'
                        } else  if(this.ledList[i].status =="OFFLINE"){
                            this.ledList[i].url="/static/img/icon/led_close.png"
                            this.ledList[i].subtype='led_close'
                        }else {
                            this.ledList[i].url="/static/img/icon/led.png"
                            this.ledList[i].subtype='led'
                        }
                        if(this.ledList[i].id === this.getLocationId){
                            this.ledList[i].location = [this.ledList[i].longitude,this.ledList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.ledList[i].location),
                                name: this.ledList[i].name,
                                subtype: this.ledList[i].subtype,
                                id: this.ledList[i].id,
                                url: "/static/img/icon/led_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.ledList[i].location = [this.ledList[i].longitude,this.ledList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.ledList[i].location),
                                name: this.ledList[i].name,
                                subtype: this.ledList[i].subtype,
                                id: this.ledList[i].id,
                                url:  this.ledList[i].url,
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllPolice(){//报警柱列表
                await api.police.getAllPolice().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="报警柱"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/police.png"
                        this.iconList[i].subtype='police'
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllPoliceEdit(){//报警柱列表修改
                await api.police.getAllPolice().then((res)=>{
                    this.policeList=res.devices
                    for (let i=0;i<this.policeList.length;i++){
                        if(this.policeList[i].id === this.getLocationId){
                            this.policeList[i].location = [this.policeList[i].longitude,this.policeList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.policeList[i].location),
                                name: this.policeList[i].name,
                                subtype: "police",
                                id: this.policeList[i].id,
                                url:  "/static/img/icon/police_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.policeList[i].location = [this.policeList[i].longitude, this.policeList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.policeList[i].location),
                                name: this.policeList[i].name,
                                subtype: "police",
                                id: this.policeList[i].id,
                                url: "/static/img/icon/police.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllMonitor(){ //环境监测列表
                await api.monitor.getAllMonitor().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="传感器"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].status =="FAULT"){
                            this.iconList[i].url="/static/img/icon/monitors_damage.png"
                            this.iconList[i].subtype='Monitors_damage'
                        } else if(this.iconList[i].status =="OFFLINE") {
                            this.iconList[i].url="/static/img/icon/monitors_close.png"
                            this.iconList[i].subtype='Monitors_close'
                        }else {
                            this.iconList[i].url="/static/img/icon/monitors.png"
                            this.iconList[i].subtype='Monitors'
                        }
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllMonitorEdit(){ //环境监测列表修改
                await api.monitor.getAllMonitor().then((res)=>{
                    this.monitorsList=res.devices
                    for (let i=0;i<this.monitorsList.length;i++){
                        if(this.monitorsList[i].status =="FAULT"){
                            this.monitorsList[i].url="/static/img/icon/monitors_damage.png"
                            this.monitorsList[i].subtype='Monitors_damage'
                        } else  if(this.monitorsList[i].status =="OFFLINE"){
                            this.monitorsList[i].url="/static/img/icon/monitors_close.png"
                            this.monitorsList[i].subtype='Might_close'
                        }else {
                            this.monitorsList[i].url="/static/img/icon/monitors.png"
                            this.monitorsList[i].subtype='Monitors'
                        }
                        if(this.monitorsList[i].id === this.getLocationId){
                            this.monitorsList[i].location = [this.monitorsList[i].longitude,this.monitorsList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.monitorsList[i].location),
                                name: this.monitorsList[i].name,
                                subtype: this.monitorsList[i].subtype,
                                id: this.monitorsList[i].id,
                                url: "/static/img/icon/monitors_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.monitorsList[i].location = [this.monitorsList[i].longitude, this.monitorsList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.monitorsList[i].location),
                                name: this.monitorsList[i].name,
                                subtype: this.monitorsList[i].subtype,
                                id: this.monitorsList[i].id,
                                url: this.monitorsList[i].url
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllBroadcast(){//广播列表
                await api.broadcast.getAllBroadcast().then((res)=>{
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="广播"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].status =="FAULT"){
                            this.iconList[i].url="/static/img/icon/broadcast_damage.png"
                            this.iconList[i].subtype='broadcast_damage'
                        } else if(this.iconList[i].status =="OFFLINE") {
                            this.iconList[i].url="/static/img/icon/broadcast_close.png"
                            this.iconList[i].subtype='broadcast_close'
                        }else {
                            this.iconList[i].url="/static/img/icon/broadcast.png"
                            this.iconList[i].subtype='broadcast'
                        }
                    }
                    this.iconShow();
                }).catch((err)=>{
                    console.log(err)
                    this.isShowLoading=false
                })
            },
            async getAllBroadcastEdit(){//广播列表修改
                await api.broadcast.getAllBroadcast().then((res)=>{
                    this.broadList=res.devices
                    for (let i=0;i<this.broadList.length;i++) {
                        if(this.broadList[i].status =="FAULT"){
                            this.broadList[i].url="/static/img/icon/broadcast_damage.png"
                            this.broadList[i].subtype='broadcast_damage'
                        }else if(this.broadList[i].status =="OFFLINE"){
                            this.broadList[i].url="/static/img/icon/broadcast_close.png"
                            this.broadList[i].subtype='broadcast_close'
                        }else {
                            this.broadList[i].url="/static/img/icon/broadcast.png"
                            this.broadList[i].subtype='broadcast'
                        }
                        if(this.broadList[i].id === this.getLocationId){
                            this.broadList[i].location = [this.broadList[i].longitude,this.broadList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.broadList[i].location),
                                name: this.broadList[i].name,
                                subtype: this.broadList[i].subtype,
                                id: this.broadList[i].id,
                                url: "/static/img/icon/broadcast_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.broadList[i].location = [this.broadList[i].longitude, this.broadList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.broadList[i].location),
                                name: this.broadList[i].name,
                                subtype: this.broadList[i].subtype,
                                id: this.broadList[i].id,
                                url:this.broadList[i].url,
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.isShowLoading=false
                })
            },
            async getAllCamera () {//摄像头列表
                await api.camera.getAllCamera().then((res) => {
                    this.iconList=res.devices
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="摄像头"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].status =="FAULT"){
                            this.iconList[i].url="/static/img/icon/camera_damage.png"
                            this.iconList[i].subtype='camera_damage'
                        } else if(this.iconList[i].status =="OFFLINE") {
                            this.iconList[i].url="/static/img/icon/camera_close.png"
                            this.iconList[i].subtype='camera_close'
                        }else {
                            this.iconList[i].url="/static/img/icon/camera.png"
                            this.iconList[i].subtype='camera'
                        }
                    }
                    this.iconShow();
                }).catch((err)=> {
                    console.log(err)
                })
            },
            async getAllCameraEdit () {//摄像头列表修改
                await api.camera.getAllCamera().then((res) => {
                    this.cameraList = res.devices
                    for (let i=0; i < this.cameraList.length; i++) {
                        if(this.cameraList[i].status =="FAULT"){
                            this.cameraList[i].url="/static/img/icon/camera_damage.png"
                            this.cameraList[i].subtype='camera_damage'
                        } else if(this.cameraList[i].status =="OFFLINE") {
                            this.cameraList[i].url="/static/img/icon/camera_close.png"
                            this.cameraList[i].subtype='camera_close'
                        }else {
                            this.cameraList[i].url="/static/img/icon/camera.png"
                            this.cameraList[i].subtype='camera'
                        }
                        if(this.cameraList[i].id === this.getLocationId){
                            this.cameraList[i].location = [this.cameraList[i].longitude,this.cameraList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.cameraList[i].location),
                                name: this.cameraList[i].name,
                                subtype: this.cameraList[i].subtype,
                                id: this.cameraList[i].id,
                                url: "/static/img/icon/camera_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.cameraList[i].location = [this.cameraList[i].longitude, this.cameraList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.cameraList[i].location),
                                name: this.cameraList[i].name,
                                subtype: this.cameraList[i].subtype,
                                id: this.cameraList[i].id,
                                url: this.cameraList[i].url,
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch((err)=> {
                    console.log(err)
                })
            },
            async getAllTree () { //植物现有展示
                await api.plant.getAllPlant().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="植物"
                        this.iconList[i].id=this.iconList[i].plant.id
                        this.iconList[i].name =this.iconList[i].plant.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/plant.png"
                        this.iconList[i].subtype='plant'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllTreeEdit () { //植物现有展示修改
                await api.plant.getAllPlant().then(res => {
                    this.treeList = res
                    for (let i = 0; i < this.treeList.length; i++) {
                        if(this.treeList[i].plant.id === this.getLocationId){
                            this.treeList[i].location = [this.treeList[i].longitude,this.treeList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.treeList[i].location),
                                name: this.treeList[i].plant.name,
                                subtype: "plant",
                                id: this.treeList[i].plant.id,
                                url: "/static/img/icon/plant_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.treeList[i].location = [this.treeList[i].longitude, this.treeList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.treeList[i].location),
                                name: this.treeList[i].plant.name,
                                subtype: "plant",
                                id: this.treeList[i].plant.id,
                                url:"/static/img/icon/plant.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllBuild () {//建筑标注展示
                await api.build.getAllBuild().then(res => {
                    this.iconList=res
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="建筑"
                        this.iconList[i].id=this.iconList[i].building.id
                        this.iconList[i].name =this.iconList[i].building.name
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        this.iconList[i].url="/static/img/icon/construction.png"
                        this.iconList[i].subtype='construction'
                    }
                    this.iconShow();
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllBuildEdit () {//建筑标注展示修改
                await api.build.getAllBuild().then(res => {
                    this.buildList = res
                    for (let i = 0; i < this.buildList.length; i++) {
                        if(this.buildList[i].building.id === this.getLocationId){
                            this.buildList[i].location = [this.buildList[i].longitude,this.buildList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.buildList[i].location),
                                name: this.buildList[i].building.name,
                                subtype: "construction",
                                id: this.buildList[i].building.id,
                                url: "/static/img/icon/construction_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
                            droreMap.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                                iconedit.setPosition(evt.coordinate)
                                console.log(evt.coordinate)
                                that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(evt.coordinate))
                            })
                            droreMap.event.DragEvent(function(tabInfor) {
                                var data = tabInfor.data
                                if(data.data.id === that.getLocationId){
                                    console.log(droreMap.trans.transLayerToWgs(data.end));
                                    that.$store.commit('MAP_LOCATION', droreMap.trans.transLayerToWgs(data.end))
                                }
                            })
                        }else {
                            this.buildList[i].location = [this.buildList[i].longitude, this.buildList[i].latitude]
                            var icon1 = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.buildList[i].location),
                                name: this.buildList[i].building.name,
                                subtype: "construction",
                                id: this.buildList[i].building.id,
                                url: "/static/img/icon/construction.png"
                            });
                            droreMap.icon.addChild(icon1);
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },

            async getAllArea () {
                await api.area.getAllRegion().then(res => {
                    this.areaList = res
                    for (let i = 0; i < this.areaList.length; i++) {
                        var areaEvets =new droreMap.area.DrawLayer("areaList",'rgba(255, 255, 255, 0.2)',"blue")
                        let geo =JSON.parse(this.areaList[i].geo);
                        let ol=geo[0];
                        let arrayObj = new Array();
                        for(var j = 0; j < ol.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(ol[j])
                            arrayObj.push(wgs);
                        }
                        let area= new Array();
                        area.push(arrayObj);
                        var data = {"id": this.areaList[i].id, "name": this.areaList[i].name,"constructor":'areaList'}
                        areaEvets.addArea(area,data)
                        droreMap.area.addChild(areaEvets, this.areaList[i].id)
                        let route = this.$route.path
                        if (route.includes('controler') || route.includes('facility')) {
                            droreMap.area.removeStyleById(this.areaList[i].id, false)
                        }
                        areaEvets.ifDraw = false;
                        areaEvets.ifModify = false;
                        areaEvets.ifSelect = false;
                        areaEvets.removeEventListener('drawend', "drawend")
                        areaEvets.removeEventListener('select', "select")
                    }
                }).catch(err => {
                    console.log(err, '失败')
                })
            },
            district(){//区域划分
                var that = this
                var areaEvet =new droreMap.area.DrawLayer("area",'rgba(255, 255, 255, 0.4)',"red")
                areaEvet.ifDraw = true;
                areaEvet.ifModify = true;
                areaEvet.ifSelect = false;
                areaEvet.addEventListener(Event.DRAW_EVENT, "drawend", function (m,t) {
                    console.log('创建区域')
                    areaEvet.ifDraw = false;
                    setTimeout(() => {
                        areaEvet.ifSelect = true;
                    },1000)
                    console.log(t)
                    let ol=t[0];
                    let arrayObj = new Array();
                    for(var i = 0; i < ol.length; i++) {
                        let wgs=droreMap.trans.transLayerToWgs(ol[i])
                        arrayObj.push(wgs);
                    }
                    let arrayObjList= new Array();
                    arrayObjList.push(arrayObj);
                    console.log(arrayObjList)
                    areaEvet.setVisible(true)
                    droreMap.area.addChild(areaEvet, '10000')
                    that.$store.commit('MAP_REGION_LOCATION',arrayObjList)
                    that.$store.commit('REGION_LOCATION_STATE',true)
                })
                areaEvet.addEventListener(Event.SELECT_EVENT, "select", function(e) {
                    if(e.select){
                        that.$store.commit('REGION_LOCATION_STATE',false)
                    }else if(e.unSelect){
                        console.log(e.unSelect)
                        let ol=e.unSelect.area[0];
                        let arrayObj = new Array();
                        for(var i = 0; i < ol.length; i++) {
                            let wgs=droreMap.trans.transLayerToWgs(ol[i])
                            arrayObj.push(wgs);
                        }
                        let arrayObjList= new Array();
                        arrayObjList.push(arrayObj);
                        that.$store.commit('MAP_REGION_LOCATION',arrayObjList )
                        console.log(arrayObjList, '冲洗你编辑的');
                        that.$store.commit('REGION_LOCATION_STATE',true)
                    }
                })
            },

            async getAllAreaEdit () {
                await api.area.getAllRegion().then(res => {
                    this.areaList = res
                    for (let i = 0; i < this.areaList.length; i++) {
                        if(this.areaList[i].id === this.getLocationId){
                            var areaEvets1 = new droreMap.area.DrawLayer("areashow", 'rgba(255, 255, 255, 0.4)', "red")
                            let geo = JSON.parse(this.areaList[i].geo);
                            let ol = geo[0];
                            let arrayObj = new Array();
                            for (var j = 0; j < ol.length; j++) {
                                let wgs = droreMap.trans.transFromWgsToLayer(ol[j])
                                arrayObj.push(wgs);
                            }
                            let area = new Array();
                            area.push(arrayObj);
                            var data = {"id": this.areaList[i].id, "name": this.areaList[i].name, "constructor": ''}
                            areaEvets1.addArea(area, data)
                            areaEvets1.setVisible(true)
                            droreMap.area.addChild(areaEvets1, this.areaList[i].id)
                        }else {
                            var areaEvets = new droreMap.area.DrawLayer("areaList", 'rgba(255, 255, 255, 0.1)', "#26bbf0")
                            let geo = JSON.parse(this.areaList[i].geo);
                            let ol = geo[0];
                            let arrayObj = new Array();
                            for (var j = 0; j < ol.length; j++) {
                                let wgs = droreMap.trans.transFromWgsToLayer(ol[j])
                                arrayObj.push(wgs);
                            }
                            let area = new Array();
                            area.push(arrayObj);
                            var data = {"id": this.areaList[i].id, "name": this.areaList[i].name, "constructor": ''}
                            areaEvets.addArea(area, data)
                            areaEvets.setVisible(true)
                            droreMap.area.addChild(areaEvets, this.areaList[i].id)
                        }
                    }
                    areaEvets1.ifModify = true;
                    areaEvets1.ifSelect = true;
                    let that =this
                    areaEvets1.addEventListener(Event.SELECT_EVENT, "select", function(e) {
                        if(e.select){
                            that.$store.commit('REGION_LOCATION_STATE',false)
                        }else if(e.unSelect){
                            if (e.unSelect.id === that.getLocationId){
                                let ol=e.unSelect.area[0];
                                let arrayObj = new Array();
                                for(var i = 0; i < ol.length; i++) {
                                    let wgs=droreMap.trans.transLayerToWgs(ol[i])
                                    arrayObj.push(wgs);
                                }
                                let arrayObjList= new Array();
                                arrayObjList.push(arrayObj);
                                that.$store.commit('MAP_REGION_LOCATION',arrayObjList )
                                console.log(arrayObjList, '冲洗你编辑的');
                                that.$store.commit('REGION_LOCATION_STATE',true)
                            }
                        }
                    })
                }).catch(err => {
                    console.log(err, '失败')
                })
            },
            async getAllRoat () {
                await api.deployRoad.getAllRoute().then(res => {
                    console.log(res, '请求路网成功')
                    for (var i = 0; i < res.length; i++) {
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#26bbf0', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        let route = this.$route.path
                        if (route.includes('controler') || route.includes('facility')) {
                            droreMap.road.removeStyleById(res[i].id,false)
                        }
                    }
                    let route = this.$route.path
                    if(route.includes('facility')) {
                        if (this.getfacilityRoad.length > 0) {
                            for (let i = 0; i < this.getfacilityRoad.length; i++) {
                                this.roadShowID(this.getfacilityRoad[i]);
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            road(){//路网绘画
                var that = this
                var areaEvt = new droreMap.road.RoadLayer('ROUTE_DEMO', '#fb9000')
                areaEvt.ifDraw = true;
                areaEvt.ifModify = false;
                areaEvt.addEventListener(Event.DRAW_EVENT, "drawend", function(m, t) {
                    areaEvt.ifDraw = false;
                    setTimeout(() => {
                        areaEvt.ifSelect = true;
                    },1000)
                    areaEvt.ifModify = true;
                    console.log(t, '909090');
                    var len = t.length - 1
                    if(t[0][0] == t[len][0] && t[0][1] == t[len][1]) {
                        layer.msg('路网不能绘制成圆环')
                    } else {
                        let arrayObj = new Array();
                        for (var i = 0; i < t.length; i++) {
                            let wgs = droreMap.trans.transLayerToWgs(t[i])
                            arrayObj.push(wgs);
                        }
                        console.log(arrayObj);
                        that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                        that.$store.commit('ROAT_LOCATION_STATE', true)
                        droreMap.road.addRoadLayer(areaEvt,'10010')
                    }
                })
                areaEvt.addEventListener(Event.SELECT_EVENT, "select", function(e) {
                    if(e.select){
                        console.log(e.select.area);
                        that.$store.commit('ROAT_LOCATION_STATE', false)
                    }else if(e.unSelect){
                        if (!e.unSelect.id) {
                            let arrayObj = new Array();
                            for (var i = 0; i < e.unSelect.area.length; i++) {
                                let wgs = droreMap.trans.transLayerToWgs(e.unSelect.area[i])
                                arrayObj.push(wgs);
                            }
                            console.log(arrayObj);
                            that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                            that.$store.commit('ROAT_LOCATION_STATE', true)
                        }
                    }
                })
            },
            async getAllRoatedit () {
                await api.deployRoad.getAllRoute().then(res => {
                    for (var i = 0; i < res.length; i++) {
                        if(res[i].id === this.getLocationId){
                            var areaEvts =new droreMap.road.RoadLayer('ROUTE_show', 'red', 'red')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvts.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvts,res[i].id)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        }
                    }
                    let that =this
                    areaEvts.ifModify = true;
                    areaEvts.ifSelect = true;
                    areaEvts.addEventListener('select', "select", function(e) {
                        if(e.select){
                            that.$store.commit('ROAT_LOCATION_STATE', false)
                            if(e.select.type == 'Point') {
                                //点击路网中的点，出现面板，包括延长、拆分和关键点
                                alert('请点击路网进行拖拽编辑！')
                            }
                        }else if(e.unSelect){
                                let arrayObj = new Array();
                                for (var i = 0; i < e.unSelect.area.length; i++) {
                                    let wgs = droreMap.trans.transLayerToWgs(e.unSelect.area[i])
                                    arrayObj.push(wgs);
                                }
                                console.log(arrayObj);
                                that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                                that.$store.commit('ROAT_LOCATION_STATE', true)
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },

            async getAllRoute () {
                await api.roat.getAllRoat().then(res => {
                    for (var i = 0; i < res.length; i++) {
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList, res[i].id)
                        let route = this.$route.path
                        if(route.includes('controler')){
                            droreMap.road.removeStyleById(res[i].id,false)
                        }
                    }
                    let route = this.$route.path
                    if(route.includes('controler')) {
                        if (this.getfacilityRoad.length > 0) {
                            for (let i = 0; i < this.getfacilityRoad.length; i++) {
                                this.roadShowID(this.getfacilityRoad[i]);
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllRouteedit () {
                await api.roat.getAllRoat().then(res => {
                    for (var i = 0; i < res.length; i++) {
                        if(res[i].id === this.getLocationId){
                            var areaEvts =new droreMap.road.RoadLayer('ROUTE_show', 'red', 'red')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvts.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvts,res[i].id)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        }
                    }
                    let that =this
                    areaEvts.ifModify = true;
                    areaEvts.ifSelect = true;
                    areaEvts.addEventListener('select', "select", function(e) {
                        if(e.select){
                            that.$store.commit('ROAT_LOCATION_STATE', false)
                            if(e.select.type == 'Point') {
                                //点击路网中的点，出现面板，包括延长、拆分和关键点
                                alert('请点击路网进行拖拽编辑！')
                            }
                        }else if(e.unSelect){
                            let arrayObj = new Array();
                            for (var i = 0; i < e.unSelect.area.length; i++) {
                                let wgs = droreMap.trans.transLayerToWgs(e.unSelect.area[i])
                                arrayObj.push(wgs);
                            }
                            console.log(arrayObj);
                            that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                            that.$store.commit('ROAT_LOCATION_STATE', true)
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getSecurityRoute(){  //巡检路线
                await api.roat.getTransportRoat(1).then(res => {
                    for (var i = 0; i < res.length; i++) {
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList, res[i].id)
                        let route = this.$route.path
                        if(route.includes('controler')){
                            droreMap.road.removeStyleById(res[i].id,false)
                        }
                    }
                    let route = this.$route.path
                    if(route.includes('controler')) {
                        if (this.getfacilityRoad.length > 0) {
                            for (let i = 0; i < this.getfacilityRoad.length; i++) {
                                this.roadShowID(this.getfacilityRoad[i]);
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getSecurityRouteEdit(){
                await api.roat.getTransportRoat(1).then(res => {
                    for (var i = 0; i < res.length; i++) {
                        if(res[i].id === this.getLocationId){
                            var areaEvts =new droreMap.road.RoadLayer('ROUTE_show', 'red', 'red')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvts.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvts,res[i].id)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList,res[i].id)
                        }
                    }
                    let that =this
                    areaEvts.ifModify = true;
                    areaEvts.ifSelect = true;
                    areaEvts.addEventListener('select', "select", function(e) {
                        if(e.select){
                            that.$store.commit('ROAT_LOCATION_STATE', false)
                            if(e.select.type == 'Point') {
                                //点击路网中的点，出现面板，包括延长、拆分和关键点
                                alert('请点击路网进行拖拽编辑！')
                            }
                        }else if(e.unSelect){
                            let arrayObj = new Array();
                            for (var i = 0; i < e.unSelect.area.length; i++) {
                                let wgs = droreMap.trans.transLayerToWgs(e.unSelect.area[i])
                                arrayObj.push(wgs);
                            }
                            console.log(arrayObj);
                            that.$store.commit('MAP_ROAT_LOCATION', arrayObj)
                            that.$store.commit('ROAT_LOCATION_STATE', true)
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllUser(){
                return await api.user.getUserGPSInfo()
            },
            getAllPerson(){

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
                if(users.length > 0){
                    users.forEach(obj=>{
                        let latitude = ''
                        let longitude = ''
                        if(obj.gpsData){
                            latitude = obj.gpsData.latitude,
                                longitude = obj.gpsData.longitude
                        }
                        obj.status=obj.gpsData ? "ONLINE" : "OFFLINE";
                        obj.location=[longitude,latitude];
                        var icon = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(obj.location),
                            name:obj.name,
                            subtype:'securityPerson',
                            id:obj.id,
                            url:'/static/img/icon/people_small.svg',
                            type:'security',
                            status:obj.gpsData ? "ONLINE" : "OFFLINE",
                            description:obj.description,
                            gpsData:obj.gpsData,
                            data:obj,
                        });
                        droreMap.icon.addChild(icon);
                        icon.showName=true
                        droreMap.icon.showLayer(icon.id,false);
                        let that = this;
                        icon.onclick(function (e) {
                            that.menulist = e.data;
                            var div = document.getElementById('contextmenu_container')
                            var popup = new  droreMap.pop.Popup(div,droreMap.trans.transFromWgsToLayer([longitude,latitude]),"contextmenu_container")
                            droreMap.pop.addChild(popup,e.data.id);
                            $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                            if(e.data.status =="FAULT"){
                                that.open=false
                            }else if(e.data.status =="OFFLINE"){
                                that.open=false
                            }else {
                                that.open= true
                            }
                            $("#contextmenu_container").show();
                        });
                    })
                }
                // setTimeout(() => {
                //     this.getAllLangPerson();//长轮询
                // },5000)
                // Promise.all([this.getAllUser()]).then(result=>{
                //     console.log(result,'00000')
                //     // let users = result[0]
                //     let users =  [
                //         {
                //             "vehicle": {
                //                 "id": "05579c25-8abb-4bfa-83ae-2a1e50a071ee",
                //                 "createTime": null,
                //                 "creator": null,
                //                 "modifyTime": "2018-09-11 17:32:51",
                //                 "modifier": "admin",
                //                 "serialNum": "船001",
                //                 "capacity": 33,
                //                 "type": 1,
                //                 "model": "363",
                //                 "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                //                 "pictureId": null,
                //                 "maintenanceStatus": 0,
                //                 "maintenanceDate": "2018-08-07",
                //                 "purchaseDate": "2010-03-23",
                //                 "description": "反感和的",
                //                 "scenicAreaId": null,
                //                 "deleted": false
                //             },
                //             "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                //             "gpsDeviceName": "gps1",
                //             "pictureId": null,
                //             "picturePath": null,
                //             "gpsData":
                //             //null,
                //                 {
                //                     "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                //                     "ioTDeviceId": null,
                //                     "createTime": "2017-12-31 12:21:39",
                //                     "longitude": 120.13310087077178,
                //                     "latitude": 30.30729423238902,
                //                     "altitude": null,
                //                     "direction": null,
                //                     "speed": 4,
                //                     "telephone": null,
                //                     "deviceNum": null,
                //                     "coordinate": null
                //                 },
                //             "driver": {
                //                 "id": "1",
                //                 "creator": null,
                //                 "createTime": null,
                //                 "modifier": "admin",
                //                 "modifyTime": "2018-09-11 18:00:00",
                //                 "name": "admin",
                //                 "cnName": " 系统管理员",
                //                 "gender": 0,
                //                 "iconId": null,
                //                 "mobileNum": "18800000000",
                //                 "fixedPhoneNum": null,
                //                 "idCardNum": null,
                //                 "email": null,
                //                 "workAddress": null,
                //                 "description": null,
                //                 "departmentId": null,
                //                 "jobId": null,
                //                 "roleId": "1"
                //             }
                //         }
                //     ]
                //
                //     if(users.length > 0){
                //         users.forEach(obj=>{
                //             let latitude = ''
                //             let longitude = ''
                //             if(obj.gpsData){
                //                 latitude = obj.gpsData.latitude,
                //                     longitude = obj.gpsData.longitude
                //             }
                //             obj.status=obj.gpsData ? "ONLINE" : "OFFLINE";
                //             obj.location=[longitude,latitude];
                //             var icon = new droreMap.icon.Marker({
                //                 coordinate: droreMap.trans.transFromWgsToLayer(obj.location),
                //                 name:obj.vehicle.serialNum,
                //                 subtype:'securityPerson',
                //                 id:obj.vehicle.id,
                //                 url:'/static/img/icon/people_small.png',
                //                 type:'security',
                //                 status:obj.gpsData ? "ONLINE" : "OFFLINE",
                //                 description:obj.vehicle.description,
                //                 driver:obj.driver,
                //                 gpsData:obj.gpsData,
                //                 vehicle:obj.vehicle,
                //                 data:obj,
                //             });
                //             droreMap.icon.addChild(icon);
                //             icon.showName=true
                //             droreMap.icon.showLayer(icon.id,false);
                //             let that = this;
                //             icon.onclick(function (e) {
                //                 that.menulist = e.data;
                //                 var div = document.getElementById('contextmenu_container')
                //                 var popup = new  droreMap.pop.Popup(div,droreMap.trans.transFromWgsToLayer([longitude,latitude]),"contextmenu_container")
                //                 droreMap.pop.addChild(popup,e.data.id);
                //                 $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                //                 if(e.data.status =="FAULT"){
                //                     that.open=false
                //                 }else if(e.data.status =="OFFLINE"){
                //                     that.open=false
                //                 }else {
                //                     that.open= true
                //                 }
                //                 $("#contextmenu_container").show();
                //             });
                //         })
                //     }
                //
                //
                // })
            },
            async getAllLangPerson(){
                Promise.all([this.getAllUser()]).then(result=>{
                    let users = result[0]

                    if(users.length > 0){
                        users.forEach(obj=>{
                            let latitude = ''
                            let longitude = ''
                            if(obj.gpsData){
                                latitude = obj.gpsData.latitude,
                                    longitude = obj.gpsData.longitude
                            }
                            obj.status=obj.gpsData ? "ONLINE" : "OFFLINE";
                            obj.location=[longitude,latitude];
                            var icon = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(obj.location),
                                name:obj.name,
                                subtype:'securityPerson',
                                id:obj.id,
                                url:'/static/img/icon/people_small.svg',
                                type:'security',
                                status:obj.gpsData ? "ONLINE" : "OFFLINE",
                                description:obj.description,
                                gpsData:obj.gpsData,
                                data:obj,
                            });
                            droreMap.icon.addChild(icon);
                            icon.showName=true
                            droreMap.icon.showLayer(icon.id,false);
                            let that = this;
                            icon.onclick(function (e) {
                                that.menulist = e.data;
                                var div = document.getElementById('contextmenu_container')
                                var popup = new  droreMap.pop.Popup(div,droreMap.trans.transFromWgsToLayer([longitude,latitude]),"contextmenu_container")
                                droreMap.pop.addChild(popup,e.data.id);
                                $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                                if(e.data.status =="FAULT"){
                                    that.open=false
                                }else if(e.data.status =="OFFLINE"){
                                    that.open=false
                                }else {
                                    that.open= true
                                }
                                $("#contextmenu_container").show();
                            });
                        })
                    }
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler')) {
                        this.getAllLangPerson();//长轮询
                    }
                },5000)
            },
            async getAllAlarmEvent () {
                await api.alarm.getAllAlarmEventundone().then(res => {
                    for (let i=0;i<res.length;i++) {
                        res[i].location = [res[i].longitude,res[i].latitude]
                        if(!res[i].rule || !res[i].rule.name){
                            res[i].rule = {
                                name : ""
                            }
                        }
                        res[i].device = !res[i].device ? "" : res[i].device
                        res[i].acturalExtendValue = !res[i].acturalExtendValue ? "" : res[i].acturalExtendValue
                        if(!res[i].owner || !res[i].owner.id){
                            res[i].owner = {
                                id : ""
                            }
                        }
                        if(!res[i].owner || !res[i].owner.phone){
                            res[i].owner = {
                                phone : ""
                            }
                        }
                        res[i].actualValue = !res[i].actualValue ? "" : res[i].actualValue
                        res[i].type="warn"
                        if(res[i].rule.alarmTypeId =="2") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/alarmcolumnRule_one.png'
                                res[i].subtype ='alarmcolumnRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url  = '/static/img/icon/alarmcolumnRule_two.png'
                                res[i].subtype ='alarmcolumnRule_two'
                            }else {
                                res[i].url = '/static/img/icon/alarmcolumnRule_three.png'
                                res[i].subtype ='alarmcolumnRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="3") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/firefightingRule_one.png'
                                res[i].subtype ='firefightingRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/firefightingRule_two.png'
                                res[i].subtype ='firefightingRule_two'
                            }else {
                                res[i].url = '/static/img/icon/firefightingRule_three.png'
                                res[i].subtype ='firefightingRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="4") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/crossborderRule_one.png'
                                res[i].subtype ='crossborderRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/crossborderRule_two.png'
                                res[i].subtype ='crossborderRule_two'
                            }else {
                                res[i].url = '/static/img/icon/crossborderRule_three.png'
                                res[i].subtype ='crossborderRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="5") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/speedingRule_one.png'
                                res[i].subtype ='speedingRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/speedingRule_two.png'
                                res[i].subtype ='speedingRule_two'
                            }else {
                                res[i].url = '/static/img/icon/speedingRule_three.png'
                                res[i].subtype ='speedingRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="6") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/offtrackRule_one.png'
                                res[i].subtype ='offtrackRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/offtrackRule_two.png'
                                res[i].subtype ='offtrackRule_two'
                            }else {
                                res[i].url = '/static/img/icon/offtrackRule_three.png'
                                res[i].subtype ='offtrackRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="7") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/overlimitRule_one.png'
                                res[i].subtype ='overlimitRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/overlimitRule_two.png'
                                res[i].subtype ='overlimitRule_two'
                            }else {
                                res[i].url = '/static/img/icon/overlimitRule_three.png'
                                res[i].subtype ='overlimitRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="8") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/waterlevelRule_one.png'
                                res[i].subtype ='waterlevelRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/waterlevelRule_two.png'
                                res[i].subtype ='waterlevelRule_two'
                            }else {
                                res[i].url = '/static/img/icon/waterlevelRule_three.png'
                                res[i].subtype ='waterlevelRule_three'
                            }
                        }else if(res[i].rule.alarmTypeId =="9") {
                            if (res[i].status.id =="1")  {
                                res[i].url = '/static/img/icon/conditionRule_one.png'
                                res[i].subtype ='conditionRule_one'
                            } else  if (res[i].status.id =="2") {
                                res[i].url = '/static/img/icon/conditionRule_two.png'
                                res[i].subtype ='conditionRule_two'
                            }else {
                                res[i].url = '/static/img/icon/conditionRule_three.png'
                                res[i].subtype ='conditionRule_three'
                            }
                        }
                        var icon = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(res[i].location),
                            name: res[i].serialNum,
                            subtype: res[i].subtype,
                            id:  res[i].id,
                            url: res[i].url,
                            type: 'warn',
                            status: res[i].id,
                            data: res[i],
                        });
                        droreMap.icon.addChild(icon);
                        droreMap.icon.showLayer(icon.id,false);
                        let that = this;
                        icon.onclick(function (e) {
                            that.menulist = e.data;
                            that.droreMappopup(that.menulist);
                            // that.warnListShow(e);
                        });
                    }
                    let route = this.$route.path
                    if (route.includes('controler')) {
                        this.treeShow(this.getSearchInfo);
                    }
                    // setTimeout(() => {
                    //     let route = this.$route.path
                    //     if (route.includes('controler')) {
                    //         this.getAllAlarmEvent();//长轮询
                    //     }
                    // },10000)
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            iconShow(){
                for (let i=0;i<this.iconList.length;i++) {
                    var icon = new droreMap.icon.Marker({
                        coordinate: droreMap.trans.transFromWgsToLayer(this.iconList[i].location),
                        name: this.iconList[i].name,
                        subtype: this.iconList[i].subtype,
                        id: this.iconList[i].id,
                        url: this.iconList[i].url,
                        type: this.iconList[i].type,
                        status: this.iconList[i].status,
                        data: this.iconList[i],
                    });
                    droreMap.icon.addChild(icon);
                    icon.showName=true
                    let route = this.$route.path
                    if(route.includes('controler')){
                        droreMap.icon.showLayer(icon.id,false);
                        let that = this;
                        if((icon.subtype=="police")||(icon.subtype=="gate") ){
                            icon.onclick(function (e) {
                                that.menulist = e.data;
                                that.droreMappopup(that.menulist);
                                that.menuShow()
                            });
                        } else if(icon.subtype=="station" || icon.subtype == "landing"){
                            //站点没有点击事件
                        }else if(icon.subtype.includes("led")){
                            console.log("aaaaaaaaaa")
                            icon.onclick(function (e) {
                                that.ledvisible = true
                            });
                        }
                        // else if(icon.subtype=="car" || icon.subtype == "boat"){
                        //     //车船有点击事件
                        // }
                        else {
                            icon.onclick(function (e) {
                                that.menulist = e.data;
                                that.droreMappopup(that.menulist);
                            });
                        }
                        this.controler();//之前打的点
                    }else if(route.includes('facility')){
                        droreMap.icon.showLayer(icon.id,false);
                        let that = this;
                        icon.onclick(function (e) {
                            that.menulist = e.data;
                            that.droreMappopup(that.menulist);
                            that.menuShow()
                            console.log( that.menulist,'123123123');
                        });
                        this.facility();//之前打的点
                    }
                }
            },
            overView() {//鹰眼图
                var overView = new droreMap.control.OverviewMap({'url': '/static/img/jhdyh.png'});
                droreMap.control.addControl(overView);
                overView.setBoxColor("#f60")
                overView.setRect('270px','150px')
            },
            interaction(){//初始化辅助显示
                this.requestGisMain();//加载地图
                droreMap.object.getMap().getLayers().getArray()[1].setVisible(false)
                droreMap.interaction.enableMapClick = true
                droreMap.interaction.showMove()
                droreMap.interaction.enableMapClick = true
                // droreMap.interaction.showMove()
                this.getAllLight();//路灯现有标注
                this.getAllGate();//闸机现有标注
                this.getAllWifi();//wifi现有标注
                this.getAllLed();//Led现有标注
                this.getAllPolice();//报警柱现有标注
                this.getAllMonitor();//传感器现有标注
                this.getAllBroadcast();//广播现有标注
                this.getAllCamera();//摄像头现有标注
                this.overView();//鹰眼
                // this.rangeSearch();// 范围查找
                this.getAllRoute();//调度路线
                this.getAllAlarmEvent();//告警事件现有标注
                //this.getAllTransportRoute();// 车船调度路线输出
                //this.getAllStation();
                this.getAllVehicle();// 车船信息
                    // this.heatEmShow=true
                    // this.heatEm();//环境数据
            },
            searchShow() {//搜索
                console.log(this.getSearchInfo,'123123');
                if(this.getSearchInfo.entityType =="12"){
                    this.roadShow(this.getSearchInfo)
                }else if(this.getSearchInfo.entityType=="14"){
                    this.areaShow(this.getSearchInfo)
                }else {
                    this.getSearchInfo.location = [this.getSearchInfo.longitude,this.getSearchInfo.latitude]
                    droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(this.getSearchInfo.location));
                    droreMap.icon.showLayer(this.getSearchInfo.id,true);
                }
            },
            droreMappopup(e){
                var div = document.getElementById('contextmenu_container')
                var popup = new  droreMap.pop.Popup(div,e.coordinate,"contextmenu_container")
                droreMap.pop.addChild(popup,e.data.id);
                $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                if(e.data.status =="FAULT"){
                    this.open=false
                }else if(e.data.status =="OFFLINE"){
                    this.open=false
                }else {
                    this.open= true
                }
                $("#contextmenu_container").show();
                this.menuBroadvolume=false;
                let that =this
                $(document).keyup(function(event){
                    switch(event.keyCode) {
                        case 27:
                            that.escFun();
                    }
                });
            },
            mapSwitch(){
                this.menuBroadvolume=false;
                if(this.menulist.data.status =="FAULT"){
                    this.open=false
                    this.$message.error("设备故障，id是"+this.menulist.id)
                }else if(this.menulist.data.status =="OFFLINE"){
                    this.open=false
                    this.$confirm('是否开启设备?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.startBroadcast();
                    }).catch(() => {
                        this.$message.info('取消开启设备')
                        this.open=false
                    })
                }else{
                    this.open=true
                    this.$confirm('是否关闭设备?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.stopBroadcast();
                    }).catch(() => {
                        this.$message.info('取消关闭设备')
                        this.open= true
                    })
                }
            },
            menuShow(){
                console.log(this.menulist)
                this.menuBroadvolume=false;
                if(this.menulist.type=="warn"){
                    this.buildInfo = this.menulist.data
                    this.visible = true
                    this.title = '告警事件查看'
                }else if(this.menulist.type=="transport"){
                    this.buildInfo = this.menulist
                    this.visible = true
                    this.title = this.menulist.subtype == 'car'?'车辆':'船只'
                } else if(this.menulist.type=="security"){
                    this.buildInfo = this.menulist
                    this.visible = true
                    this.title = this.menulist.subtype == 'securityPerson'?'人员':'巡检计划'
                } else {
                    this.buildInfo = this.menulist.data
                    this.visible = true
                    this.title = this.menulist.type
                }
            },
            showCast(){
                this.dialogVisible=true;
            },
            closeMusicEdit(){
                this.dialogVisible=false;
            },
            menuOperation(){
                this.menuBroadvolume=false;
                if(this.menulist.data.status =="FAULT"){
                    alert("操作当前内容"+this.menulist.id);
                }else {
                    if(this.menulist.type=="warn"){
                        console.log(this.menulist.data)
                        this.warningEventInfo = this.menulist.data;
                        this.AlarmDetailShow = true;
                        this.isBatchEdit = false;
                        this.readOnly = false;
                        this.title = '编辑告警事件';
                    }else {
                        this.$message.success(this.menulist.name+'使用正常')
                    }
                }
            },
            menuPhone(){
                this.menuBroadvolume=false;
                this.$message.success(this.menulist.name+'使用正常')
            },
            menuCamera(){
                this.menuBroadvolume=false;
                var explorer = window.navigator.userAgent;
                if (explorer.indexOf("MSIE") >= 0 || (!!window.ActiveXObject || "ActiveXObject" in window)) {
                    this.buildInfo = this.menulist.data
                    this.cameravisible = true
                    this.title = this.menulist.type+' :  '+this.menulist.name
                } else {
                    this.$message.error('您当前的浏览器不支持该控件的播放，请使用IE10以上的浏览器');
                    return false;
                }
            },
            warnCameraShow(data){
                this.menuBroadvolume=false;
                var explorer = window.navigator.userAgent;
                if (explorer.indexOf("MSIE") >= 0 || (!!window.ActiveXObject || "ActiveXObject" in window)) {
                    this.buildInfo = data
                    this.cameravisible = true
                    this.title = '摄像头 : '+ data.name
                } else {
                    this.$message.error('您当前的浏览器不支持该控件的播放，请使用IE10以上的浏览器');
                    return false;
                }
            },
            warnCamera(){
                this.menuBroadvolume=false;
                droreMap.map.panToCoord(this.menulist.coordinate);
                droreMap.map.setZoom(3)
                let Circle = new droreMap.geom.Circle()
                let radius= 100
                let coordinate=droreMap.trans.transLayerToWgs(this.menulist.coordinate)
                let longitude = parseFloat(coordinate[0])
                let latitude = parseFloat(coordinate[1])
                let types={
                    "7":[2]
                }
                let SearchFacility = {
                    radius: radius,
                    latitude: latitude,
                    longitude: longitude,
                    epsg:'4326',
                    types:types
                }
                this.getSearchFacility(SearchFacility)
                Circle.setCenter(this.menulist.coordinate,radius+80);
            },
            warnListShow(data){
                this.menuBroadvolume=false;
                droreMap.map.panToCoord(data.coordinate);
                droreMap.map.setZoom(3)
                let Circle = new droreMap.geom.Circle()
                let radius= 100
                let coordinate=droreMap.trans.transLayerToWgs(data.coordinate)
                let longitude = parseFloat(coordinate[0])
                let latitude = parseFloat(coordinate[1])
                let types={
                    "7":[1,2]
                }
                let SearchFacility = {
                    radius: radius,
                    latitude: latitude,
                    longitude: longitude,
                    epsg:'4326',
                    types:types
                }
                this.getSearchFacility(SearchFacility)
                Circle.setCenter(this.menulist.coordinate,radius);
            },
            menuBroad(){
                this.jsonAttrList=JSON.parse(this.menulist.data.jsonAttr)
                this.menuBroadvolumeNumber=this.jsonAttrList.status.volume
                if(this.menuBroadvolume){
                    this.menuBroadvolume=false;
                }else {
                    this.menuBroadvolume=true;
                }
            },
            async setBroadcastVolume(val){
                await api.broadcast.setBroadcastVolume(this.menulist.id,val).then(res => {
                    setTimeout(() => {
                        this.$message.success('调节广播'+this.menulist.name+'音量成功！')
                    },1000)
                }).catch(() => {
                    this.$message.info('调节广播音量失败！')
                    this.open=true
                })
            },
            menuBroadcast(){
                $("#contextmenu_container").hide();
                droreMap.map.panToCoord(this.menulist.coordinate);
                droreMap.map.setZoom(3)
                let Circle = new droreMap.geom.Circle()
                let radius=100
                let coordinate=droreMap.trans.transLayerToWgs(this.menulist.coordinate)
                let longitude = parseFloat(coordinate[0])
                let latitude = parseFloat(coordinate[1])
                let types={
                    "7":[1]
                }
                let SearchFacility = {
                    radius: radius,
                    latitude: latitude,
                    longitude: longitude,
                    epsg:'4326',
                    types:types
                }
                this.getSearchFacility(SearchFacility)
                Circle.setCenter(this.menulist.coordinate,radius+80);
            },
            menuDelete(){
                $("#contextmenu_container").hide();
                this.menuBroadvolume=false;
                this.escFun();
            },
            treeShow(data){
                console.log(data,'23123123')
                if(data.longitude&&data.latitude){
                    data.location = [data.longitude,data.latitude]
                    droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(data.location));
                    droreMap.icon.showLayer(data.id,true);
                }
            },
            treeShowID(data){
                droreMap.icon.showLayer(data,true);
            },
            treeHide(data){
                droreMap.icon.showLayer(data.id,false);
                this.menuDelete();
            },
            treeHideID(data){
                droreMap.icon.showLayer(data,false);
            },
            roadShow(data){
                let geo =JSON.parse(data.geo);
                data.location=geo[1];
                droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(data.location));
                droreMap.road.removeStyleById(data.id,true)
            },
            roadShowID(data){
                droreMap.road.removeStyleById(data,true)
            },
            roadHide(data){
                droreMap.road.removeStyleById(data.id,false)
            },
            roadHideID(data){
                droreMap.road.removeStyleById(data,false)
            },
            areaShow(data){
                droreMap.area.removeStyleById(data.id,true)
            },
            controler(){
                if(this.getcontroleLight.length > 0){
                    for (let i=0;i<this.getcontroleLight.length;i++) {
                        this.treeShowID(this.getcontroleLight[i]);
                    }
                }
                if(this.getcontroleEnvironment.length > 0){
                    for (let i=0;i<this.getcontroleEnvironment.length;i++) {
                        this.treeShowID(this.getcontroleEnvironment[i]);
                    }
                }
                if(this.getcontroleWifi.length > 0){
                    for (let i=0;i<this.getcontroleWifi.length;i++) {
                        this.treeShowID(this.getcontroleWifi[i]);
                    }
                }
                if(this.getcontroBroad.length > 0){
                    for (let i=0;i<this.getcontroBroad.length;i++) {
                        this.treeShowID(this.getcontroBroad[i]);
                    }
                }
                // if(this.getcontroTransport.length > 0){
                //     for (let i=0;i<this.getcontroTransport.length;i++) {
                //         this.treeShowID(this.getcontroTransport[i]);
                //     }
                // }
                if(this.getcontroCamera.length > 0){
                    for (let i=0;i<this.getcontroCamera.length;i++) {
                        this.treeShowID(this.getcontroCamera[i]);
                    }
                }
                if(this.getcontroLed.length > 0){
                    for (let i=0;i<this.getcontroLed.length;i++) {
                        this.treeShowID(this.getcontroLed[i]);
                    }
                }
            },
            facility(){
                if(this.getfacilityPark.length > 0){
                    for (let i=0;i<this.getfacilityPark.length;i++) {
                        this.treeShowID(this.getfacilityPark[i]);
                    }
                }
                if(this.getfacilityToilet.length > 0){
                    for (let i=0;i<this.getfacilityToilet.length;i++) {
                        this.treeShowID(this.getfacilityToilet[i]);
                    }
                }
                if(this.getfacilityShop.length > 0){
                    for (let i=0;i<this.getfacilityShop.length;i++) {
                        this.treeShowID(this.getfacilityShop[i]);
                    }
                }
                if(this.getfacilityBuild.length > 0){
                    for (let i=0;i<this.getfacilityBuild.length;i++) {
                        this.treeShowID(this.getfacilityBuild[i]);
                    }
                }
                if(this.getfacilityScenic.length > 0){
                    for (let i=0;i<this.getfacilityScenic.length;i++) {
                        this.treeShowID(this.getfacilityScenic[i]);
                    }
                }
                if(this.getfacilityTrash.length > 0){
                    for (let i=0;i<this.getfacilityTrash.length;i++) {
                        this.treeShowID(this.getfacilityTrash[i]);
                    }
                }
                if(this.getfacilityStation.length > 0){
                    for (let i=0;i<this.getfacilityStation.length;i++) {
                        this.treeShowID(this.getfacilityStation[i]);
                    }
                }
                if(this.getfacilityPlant.length > 0){
                    for (let i=0;i<this.getfacilityPlant.length;i++) {
                        this.treeShowID(this.getfacilityPlant[i]);
                    }
                }
                if(this.getfacilityIndicator.length > 0){
                    for (let i=0;i<this.getfacilityIndicator.length;i++) {
                        this.treeShowID(this.getfacilityIndicator[i]);
                    }
                }
            },
            rangeSearch(){
                let that =this
                droreMap.event.addMouseEvent(Event.DOUBLECLICK_EVENT, "single", function(evt){
                    $("#contextmenu_container").hide();
                    droreMap.map.panToCoord(evt.coordinate);
                    droreMap.map.setZoom(3)
                    let Circle = new droreMap.geom.Circle()
                    let radius=100
                    let coordinate=droreMap.trans.transLayerToWgs(evt.coordinate)
                    let longitude = parseFloat(coordinate[0])
                    let latitude = parseFloat(coordinate[1])
                    let types={
                        "7":[1,2]
                    }
                    let SearchFacility = {
                        radius: radius,
                        latitude: latitude,
                        longitude: longitude,
                        epsg:'4326',
                        types:types
                    }
                    that.getSearchFacility(SearchFacility)
                    Circle.setCenter(evt.coordinate,radius+35);
                })
            },
            escFun(){
                $("#contextmenu_container").hide();
                let Circle = new droreMap.geom.Circle()
                let types={
                    "7":[]
                }
                let SearchFacility = {
                    radius: 0,
                    latitude: 0,
                    longitude: 0,
                    epsg:'4326',
                    types:types
                }
                this.getSearchFacility(SearchFacility)
                Circle.setCenter([0,0],0);
            },
            async getSearchFacility (SearchFacility) {//点击范围搜索
                await api.controler.getSearchFacility(JSON.stringify(SearchFacility)).then(res => {
                    if(this.searchFacilityList.length>0){
                        for (let i=0;i< this.searchFacilityList.length;i++) {
                            this.treeHideID(this.searchFacilityList[i].id);
                        }
                    }
                    this.searchFacilityList= res[7]
                    let broadListId=[];
                    let cameraListId=[];
                    for (let i=0;i< this.searchFacilityList.length;i++) {
                        this.treeShowID(this.searchFacilityList[i].id);
                        if(this.searchFacilityList[i].typeId=="1"){
                            broadListId.push(this.searchFacilityList[i].id)
                        }else if(this.searchFacilityList[i].typeId=="2"){
                            cameraListId.push(this.searchFacilityList[i])
                        }
                    }
                    if(cameraListId.length>0){
                        let route = this.$route.path
                            if (route.includes('warn')) {
                            this.warnCameraShow(cameraListId[0])
                        }
                    }
                    console.log(broadListId)
                    console.log(cameraListId)
                }).catch(err => {
                    this.$message.error('查询失败')
                })
            },
        },
        components: {
            Scrollcontainer,
            PersonDetail,
            controlcameraDialog,

            musicedit,

            AlarmDetail,
            ledDialog

        },
        watch: {
            getSearchInfo () {
                this.searchShow(this.getSearchInfo);
            },
            getTreeState(){



                console.log('213123')


                console.log(this.getTreeState,'选择树的内容')
                this.selectedCast=(((this.getTreeState)[0]).checked).checkedNodes;

                console.log(this.getTreeState,'213123')

                if(this.getTreeState.length>1) {
                    // console.log(this.getTreeState,'ioioioiooioioiooi')
                    //    这边是全选
                    if (this.getTreeState[0].checked) {//显示
                        this.getTreeState.forEach(item => {
                            item.children.forEach(item1 => {
                                if(item1.typeroad=='road'){
                                    this.roadShow(item1);
                                }else {
                                    if(item1.type =='person'){
                                        this.roadShowID(item1.routeId);
                                    }else if(item1.type =='warn'){
                                        this.treeShow(item1);
                                    }else {
                                        this.treeShow(item1);
                                    }
                                }
                                if(item1.type=='light'){
                                    this.controleLightList.push(item1.id);
                                    this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                                }else if(item1.type=='environment'){
                                    this.controleEnvironmentList.push(item1.id);
                                    this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                                }else if(item1.type=='wifi'){
                                    this.controleWifiList.push(item1.id);
                                    this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                                }else if(item1.type =='broad'){
                                    this.controleBroadList.push(item1.id);
                                    this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                                }else if(item1.type =='camera'){
                                    this.controleCameraList.push(item1.id);
                                    this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                                } else if(item1.type =='led'){
                                    this.controleLedList.push(item1.id);
                                    this.$store.commit('CONTROLER_LED', this.controleLedList)
                                } else if(item1.type =='transport'){
                                    this.controleTransportList.push(item1.id);
                                    this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                                } else if(item1.type =='security'){
                                    this.controleSecurityPersonList.push(item1.id);
                                    this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleSecurityPersonList)
                                } else if(item1.type =='park'){
                                    this.facilityPark.push(item1.id);
                                    this.$store.commit('FACILITY_PARK', this.facilityPark)
                                } else if(item1.type =='toilet'){
                                    this.facilityToilet.push(item1.id);
                                    this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                                } else if(item1.type =='shop'){
                                    this.facilityShop.push(item1.id);
                                    this.$store.commit('FACILITY_SHOP', this.facilityShop)
                                } else if(item1.type =='build'){
                                    this.facilityBuild.push(item1.id);
                                    this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                                } else if(item1.type =='scenic'){
                                    this.facilityScenic.push(item1.id);
                                    this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                                } else if(item1.type =='trash'){
                                    this.facilityTrash.push(item1.id);
                                    this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                                } else if(item1.type =='plant'){
                                    this.facilityPlant.push(item1.id);
                                    this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                                } else if(item1.type =='indicator'){
                                    this.facilityIndicator.push(item1.id);
                                    this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                                }else if(item1.type =='station'){
                                    this.facilityStation.push(item1.id);
                                    this.$store.commit('FACILITY_STATION', this.facilityStation)
                                }
                                if(item1.typeroad=='road'){
                                    this.facilityRoad.push(item1.id);
                                    this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                                }
                            })
                        })
                    }else {//隐藏
                        this.getTreeState.forEach(item => {
                            if(item.typeroad=='road'){
                                this.roadHide(item);
                            }else {
                                if(item.type =='person'){
                                    this.roadHideID(item.routeId)
                                }else if(item.type =='warn'){
                                    this.treeHide(item);
                                }else {
                                    this.treeHide(item);
                                }
                            }
                            if(item.type=='light'){
                                this.controleLightList=[];
                                this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                            }else if(item.type=='environment'){
                                this.controleEnvironmentList=[];
                                this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                            }else if(item.type=='wifi'){
                                this.controleWifiList=[];
                                this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                            }else if(item.type=='broad'){
                                this.controleBroadList=[];
                                this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                            }else if(item.type=='camera'){
                                this.controleCameraList=[];
                                this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                            }else if(item.type=='led'){
                                this.controleLedList=[];
                                this.$store.commit('CONTROLER_LED', this.controleLedList)
                            }else if(item.type=='transport'){
                                this.controleTransportList=[];
                                this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                            } else if(item.type =='security'){
                                this.controleSecurityPersonList=[];
                                this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleSecurityPersonList)
                            }else if(item.type =='park'){
                                this.facilityPark=[];
                                this.$store.commit('FACILITY_PARK', this.facilityPark)
                            } else if(item.type =='toilet'){
                                this.facilityToilet=[];
                                this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                            } else if(item.type =='shop'){
                                this.facilityShop=[];
                                this.$store.commit('FACILITY_SHOP', this.facilityShop)
                            } else if(item.type =='build'){
                                this.facilityBuild=[];
                                this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                            } else if(item.type =='scenic'){
                                this.facilityScenic=[];
                                this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                            } else if(item.type =='trash'){
                                this.facilityTrash=[];
                                this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                            } else if(item.type =='plant'){
                                this.facilityPlant=[];
                                this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                            } else if(item.type =='indicator'){
                                this.facilityIndicator=[];
                                this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                            }else if(item.type =='station'){
                                this.facilityStation=[];
                                this.$store.commit('FACILITY_STATION', this.facilityStation)
                            }
                            if(item.typeroad=='road'){
                                this.facilityRoad=[];
                                this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                            }
                        })
                    }
                }else {
                    if(this.getTreeState[0].children){
                        let data = this.getTreeState[0].children
                        if (this.getTreeState[0].checked.checkedKeys.includes(this.getTreeState[0].id)) {
                            for (let i = 0; i < data.length; i++) {
                                if(data[i].typeroad=='road'){
                                    this.roadShow(data[i]);
                                }else if(data[i].type =='transport' || data[i].type =='security'){
                                    if(data[i].status == "ONLINE"){
                                        this.treeShow(data[i]);
                                    }
                                } else {
                                    if(data[i].type =='person'){
                                        this.roadShowID(data[i].routeId)
                                    }else if(data[i].type =='warn'){
                                        this.treeShow(data[i]);
                                    }else {
                                        this.treeShow(data[i]);
                                    }
                                }
                                // console.log(this.getTreeState[0]);
                                if(data[i].type=='light'){
                                    this.controleLightList.push(data[i].id);
                                    this.controleLightList=[...new Set(this.controleLightList)];
                                    this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                                }else if(data[i].type=='environment'){
                                    this.controleEnvironmentList.push(data[i].id);
                                    this.controleEnvironmentList=[...new Set(this.controleEnvironmentList)];
                                    this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                                }else if(data[i].type=='wifi'){
                                    this.controleWifiList.push(data[i].id);
                                    this.controleWifiList=[...new Set(this.controleWifiList)];
                                    this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                                }else if(data[i].type=='broad'){
                                    this.controleBroadList.push(data[i].id);
                                    this.controleBroadList=[...new Set(this.controleBroadList)];
                                    this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                                }else if(data[i].type=='camera'){
                                    this.controleCameraList.push(data[i].id);
                                    this.controleCameraList=[...new Set(this.controleCameraList)];
                                    this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                                }else if(data[i].type=='led'){
                                    this.controleLedList.push(data[i].id);
                                    this.controleLedList=[...new Set(this.controleLedList)];
                                    this.$store.commit('CONTROLER_LED', this.controleLedList)
                                }else if(data[i].type=='transport'){
                                    this.controleTransportList.push(data[i].id);
                                    this.controleTransportList=[...new Set(this.controleTransportList)];
                                    this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                                } else if(data[i].type =='security'){
                                    this.controleSecurityPersonList.push(data[i].id);
                                    this.controleSecurityPersonList=[...new Set(this.controleSecurityPersonList)];
                                    this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleSecurityPersonList)
                                }else if(data[i].type =='park'){
                                    this.facilityPark.push(data[i].id);
                                    this.facilityPark=[...new Set(this.facilityPark)];
                                    this.$store.commit('FACILITY_PARK', this.facilityPark)
                                } else if(data[i].type =='toilet'){
                                    this.facilityToilet.push(data[i].id);
                                    this.facilityToilet=[...new Set(this.facilityToilet)];
                                    this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                                } else if(data[i].type =='shop'){
                                    this.facilityShop.push(data[i].id);
                                    this.facilityShop=[...new Set(this.facilityShop)];
                                    this.$store.commit('FACILITY_SHOP', this.facilityShop)
                                } else if(data[i].type =='build'){
                                    this.facilityBuild.push(data[i].id);
                                    this.facilityBuild=[...new Set(this.facilityBuild)];
                                    this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                                }else if(data[i].type =='scenic'){
                                    this.facilityScenic.push(data[i].id);
                                    this.facilityScenic=[...new Set(this.facilityScenic)];
                                    this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                                } else if(data[i].type =='trash'){
                                    this.facilityTrash.push(data[i].id);
                                    this.facilityTrash=[...new Set(this.facilityTrash)];
                                    this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                                } else if(data[i].type =='plant'){
                                    this.facilityPlant.push(data[i].id);
                                    this.facilityPlant=[...new Set(this.facilityPlant)];
                                    this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                                } else if(data[i].type =='indicator'){
                                    this.facilityIndicator.push(data[i].id);
                                    this.facilityIndicator=[...new Set(this.facilityIndicator)];
                                    this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                                }else if(data[i].type =='station'){
                                    this.facilityStation.push(data[i].id);
                                    this.facilityStation=[...new Set(this.facilityStation)];
                                    this.$store.commit('FACILITY_STATION', this.facilityStation)
                                }
                                if(data[i].typeroad=='road'){
                                    this.facilityRoad.push(data[i].id);
                                    this.facilityRoad=[...new Set(this.facilityRoad)];
                                    this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                                }
                            }
                        }else {
                            for (let i = 0; i < this.getTreeState[0].children.length; i++) {
                                // console.log(this.getTreeState[0].children)
                                if(this.getTreeState[0].children[i].typeroad=='road'){
                                    this.roadHide(this.getTreeState[0].children[i]);
                                }else if(this.getTreeState[0].children[i].type =='transport' || this.getTreeState[0].children[i].type =='security'){
                                    this.treeHide(this.getTreeState[0].children[i]);
                                } else {
                                    if(this.getTreeState[0].children[i].type =='person'){
                                        this.roadHideID(this.getTreeState[0].children[i].routeId)
                                    }else if(this.getTreeState[0].children[i].type =='warn'){
                                        this.treeHide(this.getTreeState[0].children[i]);
                                    }else {
                                        this.treeHide(this.getTreeState[0].children[i]);
                                    }
                                }
                                if(this.getTreeState[0].children[i].type=='light'){
                                    let index = this.controleLightList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleLightList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                                }else if(this.getTreeState[0].children[i].type=='environment'){
                                    let index = this.controleEnvironmentList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleEnvironmentList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                                }else if(this.getTreeState[0].children[i].type=='wifi'){
                                    let index = this.controleWifiList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleWifiList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                                }else if(this.getTreeState[0].children[i].type=='broad'){
                                    let index = this.controleBroadList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleBroadList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                                }else if(this.getTreeState[0].children[i].type=='camera'){
                                    let index = this.controleCameraList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleCameraList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                                }else if(this.getTreeState[0].children[i].type=='led'){
                                    let index = this.controleLedList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleLedList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_LED', this.controleLedList)
                                }else if(this.getTreeState[0].children[i].type=='transport'){
                                    let index = this.controleTransportList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleTransportList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                                }else if(this.getTreeState[0].children[i].type=='security'){
                                    let index = this.controleSecurityPersonList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleSecurityPersonList.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleTransportList)
                                } else if(this.getTreeState[0].children[i].type=='park'){
                                    let index = this.facilityPark.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityPark.splice(index, 1);
                                    }
                                    this.$store.commit('CONTROLER_LED', this.facilityPark)
                                } else if(this.getTreeState[0].children[i].type =='toilet'){
                                    let index = this.facilityToilet.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityToilet.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                                }else if(this.getTreeState[0].children[i].type =='shop'){
                                    let index = this.facilityShop.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityShop.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_SHOP', this.facilityShop)
                                }else if(this.getTreeState[0].children[i].type =='build'){
                                    let index = this.facilityBuild.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityBuild.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                                }else if(this.getTreeState[0].children[i].type =='scenic'){
                                    let index = this.facilityScenic.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityScenic.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                                } else if(this.getTreeState[0].children[i].type =='trash'){
                                    let index = this.facilityTrash.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityTrash.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                                } else if(this.getTreeState[0].children[i].type =='plant'){
                                    let index = this.facilityPlant.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityPlant.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                                } else if(this.getTreeState[0].children[i].type=='indicator'){
                                    let index = this.facilityIndicator.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityIndicator.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                                }else if(this.getTreeState[0].children[i].type =='station'){
                                    let index = this.facilityStation.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityStation.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_STATION', this.facilityStation)
                                }
                                if(this.getTreeState[0].children[i].typeroad=='road'){
                                    let index = this.facilityRoad.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.facilityRoad.splice(index, 1);
                                    }
                                    this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                                }
                            }
                        }
                    }else {
                        if (this.getTreeState[0].checked.checkedKeys.includes(this.getTreeState[0].id)) {
                            if(this.getTreeState[0].typeroad=='road'){
                                this.roadShow(this.getTreeState[0]);
                            }else {
                                if(this.getTreeState[0].type =='person'){
                                    this.roadShowID(this.getTreeState[0].routeId)
                                }else if(this.getTreeState[0].type =='warn'){
                                    this.treeShow(this.getTreeState[0]);
                                }else if(this.getTreeState[0].type =='transport' || this.getTreeState[0].type =='security'){
                                    if(this.getTreeState[0].status == "ONLINE"){
                                        this.treeShow(this.getTreeState[0]);
                                    }
                                }else {
                                    this.treeShow(this.getTreeState[0]);
                                }
                            }
                            if(this.getTreeState[0].type=='light'){
                                this.controleLightList.push(this.getTreeState[0].id);
                                this.controleLightList=[...new Set(this.controleLightList)];
                                this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                            }else if(this.getTreeState[0].type=='environment'){
                                this.controleEnvironmentList.push(this.getTreeState[0].id);
                                this.controleEnvironmentList=[...new Set(this.controleEnvironmentList)];
                                this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                            }else if(this.getTreeState[0].type=='wifi'){
                                this.controleWifiList.push(this.getTreeState[0].id);
                                this.controleWifiList=[...new Set(this.controleWifiList)];
                                this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                            }else if(this.getTreeState[0].type=='broad'){
                                this.controleBroadList.push(this.getTreeState[0].id);
                                this.controleBroadList=[...new Set(this.controleBroadList)];
                                this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                            }else if(this.getTreeState[0].type=='camera'){
                                this.controleCameraList.push(this.getTreeState[0].id);
                                this.controleCameraList=[...new Set(this.controleCameraList)];
                                this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                            }else if(this.getTreeState[0].type=='led'){
                                this.controleLedList.push(this.getTreeState[0].id);
                                this.controleLedList=[...new Set(this.controleLedList)];
                                this.$store.commit('CONTROLER_LED', this.controleLedList)
                            }else if(this.getTreeState[0].type=='transport'){
                                this.controleTransportList.push(this.getTreeState[0].id);
                                this.controleTransportList=[...new Set(this.controleTransportList)];
                                this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                            }else if(this.getTreeState[0].type=='security'){
                                this.controleSecurityPersonList.push(this.getTreeState[0].id);
                                this.controleSecurityPersonList=[...new Set(this.controleSecurityPersonList)];
                                this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleSecurityPersonList)
                            }else if(this.getTreeState[0].type=='park'){
                                this.facilityPark.push(this.getTreeState[0].id);
                                this.facilityPark=[...new Set(this.facilityPark)];
                                this.$store.commit('CONTROLER_LED', this.facilityPark)
                            }else if(this.getTreeState[0].type =='toilet'){
                                this.facilityToilet.push(this.getTreeState[0].id);
                                this.facilityToilet=[...new Set(this.facilityToilet)];
                                this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                            }else if(this.getTreeState[0].type =='shop'){
                                this.facilityShop.push(this.getTreeState[0].id);
                                this.facilityShop=[...new Set(this.facilityShop)];
                                this.$store.commit('FACILITY_SHOP', this.facilityShop)
                            }else if(this.getTreeState[0].type =='build'){
                                this.facilityBuild.push(this.getTreeState[0].id);
                                this.facilityBuild=[...new Set(this.facilityBuild)];
                                this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                            }else if(this.getTreeState[0].type =='scenic'){
                                this.facilityScenic.push(this.getTreeState[0].id);
                                this.facilityScenic=[...new Set(this.facilityScenic)];
                                this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                            } else if(this.getTreeState[0].type  =='trash'){
                                this.facilityTrash.push(this.getTreeState[0].id);
                                this.facilityTrash=[...new Set(this.facilityTrash)];
                                this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                            } else if(this.getTreeState[0].type  =='plant'){
                                this.facilityPlant.push(this.getTreeState[0].id);
                                this.facilityPlant=[...new Set(this.facilityPlant)];
                                this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                            } else if(this.getTreeState[0].type=='indicator'){
                                this.facilityIndicator.push(this.getTreeState[0].id);
                                this.facilityIndicator=[...new Set(this.facilityIndicator)];
                                this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                            }else if(this.getTreeState[0].type  =='station'){
                                this.facilityStation.push(this.getTreeState[0].id);
                                this.facilityStation=[...new Set(this.facilityStation)];
                                this.$store.commit('FACILITY_STATION', this.facilityStation)
                            }
                            if(this.getTreeState[0].typeroad=='road'){
                                this.facilityRoad.push(this.getTreeState[0].id);
                                this.facilityRoad=[...new Set(this.facilityRoad)];
                                this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                            }
                        } else {
                            if(this.getTreeState[0].typeroad=='road'){
                                this.roadHide(this.getTreeState[0]);
                            }else {
                                if(this.getTreeState[0].type =='person'){
                                    this.roadHideID(this.getTreeState[0].routeId)
                                }else if(this.getTreeState[0].type =='warn'){
                                    this.treeHide(this.getTreeState[0]);
                                }else if(this.getTreeState[0].type =='transport' || this.getTreeState[0].type =='security'){

                                    if(this.getTreeState[0].status == "ONLINE"){
                                        this.treeHide(this.getTreeState[0]);
                                    }
                                }
                                else {
                                    this.treeHide(this.getTreeState[0]);
                                }
                            }
                            if(this.getTreeState[0].type=='light'){
                                let index = this.controleLightList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleLightList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                            }else if(this.getTreeState[0].type=='environment'){
                                let index = this.controleEnvironmentList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleEnvironmentList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                            }else if(this.getTreeState[0].type=='wifi'){
                                let index = this.controleWifiList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleWifiList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_WIFI', this.controleWifiList)
                            }else if(this.getTreeState[0].type=='broad'){
                                let index = this.controleBroadList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleBroadList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_BROAD', this.controleBroadList)
                            }else if(this.getTreeState[0].type=='camera'){
                                let index = this.controleCameraList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleCameraList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_CAMERA', this.controleCameraList)
                            }else if(this.getTreeState[0].type=='led'){
                                let index = this.controleLedList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleLedList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_LED', this.controleLedList)
                            }else if(this.getTreeState[0].type=='transport'){
                                let index = this.controleTransportList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleTransportList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_TRANSPORT', this.controleTransportList)
                            }else if(this.getTreeState[0].type=='security'){
                                let index = this.controleSecurityPersonList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleSecurityPersonList.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_SECURITY_PERSON', this.controleSecurityPersonList)
                            }else if(this.getTreeState[0].type=='park'){
                                let index = this.facilityPark.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityPark.splice(index, 1);
                                }
                                this.$store.commit('CONTROLER_LED', this.facilityPark)
                            }else if(this.getTreeState[0].type =='toilet'){
                                let index = this.facilityToilet.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityToilet.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_TOILET', this.facilityToilet)
                            }else if(this.getTreeState[0].type =='shop'){
                                let index = this.facilityShop.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityShop.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_SHOP', this.facilityShop)
                            }else if(this.getTreeState[0].type =='build'){
                                let index = this.facilityBuild.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityBuild.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_BUILD', this.facilityBuild)
                            }else if(this.getTreeState[0].type =='scenic'){
                                let index = this.facilityScenic.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityScenic.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_SCENIC', this.facilityScenic)
                            }else if(this.getTreeState[0].type  =='trash'){
                                let index = this.facilityTrash.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityTrash.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_TRASH', this.facilityTrash)
                            } else if(this.getTreeState[0].type  =='plant'){
                                let index = this.facilityPlant.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityPlant.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_PLANT', this.facilityPlant)
                            } else if(this.getTreeState[0].type=='indicator'){
                                let index = this.facilityIndicator.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityIndicator.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_INDICATOR', this.facilityIndicator)
                            }else if(this.getTreeState[0].type  =='station'){
                                let index = this.facilityStation.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityStation.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_STATION', this.facilityStation)
                            }
                            if(this.getTreeState[0].typeroad=='road'){
                                let index = this.facilityRoad.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.facilityRoad.splice(index, 1);
                                }
                                this.$store.commit('FACILITY_ROAD', this.facilityRoad)
                            }
                        }
                    }
                }
            },
            getTreeShow(){
                if(this.getTreeShow.length!=0){
                    if(this.getTreeShow.typeroad=='road'){
                        this.roadShow(this.getTreeShow);
                    }else {
                        if(this.getTreeShow.type =='person'){
                            this.roadShowID(this.getTreeShow.routeId);
                        }else if(this.getTreeShow.type == "transport") {
                            console.log(this.getTreeShow,'1')
                            if(this.getTreeShow.status == "ONLINE"){
                                this.treeShow(this.getTreeShow);
                                let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                this.menulist = layer.data;
                                let route = this.$route.path
                                if (route.includes('controler')) {
                                    this.droreMappopup(layer);
                                }
                            }else{
                                let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                this.menulist = layer.data;
                                let route = this.$route.path
                                if (route.includes('controler')) {
                                    this.menuShow()
                                    $("#contextmenu_container").hide();
                                }
                            }
                        }else if(this.getTreeShow.type == "security") {
                            console.log(this.getTreeShow,'1')
                            if(this.getTreeShow.status == "ONLINE"){
                                this.treeShow(this.getTreeShow);
                                let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                this.menulist = layer.data;
                                let route = this.$route.path
                                if (route.includes('controler')) {
                                    this.droreMappopup(layer);
                                }
                            }else{
                                let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                this.menulist = layer.data;
                                let route = this.$route.path
                                if (route.includes('controler')) {
                                    this.menuShow()
                                    $("#contextmenu_container").hide();
                                }
                            }
                        } else if(this.getTreeShow.type == "led") {
                            console.log(this.getTreeShow,'1')
                            if(this.getTreeShow.status == "ONLINE"){
                                this.treeShow(this.getTreeShow);
                                // let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                // this.menulist = layer.data;
                                // let route = this.$route.path
                                // if (route.includes('controler')) {
                                //     this.droreMappopup(layer);
                                // }
                            }else{
                                this.treeShow(this.getTreeShow);
                                // let layer = droreMap.icon.returnLayer(this.getTreeShow.id)
                                // this.menulist = layer.data;
                                // let route = this.$route.path
                                // if (route.includes('controler')) {
                                //     this.menuShow()
                                //     $("#contextmenu_container").hide();
                                // }
                            }
                        }else {
                            this.treeShow(this.getTreeShow);
                            let route = this.$route.path
                            if(route.includes('controler')){
                                let layer =  droreMap.icon.returnLayer(this.getTreeShow.id)
                                this.menulist = layer.data;
                                this.droreMappopup(layer);
                            }
                        }
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'getTransportType',
                'getLocationId',
                'getSearchInfo',
                'getTreeState',
                'getcontroleLight',
                'getcontroleEnvironment',
                'getcontroleWifi',
                'getcontroBroad',
                'getcontroCamera',
                'getcontroLed',
                'getcontroTransport',
                'getcontrolSecurityPerson',
                'getfacilityPark',
                'getfacilityToilet',
                'getfacilityShop',
                'getfacilityBuild',
                'getfacilityScenic',
                'getfacilityTrash',
                'getfacilityPlant',
                'getfacilityIndicator',
                'getfacilityRoad',
                'getfacilityStation',
                'getTreeShow'
            ])
        }
    }
</script>
<style lang="scss" >
    .ol-control,.ol-scale-line {
        position:absolute;
        padding:2px
    }
    .ol-box {
        box-sizing:border-box;
        border-radius:2px;
        border:2px solid #00f
    }
    .ol-mouse-position {
        top:8px;
        right:8px;
        position:absolute
    }
    .ol-scale-line {
        background:rgba(0,60,136,.3);
        border-radius:4px;
        bottom:8px;
        left:8px
    }
    .ol-scale-line-inner {
        border:1px solid #eee;
        border-top:none;
        color:#eee;
        font-size:10px;
        text-align:center;
        margin:1px;
        will-change:contents,width
    }
    .ol-overlay-container {
        will-change:left,right,top,bottom
    }
    .ol-unsupported {
        display:none
    }
    .ol-viewport .ol-unselectable {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        -webkit-tap-highlight-color:transparent
    }
    .ol-control {
        background-color:rgba(255,255,255,.4);
        border-radius:4px
    }
    .ol-control:hover {
        background-color:rgba(255,255,255,.6)
    }
    .ol-zoom {
        top:.5em;
        left:.5em
    }
    .ol-rotate {
        top:.5em;
        right:.5em;
        transition:opacity .25s linear,visibility 0s linear
    }
    .ol-rotate.ol-hidden {
        opacity:0;
        visibility:hidden;
        transition:opacity .25s linear,visibility 0s linear .25s
    }
    .ol-zoom-extent {
        top:4.643em;
        left:.5em
    }
    .ol-full-screen {
        right:.5em;
        top:.5em
    }
    @media print {
        .ol-control {
            display:none
        }
    }.ol-control button {
         display:block;
         margin:1px;
         padding:0;
         color:#fff;
         font-size:1.14em;
         font-weight:700;
         text-decoration:none;
         text-align:center;
         height:1.375em;
         width:1.375em;
         line-height:.4em;
         background-color:rgba(0,60,136,.5);
         border:none;
         border-radius:2px
     }
    .ol-control button::-moz-focus-inner {
        border:none;
        padding:0
    }
    .ol-zoom-extent button {
        line-height:1.4em
    }
    .ol-compass {
        display:block;
        font-weight:400;
        font-size:1.2em;
        will-change:transform
    }
    .ol-touch .ol-control button {
        font-size:1.5em
    }
    .ol-touch .ol-zoom-extent {
        top:5.5em
    }
    .ol-control button:focus,.ol-control button:hover {
        text-decoration:none;
        background-color:rgba(0,60,136,.7)
    }
    .ol-zoom .ol-zoom-in {
        border-radius:2px 2px 0 0
    }
    .ol-zoom .ol-zoom-out {
        border-radius:0 0 2px 2px
    }
    .ol-attribution {
        text-align:right;
        bottom:.5em;
        right:.5em;
        max-width:calc(100% - 1.3em)
    }
    .ol-attribution ul {
        margin:0;
        padding:0 .5em;
        font-size:.7rem;
        line-height:1.375em;
        color:#000;
        text-shadow:0 0 2px #fff
    }
    .ol-attribution li {
        display:inline;
        list-style:none;
        line-height:inherit
    }
    .ol-attribution li:not(:last-child):after {
        content:" "
    }
    .ol-attribution img {
        max-height:2em;
        max-width:inherit;
        vertical-align:middle
    }
    .ol-attribution button,.ol-attribution ul {
        display:inline-block
    }
    .ol-attribution.ol-collapsed ul {
        display:none
    }
    .ol-attribution.ol-logo-only ul {
        display:block
    }
    .ol-attribution:not(.ol-collapsed) {
        background:rgba(255,255,255,.8)
    }
    .ol-attribution.ol-uncollapsible {
        bottom:0;
        right:0;
        border-radius:4px 0 0;
        height:1.1em;
        line-height:1em
    }
    .ol-attribution.ol-logo-only {
        background:0 0;
        bottom:.4em;
        height:1.1em;
        line-height:1em
    }
    .ol-attribution.ol-uncollapsible img {
        margin-top:-.2em;
        max-height:1.6em
    }
    .ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button {
        display:none
    }
    .ol-zoomslider {
        top:4.5em;
        left:.5em;
        height:200px
    }
    .ol-zoomslider button {
        position:relative;
        height:10px
    }
    .ol-touch .ol-zoomslider {
        top:5.5em
    }
    .ol-overviewmap {
        left:.5em;
        bottom:.5em
    }
    .ol-overviewmap.ol-uncollapsible {
        bottom:0;
        left:0;
        border-radius:0 4px 0 0
    }
    .ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button {
        display:inline-block
    }
    .ol-overviewmap .ol-overviewmap-map {
        border:1px solid #7b98bc;
        height:144px;
        margin:2px;
        width:264px;
        background: #000;
    }
    .ol-overviewmap:not(.ol-collapsed) button {
        bottom:1px;
        left:2px;
        position:absolute
    }
    .ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button {
        display:none
    }
    .ol-overviewmap:not(.ol-collapsed) {
        background:rgba(255,255,255,.8)
    }
    .ol-overviewmap-box {
        border:2px dotted rgba(0,60,136,.7)
    }
    .contextmenu{
        .mapSwitch{
            height: rem(16);
            line-height: rem(16);
            .el-switch__core{
                height: rem(16);
                outline: none
            }
            .el-switch__core:after{
                width: rem(12);
                height: rem(12);
            }
        }
        .mapSwitch.el-switch.is-checked .el-switch__core::after{
            margin-left: -13px;
        }
    }
</style>
<style lang="scss" scoped>
    #map{
        width: 100%;
        height: 100%;
    }
    .contextmenu{
        background: url("/static/img/icon_bg.png") no-repeat;
        width:rem(120);
        height: rem(76);
        position: relative;
        display: none;
        .menuBroadvolume{
            position: absolute;
            right: -55px;
            top: -43px;
            padding: 0 rem(20);
            width: rem(200);
            background:rgba(255,255,255,0.7);
            border-radius: rem(5);
        }
        i{
            cursor: pointer;
            display: inline-block;
            width: rem(46);
            height: rem(58);
            position: absolute;
            top:rem(37);
            left: rem(37);
        }
        button{
            position: absolute;
            cursor: pointer;
            border: none;
            outline:none;
            width: rem(20);
            height: rem(20);
        }
        .mapSwitch{
            position: absolute;
            left:rem(5);
            bottom:rem(12);
        }
        button.menuShow{
            background: url("/static/img/menuShow.svg");
            background-size: cover;
            top:rem(8);
            left: rem(50);
            width: rem(24);
            height: rem(24);
        }

        button.menuOperation{
            background: url("/static/img/menuOperation.svg");
            background-size: cover;
            right:rem(7);
            bottom: rem(12);
            /*top:rem(10);*/
            /*left: rem(50);*/
        }
        button.menuBroadcast{
            background: url("/static/img/ware_broadcast.svg");
            background-size: cover;
            left:rem(5);
            bottom:rem(12);
            display: none;
            width: rem(24);
            height: rem(24);
        }
        button.menuCamera{
            background: url("/static/img/menuCamera.svg");
            background-size: cover;
            right:rem(30);
            top:rem(15);
            display: none;
        }
        button.menuCamera{
            background: url("/static/img/menuCamera.svg");
            background-size: cover;
            right:rem(30);
            top:rem(15);
            display: none;
        }
        button.menuCarCamera{
            background: url("/static/img/menuCamera.svg");
            background-size: cover;
            right:rem(30);
            top:rem(15);
            display: none;
        }
        button.menuPhone{
            background: url("/static/img/menuPhone.svg");
            background-size: cover;
            right:rem(5);
            bottom: rem(8);
            display: none;
        }
        button.menuBroad{
            background: url("/static/img/ware_broadcast.svg");
            background-size: cover;
            right:rem(28);
            top:rem(13);
            display: none;
            width: rem(24);
            height: rem(24);
        }

        button.warnCamera{
            background: url("/static/img/menuCamera.svg");
            background-size: cover;
            right:rem(30);
            top:rem(15);
            display: none;
        }
        button.showCast{
            background: url("/static/img/broadcast.svg");
            background-size: cover;
            top:rem(8);
            left: rem(70);
            width: rem(24);
            height: rem(24);
            display:none;
        }
    }
    .broadcast_close{
        button.showCast{
            display: block;
        }
        button.menuShow{
            left:rem(30)
        }
    }
    .contextmenu.Light i{
        background: url("/static/img/icon/Light_big.png") no-repeat;
    }
    .contextmenu.Light_close i{
        background: url("/static/img/icon/Light_close_big.png") no-repeat;
    }
    .contextmenu.Light_damage i{
        background: url("/static/img/icon/Light_damage_big.png") no-repeat;
    }
    .contextmenu.Monitors i{
        background: url("/static/img/icon/Monitors_big.png") no-repeat;
    }
    .contextmenu.Monitors_close i{
        background: url("/static/img/icon/Monitors_close_big.png") no-repeat;
    }
    .contextmenu.Monitors_damage i{
        background: url("/static/img/icon/Monitors_damage_big.png") no-repeat;
    }
    .contextmenu.wifi i{
        background: url("/static/img/icon/wifi_big.png") no-repeat;
    }
    .contextmenu.wifi_close i{
        background: url("/static/img/icon/wifi_close_big.png") no-repeat;
    }
    .contextmenu.wifi_damage i{
        background: url("/static/img/icon/wifi_damage_big.png") no-repeat;
    }
    .contextmenu.broadcast i{
        background: url("/static/img/icon/broadcast_big.png") no-repeat;
    }
    .contextmenu.broadcast_close i{
        background: url("/static/img/icon/broadcast_close_big.png") no-repeat;
    }
    .contextmenu.broadcast_damage i{
        background: url("/static/img/icon/broadcast_damage_big.png") no-repeat;
    }
    .contextmenu.camera i{
        background: url("/static/img/icon/camera_big.png") no-repeat;
    }
    .contextmenu.camera_close i{
        background: url("/static/img/icon/camera_close_big.png") no-repeat;
    }
    .contextmenu.camera_damage i{
        background: url("/static/img/icon/camera_damage_big.png") no-repeat;
    }
    .contextmenu.led i{
        background: url("/static/img/icon/led_big.png") no-repeat;
    }
    .contextmenu.led_close i{
        background: url("/static/img/icon/led_close_big.png") no-repeat;
    }
    .contextmenu.led_damage i{
        background: url("/static/img/icon/led_damage_big.png") no-repeat;
    }
    .contextmenu.Broadcast i{
        background: url("/static/img/icon/guangboshebei_big.png") no-repeat;
    }

    .contextmenu.car i{
        background: url("/static/img/icon/bus_big.png") no-repeat;
    }
    .contextmenu.car_damage i{
        background: url("/static/img/icon/bus_damage_big.png") no-repeat;
    }

    .contextmenu.boat i{
        background: url("/static/img/icon/boat_big.png") no-repeat;
    }

    .contextmenu.boat_damage i{
        background: url("/static/img/icon/boat_damage_big.png") no-repeat;
    }
    .contextmenu.securityPerson i{
        background: url("/static/img/icon/people_big.svg") no-repeat;
    }

    .contextmenu.car,.contextmenu.car_damage,.contextmenu.boat,.contextmenu.boat_damage{
        .mapSwitch{
            display: none;
        }
        button.warnCamera,button.menuBroad{
            display: none;
        }
        button.menuShow,button.menuOperation,button.menuBroadcast,button.menuCarCamera{
            display: block;
        }
    }
    .contextmenu.camera,.contextmenu.camera_close,.contextmenu.camera_damage
    {
        button.menuShow{
            left:rem(30);
            top:rem(15);
        }
        button.menuCamera{
            display: block;
        }
    }
    .contextmenu.broadcast
    {
        button.menuShow{
            left:rem(28);
            top:rem(13);
        }
        button.menuBroad{
            display: block;
        }

    }
    .contextmenu.alarmcolumnRule_one,.contextmenu.alarmcolumnRule_two,.contextmenu.alarmcolumnRule_three,
    .contextmenu.firefightingRule_one,.contextmenu.firefightingRule_two,.contextmenu.firefightingRule_three,
    .contextmenu.crossborderRule_one,.contextmenu.crossborderRule_two,.contextmenu.crossborderRule_three,
    .contextmenu.speedingRule_one,.contextmenu.speedingRule_two,.contextmenu.speedingRule_three,
    .contextmenu.offtrackRule_one,.contextmenu.offtrackRule_two,.contextmenu.offtrackRule_three,
    .contextmenu.overlimitRule_one,.contextmenu.overlimitRule_two,.contextmenu.overlimitRule_three,
    .contextmenu.waterlevelRule_one,.contextmenu.waterlevelRule_two,.contextmenu.waterlevelRule_three,
    .contextmenu.conditionRule_one,.contextmenu.conditionRule_two,.contextmenu.conditionRule_three
    {
        .mapSwitch{
            display: none;
        }
        button.menuBroadcast{
            display: block;
        }
        button.menuShow{
            left:rem(30);
            top:rem(15);
        }
        button.warnCamera{
            display: block;
        }
    }
    .contextmenu.alarmcolumnRule_one i{
        background: url("/static/img/icon/alarmcolumnRule_one_big.png") no-repeat;
    }
    .contextmenu.alarmcolumnRule_two i{
        background: url("/static/img/icon/alarmcolumnRule_two_big.png") no-repeat;
    }
    .contextmenu.alarmcolumnRule_three i{
        background: url("/static/img/icon/alarmcolumnRule_three_big.png") no-repeat;
    }
    .contextmenu.firefightingRule_one i{
        background: url("/static/img/icon/firefightingRule_one_big.png") no-repeat;
    }
    .contextmenu.firefightingRule_two i{
        background: url("/static/img/icon/firefightingRule_two_big.png") no-repeat;
    }
    .contextmenu.firefightingRule_three i{
        background: url("/static/img/icon/firefightingRule_three_big.png") no-repeat;
    }

    .contextmenu.crossborderRule_one i{
        background: url("/static/img/icon/crossborderRule_one_big.png") no-repeat;
    }
    .contextmenu.crossborderRule_two i{
        background: url("/static/img/icon/crossborderRule_two_big.png") no-repeat;
    }
    .contextmenu.crossborderRule_three i{
        background: url("/static/img/icon/crossborderRule_three_big.png") no-repeat;
    }

    .contextmenu.speedingRule_one i{
        background: url("/static/img/icon/speedingRule_one_big.png") no-repeat;
    }
    .contextmenu.speedingRule_two i{
        background: url("/static/img/icon/speedingRule_two_big.png") no-repeat;
    }
    .contextmenu.speedingRule_three i{
        background: url("/static/img/icon/speedingRule_three_big.png") no-repeat;
    }

    .contextmenu.offtrackRule_one i{
        background: url("/static/img/icon/offtrackRule_one_big.png") no-repeat;
    }
    .contextmenu.offtrackRule_two i{
        background: url("/static/img/icon/offtrackRule_two_big.png") no-repeat;
    }
    .contextmenu.offtrackRule_three i{
        background: url("/static/img/icon/offtrackRule_three_big.png") no-repeat;
    }

    .contextmenu.overlimitRule_one i{
        background: url("/static/img/icon/overlimitRule_one_big.png") no-repeat;
    }
    .contextmenu.overlimitRule_two i{
        background: url("/static/img/icon/overlimitRule_two_big.png") no-repeat;
    }
    .contextmenu.overlimitRule_three i{
        background: url("/static/img/icon/overlimitRule_three_big.png") no-repeat;
    }

    .contextmenu.waterlevelRule_one i{
        background: url("/static/img/icon/waterlevelRule_one_big.png") no-repeat;
    }
    .contextmenu.waterlevelRule_two i{
        background: url("/static/img/icon/waterlevelRule_two_big.png") no-repeat;
    }
    .contextmenu.waterlevelRule_three i{
        background: url("/static/img/icon/waterlevelRule_three_big.png") no-repeat;
    }

    .contextmenu.conditionRule_one i{
        background: url("/static/img/icon/conditionRule_one_big.png") no-repeat;
    }
    .contextmenu.conditionRule_two i{
        background: url("/static/img/icon/conditionRule_two_big.png") no-repeat;
    }
    .contextmenu.conditionRule_three i{
        background: url("/static/img/icon/conditionRule_three_big.png") no-repeat;
    }

    .contextmenu.gate,.contextmenu.police,.contextmenu.trash,.contextmenu.scenic,.contextmenu.construction,.contextmenu.plant,.contextmenu.park,.contextmenu.toilet,.contextmenu.indicator,.contextmenu.shop,
    .contextmenu.station,.contextmenu.landing{
        background: none;
        width: 0;
        height: 0;
        button,.mapSwitch{
            display: none;
        }
    }
    .contextmenu.gate i,.contextmenu.police i{
        display: none;
    }
    .contextmenu.station i{
        background: url("/static/img/icon/station_big.png") no-repeat;
    }
    .contextmenu.landing i{
        background: url("/static/img/icon/landing_big.png") no-repeat;
    }
    .contextmenu.trash i{
        background: url("/static/img/icon/trash_big.png") no-repeat;
    }
    .contextmenu.scenic i{
        background: url("/static/img/icon/scenic_big.png") no-repeat;
    }
    .contextmenu.construction i{
        background: url("/static/img/icon/construction_big.png") no-repeat;
    }
    .contextmenu.plant i{
        background: url("/static/img/icon/plant_big.png") no-repeat;
    }
    .contextmenu.park i{
        background: url("/static/img/icon/park_big.png") no-repeat;
    }
    .contextmenu.toilet i{
        background: url("/static/img/icon/toilet_big.png") no-repeat;
    }
    .contextmenu.indicator i{
        background: url("/static/img/icon/indicator_big.png") no-repeat;
    }
    .contextmenu.shop i{
        background: url("/static/img/icon/shop_big.png") no-repeat;
    }

</style>
