<template>
    <div class="light">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>告警事件</h5>
                <ul>
                    <!--<li>-->
                    <!--<el-switch-->
                    <!--v-model="open"-->
                    <!--active-color="#53b6a7"-->
                    <!--inactive-color="#808080">-->
                    <!--</el-switch>-->
                    <!--</li>-->
                    <!--<li><img src="../../../../static/img/player.png" class="broad"/></li>-->
                    <!--<li><img src="../../../../static/img/microphone.png" alt=""/></li>-->
                    <li><img src="../../../../static/img/search.png" alt="" class="search"/></li>
                </ul>
            </div>
            <div class="middle">
                <!--&lt;!&ndash;搜索&ndash;&gt;-->
                <!--<div class="list_search">-->
                <!--<input id="search" type="text" placeholder="设备名称,组名称"/>-->
                <!--</div>-->
                <!--<div class="manage">-->
                <!--<el-checkbox class="check" @change="selectAllCheck">路灯总数<font>{{this.number}}</font>个</el-checkbox>-->
                <!--<el-checkbox class="check">故障<font>{{this.fault}}</font>个</el-checkbox>-->
                <!--</div>-->
                <div class="boottom" id="ztree">
                    <!--广播-->
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
                title:'处理中'
            }
        },
        components: {
            broadcastZtree,
            ScrollContainer
        },
        methods: {
            treeShow(){
                console.log(this.getcontroleLight)
                if(this.getcontroleLight){
                    this.lightCheckout=this.getcontroleLight
                }
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
                                    value: 150,
                                    name: "4人",
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: 70, name: "1人",
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
            async getAllAlarmEvent () {
                await api.alarm.getAllAlarmEvent().then(res => {
                    console.log(res,'这是请求的数据ddd')
                    // this.lightList=res
                    // this.number=this.lightList.length
                    // let arr = []
                    // let icon=''
                    // this.lightList.forEach(item => {
                    //     if (item.inspectionSchedule.id && !this.regionId.includes(item.inspectionSchedule.id)) {
                    //         this.regionId.push(item.inspectionSchedule.id)
                    //     }
                    // })
                    // this.lightList.forEach(item => {
                    //     console.log(item)
                    //     item.children=[]
                    //     for(let i=0;i< item.securityIds.length;i++){
                    //         if (item.securityIds[i].status == "FAULT") {
                    //             icon = '../../../static/img/light_damage.svg'
                    //         } else if (item.securityIds[i].status == "OFFLINE") {
                    //             icon = '../../../static/img/light.svg'
                    //         } else {
                    //             icon = '../../../static/img/light_open.svg'
                    //         }
                    //         let children={
                    //             label:item.securityIds[i],
                    //             type:'person',
                    //             icon:icon,
                    //             id:item.securityIds[i]
                    //         }
                    //         item.children.push(children)
                    //     }
                    //     let obj = {
                    //         label: item.inspectionSchedule.name,
                    //         type:'person',
                    //         id: item.inspectionSchedule.id,
                    //         children:item.children
                    //     }
                    //     arr.push(obj)
                    // })
                    // this.lightInfo = arr
                    console.log(this.lightInfo,'16565623');
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
            this.getAllAlarmEvent();
            this.drawLine();
        },
        computed: {
            ...mapGetters(['getcontroleLight'])
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
                        .search,.broad{
                            width: 18px;
                            vertical-align: middle;
                            cursor: pointer;
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
