<template>
    <div class="broadcast">
    	<div class="reveal">
    		<!--顶部-->
	    	<div class="top">
	    	   	<h5>广播列表</h5>
	    	   	<ul>
                    <li @click="newagenda" id='newagenda'><img src="../../../../static/img/newFile.png"/></li>
                    <li><img src="../../../../static/img/player.png"/></li>
                    <li><img src="../../../../static/img/microphone.png" alt="" /></li>
                    <li><img src="../../../../static/img/search.png" alt="" /></li>
	    	   	</ul>
	    	</div>
            <div class="middle">
                <!--搜索-->
                <input id="search" type="text"  placeholder="设备名称,组名称"/>
                <div class="manage">
                    <el-checkbox class="check">广播总数<font>187</font>个</el-checkbox>
                    <el-checkbox  class="check">故障<font>15</font>个</el-checkbox>
                </div>
                <div class="boottom" id="ztree">
                    <!--广播-->
                     <broadcast-ztree></broadcast-ztree>
                </div>
            </div>
            <div class="last">
                <h5>设备故障率</h5>
                <div>
                    <div id="pie"></div>
                </div>
            </div>
    	</div>

		<!--新建议程-->
	    <div class="newagenda">
	    	<div class="newagenda-entrance">
	    		<div class="newagenda-tiitle">
    	   			<h5>新建议程</h5>
    	   			<p id="hideAgenda" @click="hideagenda">×</p>
    	   		</div>
    	   		<div class="newagenda-main">
    	   			<p>议程列表：</p>
    	   			<ul>
    	   				<li>
    	   					<p @click="addagenda">＋</p>
    	   					<span>×</span>
    	   				</li>
    	   				<li>
    	   					<div>
    	   						<p>下午下班</p>
    	   						<p>12：00</p>
    	   						<p>周一到周五</p>
    	   					</div>
    	   					<span>×</span>

    	   				</li>
    	   				<li>
    	   					<div>
    	   						<p>下午下班</p>
    	   						<p>12：00</p>
    	   						<p>周一到周五</p>
    	   					</div>
    	   					<span>×</span>
    	   				</li>
    	   				<li>
    	   					<div>
    	   						<p>下午下班</p>
    	   						<p>12：00</p>
    	   						<p>周一到周五</p>
    	   					</div>
    	   					<span>×</span>
    	   				</li>
    	   			</ul>
    	   		</div>
    	   		<div class="newagenda-footer">
    	   			<button id="cancel" @click="hideagenda">取消</button>
    	   			<button id="save">保存</button>
    	   		</div>
	    	</div>

	   		<!--添加议程-->
	   		<div class="addagenda">
	   			<div class="newagenda-tiitle">
    	   			<h5>议程编辑</h5>
    	   			<p>×</p>
    	   		</div>
    	   		<div class="addagenda-main">
    	   			<p class="agendaName">议程名称：<input type="text" placeholder="议程名称"/></p>
    	   			<p class="agendaName">所选广播：</p>
    	   			<div class="zTreeDemoBackground left">
				        <ul id="addagenda" class="ztree"></ul>
				    </div>
				    <p class="tactics">执行策略：
				    	<input type="text" value="12:00" />
				    	<!--哪天执行-->
				    	<el-select v-model="value" placeholder="请选择" size="mini">
						    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
					    </el-select>
				    </p>
				    <p class="music">定义曲目:
				        <el-select v-model="value" placeholder="请选择" size="mini">
						    <el-option v-for="item in optionMisic" :key="item.value" :label="item.label" :value="item.value" size="small">

						    </el-option>
					    </el-select>
					    <button>本地上传</button>
				    </p>
    	   		</div>
    	   		<div class="addagenda-footer">
    	   			<button class="back" @click="lastStep">上一步</button>
    	   			<button class="save" @click="saveagenda">保存</button>
    	   		</div>
	   		</div>
	   	</div>
    </div>

</template>

<script>
	import broadcastZtree from "./children/broadcastzTree.vue"
	// import echarts from "../../../../static/js/echarts.min.js"

	var date= [
        {value:1580, name: '1人'},
        {value:50, name: '4人'}
	];
	var getChangeData = [
                      { name:"广播1"},
                      { name:"广播2"},
                      { name:"广播4"},
                      { name:"广播4"},
                      { name:"广播5"},
                      { name:"广播6"},
                      { name:"广播7"},
                      { name:"广播8"}
            ];

export default {
  data () {
    return {
    	  isShow:true,
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
                	showLine:false
                }
            },
            zNodes:[
            ],
            options: [
                { value: '选项1',label: '周一'},
                { value: '选项2',label: '周二'},
                { value: '选项3',label: '周三'},
                { value: '选项4',label: '周四'},
                { value: '选项5',label: '周五'},
                { value: '选项6',label: '周六'},
                { value: '选项7',label: '周天'}
                ],
		    value: '',
		    optionMisic:[
		        { value: '选项1',label: '曲目1'},
                { value: '选项2',label: '曲目2'},
                { value: '选项3',label: '曲目3'},
                { value: '选项4',label: '曲目4'},
                { value: '选项5',label: '曲目5'},
                { value: '选项6',label: '曲目6'}
		    ]
    }
  },
  components:{
  	broadcastZtree
  },
  methods: {
  	    newagenda:function(){
  	    	var treeObj = $.fn.zTree.getZTreeObj("broadcastZtree");
  	    	var nodes = treeObj.getChangeCheckedNodes(true);  //获取输入框勾选状态被改变的节点集合
  	    	console.log(nodes);
  	    	this.zNodes = nodes;
  	    	console.log(this.zNodes);
  	    	$(".newagenda").show();

  	    },
  	    hideagenda:function(){
  	    	$(".newagenda").hide();
  	    },
  	    addagenda:function(){
  	    	$(".newagenda-entrance").hide();
  	    	$(".addagenda").show();

  	    },
  	    saveagenda:function(){
  	    	$(".addagenda").hide();
  	    	$(".newagenda-entrance").show();
  	    },
  	    lastStep:function(){
  	    	$(".addagenda").hide();
  	    	$(".newagenda-entrance").show();
  	    },
        drawLine(){
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('pie'))
	        // 绘制图表
	        myChart.setOption({
	        series : [
	            {
	            	laber:{
		                  color:"#7d7d7d"
	            	},
	                type: 'pie',
	                radius : '75%',
	                center: ['50%', '50%'],
	                startAngle:60,
	                label:{            //饼图图形上的文本标签
	                        normal:{
	                            formatter:'{d}%'
	                         }
	                   },
	                data:[
	                    {
	                    	value:150,
	                    	name:"4人",
	                    	label:{normal:{show:false}},
	                    	labelLine:{normal:{show:false}}
	                    },
	                    {
	                    	value:70, name:"1人",
	                    	label:{normal:{show:true,color:"#646464",fontSize:12}},
	                        labelLine:{
	                    		normal:{
	                    			length:4,
	                    			lineStyle:{
	                    				color:"#646464",
	                    				type:"dashed",

	                    			  }
	                    			}
	                    		}
	                    }
	                ],
	                labelLine:{
	                	show:false
	                }

	            }
	        ],
	        color:['#26bbf0','#f36a5a']
	        });
	    }
    },

    created:function(){

        },
    mounted(){
	    this.drawLine();
	    $.fn.zTree.init($("#addagenda"), this.setting, this.zNodes).expandAll(true);
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../../plugins/ztree/css/zTreeStyle.css';

  *{margin: 0;padding: 0;}
  ul,li{list-style-type: none;padding: 0;list-style: none;}
  .broadcast{width: 100%;height: 100%;}
  .reveal{width: 100%;height: 100%;display: flex;flex-direction: column;}
  .reveal>.top{width: 100%;height: 40px ;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
  .top h5{margin-left: 15px;}
  .top ul{display: flex;}
  .top ul li{margin: 0 5px;}
  #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
  .reveal>.middle{width: 100%;flex:1;background: #fff;overflow: hidden;display: flex;flex-direction: column;}
  .middle .manage{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
  .middle .manage .check{margin-left: 10px;}
  .el-checkbox:last-child{color: #f36a5a;}
  .middle .boottom{width: 100%;flex:1;overflow-y: auto;}


  .last{width: 100%;height: 180px;overflow: hidden;}
  .last h5{line-height: 40px;margin-left: 15px;}
  .last h5+div{width: 100%;height: 140px;background: #fff;}
  #pie{width: 80%;height: 95%;margin: 0 auto;padding-top: 5%;}

  .newagenda{display: none;position: fixed;width: 500px;height: 350px;background: #fff;bottom:5px;right: 350px;border-radius: 10px;}
  .newagenda-entrance{width: 100%;height: 100%;}
  .newagenda-tiitle,.addagenda-tiitle{display: flex;color: #929292;justify-content:space-between;width: 100%;line-height: 35px;background: #fafafa;border-bottom: 1px solid #e6e6e6;}
  .newagenda-tiitle h5{margin-left: 15px;}
  .newagenda-tiitle p{font-size: 24px;margin-right: 15px;}
  .newagenda-main{height:255.8px;margin-left: 20px;color: #898989;font-size: 12px;}
  .newagenda-main>p{width: 100%;margin-top: 15px;line-height: 30px;font-size: 14px;}
  .newagenda-main>ul{margin-left: 16%;display: flex;flex-wrap: wrap;width: 84%;}
  .newagenda-main>ul>li{position: relative;width: 42%;height: 65px;border: 1px dashed #e0e0e0;margin-right: 5%;margin-bottom: 5%;}
  .newagenda-main>ul>li span{position: absolute;font-size: 24px;color: #e6605c;right: 10px;top: 0px;}
  .newagenda-main>ul>li:first-child p{width: 100%;line-height: 65px;font-size: 30px;text-align: center;color: #e0e0e0;}
  .newagenda-main>ul>li>div{width: 100%;height:65px;display: flex;flex-wrap: wrap;margin-top: 5px;}
  .newagenda-main>ul>li>div>p{width: 60px;height: 20px;line-height: 20px;text-align: center;border: 1px solid #e8e8e8;margin: 0 11px 0px 11px;}
  .newagenda-main>ul>li>div>p:first-child{margin-right: 30px;}

  .newagenda-footer{width: 100%;line-height: 45px;border-top: 1px solid #e6e6e6;}
  .newagenda-footer button{width: 70px;line-height: 25px;text-align: center;border: none;color: #a8a8a8;}
  #cancel{background: none;border: 1px solid #dfdfdf;margin-left: 55%;margin-right: 10px;}
  #save{background: #26bbf0;color: #fff;}

  .addagenda{background: #fff;display: none;color: #717171;}
  .addagenda-main{width: 100%;height: 270px;border-bottom: 1px solid #e6e6e6;}
  .addagenda-main>p{margin-left: 10%;font-size: 12px;}
  .agendaName{width: 90%;margin: 10px auto;}
  .agendaName input{width: 84%;height: 20px;border: 1px solid #e6e6e6;background: #fafafa;font-size: 12px;color: #717171;text-indent: 20px;border-radius: 3px;}
  #addagenda{display: flex;flex-wrap: wrap;margin-left: 10%;}
  .tactics{display: flex;margin: 10px 0;line-height: 30px;}
  .tactics input{width: 130px;text-align: center;color: #b0b0b0;border: 1px solid #e6e6e6;border-radius: 3px;margin-right: 10px;}
  .tactics .el-select{width: 150px;background: #fafafa;}

  .music{display: flex;line-height: 30px;}
  .music .el-select{width: 230px;margin:0 10px;}
  .music button{width: 80px;height: 26px;background: #26bbf0;color: #fff;border: none;border-radius: 3px;}

  .addagenda-footer{width: 100%;line-height: 35px;border-top: 1px solid #e6e6e6;}
  .addagenda-footer button{width: 70px;line-height: 25px;text-align: center;border: none;color: #a8a8a8;}
  .addagenda-footer .back{background: none;border: 1px solid #dfdfdf;margin-left: 60%;margin-right: 10px;}
  .addagenda-footer .save{background: #26bbf0;color: #fff;}
</style>
