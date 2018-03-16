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

<style >
    /*.scroll-container {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*position: relative;*/
        /*overflow: hidden;*/
        /*.scroll-inner {*/
            /*position: absolute;*/
            /*!*top: 0;*!*/
            /*!*bottom: 0;*!*/
            /*!*left: 0;*!*/
            /*!*right: 0;*!*/
            /*height: 100%;*/
            /*width: 100%;*/
            /*overflow: auto;*/
            /*padding-bottom: rem(20);*/
            /*&::-webkit-scrollbar {*/
                /*width: 0;*/
            /*}*/
        /*}*/
    /*}*/

</style>
