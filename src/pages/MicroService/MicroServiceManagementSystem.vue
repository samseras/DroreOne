
<template>  
 	<el-container style="height: 100%;width: 100%;min-width: 1519px;">
	    <el-header class="MS-header" style="height:80px;width: 100%;">
	  	    <el-row :gutter="20" style="margin: 0;">
			    <el-col :span="16" class="header-left">微服务管理平台</el-col>
			    <el-col :span="8">
		    	    <el-row :gutter="18" class="header-right" style="margin: 0;">
					    <el-col :span="3" v-for="item in title"><i v-html="item"></i></el-col>
					    <el-col :span="6"><i></i></el-col>    
			        </el-row>
			    </el-col>
			</el-row>
	    </el-header>
	    <el-container id="mic-content">
	    	<!--侧边-->
	    	<el-aside style="width: 250px;min-width: 250px;">
		    	<el-menu>
					<el-menu-item index="1" style="height: 70px;" v-for="(item,index) in msg" @click="show(index)">
					    <i v-html='item.icon'></i>
					    <span slot="title">{{item.title}}</span>
					</el-menu-item>
				</el-menu>
		    </el-aside>
		  <!-- <aside-left></aside-left>-->
		    <div>
		  	    <!-- 微服务管理-->
			    <el-main v-show="isShow[0]">
			    	<h3 class="mic-title">主页</h3>
			    </el-main>
			    <!-- 统计分析-->
			    <el-main v-show="isShow[1]">
			    	<h3 class="mic-title">微服务管理</h3>
			    	<el-tabs v-model="activeName" style="height:89%;">
					    <el-tab-pane label="微服务" name="first" height="80%">
					    	 <mic-menu></mic-menu>
					    </el-tab-pane>
					    <el-tab-pane label="节点" name="second" height="90%">
					    	 <dom-table :dataTable="tableData"></dom-table>
					    </el-tab-pane>
					</el-tabs>
			    </el-main>
			    <!-- 统计分析-->
			    <el-main v-show="isShow[2]"> 
			    	<h3 class="mic-title">统计分析</h3>
			    </el-main>
		    </div>
	    </el-container>
	</el-container>
</template>
<script>
	import tableDatas from "../../../API/entrance.json"
	import asideLeft from "../../components/microservice/asideLeft.vue"
	import micMenu from "../../components/microservice/micMenu.vue"
	import domTable from "../../components/microservice/domTable.vue"
	export default {
		data() {
	        return {
	        	title:["&#xe64b;","&#xe8c0;","&#xe627;","&#xe647;"],
	            activeName: 'first',
	            tableData:'',
	            msg: [
		             {icon:"&#xe60f;",title:"主页"},
		             {icon:"&#xe626;",title:"微服务管理"},
		             {icon:"&#xe634;",title:"统计分析"},
		             {icon:"&#xe643;",title:"其他"},
		             {icon:"&#xe610;",title:"其他"},
		             {icon:"&#xe6aa;",title:"其他"}
		           ],
		        isShow:[false,true,false,false,false,false]  
		         
	        };
	   },
	   components:{
			asideLeft,
			micMenu,
			domTable
		},
		methods:{
			show:function(index){
				this.isShow.forEach((item,idx)=>{
	  			    this.$set(this.isShow,idx,(idx == index ? true : false))
				})
				console.log(this.isShow)
			}
		},
		created:function(){
			  console.log(tableDatas.Data);
			  this.tableData = tableDatas.Data;
		}
		
		
	}
</script>
<style scoped>
	*{margin: 0;padding:0;}
	/*头*/
    .el-header{background-color: #32bdef;line-height: 80px;font-size: 24px;color: #fff;padding-left:40px;} 
    .header-left{font-weight: 600;}
    .header-right i{font-family: iconfont;font-style:normal;font-size: 34px;}
    .header-right .el-col{margin: 0 10px;}
       
    /*微服务管理*/
    .el-main { height: 100%;}
    /*.el-main { background-color: #fff; color: #333;text-align: center; height: 100%;}*/
    .mic-title{width: 94%;height:6%;color:#32bdef;font-size:24px;line-height: 40px;text-align: left;margin-top: 2.5%;margin-left: 45px;}
    .el-tabs{line-height: 50px;margin-left: 45px;border-bottom: 1px solid #e7e7e7;width:90%;border:none;}
    .el-tab-pane{font-size: 26px;color:#a6a5a4;} 
    .el-aside+div{background-color: #fff; color: #333;text-align: center; height: 100%;}
    
    /*侧边*/
    .el-aside { text-align: left;background: #f3f3f3;}
    .el-menu{border:none; background-color: #f3f3f3;}
    .el-menu-item{line-height: 70px;color: #a6a5a4;border: 1px solid #e0e0e0;border-bottom:none;font-size:16px;}
    .el-menu-item:last-child{border-bottom: 1px solid #e0e0e0;}
    .el-menu-item i{font-size: 32px;color:#a6a5a4;margin: 0 10px 0 45px;font-family: iconfont;font-style:normal;}
</style>
