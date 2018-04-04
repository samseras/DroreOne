export default  class Conn {
    constructor(){}


    /**
     * 通过用户编号来获取shopcarts商品信息
     * @param cb
     */
    //页面级数据获取接口
    static getActByType(type,func){
    	var url = "./entrance.json"
        /*var url = "http://10.35.171.84:3000/getActByType";*/
        $.ajax({
            url:url,
            type:'get',
            data:'type='+type,
            dataType:'json',
            success:function(data){
                func(data);
            }
        })
    }
    static getShopData(func){
        var url="D:\\卓锐one\\Drore-one\\新建文件夹\\API\\shop.json";
        alert('1');
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            success:function(data){
                func(data);
            }
        })
    }

   //获取管控页面数据
   static getControlData(func){
     	var url = "http://192.168.0.110:9090/xubin/getDataAll"
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            success:function(data){
                func(data);

            }
        })
    }
  //获取统计页面数据
   static getAnalyzeData(func){
     	var url = "http://192.168.0.110:8090/dsp/service/v1/dashboard/scenarioMaps/1"
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            success:function(data){
            	var analyze = data;
                func(analyze);
            }
        })
    }


 }


