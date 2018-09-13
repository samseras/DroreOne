<template>
    <div class="allDotMapDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            :title="title"
            :before-close="closeInfoDialog"
            :fullscreen=true
            class="dialog map_Dialog"
            center>
            <div id="allDotMap" class="allDotMap">
            </div>
            <div class="allDotTree">
                <div class="allDotListTree">
                    <el-input
                        placeholder="名称"
                        v-model="filterText">
                    </el-input>
                    <ScrollContainer>
                        <el-tree
                            :data="lightInfo"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :expand-on-click-node="false"
                            :check-on-click-node="true"
                            ref="tree"
                            :filter-node-method="filterNode"
                            @check="handleCheckChange">
                        </el-tree>
                    </ScrollContainer>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import droreMap from "../../static/js/droreMap.js"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    export default {
        props: ['visible','title','Info'],
        name: "historyDialog",
        data() {
            return {
                filterText: '',
                lightInfo: [],
                removeList:'',
                coordinate:[],
                addOpenList:'',
                areaList:'',
            };
        },
        methods: {
            closeInfoDialog () {
                this.$emit('closeInfoDialog')
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            historyrequestGisMain() {
                document.getElementById('allDotMap').innerHTML = ""
                $.ajax({
                    type: "get",
                    url: "/static/xxsd_mapData.json",
                    async: false,
                    success: function(data) {
                        console.log(data);
                        var obj = data.data;
                        var mapdata = {
                            "olTileX": obj.olTileX,
                            "olTileY": obj.olTileY,
                            "centerX": obj.sceinitx,//120.07951802513782
                            "centerY": obj.sceinity,//30.267776483960148
                            "path": "http://img.weyoo.cn/map/map_sec_zhejiang0152/map{z}/{x},{y}.jpg",
                            "curZoom": obj.scefit + obj.initlevel,
                            "minZoom": obj.scefit,
                            "maxZoom": obj.scefit + obj.zoom - 1
                        }
                        droreMap.init(mapdata, data.data,'allDotMap');
                        let Circle = new droreMap.geom.Circle()
                        Circle.setCenter([0,0],0);
                        droreMap.object.getMap().getLayers().getArray()[1].setVisible(false)
                        var overView = new droreMap.control.OverviewMap({'url': '/static/img/jhdyh.png'});
                        droreMap.control.addControl(overView);
                        overView.setBoxColor("#f60")
                        overView.setRect('270px','150px')
                        droreMap.interaction.ifDrag = true;
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                this.open()
                this.close()
                this.getAllArea()
            },
            async getAllArea () {
                await api.area.getAllRegion().then(res => {
                    this.areaList = res
                    for (let i = 0; i < this.areaList.length; i++) {
                        var areaEvets =new droreMap.area.DrawLayer("areaList",'rgba(255, 255, 255, 0.2)',"blue")
                        let geo =JSON.parse(this.areaList[i].geo);
                        if(geo!=null){
                            let ol=geo[0];
                            let arrayObj = new Array();
                            for(var j = 0; j < ol.length; j++) {
                                let wgs=droreMap.trans.transFromWgsToLayer(ol[j])
                                arrayObj.push(wgs);
                            }
                            let area= new Array();
                            area.push(arrayObj);
                            var data = {"id": this.areaList[i].id, "name": this.areaList[i].name,"constructor":'areaList'}
                            areaEvets.addArea(area,data)
                            droreMap.area.addChild(areaEvets, this.areaList[i].id)
                        }
                    }
                }).catch(err => {
                    console.log(err, '失败')
                })
            },
            open(){
                let _this=this
                _this.Info.open.forEach(obj=>{
                    var icon = new droreMap.icon.Marker({
                        coordinate: droreMap.trans.transFromWgsToLayer([obj.longitude,obj.latitude]),
                        name:obj.iconName,
                        subtype:obj.iconSubtype,
                        id:obj.id,
                        url:obj.iconUrl,
                        type:obj.iconType,
                        data:obj,
                    });
                    droreMap.icon.addChild(icon);
                    icon.showName=true
                })
                droreMap.event.DragEvent(function(tabInfor) {
                    let icondata = tabInfor.data.data.data
                    let iconindex=droreMap.trans.transLayerToWgs(tabInfor.data.end)
                    _this.$emit('iconfixInfo',icondata,iconindex)
                })
            },

            close(){
                let regionIdList = []
                let arr = []
                let idList = []
                let noRegion = {
                    label: '未知片区设备',
                    id: '10010',
                    children:[]
                }
                this.Info.close.forEach(item => {
                    item.label = item.iconName
                    if (item.regionId) {
                        if (!regionIdList.includes(item.regionId)){
                            regionIdList.push(item.regionId)
                            let obj = {
                                label: item.regionName,
                                id: item.regionId,
                                children:[]
                            }
                            arr.push(obj)
                        }
                        arr.forEach(item1 => {
                            if (item1.id == item.regionId){
                                if (item1.children.length< 1) {
                                    item1.children.push(item)
                                } else {
                                    item1.children.forEach(item2 => {
                                        if (!idList.includes(item2.id)){
                                            idList.push(item.id)
                                            item1.children.push(item)
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        noRegion.children.push(item)
                    }
                })
                if (noRegion.children.length > 0) {
                    arr.push(noRegion)
                }
                this.lightInfo = arr
            },
            handleCheckChange(data,checked) {
                let _this=this
                // console.log(data, 'oooooooooooo')
                // console.log(checked, 'iiiiiiiiiiiiiiiiiiii')
                checked.checkedNodes = checked.checkedNodes.filter(item => {
                    if (!item.children) {
                        return item
                    }
                })
                data.checked = checked
                _this.addOpenList=data.checked.checkedNodes
                if(_this.addOpenList.length>=1){
                    // let length =this.addOpenList.length-1
                    let regionId=_this.addOpenList[0].regionId
                    _this.areaList.forEach(obj=>{
                        if(obj.id==regionId){
                            let geo =JSON.parse(obj.geo);
                            if(geo!=null){
                                let ol=geo[0][0];
                                droreMap.map.panToCoord(droreMap.trans.transFromWgsToLayer(ol));
                            }
                        }
                    })
                }
                _this.addOpen()
            },
            addOpen(){
                let _this=this
                droreMap.event.addMouseEvent("singleclick", "single", function(evt){
                    _this.coordinate=droreMap.trans.transLayerToWgs(evt.coordinate)
                    for (let i = 0; i < _this.addOpenList.length; i++) {
                        _this.addOpenList[i].longitude=_this.coordinate[0]-Math.random()*0.0001*i
                        _this.addOpenList[i].latitude=_this.coordinate[1]-Math.random()*0.0001*i
                        var icon = new droreMap.icon.Marker({
                            coordinate: droreMap.trans.transFromWgsToLayer([_this.addOpenList[i].longitude,_this.addOpenList[i].latitude]),
                            name:_this.addOpenList[i].iconName,
                            subtype:_this.addOpenList[i].iconSubtype,
                            id:_this.addOpenList[i].id,
                            url:_this.addOpenList[i].iconUrl,
                            type:_this.addOpenList[i].iconType,
                            data:_this.addOpenList[i],
                        });
                        droreMap.icon.addChild(icon);
                        icon.showName=true
                        _this.Info.close.splice(  _this.Info.close.indexOf( _this.addOpenList[i] ), 1 );
                    }
                    _this.$emit('iconListfixInfo',_this.addOpenList)
                    _this.addOpenList=[]
                    _this.close()
                })
            },
        },
        mounted() {
            setTimeout(()=>{
                this.historyrequestGisMain();//加载地图
            },300)
        },
        created () {
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        components : {
            ScrollContainer,
        },
        computed: {

        }
    }
</script>

<style lang="scss" >
    .allDotMapDialog{
        position: relative;
        .el-dialog__wrapper{
        }
        .el-dialog.is-fullscreen{
            overflow: hidden;
        }
        .el-dialog{
            position: relative;
            margin: 0;
            overflow: hidden;
            .el-dialog__header{
                position: relative;
                /*left: 0;*/
                /*top:0;*/
                /*width: 100%;*/
                /*background: #fff;*/
                z-index: 3;
            }
            .el-dialog__body {
                padding: 0;
                .map_Dialog{
                    .el-tree-node__content{
                        background-color: rgba(0,0,0, 0.3)!important;
                    }
                    .el-input__inner{
                        background:none;
                    }
                    .el-tree__empty-text{
                        color: #fff;
                    }
                }
            }
        }
        .ol-rotate{
            display: none;
        }
        .ol-attribution{
            display: none;
        }
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
            bottom:3.5em
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
            height:144px;
            margin:2px;
            background: #000;
            width:264px
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
    }
</style>
<style lang="scss" scoped type="text/scss">
    .allDotMapDialog {
        .map_Dialog{
            .allDotMap{
                background: #000;
            }
            .allDotTree{
                position: absolute;
                right:0;
                top:0;
                z-index: 1;
                width: 260px;
                padding-top:54px;
                height: 100%;
                box-sizing: border-box;
                /*border-top:1px solid #ccc;*/
                .allDotListTree{
                    background-color: rgba(0,0,0, 0.3);
                    height: 100%;
                    padding:10px;
                    box-sizing: border-box;
                    .el-input{
                        .el-input__inner{
                            height: 30px;
                            line-height: 30px;
                        }
                    }
                    .el-tree{
                        background: rgba(0,0,0, 0);
                        color: #fff;
                        margin-bottom: 30px;
                    }
                }
            }
        }
    }
</style>
