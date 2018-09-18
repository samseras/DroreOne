<template>
    <div class="parking">
        <div class="parkTop">
            <div class="cars">
                <img src="./../../../static/img/xh-corner.png" alt="">
                <h3>实时进出车辆统计</h3>
                <div class="selectItem">
                    <el-date-picker
                        v-model="currTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="totalFlowCurr" class="flowKind">
                        <el-option
                            v-for="item in totalFlowOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div id="nowCar">

                </div>
            </div>
            <div class="parkCount">
                <img src="./../../../static/img/xh-corner.png" alt="">
                <!--<img src="./../../../static/img/partCar.png" class="back">-->
                <h3>停车场统计</h3>
                <div class="selectItem">
                    <el-date-picker
                        v-model="currTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="totalFlowCurr" class="flowKind">
                        <el-option
                            v-for="item in totalFlowOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div id="carNum">
                </div>
            </div>
        </div>
        <div class="parkBottom">
            <img src="./../../../static/img/xh-corner.png" alt="">
            <h3>停车场数据分析</h3>
            <div id="analysis">
                <ScrollContainer>
                    <el-table
                        class="mytable"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="车辆类型"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="busNum"
                            label="车牌号码"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="provinces"
                            label="所属省份"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="goTime"
                            label="进入时间"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="outTime"
                            label="离开时间"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="rest"
                            label="停留时长(min)"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            label="费用(元)"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="scenic"
                            label="景点名称"
                            width="200">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop="state"-->
                            <!--label="状态"-->
                            <!--width="200">-->
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.state === 'normal'" class="normal">{{scope.row.type}}</span>-->
                                <!--<span v-if="scope.row.state === 'ready'" class="ready">{{scope.row.type}}</span>-->
                                <!--<span v-if="scope.row.state === 'overstep'" class="overstep">{{scope.row.type}}</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    export default {
        name: "parking",
        data(){
            return{
                carData:{
                    carTime:['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                    carNumber:[0, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 89]
                },
                parkData:[
                    {value:348, name:'已停车辆'},
                    {value:251, name:'可停车辆'},
                ],
                totalFlowCurr:'每周',
                currTime:'',
                totalFlowOption:[
                    {value: '1', label: '每年'},
                    {value: '2', label: '每月'},
                    {value: '3', label: '每周'},
                    {value: '4', label: '每日'}
                ],
                tableData:[
                    {type:'轿车',busNum:'陕Au23b7',provinces:'陕西',goTime:'14:20',outTime:'17:00',rest:'34',money:'10',scenic:'运河'},
                    {type:'轿车',busNum:'陕B453b7',provinces:'陕西',goTime:'12:12',outTime:'17:00',rest:'12',money:'20',scenic:'运河'},
                    {type:'轿车',busNum:'浙Au23b7',provinces:'浙江',goTime:'16:00',outTime:'17:00',rest:'45',money:'40',scenic:'运河'},
                    {type:'轿车',busNum:'陕Au23b7',provinces:'陕西',goTime:'16:00',outTime:'17:00',rest:'123',money:'60',scenic:'运河'},
                    {type:'客车',busNum:'陕Au23b7',provinces:'陕西',goTime:'18:34',outTime:'17:00',rest:'40',money:'11',scenic:'运河'},
                    {type:'轿车',busNum:'陕Au23b7',provinces:'陕西',goTime:'16:00',outTime:'17:00',rest:'30',money:'23',scenic:'运河'},
                    {type:'客车',busNum:'粤B35347',provinces:'广东',goTime:'09:38',outTime:'17:00',rest:'17',money:'34',scenic:'运河'},
                    {type:'轿车',busNum:'陕Au23b7',provinces:'陕西',goTime:'16:00',outTime:'17:00',rest:'123',money:'60',scenic:'运河'},
                    {type:'客车',busNum:'陕Au23b7',provinces:'陕西',goTime:'18:34',outTime:'17:00',rest:'40',money:'11',scenic:'运河'},
                    {type:'轿车',busNum:'陕Au23b7',provinces:'陕西',goTime:'16:00',outTime:'17:00',rest:'30',money:'23',scenic:'运河'},
                    {type:'客车',busNum:'粤B35347',provinces:'广东',goTime:'09:38',outTime:'17:00',rest:'17',money:'34',scenic:'运河'},
                    {type:'轿车',busNum:'陕C343b7',provinces:'陕西',goTime:'11:00',outTime:'17:00',rest:'7',money:'15',scenic:'运河'}
                ]
            }
        },
        methods:{
            drawCar(){
                let myMap = this.$echarts.init(document.getElementById('nowCar'))
                myMap.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#00c7ff'
                            }
                        },
                        data: this.carData.carTime
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#00c7ff'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '增长数',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color:'#0594af',
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)',
                                borderColor: 'rgba(137,189,2,0.27)',
                                borderWidth: 12

                            }
                        },
                        data: this.carData.carNumber
                    }]
                })
            },
            drawPark(){
                let myPark = this.$echarts.init(document.getElementById('carNum'))
                myPark.setOption({
                    color:['#07495d','#00f7f9'],
                    series: [
                        {
                            type:'pie',
                            radius: ['40%', '55%'],
                            label: {
                                color:'#f2c219',
                                formatter: '{b|{b}：}{c} ',
                                fontSize: 14,
                                rich: {
                                    b: {
                                        fontSize: 20,
                                        lineHeight: 33,
                                        color:'#00f7f9'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data:this.parkData
                        }
                    ]
                })
            }
        },
        components:{
            ScrollContainer
        },
        mounted(){
            this.drawCar()
            this.drawPark()
        }
    }
</script>

<style lang="scss" type="text/scss" >
    .parking{
        .el-select{
            width: 70px;
            display: flex;
            .el-input{
                .el-input__inner{
                    background: none;
                    border: none;
                    border-bottom: 1px solid #ffca19;
                    color:#01f5ff;
                    padding: 0;
                    border-radius: 0;
                }
                .el-input__suffix{
                    width: 30px;
                    .el-input__icon{
                        height: 40px;
                        color: #01f5ff;
                    }
                }

            }
        }
        .el-select-dropdown{
            background-color: red;
            border: none;
        }
        .el-date-editor{
            width: 250px;
        }
        .el-input__inner{
            background:none;
            border: none;
            .el-range__icon{
                color: #01f5ff;
            }
            .el-range-input{
                background:none;
                color: #01f5ff;
            }
            .el-range-separator{
                color: #01f5ff;
            }
        }
        .parkBottom{
            #analysis{
                .mytable{
                    th{
                        background-color:#013c4f;
                        color:#fff;
                        border:none;
                    }
                    td{
                        background-color: #031328;
                        color:#02b1c7;
                        border:none;
                    }
                    .el-button{
                        border:none;
                    }
                }
            }
        }
        .el-table{
            color: #01e2ff;
            background: transparent;
        }
        /*.el-table__header{*/
            /*width:100%;*/
        /*}*/
        .el-table thead{
            color: #fff;
        }
        .el-table th,.el-table tr{
            background-color: transparent;
        }
        .el-table thead tr{
            background-color: #03243d;
        }
        .el-table td, .el-table th.is-leaf{
            border-bottom: 1px solid transparent;
        }
        .el-table td{
            border-color: transparent;
        }
        .el-table--striped .el-table__body tr.el-table__row--striped td{
            background: #032337;
        }
        .el-table--border::after, .el-table--group::after, .el-table::before{
            background-color: transparent;
        }
    }
</style>
<style lang="scss" type="text/scss" scoped>
    .parking{
        width:100%;
        height: 100%;
        color: #fff;
        background: url("./../../../static/img/xh-parking.png") no-repeat;
        background-size: 100% auto;
        .parkTop{
            width:100%;
            height:40%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.5%;
            .cars{
                border:1px solid #01f5ff;
                width:65%;
                height:100%;
                position: relative;
                #nowCar{
                    width:100%;
                    height:100%;
                }
                img{
                    position: absolute;
                    top:0;
                    left:0;
                }
                h3{
                    margin-left: 5px;
                    margin-top: 5px;
                }
                .selectItem{
                    width: 300px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    .flowKind{
                        position: absolute;
                        top: 0px;
                        right: 10px;
                    }
                }
            }
            .parkCount{
                border:1px solid #01f5ff;
                width:34%;
                height:100%;
                position: relative;
                img{
                    position: absolute;
                    top:0;
                    left:0;
                }
                .back{
                    position: absolute;
                    top:2%;
                    left:19%;
                }
                h3{
                    margin-left: 5px;
                    margin-top: 5px;
                }
                .selectItem{
                    width: 300px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    .flowKind{
                        position: absolute;
                        top: 0px;
                        right: 10px;
                    }
                }
                #carNum{
                    width:100%;
                    height:100%;
                }
            }
        }
        .parkBottom{
            border:1px solid #01f5ff;

            height:58%;
            position: relative;
            img{
                position: absolute;
                top:0;
                left:0;
            }
            h3{
                margin-left: 5px;
                margin-top: 5px;
            }
            #analysis{
                position: absolute;
                left: 50%;
                transform: translate( -50%,0 );
                padding-top:15px;
                height:90%;
                box-sizing: border-box;
            }
        }
    }
</style>
