<template>
    <div class="zTreeDemoBackground left">
        <ul id="broadcastZtree" class="ztree"></ul>
    </div>
</template>

<script>
	/*import controlData from "../../../../../API/entrance.js"*/
	import "../../../../../plugins/ztree/js/jquery-1.8.3.min.js"
	import "../../../../../plugins/ztree/js/jquery.ztree.core.min.js"
	import "../../../../../plugins/ztree/js/jquery.ztree.excheck.min.js"

	var data = [
                { name:"室内广播  总共14个", open:true,
                  children: [
                      { name:"广播11"},
                      { name:"广播12"},
                      { name:"广播13"},
                      { name:"广播14"},
                      { name:"广播15"},
                      { name:"广播16"},
                      { name:"广播17"},
                      { name:"广播18"},
                      { name:"广播19"},
                      { name:"广播20"}
                  ]},
                { name:"室外广播  总共14个",
                  children: [
                      { name:"广播21"},
                      { name:"广播22"},
                      { name:"广播23"},
                      { name:"广播24"},
                      { name:"广播25"},
                      { name:"广播26"}
                  ]},
                { name:"室外广播  总共14个", isParent:true} ,
                { name:"室外广播  总共14个",
                  children: [
                      { name:"广播41"},
                      { name:"广播42"},
                      { name:"广播43"},
                      { name:"广播44"},
                      { name:"广播45"},
                      { name:"广播46"}

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
	        $.fn.zTree.init($("#broadcastZtree"),this.setting,this.zNodes).expandAll(true);
	    }
    }

</script>
<style>
    @import '../../../../../plugins/ztree/css/zTreeStyle.css';
</style>
