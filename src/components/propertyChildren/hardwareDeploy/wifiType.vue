<template>
    <div class="wifiType" >
        <ScrollContainer>
            <el-table
                :data=wifiType
                style="width:100%">
                <el-table-column
                    prop="name"
                    label="WIFI型号">
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
                wifiType:[

                ]
            }
        },
        methods:{
            async getWifiType(){

                await api.wifi.getWifiType().then((res) =>{
                    console.log(res,'这是请求的类型')
                    this.wifiType=res

                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getWifiType()
        },
        components:{
            ScrollContainer

        }
    }

</script>

<style lang="scss" type="text/scss" scoped>
    .wifiType{
        width:100%;
        padding:0 rem(15);
        box-sizing: border-box;
    }


</style>
