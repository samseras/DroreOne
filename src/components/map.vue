<template>
    <Scrollcontainer>
        <div id="map">

        </div>
    </Scrollcontainer>
</template>

<script>
    import dataId from "../../static/xxsd_map.json"
    import Map from "../../static/js/droreMap.js"
    import mapLabe from "../../static/js/mapLabelInformationChildrenForm.js"
    import masterDataGrid1 from "../../static/js/masterDataGrid1.js"
    import Scrollcontainer from '@/components/ScrollContainer'

    export default {
        name: "map",
        data () {
            return {

            }
        },
        created () {
            Map.unShowAllLayer()
        },
        mounted() {
            Map.init();
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
