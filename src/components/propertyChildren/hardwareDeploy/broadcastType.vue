<template>
    <div class="broadcastType" >
        <ScrollContainer>
            <el-table
                :data=broadcastType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="广播型号">
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


    export default{
        data(){
            return {
                visible:false,
                title:'',
                broadcastType:[

                ]
            }
        },
        methods:{
            async getBroadcastType(){

                await api.broadcast.getBroadcastType().then((res) =>{
                    console.log(res,'这是请求的类型')
                    this.broadcastType=res

                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getBroadcastType()
        },
        components:{
            ScrollContainer

        }
    }

</script>

<style lang="scss" type="text/scss" scoped>
    .broadcastType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }


</style>
