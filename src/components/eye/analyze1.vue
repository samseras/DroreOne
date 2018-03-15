<template>
  <div id="box">
    <aside class="mian1">
      <div class="child1">
        <div class="tip">
          <h3>游客性别统计</h3>
          <ul class="right">
            <li>【日期】</li>
            <li>【月份】</li>
            <li>【年份】</li>
          </ul>
        </div>
        <div id="sale" style="width: 500px;height: 400px;"></div>
      </div>
      <div class="child1">
        <div class="tip">
          <h3>年龄段统计</h3>
          <ul class="right">
            <li>【日期】</li>
            <li>【月份】</li>
            <li>【年份】</li>
          </ul>
        </div>
        <div id="pancake" style="width: 600px;height: 300px;" > </div>
      </div>
      <div class="child1">
        <div class="tip">
          <h3>旅游出行人数</h3>
          <ul class="right">
            <li>【日期】</li>
            <li>【月份】</li>
            <li>【年份】</li>
          </ul>
        </div>
        <div id="pie1" style="width: 500px;height: 300px;">

        </div>

      </div>
      <div class="child1">
        <div class="tip">
          <h3>游客区域分析</h3>
          <ul class="right">
            <li>【日期】</li>
            <li>【月份】</li>
            <li>【年份】</li>
          </ul>
        </div>
        <div class="middle1">
          <!--<div id="map"></div>-->
          <div id="bar" style="width: 500px;height: 300px;"></div>
        </div>
      </div>
    </aside>
  </div>


</template>

<script>
  import echarts from "../../../static/js/echarts.min.js"
  export default {

    methods:{
      draw(){
        //旅客性别统计 //环形图
        var myChart1 = echarts.init(document.getElementById("sale"));
        var manValue = 60, womanValue = 40, who = 0,total = manValue + womanValue;
        var labelTop = {
          normal : {
            label : {
              show : false,
              position : 'center',
              formatter : '{b}',
              textStyle: {
                baseline : 'bottom'
              }
            },
            labelLine : {
              show : false
            }
          }
        };
        var labelFromatter = {
          normal : {
            label : {
              formatter : function (params){
                return  params.value + '%'
              },
              textStyle: {
                baseline : 'top'
              }
            },
            color:['pink']
          },
        };
        var labelBottom = {
          normal : {
            color: 'black',
            label : {
              show : true,
              position : 'center'
            },
            labelLine : {
              show : false
            }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        };
        var radius = [40, 55];
        myChart1.setOption({
          legend: {
            x : 'center',
            y : 'center'/*,
		        data:[ 'Messenger', 'Whatsapp', 'Instagram']*/
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    width: '20%',
                    height: '30%',
                    itemStyle : {
                      normal : {
                        label : {
                          formatter : function (params){
                            return 'other' + params.value + '%\n'
                          },
                          textStyle: {
                            baseline : 'middle'
                          }
                        }
                      },
                    }
                  }
                }
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              type : 'pie',
              center : ['20%', '40%'],
              radius : radius,
              x:'60%', // for funnel
              itemStyle : labelFromatter,
              data : [
                {name:'other', value:manValue, itemStyle : labelBottom},
                {name:'total', value:total,itemStyle : labelTop}
              ]
            },
            {
              type : 'pie',
              center : ['50%', '40%'],
              radius : radius,
              x:'80%', // for funnel
              itemStyle : labelFromatter,
              data : [
                {name:'other', value:womanValue, itemStyle : labelBottom},
                {name:'total', value:total,itemStyle : labelTop}
              ]
            },
            {
              type : 'pie',
              center : ['80%', '40%'],
              radius : radius,
              x: '0%',    // for funnel
              itemStyle : labelFromatter,
              data : [
                {name:'other', value:who, itemStyle : labelBottom},
                {name:'total', value:total,itemStyle : labelTop}
              ]
            }
          ]
        });

        //年龄段统计
        var myChartPancake = echarts.init(document.getElementById("pancake"));
        var weatherIcons = {
          'Sunny': './data/asset/img/weather/sunny_128.png',
          'Cloudy': './data/asset/img/weather/cloudy_128.png',
          'Showers': './data/asset/img/weather/showers_128.png'
        };
        var data=[
          {value:1548, name: '青年'},
          {value:300, name: '少年'},
          {value:120, name: '童年'},
          {value:634, name: '中年'},
          {value:735, name: '老年'}
        ];
        var p = [' (18~40岁)：',' (7~17岁)：',' (0~7岁)：',' (41~65岁)：',' (65岁以后)：'];
        myChartPancake.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          legend: {
            formatter:  function(name){
              var total = 0;
              var target;
              for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
                if (data[i].name == name) {
                  target = data[i].value;
                  name = name+ p[i];
                }
              }
              return name + '' + ((target/total)*100).toFixed(0) + '%';
            },
            icon: 'circle',
            orient: 'vertical',
            right: '12%',
            top:'middle',
            data: ['青年','童年','少年','中年','老年'],
            textStyle:{color:"#fff"}
          },
          series : [
            {
              name: '',
              type: 'pie',
              radius : '55%',
              center: ['30%', '45%'],
              data:[
                {value:1548, name: '青年'},
                {value:300, name: '少年'},
                {value:120, name: '童年'},
                {value:634, name: '中年'},
                {value:735, name: '老年'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },{
              "name": "CPU分配率 外圈",
              center: ['30%', '45%'],
              "radius": ["59%", "60%"],
              "clockWise": true, //鼠标滑过无状态
              "hoverAnimation": false,
              "type": "pie",
              "data": [{
                "value": 84,
                "name": "",
                "label": {
                  "normal": {"show": true}
                },
                "labelLine": {
                  "show": false
                },
                "itemStyle": {
                  "normal": {
                    "borderColor": new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#fff'
                    }]),
                    "borderWidth": 0.5
                  }
                },
              }],
            }
          ],
          color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
        });


        //出行人数
        var myChartpie = echarts.init(document.getElementById("pie1"));
        var weatherIcons = {
          'Sunny': './data/asset/img/weather/sunny_128.png',
          'Cloudy': './data/asset/img/weather/cloudy_128.png',
          'Showers': './data/asset/img/weather/showers_128.png'
        };
        var data1 = [
          {value:1548, name: '1人'},
          {value:535, name: '4人'},
          {value:510, name: '5人'},
          {value:634, name: '3人'},
          {value:735, name: '2人'}
        ];
        myChartpie.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            //图例自定义文本设置
            formatter:  function(name){
              var total = 0;
              var target;
              for (var i = 0, l = data.length; i < l; i++) {
                total += data1[i].value;
                if (data1[i].name == name) {
                  target = data1[i].value;
                }
              }
              return name + '占比：' + ((target/total)*100).toFixed(0) + '%';
            },
            icon: 'circle',
            orient: 'vertical',
            right: '15%',
            top:'middle',
            data: ['1人','2人','3人','4人','5人'],
            textStyle:{color:"#fff"}
          },
          series : [
            {
              type: 'pie',
              radius : '55%',
              center: ['30%', '45%'],
              data:[
                {value:1548, name: '1人'},
                {value:535, name: '4人'},
                {value:510, name: '5人'},
                {value:634, name: '3人'},
                {value:735, name: '2人'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color:['#ef4ca7','#91d4f1','#367adf','#47c6a8','#f3e5b4']
        });


        //地图
//        var myChartMap = echarts.init(document.getElementById("map"));
//        myChartMap.setOption({
//          tooltip: {
//            trigger: 'item',
//            formatter: '{b}'
//          },
//          series: [
//            {
//              name: '中国',
//              type: 'map',
//              mapType: 'china',
//              selectedMode : 'multiple',
//              label: {
//                normal: {
//                  show: true
//                },
//                emphasis: {
//                  show: true
//                }
//              },
//              data:[
//                {name:'安徽', selected:true}
//              ]
//            }
//          ]
//        });

        //区域游客统计
        var myChartBar = echarts.init(document.getElementById("bar"));
        myChartBar.setOption({
          title : {
            text : 'Top前十区域游客统计',
            y:10,
            x : 'center'  ,
            textStyle:{
              color:'#fff',
              fontSize:14
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis : [
            {
              type : 'category',
              data : [
                {value:'安徽',textStyle:{color:'#fff',fontSize:10}},
                {value:'江苏',textStyle:{color:'#fff',fontSize:10}},
                {value:'上海',textStyle:{color:'#fff',fontSize:10}},
                {value:'福建',textStyle:{color:'#fff',fontSize:10}},
                {value:'浙江',textStyle:{color:'#fff',fontSize:10}},
                {value:'湖北',textStyle:{color:'#fff',fontSize:10}},
                {value:'山东',textStyle:{color:'#fff',fontSize:10}},
                {value:'广东',textStyle:{color:'#fff',fontSize:10}},
                {value:'四川',textStyle:{color:'#fff',fontSize:10}},
                {value:'河南',textStyle:{color:'#fff',fontSize:10}}
              ],
              axisLine:{show:false},
              axisLabel:{
                width:20
              },
              axisTick: {
                show:false,
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              show:false  //纵坐标显示与否
            }
          ],
          series : [
            {
              type:'bar',
              barWidth: '60%',
              data:[/* 25,52,200,33,350,330,220,130,110,60*/
                {value:25,itemStyle:{normal:{color:'#c0232c',barBorderRadius:5}}},
                {value:52,itemStyle:{normal:{color:'#b5c338',barBorderRadius:5}}},
                {value:200,itemStyle:{normal:{color:'#f8d00f',barBorderRadius:5}}},
                {value:33,itemStyle:{normal:{color:'#fb770b',barBorderRadius:5}}},
                {value:350,itemStyle:{normal:{color:'#26737b',barBorderRadius:5}}},
                {value:330,itemStyle:{normal:{color:'#fb8567',barBorderRadius:5}}},
                {value:220,itemStyle:{normal:{color:'#9aca64',barBorderRadius:5}}},
                {value:130,itemStyle:{normal:{color:'#ffcd65',barBorderRadius:5}}},
                {value:110,itemStyle:{normal:{color:'#f0a53f',barBorderRadius:5}}},
                {value:60,itemStyle:{normal:{color:'#5fc0e1',barBorderRadius:5}}}
              ],
              //顶部数字展示pzr
              itemStyle: {
                normal: {
                  label: {
                    show: true,//是否展示
                    position:'top',
                    color:'#fff',
                    textStyle: {
                      fontSize : '12',
                      fontFamily : '微软雅黑',
                    }
                  },
                  barBorderRadius:5  //圆角
                }
              }
            }

          ]/*,
        color:['#c0232c','#b5c338','#f8d00f','#fb770b','#26737b','#fb8567','#9aca64','#ffcd65','#f0a53f','#5fc0e1']*/
        });

      }
      },
    mounted(){
        this.draw();
      }
    }


</script>
<style>
  *{padding: 0;margin: 0;}
  .mian1{width: 100%;height: 600px;background: slategrey;display: flex;flex-wrap: wrap;}
  .child1{width: 49.9%;height: 50%;background: #273c57;border-right: 1px solid darkred;border-bottom: 1px solid darkred;}
  .child1 .tip{width: 100%;height: 35px;line-height:35px;background: #333;display: flex;color: #fff;}
  .child1 h3{font-weight: 100;font-size: 18px;text-indent: 10px;}
  .tip .right{font-size: 12px;margin-left: 50%;display: flex;}
  .tip  ul li {margin-left:5px;list-style: none;}

  #sale{width:100%;height: 80%;}
  /*.top+ul{width:100%;height: 80%;display: flex; }
  .top+ul li{width: 33%;height: 100%;list-style: none;}*/



  #pancake{width: 100%;height: 250px;}
  #pie1{width: 100%;height: 250px;}


  /*map*/
  .middle1{width: 100%;height: 265px;background: #273c57;display: flex;}
  #bar{width: 50%;height: 100%;}

</style>
