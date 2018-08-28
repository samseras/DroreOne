<template>
    <div class="light">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>摄像头列表</h5>
                <ul>
                    <li>
                        <el-tooltip class="item" effect="dark" content="控件下载" placement="left">
                            <img src="../../../../static/img/down.svg" class="multiwindow" @click="cmsocxDown"  alt=""/>
                        </el-tooltip>
                    </li>
                    <!--<li><img src="../../../../static/img/search.png" class="search" alt=""/></li>-->
                </ul>
            </div>
            <div class="middle">
                <div class="boottom" id="ztree">
                    <!--传感器-->
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="lightInfo"
                            :lightCheckout="lightCheckout"
                            :regionId="regionId"
                            :lightList="lightList"
                            :number="number"
                            :fault="fault">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>
            <div class="last">
                <h5>设备故障率</h5>
                <div>
                    <div id="pie"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import broadcastZtree from "./children/broadcastzTree.vue"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                open:false,
                isShow: true,
                options: [],
                value: '',
                number: '0',
                fault: '0',
                optionMisic: [],
                isShowBroadCard: false,
                lightInfo: [],
                lightCheckout:[],
                regionId:[],
                lightList:[],
                selectAll:[],
                title:'摄像头',
                online: '0',
                faultlist:[]
            }
        },
        components: {
            broadcastZtree,
            ScrollContainer
        },
        methods: {
            treeShow(){
                // console.log(this.getcontroleEnvironment.length,'1');
                if(this.getcontroCamera){
                    this.lightCheckout=this.getcontroCamera
                }
            },
            cmsocxDown(){
                let host=window.location.host,
                    protocol = window.location.protocol;
                // console.log(protocol+host);
                window.open(protocol+'//'+host+"/static/template/DPSDK_OCX.exe");
            },
            showBroadCard() {
                console.log(777)
                this.isShowBroadCard = true
            },
            newagenda: function () {
                $(".newagenda").show();

            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('pie'))
                // 绘制图表
                myChart.setOption({
                    series: [
                        {
                            laber: {
                                color: "#7d7d7d"
                            },
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            startAngle: 60,
                            label: {            //饼图图形上的文本标签
                                normal: {
                                    formatter: '{d}%'
                                }
                            },
                            data: [
                                {
                                    value: this.online,
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: this.fault,
                                    label: {normal: {show: true, color: "#646464", fontSize: 12}},
                                    labelLine: {
                                        normal: {
                                            length: 4,
                                            lineStyle: {
                                                color: "#646464",
                                                type: "dashed",

                                            }
                                        }
                                    }
                                }
                            ],
                            labelLine: {
                                show: false
                            }

                        }
                    ],
                    color: ['#26bbf0', '#f36a5a']
                });
            },
            async getAllLight(){
                await api.camera.getAllCamera().then((res) => {
                    this.lightList=res.devices
                    this.number=this.lightList.length
                    let regionIdList = []
                    let arr = []
                    let idList = []
                    let noRegion = {
                        label: '未知片区设备',
                        id: '10010',
                        type:'camera',
                        children:[]
                    }
                    this.lightList.forEach(item => {
                        if (item.regionId && !this.regionId.includes(item.regionId)) {
                            this.regionId.push(item.regionId)
                        }
                    })
                    this.regionId.push('10010')
                    this.lightList.forEach(item => {
                        item.label = item.name
                        item.type = 'camera'
                        if (item.status =="FAULT")  {
                            item.icon = '../../../static/img/camera_damage.svg'
                            this.faultlist.push(item.id)
                        } else  if (item.status =="OFFLINE") {
                            item.icon = '../../../static/img/camera.svg'
                        }else {
                            item.icon = '../../../static/img/camera_open.svg'
                        }
                        if (item.regionId) {
                            if (!regionIdList.includes(item.regionId)) {
                                regionIdList.push(item.regionId)
                                let obj = {
                                    label: item.regionName,
                                    type: 'camera',
                                    id: item.regionId,
                                    children: []
                                }
                                arr.push(obj)
                            }
                            arr.forEach(item1 => {
                                if (item1.id == item.regionId) {
                                    if (item1.children.length < 1) {
                                        item1.children.push(item)
                                    } else {
                                        item1.children.forEach(item2 => {
                                            if (!idList.includes(item2.id)) {
                                                idList.push(item.id)
                                                item1.children.push(item)
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            noRegion.children.push(item)
                        }
                    })
                    if (noRegion.children.length > 0) {
                        arr.push(noRegion)
                    }
                    this.fault=this.faultlist.length
                    this.online= this.number - this.fault
                    this.lightInfo = arr
                    this.drawLine();
                }).catch(err =>{
                    console.log(err)
                })
            },
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {
            this.getAllLight();
        },
        computed: {
            ...mapGetters(['getcontroCamera'])
        }
    }
</script>

<style lang="scss" scoped>
    .light {
        width: 100%;
        height: 100%;
        .reveal {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #f2f2f2;
            .top {
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                background: #fff;
                h5 {
                    margin-left: 15px;
                }
                ul {
                    display: flex;
                    li {
                        margin: 0 5px;
                        .multiwindow{
                            width: 24px;
                            vertical-align: middle;
                            cursor: pointer;
                            outline: none;
                        }
                    }
                }
            }
            .list_search{
                background: #f2f2f2;
                padding: rem(10);
                input {
                    width: 100%;
                    text-indent: 10px;
                    font-size: 10px;
                    color: #646464;
                    height: 22px;
                    border: 1px solid #52c4f2;
                    outline: none;
                }
            }

            .middle {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .manage {
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    border-top: 1px solid #f2f2f2;
                    .check {
                        margin-left: 10px;
                    }
                    .el-checkbox:last-child {
                        color: #f36a5a;
                    }
                }
                .boottom {
                    width: 100%;
                    flex: 1;
                    overflow-y: auto;
                    ::-webkit-scrollbar {
                        width: rem(6);
                    }
                    ::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0);
                    }
                    &:hover{
                        .scroll-container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            overflow: hidden;
                            .scroll-inner {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                overflow: auto;
                                padding-bottom: rem(20);
                                // &::-webkit-scrollbar {
                                // }
                            }
                        }
                        ::-webkit-scrollbar {
                            width: rem(6);
                        }
                        ::-webkit-scrollbar-thumb {
                            position: absolute;
                            right: rem(-10);
                            background: rgba(0, 0, 0, .5);
                            border-radius: rem(6);
                        }
                    }

                }
            }
            .last {
                width: 100%;
                height: 210px;
                overflow: hidden;
                h5 {
                    line-height: 40px;
                    margin-left: 15px;
                }
                h5 + div {
                    width: 100%;
                    height: 170px;
                    background: #fff;
                }
                .broadCard {
                    width: 500px;
                    height: 350px;
                    position: fixed;
                    left: 20%;
                    top: 30%;
                }
            }
            #pie {
                width: 80%;
                height: 95%;
                margin: 0 auto;
                padding-top: 5%;
            }
        }
    }
</style>
