<template>
    <div class="siteMapDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="车船调度路线图"
            :before-close="closeMapDialog"
            width="70%"
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
        props: ['visible','type','routeObj'],
        name: "map-dialog",
        data () {
            return{
                name:''
            }
        },
        methods: {
            closeMapDialog () {
                this.$emit('closeMapDialog')
            },
            saveRoat () {
                console.log(this.getStationChecked,'getStationChecked')
                //路线名称长度超过7，大屏展示不下
                if(this.name.length > 7){
                    this.$message.error('路线名称长度不能超过7')
                    return
                }

                let roatObj = {}
                if(this.routeObj.id){
                    roatObj = {
                        id: this.routeObj.id,
                        name: this.name,
                        geo: {
                            type:"LineString",
                            coordinates: this.getRoatLocation
                        },
                        type:this.type == '0' ? 2 : 3,  //车 :2  船:3
                        eOrders:this.getStationChecked
                    }
                    this.updateRoat(roatObj)
                }else{
                    roatObj = {
                        name: this.name,
                        geo: {
                            type:"LineString",
                            coordinates: this.getRoatLocation
                        },
                        type:this.type == '0' ? 2 : 3,  //车 :2  船:3
                        eOrders:this.getStationChecked
                    }
                    this.createRoat(roatObj)
                }
            },
            async createRoat(param){
                await api.roat.createRoat(JSON.stringify(param)).then(res => {
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.closeMapDialog()
                }).catch(err => {
                    this.$message.error(err.message)
                })
            },
            async updateRoat(param){
                await api.roat.updateRoat(JSON.stringify(param)).then(res => {
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.closeMapDialog()
                }).catch(err => {
                    this.$message.error(err.message)
                })
            }
        },
        created () {
            if(this.routeObj.id){
                this.name = this.routeObj.name

                this.$store.commit('SET_STATION_TREE',this.routeObj.stations)
            }
        },
        components : {
            Map
        },
        computed: {
            ...mapGetters(['getRoatLocation','getStationChecked'])
        }
    }
</script>

<style lang="scss">
    .siteMapDialog{
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
    .siteMapDialog {
        width: 100%;
        height: rem(550);
        .map_Dialog{
            width: 100%;
            height: 100%;
            .map{
                width: 100%;
                height: rem(550);
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
