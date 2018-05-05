<template>
    <div class="controler">
        <div class="map">
            <labelLibrary></labelLibrary>
       </div>
    </div>
</template>

<script>

    import labelLibrary from '@/components/gis/labelManage/labelLibrary'


    export default {
        data() {
            return {
            }
        },
        components: {
            labelLibrary
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .controler{
        width: 100%;
        height: 100%;
        display: flex;
        .map{
            flex: 1;
            height: 100%;

        }
    }

</style>
