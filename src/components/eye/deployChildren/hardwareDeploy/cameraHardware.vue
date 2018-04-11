<template>
    <div class="cameraHard">
        <div class="title">
            摄像头信息
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
                        v-if="!isShowPersonCard"
                        ref="multipleTable"
                        :data="cameraList"
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
                            prop="type"
                            label="状态">
                        </el-table-column>

                        <el-table-column
                            prop="area"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="describe"
                            label="摄像头介绍">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '摄像头信息')">查看</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in cameraList" v-if="isShowPersonCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item,'摄像头信息')">
                            <img src="../../../../../static/img/cameras.png" alt="">
                            <span class="type">
                                  {{item.name}}
                            </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="name">所属区域：<span>{{item.regionId}}</span></p>
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="personInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="visible=false"
                          @addNewInfo="addNewPerson"
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
                isShowPersonCard:true,
                visible:false,
                cameraList:[],
                checkList:[],
                isSelected:false,
                personInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                isShowLoading: false
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showPersonDetail({},'添加摄像头信息')
                this.isDisabled=false
            },
            showPersonDetail(info,title){
                this.personInfo=info
                this.visible=true
                this.title=title

            },
            fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let cameraObj=[{
                    typeId:2,
                    id:info.id,
                    name:info.name,
                    positionType:info.positionType,
                    regionId:info.regionId,
                    manufactor:info.manufactor,
                    port:info.port,
                    ip:info.ip,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                console.log(cameraObj)
                api.camera.updateCamera(cameraObj).then(res=>{
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllCamera()
                }).catch(err=>{
                    this.$message.error('修改失败，请稍后再试')
                })
            },
            fixedInfo(id){
                if (id) {
                    this.choseInfoId.push(id)
                }
                if(this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一条数据')
                    return
                }
                if(this.choseInfoId.length>0){
                    this.cameraList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.personInfo=item
                        }
                    })
                    this.showPersonDetail(this.personInfo,'修改摄像头信息')
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的摄像头')
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
                        api.camera.deleteCamera(this.choseInfoId).then(res=>{
                            console.log(res,'删除成功')
                            for(let i=0;i<this.choseInfoId.length;i++){
                                this.cameraList=this.cameraList.filter((item,index)=>{
                                    if(item.id===this.choseInfoId[i]){
                                        this.cameraList[index].checked=false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId=[]
                        }).catch(err=>{
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })

                } else {
                    this.$message.error('请选择要删除的数据')
                }

            },
            addNewPerson(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let cameraObj=[{
                    typeId:2,
                    name:info.name,
                    positionType:info.positionType,
                    regionId:info.regionId,
                    manufactor:info.manufactor,
                    port:info.port,
                    ip:info.ip,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                console.log(cameraObj)
                api.camera.createCamera(cameraObj).then(res=>{
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllCamera()
                }).catch(err =>{
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            toggleList (type){
                if(type==='list'){
                    this.isShowPersonCard=false
                }else{
                    this.isShowPersonCard=true
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
                    this.choseList=this.cameraList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.choseList=this.cameraList.filter((item,index)=>{
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
                this.cameraList=this.cameraList.filter((item)=>{
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
            async getAllCamera () {
                this.isShowLoading = true
                await api.camera.getAllCamera().then((res) => {
                    console.log(res, '这是请求回来的所有数据')
                    this.isShowLoading = false
                    this.cameraList = res.devices
                    for (let i=0; i < this.cameraList.length; i++) {
                        this.cameraList[i].checked = false
                        this.cameraList[i].status = true
                        this.cameraList[i].id=this.cameraList[i].id
                        this.cameraList[i].location = `${this.cameraList[i].latitude},${this.cameraList[i].longitude}`
                    }
                }).catch((err)=> {
                    console.log(err)
                })
            }
        },
        created (){
//          this.choseList=this.camera
            this.getAllCamera()
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
    .cameraHard{
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

