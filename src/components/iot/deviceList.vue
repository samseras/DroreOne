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
                            <el-input v-model="formInline.user" placeholder="请输入..."></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i></el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="page">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        background
                        layout="prev, pager, next"
                        :total="100">
                    </el-pagination>
                </div>
            </div>
        </header>

        <div v-if="" class="card-list">
            <DeviceCard></DeviceCard>
        </div>
    </div>
</template>

<script>
    import DeviceCard from './deviceCard'
    export default {
        name: "devicelist",
        data(){
            return{
                currentPage:1,
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{

            init(){
                var category=this.$route.params.category;
                console.log(category)
            },
            onSubmit() {
                console.log('submit!');
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
        margin:1rem;
        border-radius:0.5rem;
        header{
            background-color:#fff;
            .title{
                text-align:left;
                height:1rem;
                border-bottom:1px solid #eee;
                padding:1rem;

            }
            .sub-title{
                height: 3rem;
                border: 1px solid transparent;
                padding-bottom:0.5rem;
                .search{
                    width: 30%;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    border: 1px solid transparent;
                    margin: 1rem;
                    display:inline-block;
                    margin-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    .el-button--primary {
                        background-color: #fff;
                        border-color: #dcdfe6;
                        color: #bbb;
                    }
                }
                .page{
                    float:right;
                    width:33%;
                    height:1rem;
                    border:1px solid transparent;
                    margin-top: 1rem;
                }
            }
        }
        .mydiv{

        }
    }
</style>
