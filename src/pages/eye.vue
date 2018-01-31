
<template>  
 	<div id="eye">
 	    <header>
 	            <div><img src="../../static/img/eye.png"/>drore-全视之眼</div>
 	            <ul class="control">
 	            	<li v-for="(k,index) in manage" @click="show(index)">{{k}}</li>
 	            </ul>
 	            <div id="getTime">
 	            	{{currTime}}
 	            </div>
 	            <ul>
 	            	<li v-for="item in title"><a href="#"><i v-html="item"></i></a></li>
 	            </ul>
 	           
 	    </header>
 	    <section id="content">
 	       <div v-show="isShow[0]">主页</div>
	 	   <control v-show="isShow[1]"></control>
	 	   <div v-show="isShow[2]">设施</div>
	 	   <div v-show="isShow[3]">统计</div>
 	    </section>
 	</div>
</template>

<script>
	import control from "../components/eye/ control.vue"
	/*import first from "../components/eye/ first.vue"*/
	export default {
		data() {
	        return {
	        	manage:['主页','管控','设施','统计'],
	        	currTime:'',   //当前时间
	            title:["&#xe8c0;","&#xe627;","&#xe647;"] ,
	            isShow:[false,true,false,false]
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
	   /*	firstPage,*/
	        /*first,*/
			control
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
	#eye{width: 100%;height: 100%;min-width: 1519px;min-height: 742px;display: flex;flex-direction: column;}
    header{width: 100%;height: 70px;background: #2c3b47;display: flex;color: #fff;}
    header>div:first-child{font-size: 22px;margin-left: 20px;margin-right: 120px;line-height: 70px;position: relative;text-indent: 70px;}
    header>div img{position: absolute;top: 15px;left: 0px;}

    header>ul{display: flex;height: 70px;}
    header .control li{margin: 0 10px;line-height: 70px;}
    #content{width: 100%;flex: 1;}
    
    #getTime{line-height: 70px;margin-left: 360px;width: 190px;font-size: 16px;text-align: center;margin-right: 80px;}
    header>ul:last-child li{line-height: 70px;margin: 0 15px;}
    header>ul:last-child li a{display: block;line-height: 70px;}
</style>
