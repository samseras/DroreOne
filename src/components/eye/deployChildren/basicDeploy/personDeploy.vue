<template>
    <div class="personDeploy">
        <div class="title">
            人员信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <div class="searchInfo">
                    <input type="text" placeholder="Search Anything">
                    <i class="el-icon-search"></i>
                </div>
                <div class="funcBtn">
                    <el-button size="mini"plain><i class="el-icon-circle-plus"></i>添加</el-button>
                    <el-button size="mini"plain><i class="el-icon-circle-check"></i>全选</el-button>
                    <el-button size="mini"plain>导入</el-button>
                    <el-button size="mini"plain>导出</el-button>
                    <el-button size="mini"plain><i class="el-icon-delete"></i>删除</el-button>
                </div>
                <div class="filite">
                    <el-checkbox-group v-model="filterList">
                        <el-checkbox v-for="item in typeList" :label="item.type"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="page">
                    <span>当前第1页/共8页</span>
                    <span class="upPage"><</span>
                    <span class="downPage">></span>
                    <span class="listForm"><i class="el-icon-tickets"></i></span>
                    <span class="cardForm"><i class="el-icon-menu"></i></span>
                </div>
            </div>
            <div class="personList">
                <ScrollContainer>
                    <div class="personInfo" v-for="item in personList">
                        <div class="checkBox">
                        </div>
                        <div class="personType">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.type}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{item.name}}</span></p>
                            <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>{{item.sex}}</span></p>
                            <p class="idNum">身份证号：<span>{{item.idNum}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.phone}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    export default {
        name: 'person-deploy',
        data(){
            return{
                checkList: [],
                filterList: [],
                personList: [
                    {id:1,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:2,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:3,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:4,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:5,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:6,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:7,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:8,name: '小明',type: '售票人员',sex: '男',idNum: '123456789',phone: '13674565455'}
                ],
                typeList: [
                    {type: '安保'},
                    {type: '售票'},
                    {type: '保洁'},
                    {type: '司机'},
                    {type: '船夫'},
                    {type: '检票'}
                ]
            }
        },
        methods: {

        },
        created () {

        },
        components: {
            ScrollContainer
        }
    }

</script>

<style lang="scss">
    .personDeploy{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(5);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .personDeploy{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            padding: rem(5) 0 rem(5) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #0086b3;
            font-weight: 600;
            border-bottom:  1px solid #ccc;
        }
        .personContent{
            flex: 1;
            width: 100%;
            /*background: red;*/
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 1px solid #a13309;
                div{
                    display: inline-block;
                }
                .searchInfo{
                    input{
                        border: none;
                        outline:medium;
                        list-style: none;
                        border-bottom: 1px solid #ccc;
                        font-size: rem(12);
                        padding: rem(3) rem(4);
                    }
                    i{
                        font-size: rem(12);
                        margin-left: rem(-20);
                        cursor: pointer;
                    }
                }
                .funcBtn{
                    margin-left: rem(20);
                    margin-top: rem(4);
                    button{
                        border: none;
                        margin-right: rem(-5);

                        i{
                            margin-right: rem(3);
                        }
                    }
                    .el-button {
                        padding: rem(5) rem(5);
                    }
                }
                .filite{
                    margin-left: rem(50);
                    .el-checkbox{
                        margin-left: rem(10);
                    }

                }
                .page{
                    margin-left: rem(20);
                    font-size: rem(12);
                    float: right;
                    margin-top: rem(3);
                    span{
                        display: inline-block;
                        cursor: pointer;
                        margin-left: rem(5);
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
            .personList{
                width: 100%;
                flex: 1;
                margin-top: rem(20);
                .personInfo{
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox{
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                    }
                    .personType{
                        width: 100%;
                        height: rem(20);
                        background: #0086b3;
                        position: relative;
                        font-size: rem(12);
                        img{
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);
                            background: red;
                        }
                        span{
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
                        }
                    }
                    .specificInfo{
                        margin-top: rem(5);
                        font-size: rem(12);
                        p{
                            margin-left: rem(10);
                            line-height: rem(22);
                        }
                    }
                }
            }
        }
    }

</style>

