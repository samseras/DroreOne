<template>
    <div class="originTrip">
        <div class="originTripLeft">
            <div class="originTripLeftTop">
                <div class="originTripLeftTopTitle">
                    游客客源地分析
                </div>
                <div class="originTripLeftTopContent">
                    <div class="originDateChoose">
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
                    <div id="originTripLeftTopContent"></div>
                </div>
            </div>
            <div class="originTripLeftBottom">
                <div id="analysis">
                    <el-table
                        class="mytable"
                        :data="ProvinceTableData"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="gender"
                            label="性别"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="age"
                            label="年龄"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="source"
                            label="来源地"
                            width="200">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="originTripRight">
            <div class="originTripRightTop">
                <div class="originTripRightTopTitle">
                    游客客源地分析
                </div>
                <div class="originTripRightTopContent">
                    <div class="originDateChoose">
                        <el-date-picker
                            v-model="currOriginTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <el-select v-model="totalFlowOriginCurr" class="flowKind">
                            <el-option
                                v-for="item in totalFlowOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div id="originTripRightTopContent">
                    </div>
                </div>
            </div>
            <div class="originTripRightBottom">
                <div id="analysiss">
                    <el-table
                        class="mytable"
                        :data="cityTableData"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="gender"
                            label="性别"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="age"
                            label="年龄"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="source"
                            label="来源地"
                            width="200">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'echarts/map/js/china'
    import 'echarts/map/js/province/zhejiang'
    import 'echarts/extension-src/bmap/bmap'

    export default {
        name: "origin-trip",
        data () {
            return {
                currTime:'',
                currOriginTime:'',
                totalFlowOption: [
                    {value: '1', label: '每年'},
                    {value: '2', label: '每月'},
                    {value: '3', label: '每周'},
                    {value: '4', label: '每日'}
                ],
                totalFlowCurr:'每周',
                totalFlowOriginCurr:'每月',
                geoCoordMap: {
                    '丽水': [119.933512, 28.502719],
                    '杭州': [120.145081, 30.282981],
                    '温州': [120.706199, 28.030336],
                    '宁波': [121.570872, 29.907018],
                    '舟山': [122.19638, 30.019158],
                    '台州': [121.442091, 28.697567],
                    '金华': [119.620758, 29.110403],
                    '衢州': [118.857271, 28.997241],
                    '绍兴': [120.577418, 30.051174],
                    '嘉兴': [120.742994, 30.776712],
                    '湖州': [120.451862, 30.082376],
                    '柯桥': [120.4639, 29.4202],
                    '江北区': [121.562142, 29.895202]
                },
                BJData: [
                    [{
                        name: '宁波',
                        value: 100
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '绍兴',
                        value: 70
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '温州',
                        value: 30
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '湖州',
                        value: 50
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '台州',
                        value: 20
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '金华',
                        value: 10
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '嘉兴',
                        value: 80
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '衢州',
                        value: 55
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '丽水',
                        value: 90
                    }, {
                        name: '杭州'
                    }]
                ],
                geoCoordMap:  {
                    '上海': [121.4648, 31.2891],
                    '东莞': [113.8953, 22.901],
                    '东营': [118.7073, 37.5513],
                    '中山': [113.4229, 22.478],
                    '临汾': [111.4783, 36.1615],
                    '临沂': [118.3118, 35.2936],
                    '丹东': [124.541, 40.4242],
                    '丽水': [119.5642, 28.1854],
                    '乌鲁木齐': [87.9236, 43.5883],
                    '佛山': [112.8955, 23.1097],
                    '保定': [115.0488, 39.0948],
                    '兰州': [103.5901, 36.3043],
                    '包头': [110.3467, 41.4899],
                    '北京': [116.4551, 40.2539],
                    '北海': [109.314, 21.6211],
                    '南京': [118.8062, 31.9208],
                    '南宁': [108.479, 23.1152],
                    '南昌': [116.0046, 28.6633],
                    '南通': [121.1023, 32.1625],
                    '厦门': [118.1689, 24.6478],
                    '台州': [121.1353, 28.6688],
                    '合肥': [117.29, 32.0581],
                    '呼和浩特': [111.4124, 40.4901],
                    '咸阳': [108.4131, 34.8706],
                    '哈尔滨': [127.9688, 45.368],
                    '唐山': [118.4766, 39.6826],
                    '嘉兴': [120.9155, 30.6354],
                    '大同': [113.7854, 39.8035],
                    '大连': [122.2229, 39.4409],
                    '天津': [117.4219, 39.4189],
                    '太原': [112.3352, 37.9413],
                    '威海': [121.9482, 37.1393],
                    '宁波': [121.5967, 29.6466],
                    '宝鸡': [107.1826, 34.3433],
                    '宿迁': [118.5535, 33.7775],
                    '常州': [119.4543, 31.5582],
                    '广州': [113.5107, 23.2196],
                    '廊坊': [116.521, 39.0509],
                    '延安': [109.1052, 36.4252],
                    '张家口': [115.1477, 40.8527],
                    '徐州': [117.5208, 34.3268],
                    '德州': [116.6858, 37.2107],
                    '惠州': [114.6204, 23.1647],
                    '成都': [103.9526, 30.7617],
                    '扬州': [119.4653, 32.8162],
                    '承德': [117.5757, 41.4075],
                    '拉萨': [91.1865, 30.1465],
                    '无锡': [120.3442, 31.5527],
                    '日照': [119.2786, 35.5023],
                    '昆明': [102.9199, 25.4663],
                    '杭州': [119.5313, 29.8773],
                    '枣庄': [117.323, 34.8926],
                    '柳州': [109.3799, 24.9774],
                    '株洲': [113.5327, 27.0319],
                    '武汉': [114.3896, 30.6628],
                    '汕头': [117.1692, 23.3405],
                    '江门': [112.6318, 22.1484],
                    '沈阳': [123.1238, 42.1216],
                    '沧州': [116.8286, 38.2104],
                    '河源': [114.917, 23.9722],
                    '泉州': [118.3228, 25.1147],
                    '泰安': [117.0264, 36.0516],
                    '泰州': [120.0586, 32.5525],
                    '济南': [117.1582, 36.8701],
                    '济宁': [116.8286, 35.3375],
                    '海口': [110.3893, 19.8516],
                    '淄博': [118.0371, 36.6064],
                    '淮安': [118.927, 33.4039],
                    '深圳': [114.5435, 22.5439],
                    '清远': [112.9175, 24.3292],
                    '温州': [120.498, 27.8119],
                    '渭南': [109.7864, 35.0299],
                    '湖州': [119.8608, 30.7782],
                    '湘潭': [112.5439, 27.7075],
                    '滨州': [117.8174, 37.4963],
                    '潍坊': [119.0918, 36.524],
                    '烟台': [120.7397, 37.5128],
                    '玉溪': [101.9312, 23.8898],
                    '珠海': [113.7305, 22.1155],
                    '盐城': [120.2234, 33.5577],
                    '盘锦': [121.9482, 41.0449],
                    '石家庄': [114.4995, 38.1006],
                    '福州': [119.4543, 25.9222],
                    '秦皇岛': [119.2126, 40.0232],
                    '绍兴': [120.564, 29.7565],
                    '聊城': [115.9167, 36.4032],
                    '肇庆': [112.1265, 23.5822],
                    '舟山': [122.2559, 30.2234],
                    '苏州': [120.6519, 31.3989],
                    '莱芜': [117.6526, 36.2714],
                    '菏泽': [115.6201, 35.2057],
                    '营口': [122.4316, 40.4297],
                    '葫芦岛': [120.1575, 40.578],
                    '衡水': [115.8838, 37.7161],
                    '衢州': [118.6853, 28.8666],
                    '西宁': [101.4038, 36.8207],
                    '西安': [109.1162, 34.2004],
                    '贵阳': [106.6992, 26.7682],
                    '连云港': [119.1248, 34.552],
                    '邢台': [114.8071, 37.2821],
                    '邯郸': [114.4775, 36.535],
                    '郑州': [113.4668, 34.6234],
                    '鄂尔多斯': [108.9734, 39.2487],
                    '重庆': [107.7539, 30.1904],
                    '金华': [120.0037, 29.1028],
                    '铜川': [109.0393, 35.1947],
                    '银川': [106.3586, 38.1775],
                    '镇江': [119.4763, 31.9702],
                    '长春': [125.8154, 44.2584],
                    '长沙': [113.0823, 28.2568],
                    '长治': [112.8625, 36.4746],
                    '阳泉': [113.4778, 38.0951],
                    '青岛': [120.4651, 36.3373],
                    '韶关': [113.7964, 24.7028]
                },
                bjCData: [
                    [{
                        name: '上海',
                        value: 100
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '广州',
                        value: 70
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '哈尔滨',
                        value: 30
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '青岛',
                        value: 50
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '南昌',
                        value: 20
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '银川',
                        value: 10
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '拉萨',
                        value: 80
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '西安',
                        value: 55
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '乌鲁木齐',
                        value: 90
                    }, {
                        name: '杭州'
                    }],
                    [{
                        name: '重庆',
                        value: 90
                    }, {
                        name: '杭州'
                    }]
                ],
                ProvinceTableData:[
                    {name: '刘瑜',gender:'男',age:'26',source:'陕西'},
                    {name: '刘瑜',gender:'男',age:'26',source:'重庆'},
                    {name: '刘瑜',gender:'男',age:'26',source:'西藏'}
                ],
                cityTableData:[
                    {name: '刘瑜',gender:'男',age:'26',source:'金华市'},
                    {name: '刘瑜',gender:'男',age:'26',source:'台州市'},
                    {name: '刘瑜',gender:'男',age:'26',source:'湖州市'}
                ]
            }
        },
        methods: {
            // 全国客流量统计
            CpassengerEcharts (){
                let geoCoordMap = this.geoCoordMap
                let BJData = this.bjCData
                let convertData = function(data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let dataItem = data[i];
                        let fromCoord = geoCoordMap[dataItem[0].name];
                        let toCoord = geoCoordMap[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            res.push([{
                                coord: fromCoord,
                                value: dataItem[0].value
                            }, {
                                coord: toCoord,
                            }]);
                        }
                    }
                    return res;
                };
                let color = ['#a6c84c', '#ffa022', '#46bee9'];
                let series = [];
                [
                    ['杭州', BJData]
                ].forEach(function(item, i) {
                    series.push(
                        {
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 4,
                                trailLength: 0.02,
                                symbol: 'arrow',
                                symbolSize: 5,
                            },
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },

                            data: convertData(item[1])
                        }, {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    offset: [5, 0],
                                    formatter: '{b}'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: function(val) {
                                return 4 + val[2] / 10;
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    color: '#f00'
                                }
                            },
                            data: item[1].map(function(dataItem) {
                                return {
                                    name: dataItem[0].name,
                                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                                };
                            }),
                        },
                        //被攻击点
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    //			                offset:[5, 0],

                                    color: '#00ffff',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: "#00ffff"
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#9966cc'
                                }
                            },
                            data: [{
                                name: item[0],
                                value: geoCoordMap[item[0]].concat([100]),
                            }],
                        }
                    );
                });

                let option = {
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        layoutCenter: ['50%', '53%'],
                        layoutSize: "108%",
                        itemStyle: {
                            normal: {
                                color: 'rgba(51, 69, 89, .5)',
                                borderColor: 'rgba(100,149,237,1)'
                            },
                            emphasis: {
                                color: 'rgba(37, 43, 61, .5)'
                            }
                        }
                    },
                    series: series
                };

                let myChart = this.$echarts.init(document.getElementById('originTripLeftTopContent'))
                myChart.resize()
                myChart.setOption(option)
            },
            // 全省客流量统计
            PpassengerEcharts () {

                var that = this
                var convertData = function (data) {
                    var res = []
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i]
                        var fromCoord = that.geoCoordMap[dataItem[0].name]
                        var toCoord = that.geoCoordMap[dataItem[1].name]
                        if (fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                coords: [fromCoord, toCoord]
                            })
                        }
                    }
                    return res
                }
                // var color = ['#a6c84c', '#ffa022', '#46bee9']
                var series = []
                var arr = [['杭州', that.BJData]]
                arr.forEach(function (item, i) {
                    series.push(
                        {
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 4,
                                trailLength: 0.02,
                                symbol: 'arrow',
                                symbolSize: 5
                            },
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.3,
                                    curveness: 0.2,
                                    color: '#00ffff'
                                }
                            },
                            data: convertData(item[1])
                        }, {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    offset: [5, 0],
                                    formatter: '{b}'
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: function (val) {
                                return 4 + val[2] / 10
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    color: '#00e4fe'
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[0].name,
                                    value: that.geoCoordMap[dataItem[0].name].concat([dataItem[0].value / 100])
                                }
                            })
                        },
                        // 被攻击点
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    color: '#00ffff',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: '#00ffff'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: '#9966cc'
                                }
                            },
                            data: [{
                                name: item[0],
                                value: that.geoCoordMap[item[0]].concat([100])
                            }]
                        }
                    )
                })
                let option = {
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: '浙江',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        layoutCenter: ['50%', '53%'],
                        layoutSize: '108%',
                        itemStyle: {
                            normal: {
                                color: 'rgba(51, 69, 89, .5)',
                                borderColor: 'rgba(100,149,237,1)'
                            },
                            emphasis: {
                                color: 'rgba(37, 43, 61, .5)'
                            }
                        }
                    },
                    series: series
                }
                var dom = document.getElementById('originTripRightTopContent')
                var myChart = this.$echarts.init(dom)
                myChart.resize()
                myChart.setOption(option, true)
            }
        },
        async mounted () {
            await this.CpassengerEcharts()
            await this.PpassengerEcharts()
        }
    }
</script>

<style lang="scss" type="text/scss">
    .originTrip{
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
        .originTripLeft{
            .originTripLeftBottom{
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
        }
        .originTripRight{
            .originTripRightBottom{
                #analysiss{
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
        }
    }
</style>

<style lang="scss" type="text/scss" scoped>
    .originTrip{
        width:100%;
        height: 100%;
        color: #fff;
        .originTripLeft{
            width: 49%;
            float: left;
            .originTripLeftTop{
                .originTripLeftTopTitle{
                    box-sizing: border-box;
                    color: #03C8D5;
                    position: relative;
                    padding: 0 0 0 20px;
                    margin:  0 0 20px 0;
                    width: 100%;
                    background: linear-gradient( to right ,#0A132E, #066B80);
                }
                .originTripLeftTopTitle::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    width: 5px;
                    height: 100%;
                    background: #03C8D5;
                    border-radius: 1px  0 0 1px;
                }
                .originTripLeftTopContent{
                    width: 100%;
                    height: 450px;
                    border: 1px solid #02D5E1;
                    position: relative;
                    #originTripLeftTopContent{
                         width: 100%;
                         height: 100%;
                     }
                    .originDateChoose{
                        position: absolute;
                        z-index: 10;
                        width: 300px;
                        height: 100px;
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
            }
            .originTripLeftBottom{
                width: 100%;
                height: 300px;
                margin-top: 24px;
                border: 1px solid #02D5E1;
                position: relative;
                #analysis{
                    height: 192px;
                    margin-top: 50px;
                    position: absolute;
                    left: 50%;
                    transform: translate( -50%,0);
                }
            }
            .originTripLeftBottom::before{
                content: '各省游客来源';
                position: absolute;
                width: 200px;
                color: #01f5ff;
                padding: 8px 10px;
                background:url("./../../../static/img/corner.png") no-repeat ;
            }
        }
        .originTripRight{
            width: 49%;
            float: right;
            .originTripRightTop{
                .originTripRightTopTitle{
                    box-sizing: border-box;
                    color: #03C8D5;
                    position: relative;
                    padding: 0 0 0 20px;
                    margin:  0 0 20px 0;
                    width: 100%;
                    background: linear-gradient( to right ,#0A132E, #066B80);
                }
                .originTripRightTopTitle::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    width: 5px;
                    height: 100%;
                    background: #03C8D5;
                    border-radius: 1px  0 0 1px;
                }
                .originTripRightTopContent{
                    width: 100%;
                    height: 450px;
                    border: 1px solid #02D5E1;
                    position:relative;
                    #originTripRightTopContent{
                        width: 100%;
                        height: 100%;
                    }
                    .originDateChoose{
                        position: absolute;
                        z-index: 10;
                        width: 300px;
                        height: 100px;
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
            }
            .originTripRightBottom{
                width: 100%;
                height: 300px;
                margin-top: 24px;
                border: 1px solid #02D5E1;
                position: relative;
                #analysiss{
                    height: 192px;
                    margin-top: 50px;
                    position: absolute;
                    left: 50%;
                    transform: translate( -50%,0);
                }
            }
            .originTripRightBottom::before{
                content: '各市游客来源';
                position: absolute;
                width: 200px;
                color: #01f5ff;
                padding: 8px 10px;
                background:url("./../../../static/img/corner.png") no-repeat ;
            }
        }
    }
</style>
