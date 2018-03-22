<template>
    <div class="warn">
        <!--顶部-->
        <div class="top">
            <h5>告警事件</h5>
            <ul>
                <li><img src="../../../../static/img/microphone.png" alt=""/></li>
                <li><img src="../../../../static/img/search.png" alt=""/></li>
            </ul>
        </div>

        <div class="middle">
            <!--搜索-->
            <input id="search" type="text" placeholder="事件名称"/>
            <div class="manage">
                <el-checkbox>处理中<font>12</font>个</el-checkbox>
                <el-checkbox>待处理<font>15</font>个</el-checkbox>
            </div>
            <div class="boottom">
                <ScrollContainer>
                    <warning-ztree></warning-ztree>
                </ScrollContainer>
            </div>
        </div>
        <div class="last">
            <h5>设备故障率</h5>
            <div>
                <div id="pie">

                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import warningZtree from "./children/warningzTree.vue"
    import echarts from "../../../../static/js/echarts.min.js"
    import ScrollContainer from '@/components/ScrollContainer'

    export default {
        data() {
            return {}
        },
        components: {
            warningZtree,
            ScrollContainer
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('pie'))
                // 绘制图表
                myChart.setOption({
                    series: [
                        {
                            laber: {

                                color: "#7d7d7d"
                            },
                            type: 'pie',
                            radius: '75%',
                            center: ['50%', '50%'],
                            startAngle: 60,
                            label: {            //饼图图形上的文本标签
                                normal: {
                                    formatter: '{d}%'
                                }
                            },
                            data: [
                                {
                                    value: 1548,
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
        mounted() {
            this.drawLine();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .warn {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .warn .top {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        background: #fafafa;
    }

    .warn .top h5 {
        margin-left: 15px;
    }

    .warn .top ul {
        display: flex;
    }

    .warn .top ul li {
        margin: 0 10px;
    }

    #search {
        width: 88%;
        margin: 5px 6% 10px;
        text-indent: 10px;
        font-size: 10px;
        color: #646464;
        height: 20px;
    }

    .middle {
        width: 100%;
        flex: 1;
        background: #fff;
        display: flex;
        flex-direction: column;
    }

    .middle .manage {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ccc;
    }

    .middle .manage .el-checkbox {
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
        height: 190px;
    }

    .last h5 {
        line-height: 40px;
        margin-left: 15px;
    }

    .last h5 + div {
        width: 100%;
        height: 143px;
        background: #fff;
    }

    #pie {
        width: 80%;
        height: 95%;
        margin: 0 auto;
        padding-top: 5%;
    }

</style>
