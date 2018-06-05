<template>
    <div class="device-tree">
        <div class="charts">
            <div id="my-chart">

            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "devicetree",
        data(){
            return{
                myData:{
                    name:"设备分布",
                    children:[
                        {
                            name:'wifi设备分布',
                            children:[
                                {
                                    name:'格力wifi',
                                    value:321
                                },
                                {
                                    name:'海尔wifi',
                                    value:112
                                },
                                {
                                    name:'华为wifi',
                                    value:241
                                }
                            ]
                        },
                        {
                            name:'投影设备分布',
                            children:[
                                {
                                    name:'公司投影',
                                    value:189
                                },
                                {
                                    name:'家里投影',
                                    value:111
                                },
                                {
                                    name:'公路投影',
                                    value:225
                                }
                            ]
                        }
                    ]


                }


            }
        },
        methods:{
            init(){
                var category=this.$route.params.category;
                console.log(category);
                /*let myChart = this.$echarts.init(document.getElementById('my-chart'));
                myChart.setOption(options);*/
                let chartBox = document.getElementsByClassName('charts')[0]
                let myChart = document.getElementById('my-chart')
                // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
                function resizeCharts () {
                    myChart.style.width = chartBox.style.width + 'px'
                    myChart.style.height = chartBox.style.height + 'px'
                }
                // 设置容器高宽
                resizeCharts()

                let mainChart = this.$echarts.init(document.getElementById('my-chart'));
                let data=this.myData;

                let option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series:[
                        {
                            type: 'tree',

                            data: [data],

                            left: '2%',
                            right: '2%',
                            top: '8%',
                            bottom: '20%',

                            symbol: 'emptyCircle',

                            orient: 'vertical',

                            expandAndCollapse: true,

                            label: {
                                normal: {
                                    position: 'top',
                                    rotate: -90,
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 9
                                }
                            },

                            leaves: {
                                label: {
                                    normal: {
                                        position: 'bottom',
                                        rotate: -90,
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },

                            animationDurationUpdate: 750
                        }
                    ]
                }
                mainChart.setOption(option);

            }
        },
        components:{

        },
        created(){

        },
        mounted(){
            this.init();
        }
    }
</script>

<style  lang="scss" type="text/scss">
    .device-tree{
        border:1px solid red;
        margin:1rem;
        #my-chart{
            width:400px;
            height:300px;
            border:1px solid red;
            margin:5rem auto;
        }
    }
</style>
