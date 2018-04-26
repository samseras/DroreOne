<template>
    <div class="gateType" >
        <ScrollContainer>
            <el-table
                :data=gateType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="闸机型号">
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
                gateType:[]
            }
        },
        methods:{
            async getGateType(){
                await api.gate.getGateType().then((res) =>{
                    this.gateType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getGateType()
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
