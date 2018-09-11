<template>
   <div class="scenicHeadMap">
       <div class="mapFather">
           <div class="flow">
               <div class="universe">
                   <p>今日运河全域总客流量</p>
                   <span class="sum" v-for="(item, index) in total" :key="index">{{item}}</span>
               </div>
               <div class="actual">
                   <p>实时客流量</p>
                   <span class="now" v-for="(item, index) in real" :key="index">{{item}}</span>
               </div>
           </div>
           <div id="echartHotMap"></div>
       </div>
       <!--<div class="scenicNumber">-->
           <!--各景点游客数量-->
       <!--</div>-->
   </div>
</template>

<script>
    import 'echarts/extension-src/bmap/bmap.js'
    import ScrollContainer from '@/components/ScrollContainer'
    export default {
        name: "heat-map",
        data(){
            return{
                sum:12346,
                nowPassenger:4576,
                total:[],
                real:[],
                value: [
                    {name: '西湖音乐喷泉', value: 100},
                    {name: '浙江省博物馆', value: 520},
                    {name: '岳王庙', value: 230},
                    {name: '黄龙洞', value: 922},
                    {name: '断桥', value: 12044},
                    {name: '鼓楼', value: 500},
                    {name: '西湖', value: 122356},
                    {name: '宝石山', value: 400},
                    {name: '湖滨公园', value: 1722},
                    {name: '钱塘江夜游', value: 600}
                ],
                geoCoordMap: {
                    '西湖': [120.152991,30.249637],
                    '断桥': [120.158169,30.264563],
                    '西湖音乐喷泉': [120.167614,30.25964],
                    '浙江省博物馆': [120.149943,30.257342],
                    '岳王庙': [120.141111,30.258673],
                    '黄龙洞': [120.14493,30.270835],
                    '宝石山': [120.15064,30.267223],
                    '鼓楼': [120.17809,30.243779],
                    '三公园': [120.167591,30.259669],
                    '胡雪岩故居': [120.179464,30.242971],
                    '小瀛洲岛': [120.151793,30.244712],
                    '三潭印月': [120.150684,30.244082],
                    '湖滨公园': [120.163516,30.266108],
                    '钱塘江夜游': [120.168991,30.279759],
                    '太子湾公园': [120.148209,30.231845]

                }
            }
        },
        methods:{
            localeNum(){
                let total = this.sum,
                    real = this.nowPassenger;
                this.total = String(parseFloat(total).toLocaleString()).split('')
                this.real = String(parseFloat(real).toLocaleString()).split('')
            },
            getPassenger(){//获取后台实时客流

            },
            getEchartsMap () {
                let that = this
                var convertData = function (data, n) {
                    var res = []
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = that.geoCoordMap[data[i].name]
                        if (geoCoord) {
                            res.push(geoCoord.concat(data[i].value + (Math.random() - 0.5) * n))
                        }
                    }
                    return res
                }
                let option = {
                    baseOption: {
                        toolbox: {
                            show: true,
                            left: '10px',
                            top: '10px',
                            feature: {
                                restore: {},
                                saveAsImage: {
                                    backgroundColor: '#081633'
                                }
                            }
                        },
                        timeline: {
                            autoPlay: true,
                            data: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                            axisType: 'category',
                            padding: [5, 5, 5, 5],
                            playInterval: 1500,
                            lineStyle: {color: 'red'},
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 13
                                    }
                                }
                            }
                        },
                        bmap: {
                            center: [120.168713,30.28058],
                            zoom: 15,
                            roam: true,
                            mapStyle: {
                                styleJson: [
                                    {
                                        'featureType': 'land', // 调整土地颜色
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#081734'
                                        }
                                    },
                                    {
                                        'featureType': 'building', // 调整建筑物颜色
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#04406F'
                                        }
                                    },
                                    {
                                        'featureType': 'building', // 调整建筑物标签是否可视
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'highway', // 调整高速道路颜色
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#015B99'
                                        }
                                    },
                                    {
                                        'featureType': 'highway', // 调整高速名字是否可视
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'arterial', // 调整一些干道颜色
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#003051'
                                        }
                                    },
                                    {
                                        'featureType': 'arterial',
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'green',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'water',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#044161'
                                        }
                                    },
                                    {
                                        'featureType': 'subway', // 调整地铁颜色
                                        'elementType': 'geometry.stroke',
                                        'stylers': {
                                            'color': '#003051'
                                        }
                                    },
                                    {
                                        'featureType': 'subway',
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'railway',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'railway',
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'all', // 调整所有的标签的边缘颜色
                                        'elementType': 'labels.text.stroke',
                                        'stylers': {
                                            'color': '#313131'
                                        }
                                    },
                                    {
                                        'featureType': 'all', // 调整所有标签的填充颜色
                                        'elementType': 'labels.text.fill',
                                        'stylers': {
                                            'color': '#FFFFFF'
                                        }
                                    },
                                    {
                                        'featureType': 'manmade',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'manmade',
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'local',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'local',
                                        'elementType': 'labels',
                                        'stylers': {
                                            'visibility': 'off'
                                        }
                                    },
                                    {
                                        'featureType': 'subway',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'lightness': -65
                                        }
                                    },
                                    {
                                        'featureType': 'railway',
                                        'elementType': 'all',
                                        'stylers': {
                                            'lightness': -40
                                        }
                                    },
                                    {
                                        'featureType': 'boundary',
                                        'elementType': 'geometry',
                                        'stylers': {
                                            'color': '#8b8787',
                                            'weight': '1',
                                            'lightness': -29
                                        }
                                    }]
                            }
                        },
                        visualMap: {
                            min: 0,
                            max: 3000,
                            splitNumber: 5,
                            inRange: {
                                color: ['blue', 'green', 'yellow', 'red']
                            },
                            textStyle: {
                                color: '#fff'
                            },
                            bottom: 100
                        },
                        series: [{
                            type: 'heatmap',
                            mapType: 'china',
                            coordinateSystem: 'bmap',
                            blurSize: 50
                        }]
                    },
                    options: [
                        {
                            series: [{
                                data: convertData(this.value, 10000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 20000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 30000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 40000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 50000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 60000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 90000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 70000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 60000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 50000)
                            }]
                        },
                        {
                            series: [{
                                data: convertData(this.value, 30000)
                            }]
                        }
                    ]
                }
                let myChart = this.$echarts.init(document.getElementById('echartHotMap'))
                myChart.setOption(option)
            }
        },
        components:{
            ScrollContainer
        },
        async mounted(){
            await this.getEchartsMap()
            await this.localeNum()
        },
        created(){
            let that = this
            setInterval(function(){
                that.getPassenger()
            },50000)
        }
    }
</script>

<style lang="scss" type="text/scss">
    .scenicHeadMap{
        width:100%;
        height: 100%;
        display: flex;
        .mapFather{
            width: 100%;
            height: 100%;
            position: relative;
            color:#fff;
            .flow{
                position: absolute;
                top:150px;
                left:0;
                height:70px;
                width:100%;
                display: flex;
                justify-content: space-between;
                z-index: 3;
                padding:0 100px;
                box-sizing: border-box;
                p{
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .sum{
                    color:#00e3ff;
                    font-size: 45px;
                    margin-right: 5px;
                }
                .now{
                    color:#fbc91c;
                    font-size: 45px;
                    margin-right: 5px;
                }
                span{
                    display: inline-block;
                    width:40px;
                    height:80px;
                    line-height:80px;
                    text-align: center;
                    background:#003164;
                    font-size: 35px;
                }
                span:nth-last-child(4),span:nth-last-child(8),span:nth-last-child(12){
                    background: none;
                    width: 20px;
                }
            }
            #echartHotMap{
                width: 100%;
                height: 100%;
            }
        }
        /*.scenicNumber{*/
            /*width:40%;*/
            /*height:100%;*/
            /*border:1px solid #01f5ff;*/
        /*}*/
    }
</style>
