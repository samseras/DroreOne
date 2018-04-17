<template>
    <div class="lightList">
        <div class="title">
            路灯信息
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
                        v-if="!isShowLightDetail"
                        ref="multipleTable"
                        :data="lightList"
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
                            label="名称">
                        </el-table-column>

                        <el-table-column
                            prop="lightStatus"
                            label="状态">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.positionType |changeFilter }}
                                </span>
                            </template>

                        </el-table-column>

                        <el-table-column
                            prop="manufactor"
                            label="厂家">
                        </el-table-column>

                        <el-table-column
                            prop="serialNum"
                            label="路灯型号">
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showLightDetail(scope.row, '路灯信息')">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in lightList" v-if="isShowLightDetail && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showLightDetail(item,'路灯信息')">
                            <img src="../../../../static/img/cameras.png" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="type">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.lightStatus | changeFilter}}</span></p>
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="lightInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="visible=false"
                          @addNewInfo="addLight"
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
                isShowLightDetail:true,
                visible:false,
                lightList:[
                    {id:1,name:'路灯编号',type:'已通电',area:'A-片区',describe:'路灯介绍'},
                    {id:2,name:'路灯编号',type:'已通电',area:'A-片区',describe:'路灯介绍'},
                    {id:4,name:'路灯编号',type:'已通电',area:'A-片区',describe:'路灯介绍'},
                    {id:5,name:'路灯编号',type:'已通电',area:'A-片区',describe:'路灯介绍'},
                    {id:6,name:'路灯编号',type:'已通电',area:'A-片区',describe:'路灯介绍'}
                ],
                checkList:[],
                isSelected:false,
                lightInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                isShowLoading:false
            }
        },
        methods:{
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showLightDetail({},'添加路灯信息')
                this.isDisabled=false
            },
            showLightDetail(info,title){
                this.lightInfo=info
                this.visible=true
                this.title=title

            },
            fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let lightObj=[{
                    typeId: 5,
                    id:info.id,
                    lightStatus:info.lightStatus,
                    name:info.name,
                    manufactor:info.manufactor,
                    serialNum:info.serialNum,
                    model:info.model,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                api.light.updateLight(lightObj).then(res =>{
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllLight()
                }).catch(err =>{
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
                    this.lightList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.lightInfo=item
                        }
                    })
                    this.showLightDetail(this.lightInfo,'修改路灯信息')
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的路灯')
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
                        api.light.deleteLight(this.choseInfoId).then(res =>{
                            for(let i=0;i<this.choseInfoId.length;i++){
                                this.lightList=this.lightList.filter((item,index) =>{
                                    if(item.id===this.choseInfoId[i]){
                                        this.lightList[index].checked=false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId=[]
                        }).catch(err =>{
                            this.$message.error('删除失败')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的数据')
                }

            },

            addLight(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let lightObj=[{
                    typeId: 5,
                    lightStatus:info.lightStatus,
                    name:info.name,
                    manufactor:info.manufactor,
                    serialNum:info.serialNum,
                    model:info.model,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                api.light.createLight(lightObj).then(res =>{
                    this.$message.success('添加成功')
                    this.getAllLight()
                }).catch(err =>{
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            toggleList (type){
                if(type==='list'){
                    this.isShowLightDetail=false
                }else{
                    this.isShowLightDetail=true
                }
            },
            checked(id){
                this.lightList = this.lightList.filter(item => {
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
                    this.choseList=this.lightList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.choseList=this.lightList.filter((item,index)=>{
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
                this.choseList=this.lightList.filter((item)=>{
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
            async getAllLight(){
                this.isShowLoading=true
                await api.light.getAllLight().then((res)=>{
                    console.log(res,'这是请求的数据')
                    this.isShowLoading=false
                    this.lightList=res.devices
                    for (let i=0;i<this.lightList.length;i++){

                        this.lightList[i].checked=false
                        this.lightList[i].status=true

                        this.lightList[i].location=`${this.lightList[i].latitude},${this.lightList[i].longitude}`
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created (){
            this.getAllLight()

       },
       filters:{
            changeFilter(item){
                  if(item){
                      return '通电'
                  }else{
                      return '断电'
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
    .lightList{
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
    .lightList{
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

