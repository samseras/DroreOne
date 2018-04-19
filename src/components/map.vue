<template>
    <Scrollcontainer>
        <div id="map">

        </div>
    </Scrollcontainer>
</template>

<script>
    import dataId from "../../static/xxsd_map.json"
    import droreMap from "../../static/js/droreMap.js"
    import Event from "../../static/js/static.js"
    import mapLabe from "../../static/js/mapLabelInformationChildrenForm.js"
    import masterDataGrid1 from "../../static/js/masterDataGrid1.js"
    import Scrollcontainer from '@/components/ScrollContainer'
    import { mapMutations } from 'vuex'

    export default {
        name: "map1",
        data () {
            return {
            }
        },
        created () {
            droreMap.unShowAllLayer()
        },
        mounted() {
            droreMap.init();
            this.droreMapinit();
            this.labelDot();
            this.districtList();
            // this.district();
            this.roadList();
            // this.road();
        },
        methods:{
            ...mapMutations(['MAP_LOCATION']),
            droreMapinit () {//循环输出点
                for (var i = 0; i < 15; i++) {
                    var icon = new droreMap.icon.Marker({
                        coordinate: droreMap.transFromWgsToLayer([120.06672090248588 + i / 1000, 30.281761130844714 + i / 1000]),
                        name: "asdas" + i,
                        subtype: "098lk-",
                        id: "12214_" + i,
                        url: "/static/img/location.png"
                    });
                    droreMap.icon.addChild(icon);
                    icon.onclick(function (e) {
                        alert(e.coordinate);
                    });
                }
            },
            labelDot(){//打点标注
                let that = this
                var icon = new droreMap.icon.Marker({
                    coordinate: [0,0],
                    name:  new Date().getTime(),
                    subtype: "098lk-",
                    id: "12214_",
                    url: "/static/img/location.png",
                });
                droreMap.icon.addChild(icon);
                droreMap.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                    icon.setPosition(evt.coordinate)
                    console.log(evt.coordinate)
                    // icon.onclick(function(e) {
                    //     console.log(e)
                    // });
                    that.$store.commit('MAP_LOCATION', droreMap.transLayerToWgs(evt.coordinate))
                    droreMap.ifDrag = true;
                    droreMap.DragEvent(function(tabInfor) {
                        var data = tabInfor.data
                        if(data.data.id === '12214_'){
                            console.log(droreMap.transLayerToWgs(data.end));
                            that.$store.commit('MAP_LOCATION', droreMap.transLayerToWgs(data.end))
                        }
                    })
                })
            },
            districtList(){//区域划分列表
                var areaEvets =new droreMap.area.DrawLayer("area",'rgba(255, 255, 255, 0.2)',"red")
                var area = [[[13367097.46117307, 3538046.3202072824],[13367065.280655375, 3537992.907176161],[13367162.817494417, 3537967.030051136],[13367217.225797825, 3538042.007350074],[13367174.097243965, 3538076.510178126],[13367174.0972439651,3538076.510178126],[13367097.46117307, 3538046.3202072824]]]
                var data = {"areaLat":"[]","areaMercator":"[]","areaPixel":"[]","createTime":1495877197377,"id":"207","level":"1","mapId":"cd049e70a6cc4961809343c88c11938d","modifiedTime":1495877197377,"name":"方门驿站","type":"DECK_DEMO"}
                areaEvets.addArea(area,data)
                areaEvets.setVisible(true)
                droreMap.area.addChild(areaEvets)
            },
            district(){//区域划分
                var areaEvet =new droreMap.area.DrawLayer("area",'rgba(255, 255, 255, 0.2)',"red")
                areaEvet.ifDraw = true;
                areaEvet.ifModify = true;
                areaEvet.ifSelect = false;
                areaEvet.addEventListener(Event.DRAW_EVENT, "drawend", function (m,t) {
                    areaEvet.ifDraw = false;
                    areaEvet.ifSelect = true;
                    console.log(t)
                    let ol=t[0];
                    let arrayObj = new Array();
                    for(var i = 0; i < ol.length; i++) {
                        let wgs=droreMap.transLayerToWgs(ol[i])
                        arrayObj.push(wgs);
                    }
                    let arrayObjList= new Array();
                    arrayObjList.push(arrayObj);
                    console.log(arrayObjList)
                    areaEvet.setVisible(true)
                    droreMap.area.addChild(areaEvet)
                })
                areaEvet.addEventListener(Event.SELECT_EVENT, "select", function(e) {
                    if(e.select){
                        console.log(e.select.area);
                    }else if(e.unSelect){
                        console.log(e.unSelect.area);
                    }
                })
            },
            roadList(){//路线列表
                var areaEvts =new droreMap.road.RoadLayer('ROUTE_DEMO', 'blue')
                var area = [[13367132.627512183, 3538049.969542039],[13367267.984780146, 3537979.6368547007],[13367264.667172445, 3538053.287122404],[13367106.086887486, 3537987.5990512217],[13367205.614280216, 3537977.6463101264]]
                var data = {"areaLat":"[]","areaMercator":"[]","areaPixel":"[]","createTime":1495877197377,"id":"207","level":"1","mapId":"cd049e70a6cc4961809343c88c11938d","modifiedTime":1495877197377,"name":"方门驿站","type":"DECK_DEMO"}
                areaEvts.addRoad(area,data)
                droreMap.road.addRoadLayer(areaEvts)
            },
            road(){//路网绘画
                var areaEvt = new droreMap.road.RoadLayer('ROUTE_DEMO', '#fb9000')
                areaEvt.ifDraw = true;
                areaEvt.ifModify = false;
                areaEvt.addEventListener(Event.DRAW_EVENT, "drawend", function(m, t) {
                    areaEvt.ifDraw = false;
                    areaEvt.ifSelect = true;
                    areaEvt.ifModify = true;
                    console.log(t);
                    var len = t.length - 1
                    if(t[0][0] == t[len][0] && t[0][1] == t[len][1]) {
                        layer.msg('路网不能绘制成圆环')
                    } else {
                        let arrayObj = new Array();
                        for (var i = 0; i < t.length; i++) {
                            let wgs = droreMap.transLayerToWgs(t[i])
                            arrayObj.push(wgs);
                        }
                        console.log(arrayObj);
                        droreMap.road.addRoadLayer(areaEvt)
                    }
                })
                areaEvt.addEventListener(Event.SELECT_EVENT, "select", function(e) {
                    if(e.select){
                        console.log(e.select.area);
                    }else if(e.unSelect){
                        console.log(e.unSelect.area);
                    }
                })
            },
        },
        components: {
            Scrollcontainer
        }
    }
</script>
<style >
    .ol-control,.ol-scale-line {
        position:absolute;
        padding:2px
    }
    .ol-box {
        box-sizing:border-box;
        border-radius:2px;
        border:2px solid #00f
    }
    .ol-mouse-position {
        top:8px;
        right:8px;
        position:absolute
    }
    .ol-scale-line {
        background:rgba(0,60,136,.3);
        border-radius:4px;
        bottom:8px;
        left:8px
    }
    .ol-scale-line-inner {
        border:1px solid #eee;
        border-top:none;
        color:#eee;
        font-size:10px;
        text-align:center;
        margin:1px;
        will-change:contents,width
    }
    .ol-overlay-container {
        will-change:left,right,top,bottom
    }
    .ol-unsupported {
        display:none
    }
    .ol-viewport .ol-unselectable {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        -webkit-tap-highlight-color:transparent
    }
    .ol-control {
        background-color:rgba(255,255,255,.4);
        border-radius:4px
    }
    .ol-control:hover {
        background-color:rgba(255,255,255,.6)
    }
    .ol-zoom {
        top:.5em;
        left:.5em
    }
    .ol-rotate {
        top:.5em;
        right:.5em;
        transition:opacity .25s linear,visibility 0s linear
    }
    .ol-rotate.ol-hidden {
        opacity:0;
        visibility:hidden;
        transition:opacity .25s linear,visibility 0s linear .25s
    }
    .ol-zoom-extent {
        top:4.643em;
        left:.5em
    }
    .ol-full-screen {
        right:.5em;
        top:.5em
    }
    @media print {
        .ol-control {
            display:none
        }
    }.ol-control button {
         display:block;
         margin:1px;
         padding:0;
         color:#fff;
         font-size:1.14em;
         font-weight:700;
         text-decoration:none;
         text-align:center;
         height:1.375em;
         width:1.375em;
         line-height:.4em;
         background-color:rgba(0,60,136,.5);
         border:none;
         border-radius:2px
     }
    .ol-control button::-moz-focus-inner {
        border:none;
        padding:0
    }
    .ol-zoom-extent button {
        line-height:1.4em
    }
    .ol-compass {
        display:block;
        font-weight:400;
        font-size:1.2em;
        will-change:transform
    }
    .ol-touch .ol-control button {
        font-size:1.5em
    }
    .ol-touch .ol-zoom-extent {
        top:5.5em
    }
    .ol-control button:focus,.ol-control button:hover {
        text-decoration:none;
        background-color:rgba(0,60,136,.7)
    }
    .ol-zoom .ol-zoom-in {
        border-radius:2px 2px 0 0
    }
    .ol-zoom .ol-zoom-out {
        border-radius:0 0 2px 2px
    }
    .ol-attribution {
        text-align:right;
        bottom:.5em;
        right:.5em;
        max-width:calc(100% - 1.3em)
    }
    .ol-attribution ul {
        margin:0;
        padding:0 .5em;
        font-size:.7rem;
        line-height:1.375em;
        color:#000;
        text-shadow:0 0 2px #fff
    }
    .ol-attribution li {
        display:inline;
        list-style:none;
        line-height:inherit
    }
    .ol-attribution li:not(:last-child):after {
        content:" "
    }
    .ol-attribution img {
        max-height:2em;
        max-width:inherit;
        vertical-align:middle
    }
    .ol-attribution button,.ol-attribution ul {
        display:inline-block
    }
    .ol-attribution.ol-collapsed ul {
        display:none
    }
    .ol-attribution.ol-logo-only ul {
        display:block
    }
    .ol-attribution:not(.ol-collapsed) {
        background:rgba(255,255,255,.8)
    }
    .ol-attribution.ol-uncollapsible {
        bottom:0;
        right:0;
        border-radius:4px 0 0;
        height:1.1em;
        line-height:1em
    }
    .ol-attribution.ol-logo-only {
        background:0 0;
        bottom:.4em;
        height:1.1em;
        line-height:1em
    }
    .ol-attribution.ol-uncollapsible img {
        margin-top:-.2em;
        max-height:1.6em
    }
    .ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button {
        display:none
    }
    .ol-zoomslider {
        top:4.5em;
        left:.5em;
        height:200px
    }
    .ol-zoomslider button {
        position:relative;
        height:10px
    }
    .ol-touch .ol-zoomslider {
        top:5.5em
    }
    .ol-overviewmap {
        left:.5em;
        bottom:.5em
    }
    .ol-overviewmap.ol-uncollapsible {
        bottom:0;
        left:0;
        border-radius:0 4px 0 0
    }
    .ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button {
        display:inline-block
    }
    .ol-overviewmap .ol-overviewmap-map {
        border:1px solid #7b98bc;
        height:150px;
        margin:2px;
        width:150px
    }
    .ol-overviewmap:not(.ol-collapsed) button {
        bottom:1px;
        left:2px;
        position:absolute
    }
    .ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button {
        display:none
    }
    .ol-overviewmap:not(.ol-collapsed) {
        background:rgba(255,255,255,.8)
    }
    .ol-overviewmap-box {
        border:2px dotted rgba(0,60,136,.7)
    }

</style>
<style lang="scss" scoped>
    #map{
        width: 100%;
        height: 100%;
    }
</style>
