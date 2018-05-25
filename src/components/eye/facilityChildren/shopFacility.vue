<template>
    <div class="shop">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>商铺列表</h5>
                <ul>
                    <li>
                        <img src="../../../../static/img/search.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="middle">
                <div class="bottom" id="ztree">
                    <ScrollContainer>
                        <shop-ztree
                            :title="title"
                            :Info="shopInfo"
                            :shopCheckout="shopCheckout"
                            :shopList="shopList"
                            :number="number"
                            :regionId="regionId">
                        </shop-ztree>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import shopZtree from "./children/shopzTree.vue"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        data(){
            return{
                number:'0',
                shopInfo:[],
                shopCheckout:[],
                regionId:[],
                shopList:[],
                title:'商铺'
            }
        },
        components:{
            shopZtree,
            ScrollContainer
        },
        methods:{
            treeShow(){
                if(this.getcontroleLight){
                    this.shopCheckout= this.getcontroleLight
                }
            },
            async getAllShop(){
                await api.shop.getAllShop().then(res =>{
                    console.log(res,'请求的数据')
                    this.shopList= res
                    this.number = this.shopList.length
                    let regionIdList = []
                    let arr = []
                    let idList = []
                    for(let i=0;i<this.shopList.length;i++){
                        if(this.regionId.indexOf(this.shopList[i].regionId)==-1){
                            this.regionId.push(this.shopList[i].regionId)
                        }
                    }
                    this.shopInfo = arr
                }).catch(err =>{
                    console.log(err)
                })
            }


        },
        created:function () {
            this.treeShow();
        },
        mounted(){
            this.getAllShop();
        },
        computed:{
            ...mapGetters(['getcontroleLight'])
        }
    }

</script>
