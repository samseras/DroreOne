<template>
    <div class="device-type" >
        <div class="title">
           <h2>设备型号11</h2>
        </div>
        <template>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="col in cols"
                    :prop="col.prop" :label="col.label" >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleTableEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <IotDialog
            v-if="showDialog"
            :showDialog="showDialog"
            :cols="cols"
            :editData="editData"
            @saveEvent="saveDialog"
            @cancelEvent="cancelDialog">
        </IotDialog>


    </div>
</template>

<script>
    import api from '@/api'
    import IotDialog from './iotDialog'
    export default {

        name: "devicetype",
        data(){
            return{
                showDialog:false,
                editData:{},
                route:1,
                tableData:[],
                cols:[],
                tableData1: [],
                cols1: []
            }
        },
        methods:{
            saveDialog(val){
                console.log(val);
                this.showDialog=false;
                //再刷新一次数据列表
                /*api.iotHome.editDeviceTypeInfo(val).then(res=>{
                    console.log(res,'这是编辑后传回来的设备类型信息')
                    this.cols=res.cols;
                    this.tableData=res.tableDatas;
                }).catch(err=>{
                    console.log(err,'失败')
                })*/
            },
            cancelDialog(val){
                console.log(val);
                this.showDialog=false;
            },
            handleTableEdit(row){

              this.editData=row;
              console.log(this.editData);
              this.showDialog=true;
            },
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
            IotDialog
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
        border:1px solid transparent;
        .title{
            background-color: #fff;
            border-bottom: 1px solid #eee;
            h2{
                color: #000;
                font-weight: 600;
                padding: rem(16) rem(9.6);
            }
        }
    }
</style>
