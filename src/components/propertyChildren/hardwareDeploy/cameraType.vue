<template>
    <div class="cameraType" >
        <ScrollContainer>
            <el-table
                :data=cameraType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="摄像头型号">
                </el-table-column>

                <el-table-column
                    prop="manufacturer"
                    label="厂家">
                </el-table-column>

                <el-table-column
                    prop="description"
                    label="描述">
                </el-table-column>


            </el-table>
        </ScrollContainer>

    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    //    import HardWare from './hardwareDialog.vue'
    import api from '@/api'

    export default {
        data(){
            return {
                cameraType:[]
            }
        },
        methods:{
            async getCameraType(){
                await api.camera.getCameraType().then((res) =>{
                    this.cameraType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getCameraType()
        },
        components:{
            ScrollContainer

        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .cameraType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
