
<template>
     <div class="errPage">
         <img src="../../../static/img/errtip.png" alt="" v-show = "echatListErrs.errInform">
         <img src="../../../static/img/errData.png" alt="" v-show = "echatListErrs.pullData">
         <!--<img src="../../../static/img/errData.png" alt="" v-show = "isPull">-->
     </div>
</template>

<script>

	export default {
		data() {
	        return {
                isData:false,
                isPull:false,
                isErr:false
			}
	     },
        props:["echatListErrs"],
        methods:{

        },
        mounted(){
		    console.log(this.echatListErrs,"echatListErrs")

        }
	}
</script>
<style scoped lang="scss" type="text/scss">
   .errPage{
       width: rem(400);
       height: rem(300);
       position: absolute;
       left: 50%;
       top:50%;
       margin-left: rem(-100);
       margin-top: rem(-150);
   }
</style>
