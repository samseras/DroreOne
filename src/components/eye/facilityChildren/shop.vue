

<template>
    <div class="shop">
        <!--顶部-->
        <div class="top">
            <h5>商品列表</h5>
            <ul>
                <li><img src="../../../../static/img/search.png" alt=""></li>
            </ul>
        </div>
        <!--搜索-->
        <input  id="search" placeholder="商品名称">
        <div class="middle">
            <div>
                <el-checkbox style="color:#0FA7E8">商铺个数24个</el-checkbox>
            </div>
            <div class="bottom">
                <div class="content" v-for="(item,index) in datal">
                    <div class="top">
                        <span style="color:#151212">{{item.title}}</span>
                        <el-button type="warning">{{item.content}}</el-button>
                    </div>
                    <div class="down" style="color: #9B9898;">
                        <span>容量{{item.total}}个</span>
                        <span>当前人数{{item.spare}}个</span>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>
<script>
       import shopingData from "../../../../API/shop.json"


//    const park=[
//        {title:"肯德基",content:"充裕",total:"300",spare:"140"},
//        {title:"星巴克咖啡",content:"紧张",total:"300",spare:"240"}
//    ];
    export default{
        data(){
            return{
                datal:'',
//                isShow:true
            }
        },
        methods:{
//            pay(){
//                shopingData.getShopData((data)=>{
//                    console.log(data);
//                })
//            }
        },
        created:function(){
//            console.log(shopingData.park);
            this.datal=shopingData.park;
        },
        mounted(){
//            this.pay();
        }
    }

</script>
<style>
    *{margin:0;padding:0;}
    ul,li{list-style:none;padding:0;}
    .shop{width:100%;height:100%;}
    .shop>div.top{width:100%;height:40px;line-height:40px;display: flex;
    justify-content:space-between;background:#FAFAFA;}
    div.top>h5{margin-left:15px;}
    div.top>ul>li{margin:0 10px;}
    #search{width:88%;margin:5px 10px;text-indent: 10px;font-size:10px;
    color:#646464;height:20px;}
    .middle{width:100%;line-height:30px;background:#fff;overflow:hidden;}
    .middle>div:first-child{width:100%;height:45px;line-height:45px;
    border-bottom:1px solid #ccc;}
    .el-checkbox{margin-left:10px;}
    /*.middle .bottom{width:100%;}*/
    .content{max-height: 700px;overflow:auto;border-bottom:1px solid #ccc;padding:7px 10px;}
    .content .top{height:30px;}
    .top>span{margin-right:20px;width:100px;box-sizing: border-box;font-size:14px;
    display: inline-block;}
    .el-button{padding:4px 20px;}
    .down{font-size:12px;color:#bcbcbc;}
    .down>span:first-child{margin-right:60px;}

</style>
