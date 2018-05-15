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
                        @downloadInfo="downloadInfo"
                        @search="search"
                        @fixedInfo="fixedInfo"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllBroadcast="getAllBroadcast">
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
                            width="55">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="name"
                            label="名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="positionType"
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.positionType | changeFilter}}</span>
                            </template>
                        </el-table-column>


                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>

                        <el-table-column
                            prop="description"
                            label="描述">
                        </el-table-column>

                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showBroadDetail(scope.row, '广播信息')">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in broadList" v-if="isShowBroadCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showBroadDetail(item,'广播信息')">
                            <img src="../../../../static/img/broadcastCard.png" alt="">
                            <span class="name">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="type">广播类型：<span>{{item.positionType|changeFilter}}</span></p>
                            <p class="describe text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

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
                key:'',
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            search(info){
                if(info !== ''){
                    this.broadList= this.broadList.filter((item) =>{
                       if(item.name.indexOf(info) > -1) {
                           return item
                       }
                    })
                }
//                if(info.trim() !== ''){
//                    this.broadList = this.broadList.filter((item) =>{
//                        if (item.name.includes(info)) {
//                            return item
//                        }
//                    })
//                }
                return this.broadList
            },
            addNewInfo(){
                this.showBroadDetail({},'添加广播信息')
                this.isDisabled=false
            },
            showBroadDetail(info,title){
                this.broadInfo=info
                this.visible=true
                this.title=title

            },
            downloadInfo(){
                if(this.choseInfoId.length >0){
                    api.broadcast.exportBroadcast(this.choseInfoId).then((res) =>{
                        console.log(res,'niaho')
                        const content = res
                        const blob = new Blob([content])
                        const fileName = '测试.csv'
                        if('download' in document.createElement('a')){
                            const elink = document.createElement('a')
                            elink.download = fileName
                            elink.style.display = 'none'
                            elink.href = URL.createObjectURL(blob)
                            document.body.appendChild(elink)
                            elink.click()
                            URL.revokeObjectURL(elink.href) // 释放URL 对象
                            document.body.removeChild(elink)
                        }else{
                            navigator.msSaveBlob(blob, fileName)
                        }
                        this.$message.success('导出成功')
                        this.choseInfoId=[]
                    }).catch(err =>{
                        this.$message.error('导出失败，请稍后再试')
                    })
                }else{
                    api.broadcast.exportAllBroadcast().then((res) =>{
                        console.log(res,'niaho')
                        const content = res
                        const blob = new Blob([content])
                        const fileName = '测试.csv'
                        if('download' in document.createElement('a')){
                            const elink = document.createElement('a')
                            elink.download = fileName
                            elink.style.display = 'none'
                            elink.href = URL.createObjectURL(blob)
                            document.body.appendChild(elink)
                            elink.click()
                            URL.revokeObjectURL(elink.href) // 释放URL 对象
                            document.body.removeChild(elink)
                        }else{
                            navigator.msSaveBlob(blob, fileName)
                        }
                        this.$message.success('导出成功')
                    }).catch(err =>{
                        this.$message.error('导出失败，请稍后再试')
                    })
                }

            },


            fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let broadObj=[{
                    typeId: 2,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                api.broadcast.updateBroadcast(broadObj).then(res =>{
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllBroadcast()
                }).catch(err =>{
                    this.$message.error('修改失败,请稍后再试')
                })
            },
            fixedInfo(id){
//                if(this.choseInfoId.includes(id)){
//
//                    if(this.choseInfoId.length>1){
//                        this.$message.warning('只能选择一条数据')
//                    }else{
//                        this.broadList.map((item)=>{
//                            if(item.id===this.choseInfoId[0]){
//                                this.broadInfo=item
//                            }
//                        })
//                        this.showBroadDetail(this.broadInfo,'修改广播信息')
//                        this.isDisabled = false
//                    }
//                }else {
//                    this.$message.warning('请选择要修改的摄像头')
//                }

                if (id) {
                    this.choseInfoId.push(id)
                }
                if(this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一条数据')
                    return
                }
                if(this.choseInfoId.length > 0){
                    this.broadList.map((item) => {
                        if(item.id === this.choseInfoId[0]){
                            this.broadInfo=item
                        }
                    })
                    this.showBroadDetail(this.broadInfo,'修改广播信息')
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的广播信息')
                }
            },
            deletInfo(id){
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.broadcast.deleteBroadcast(this.choseInfoId).then(res =>{
                            for(let i=0;i<this.choseInfoId.length;i++){
                                this.broadList=this.broadList.filter((item,index)=>{
                                    if(item.id===this.choseInfoId[i]){
                                        this.broadList[index].checked=false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId=[]
                        }).catch(err =>{
                            this.$message.error('删除失败,请稍后重试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的数据')
                }

            },
            addBroad (info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let broadObj=[{
                    typeId: 2,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                api.broadcast.createBroadcast(broadObj).then(res =>{
                    this.$message.success('添加成功')
                    this.getAllBroadcast()
                }).catch(err =>{
                    this.$message.error('添加失败,请稍后再试')
                })
            },
            toggleList(type){
                if (type === 'list') {
                    this.isShowBroadCard = false
                }else {
                    this.isShowBroadCard = true
                }
            },
            checked(id){
                this.broadList = this.broadList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
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
                    this.broadList=this.broadList.filter((item)=>{

                        item.status=true
                        return item
                    })
                }else{
                    this.broadList=this.broadList.filter((item,index)=>{
                            console.log(item.positionType)
                        if (item.positionType == 0) {
                            item.type = '室内'
                        } else{
                            item.type = '室外'
                        }
                        if(type.includes(item.type)){
                            item.status=true
                        }else if(!type.includes(item.type)){
                            item.status=false
                            console.log(item.type)
                            console.log(item.positionType)
                        }
                        return item
                    })
                }
            },
            selectedAll(state){
                this.broadList=this.broadList.filter((item)=>{
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
                        this.broadList[i].id=this.broadList[i].id
                        this.broadList[i].location=`${this.broadList[i].longitude},${this.broadList[i].latitude}`
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.isShowLoading=false
                })
            }
        },
        created (){
            this.getAllBroadcast()
        },
        computed:{

        },
        filters:{
          changeStatus(item){
              if(item==0){
                  return '室内'
              }else{
                  return '室外'
              }
          }
        },
        components:{
            ScrollContainer,
            Header,
            HardWare

        }
    }

</script>

<style lang="scss" type="text/scss">
    .broadHard{
        .el-checkbox__label{
            padding-left:rem(5);
            font-size:rem(13);
        }
        .el-checkbox__inner{
            margin-top:rem(5);
        }
    }

</style>

<style lang="scss" type="text/scss" scoped>
    .broadHard{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
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
                border-bottom: 2px solid #e44b4e;
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
                            top:rem(-2);
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
                        padding:0 rem(10);
                        box-sizing: border-box;
                        p{
                            /*margin-left: rem(15);*/
                            line-height: rem(22);
                            font-size: rem(14);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            span{
                                font-size: rem(13);
                            }
                        }
                        .text{
                            line-height: rem(22);
                            display: inline-block;
                            width: 100%;
                            height: rem(40);
                            white-space: pre-wrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:2;
                        }
                    }
                }
            }
        }
    }
</style>


