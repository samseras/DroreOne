<template>
  <div class="analyze">
      <div class="analyzeMenu">
          <ul>
              <li v-for="(item,index) in sidebarList" @click="isShowAnalyze(item.route,index)" :class="activeIndex === index?'active':''">
                  <img :src="item.imgUrl" alt="">{{item.name}}
              </li>
          </ul>
      </div>
      <div class="analyzeContent">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
  // import echarts from "../../static/js/echarts.min.js"
  import passengerFlow from "./eye/analyze/passengerFlow.vue"
  export default {
  	data(){
  		return{
  			isShow:[false,true,false],
  			Analyzedata:[],
            sidebarList:[
                {
                    name: '票务分析',
                    imgUrl: '',
                    route: '/analyze/ticket'
                },
                {
                    name: '客流分析',
                    imgUrl: '',
                    route: '/analyze/passenger'
                },
                {
                    name: '电商客源地分析',
                    imgUrl: '',
                    route: '/analyze/origin'
                }
            ],
            activeIndex : 1
  		}
  	},
    created () {
  	  this.$router.push({path:'/analyze/passenger'})
    },
  	components:{
  		passengerFlow
  	},
    methods:{
        isShowAnalyze (route,index) {
	          this.$router.push({path: route});
	          this.activeIndex = index;
        }

      },
    mounted(){

      }
    }


</script>
<style lang="scss" type="text/scss" scoped>
  .analyze{
      width: 100%;
      height: 100%;
      display: flex;
      .analyzeMenu{
          width: rem(200);
          height: 100%;
          background: #f2f2f2;
         ul{
             width: 100%;
             height: 100%;
             li{
                 padding: rem(8) 0 rem(8) rem(40);
                 box-sizing: border-box;
                 text-align: left;
                 cursor: pointer;
                 img{
                     display: inline-block;
                     width: rem(20);
                     height: rem(20);
                     background: red;
                     vertical-align: middle;
                     margin-right: rem(5);
                 }
             }
         }
          .active{
              background: #fff;
              color: #52c4f2;
          }
      }
      .analyzeContent{
          flex: 1;
          background: #fff;
      }
  }
</style>
