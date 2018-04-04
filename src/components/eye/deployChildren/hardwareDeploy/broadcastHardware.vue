<template>
    <div class="broadHard">
        <div class="title">
            广播信息
        </div>
        <div class="cameraContent">
            <div class="conTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @selectedAll="selectedAll"
                        @fixedInfo="fixedInfo"
                        @choseType="choseType"
                        @toggleList="toggleList">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowBroadCard"
                        ref="multipleTable"
                        :data="broadList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型">
                        </el-table-column>

                        <el-table-column
                            prop="area"
                            label="所属片区">
                        </el-table-column>

                        <el-table-column
                            prop="describe"
                            label="描述">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showBroadDetail(scope.row, '广播信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in broadList" v-if="isShowBroadCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" @click.stop="showBroadDetail(item,'广播信息')">
                            <img src="../../../../../static/img/cameras.png" alt="">
                            <span class="name">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionId}}</span></p>
                            <p class="type">广播类型：<span>{{item.positionType}}</span></p>
                            <p class="describe">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="broadInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="visible=false"
                          @addNewInfo="addBroad"
                          @fixInfo="fixInfo">

                </HardWare>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './camera.vue'
    import HardWare from './hardwareDialog.vue'
    import api from '@/api'

    export default{
        data(){
            return{
                isShowBroadCard:true,
                visible:false,
                broadList:[

                ],
                checkList:[],
                isSelected:false,
                broadInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                isShowLoading:false
            }
        },
        methods:{
            addNewInfo(){
                this.showBroadDetail({},'添加广播信息')
                this.isDisabled=false
            },
            showBroadDetail(info,title){
                this.broadInfo=info
                this.visible=true
                this.title=title

            },
            fixInfo(info){
                let list=this.broadList
                for(let i=0;i<list.length;i++){
                    if(info.id===list[i].id){
                        this.broadList[i]=info
                    }
                }
                this.choseList=this.broadList
            },
            fixedInfo(){
                if(this.choseInfoId.length>0){
                    this.broadList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.broadInfo=item
                        }
                    })
                    this.showBroadDetail(this.broadInfo,'修改广播信息')
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的人员')
                }
            },
            deletInfo(){
                api.broadcast.deleteBroadcast(this.choseInfoId).then(res=>{
                    console.log(res,'删除成功')
                    for(let i=0;i<this.choseInfoId.length;i++){
                        this.broadList=this.broadList.filter((item,index)=>{
                            if(item.id===this.choseInfoId[i]){
                                this.broadList[index].checked=false
                            }
                            return item.id !== this.choseInfoId
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
//                console.log(122)
//                for(let i=0;i<this.choseInfoId.length;i++){
//                    this.broadList=this.broadList.filter((item,index)=>{
//                        if(item.id === this.choseInfoId[i]){
//                            this.choseList[index].checked=false
//                        }
//                        return item.id!==this.choseInfoId[i]
//                    })
//                }
//                this.choseList=this.broadList
            },
            addBroad (info){
                info.id=new Date().getTime()
                this.broadList.push(info)
                this.choseList=this.broadList
            },
            toggleList(type){
                if (type === 'list') {
                    this.isShowBroadCard = false
                }else {
                    this.isShowBroadCard = true
                }
            },
            checked(id){
                console.log(id)
                if(this.choseInfoId.includes(id)){
                    this.choseInfoId = this.choseInfoId.filter((item)=>{
                        return item!== id
                    })
                }else{
                    this.choseInfoId.push(id)
                }
            },
            choseType(type){
                console.log(type)
                if(type.length===0){
                    this.choseList=this.broadList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.choseList=this.broadList.filter((item,index)=>{
                        if(type.includes(item.type)){
                            item.status=true
                        }else if(!type.includes(item.type)){
                            item.status=false
                            console.log(item.type)
                        }
                        return item.status===true
                    })
                }
            },
            selectedAll(state){
                this.choseList=this.broadList.filter((item)=>{
                    if(state==true){
                        item.checked=true
                        this.choseInfoId.push(item.id)
                        return item.checked == true
                    }else{
                        console.log('进入判断')
                        item.checked=false
                        this.choseInfoId=[]
                        return item.checked == false
                    }
                })
                console.log(this.choseInfoId)
            },
            async getAllBroadcast(){
                this.isShowLoading=true
                await api.broadcast.getAllBroadcast().then((res)=>{
                    console.log(res,'这是请求回来的数据')
                    this.isShowLoading=false
                    this.broadList=res.devices
                    for (let i=0;i<this.broadList.length;i++) {
                        this.broadList[i].checked = false
                        this.broadList[i].status = true
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created (){
            this.getAllBroadcast()
//            this.choseList=this.broadList
        },
        components:{
            ScrollContainer,
            Header,
            HardWare

        }
    }

</script>

<style lang="scss" type="text/scss">
    .el-checkbox__label{
        padding-left:rem(5);
        font-size:rem(13);
    }
    .el-checkbox__inner{
        margin-top:rem(5);
    }
</style>

<style lang="scss" type="text/scss" scoped>
    .broadHard{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        .title{
            width:100%;
            padding:rem(5) 0 rem(5) rem(15);
            box-sizing: border-box;
            font-size:rem(16);
            color:#0086b3;
            font-weight:500;
            border-bottom:1px solid #ccc;
        }
        .cameraContent{
            flex:1;
            width:100%;
            padding:0 rem(15);
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            .conTitle{
                width:100%;
                height:rem(30);
                margin-top:rem(10);
                border-bottom: 1px solid #a13309;
            }
            .cameraList{
                width:100%;
                flex:1;
                margin-top:rem(20);
                .personInfo{
                    width:rem(210);
                    height:rem(140);
                    border:1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox{
                        width:100%;
                        height:rem(20);
                        background:#fff;
                        border-top-left-radius:rem(5);
                        border-top-right-radius:rem(5);
                        position:relative;
                        .checkBtn{
                            position:absolute;
                            right:rem(5);
                            top:rem(3);
                            cursor:pointer;
                        }
                    }
                    .personType{
                        /*margin-top:rem(20);*/
                        width:100%;
                        height:rem(25);
                        background:#0086b3;
                        position:relative;
                        font-size:rem(12);
                        img{
                            width:rem(40);
                            height:rem(40);
                            border:2px solid #2c3b47;
                            border-radius: 50%;
                            position:absolute;
                            left:rem(15);
                            top:rem(-10);
                        }
                        span{
                            float:right;
                            margin-right:rem(20);
                            line-height: rem(25);
                            color:#fff;
                        }
                    }
                    .specificInfo{
                        margin-top:rem(10);
                        font-size: rem(14);
                        p{
                            margin-left: rem(15);
                            line-height: rem(22);
                        }
                    }
                }
            }
        }
    }
</style>


