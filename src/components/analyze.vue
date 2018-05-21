<template>
  <div class="analyze">
      <div class="analyzeMenu" v-if="hideList">
          <ul>
              <li v-for="(item,index) in sidebarList" @click="isShowAnalyze(item.dashboard_id,index,item.refresh_interval)"  :class="activeIndex === index?'active':''" :id="item.id" :listName = "item.name" >
                  {{item.name}}
              </li>
          </ul>
      </div>
      <div class="analyzeContent">
          <router-view @hideList = "hideLists"></router-view>
      </div>
  </div>
</template>

<script>
  // import echarts from "../../static/js/echarts.min.js"
  import passengerFlow from "./analysisSystem/analyze/passengerFlow.vue"
  import api from "@/api"
  import { mapMutations } from 'vuex'
  export default {
  	data(){
  		return{
  			isShow:[false,true,false],
  			Analyzedata:[],
            dashboradList:[],
            sidebarList:[],
            activeIndex : 0,
            hideList:true,
  		}
  	},
    async created () {
  	  await this.getDashboradList()
      this.$router.push({path:`/analyze/${this.sidebarList[0].dashboard_id}`});
      this.$store.commit('REFRESH_DATA_TYPE', this.sidebarList[0].refresh_interval)
    },
  	components:{
  		passengerFlow
  	},
    methods:{
        ...mapMutations(['REFRESH_DATA_TYPE']),
        hideLists(data){
              this.hideList = !data.list;
              let hideData = !data.head;
              this.$emit('hideHead',hideData);
        },
        isShowAnalyze (id,index,refresh) {
	          this.$router.push({path: `/analyze/${id}`});
	          this.activeIndex = index;
              this.$store.commit('REFRESH_DATA_TYPE', refresh)
        },
        async getDashboradList(){
           await api.analyze.getDashboradList().then(res => {
                this.sidebarList = res.result
               //  this.sidebarList = this.sidebarList.map(item => {
               //     item.refreshData = 20000
               //     return item
               // })
               // console.log(this.sidebarList,"11111111111")
            }).catch(err => {
                console.log(err)
           })
        }

      },
      watch: {
  	    '$route' () {
  	        clearInterval(window.SETTIMER)
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
