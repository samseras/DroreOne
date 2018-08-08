<template>
    <div class="mapDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="添加片区范围"
            :before-close="closeMapDialog"
            width="70%"
            class="dialog map_Dialog"
            center>
            <div class="map">
                <Map></Map>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveLocation" :disabled='!isSave'>保存</el-button>
                <el-button size="mini" @click = 'closeMapDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Map from '@/components/map'
    import { mapGetters } from 'vuex'
    export default {
        props: ['visible'],
        name: "map-dialog",
        data () {
            return{

            }
        },
        mounted() {
            // this.droreMapinit();
        },
        methods: {
            saveLocation () {
                this.$emit('saveLocation')
            },
            closeMapDialog () {
                this.$emit('closeMapDialog')
            },
            // droreMapinit () {
            //     for(var i = 0; i < 1; i++) {
            //         var icon = new Map.icon.Marker({
            //             coordinate: [13365319.908706162 + 500 * Math.random(), 3538814.1636495925 + 500 * Math.random()],
            //             name: "asdas" + i,
            //             subtype: "098lk-",
            //             id: "12214_" + i,
            //             url: "http://oss.drore.com/material/gis/newlabels/public/defaults/24*24/shuibeng.png"
            //         });
            //         Map.icon.addChild(icon);
            //         icon.onclick(function(e) {});
            //     }
            //     Map.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
            //         console.log(evt)
            //         var icon = new Map.icon.Marker({
            //             coordinate:evt.coordinate ,
            //             name: "asdas",
            //             subtype: "098lk-",
            //             id: "12214_",
            //             url: "http://oss.drore.com/material/gis/newlabels/public/defaults/24*24/shuibeng.png",
            //             scale:1
            //         });
            //         console.log(Map.transLayerToWgs(evt.coordinate))
            //         Map.icon.addChild(icon);
            //         icon.onclick(function(e) {
            //             console.log(e)
            //         });
            //     })
            //     Map.ifDrag = true;
            //     Map.DragEvent(function(tabInfor) {
            //         var data = tabInfor.data
            //         console.log(Map.transLayerToWgs(data.end));
            //     })
            //     var areaEvet =new Map.area.DrawLayer("area",'rgba(255, 255, 255, 0.2)',"red")
            //     areaEvet.ifDraw = true;
            // }
        },
        created () {
        },
        components : {
            Map
        },
        computed: {
            ...mapGetters(['getRegionLocationState','getRoatLocationState']),
            isSave () {
                let route = this.$route.path
                if (route.includes('area-deploy')) {
                    return this.getRegionLocationState
                } else if (route.includes('roat-deploy')) {
                    return this.getRoatLocationState
                } else {
                    return true
                }
            }
        }
    }
</script>

<style lang="scss">
    .mapDialog{
        position: relative;
        .el-dialog__body {
            padding: rem(3) rem(3) 0 rem(3);
        }
        .ol-overlaycontainer-stopevent{
            /*display: none;*/
            position: absolute;
            top: rem(10);
            left: rem(20);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-in{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            transform: scale(1.5);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-out{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            margin-top: rem(15);
            transform:scale(1.5);
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
    .mapDialog {
        width: 100%;
        height: rem(600);
        .map_Dialog{
            width: 100%;
            height: 100%;
            .map{
                width: 100%;
                height: rem(600);
                background: #000;
                border-radius: rem(5);
            }
        }
    }
</style>
