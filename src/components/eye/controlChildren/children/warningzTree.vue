<template>
   <div id="areaTree">  
        <div class="tree-box">  
            <div class="zTreeDemoBackground left">  
                <ul id="warningtree" class="ztree"></ul>  
            </div>  
        </div>  
    </div>
</template>

<script>
	import "../../../../../plugins/ztree/js/jquery-1.8.3.min.js"
	import "../../../../../plugins/ztree/js/jquery.ztree.core.min.js"
	import "../../../../../plugins/ztree/js/jquery.ztree.excheck.min.js"
    export default {  
	      name: 'areaTree',  
	      components:{  
	  
	      },  
    data:function(){  
        return{  
            setting:{  
              check: {    
                    enable: true,    
                    nocheckInherit: false 
                },    
                data: {    
                    simpleData: {    
                        enable: true    
                    }    
                },  
                callback: {  
                    beforeClick: this.beforeClick,  
                    onClick: this.zTreeOnClick,  
                    onCheck: this.zTreeOnCheck,  
                },
                view:{
                	showIcon: true,   //是否显示节点的图标。
                	showLine:false   // 是否显示节点之间的连线。
                }
            },  
            zNodes:[  
                { name:"紧急事件   处理中2个  待处理2个", open:true,  
                  children: [  
                      { name:"事件11"},  
                      { name:"事件12"},  
                      { name:"事件13"},  
                      { name:"事件14"}, 
                      { name:"事件15"},
                      { name:"事件16"},
                      { name:"事件17"},
                      { name:"事件18"},
                      { name:"事件19"},
                      { name:"事件20"}
                  ]},  
                { name:"火警事件  处理中2个  待处理2个",  
                  children: [  
                      { name:"事件21"},  
                      { name:"事件22"},  
                      { name:"事件23"},
                      { name:"事件24"},  
                      { name:"事件25"},  
                      { name:"事件26"}
                      
                  ]},  
              { name:"SOS  处理中2个  待处理2个", isParent:true} ,
              { name:"火警事件  处理中2个  待处理2个",  
                  children: [  
                      { name:"事件41"},  
                      { name:"事件42"},  
                      { name:"事件43"},
                      { name:"事件44"},  
                      { name:"事件45"},  
                      { name:"事件46"}
                      
                  ]}, 
            ],
            
             
        }  
      },  
      methods:{  
        freshArea: function(){  
            $.fn.zTree.init($("#warningtree"), this.setting, this.zNodes);  
        },  
        zTreeOnClick: function(event, treeId, treeNode) {  
            console.log(treeNode.tId + ", " + treeNode.name);  
        },  
        zTreeOnCheck: function(event, treeId, treeNode) {  
            console.log(treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);  
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),  
            checkCount = zTree.getCheckedNodes(true).length,//选中  
            nocheckCount = zTree.getCheckedNodes(false).length,//未选中  
            changeCount = zTree.getChangeCheckedNodes().length;//获取输入框勾选状态被改变的节点集合（与原始数据 checkedOld 对比）  
            var checkedNames = [],checkedIds = [];  
            for (var i = 0; i <= zTree.getCheckedNodes(true).length - 1; i++) {  
                checkedIds.push(zTree.getCheckedNodes(true)[i].id);  
                checkedNames.push(zTree.getCheckedNodes(true)[i].name);  
            };  
            console.log(checkedIds);  
            console.log(checkedNames);  
        },  
        beforeClick: function(treeId, treeNode) {  
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");  
          // zTree.checkNode(treeNode, !treeNode.checked, null, true);  
          zTree.checkNode(treeNode, !treeNode.checked, true, true); //第二个参数!treeNode.checked和"",省略此参数效果等同，则根据对此节点的勾选状态进行 toggle 切换，第三个参数设置为true时候进行父子节点的勾选联动操作 ，第四个参数true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数；false 表示执行此方法时不触发事件回调函数  
          return false;  
        }  
      },  
      mounted(){  
        $.fn.zTree.init($("#warningtree"), this.setting, this.zNodes).expandAll(true);  
      }  
    }  
</script>  
<style>  
    @import '../../../../../plugins/ztree/css/zTreeStyle.css'; 
</style>  
