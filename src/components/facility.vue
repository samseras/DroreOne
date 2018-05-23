<template>
    <div class="facility">
        <div class="map">
            <Map></Map>
        </div>
        <div class="menu">
            <div class="left" v-if="isShowControler && getSearchState">
                <router-view/>
            </div>
            <div class="right">
                <i class="el-icon-d-arrow-right" v-if="exhibition" @click="packUpHidden(1)"></i>
                <i class="el-icon-d-arrow-left" v-if="!exhibition" @click="packUpHidden(0)"></i>
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
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        data () {
            return {
                title:[
                  {route:'/facility/road',img:'../../../static/img/roat.svg',desc:"路网"},
                  {route:'/facility/park',img:'../../../static/img/park.svg',desc:"停车场"},
                  {route:'/facility/toilet',img:'../../../static/img/toilet.svg',desc:"卫生间"},
                  {route:'/facility/shop',img:'../../../static/img/shop.svg',desc:"商铺"},
                  {route:'/facility/build',img:'../../../static/img/build.svg',desc:"建筑"},
                  {route:'/facility/scenic',img:'../../../static/img/scenic.svg',desc:"景点"},
                  {route:'/facility/plant',img:'../../../static/img/plant.svg',desc:"植物"},
                  {route:'/facility/indicator',img:'../../../static/img/indicator.svg',desc:"指示牌"}
                 ],
          isShowControler: false,
          exhibition: true,
          activeIndex: 4
      }
    },
    components:{
        Map
    },
      created () {
        if (this.getSearchInfo.id) {
            this.isShowControler = true
        }
      },
    methods:{
        ...mapMutations(['SHOW_SEARCH']),
        packUpHidden () {
            this.isShowControler = !this.isShowControler
            this.exhibition = !this.exhibition
            this.$store.commit('SHOW_SEARCH', this.isShowControler)
        },
        goRouteModule (index) {
            this.isShowControler = true
            this.$store.commit('SHOW_SEARCH', this.isShowControler)
          this.activeIndex = index
        }
    },
      watch: {
          getSearchInfo () {
              this.isShowControler = true
          }
      },
      computed: {
          ...mapGetters(['getSearchInfo','getSearchState'])
      }
  }
</script>
<style lang="scss" scoped type="text/scss">
    .facility{
        width: 100%;
        height: 100%;
        display: flex;
        .menu{
            /*width: rem(300);*/
            height: 100%;
            display: flex;
            position: fixed;
            right: 0px;
            top:0px;
            padding-top: rem(60);
            box-sizing: border-box;
            .right{
                width: rem(50);
                height: 100%;
                float: right;
                display: flex;
                flex-direction: column;
                i{
                    display: inline-block;
                    width: 100%;
                    height: rem(40);
                    text-align: center;
                    line-height: rem(40);
                    font-size: rem(20);
                    cursor: pointer;
                    background: #fff;
                }
                ul{
                    width: 100%;
                    flex: 1;
                    padding-top: rem(40);
                    box-sizing: border-box;
                    background: #EFF7F2;
                    li{
                        width: 100%;
                        height: rem(40);
                        a{
                            display: block;
                            width: 100%;
                            text-align: center;
                            height: 100%;
                            line-height: rem(40);
                            img{
                                vertical-align: middle;
                                width: rem(15);
                                height: rem(15);
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
                background: #fff;
            }
        }
        .map{
            flex: 1;
            height: 100%;
            background: yellowgreen;
        }
    }
</style>
