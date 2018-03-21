<template>
    <div class="facility">
        <div class="map">
            <Map></Map>
        </div>
        <div class="menu">
            <div class="left" v-if="isShowControler">
                <router-view/>
            </div>
            <div class="right">
                <p v-if="exhibition" @click="packUpHidden(1)">《</p>
                <p v-if="!exhibition" @click="packUpHidden(0)">》</p>
                <ul>
                    <li v-for="(item, index) in title" :class="activeIndex === index? 'active':''" @click="goRouteModule(index)">
                        <router-link :to="item.route"><img :src="item.img" :alt="item.desc" :title="item.desc">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from '@/components/map'
  export default {
    data () {
      return {
        title:[
          {route:'/facility/toilet',img:'../../../static/img/camera.png',desc:"摄像头"},
          {route:'/facility/park',img:'../../../static/img/broadcast.png',desc:"广播"},
          {route:'/facility/shop',img:'../../../static/img/WiFi.png',desc:"WiFi"},
          {route:'/facility/road',img:'../../../static/img/enviroMon.png',desc:"环境检测"},
          {route:'/facility/dustbin',img:'../../../static/img/warn.png',desc:"警告"},
          {route:'/facility/scenicName',img:'../../../static/img/screen.png',desc:"大屏"},
          {route:'/facility/build',img:'../../../static/img/personLocation.png',desc:"个人定位"}
        ],
          isShowControler: false,
          exhibition: true,
          activeIndex: 2
      }
    },
    components:{
        Map
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
      },
        packUpHidden () {
            this.isShowControler = !this.isShowControler
            this.exhibition = !this.exhibition
        },
        goRouteModule (index) {
          this.activeIndex = index
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .facility{
        width: 100%;
        height: 100%;
        display: flex;
        .menu{
            /*width: rem(300);*/
            height: 100%;
            display: flex;
            float: right;
            .right{
                width: rem(50);
                height: 100%;
                float: right;
                display: flex;
                flex-direction: column;
                p{
                    width: 100%;
                    height: rem(50);
                    text-align: center;
                    line-height: rem(50);
                    cursor: pointer;
                }
                ul{
                    width: 100%;
                    flex: 1;
                    padding-top: rem(50);
                    box-sizing: border-box;
                    background: #EFF7F2;
                    li{
                        width: 100%;
                        height: rem(50);
                        a{
                            display: block;
                            width: 100%;
                            text-align: center;
                            height: 100%;
                            line-height: rem(50);
                            img{
                                vertical-align: middle;
                            }
                        }
                    }
                    .active{
                        background: #ccc;
                    }
                }
            }
            .left{
                width: rem(250);
                height: 100%;
            }
        }
        .map{
            flex: 1;
            height: 100%;
            background: yellowgreen;
        }
    }
  /*ul,li {list-style-type: none;padding: 0;}*/
  /*#map{width: 100%;height: 100%;position: relative;background: yellowgreen;}*/
  /*.menu{position: absolute;right: 0;width: 300px;height: 100%;min-width: 70px;background: #f2f2f2;}*/
  /*.left{width: 80%;float: left;height: 100%;}*/



  /*.right{width: 20%;float: left;height: 100%}*/
  /*.broadcast{width: 100%;height: 100%;}*/
  /*.broadcast .top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}*/
  /*.broadcast .top h5{margin-left: 15px;}*/
  /*.broadcast .top ul{display: flex;}*/
  /*.broadcast .top ul li{margin: 0 10px;}*/
  /*#search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}*/
  /*.middle{width: 100%;height: 430px;background: #fff;overflow: hidden;}*/
  /*.middle>div:first-child{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}*/
  /*.middle>div:first-child .el-checkbox{margin-left: 10px;}*/
  /*.el-checkbox:last-child{color: #f36a5a;}*/
  /*.middle .boottom{width: 100%;height: auto;}*/
  /*.middle .boottom .indoor{max-height: 430px;overflow: auto;}*/
  /*.middle .boottom .indoor .el-checkbox{line-height: 30px;margin-left: 10px;}*/
  /*.middle .boottom .indoor:first-child>.el-checkbox:first-child{margin-top: 10px;}*/
  /*.el-checkbox-group{display: flex;flex-direction: column;margin-left: 25px;}*/


  /*.right>ul{width: 100%;height: 70%;display: flex;flex-direction: column;justify-content: space-around;}*/
  /*.right>ul li{margin: 0 auto;}*/
  /*.right>ul li img{width: 15px;height: 15px;}*/
  /*.right>ul li:first-child{margin-top: 80px;}*/


</style>
