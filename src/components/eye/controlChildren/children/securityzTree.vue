<template>
   <div id="areaTree">  
        <div class="tree-box">  
            <div class="zTreeDemoBackground left">  
                <ul id="securityZtree" class="ztree"></ul>  
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
                	showIcon: false,   //是否显示节点的图标。
                	showLine:false   // 是否显示节点之间的连线。
                }
            },  
            zNodes:[  
                { name:"片区名称   安保人员10个  异常2个", open:true,  
                  children: [  
                      { name:"安保人员名称11"},  
                      { name:"安保人员名称12"},  
                      { name:"安保人员名称13"},  
                      { name:"安保人员名称14"}, 
                      { name:"安保人员名称15"},
                      { name:"安保人员名称16"},
                      { name:"安保人员名称17"},
                      { name:"安保人员名称18"},
                      { name:"安保人员名称19"},
                      { name:"安保人员名称20"}
                  ]},  
                { name:"片区名称  处理中2个  待处理2个",  
                  children: [  
                      { name:"安保人员名称21"},  
                      { name:"安保人员名称22"},  
                      { name:"安保人员名称23"},
                      { name:"安保人员名称24"},  
                      { name:"安保人员名称25"},  
                      { name:"安保人员名称26"}
                      
                  ]},  
              { name:"片区名称  处理中2个  待处理2个", isParent:true} ,
              { name:"片区名称  处理中2个  待处理2个",  
                  children: [  
                      { name:"安保人员名称41"},  
                      { name:"安保人员名称42"},  
                      { name:"安保人员名称43"},
                      { name:"安保人员名称44"},  
                      { name:"安保人员名称45"},  
                      { name:"安保人员名称46"}
                      
                  ]},
              { name:"片区名称  处理中9个  待处理0个",  
                  children: [  
                      { name:"安保人员名称51"},  
                      { name:"安保人员名称52"},  
                      { name:"安保人员名称53"},
                      { name:"安保人员名称54"},  
                      { name:"安保人员名称55"},  
                      { name:"安保人员名称56"}
                      
                  ]},
            ],
            
             
        }  
      },  
      methods:{  
        freshArea: function(){  
            $.fn.zTree.init($("#securityZtree"), this.setting, this.zNodes);  
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
          var zTree = $.fn.zTree.getZTreeObj("securityZtree");  
          // zTree.checkNode(treeNode, !treeNode.checked, null, true);  
          zTree.checkNode(treeNode, !treeNode.checked, true, true); //第二个参数!treeNode.checked和"",省略此参数效果等同，则根据对此节点的勾选状态进行 toggle 切换，第三个参数设置为true时候进行父子节点的勾选联动操作 ，第四个参数true 表示执行此方法时触发 beforeCheck & onCheck 安保人员名称回调函数；false 表示执行此方法时不触发安保人员名称回调函数  
          return false;  
        }  
      },  
      mounted(){  
        $.fn.zTree.init($("#securityZtree"), this.setting, this.zNodes).expandAll(true);  
      }  
    }  
</script>  
<style>  
    @import '../../../../../plugins/ztree/css/zTreeStyle.css'; 
</style>  
