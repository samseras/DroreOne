<template>
    <div class="iot-home">
        <header>
            <div class="title">
                首页
            </div>

        </header>
        <div class="main">
            <el-row :gutter="16" class="data">
                <el-col :span="4" v-for="(item,index) in area" class="mycol">
                    <el-card class="mycard">
                        <div v-if="index===2" class="nums">
                            <h3>{{item.num}}G</h3>
                        </div>
                        <div v-else class="nums">
                            <h3>{{item.num}}</h3>
                        </div>
                        <h3>{{item.label}}</h3>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="alerm" :gutter="20">
                <el-col :span="6" v-for="(item,index) in area1" class="alermcol">
                    <el-card class="alerm-card">
                        <h3>{{item.label}}</h3>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="table-show" :gutter="20">
                <el-col :span="8">
                    <el-card class="table-left-show">
                        <h3>表一</h3>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card class="table-right-show">
                        <h3>表二</h3>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import api from '@/api'
    export default {
        name: "iotHome",
        data: function () {
            return {
                area:[
                    {
                        num:19,
                        label:'已接入设备数'
                    },
                    {
                        num:1203,
                        label:'总消息数'
                    },
                    {
                        num:1024,
                        label:'总数据量'
                    },
                    {
                        num:2235,
                        label:'数据运行次数'
                    },
                    {
                        num:223,
                        label:'数据流条数'
                    },
                    {
                        num:223,
                        label:'报警次数'
                    }


                ],
                area1:[
                    {
                        num:19,
                        label:'今日报警'
                    },
                    {
                        num:1203,
                        label:'本周报警'
                    },
                    {
                        num:1024,
                        label:'本月报警'
                    },
                    {
                        num:2235,
                        label:'累计报警'
                    }

                ],

            }
        },
        methods:{


        },
        created () {

        },
        mounted(){

        },
        components: {

        }
    }
</script>

<style lang="scss" type="text/scss" >
    .iot-home{
        margin:rem(16);
        border:1px solid #eee;
        height:rem(800);
        header{
            .title{
                text-align:left;
                height:rem(16);
                border-bottom:1px solid #eee;
                padding:rem(16);
                background-color:#fff;
            }
        };
        .main{
            border:1px solid transparent;
            height:rem(168);
            .data{
                margin-top:rem(16)
            }
            .mycol{
                //background-color:#e4353c;
                text-align:right;
                .mycard{
                    background:url('/static/img/iot/databg.png') no-repeat;
                    background-size:rem(269) rem(166);
                    background-color:#e4353c;
                    padding:rem(40) rem(20);
                    h3{
                        color:#fff;
                    }
                    .nums{
                        h3{
                            font-size:18px;
                            font-weight:600;
                        }
                    }
                }
            }
            .alerm{
                margin-top:rem(16);
                .alerm-card{
                    height:rem(236);
                    h3{
                        border-bottom:1px solid #eee;
                        padding-bottom:rem(14);
                        color:#14B9D6;
                    }
                }
            }
            .table-show{
                margin-top:rem(16);
                h3{
                    color:#14B9D6;
                }
                .table-left-show{
                    height:rem(280);
                }
                .table-right-show{
                    height:rem(280);
                }
            }
        }

    }
</style>
