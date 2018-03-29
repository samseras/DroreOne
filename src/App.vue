<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
  	return {
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
</style>
