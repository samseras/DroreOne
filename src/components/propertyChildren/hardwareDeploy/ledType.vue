<template>
    <div class="ledType" >
        <ScrollContainer>
            <el-table
                :data=ledType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="LED型号">
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
                ledType:[]
            }
        },
        methods:{
            async getLedType(){
                await api.led.getLedType().then((res) =>{
                    this.ledType=res
                }).catch((err) =>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getLedType()
        },
        components:{
            ScrollContainer

        }

    }

</script>

<style lang="scss" type="text/scss" scoped>
    .ledType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }

</style>
