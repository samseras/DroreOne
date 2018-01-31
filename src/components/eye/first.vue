<template>
      <div id="index">
          
      </div>
</template>

<script>

export default {
  data () {
    return {
    	
    }
  },
  methods: {
     /* handleCheckAllChange(val) {
        this.checkedCities1 = val ? broadcast1 : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
      	console.log(value);
        let checkedCount = value.length;
        console.log(value.length);
        this.checkAll = checkedCount === this.data1.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.data1.length;
      }*/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{margin: 0;padding: 0;}
  ul,li {list-style-type: none;padding: 0;}
  #index{width: 100%;height: 100%;position: relative;background: yellow;}
  .menu{position: absolute;right: 0;width: 300px;height: 100%;min-width: 70px;background: #f2f2f2;}
  
  
</style>
