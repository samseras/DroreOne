<template>
    <div class="iot-home">
        <div class="basic-show">
            hello,首页
        </div>
        <div class="echarts-show"></div>
        <div class="data-flow"></div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "iotHome",
        data(){
            return{

            }
        },
        methods:{
            getAllArea () {   //TODO hello
               /* api.iotHome.getAllPlant().then(res => {
                    console.log(res, '这是请求回来的植物信息')
                }).catch(err => {
                    console.log(err, '失败')
                })*/
            }
        },
        created () {
            this.getAllArea()
        },
        components: {

        }
    }
</script>

<style lang="scss" type="text/scss" >
    .iot-home{
        margin:1rem;
        .basic-show{
            border:1px solid red;
            width:100%;
            height:100px;
        }
    }
</style>
