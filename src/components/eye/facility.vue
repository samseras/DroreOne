<template>
  <div id="map">
    <div class="menu">
      <div class="left">
        <dustbin v-show="isShow[0]">摄像头</dustbin>
        <toilet v-show="isShow[1]"></toilet>
        <scenicName v-show="isShow[2]">WiFi</scenicName>
        <div v-show="isShow[3]">环境检测</div>
        <park v-show="isShow[4]"></park>
        <road v-show="isShow[5]">大屏</road>
        <shop v-show="isShow[6]">房屋</shop>
        <div v-show="isShow[7]">删除</div>
        <build v-show="isShow[8]">其他</build>

      </div>
          <div class="right">
            <ul>
              <li v-for="(item,index) in title" @click="show(index)" >
                <img :src="item.img"  :title="item.desc"/>
              </li>
            </ul>
          </div>
      </div>

  </div>
</template>

<script>

    import toilet from "./facilityChildren/toilet.vue"
    import park from "./facilityChildren/park.vue"
    import shop from "./facilityChildren/shop.vue"
    import road from "./facilityChildren/road.vue"
    import dustbin from "./facilityChildren/dustbin.vue"
    import scenicName from "./facilityChildren/scenicName.vue"
    import build from "./facilityChildren/building.vue"

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
        isShow:[false,true,false,false,false,false,false,false,false]
      }
    },
    components:{
      toilet,park,shop,road,dustbin,scenicName,build
    },
    methods:{
      show:function(index){
        this.isShow.forEach((item,idx)=>{
          this.$set(this.isShow,idx,(idx == index ? true : false),
//            Map.unShowAllLayer(),
//			  Map.showLayer(dataId.data[idx].id)
			     )
        })
        console.log(this.isShow)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin: 0;padding: 0;}
  ul,li {list-style-type: none;padding: 0;}
  #map{width: 100%;height: 100%;position: relative;background: yellowgreen;}
  .menu{position: absolute;right: 0;width: 300px;height: 100%;min-width: 70px;background: #f2f2f2;}
  .left{width: 80%;float: left;height: 100%;}



  .right{width: 20%;float: left;height: 100%}
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


  .right>ul{width: 100%;height: 70%;display: flex;flex-direction: column;justify-content: space-around;}
  .right>ul li{margin: 0 auto;}
  .right>ul li img{width: 15px;height: 15px;}
  .right>ul li:first-child{margin-top: 80px;}


</style>
