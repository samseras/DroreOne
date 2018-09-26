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
    import api from '@/api'
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
                value: [],
                geoCoordMap: {
                    '浙窑公园': [120.140742,30.337346],
                    '运河天地': [120.143493,30.329816],
                    '桥西': [120.14269,30.324313],
                    '小河': [120.14338,30.306265],
                    '大兜': [120.153785,30.302519],
                    '富义仓': [120.155508,30.301285],
                    '活态馆': [120.144804,30.324821]
                },
                points:[],
                lngLat:[]
            }
        },
        methods:{
            localeNum(){
                let total = this.sum,
                    real = this.nowPassenger;
                this.total = String(parseFloat(total).toLocaleString()).split('')
                this.real = String(parseFloat(real).toLocaleString()).split('')
            },
            async getHotArea(){ //运河景区热力
                await api.passFlowAnalysis.heatFlow().then(res =>{
                    console.log(res,'123454')
                    this.value = [],this.lngLat = []
                    res.forEach((item,index) =>{
                      let obj = {
                          id:index,
                          name:item.areaIdName,
                          longitude:item.longitude,
                          latitude:item.latitude,
                          info:item.stayCount,
                          maxNum:item.maxLoad,
                          time:item.openingTime
                      }
                      let hot = {
                          lng:item.longitude,
                          lat:item.latitude,
                          count:item.stayCount
                      }
                     this.lngLat.push(hot)
                    this.value.push(obj)
                        console.log(this.value,'wqertr')
                    })
                }).catch(err =>{
                    console.log(err)
                })
                setTimeout(() =>{
                    let route = this.$route.path
                    if(route.includes('scenicHeaTMap')){
                      this.getHotArea(); //长轮循
                    }
                },5000)
            },
            getbaiduMap () {
                let map = new BMap.Map('echartHotMap',{enableMapClick:false})

                map.centerAndZoom(new BMap.Point(120.145306,30.321234), 14)
                map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
//                map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用

                map.setMapStyle({
                    styleJson: [
                        {
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#021019'
                            }
                        },
                        {
                            'featureType': 'highway',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'highway',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#147a92'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#6fa8dcff'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#666666ff'
                            }
                        },
                        {
                            'featureType': 'local',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#032748ff'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#08304b'
                            }
                        },
                        {
                            'featureType': 'subway',
                            'elementType': 'geometry',
                            'stylers': {
                                'lightness': -70
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#857f7f'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.stroke',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#00ffffff'
                            }
                        },
                        {
                            'featureType': 'green',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#062032'
                            }
                        },
                        {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#2190b8ff'
                            }
                        },
                        {
                            'featureType': 'manmade',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.icon',
                            'stylers': {
                                'visibility': 'off'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#eeeeeeff',
                                'visibility': 'on'
                            }
                        }
                    ]
                })
                var data_info = this.value
                var opts = {
                    width : 222, // 信息窗口宽度
                    height: 218, // 信息窗口高度
                    title : "<span style='font-size:15px;color:#FF0000;background-color:#FFFFFF'></span>"
                }
//                setInterval(() => {
//                    let route = this.$route.path
//                    if (route.includes('scenicHeaTMap')) {
//                        data_info = this.value
//                        console.log(data_info[19].info,'-------',this.value[19].info, '././././../././././././.')
//                        for (var i = 0; i < data_info.length; i++) {
//                            var marker = new BMap.Marker(new BMap.Point(data_info[i].position[0], data_info[i].position[1])) // 创建标注
////                    marker.setAnimation(BMAP_ANIMATION_BOUNCE)
//                            var content =
//                                "<div class='dialog' style='background: url("+'./../../../static/img/num.png'+") no-repeat; background-position: inherit; background-size: 100%'>" +
//                                "<h2 style='margin:5px 0 5px 10px;padding:0.2em 0;color:#fff'>" + data_info[i].name + " </h2> " +
//                                "<p style='margin-top:10px;line-height:2.0;font-size:14px;color:#fff'>当前人数：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].info + "</span></p>" +
//                                "<p style='margin-top:10px;line-height:2.0;font-size:14px;color:#fff'>最大容量：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].maxNum + "</span></p>" +
//                                "<p style='margin-top:10px;line-height:2.0;font-size:14px;color:#fff'>开放时间：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].time + "</span></p>" +
//                                "</div>"
//                            map.addOverlay(marker) // 将标注添加到地图中
//                            addClickHandler(content, marker)
////                     marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//                        }
//                    }
//                },10000)
//                for (var i = 0; i < data_info.length; i++) {
////                    console.log(data_info[i].position,'1234')
//                    var marker = new BMap.Marker(new BMap.Point(data_info[i].position[0], data_info[i].position[1])) // 创建标注
////                    marker.setAnimation(BMAP_ANIMATION_BOUNCE)
//                    var content =
//                        "<div class='dialog' style='background: url("+'./../../../static/img/num.png'+") no-repeat; background-position: inherit; background-size: 100%'>" +
//                        "<h2 style='margin:5px 0 5px 10px;padding:0.2em 0;color:#fff'>" + data_info[i].name + " </h2> " +
//                        "<p style='margin-top:20px;line-height:2.0;font-size:14px;color:#fff'>当前人数：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].info + "</span></p>" +
//                        "<p style='margin-top:10px;line-height:2.0;font-size:14px;color:#fff'>最大容量：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].maxNum + "</span></p>" +
//                        "<p style='margin-top:10px;line-height:2.0;font-size:14px;color:#fff'>开放时间：<span style='font-size: 20px;font-weight:bolder;color:#fbc91c'>" + data_info[i].time + "</span></p>" +
//                        "</div>"
//                    map.addOverlay(marker) // 将标注添加到地图中
//                    addClickHandler(content, marker)
////                     marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
//                }
                function addClickHandler (content, marker) {
                    marker.addEventListener('click', function (e) {
                        openInfo(content, e)})
                }
                function openInfo (content, e) {
                    var p = e.target
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
                    var infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
                    map.openInfoWindow(infoWindow, point) // 开启信息窗口
                }
//                热力图
//                var points = this.lngLat
                var points =[
                    {"lng":120.140742,"lat":30.337346,"count":300},
                    {"lng":120.14269,"lat":30.329816,"count":851},

                    {"lng":120.153785,"lat":30.302519,"count":308}];
                var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data:points,min:0,max:500});
                setGradient()
                function setGradient(){
                    var gradient = {0: 'rgb(49, 222, 94)',
                        0.5: 'rgb(239, 237, 71)',
                        1: 'rgb(238, 76, 76)'};
                    var colors = document.querySelectorAll("input[type='color']");
                    colors = [].slice.call(colors,0);
                    colors.forEach(function(ele){
                        gradient[ele.getAttribute("data-key")] = ele.value;
                    });
                    heatmapOverlay.setOptions({"gradient":gradient});
                }
            },

        },
        components:{
            ScrollContainer
        },
        async mounted(){
            await this.getHotArea()
            await this.getbaiduMap()
            await this.localeNum()
        },
        created(){
//            let that = this
//            setInterval(function(){
//                that.getPassenger()
//            },50000)
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
