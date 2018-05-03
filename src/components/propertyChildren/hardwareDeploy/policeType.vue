<template>
    <div class="policeType" >
        <ScrollContainer>
            <el-table
                :data=policeType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="报警柱型号">
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
                policeType:[]
            }
        },
        methods:{
            async getPoliceType(){
                await api.police.getPoliceType().then((res) =>{
                    this.policeType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getPoliceType()
        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .policeType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
