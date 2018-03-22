<template>
    <div class="p_basic">
        <div class="p_top">
            <div class="p_search">
                <input type="text" id="search" placeholder="搜索">
                <img src="../../../../static/img/search.png" alt="">
            </div>
            <div class="p_fun">
                <el-button icon="el-icon-circle-plus-outline">添加</el-button>
                <el-button icon="el-icon-circle-plus">全选</el-button>
                <el-button icon="el-icon-arrow-down">导入</el-button>
                <el-button icon="el-icon-arrow-up">导出</el-button>


            </div>
            <div class="p_figure">
                <el-checkbox v-model="checked1" label="安保"></el-checkbox>
                <el-checkbox v-model="checked2" label="售票"></el-checkbox>
                <el-checkbox v-model="checked3" label="司机"></el-checkbox>
            </div>
        </div>
        <div class="p_content">
            <div class="p_information" v-for="item in items">
                <div class="i_title">
                    {{item.title}}
                </div>
                <div class="i_content">
                    <p><span class="i_name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span><span>{{item.name}}</span> </p>
                    <p><span class="i_name">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span><span>{{item.sex}}</span> </p>
                    <p><span class="i_name">身份证号:</span><span>{{item.num}}</span> </p>
                    <p><span class="i_name">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:</span><span>{{item.phone}}</span> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items:[
                    {title:'售票人员',name:'显涛',sex:'男',num:'127837478899',phone:'13737991'},
                    {title:'保安',name:'吹吹牛',sex:'男',num:'3452478899',phone:'13737991'}
                ]
            }

        }
    }

</script>
<style scoped>
    .p_top{
        display:flex;
        font-size: 15px;
        padding-bottom: 2px;
        border-bottom: 2px solid #e44b4e;
        height:30px;
    }
    .p_search{
        border-bottom: 1px solid #cfcfcf;
        margin-right:10px;
    }
    .p_search input{
        border:none;
        outline: none;
    }
    .p_fun>ul{
        display: flex;
        list-style: none;
    }

    .p_figure{
        margin-left:40px;
    }
    .p_figure .el-checkbox{
        margin:0;
        padding:2px 5px;
    }
    .p_content{
        margin-top:10px;
        display: flex;
        flex-wrap: wrap;
    }
    .p_information{
        border:1px solid #dddddd;
        width:289px;
        height:160px;
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        margin-top: 15px;
    }
    .p_information:nth-child(4n){
        margin-right: 0px;
    }
    .i_title{
        background-color: #3598db;
        width: 253px;
        margin-top: 20px;
        line-height: 30px;
        font-size: 14px;
        text-align: right;
        padding-right: 35px;
        color: #fff;
    }
    .i_content{
        width:287px;
        flex:1;
    }
    .i_content p{
        width:100%;
        text-indent: 15px;
        font-size: 14px;
        height: 26px;
        color: #646464;
        display: flex;
    }
    .i_content p:first-child{
        margin-top: 5px;
    }
    .i_content p span{
        display: inline-block;
        line-height: 26px;
        line-height: 26px;
    }
    .i_name{
        display: inline-block;
        width: 90px;
    }
    .i_name+span{
        flex:1;
    }

</style>

