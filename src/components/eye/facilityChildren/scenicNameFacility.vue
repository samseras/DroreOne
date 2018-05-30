<template>
    <div class="indicator">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>景点列表</h5>
                <ul>
                    <!--<li>-->
                    <!--<el-switch-->
                    <!--v-model="open"-->
                    <!--active-color="#53b6a7"-->
                    <!--inactive-color="#808080">-->
                    <!--</el-switch>-->
                    <!--</li>-->
                    <!--<li><img src="../../../../static/img/search.png" class="search" alt=""/></li>-->
                </ul>
            </div>
            <div class="middle">
                <!--&lt;!&ndash;搜索&ndash;&gt;-->
                <!--<div class="list_search">-->
                <!--<input id="search" type="text" placeholder="设备名称,组名称"/>-->
                <!--</div>-->
                <!--<div class="manage">-->
                <!--<el-checkbox class="check" @change="selectAllCheck">路灯总数<font>{{this.number}}</font>个</el-checkbox>-->
                <!--<el-checkbox class="check">故障<font>{{this.fault}}</font>个</el-checkbox>-->
                <!--</div>-->
                <div class="boottom" id="ztree">
                    <!--广播-->
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="lightInfo"
                            :lightCheckout="lightCheckout"
                            :regionId="regionId"
                            :lightList="lightList"
                            :number="number"
                            :fault="fault">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import broadcastZtree from "./children/buildzTree.vue"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                open:false,
                isShow: true,
                options: [],
                value: '',
                number: '0',
                fault: '0',
                optionMisic: [],
                isShowBroadCard: false,
                lightInfo: [],
                lightCheckout:[],
                regionId:[],
                lightList:[],
                selectAll:[],
                title:'景点'
            }
        },
        components: {
            broadcastZtree,
            ScrollContainer
        },
        methods: {
            treeShow(){
                console.log(this.getfacilityScenic)
                if(this.getfacilityScenic){
                    this.lightCheckout=this.getfacilityScenic
                }
            },
            showBroadCard() {
                console.log(777)
                this.isShowBroadCard = true
            },
            newagenda: function () {
                $(".newagenda").show();

            },
            async getAllLight(){
                await api.scenic.getAllScenic().then((res) => {
                    console.log(res,'这是请求的数据ddd')
                    this.lightList=res
                    this.number=this.lightList.length
                    let regionIdList = []
                    let arr = []
                    let idList = []
                    let noRegion = {
                        label: '未知片区设备',
                        id: '10010',
                        type:'scenic',
                        children:[]
                    }
                    this.lightList.forEach(item => {
                        if (item.regionId && !this.regionId.includes(item.regionId)) {
                            this.regionId.push(item.regionId)
                        }
                    })
                    this.regionId.push('10010')
                    this.lightList.forEach(item => {
                        item.label = item.scenicspotBean.name
                        item.id =  item.scenicspotBean.id
                        item.type = 'scenic'
                        item.icon = '../../../static/img/scenic_big.svg'
                        if (item.regionId) {
                            if (!regionIdList.includes(item.regionId)){
                                regionIdList.push(item.regionId)
                                let obj = {
                                    label: item.regionName,
                                    type:'scenic',
                                    id: item.regionId,
                                    children:[]
                                }
                                arr.push(obj)
                            }
                            arr.forEach(item1 => {
                                if (item1.id == item.regionId){
                                    if (item1.children.length< 1) {
                                        item1.children.push(item)
                                    } else {
                                        item1.children.forEach(item2 => {
                                            if (!idList.includes(item2.id)){
                                                idList.push(item.id)
                                                item1.children.push(item)
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            noRegion.children.push(item)
                        }
                    })
                    if (noRegion.children.length > 0) {
                        arr.push(noRegion)
                    }
                    this.lightInfo = arr
                    console.log(this.lightInfo,'16565623');
                }).catch(err =>{
                    console.log(err)
                })
            },
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {
            this.getAllLight();
        },
        computed: {
            ...mapGetters(['getfacilityScenic'])
        }
    }
</script>

<style lang="scss" scoped>
    .indicator {
        width: 100%;
        height: 100%;
        .reveal {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #f2f2f2;
            .top {
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                background: #fff;
                h5 {
                    margin-left: 15px;
                }
                ul {
                    display: flex;
                    li {
                        margin: 0 5px;
                        .search{
                            width: 18px;
                            vertical-align: middle;
                            cursor: pointer;
                        }
                    }
                }
            }
            .list_search{
                background: #f2f2f2;
                padding: rem(10);
                input {
                    width: 100%;
                    text-indent: 10px;
                    font-size: 10px;
                    color: #646464;
                    height: 22px;
                    border: 1px solid #52c4f2;
                    outline: none;
                }
            }

            .middle {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .manage {
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    border-top: 1px solid #f2f2f2;
                    .check {
                        margin-left: 10px;
                    }
                    .el-checkbox:last-child {
                        color: #f36a5a;
                    }
                }
                .boottom {
                    width: 100%;
                    flex: 1;
                    overflow-y: auto;
                    ::-webkit-scrollbar {
                        width: rem(6);
                    }
                    ::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0);
                    }
                    &:hover{
                        .scroll-container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            overflow: hidden;
                            .scroll-inner {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                overflow: auto;
                                padding-bottom: rem(20);
                                // &::-webkit-scrollbar {
                                // }
                            }
                        }
                        ::-webkit-scrollbar {
                            width: rem(6);
                        }
                        ::-webkit-scrollbar-thumb {
                            position: absolute;
                            right: rem(-10);
                            background: rgba(0, 0, 0, .5);
                            border-radius: rem(6);
                        }
                    }

                }
            }
            .last {
                width: 100%;
                height: 210px;
                overflow: hidden;
                h5 {
                    line-height: 40px;
                    margin-left: 15px;
                }
                h5 + div {
                    width: 100%;
                    height: 170px;
                    background: #fff;
                }
                .broadCard {
                    width: 500px;
                    height: 350px;
                    position: fixed;
                    left: 20%;
                    top: 30%;
                }
            }
            #pie {
                width: 80%;
                height: 95%;
                margin: 0 auto;
                padding-top: 5%;
            }
        }
    }
</style>
