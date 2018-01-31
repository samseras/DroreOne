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
    
    //获取登录用户信息
     static findUser(obj,func){
     	var url = "./user.json"
        /*var url = "http://10.35.171.84:3000/getActByType";*/
        $.ajax({
            url:url,
            type:'post',
            data:obj,
            dataType:'json',
            success:function(data){
                func(data);
            }
        })
    }
       
    
 }
    

