<template>
    <div class="security">
    	<div class="security-reveal">
    		<!--顶部-->
	    	<div class="top">
	    	   	<h5>安保人员</h5>
	    	   	<ul>
	    	   		<li @click="information" id='newagenda'><img src="../../../../static/img/newFile.png"/></li>
	       	   	    <li><img src="../../../../static/img/player.png"/></li>
	    	   	  	<li><img src="../../../../static/img/microphone.png" alt="" /></li>
	    	   	  	<li><img src="../../../../static/img/search.png" alt="" /></li>
	    	   	</ul>
	    	</div>
			<div class="middle">
				<!--搜索-->
				<input id="search" type="text"  placeholder="请输入关键字"/>
	    	 	<div class="manage">
	    	 		<el-checkbox>安保人员<font>117</font>个</el-checkbox>
	    	 	    <el-checkbox >异常<font>6</font>个</el-checkbox>
	    	 	</div>
	    	 	<div class="boottom" id="ztree">
	    	 		<!--广播-->
	    	 		 <security-ztree></security-ztree>
	    	 	</div>
			</div>
		    <div class="last">
		  	    <h5>设备故障率</h5>
		  	    <div>
		  	  	    <div id="security"></div>
		  	    </div>
		    </div>
    	</div>
    	<div class="information">
    		<div class="information-tiitle">
	   			<h5>安保人员信息</h5>
	   			<p @click="cancel">×</p>
	   		</div>
	   		<div class="information-main">
	   			<p>姓   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>王某某</span></p>
	   			<p>电   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>15209284419</span></p>
	   			<p>班   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次：<span>上午09：00-下午18：00</span></p>
	   		    <p class="queryTime">查询时间：<input type="datetime-local"/><input type="datetime-local"/></p>
	   		    <p class="timeFrame">快速查询:
			        <el-select v-model="value" placeholder="最近一个小时" size="mini" style="width:84%;">
					    <el-option v-for="item in timeFrame" :key="item.value" :label="item.label" :value="item.value" size="small">
					    	<el-checkbox style="margin-left: 10px;color: #949494;">{{item.label}}</el-checkbox>
					    </el-option>
				    </el-select>
			    </p>
	   		</div>
	   		<div class="information-footer">
	   			<button class="cancel" @click="cancel">取消</button>
                <button class="refer">查询</button>
	   		</div>
    	</div>

    </div>

</template>

<script>
	import securityZtree from "./children/securityzTree.vue"
	// import echarts from "../../../../static/js/echarts.min.js"
	var data = [
        {value:1548, name: '1人'},
        {value:50, name: '4人'}
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
                	showIcon: true,   //是否显示节点的图标。
                	showLine:false   // 是否显示节点之间的连线。

                }
          },
		    value: '',
		    timeFrame:[
		        { value: '选项11',label: '最近一个小时'},
                { value: '选项2',label: '最近三个小时'},
                { value: '选项3',label: '最近一天'},
                { value: '选项4',label: '最近三天'},
                { value: '选项5',label: '最近一周'}
		    ],
		/* checked:true*/

    }
  },
  components:{
  	securityZtree
  },
  methods: {
  	    information:function(){
  	    	$(".information").show();
  	    },
  	    cancel:function(){
  	    	$(".information").hide();
  	    },
        drawLine(){
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('security'))
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
	                    	value:1548,
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
    mounted(){
	    this.drawLine();
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../../../plugins/ztree/css/zTreeStyle.css';

  *{margin: 0;padding: 0;}
  ul,li{list-style-type: none;padding: 0;list-style: none;}
  .security{width: 100%;height: 100%;}
  .security-reveal{width: 100%;height: 100%;display: flex;flex-direction: column;}
  .security-reveal>.top{width: 100%;height: 40px ;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
  .top h5{margin-left: 15px;}
  .top ul{display: flex;}
  .top ul li{margin: 0 5px;}
  #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
  .security-reveal>.middle{width: 100%;flex:1;background: #fff;overflow: hidden;display: flex;flex-direction: column;}
  .middle .manage{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
  .middle .manage .el-checkbox{margin-left: 10px;}
  .el-checkbox:last-child{color: #f36a5a;}
  .middle .boottom{width: 100%;flex:1;overflow-y: auto;}


  .last{width: 100%;height: 180px;overflow: hidden;}
  .last h5{line-height: 40px;margin-left: 15px;}
  .last h5+div{width: 100%;height: 140px;background: #fff;}
  #security{width: 80%;height: 95%;margin: 0 auto;padding-top: 5%;}

  .information{display: none;position: fixed;width: 500px;height: 350px;background: #fff;bottom:5px;right: 350px;}
  .information-tiitle{width: 100%;height: 35px;line-height: 35px;background: #fafafa;border-bottom: 1px solid #e6e6e6;display:flex;justify-content: space-between;}
  .information-tiitle h5{margin-left: 15px;color: #646464;}
  .information-tiitle p{margin-right: 15px;font-size: 24px;color: #888;}

  .information-main{width: 100%;height: 270px;border-bottom: 1px solid #e6e6e6;}
  .information-main p:first-child{margin-top: 10px;}
  .information-main p{width: 90%;margin: 0 auto;line-height: 35px;color: #646464;font-size: 14px;}
  .queryTime input{width:180px;border: 1px solid #e6e6e6;background: #fafafa;height: 20px;line-height: 20px;text-indent: 10px;}
  .queryTime input:last-child{margin-left: 10px;}
  .timeFrame{width:100%;}
  .information-footer{width: 100%;height: 35px;line-height: 35px;}
  .information-footer button{width: 75px;height: 22px;border: 1px solid #dfdfdf;background: none;text-align: center;font-size: 12px;}
  .information-footer button:first-child{margin-left: 300px;}
  .information-footer button:last-child{background: #26bbf0;color: #ffffff;}


</style>
