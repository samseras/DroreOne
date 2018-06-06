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
                    <li v-for="(item, index) in facility" v-if="item.enable" :class="activeIndex === index? 'active':''" @click="goRouteModule(index)">
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
    import api from '@/api'

    export default {
        data () {
            return {
                title:[
                  {names:'ROAD',route:'/facility/road',img:'../../../static/img/roat.svg',desc:"路网",controlShow:true},
                  {names:'PARKING',route:'/facility/park',img:'../../../static/img/park.svg',desc:"停车场",controlShow:false},
                  {names:'TOILET',route:'/facility/toilet',img:'../../../static/img/toilet.svg',desc:"卫生间",controlShow:false},
                  {names:'BUSINESS',route:'/facility/shop',img:'../../../static/img/shop.svg',desc:"商铺",controlShow:false},
                  {names:'BUILDING',route:'/facility/build',img:'../../../static/img/build.svg',desc:"建筑",controlShow:false},
                  {names:'SCENICSPOT',route:'/facility/scenic',img:'../../../static/img/scenic.svg',desc:"景点",controlShow:false},
                  {names:'DUSTBIN',route:'/facility/trash',img:'../../../static/img/trash.svg',desc:"垃圾桶",controlShow:false},
                  {names:'PLANT',route:'/facility/plant',img:'../../../static/img/plant.svg',desc:"植物",controlShow:false},
                  {names:'SIGNBOARD',route:'/facility/indicator',img:'../../../static/img/indicator.svg',desc:"指示牌",controlShow:false}
                 ],
          isShowControler: false,
          exhibition: true,
          activeIndex: 4,
                facility: []
      }
    },
    components:{
        Map
    },
      created () {
        if (this.getSearchInfo.id) {
            this.isShowControler = true
        }
        this.getAllControler()
      },
    methods:{
        ...mapMutations(['SHOW_SEARCH']),
        packUpHidden () {
            this.isShowControler = !this.isShowControler
            this.exhibition = !this.exhibition
            this.$store.commit('SHOW_SEARCH', this.isShowControler)
        },
        goRouteModule (index) {
            if(this.isShowControler){
                if(this.activeIndex ==index){
                    this.isShowControler = false
                }
            }else {
                this.isShowControler = true
            }
            this.$store.commit('SHOW_SEARCH', this.isShowControler)
            this.activeIndex = index
        },
        async getAllControler(){
            await api.lib.getAllFacilityType().then((res)=>{
                // console.log(res,'这是请求回来的数据')
                // this.controler=res
                // for(let i=0;i< this.controler.length;i++){
                //     for(let j=0;j< this.title.length;j++){
                //         if(this.title[j].name===this.controler[i].name){
                //             if(this.controler[i].value==="ON"){
                //                 this.title[j].controlShow= true
                //             }else if(this.controler[i].value==="OFF"){
                //                 this.title[j].controlShow= false
                //             }
                //         }
                //     }
                // }
                this.title.forEach(item => {
                    res.forEach(item1 => {
                        if (item.desc === item1.name) {
                            item = {...item,...item1}
                            this.facility.push(item)
                        }
                    })
                })
                console.log(this.facility, 'opopopopopopop')
            }).catch((err)=>{
                console.log(err)
            })

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
                    background: #f2f2f2;
                    li{
                        width: 100%;
                        height: rem(60);
                        cursor: pointer;
                        a{
                            display: block;
                            width: 100%;
                            text-align: center;
                            height: 100%;
                            line-height: rem(60);
                            img{
                                vertical-align: middle;
                                width: rem(22);
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
