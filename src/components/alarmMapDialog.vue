<template>
    <div class="alarmMapDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="巡检告警"
            :before-close="closeMapDialog"
            width="70%"
            class="dialog map_Dialog"
            center>

            <div id="historymap" class="alarmMap">
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveLocation">保存</el-button>
                <el-button size="mini" @click = 'closeMapDialog'>取消</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Map from "../../static/js/historyMap.js"
    import Event from "../../static/js/static.js"

    import { mapMutations } from 'vuex'
    export default {
        props: ["visible"],
        name: "alarmMapDialog",

        data () {
            return{
            }
        },
        methods: {
            ...mapMutations([
                'MAP_LOCATION'
            ]),
            closeMapDialog () {
                this.$emit('closeMapDialog')
            },
            saveLocation () {
                this.$emit('saveLocation')
            },
            requestGisMain() {
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
                        Map.init(mapdata, data.data,'historymap');
                        let Circle = new Map.geom.Circle()
                        Circle.setCenter([0,0],0);
                        Map.object.getMap().getLayers().getArray()[1].setVisible(false)
                        Map.status.limitExtent = true

                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            },
            labelDot(){//打点标注
                let that = this
                var icon = new Map.icon.Marker({
                    coordinate: [0,0],
                    name:  "标注",
                    subtype: "labelDot",
                    id: "12214_",
                    url: "/static/img/icon/location.png",
                });
                Map.icon.addChild(icon);
                Map.event.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                    Map.interaction.ifDrag = true;
                    icon.setPosition(evt.coordinate)
                    console.log(evt.coordinate)
                    that.$store.commit('MAP_LOCATION', Map.trans.transLayerToWgs(evt.coordinate))
                })
                Map.event.DragEvent(function(tabInfor) {
                    var data = tabInfor.data
                    if(data.data.id === '12214_'){
                        console.log(Map.trans.transLayerToWgs(data.end));
                        that.$store.commit('MAP_LOCATION', Map.trans.transLayerToWgs(data.end))
                    }
                })
            }
        },
        mounted() {
            setTimeout(()=>{
                this.requestGisMain();//加载地图
                this.labelDot()
            },300)
        },
        created () {
        },
        components : {
            Map
        },
        computed: {

        }
    }
</script>

<style lang="scss">
    .alarmMapDialog{
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
    .alarmMapDialog {
        width: 100%;
        height: rem(550);

        .map_Dialog{
            width: 100%;
            height: 100%;
            .alarmMap{
                width: 100%;
                height: rem(550);
                background: yellowgreen;
            }
        }
    }
</style>
