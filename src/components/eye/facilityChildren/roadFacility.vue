<template>
    <div class="road">
        <!--顶部-->
        <div class="r_top">
            <h5>广播列表</h5>
            <ul>
                <li><img src="../../../../static/img/search.png"></li>
            </ul>
        </div>
        <input id="search" placeholder="路线名称">
        <div class="middle">
            <div class="r_con">
                <el-checkbox style="color:#83d2f5">车行路线</el-checkbox>
                <el-checkbox style="color:#f36a5a">人行路线</el-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    *{margin:0;padding:0;}
    ul,li{list-style:none;padding:0;}
    .road{width:100%;height:100%;}
    .road>div.r_top{width:100%;height:40px;line-height:40px;
    display:flex;justify-content: space-between;background:#fafafa;}
    div.r_top>h5{margin-left:15px;}
    div.r_top>ul>li{margin:0 10px;}
    #search{width:88%;margin:5px 10px;text-indent: 10px;
    font-size:10px;color:#646464;height:20px;}
    .middle{width:100%;line-height:30px;background:#fff;overflow:hidden;}
    div.r_con{width:100%;height:45px;line-height:45px;
        border-bottom:1px solid #ccc;display: flex;}
    .el-checkbox{margin-left:10px;}
</style>

