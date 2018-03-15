<template>
    <div class="build">
        <!--顶部-->
        <div class="top">
            <h5>建筑列表</h5>
            <ul>
                <li>
                    <img src="../../../../static/img/search.png" alt="" />
                </li>
            </ul>
        </div>

        <div class="b_middle">
            <!--搜索-->
            <input id="search" type="text"  placeholder="建筑名称"/>
            <div class="manage">
                <el-checkbox>景区建筑</el-checkbox>
            </div>
            <div class="boottom" id="ztree">
                <buildz-tree></buildz-tree>
            </div>
        </div>

    </div>

</template>

<script>
    import buildzTree from "./children/buildzTree.vue"

    export default {
        data () {
            return {

            }
        },
        components:{
            buildzTree
        },
        methods: {

        },
        mounted(){
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{margin: 0;padding: 0;}
    ul,li {list-style-type: none;padding: 0;}

    .build{width: 100%;height: 100%;display: flex;flex-direction: column;}
    .build .top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
    .build .top h5{margin-left: 15px;}
    .build .top ul{display: flex;}
    .build .top ul li{margin: 0 10px;}
    #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
    .b_middle{width: 100%;flex:1;background: #fff;display: flex;flex-direction: column;}
    .b_middle .manage{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
    .b_middle .manage .el-checkbox{margin-left: 10px;}
    .el-checkbox:first-child{color: #08C1F2;}
    .b_middle .boottom{width: 100%;flex:1;overflow-y: auto;}


</style>
