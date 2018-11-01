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
            <div class="punchList">
                <div class="contentList">
                    <ScrollContainer>
                        <div class="contentBody">
                            <div class="content" v-for="item in punchList">
                                <div class="punchTime">
                                    <div class="timeCenter">
                                        <span>{{item.date}}</span>
                                        <span>{{item.time}}</span>
                                    </div>
                                </div>
                                <div class="punchCheck">
                                    <img v-if="item.status == 'NORMAL'" src="../../static/img/icon/normalPunch.png" alt="">
                                    <el-checkbox v-if="item.status == 'ABNORMAL'" v-model="item.checked"></el-checkbox>
                                </div>
                                <div class="punchInfo">
                                    <div class="infoCenter">
                                        <div>
                                            点位：<span>{{item.name}}</span>
                                        </div>
                                        <div>
                                            状态：<span :class="[item.status == 'NORMAL' ? 'normal' : 'abnormal']">{{item.statusName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollContainer>
                </div>

                <div class="footerButton">
                    <el-button @click="removeError">消除异常</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import historyMap from "../../static/js/historyMap.js"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    export default {
        props: ['visible','historyData','punchHistory','title','isvehicle','Info'],
        name: "historyDialog",
        data () {
            return{
                punchList:[
                    {
                        id:'1',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位1',
                        status:'NORMAL',
                        statusName:'正常',
                        checked:false
                    },
                    {
                        id:'2',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位2',
                        status:'NORMAL',
                        statusName:'正常',
                        checked:false
                    },
                    {
                        id:'3',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位3',
                        status:'ABNORMAL',
                        statusName:'异常',
                        checked:false
                    },
                    {
                        id:'4',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位4',
                        status:'NORMAL',
                        statusName:'正常',
                        checked:false
                    },{
                        id:'5',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位5',
                        status:'NORMAL',
                        statusName:'正常',
                        checked:false
                    },{
                        id:'6',
                        date:'2018-10-04',
                        time:'14:20:50',
                        name:'富义仓点位6',
                        status:'NORMAL',
                        statusName:'正常',
                        checked:false
                    }
                ]
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
//                        historyMap.status.limitExtent = true

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
                var areaEvtList =new historyMap.road.RoadLayer('ROUTE_list', '#fb9000', 'blue')
                 if(!this.historyData || this.historyData.length == 0){
                     return
                 }
                this.historyData.forEach(item=>{
                    if(this.isvehicle){
                        geo.push(historyMap.trans.transFromWgsToLayer([item.longitude,item.latitude]))
                    }else{
                        let _coord = historyMap.trans.transFromWgsToLayer([item.longitude,item.latitude]);
                        _coord[0] = _coord[0]+parseFloat('-110')
                        _coord[1] = _coord[1]+parseFloat('-20')
                        geo.push(_coord)
                    }
                })
                // var data = {"id": this.historyData[0].deviceId, "name": this.historyData[0].deviceName,"constructor":''}
                var data = {"id": this.Info.id, "name": this.Info.name,"constructor":''}
                areaEvtList.addRoad(geo, data)
                historyMap.road.addRoadLayer(areaEvtList, this.Info.id)
                if(this.isvehicle){
                    historyMap.map.panToCoord(historyMap.trans.transFromWgsToLayer([this.historyData[0].longitude,this.historyData[0].latitude]));
                    // historyMap.map.panToCoord(historyMap.trans.transFromWgsToLayer([this.historyData[0].longitude+0.451536705535+0.0048011541,this.historyData[0].latitude+0.49693734262853-0.0025647127]));
                }else{
                    let _coord = historyMap.trans.transFromWgsToLayer([this.historyData[0].longitude,this.historyData[0].latitude]);
                    _coord[0] = _coord[0]+parseFloat('-110')
                    _coord[1] = _coord[1]+parseFloat('-20')
                    historyMap.map.panToCoord(_coord);
                }
            },
            async removeError(){
                console.log(this.punchList)
                let ids =  []
                this.punchList.forEach(item=>{
                    if(item.checked){
                        ids.push(item.id)
                    }
                })
                console.log(ids)
                if(ids.length == 0){
                    this.$message.warning("请至少选择一条数据！")
                }

                await api.punch.removeErrPunch({'ids':ids}).then(res=>{
                     this.$message.success("操作成功！")
                }).catch(err => {
                    this.$message.error("操作失败！")
                })


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
            ScrollContainer
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
            position: relative;
        }
        .el-dialog__header{
            background-color: #f2f2f2;
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
            .punchList{
                height: 96.5%;
                width:23%;
                display: flex;
                position: absolute;
                right: 0px;
                background-color: #fff;
                top:10px;
                flex-direction: column;
                box-sizing: border-box;
                .contentList{
                    height:400px;
                    flex:4;
                    background-color: #fff;
                    .contentBody{
                        width:100%;
                        height:100%;
                        .content{
                            width:100%;
                            height:20%;
                            display: flex;
                            .punchTime{
                                flex:1.5;
                                position: relative;
                                .timeCenter{
                                    width:100%;
                                    position: absolute;
                                    top:50%;
                                    transform: translateY(-50%);
                                    span{
                                        display: block;
                                        text-align: right;
                                    }
                                }
                            }
                            .punchCheck{
                                flex:0.8;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            .punchInfo{
                                flex:2;
                                position: relative;
                                .infoCenter{
                                    width: 100%;
                                    position: absolute;
                                    left:50%;
                                    top:50%;
                                    transform: translate(-50%,-50%);
                                    .normal{
                                        color: #4db3a4;
                                    }
                                    .abnormal{
                                        color:#f58377;
                                    }
                                }

                            }

                        }
                    }


                }
                .footerButton{
                    flex:1;
                    display: flex;
                    background-color: #fff;
                    justify-content: center;
                    align-items: center;
                    button{
                        width:220px;
                        font-size: rem(14);
                        letter-spacing:1.5px;
                        background-color: #ffc600;
                        color: #fff;
                        line-height: 0.5;
                    }
                }
            }
        }
    }
</style>
