<template>
    <div class="lightType" >
        <ScrollContainer>
            <el-table
                :data=lightType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="路灯型号">
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
                lightType:[]
            }
        },
        methods:{
            async getLightType(){
                await api.light.getLightType().then((res) =>{
                    this.lightType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getLightType()
        },
        components:{
            ScrollContainer

        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .lightType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
