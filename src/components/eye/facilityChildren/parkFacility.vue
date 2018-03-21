<template>
  <div class="broadcast">
    <!--顶部-->
    <div class="top">
         <h5>广播列表</h5>
          <ul>
            <li><img src="../../../../static/img/search.png" alt="" /></li>
          </ul>
    </div>
    <!--搜索-->
    <input id="search" type="text"  placeholder="设备名称 组名称"/>
    <div class="middle">
      <div>
        <el-checkbox style="color: #26bbf0">停车场数<font>7</font>个</el-checkbox>
            <span style="color: #f36a5a;font-size: 14px;">车位数855个</span>
      </div>
      <div class="boottom">
        <div class="indoor" v-for="(item,index) in data1">
          <div class="matter">
            <div class="top">
              <span style="color: #646464;">{{item.title}}</span>
              <el-button type="success">{{item.content}}</el-button>
            </div>
            <div class="down">
              <span style="margin-right:30px;">车位总数：{{item.total}}</span>
              <span >空余总数：{{item.spare}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  const park= [
    {title:"停车场1",content:"充裕",total:"260",spare:"10"},
    {title:"停车场2",content:"紧张",total:"160",spare:"2"},
    {title:"停车场3",content:"紧张",total:"112",spare:"1"},
    {title:"停车场4",content:"已满",total:"140",spare:"0"},
    {title:"停车场5",content:"已满",total:"60",spare:"0"},
    {title:"停车场6",content:"已满",total:"90",spare:"0"},
  ];

  export default {
    data () {
      return {
        checkAll: false,
        isIndeterminate: true,
        checkedCities1:[""],
        data1:parkFacility,
        isShow:true
      }
    },
    methods: {


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin: 0;padding: 0;}
  ul,li {list-style-type: none;padding: 0;}

  .broadcast{width: 100%;height: 100%;}
  .broadcast .top{width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;background: #fafafa;}
  .broadcast .top h5{margin-left: 15px;}
  .broadcast .top ul{display: flex;}
  .broadcast .top ul li{margin: 0 10px;}
  #search{width: 88%;margin: 5px 6% 10px;text-indent: 10px;font-size: 10px;color: #646464;height: 20px;}
  .middle{width: 100%;line-height: 30px;background: #fff;overflow: hidden;}
  .middle>div:first-child{width: 100%;height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;}
  .middle>div:first-child .el-checkbox{margin-left: 10px;}
  .el-checkbox:last-child{color: #f36a5a;}
  .middle .boottom{width: 100%;height: auto;}
  .middle .boottom .indoor{max-height: 700px;overflow: auto;}
  .middle .boottom .indoor .el-checkbox{line-height: 30px;margin-left: 10px;}
  .middle .boottom .indoor:first-child>.el-checkbox:first-child{margin-top: 10px;}
  .matter{border-bottom: 1px solid #ccc;padding:7px 10px;}
  .matter .top{height:30px;}
  .matter span {margin-right: 5px;width:100px;box-sizing: border-box;font-size: 14px;}
  .matter .el-button{padding: 0px 20px;margin-left:2px;}
  .down{font-size: 12px;color:#bcbcbc;}
</style>
