
<template>
	<div id="entrence">
		<div class="main">
			<div id="top" class="entrence-cont">
             	<ul>
             	 	<li class="one">
             	 		<div class="change"><a href="/MicServiceManagementSystem">大数据分析>><img src="../../../static/img/bagData.png"/></a></div>
             	 		<div class="change"><a href="">第三方应用>><img src="../../../static/img/threeSoft.png"/></a></div>
             	 	</li>
             	 	<li class="two change" id="eye">
                        <router-link to="/eye">全视之眼>><img src="../../../static/img/eye.png"/></router-link>
                    </li>
             	 	<li class="three">
             	 		<div class="dataCenter change" id="dataCenter"><a href="">数据中心>><img src="../../../static/img/dataCenter.png"/></a></div>
             	 		<div class="deploy" id="deploy">
             	 			<div class="change"><a href="">系统配置>><img src="../../../static/img/settion.png"/></a></div>
             	 			<div class="change"><a href="">舆情分析>><img src="../../../static/img/sentiment.png"/></a></div>
             	 		</div>
             	 	</li>
             	 	<li class="change" id="bee"><a href="">物联网>><img src="../../../static/img/ZigBee.png"/></a></li>
             	</ul>
            </div>
            <div id="bottom" class="entrence-cont">
             	<ul>
             	 	<li class="change" id="GIS"><a href="/login">GIS地图>><img src="../../../static/img/GIS.png"/></a></li>
             	 	<li class="change"><a href="/login">官网门户>><img src="../../../static/img/home.png"/></a></li>
             	 	<li class="change"><a href="/login">电子票务>><img src="../../../static/img/elecTicket.png"/></a></li>
             	 	<li class="change"><a href="/login">电子商圈>><img src="../../../static/img/elecBusiness.png"/></a></li>
             	 	<li class="change"><a href="/login">微信公众号>><img src="../../../static/img/weixin.png"/></a></li>
             	</ul>
            </div>
		</div>
 	</div>

</template>

<script>
	export default {
		data() {
	        return {

			       }
	   }

	}
</script>
<style scoped>
	*{margin: 0;padding:0;box-sizing: border-box;}
	li{list-style: none;}
	a{text-decoration: none;color: #fff;}
	#entrence{width: 100%;height:100%;position:relative;background: url('../../../static/img/index-bg.png') no-repeat;background-size:cover;}
    .main{position:absolute;width: 80%;height: 80%;left: 50%;top: 10%;margin-left: -40%;}

    .entrence-cont{width: 96.7%;margin:15px;}
	#top{margin-bottom: 10px;height: 60%;}
	#top ul{width: 100%;display: flex;height: 100%;}
	#top li{width: 16%;margin-right: 10px;}
	#top .two{width: 33%;background: #4f36ab;}
	#top .three{width: 33%;}
	#top .three>div{width: 100%;height: 48%;margin-bottom: 10px;}
	#top .three>div:first-child{background:#e6b000;}
	#deploy{display: flex;}
	#top .three #deploy>div{width: 48.2%;margin-right: 10px;background: #019eb1;height: 100%;}
	#top .three #deploy>div:last-child{margin-right: 0;background: #ad00a7;}
	#top li:last-child{background: #90c24f;margin-right: 0;}

	#top .one>div{width: 100%;height: 48%;margin-bottom:10px;background: #008dd4;}
	#top .one>div:last-child{margin-bottom: 0;background: #90c24f;}
	ul a{display: block;width: 100%;height: 100%;    padding-top: 10px; padding-left: 14px;}

	#bottom{margin-top: 0;height: 31%;}
    #bottom ul{width: 100%;display: flex;height: 100%;}
	#bottom li{width: 16%;margin-left: 10px;cursor: pointer;-webkit-perspective: 4000px;height: 100%;}
    #bottom li:first-child{width: 33%;background: #be1e4a;margin: 0;}
    #bottom li:nth-child(2){background: #bdab6b;}
	#bottom li:nth-child(3){background: #00a400;}
	#bottom li:nth-child(4){background: #db562d;}
	#bottom li:nth-child(5){background: #0d64d7;}

   .change{box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position: relative;}
   img{position: absolute;left: 32%;top: 34%;}
   #eye img{left: 40%;top: 44%;}
   #dataCenter img{left: 40%;top:36%;}
   #GIS img{left: 42%;top:34%;}
   #bee img{top: 44%;}
   .change:hover{transform: scale(1.1);transition-duration: 1.5s;z-index: 10;box-shadow: 0px 3px 30px 2px rgba(0,0,0,0.8);}
</style>
