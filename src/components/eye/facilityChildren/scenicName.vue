<template>
    <div class="broadcast">
        <!--顶部-->
        <div class="top">
            <h5>景点列表</h5>
            <ul>
                <li><img src="../../../../static/img/search.png" alt="" /></li>
            </ul>
        </div>
        <!--搜索-->
        <input id="search" type="text"  placeholder="景点名称"/>
        <div class="middle">
            <div>
                <el-checkbox><font>景点</font></el-checkbox>

            </div>
            <div class="boottom">
                <div class="indoor" v-for="(item,index) in data1">
                    <div class="matter">
                        <span>{{item.title}}</span>
                        <el-button>{{item.content}}</el-button>
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
    const toilet= [
        {title:"景点名称",content:"拥挤"},
        {title:"景点名称",content:"正常"},
        {title:"景点名称",content:"正常"},
        {title:"景点名称",content:"紧张"},
        {title:"景点名称",content:"正常"},
        {title:"景点名称",content:"正常"},
        {title:"景点名称",content:"正常"}
    ];

    export default {
        data () {
            return {
                checkAll: false,
                isIndeterminate: true,
                checkedCities1:[""],
                data1:toilet,
                isShow:true
            }
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{margin: 0;padding: 0;}
    ul,li {list-style-type: none;padding: 0;}

    .broadcast{width: 100%;height: 100%;}
    .broadcast .top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
    .broadcast .top h5{margin-left: 15px;}
    .broadcast .top ul{display: flex;}
    .broadcast .top ul li{margin: 0 10px;}
    #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
    .middle{width: 100%;line-height: 35px;background: #fff;overflow: hidden;}
    .middle>div:first-child{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
    .middle>div:first-child .el-checkbox{margin-left: 10px;}
    .el-checkbox:last-child{color: #f36a5a;}
    .middle .boottom{width: 100%;height: auto;}
    .middle .boottom .indoor{max-height: 700px;overflow: auto;}
    .middle .boottom .indoor .el-checkbox{line-height: 30px;margin-left: 10px;}
    .middle .boottom .indoor:first-child>.el-checkbox:first-child{margin-top: 10px;}
    .matter{border-bottom: 1px solid #ccc;height:50px;line-height:50px;padding:0px 10px;}
    .matter span {margin-right: 30px;width:80px;display: inline-block;font-size: 14px;color:#646464;}
    .matter>.el-button{padding: 5px 25px;margin-left:2px;background:#F08117;color:#fff;}
</style>
