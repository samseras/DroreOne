<template>
	<div class="microService">
		<div class="mic-menu">
	        <div class="top">
	        	<p>微服务</p><i>&#xe64b;</i>
	        </div>
	        <div><el-input v-model="input" placeholder="Search Angthing"></el-input></div>
	        <el-tree :data="data2" show-checkbox="" default-expand-all="" node-key="id" ref="tree" highlight-current :props="defaultProps"></el-tree>
	    </div>
	    <div class="micS-right">
	    	<form action="" method="post">
	    		<p>基本信息：</p>
	    	        <label>系统版本</label><input type="text" />
	    	        <label>所在节点</label><input type="text" />
	    	    <p>服务配置：</p>
	    	        <label>端口号</label><input type="text" />
	    	        <label>所在节点</label><input type="text" />
	    		    <input id="save" type="submit" value="保存配置"/>
	    		    
	    	</form>
	    	
	    </div>
	</div>
    
</template>

<script>
export default {
  data () {
    return {
        input:'',
        filterText: '',
        data2: [
        {
            id: 1,
            label: '服务类1',
            children: [
                {id: 3, label: 'Service1'},
                {id: 4,label: 'Service1'},
                {id: 5,label: 'Service1'}]
        }, {
            id: 2,
            label: '服务类2',
            children: [
                { id: 6,label: 'Service1'}, 
                {id: 7,label: 'Service1'}]
        }],
         defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
   },
  methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{margin: 0;padding: 0;}
	.microService{width: 100%;display: flex;}
    /*树形菜单*/
   .mic-menu{width: 255px;height: 520px;border: 1px solid #d4d5d9;min-width: 255px;}
   .mic-menu i{font-family: iconfont;font-style:normal;font-size:22px;margin-right: 20px;line-height: 38px;display: block;}
   .mic-menu .top{line-height: 38px;width: 100%;display: flex;color: #32bdef;justify-content:space-between;border-bottom:1px solid #e0dfde;}
   .mic-menu .top p{line-height: 38px;margin-left: 20px;font-size: 20px;}
   .mic-menu .top+div{line-height: 30px;background: #f3f3f3;}
   .el-input {width: 88%;margin: 5px 6%;}
   /*内容*/
  .micS-right{flex: 1;padding-left: 80px;}
  .micS-right p{width: 100%;line-height: 50px;font-size: 16px;color: #686866;text-align: left;}
  .micS-right p:first-child{margin-top: 60px;}
  label{font-size: 14px;margin-right: 10px;width: 80px;line-height: 30px;color: #686866;display: inline-block;margin-left: 30px;}
  input{width: 235px;height: 25px;display: inline-block;margin-right:350px;border: 1px solid #e1e1e1;border-radius: 3px;}
  #save{background: #32BDEF;border: 1px solid #32BDEF;;margin-left: 122px;height: 30px;margin-top: 90px;color: #fff;font-size: 16px;}
</style>
