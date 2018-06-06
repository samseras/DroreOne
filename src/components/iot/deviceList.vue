<template>
    <div class="device-list">
        <header>
            <div class="title">
                设备列表
            </div>
            <div class="sub-title clearfix">
                <div class="search">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="">
                            <el-input v-model="formInline.user" placeholder="请输入..." ></el-input>
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
                        layout="prev, pager, next"
                        :total="100">
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
                allData:[],
                route:1,
                currentPage:1,
                curPage:1,
                searchInfo:'',
                formInline: {
                    user: '',
                    region: ''
                }
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
                api.iotHome.getDeviceListInfo(route).then(res=>{
                    console.log(res,'这是传回来的设备列表信息');
                    this.allData=res;

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
                console.log('submit!');
                this.searchInfo=this.formInline.user;
            },
            handleSizeChange(val){
                this.pageSize=val;
                console.log(`每页条数：${val}`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.curPage=val;
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
        border:1px solid red;
        margin:rem(16);
        border-radius:rem(8);
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
                    width:33%;
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
