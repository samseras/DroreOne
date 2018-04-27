<template>
    <div class="gpsType" >
        <ScrollContainer>
            <el-table
                :data=gpsType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="GPS型号">
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
                gpsType:[]
            }
        },
        methods:{
            async getGpsType(){
                await api.gps.getGpsType().then((res) =>{
                    this.gpsType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getGpsType()
        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .gpsType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
