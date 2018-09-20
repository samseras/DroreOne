<template>
    <div class="historyDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            :title="title"
            :before-close="closeHistoryDialog"
            width="70%"
            class="dialog map_Dialog"
            center>
            <div id="historymap" class="historymap">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import historyMap from "../../static/js/historyMap.js"
    export default {
        props: ['visible','historyData','title'],
        name: "historyDialog",
        data () {
            return{
            }
        },
        methods: {
            closeHistoryDialog () {
                this.$emit('closeHistoryDialog')
            },
            historyrequestGisMain() {
                $.ajax({
                    type: "get",
                    url: "/static/xxsd_mapData.json",
                    async: false,
                    success: function(data) {
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
                        historyMap.init(mapdata, data.data,'historymap');
                        let Circle = new historyMap.geom.Circle()
                        Circle.setCenter([0,0],0);
                        historyMap.object.getMap().getLayers().getArray()[1].setVisible(false)
                        historyMap.status.limitExtent = true

                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                setTimeout(()=>{
                    let that = this
                    that.drewRoadLine()
                },500)
            },
            drewRoadLine(){
                let geo = []
                 if(!this.historyData || this.historyData.length == 0){
                     return
                 }
                this.historyData.forEach(item=>{
                    geo.push([item.longitude+0.451536705535+0.0048011541,item.latitude+0.49693734262853-0.0025647127])
                })
                var areaEvtList =new historyMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                let area = [];
                for(var i = 0; i < geo.length; i++) {
                    let wgs=historyMap.trans.transFromWgsToLayer(geo[i])
                    area.push(wgs);
                }
                var data = {"id": this.historyData[0].deviceId, "name": this.historyData[0].deviceName,"constructor":''}
                areaEvtList.addRoad(area, data)
                historyMap.road.addRoadLayer(areaEvtList, this.historyData[0].id)
                console.log()
                historyMap.map.panToCoord(historyMap.trans.transFromWgsToLayer([this.historyData[0].longitude+0.451536705535+0.0048011541,this.historyData[0].latitude+0.49693734262853-0.0025647127]));

            }
        },
        mounted() {
              setTimeout(()=>{
                  this.historyrequestGisMain();//加载地图
            },300)
        },
        created () {
        },
        components : {

        },
        computed: {

        }
    }
</script>

<style lang="scss">
    .historyDialog{
        position: relative;
        .el-dialog__body {
            padding: rem(10) rem(10);
        }

        .ol-rotate{
            display: none;
        }
        .ol-attribution{
            display: none;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .historyDialog {
        width: 100%;
        height: rem(550);

        .map_Dialog{
            width: 100%;
            height: 100%;
            .historymap{
                width: 100%;
                height: rem(550);
                background: yellowgreen;
            }
        }
    }
</style>
