<template>
    <Scrollcontainer>
        <div id="map" class="map">

        </div>
        <div id="contextmenu_container" class="contextmenu">
            <i @click="menuDelete"></i>
            <el-switch
                class="mapSwitch"
                v-model="open"
                :width="26"
                active-color="#53b6a7"
                inactive-color="#808080"
                @change="mapSwitch">
            </el-switch>
            <button @click="menuShow" class="menuShow"></button>
            <button @click="menuOperation" class="menuOperation"></button>
            <button @click="menuPhone" class="menuPhone"></button>
            <button @click="menuBroadcast" class="menuBroadcast"></button>
        </div>
        <PersonDetail v-if="visible"
                      :Info="buildInfo"
                      :title="title"
                      :visible="visible"
                      @closeInfoDialog ="closeDialog">
        </PersonDetail>
    </Scrollcontainer>

</template>

<script>
    import droreMap from "../../static/js/droreMap.js"
    import Event from "../../static/js/static.js"
    import Scrollcontainer from '@/components/ScrollContainer'
    import { mapMutations,mapGetters } from 'vuex'
    import api from '@/api'
    import PersonDetail from '@/components/controlDialog'

    export default {
        name: "map1",
        data () {
            return {
                open:false,
                menulist: {},
                controleLightList:[],
                controleEnvironmentList:[],
                buildInfo:[],
                visible:false,
                title:'',
                isDisabled: true,
                lightCheckout:[],
            }
        },
        created () {

        },
        mounted() {
            // droreMap.init();
            this.requestGisMain();//加载地图
            droreMap.object.getMap().getLayers().getArray()[1].setVisible(false)
            let route = this.$route.path
            if (route.includes('facility')) {
                droreMap.interaction.showMove()
                // this.getAllIndicator();//指示牌现有标注
                // this.getAllTrash();//垃圾桶现有标注
                // this.getAllScenic();//景点现有标注
                // this.getAllShop();//商圈现有标注
                // this.getAllPark();//停车场现有标注
                // this.getAllToilet();//卫生间现有标注
                // this.getAllTree();//植物现有标注
                // this.getAllBuild();//建筑现有标注
                this.overView();//鹰眼
            }else if (route.includes('controler')) {
                droreMap.interaction.enableMapClick = true
                droreMap.interaction.showMove()
                this.getAllLight();//路灯现有标注
                // this.getAllGate();//闸机现有标注
                this.getAllWifi();//wifi现有标注
                // this.getAllLed();//Led现有标注
                // this.getAllPolice();//报警柱现有标注
                this.getAllMonitor();//传感器现有标注
                // this.getAllBroadcast();//广播现有标注
                // this.getAllCamera();//摄像头现有标注
                this.overView();//鹰眼
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
                    this.getAllRoute();// 调度路线输出
                    this.road(); // 路线打点
                }else {
                    this.getAllRouteedit();//修改路线调度
                }
            } else if (route.includes('indicator-deploy'))  {
                this.getAllArea();// 片区输出
                if(!this.getLocationId) {
                    this.getAllIndicator();//指示牌现有标注
                    this.labelDot();// 指示牌打点
                }else {
                    this.getAllIndicatorEdit();// 指示牌修改
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
            }else {
                this.labelDot();// 打点
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
                            "path": "/static/map_xxsd/map{z}/{x},{y}.jpg",
                            "curZoom": obj.scefit + obj.initlevel,
                            "minZoom": obj.scefit,
                            "maxZoom": obj.scefit + obj.zoom - 1
                        }
                        droreMap.init(mapdata, data.data);
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
                    url: "/static/img/location.png",
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
            async getAllIndicator () {//指示牌
                await api.indicator.getAllIndicator().then(res => {
                    this.indicatorList = res
                    for (let i = 0; i < this.indicatorList.length; i++) {
                        this.indicatorList[i].location = [this.indicatorList[i].longitude,this.indicatorList[i].latitude]
                        if(this.indicatorList[i].signboardBean.type=='0'){
                            var type='标语';
                        }else if(this.indicatorList[i].signboardBean.type=='1'){
                            var type='路线';
                        }else {
                            var type='设施';
                        }
                        var Indicator = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.indicatorList[i].location),
                            name: type,
                            subtype: "Indicator",
                            id: this.indicatorList[i].signboardBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/zhilupai.png"
                        });
                        droreMap.icon.addChild(Indicator);
                        Indicator.onclick(function(e) {
                            this.popup(e);
                        });
                    }

                }).catch(err => {
                    console.log(err)
                })
            },

            async getAllIndicatorEdit () {//指示牌修改
                await api.indicator.getAllIndicator().then(res => {
                    this.indicatorList = res
                    for (let i = 0; i < this.indicatorList.length; i++) {
                        if(this.indicatorList[i].signboardBean.id === this.getLocationId){
                            this.indicatorList[i].location = [this.indicatorList[i].longitude,this.indicatorList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.indicatorList[i].location),
                                name: this.indicatorList[i].regionName,
                                subtype: "droreMapinit",
                                id: this.indicatorList[i].signboardBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                name: this.indicatorList[i].regionName,
                                subtype: "droreMapinit",
                                id: this.indicatorList[i].signboardBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/zhilupai.png"
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
                    this.trashList = res
                    for (let i = 0; i < this.trashList.length; i++) {
                        this.trashList[i].location = [this.trashList[i].longitude,this.trashList[i].latitude]
                        var Trash = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.trashList[i].location),
                            name: this.trashList[i].dustbinBean.name,
                            subtype: "Trash",
                            id: this.trashList[i].dustbinBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/lajitong.png"
                        });
                        droreMap.icon.addChild(Trash);
                    }
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
                                subtype: "droreMapinit",
                                id: this.trashList[i].dustbinBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.trashList[i].dustbinBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/lajitong.png"
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
                    this.scenicList = res
                    for (let i = 0; i < this.scenicList.length; i++) {
                        this.scenicList[i].location = [this.scenicList[i].longitude,this.scenicList[i].latitude]
                        var Scenic = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.scenicList[i].location),
                            name: this.scenicList[i].scenicspotBean.name,
                            subtype: "Scenic",
                            id: this.scenicList[i].scenicspotBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/jingdian.png"
                        });
                        droreMap.icon.addChild(Scenic);
                    }
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
                                subtype: "droreMapinit",
                                id: this.scenicList[i].scenicspotBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.scenicList[i].scenicspotBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/jingdian.png"
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
                    this.shopList = res
                    for (let i = 0; i < this.shopList.length; i++) {
                        this.shopList[i].location = [this.shopList[i].longitude,this.shopList[i].latitude]
                        var Shop = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.shopList[i].location),
                            name: this.shopList[i].businessBean.name,
                            subtype: "Shop",
                            id: this.shopList[i].businessBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shangchang.png"
                        });
                        droreMap.icon.addChild(Shop);
                    }
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
                                subtype: "iconedit",
                                id: this.shopList[i].businessBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.shopList[i].businessBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shangchang.png"
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
                    this.parkList = res
                    for (let i = 0; i < this.parkList.length; i++) {
                        this.parkList[i].location = [this.parkList[i].longitude,this.parkList[i].latitude]
                        var Park = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.parkList[i].location),
                            name: this.parkList[i].parkingBean.name,
                            subtype: "Park",
                            id: this.parkList[i].parkingBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/tingchechang.png"
                        });
                        droreMap.icon.addChild(Park);
                    }
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
                                subtype: "droreMapinit",
                                id: this.parkList[i].parkingBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.parkList[i].parkingBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/tingchechang.png"
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
                    this.toiletList = res
                    for (let i = 0; i < this.toiletList.length; i++) {
                        this.toiletList[i].location = [this.toiletList[i].longitude,this.toiletList[i].latitude]
                        var Toilet = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.toiletList[i].location),
                            name: this.toiletList[i].toiletBean.name,
                            subtype: "Toilet",
                            id: this.toiletList[i].toiletBean.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/cesuo.png"
                        });
                        droreMap.icon.addChild(Toilet);
                    }
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
                                subtype: "droreMapinit",
                                id: this.toiletList[i].toiletBean.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.toiletList[i].toiletBean.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/cesuo.png"
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
                        if(this.iconList[i].lightStatus){
                            this.iconList[i].url="/static/img/icon/Light.png"
                            this.iconList[i].subtype='Light'
                            this.iconList[i].status=true
                        } else {
                            this.iconList[i].url="/static/img/icon/Light_close.png"
                            this.iconList[i].subtype='Light_close'
                            this.iconList[i].status=false
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
                        if(this.lightList[i].lightStatus){
                            this.lightList[i].url="/static/img/icon/Light.png"
                            this.lightList[i].subtype='Light'
                        } else {
                            this.lightList[i].url="/static/img/icon/Light_close.png"
                            this.lightList[i].subtype='Light_close'
                        }
                        if(this.lightList[i].id === this.getLocationId){
                            this.lightList[i].location = [this.lightList[i].longitude,this.lightList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.lightList[i].location),
                                name: this.lightList[i].name,
                                subtype:this.lightList[i].subtype,
                                id: this.lightList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                    this.gateList=res.devices
                    for (let i=0;i<this.gateList.length;i++){
                        this.gateList[i].location = [this.gateList[i].longitude,this.gateList[i].latitude]
                        var Gate = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.gateList[i].location),
                            name: this.gateList[i].name,
                            subtype: "Gate",
                            id: this.gateList[i].id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/zhaji.png"
                        });
                        droreMap.icon.addChild(Gate);
                        Gate.onclick(function(e) {
                            alert("这是闸机，id是"+ e.data.id);
                        });
                    }
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
                                subtype: "droreMapinit",
                                id: this.gateList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.gateList[i].id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/zhaji.png"
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
                    for (let i=0;i<this.iconList.length;i++){
                        this.iconList[i].type="wifi"
                        this.iconList[i].location = [this.iconList[i].longitude,this.iconList[i].latitude]
                        if(this.iconList[i].lightStatus){
                            this.iconList[i].url="/static/img/icon/wifi.png"
                            this.iconList[i].subtype='wifi'
                            this.iconList[i].status=true
                        } else {
                            this.iconList[i].url="/static/img/icon/wifi_close.png"
                            this.iconList[i].subtype='wifi_close'
                            this.iconList[i].status=false
                        }
                    }
                    this.iconShow();
                 }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllWifiEdit(){//wifi列表修改
                await api.wifi.getAllWifi().then((res)=>{
                    this.wifiList=res.devices
                    for(let i=0;i<this.wifiList.length;i++){
                        if(this.wifiList[i].lightStatus){
                            this.wifiList[i].url="/static/img/icon/wifi.png"
                            this.wifiList[i].subtype='wifi'
                        } else {
                            this.wifiList[i].url="/static/img/icon/wifi_close.png"
                            this.wifiList[i].subtype='wifi_close'
                        }
                        if(this.wifiList[i].id === this.getLocationId){
                            this.wifiList[i].location = [this.wifiList[i].longitude,this.wifiList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.wifiList[i].location),
                                name: this.wifiList[i].name,
                                subtype: this.wifiList[i].subtype,
                                id: this.wifiList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                    this.ledList=res.devices
                    for (let i=0;i<this.ledList.length;i++){
                        this.ledList[i].location = [this.ledList[i].longitude,this.ledList[i].latitude]
                        var Led = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.ledList[i].location),
                            name: this.ledList[i].name,
                            subtype: "Led",
                            id: this.ledList[i].id,
                            url: "/static/img/icon/Led.png"
                        });
                        droreMap.icon.addChild(Led);
                        let that =this
                        Led.onclick(function(e) {
                            that.menulist = e;
                            that.droreMappopup(e);
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            async getAllLedEdit(){//Led列表修改
                await api.led.getAllLed().then((res)=>{
                    this.ledList=res.devices
                    for (let i=0;i<this.ledList.length;i++){
                        if(this.ledList[i].id === this.getLocationId){
                            this.ledList[i].location = [this.ledList[i].longitude,this.ledList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.ledList[i].location),
                                name: this.ledList[i].name,
                                subtype: "droreMapinit",
                                id: this.ledList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.ledList[i].id,
                                url:  "/static/img/icon/Led.png"
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
                    this.policeList=res.devices
                    for (let i=0;i<this.policeList.length;i++){
                        this.policeList[i].location = [this.policeList[i].longitude,this.policeList[i].latitude]
                        var Police = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.policeList[i].location),
                            name: this.policeList[i].name,
                            subtype: "Police",
                            id: this.policeList[i].id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/baojingtingqianyi.png"
                        });
                        droreMap.icon.addChild(Police);
                        Police.onclick(function(e) {
                            alert("这是报警柱，id是"+ e.data.id);
                        });
                    }
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
                                subtype: "droreMapinit",
                                id: this.policeList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.policeList[i].id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/baojingtingqianyi.png"
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
                        if(this.iconList[i].lightStatus){
                            this.iconList[i].url="/static/img/icon/monitors.png"
                            this.iconList[i].subtype='Monitors'
                            this.iconList[i].status=true
                        } else {
                            this.iconList[i].url="/static/img/icon/monitors_close.png"
                            this.iconList[i].subtype='Monitors_close'
                            this.iconList[i].status=false
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
                        if(this.monitorsList[i].lightStatus){
                            this.monitorsList[i].url="/static/img/icon/monitors.png"
                            this.monitorsList[i].subtype='Monitors'
                        } else {
                            this.monitorsList[i].url="/static/img/icon/monitors_close.png"
                            this.monitorsList[i].subtype='Might_close'
                        }
                        if(this.monitorsList[i].id === this.getLocationId){
                            this.monitorsList[i].location = [this.monitorsList[i].longitude,this.monitorsList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.monitorsList[i].location),
                                name: this.monitorsList[i].name,
                                subtype: this.monitorsList[i].subtype,
                                id: this.monitorsList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                    this.broadList=res.devices
                    for (let i=0;i<this.broadList.length;i++) {
                        this.broadList[i].location = [this.broadList[i].longitude, this.broadList[i].latitude]
                        var Broadcast = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.broadList[i].location),
                            name: this.broadList[i].name,
                            subtype: "Broadcast",
                            id: this.broadList[i].id,
                            url: "/static/img/icon/guangboshebei.png"
                        });
                        droreMap.icon.addChild(Broadcast);
                        let that =this
                        Broadcast.onclick(function(e) {
                            that.menulist = e;
                            that.droreMappopup(e);
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.isShowLoading=false
                })
            },
            async getAllBroadcastEdit(){//广播列表修改
                await api.broadcast.getAllBroadcast().then((res)=>{
                    this.broadList=res.devices
                    for (let i=0;i<this.broadList.length;i++) {
                        if(this.broadList[i].id === this.getLocationId){
                            this.broadList[i].location = [this.broadList[i].longitude,this.broadList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.broadList[i].location),
                                name: this.broadList[i].name,
                                subtype: "droreMapinit",
                                id: this.broadList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.broadList[i].id,
                                url: "/static/img/icon/guangboshebei.png"
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
                    this.cameraList = res.devices
                    for (let i=0; i < this.cameraList.length; i++) {
                        this.cameraList[i].location = [this.cameraList[i].longitude, this.cameraList[i].latitude]
                        var Camera = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.cameraList[i].location),
                            name: this.cameraList[i].name,
                            subtype: "Camera",
                            id: this.cameraList[i].id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shexiangtou.png"
                        });
                        droreMap.icon.addChild(Camera);
                        Camera.onclick(function(e) {
                            alert("这是摄像头，id是"+e.data.id);
                        });
                    }
                }).catch((err)=> {
                    console.log(err)
                })
            },
            async getAllCameraEdit () {//摄像头列表修改
                await api.camera.getAllCamera().then((res) => {
                    this.cameraList = res.devices
                    for (let i=0; i < this.cameraList.length; i++) {
                        if(this.cameraList[i].id === this.getLocationId){
                            this.cameraList[i].location = [this.cameraList[i].longitude,this.cameraList[i].latitude]
                            var iconedit = new droreMap.icon.Marker({
                                coordinate: droreMap.trans.transFromWgsToLayer(this.cameraList[i].location),
                                name: this.cameraList[i].name,
                                subtype: "droreMapinit",
                                id: this.cameraList[i].id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.cameraList[i].id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shexiangtou.png"
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
                    this.treeList = res
                    for (let i = 0; i < this.treeList.length; i++) {
                        this.treeList[i].location = [this.treeList[i].longitude, this.treeList[i].latitude]
                        var Tree = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.treeList[i].location),
                            name: this.treeList[i].plant.name,
                            subtype: "Tree",
                            id: this.treeList[i].plant.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/gushumingmu.png"
                        });
                        droreMap.icon.addChild(Tree);
                    }
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
                                subtype: "droreMapinit",
                                id: this.treeList[i].plant.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.treeList[i].plant.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/gushumingmu.png"
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
                    this.buildList = res
                    for (let i = 0; i < this.buildList.length; i++) {
                        this.buildList[i].location = [this.buildList[i].longitude, this.buildList[i].latitude]
                        var Build = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer(this.buildList[i].location),
                            name: this.buildList[i].building.name,
                            subtype: "Build",
                            id: this.buildList[i].building.id,
                            url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/fuwuzhongxin.png"
                        });
                        droreMap.icon.addChild(Build);
                    }
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
                                subtype: "droreMapinit",
                                id: this.buildList[i].building.id,
                                url: "/static/img/location_on.png"
                            });
                            droreMap.icon.addChild(iconedit);
                            droreMap.interaction.ifDrag = true;
                            let that =this
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
                                subtype: "droreMapinit",
                                id: this.buildList[i].building.id,
                                url: "http://label.drore.com/gisLabelTabImage/public/defaults/24*24/fuwuzhongxin.png"
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
                        droreMap.area.addChild(areaEvets)
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
                    droreMap.area.addChild(areaEvet)
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
                            droreMap.area.addChild(areaEvets1)
                        }else {
                            var areaEvets = new droreMap.area.DrawLayer("areaList", 'rgba(255, 255, 255, 0.1)', "blue")
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
                            droreMap.area.addChild(areaEvets)
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
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', 'blue', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList)
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
                        droreMap.road.addRoadLayer(areaEvt)
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
                            droreMap.road.addRoadLayer(areaEvts)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', 'blue', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList)
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
                        var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', 'blue', 'blue')
                        let geo =JSON.parse(res[i].geo);
                        let area = [];
                        for(var j = 0; j < geo.length; j++) {
                            let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                            area.push(wgs);
                        }
                        var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                        areaEvtList.addRoad(area, data)
                        droreMap.road.addRoadLayer(areaEvtList)
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
                            droreMap.road.addRoadLayer(areaEvts)
                        }else{
                            var areaEvtList =new droreMap.road.RoadLayer('ROUTE_list', 'blue', 'blue')
                            let geo =JSON.parse(res[i].geo);
                            let area = [];
                            for(var j = 0; j < geo.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
                                area.push(wgs);
                            }
                            var data = {"id": res[i].id, "name": res[i].name,"constructor":''}
                            areaEvtList.addRoad(area, data)
                            droreMap.road.addRoadLayer(areaEvtList)
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
                    let route = this.$route.path
                    if(route.includes('controler')){
                        droreMap.icon.IconStyleById(icon.id,false);
                    }
                    let that = this;
                    icon.onclick(function (e) {
                        that.menulist = e.data;
                        that.droreMappopup(that.menulist);
                    });
                }
            },
            overView() {//鹰眼图
                var overView = new droreMap.control.OverviewMap({'url': '/static/img/xxsd.jpg'});
                droreMap.control.addControl(overView);
                overView.setBoxColor("#f60")
                overView.setRect('270px','150px')
            },
            interaction(){//初始化辅助显示
                droreMap.object.getMap().getLayers().getArray()[1].setVisible(false)
                droreMap.interaction.enableMapClick = true
                droreMap.interaction.showMove()
                this.overView();//鹰眼
            },
            searchShow() {//搜索
                this.getSearchInfo.location = [this.getSearchInfo.longitude,this.getSearchInfo.latitude]
                droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(this.getSearchInfo.location));
                droreMap.icon.IconStyleById(this.getSearchInfo.id,true);
                // if (this.getSearchInfo.entityType =="305"){
                //     this.controleLightList.push(this.getSearchInfo.id)
                //     this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                // }else if(this.getSearchInfo.entityType =="306"){
                //     this.controleEnvironmentList.push(this.getSearchInfo.id)
                //     this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                // }
            },
            // searchShowLine(iconType){
            //     var areaEvtList =new droreMap.road.RoadLayer(iconType, 'blue', 'blue')
            //     let geo =JSON.parse(this.getSearchInfo.geoText);
            //     let area = [];
            //     for(var j = 0; j < geo.length; j++) {
            //         let wgs=droreMap.trans.transFromWgsToLayer(geo[j])
            //         area.push(wgs);
            //     }
            //     var data = {"id": this.getSearchInfo.id, "name": this.getSearchInfo.name,"constructor":''}
            //     areaEvtList.addRoad(area, data)
            //     droreMap.road.addRoadLayer(areaEvtList)
            //     droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(geo[0]));
            // },
            // searchShowArea(iconType){
            //     var areaEvets =new droreMap.area.DrawLayer(iconType,'rgba(255, 255, 255, 0.3)',"blue")
            //     let geo =JSON.parse(this.getSearchInfo.geoText);
            //     let ol=geo[0];
            //     let arrayObj = new Array();
            //     for(var j = 0; j < ol.length; j++) {
            //         let wgs=droreMap.trans.transFromWgsToLayer(ol[j])
            //         arrayObj.push(wgs);
            //     }
            //     let area= new Array();
            //     area.push(arrayObj);
            //     var data = {"id": this.getSearchInfo.id, "name": this.getSearchInfo.name,"constructor":''}
            //     areaEvets.addArea(area,data)
            //     areaEvets.setVisible(true)
            //     droreMap.area.addChild(areaEvets)
            //     droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(ol[0]));
            // },
            droreMappopup(e){
                // console.log(e);
                var div = document.getElementById('contextmenu_container')
                var popup = new  droreMap.pop.Popup(div,e.coordinate,"contextmenu_container")
                droreMap.pop.addChild(popup);
                $("#contextmenu_container").attr("class","contextmenu "+e.subtype);
                if(e.status){
                    this.open=true
                }else {
                    this.open=false
                }
                $("#contextmenu_container").show();
            },
            mapSwitch(){
                if(this.menulist.data.status){
                    alert("关闭，id是"+this.menulist.id);
                }else {
                    alert("开启，id是"+this.menulist.id);
                }
            },
            menuShow(){
                console.log(this.menulist)
                this.buildInfo = this.menulist.data
                this.visible = true
                this.title = this.menulist.data.type
            },
            menuOperation(){
                alert("操作当前内容"+this.menulist.data.name);
            },
            menuPhone(){
                console.log(this.menulist.data);
            },
            menuBroadcast(){
                console.log(this.menulist.data);
            },
            menuDelete(){
                $("#contextmenu_container").hide();
            },
            treeShow(data){
                data.location = [data.longitude,data.latitude]
                droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(data.location));
                droreMap.icon.IconStyleById(data.id,true);
            },
            treeHide(data){
                droreMap.icon.IconStyleById(data.id,false);
                this.menuDelete();
            }
        },
        components: {
            Scrollcontainer,
            PersonDetail
        },
        watch: {
            getSearchInfo () {
                console.log(this.getSearchInfo,"qweqweqweqweqwe");
                this.searchShow(this.getSearchInfo);
            },
            getTreeState(){
                // console.log(this.getTreeState,'213123')
                if(this.getTreeState.length>1) {
                    // console.log(this.getTreeState,'ioioioiooioioiooi')
                    //    这边是全选
                    if (this.getTreeState[0].checked) {//显示
                        this.controleLightList=[];
                        // console.log(this.getTreeState,'这111111111111')
                        this.getTreeState.forEach(item => {
                            item.children.forEach(item1 => {
                                this.treeShow(item1);
                                if(item.type=='light'){
                                    this.controleLightList.push(item1.id);
                                }else if(item.type=='environment'){
                                    this.controleEnvironmentList.push(item1.id);
                                }
                            })
                        })
                    }else {//隐藏
                        // console.log('在这报错22222222222222')
                        this.getTreeState.forEach(item => {
                            this.treeHide(item)
                            if(item.type=='light'){
                                this.controleLightList=[];
                            }else if(item.type=='environment'){
                                this.controleEnvironmentList=[];
                            }
                        })
                    }
                }else {
                    if(this.getTreeState[0].children){
                        let data = this.getTreeState[0].children
                        if (this.getTreeState[0].checked.checkedKeys.includes(this.getTreeState[0].id)) {
                            for (let i = 0; i < data.length; i++) {
                                this.treeShow(data[i]);
                                // console.log(this.getTreeState[0].type,'123123');
                                if(this.getTreeState[0].type=='light'){
                                    this.controleLightList.push(data[i].id);
                                    this.controleLightList=[...new Set(this.controleLightList)];
                                }else if(this.getTreeState[0].type=='environment'){
                                    this.controleEnvironmentList.push(data[i].id);
                                    this.controleEnvironmentList=[...new Set(this.controleEnvironmentList)];
                                }
                            }
                        }else {
                            for (let i = 0; i < this.getTreeState[0].children.length; i++) {
                                // console.log(this.getTreeState[0].children)
                                this.treeHide(this.getTreeState[0].children[i]);
                                if(this.getTreeState[0].children[i].type=='light'){
                                    let index = this.controleLightList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleLightList.splice(index, 1);
                                    }
                                }else if(this.getTreeState[0].children[i].type=='environment'){
                                    let index = this.controleEnvironmentList.indexOf(this.getTreeState[0].children[i].id);
                                    if (index > -1) {
                                        this.controleEnvironmentList.splice(index, 1);
                                    }
                                }
                            }
                        }
                    }else {
                        if (this.getTreeState[0].checked.checkedKeys.includes(this.getTreeState[0].id)) {
                            this.treeShow(this.getTreeState[0]);
                            if(this.getTreeState[0].type=='light'){
                                this.controleLightList.push(this.getTreeState[0].id);
                                this.controleLightList=[...new Set(this.controleLightList)];
                            }else if(this.getTreeState[0].type=='environment'){
                                this.controleEnvironmentList.push(this.getTreeState[0].id);
                                this.controleEnvironmentList=[...new Set(this.controleEnvironmentList)];
                            }
                        } else {
                            this.treeHide(this.getTreeState[0]);
                            if(this.getTreeState[0].type=='light'){
                                let index = this.controleLightList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleLightList.splice(index, 1);
                                }
                            }else if(this.getTreeState[0].type=='environment'){
                                let index = this.controleEnvironmentList.indexOf(this.getTreeState[0].id);
                                if (index > -1) {
                                    this.controleEnvironmentList.splice(index, 1);
                                }
                            }
                        }
                    }
                }
            },
            '$route' (to,from) {
                if(from.name==='Light'){
                    console.log(this.controleLightList);
                    this.$store.commit('CONTROLER_LIGHT', this.controleLightList)
                }else if(from.name==='Environment'){
                    console.log(this.controleEnvironmentList);
                    this.$store.commit('CONTROLER_ENVIRONMENT', this.controleEnvironmentList)
                }
            }
        },
        computed: {
            ...mapGetters([
                'getLocationId',
                'getSearchInfo',
                'getTreeState'
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
        width:264px
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
                .el-switch__button{
                    width: rem(12);
                    height: rem(12);
                }
            }
        }
        .mapSwitch.is-checked .el-switch__button{
            transform: translate3d(10px, 0px, 0px)!important;
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
            bottom:rem(8);
        }
        button.menuShow{
            background: url("/static/img/menuShow.svg");
            background-size: cover;
            top:rem(22);
            left:rem(20);
        }
        button.menuOperation{
            background: url("/static/img/menuOperation.svg");
            background-size: cover;
            top:rem(10);
            left: rem(50);
        }
        button.menuBroadcast{
            background: url("/static/img/menuPhone.svg");
            background-size: cover;
            top:rem(22);
            right: rem(20);
        }
        button.menuPhone{
            background: url("/static/img/menuPhone.svg");
            background-size: cover;
            right:rem(5);
            bottom: rem(8);
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
    .contextmenu.Broadcast i{
        background: url("/static/img/icon/guangboshebei_big.png") no-repeat;
    }
</style>
