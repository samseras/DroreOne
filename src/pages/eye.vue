
<template>
	<el-container style="height: 100%;width: 100%;min-width: 1120px;">
	    <el-header style="width: 100%;height: 70px;">
	        <el-row :gutter="10" style="margin: 0;width: 100%;" class="alleye">
			    <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="1">
			    	<img src="../../static/img/eye.png"/>Workbench
			    </el-col>
			    <el-col :xs="6" :sm="6" :md="7" :lg="9" :xl="11" class="control">
		 	        <div v-for="(k,index) in manage" @click="show(index)">{{k}}</div>
			    </el-col>
			    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="11" id="getTime">
	 	            	{{currTime}}
			    </el-col>
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" :xl="1" >
	 	            <div v-for="item in title"><a href="#"><i v-html="item"></i></a></div>
			    </el-col>
			</el-row>
	    </el-header>
	    <el-main>
	    	<div v-show="isShow[0]" class="element">主页</div>
	 	    <control v-show="isShow[1]" class="element"></control>
	 	    <facility v-show="isShow[2]" class="element"></facility>
	 	    <analyze v-show="isShow[3]" class="element"></analyze>
            <div v-show="isShow[4]">配置</div>
	    </el-main>
	</el-container>
</template>


<script>
    import control from "../components/eye/controler.vue"
    import facility from "../components/eye/facility.vue"
    import analyze from "../components/eye/analyze.vue"

	export default {
		data() {
	        return {
	        	manage:['主页','管控','设施','分析','配置'],
	        	currTime:'',   //当前时间
	            title:["&#xe8c0;","&#xe627;","&#xe647;"] ,
	            isShow:[false,true,false,false,false]
				     }
		 },
		 methods:{
			time:function(){
				var d = new Date();
				var arr = ['天','一','二','三','四','五','六'];
				var date = "";
				date+=d.getFullYear()+"年";
				date+=d.getMonth()+1+"月";
				date+=d.getDate()+"日 (";
				var day = d.getDay();
				for(var i=0;i<arr.length;i++){
					if(day==i){
						day = arr[i];
					}
				}
				date+="星期"+day+")";
		        this.currTime = date;
			},
			show:function(index){
				this.isShow.forEach((item,idx)=>{
	  			    this.$set(this.isShow,idx,(idx == index ? true : false))
				})
				console.log(this.isShow)
			}
		},
	   components:{
	       control,
	       facility,
	       analyze
		},
		mounted:function(){
			this.time()
		}
	}
</script>
<style scoped>
	*{margin: 0;padding:0;box-sizing: border-box;}
	li{list-style: none;}
	i{font-family: iconfont;font-style:normal;font-size: 26px;}
	a{text-decoration: none;color: #fff;}
	body>.el-container {height: 100%;display: flex;flex-direction: column;}
	.el-header{background: #2c3b47;display: flex;color: #fff;padding-left: 20px;}
	.el-col{height: 100%;line-height: 70px;display: flex;}
	.alleye .el-col:first-child{font-size: 22px;position: relative;}
	.alleye .el-col:first-child img{margin-top: 15px;width: 65px;height: 40px;padding-right: 10px;}
	.control div{margin: 0 5px;line-height: 70px;}
	#getTime{line-height: 70px;font-size: 16px;text-align: center;}
	.alleye>.el-col:last-child div{line-height: 70px;margin: 0 10px;}
	.alleye>.el-col:last-child div a{display: block;line-height: 70px;}

	.el-main{flex: 1;}
	.element{width: 100%;height: 100%;}

</style>
