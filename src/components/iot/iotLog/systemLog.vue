<template>
    <div class="system-log">

        <header>
            <div class="title">
                日志列表
            </div>
            <div class="sub-title clearfix">
                <div class="search">
                    <div class="block">
                        <div class="block">
                            <el-date-picker
                                @change="timeSelect"
                                value-format="yyyy-MM-dd hh:mm:ss"
                                :picker-options="pickerOptions"
                                v-model="valueTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        background
                        :page-sizes="[20,50, 100, 300, 400]"
                        :page-size=pageSize
                        layout="total, prev, pager, next, jumper"
                        :total="allNum">
                    </el-pagination>
                </div>
            </div>
        </header>

        <div class="main">
            <template>
                <el-table
                    :data="tableData"
                    height="719"
                    style="width: 100%">
                    <el-table-column
                        show-overflow-tooltip
                        prop="id"
                        label="ID" >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="name"
                        label="姓名" >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="user"
                        label="用户" >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="location"
                        label="位置" >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="detail"
                        label="描述" >
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="action"
                        label="执行动作" >
                    </el-table-column>




                    <!--<el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleTableEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>-->
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    export default {
        name: "system-log",
        data(){
            return{
                cols:[],
                tableData:[],
                allNum:100,
                pageSize:40,
                currentPage:1,
                valueTime:'',
                startItem:0,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        created(){

            function getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            }
            let initialTime=getNowFormatDate();
            console.log(initialTime);
            function getWeekAgoDate(){
                var now = new Date();
                var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                };
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                var weekAgo=year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + second;
                return weekAgo
            }
            let weekAgoTime=getWeekAgoDate();
            console.log(weekAgoTime);
            this.valueTime=[weekAgoTime,initialTime];
            api.iotHome.getSystemLogInfo(this.valueTime[0],this.valueTime[1],this.startItem,this.pageSize).then(res=>{
                console.log(res,'传回的系统日志信息');
                this.allNum=res.pagination.itemsTotal;
               /* this.alermCols=res.pageData.cols;*/
                this.tableData=res.logs;
            }).catch(err=>{
                console.log(err,'失败')
            })
        },
        components:{

        },
        methods:{
            timeSelect(){
                console.log(this.valueTime);
                api.iotHome.getSystemLogInfo(this.valueTime[0],this.valueTime[1],this.startItem,this.pageSize).then(res=>{
                    console.log(res,'传回的系统日志信息');
                    this.allNum=res.pagination.itemsTotal;
                    /* this.alermCols=res.pageData.cols;*/
                    this.tableData=res.logs;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            handleSizeChange(val){
              console.log(val);
            },
            handleCurrentChange(val){
                console.log(val);
                this.startItem=val*this.pageSize;
                api.iotHome.getSystemLogInfo(this.valueTime[0],this.valueTime[1],this.startItem,this.pageSize).then(res=>{
                    console.log(res,'传回的系统日志信息');
                    this.allNum=res.pagination.itemsTotal;
                    /* this.alermCols=res.pageData.cols;*/
                    this.tableData=res.logs;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
        }
    }
</script>

<style lang="scss" type="text/scss">
    .system-log{
        border:1px solid transparent;
        margin:rem(16);
        header{
            background-color:#fff;
            .title{
                text-align:left;
                height:rem(16);
                border-bottom:1px solid #transparent;
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


        .main{
            border:1px solid #eee;
            margin-top:rem(16);
            height:rem(720);
        }
    }
</style>

