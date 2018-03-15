<template>
  <div id="analyze">
    <ul id="analyz-Menu">
     	<li @click="show(0)"><img src=""/>票务分析</li>
     	<li @click="show(1)" style="background: #fff;color: #52c4f2;"><img src=""/>客流分析</li>
     	<li @click="show(2)"><img src=""/>电商客源地分析</li>
    </ul>
    <ul id="analyz-Content">
     	<li v-show="isShow[0]">票务分析</li>
     	<passenger-flow v-show="isShow[1]"></passenger-flow>
     	<li v-show="isShow[2]">电商客源地分析</li>
    </ul>
  </div>
</template>

<script>
  import echarts from "../../../static/js/echarts.min.js"
  import passengerFlow from "./analyze/passengerFlowT.vue"
  export default {
  	data(){
  		return{
  			isShow:[false,true,false],
  			Analyzedata:[]
  		}
  	},
  	components:{
  		passengerFlow
  	},
    methods:{
	      show:function(index){

	      	$($("#analyz-Menu>li")[index]).css({"background":"#fff","color":"#52c4f2"});
	      	$($("#analyz-Menu>li")[index]).siblings().css({"background":"#f2f2f2","color":"#9a9999"});
					this.isShow.forEach((item,idx)=>{
		  			    this.$set(this.isShow,idx,(idx == index ? true : false))
					})
				}
      },
    mounted(){

      }
    }


</script>
<style>
  *{padding: 0;margin: 0;}
  li{list-style: none;}
  #analyze{width: 100%;height: 100%;display: flex;}
  #analyz-Menu{width: 15%;background: #f2f2f2;height:100%;}
  #analyz-Content{flex: 1;background: #fff;width:85%;}
  #analyz-Menu>li{width: 100%;height: 40px;line-height: 40px;padding-left: 30%;}

</style>
