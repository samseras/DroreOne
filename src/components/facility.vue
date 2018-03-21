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
<style lang="scss" scoped type="text/scss">
    .facility{
        width: 100%;
        height: 100%;
        display: flex;
        .menu{
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
</style>
