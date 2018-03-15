<template>
    <div class="building">
        <ul id="build" class="ztree"></ul>
    </div>
</template>

<script>
    import "../../../../../plugins/ztree/js/jquery-1.8.3.min.js"
    import "../../../../../plugins/ztree/js/jquery.ztree.core.js"
    import "../../../../../plugins/ztree/js/jquery.ztree.excheck.min.js"


    var data=[
        {name:"片区名称",open:true,
            children:[
                {name:"建筑名称"},
                {name:"建筑名称"}
            ]
        },
        {name:"片区名称",
            children:[
                {name:"建筑名称"},
                {name:"建筑名称"},
                {name:"建筑名称"},
                {name:"建筑名称"}
            ]
        },
        {name:"片区名称",
            children:[
                {name:"建筑名称"},
                {name:"建筑名称"},
                {name:"建筑名称"},
                {name:"建筑名称"}
            ]
        }
    ];
    export default{
        data:function(){
            return{
                setting:{
                    check:{
                        enable:true,
                        nocheckInherit:false
                    },
                    data:{
                        simpleData:{
                            enable:true
                        }
                    },
                    view:{
                        showIcon:true,//是否显示节点的图标
                        showLine:false
                    }
                },
                zNodes:[]
            }
        },
        created:function(){
            this.zNodes=data;
        },
        mounted(){
            $.fn.zTree.init($("#build"),this.setting,this.zNodes).expandAll(true);
        }
    }
</script>

<style>
    @import '../../../../../plugins/zTree/css/zTreeStyle.css';
</style>
