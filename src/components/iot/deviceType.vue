<template>
    <div class="device-type" >

        <template>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="col in cols"
                    :prop="col.prop" :label="col.label" >
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    import api from '@/api'
    export default {

        name: "devicetype",
        data(){
            return{
                route:1,
                tableData:[],
                cols:[],
                tableData1: [
                    /*{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }*/
                ],
                cols1: [
                   /* {prop: 'date', label: '日期'},
                    {prop: 'name', label: '姓名'},
                    {prop: 'address', label: '住址'}*/
                ]
            }
        },
        methods:{
            getDeviceTypeInfo(route){
                api.iotHome.getDeviceTypeInfo(route).then(res=>{
                    console.log(res,'这是传回来的设备类型信息')
                    this.cols=res.cols;
                    this.tableData=res.tableDatas;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            }
        },
        components:{

        },
        watch:{
            '$route'(){
                //this.route = this.$route.path
                this.route=parseInt(this.$route.params.category);
                console.log(this.route);
                this.getDeviceTypeInfo(this.route);
            }
        },
        beforeRouterEnter:(to,from,next)=>{
            console.log(to);
            console.log(from);
            next();
        },
        created(){

            this.tableData=this.tableData1;
            this.cols=this.cols1;
            this.route=this.$route.params.category;
            this.getDeviceTypeInfo(this.route);


        }
    }
</script>

<style  lang="scss" type="text/scss">
    .device-type{
        margin:rem(16);
        border:1px solid red;
    }
</style>
