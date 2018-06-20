<template>
    <div class="scroll-container">
        <div class="scroll-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" type="text/scss">
    .scroll-container {
        width: 100%;
        height: 100%;
        /*position: relative;*/
        overflow: hidden;
        .scroll-inner {
            /*position: absolute;*/
            /*top: 0;*/
            /*bottom: 0;*/
            /*left: 0;*/
            /*right: 0;*/
            height: 100%;
            width: 100%;
            overflow: auto;
            -ms-scroll-chaining: chained;
            -ms-overflow-style: none;
            -ms-content-zooming: zoom;
            -ms-scroll-rails: none;
            -ms-content-zoom-limit-min: 100%;
            -ms-content-zoom-limit-max: 500%;
            -ms-scroll-snap-type: proximity;
            -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
            -ms-overflow-style: none;
            /*padding-bottom: rem(20);*/
            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }

</style>
