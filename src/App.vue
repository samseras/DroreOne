<template>
  <div id="app">
      <div class="BG_image">
          <img src="./../static/img/index-bg.png" alt="">
          <img src="./../static/img/1.png" alt="">
      </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
  	return {
  	}
  },
    methods: {
      getTitle() {
          console.log(this.$route,'klklklklklklklkl')
          let route = null
          if (this.$route.matched.length > 0) {
              route = this.$route.matched[0].path
          }
          if (route) {
              if (route.includes('eye')) {
                  window.document.getElementsByTagName('title')[0].innerHTML = '全视之眼'
              } else if (route.includes('property')) {
                  window.document.getElementsByTagName('title')[0].innerHTML = '数据中心'
              } else if (route.includes('gisMap')) {
                  window.document.getElementsByTagName('title')[0].innerHTML = 'GIS地图'
              } else if (route.includes('analysis')) {
                  window.document.getElementsByTagName('title')[0].innerHTML = '数据可视化'
              } else {
                  window.document.getElementsByTagName('title')[0].innerHTML = 'drore'
              }
          } else {
              window.document.getElementsByTagName('title')[0].innerHTML = 'drore'
          }
      }
    },
    created () {
        this.getTitle()
    },
    // mounted () {
    //     this.getTitle()
    // },
    watch: {
      '$route'() {
          this.getTitle()
      }
    }
}
</script>

<style lang="scss" type="text/scss">
    @import "style/func.scss";
    @import "style/common.scss";
	*{margin: 0;padding: 0;}
html,body,#app {
  width: 100%;
  height: 100%;
  }
    .BG_image{
        display: none;
    }
</style>
