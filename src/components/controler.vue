<template>
    <div class="map">
	    <div id="map">

	    </div>

        <div class="menu">
     	    <div class="left">
     	   	    <div v-show="isShow[0]">摄像头</div>
 	   	        <broad-cast v-show="isShow[1]"></broad-cast>
 	   	        <div v-show="isShow[2]">WiFi</div>
 	   	        <div v-show="isShow[3]">环境检测</div>
 	   	        <warn-event v-show="isShow[4]"></warn-event>
 	   	        <div v-show="isShow[5]">大屏</div>
 	   	        <security-person v-show="isShow[6]"></security-person>
 	   	        <div v-show="isShow[7]">车船调度</div>
 	   	        <build v-show="isShow[8]">其他</build>
     	    </div>
     	    <div class="right">
 	    	    <p v-if="exhibition[0]" @click="packUpHidden(1)">《 </p>
 	    	    <p v-else @click="packUpHidden(0)">》</p>
	 	   	    <ul>
	 	            <li v-for="(item,index) in title" @click="show(index)"><img :src="item.img" :alt="item.desc" :title="item.desc"/></li>
	 	   	    </ul>
 	        </div>
        </div>
    </div>
</template>

<script>
	import dataId from "../../static/xxsd_map.json"
	import Map from "../../static/js/droreMap.js"
	import mapLabe from "../../static/js/mapLabelInformationChildrenForm.js"
	import masterDataGrid1 from "../../static/js/masterDataGrid1.js"
	import broadCast from "./eye/controlChildren/broadcast.vue"
	import warnEvent from "./eye/controlChildren/warning.vue"
	import securityPerson from "./eye/controlChildren/securityperson.vue"
    import build from "./eye/controlChildren/building.vue"


export default {
  data () {
    return {
        title:[
	              {img:'../../../static/img/camera.png',desc:"摄像头"},
	              {img:'../../../static/img/broadcast.png',desc:"广播"},
	              {img:'../../../static/img/WiFi.png',desc:"WiFi"},
	              {img:'../../../static/img/enviroMon.png',desc:"环境检测"},
	              {img:'../../../static/img/warn.png',desc:"警告"},
	              {img:'../../../static/img/screen.png',desc:"大屏"},
	              {img:'../../../static/img/personLocation.png',desc:"个人定位"},
	              {img:'../../../static/img/car.png',desc:"车船调度"},
	              {img:'../../../static/img/else.png',desc:"其他"}
              ],
	      isShow:[false,true,false,false,false,false,false,false,false],
	      exhibition:[true,false]
    }
  },
  components:{
  	broadCast,
  	warnEvent,
  	securityPerson,
      build
  },
  methods:{
  	//该事件是显示对应的标识
  	show:function(index){
			this.isShow.forEach((item,idx)=>{
  			    this.$set(this.isShow,idx,(idx == index ? true : false),
  			        Map.unShowAllLayer(),
			        Map.showLayer(dataId.data[idx].id)
  			  )
			})
		},
    packUpHidden:function(index){
   	  $(".left").toggleClass("active");
   	  this.exhibition.forEach((item,idx)=>{
   	  	this.$set(this.exhibition,idx,(idx == index ? true : false))
   	  })
    }
  },
  mounted(){
  	Map.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  *{margin: 0;padding: 0;}
  ul,li {list-style-type: none;padding: 0;}
  .map{width: 100%;height: 100%;position: relative;display: flex;}
  #map{flex: 1;height: 100%;}
  .menu{position:relative;width: auto;height: 100%;min-width: 50px;background: #f2f2f2;}
  .left{position:absolute;width: 230px;height: 100%;left: -230px;background: #f2f2f2;display: none;}
  .menu .active{display: block;}
  .right{width: 50px;height: 100%;}
  .right>p{width: 100%;text-align: center;line-height: 80px;}
  .right>ul{width: 100%;height: 70%;display: flex;flex-direction: column;justify-content: space-around;}
  .right>ul li{margin: 0 auto;}
  .right>ul li img{width: 15px;height: 15px;}
  .right>ul li:first-child{margin-top: 80px;}

</style>
