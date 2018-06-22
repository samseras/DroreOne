<template>
    <div class="device-list">
        <header>
            <div class="title">
                设备列表
            </div>
            <div class="sub-title clearfix">
                <div class="search">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="">
                            <el-input v-model="formInline" placeholder="状态OFFLINE/WORKING" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i></el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        background
                        :page-sizes="[20,50, 100, 300, 400]"
                        :page-size="20"
                        layout="total, prev, pager, next, jumper"
                        :total="allNum">
                    </el-pagination>
                </div>
            </div>
        </header>
        <div v-if="" class="card-list">
            <DeviceCard :curPage="curPage" :searchInfo="searchInfo" :allData="allData"></DeviceCard>
        </div>

    </div>
</template>

<script>
    import DeviceCard from './deviceCard'
    import {mapMutations} from 'vuex'
    import api from '@/api'
    export default {
        name: "devicelist",
        data(){
            return{
                allNum:0,
                allData:[],
                tempData:[],//缓存原始数据
                route:1,
                currentPage:1,
                curPage:1,
                pageSize:20,
                searchInfo:'',
                formInline:''
            }
        },
        watch:{
            '$route'(){
                this.route=parseInt(this.$route.params.category);
                console.log(this.route);
                this.getDeviceListInfo(this.route);
            }
        },
        methods:{

            getDeviceListInfo(route){
                this.pageSize=20;
                api.iotHome.getDeviceListInfo(route,this.curPage,this.pageSize).then(res=>{
                    console.log(res,'这是传回来的设备列表信息');
                    this.allNum=res.pageCondition.allcount;
                    this.allData=res.pageData.tableDatas;
                    this.tempData=res.pageData.tableDatas;

                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            init(){
                this.route=this.$route.params.category;
                console.log(this.route);
                this.getDeviceListInfo(this.route);
            },
            onSubmit() {
                console.log(this.formInline);


                    if (this.formInline !== '') {
                        this.allData = this.allData.filter(item => {
                            if (item.status.includes(this.formInline)) {
                                return item
                            }
                        })
                    } else {

                        this.allData=this.tempData;
                    }


            },
            handleSizeChange(val){
                this.pageSize=val;
                console.log(`每页条数：${val}`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.curPage=val;
                //后端分页
                console.log(this.route,this.curPage,this.pageSize);
                api.iotHome.getDeviceListInfo(this.route,this.curPage,this.pageSize).then(res=>{
                    console.log(res,'这是传回来的设备列表信息');
                    for(var i=0;i<res.pageData.tableDatas.length;i++){
                        console.log((res.pageData.tableDatas)[i].kind);
                    };
                    this.allNum=res.pageCondition.allcount;
                    this.allData=res.pageData.tableDatas;

                }).catch(err=>{
                    console.log(err,'失败')
                })
                //this.$store.commit('CURPAGE', val)
            },
            ...mapMutations(['CURPAGE'])
        },
        components:{
            DeviceCard
        },
        created(){
            this.init();
        }
    }
</script>

<style lang="scss" type="text/scss">
    .device-list{
        border:1px solid transparent;
        margin:rem(16);
        border-radius:rem(8);
        .el-button--primary{
            background-color:#14B9D6;
            border-color:#14B9D6;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
            background-color: #14B9D6;
        }
        /*.card-list{
            height:500px;
            overflow:auto;
        }*/
        header{
            background-color:#fff;
            .title{
                text-align:left;
                height:rem(16);
                border-bottom:1px solid #eee;
                padding:rem(16);

            }
            .sub-title{
                height: rem(48);
                border: 1px solid transparent;
                padding-bottom:rem(8);
                .search{
                    width: 30%;
                    height: rem(24);
                    line-height: rem(24);
                    border: 1px solid transparent;
                    margin: rem(16);
                    display:inline-block;
                    margin-top: rem(8);
                    padding-bottom: rem(8);
                    /*.el-button--primary {
                        background-color: #fff;
                        border-color: #dcdfe6;
                        color: #bbb;
                    }*/
                }
                .page{
                    float:right;
                    max-width:58%;
                    height:rem(16);
                    border:1px solid transparent;
                    margin-top: rem(16);
                }
            }
        }
        .mydiv{

        }
    }
</style>
