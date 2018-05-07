<template>
    <div class="mapManage">
        <div class="map">
            <mapData></mapData>
       </div>
    </div>
</template>

<script>

    import mapData from '@/components/gis/mapManage/mapData'


    export default {
        data() {
            return {
            }
        },
        components: {
            mapData
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .mapManage{
        width: 100%;
        height: 100%;
        display: flex;
        .map{
            flex: 1;
            height: 100%;

        }
    }

</style>
