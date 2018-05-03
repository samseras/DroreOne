<template>
    <div class="monitorType" >
        <ScrollContainer>
            <el-table
                :data=monitorType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="传感器型号">
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
                monitorType:[]
            }
        },
        methods:{
            async getMonitorType(){
                await api.monitor.getMonitorType().then((res) =>{
                    this.monitorType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getMonitorType()
        },
        components:{
            ScrollContainer

        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .monitorType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
