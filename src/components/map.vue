<template>
    <Scrollcontainer>
        <div id="map">

        </div>
    </Scrollcontainer>
</template>

<script>
    import dataId from "../../static/xxsd_map.json"
    import droreMap from "../../static/js/droreMap.js"
    import mapLabe from "../../static/js/mapLabelInformationChildrenForm.js"
    import masterDataGrid1 from "../../static/js/masterDataGrid1.js"
    import Scrollcontainer from '@/components/ScrollContainer'

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
        },
        methods:{
            droreMapinit () {//循环输出点
                for (var i = 0; i < 100; i++) {
                    var icon = new droreMap.icon.Marker({
                        coordinate: droreMap.transFromWgsToLayer([120.05059811468163 + i / 1000, 30.278014328229347 + i / 1000]),
                        name: "asdas" + i,
                        subtype: "098lk-",
                        id: "12214_" + i,
                        url: "http://oss.drore.com/material/gis/newlabels/public/defaults/24*24/shuibeng.png"
                    });
                    droreMap.icon.addChild(icon);
                    icon.onclick(function (e) {
                    });
                }
            },
            labelDot(){//打点标注
                droreMap.addMouseEvent(Event.SINGLECLICK_EVENT, "single", function(evt){
                    console.log(evt)
                    var icon = new droreMap.icon.Marker({
                        coordinate:evt.coordinate ,
                        name: "asdas",
                        subtype: "098lk-",
                        id: "12214_",
                        url: "http://oss.drore.com/material/gis/newlabels/public/defaults/24*24/shuibeng.png",
                        scale:1
                    });
                    console.log(droreMap.transLayerToWgs(evt.coordinate))
                    droreMap.icon.addChild(icon);
                    icon.onclick(function(e) {
                        console.log(e)
                    });
                })
                droreMap.ifDrag = true;
                droreMap.DragEvent(function(tabInfor) {
                    var data = tabInfor.data
                    console.log(droreMap.transLayerToWgs(data.end));
                })
                // var areaEvet =new droreMap.area.DrawLayer("area",'rgba(255, 255, 255, 0.2)',"red")
                // areaEvet.ifDraw = true;
            },
            district(){//区域划分
                var areaEvet =new droreMap.area.DrawLayer("area",'rgba(255, 255, 255, 0.2)',"red")
                areaEvet.ifDraw = true;
                areaEvet.addEventListener('drawend', "drawend", function (m,t) {
                    areaEvet.ifDraw = false;
                    console.log(t)
                    let ol=t[0];
                    var arrayObj = new Array();
                    for(var i = 0; i < ol.length; i++) {
                        let wgs=droreMap.transLayerToWgs(ol[i])
                        arrayObj.push(wgs);
                    }
                    console.log(arrayObj)
                })
            },
        },
        components: {
            Scrollcontainer
        }
    }
</script>
<style >
    .ol-overlaycontainer-stopevent{
        position: fixed;
        top: 100px;
        left: 30px;
    }
    .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-in{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        opacity: .8;
        transform: scale(1.5);
    }
    .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-out{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        opacity: .8;
        margin-top: 15px;
        transform:scale(1.5);
    }
    .ol-rotate{
        display: none;
    }
    .ol-attribution{
        display: none;
    }
</style>
<style lang="scss" scoped>
    #map{
        width: 100%;
        height: 100%;
    }
</style>
