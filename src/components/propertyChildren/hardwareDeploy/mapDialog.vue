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
                <el-button size="mini" class="hold" @click="saveLocation">保存</el-button>
                <el-button size="mini" @click = 'closeMapDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Map from '@/components/map'
    export default {
        props: ['visible'],
        name: "map-dialog",
        data () {
            return{

            }
        },
        methods: {
            saveLocation () {
                this.$emit('saveLocation')
            },
            closeMapDialog () {
                this.$emit('closeMapDialog')
            }
        },
        created () {
        },
        components : {
            Map
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
                background: yellowgreen;
                border-radius: rem(5);
            }
        }
    }
</style>
