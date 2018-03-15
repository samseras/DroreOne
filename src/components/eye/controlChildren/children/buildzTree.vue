<template>
    <div class="zTreeDemoBackground left">
        <ul id="buildZtree" class="ztree"></ul>
    </div>
</template>

<script>

    import "../../../../../plugins/ztree/js/jquery-1.8.3.min.js"
    import "../../../../../plugins/ztree/js/jquery.ztree.core.min.js"
    import "../../../../../plugins/ztree/js/jquery.ztree.excheck.min.js"

    var data = [
        { name:"片区名称", open:true,
            children: [
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"}

            ]},
        { name:"片区名称",
            children: [
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"}

            ]},
        { name:"片区名称",
            children: [
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"},
                { name:"建筑名称"}

            ]},

    ];
    export default {
        data:function(){
            return {
                setting : {
                    check: {
                        enable: true,
                        nocheckInherit: false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view:{
                        showIcon: true,   //是否显示节点的图标。
                        showLine:false   // 是否显示节点之间的连线。
                    }
                    /*,
                    async: {
                        enable: true,
                        url:"http://192.168.0.110:9090/xubin/getDataAll",
                        dataFilter: controlData
                    }*/
                },
                zNodes:[]
            }
        },
        created:function(){
            this.zNodes = data;
        },
        mounted(){
            $.fn.zTree.init($("#buildZtree"),this.setting,this.zNodes).expandAll(true);
        }
    }

</script>
<style>
    @import '../../../../../plugins/zTree/css/zTreeStyle.css';
</style>
