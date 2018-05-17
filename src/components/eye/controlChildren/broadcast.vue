<template>
    <div class="broadcast">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>广播列表</h5>
                <ul>
                    <li @click="showBroadCard" id='newagenda'><img src="../../../../static/img/newFile.png"/></li>
                    <li><img src="../../../../static/img/player.png"/></li>
                    <li><img src="../../../../static/img/microphone.png" alt=""/></li>
                    <li><img src="../../../../static/img/search.png" alt=""/></li>
                </ul>
            </div>
            <div class="middle">
                <!--搜索-->
                <input id="search" type="text" placeholder="设备名称,组名称"/>
                <div class="manage">
                    <el-checkbox class="check">广播总数<font>187</font>个</el-checkbox>
                    <el-checkbox class="check">故障<font>15</font>个</el-checkbox>
                </div>
                <div class="boottom" id="ztree">
                    <!--广播-->
                    <ScrollContainer>
                        <broadcast-ztree></broadcast-ztree>
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
        <BroadCard v-if="isShowBroadCard" @closeBroadCard="isShowBroadCard = false" class="broadCard"></BroadCard>
    </div>

</template>

<script>
    import broadcastZtree from "./children/broadcastzTree.vue"
    // import echarts from "../../../../static/js/echarts.min.js"
    import BroadCard from './children/broadCard'
    import ScrollContainer from '@/components/ScrollContainer'

    var date = [
        {value: 1580, name: '1人'},
        {value: 50, name: '4人'}
    ];
    var getChangeData = [
        {name: "广播1"},
        {name: "广播2"},
        {name: "广播4"},
        {name: "广播4"},
        {name: "广播5"},
        {name: "广播6"},
        {name: "广播7"},
        {name: "广播8"}
    ];

    export default {
        data() {
            return {
                isShow: true,
                // setting: {
                //     check: {
                //         enable: true,
                //         nocheckInherit: false
                //     },
                //     data: {
                //         simpleData: {
                //             enable: true
                //         }
                //     },
                //     callback: {
                //         beforeClick: this.beforeClick,
                //         onClick: this.zTreeOnClick,
                //         onCheck: this.zTreeOnCheck,
                //     },
                //     view: {
                //         showLine: false
                //     }
                // },
                // zNodes: [],
                options: [
                    {value: '选项1', label: '周一'},
                    {value: '选项2', label: '周二'},
                    {value: '选项3', label: '周三'},
                    {value: '选项4', label: '周四'},
                    {value: '选项5', label: '周五'},
                    {value: '选项6', label: '周六'},
                    {value: '选项7', label: '周天'}
                ],
                value: '',
                optionMisic: [
                    {value: '选项1', label: '曲目1'},
                    {value: '选项2', label: '曲目2'},
                    {value: '选项3', label: '曲目3'},
                    {value: '选项4', label: '曲目4'},
                    {value: '选项5', label: '曲目5'},
                    {value: '选项6', label: '曲目6'}
                ],
                isShowBroadCard: false
            }
        },
        components: {
            broadcastZtree,
            BroadCard,
            ScrollContainer
        },
        methods: {
            showBroadCard() {
                console.log(777)
                this.isShowBroadCard = true
            },
            newagenda: function () {
                // var treeObj = $.fn.zTree.getZTreeObj("broadcastZtree");
                // var nodes = treeObj.getChangeCheckedNodes(true);  //获取输入框勾选状态被改变的节点集合
                // console.log(nodes);
                // this.zNodes = nodes;
                // console.log(this.zNodes);
                $(".newagenda").show();

            },
            // hideagenda: function () {
            //     $(".newagenda").hide();
            // },
            // addagenda: function () {
            //     $(".newagenda-entrance").hide();
            //     $(".addagenda").show();
            //
            // },
            // saveagenda: function () {
            //     $(".addagenda").hide();
            //     $(".newagenda-entrance").show();
            // },
            // lastStep: function () {
            //     $(".addagenda").hide();
            //     $(".newagenda-entrance").show();
            // },
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
            }
        },

        created: function () {

        },
        mounted() {
            this.drawLine();
            // $.fn.zTree.init($("#addagenda"), this.setting, this.zNodes).expandAll(true);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    /*@import '../../../../plugins/ztree/css/zTreeStyle.css';*/

    .broadcast {
        width: 100%;
        height: 100%;
    }

    .reveal {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f2f2f2;
    }

    .reveal > .top {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        background: #fafafa;
    }

    .top h5 {
        margin-left: 15px;
    }

    .top ul {
        display: flex;
    }

    .top ul li {
        margin: 0 5px;
    }

    #search {
        width: 88%;
        margin: 5px 6% 10px;
        text-indent: 10px;
        font-size: 10px;
        color: #646464;
        height: 20px;
    }

    .reveal > .middle {
        width: 100%;
        flex: 1;
        background: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .middle .manage {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ccc;
    }

    .middle .manage .check {
        margin-left: 10px;
    }

    .el-checkbox:last-child {
        color: #f36a5a;
    }

    .middle .boottom {
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

    .last {
        width: 100%;
        height: 210px;
        overflow: hidden;
    }

    .last h5 {
        line-height: 40px;
        margin-left: 15px;
    }

    .last h5 + div {
        width: 100%;
        height: 170px;
        background: #fff;
    }

    #pie {
        width: 80%;
        height: 95%;
        margin: 0 auto;
        padding-top: 5%;
    }

    .broadCard {
        width: 500px;
        height: 350px;
        position: fixed;
        left: 20%;
        top: 30%;
    }
</style>
