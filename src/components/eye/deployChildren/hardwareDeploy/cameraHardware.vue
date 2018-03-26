<template>
    <div class="cameraHard">
        <div class="title">
            摄像头信息
        </div>
        <div class="cameraContent">
            <div class="conTitle">
                <div class="titleSearch">
                    <input type="text" placeholder="Search Anything">
                    <i class="el-icon-search"></i>
                </div>
                <div class="titleBtn">
                    <el-button size="mini" plain @click="dialogFormVisible=true"><i class="el-icon-circle-plus">添加</i></el-button>
                    <el-button size="mini" plain><i class="el-icon-circle-check">全选</i></el-button>
                    <el-button size="mini" plain>导入</el-button>
                    <el-button size="mini" plain>导出</el-button>
                    <el-button size="mini"plain><i class="el-icon-delete"></i>删除</el-button>
                    <el-button size="mini"plain><i class="el-icon-edit-outline"></i>修改</el-button>
                </div>
                <div class="titleCheck">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="室内"></el-checkbox>
                        <el-checkbox label="室外"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="titlePage">
                    <span>当前第1页/共8页</span>
                    <span class="upPage"><</span>
                    <span class="downPage">></span>
                    <span class="listForm"><i class="el-icon-tickets"></i></span>
                    <span class="cardForm"><i class="el-icon-menu"></i></span>
                </div>
            </div>

            <div class="cameraList">
                <ScrollContainer>
                    <div class="personInfo" v-for="item in camera">
                        <div class="checkBox">
                        </div>
                        <div class="personType">
                            <img src="../../../../../static/img/camera.png" alt="">
                            <span class="type">
                                  {{item.type}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.area}}</span></p>
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.describe}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
            </div>
        <el-dialog title="添加摄像头信息" :visible.sync="dialogFormVisible" >
            <el-form :model="form">
                <!--<el-form-item label="类型" :label-width="formLabelWidth">-->
                    <!--<el-select v-model="form.types" >-->
                        <!--<el-option label="室内" value="nei"></el-option>-->
                        <!--<el-option label="室外" value="wai"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="厂家" :label-width="formLabelWidth">
                    <el-select v-model="form.region">
                        <el-option label="海康威视" value="weishi"></el-option>
                        <el-option label="卓锐科技" value="keji"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'

    export default{
        data(){
            return{
                dialogFormVisible:false,
                camera:[
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'},
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'},
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'},
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'},
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'},
                    {type:'摄像头名称',area:'A-片区',describe:'摄像头介绍'}
                ],
                form:{
                    name:'',
                    types:'',
                    region:'',
                    type:[],
                    resource:'',
                    delivery: false,
                    desc:''
                },
                formLabelWidth:'120px',
                checkList:[],
            }
        },
        components:{
            ScrollContainer
        }
    }

</script>

<style lang="scss" type="text/scss">
    .el-checkbox__label{
        padding-left:rem(5);
        font-size:rem(13);
    }
    .el-checkbox__inner{
        margin-top:rem(5);
    }
</style>

<style lang="scss" type="text/scss" scoped>
    .cameraHard{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        .title{
            width:100%;
            padding:rem(5) 0 rem(5) rem(15);
            box-sizing: border-box;
            font-size:rem(16);
            color:#0086b3;
            font-weight:500;
            border-bottom:1px solid #ccc;
        }
        .cameraContent{
            flex:1;
            width:100%;
            padding:0 rem(15);
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            .conTitle{
                width:100%;
                height:rem(30);
                margin-top:rem(10);
                border-bottom:1px solid #a13309;
                div{
                    display:inline-block;
                }
                .titleSearch{
                    input{
                        border:none;
                        outline:medium;
                        border-bottom:1px solid #ccc;
                        font-size:rem(13);
                        padding:rem(3) rem(4);
                    }
                    i{
                        font-size:rem(13);
                        margin-left:rem(-20);
                        cursor: pointer;
                    }
                }
                .titleBtn{
                    margin-left:rem(20);
                    margin-top:rem(4);
                    button{
                        border:none;
                        margin-right:rem(-5);
                        font-weight: 600;
                        i{
                            margin-right:rem(3);
                        }
                    }
                    .el-button{
                        padding:rem(5) rem(5);
                    }
                }
                .titleCheck{
                    margin-left:rem(50);
                    .el-checkbox{
                        margin-left:rem(10)
                    }
                }
                .titlePage{
                    margin-left: rem(20);
                    font-size:rem(13);
                    float:right;
                    margin-top:rem(3);
                    span{
                        display:inline-block;
                        cursor: pointer;
                        margin-left:rem(5);
                    }
                    .upPage,downPage,listForm,cardForm{
                        padding: rem(5);
                        box-sizing: border-box;
                    }
                    .cardForm{
                        i{
                            color: #a13309;
                        }
                    }
                }
            }
            .cameraList{
                width:100%;
                flex:1;
                margin-top:rem(20);
                .personInfo{
                    width:rem(210);
                    height:rem(140);
                    border:1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .personType{
                        margin-top:rem(20);
                        width:100%;
                        height:rem(25);
                        background:#0086b3;
                        position:relative;
                        font-size:rem(12);
                        img{
                            width:rem(40);
                            height:rem(40);
                            border-radius: 50%;
                            position:absolute;
                            left:rem(15);
                            top:rem(-10);
                        }
                        span{
                            float:right;
                            margin-right:rem(20);
                            line-height: rem(25);
                            color:#fff;
                        }
                    }
                    .specificInfo{
                        margin-top:rem(10);
                        font-size: rem(14);
                        p{
                            margin-left: rem(15);
                            line-height: rem(22);
                        }
                    }
                }
            }
        }
    }
</style>

