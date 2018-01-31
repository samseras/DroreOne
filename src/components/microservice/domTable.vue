<template>
	<div>
		<el-table :data="dataTable" style="width: 100%;">
	        <el-table-column prop="data" label="" width="40" type="selection"></el-table-column>
	        <el-table-column :prop="col[0].prop" :label="col[0].label" :width="col[0].width" align="left">

          </el-table-column>
	        <el-table-column :prop="col[1].prop" :label="col[1].label" :width="col[1].width" align="left">

          </el-table-column>
	        <el-table-column :prop="col[2].prop" :label="col[2].label" :width="col[2].width" align="left">

          </el-table-column>
	        <el-table-column :prop="col[3].prop" :label="col[3].label" :width="col[3].width" align="left">

          </el-table-column>
	        <el-table-column :prop="col[4].prop" :label="col[4].label" :width="col[4].width" align="left">
	        	<template slot-scope="scope">
	        		<el-progress :percentage="scope.row.capacity" :stroke-width="12" ></el-progress>
	        	</template>
	        </el-table-column>

	        <el-table-column :prop="col[5].prop" :label="col[5].label" :width="col[5].width" align="left">

          </el-table-column>

	        <el-table-column :prop="col[6].prop" :label="col[6].label" :width="col[6].width" align="left">
               <template slot-scope="scope">
                <div id="service" style="">{{scope.row.mic.service}}</div>
                <el-button size="medium" @click="open" type="primary">
                  {{scope.row.mic.num}}

                </el-button>

              </template>
	        </el-table-column>

	    </el-table>
	</div>

</template>
<script>
export default {
	data(){
		return{
			col:[
			    {prop:"name",label:"主机名称",width:"155"},
			    {prop:"IP",label:"IP地址",width:"140"},
			    {prop:"num",label:"CPU个数",width:"80"},
			    {prop:"size",label:"内存大小",width:"100"},
			    {prop:"capacity",label:"硬盘容量",width:"200"},
			    {prop:"state",label:"硬盘容量",width:"120"},
			    {prop:"mic",label:"微服务",width:"140"}
			],
			checked: true,
		}
	},
  methods: {
      open() {
        this.$alert('<br style="border-bottom: 1px solid">'+
          '<input type="checkbox">services'+
          ' </div>', 'drore.com', {
          dangerouslyUseHTMLString: true
        });
      }
  },

   props:['dataTable']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	*{margin: 0;padding: 0;}
	.el-table-column{padding: 0;}
   #service{
   	        width: 70%;
            height: 100%;
            float: left;
            text-align: left;
            }
    #num{
    	width: 30%;
    	float: left;
    	border: none;
    	background: #32BDEF;
    	height: 100%;
    	color: #fff;
    	line-height: 25px;
    	border-radius: 0;
    	text-align: center;
    }
  .el-button{
    width:25px;
    height:25px;
  }
</style>
