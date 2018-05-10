<template>
    <div class="mapDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="巡更路线图"
            :before-close="closeMapDialog"
            width="50%"
            class="dialog map_Dialog"
            center>
            <p>路线名称： <input type="text" v-model="name"></p>
            <div class="map">
                <Map></Map>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveRoat">保存</el-button>
                <el-button size="mini" @click = 'closeMapDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Map from '@/components/map'
    import api from '@/api'
    import {mapGetters} from 'vuex'
    export default {
        props: ['visible'],
        name: "map-dialog",
        data () {
            return{

            }
        },
        methods: {
            closeMapDialog () {
                this.$emit('closeMapDialog')
            },
            saveRoat () {
                let roatObj = {
                    name: this.name,
                    geo: {
                        type:"LineString",
                        coordinates: this.getRoatLocation
                    }
                }
                api.roat.createRoat(JSON.stringify(roatObj)).then(res => {
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                }).catch(err => {
                    this.$message.error(err.message)
                })

            }
        },
        created () {
        },
        components : {
            Map
        },
        computed: {
            ...mapGetters(['getRoatLocation'])
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
        height: rem(300);
        .map_Dialog{
            width: 100%;
            height: 100%;
            .map{
                width: 100%;
                height: rem(400);
                background: yellowgreen;
                border-radius: rem(5);
            }
            p{
                width: 100%;
                height: rem(20);
                font-size: rem(12);
                border-bottom: 1px solid #ccc;
                margin-bottom: 1px;
                input{
                    border: none;
                    list-style: none;
                    outline: none;
                    font-size: rem(12);
                    padding-left: rem(10);
                }
            }
        }
    }
</style>
