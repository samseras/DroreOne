<template>
    <el-aside style="width: 250px;">
    	<el-menu>
			<el-menu-item index="1" style="height: 70px;" v-for="item in msg">
			    <i v-html='item.icon'></i>
			    <span slot="title">{{item.title}}</span>
			</el-menu-item>	
		</el-menu>
    </el-aside>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: [
             {icon:"&#xe60f;",title:"主页"},
             {icon:"&#xe626;",title:"微服务管理"},
             {icon:"&#xe634;",title:"统计分析"},
             {icon:"&#xe643;",title:"其他"},
             {icon:"&#xe610;",title:"其他"},
             {icon:"&#xe6aa;",title:"其他"}
           ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*侧边*/
    .el-aside { text-align: left;background: #f3f3f3;}
    .el-menu{border:none; background-color: #f3f3f3;}
    .el-menu-item{line-height: 70px;color: #a6a5a4;border: 1px solid #e0e0e0;border-bottom:none;font-size:16px;}
    .el-menu-item:last-child{border-bottom: 1px solid #e0e0e0;}
    .el-menu-item i{font-size: 32px;color:#a6a5a4;margin: 0 10px 0 45px;font-family: iconfont;font-style:normal;}
</style>
