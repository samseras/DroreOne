<template>
      <div id="map">
         <div class="menu">
         	  <div class="left">
     	   	    <div class="broadcast">
     	   	    	<!--顶部-->
     	   	    	  <div class="top">
     	   	    	   	  <h5>广播列表</h5>
     	   	    	   	  <ul>
     	   	    	   	  	<li><img src="../../../static/img/player.png"/></li>
     	   	    	   	  	<li><img src="../../../static/img/microphone.png" alt="" /></li>
     	   	    	   	  	<li><img src="../../../static/img/search.png" alt="" /></li>
     	   	    	   	  </ul>
     	   	    	  </div>
     	   	    	 <!--搜索-->
     	   	    	  <input id="search" type="text"  value="设备名称,组名称"/>
     	   	    	  <div class="middle">
			 	   	    	 	<div>
			 	   	    	 		  <el-checkbox>广播总数<font>187</font>个</el-checkbox>
			 	   	    	 	    <el-checkbox >故障<font>15</font>个</el-checkbox>
			 	   	    	 	</div>
			 	   	    	 	<div class="boottom">
			 	   	    	 		  <div class="indoor" v-for="(item,index) in data1">
			 	   	    	 		  	  <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">室内广播  总共14个 <span>故障<font>2</font>个</span></el-checkbox>
				 	   	    	 		    <el-checkbox-group v-model="checkedCities1" >
													     <el-checkbox v-for="(item,k) in data1" :label="item" :key="item" @change="handleCheckedCitiesChange">{{item}}</el-checkbox>
													  </el-checkbox-group>-->
													  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(checkAll,index)">{{item.title}}</el-checkbox>
				 	   	    	 		    <el-checkbox-group v-model="item.content">
													     <el-checkbox v-for="(k,idx) in item.content" :label="k" :key="k" >{{k}}</el-checkbox>
													  </el-checkbox-group>
			 	   	    	 		  </div>
			 	   	    	 		 <!-- <div class="indoor">
			 	   	    	 		  	  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">室内广播  总共14个 <span>故障<font>2</font>个</span></el-checkbox>
				 	   	    	 		    
			 	   	    	 		  </div>
			 	   	    	 		  <div class="indoor">
			 	   	    	 		  	  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">室内广播  总共14个 <span>故障<font>2</font>个</span></el-checkbox>
			 	   	    	 		  </div>
			 	   	    	 		   <div class="indoor">
			 	   	    	 		  	  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">室内广播  总共14个 <span>故障<font>2</font>个</span></el-checkbox>
			 	   	    	 		  </div>-->
			 	   	    	 		    
												 
			 	   	    	 	</div>
     	   	    	 	    
     	   	    	  </div>
     	   	    </div>
         	   	    
         	  </div>
	     	    <div class="right">
	     	   	  <ul>
	     	   	  	<li><img src="../../../static/img/camera.png" alt="摄像头" title="摄像头"/></li>
	     	   	  	<li><img src="../../../static/img/broadcast.png" alt="广播" title="广播" /></li>
	     	   	  	<li><img src="../../../static/img/WiFi.png" alt="WiFi" title="WiFi"/></li>
	     	   	  	<li><img src="../../../static/img/enviroMon.png" alt="环境检测" title="环境检测" /></li>
	     	   	  	<li><img src="../../../static/img/warn.png" alt="警告" title="警告" /></li>
	     	   	  	<li><img src="../../../static/img/screen.png" alt="大屏" title="大屏" /></li>
	     	   	  	<li><img src="../../../static/img/personLocation.png" alt="个人定位" title="个人定位" /></li>
	     	   	  	<li><img src="../../../static/img/car.png" alt="车船调度" title="车船调度" /></li>
	     	   	  	<li><img src="../../../static/img/else.png" alt=" 其他" title="其他" /></li>
	     	   	  </ul>
	     	    </div>
         </div>
      </div>
</template>

<script>
	const broadcast = [
	                {title:"室内广播    总共14个 故障2个",content:['广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10']},
	                {title:"室外广播    总共14个 故障2个",content:['广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10']},
	                {title:"室外广播    总共14个 故障2个",content:['广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10']},
	                {title:"室外广播    总共14个 故障2个",content:['广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10']},
	                {title:"室外广播    总共14个 故障2个",content:['广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10']},
	              ];
		             
	            
  const broadcast1 = [ '广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10'];
  const broadcast2 = [ '广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10'];
  const broadcast3 = [ '广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10'];
  const broadcast4 = [ '广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10'];
  const broadcast5 = [ '广播1','广播2','广播3','广播4','广播5','广播6','广播7','广播8','广播9','广播10'];
export default {
  data () {
    return {
    	  checkAll: false,
        isIndeterminate: true,
    	  checkedCities1:[""],
        data1:broadcast,
        isShow:true
    }
  },
  methods: {
     /* handleCheckAllChange(val) {
        this.checkedCities1 = val ? broadcast1 : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
      	console.log(value);
        let checkedCount = value.length;
        console.log(value.length);
        this.checkAll = checkedCount === this.data1.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.data1.length;
      }*/
      handleCheckAllChange(val,index) {
      	console.log(val);
      	console.log(index)
        this.checkedCities1 = val ? this.data1[index].content : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value,index) {
      	console.log(value);
      	console.log(index)
        let checkedCount = value.length;
        this.checkAll = (checkedCount === this.data1[index].length);
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.data1[index].length;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{margin: 0;padding: 0;}
ul,li {list-style-type: none;padding: 0;}
  #map{width: 100%;height: 100%;position: relative;background: yellowgreen;}
  .menu{position: absolute;right: 0;width: 300px;height: 100%;min-width: 70px;background: #f2f2f2;}
  .left{width: 80%;float: left;height: 100%;} 
  
  .broadcast{width: 100%;height: 100%;}
  .broadcast .top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
  .broadcast .top h5{margin-left: 15px;}
  .broadcast .top ul{display: flex;}
  .broadcast .top ul li{margin: 0 10px;}
  #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
  .middle{width: 100%;height: 430px;background: #fff;overflow: hidden;}
  .middle>div:first-child{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
  .middle>div:first-child .el-checkbox{margin-left: 10px;}
  .el-checkbox:last-child{color: #f36a5a;}
  .middle .boottom{width: 100%;height: auto;}
  .middle .boottom .indoor{max-height: 430px;overflow: auto;}
  .middle .boottom .indoor .el-checkbox{line-height: 30px;margin-left: 10px;}
  .middle .boottom .indoor:first-child>.el-checkbox:first-child{margin-top: 10px;}
  .el-checkbox-group{display: flex;flex-direction: column;margin-left: 25px;}
  
  
  
  
  
  .right{width: 20%;float: left;height: 100%;} 
  .right>ul{width: 100%;height: 70%;display: flex;flex-direction: column;justify-content: space-around;}
  .right>ul li{margin: 0 auto;}
  .right>ul li img{width: 15px;height: 15px;}
  .right>ul li:first-child{margin-top: 80px;}
  
</style>
