
<template>
	<div id="entrence">
        <header>
            <p>Drore One 智慧旅游 · 云平台</p>
            <div id="getTime">
                {{currTime | timeFiler}} ({{currTime | weekFiler}})
            </div>
            <div class="user">王显涛</div>
            <a class="indexExit" href="login" ></a>
        </header>
		<div class="main">
            <div class="search"><input type="text" placeholder="请输入关键字"><button>搜索</button></div>
            <el-carousel indicator-position="outside" trigger="click" class="" height="430px" :autoplay="false" arrow="never">
                <el-carousel-item>
                    <div id="top" class="entrence-cont">
                        <ul>
                            <li class="one">
                                <div class="change estate"><a href="/MicServiceManagementSystem">物业管理>><img src="../../../static/img/estate.png"/></a></div>
                                <div class="list">
                                    <div  class="listO change"><a href="">第三方应用>><img src="../../../static/img/threeSoft.png"/></a></div>
                                    <div  class="listT change"><a href="">系统配置>><img src="../../../static/img/settion.png"/></a></div>
                                </div>
                            </li>
                            <li class="two">
                                <div class="bigData">
                                    <div class="change"><a href="/MicServiceManagementSystem">大数据分析>><img src="../../../static/img/bagData.png"/></a></div>
                                    <div class="dataCenter change" id="dataCenter"><a href="">数据中心>><img src="../../../static/img/dataCenter.png"/></a></div>
                                </div>
                                <div class="eye">
                                    <router-link to="/eye"  id="eye" class="change">全视之眼>><img src="../../../static/img/eye.png"/></router-link>
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
                </el-carousel-item>
                <el-carousel-item>
                    <div class="conversion">
                        <router-link to="/property"  id="property" class="change">资产>><img src="../../../static/img/eye.png"/></router-link>
                    </div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="conversion"></div>
                </el-carousel-item>
            </el-carousel>
		</div>
 	    <footer>版权所属：浙江卓锐科技股份有限公司</footer>
    </div>

</template>

<script>
    import moment from 'moment'
	export default {
		data() {
	        return {
                currTime: new Date()  //当前时间
			       }
	   },
        filters: {
            timeFiler(item) {
                return moment(item).format('YYYY年MM月DD日')
            },
            weekFiler(item) {
                let arr = ['天', '一', '二', '三', '四', '五', '六']
                let day = item.getDay()
                let week = arr.filter((item, index) => {
                    return index === day
                })
                return `星期${week[0]}`
            }
        }

	}
</script>
<style scoped>
	*{margin: 0;padding:0;box-sizing: border-box;}
	li{list-style: none;}
	a{text-decoration: none;color: #fff;font-size: 12px;}
	#entrence{width: 100%;height:100%;min-width:1450px;min-height:650px;position:relative;background: url('../../../static/img/index-bg.png') no-repeat;background-size:cover;display: flex;flex-direction: column;}
    header{width:100%;height: 50px;font-size: 20px;color: #fff;background: url('../../../static/img/index-top.png') no-repeat;}
    header p{width: 270px;line-height: 50px;margin-left: 120px;float: left;}
    #getTime{line-height: 50px;font-size: 12px;float: left;margin-left: 740px;}
    header .user{float: left;width: 100px;line-height: 50px;background: url(../../../static/img/user.png) no-repeat;background-size:14px;background-position: 0 15px;margin-left: 30px;text-indent: 20px;font-size: 14px;}
    header .indexExit{width: 20px;height:35px;background: url(../../../static/img/exit.png) no-repeat;background-size:14px;background-position: 0 15px;line-height: 35px;float: left;}
    footer{width:100%;height: 35px;background: rgba(0,0,0,0.1);text-align: center;font-size: 12px;line-height: 35px;color: #fff;}
    .main{width: 800px;flex:1;margin:120px auto; min-height: 268px;}
    .search{width:500px;height: 40px;margin: -50px auto 0;background: rgba(0,0,0,0.1);}
    .search input{width:400px;height: 20px;margin: 10px 0px 10px 10px;border: none;text-indent: 10px;font-size: 12px;}
    .search button{width:80px;height: 20px;margin: 10px 0px;border:none;background: #f6b75a;color: #fff;font-size: 12px;}


    .entrence-cont{width:770px;margin:15px;margin-top: 30px;}
	#top{margin-bottom: 10px;height: 60%;}
	#top ul{width: 100%;display: flex;height: 100%;}
	#top li{width: 16%;margin-right: 10px;}
    #top li:first-child{width:33%;}
    #top .one .list{display: flex;justify-content: space-between;height: 49%;}
    .listO{width:48%;background: #66d354;}
    .listT{width:48%;background: #6f7dbc;}
	#top .two{width: 50%;display: flex;flex-direction: column;}
    .two .bigData{width:100%;height: 47.8%;display: flex;justify-content: space-between;margin-bottom: 10px;}
    .two .eye{width:100%;flex:1;display: flex;justify-content: space-between;}
     #eye{width:66%;background:#3296d2;}
    .two .eye div:last-child{width:32%;background: #6f7dbc;}
    .two .bigData div:first-child{width:32%;background: #f6b75a;}
    .two .bigData div:last-child{width:66%;background: #d9776a;}
	#top .three{width: 33%;}
	#top .three>div{width: 100%;height: 48%;margin-bottom: 10px;}
	#top .three>div:first-child{background:#e6b000;}
	#deploy{display: flex;}
	#top .three #deploy>div{width: 48.2%;margin-right: 10px;background: #019eb1;height: 100%;}
	#top .three #deploy>div:last-child{margin-right: 0;background: #ad00a7;}
	#top li:last-child{background: #44bccd;margin-right: 0;}

	#top .one>div:first-child{width: 100%;height: 48%;margin-bottom:10px;background: #008dd4;}
	ul a{display: block;width: 100%;height: 100%;    padding-top: 10px; padding-left: 14px;}

	#bottom{margin-top: 0;height: 31%;}
    #bottom ul{width: 100%;display: flex;height: 100%;}
	#bottom li{width: 16%;margin-left: 10px;cursor: pointer;-webkit-perspective: 4000px;height: 100%;}
    #bottom li:first-child{width: 33%;background: #f6b75a;margin: 0;}
    #bottom li:nth-child(2){background: #44bccd;}
	#bottom li:nth-child(3){background: #66d354;}
	#bottom li:nth-child(4){background: #ff907f;}
	#bottom li:nth-child(5){background: #3296d2;}

   .change{box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position: relative;}
   img{position: absolute;left: 40%;top: 40%;width: 25px;height: 25px;}
   #eye img{left: 33%;width: 100px;height: 30px;}
   #dataCenter img{left: 40%;}
   #bee img{top: 44%;}
   .estate img,#dataCenter img,#GIS img{left:47%;}

   .change:hover{transform: scale(1.1);transition-duration: 1.5s;z-index: 10;box-shadow: 0px 3px 30px 2px rgba(0,0,0,0.8);}
    input:focus{outline: none;}
    button:focus{outline: none;}


    .conversion{
        background: red;
        width: 100%;
        height: 100%;
        margin-top: 30px;
    }
</style>
