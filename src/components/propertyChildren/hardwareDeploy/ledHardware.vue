<template>
    <div class="ledList">
        <div class="title">
            LED信息
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
                        v-if="!isShowLedCard"
                        ref="multipleTable"
                        :data="ledList"
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
                            label="LED类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.positionType | changeFilter}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>

                        <el-table-column
                            prop="describe"
                            label="描述">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showLedDetail(scope.row, 'LED大屏信息')">查看</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in ledList" v-if="isShowLedCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showLedDetail(item,'LED信息')">
                            <img src="../../../../static/img/cameras.png" alt="">
                            <span class="name">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="type">LED类型：<span>{{item.positionType | changeFilter}}</span></p>
                            <p class="describe">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="ledInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="visible=false"
                          @addNewInfo="addLed"
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
                isShowLedCard:true,
                visible:false,
                ledList:[

                ],
                checkList:[],
                isSelected:false,
                ledInfo:{},
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
            addNewInfo(){
                this.showLedDetail({},'添加LED大屏信息')
                this.isDisabled=false
            },
            showLedDetail(info,title){
                this.ledInfo=info
                this.visible=true
                this.title=title

            },
            fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0,index)
                let longitude = info.location.substring(index+1)
                let item = info.area.includes(',')?info.area.indexOf(','):info.area.indexOf('，')
                let screenWidth=info.area.substring(0,item)
                let screenHeight = info.area.substring(item + 1)
                let ledObj=[{
                    typeId: 4,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    ip:info.ip,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude,
                    screenWidth:screenWidth,
                    screenHeight:screenHeight
                }]
                api.led.updateLed(ledObj).then(res =>{
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllLed()
                }).catch(err =>{
                    this.$message.error('修改失败,请稍后再试')
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
                    this.ledList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.ledInfo=item
                        }
                    })
                    this.showLedDetail(this.ledInfo,'修改LED信息')
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的LED')
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
                        api.led.deleteLed(this.choseInfoId).then(res =>{
                            for(let i=0;i<this.choseInfoId.length;i++){
                                this.ledList=this.ledList.filter((item,index)=>{
                                    if(item.id ===this.choseInfoId[i]){
                                        this.ledList[index].checked=false
                                    }
                                    return item.id!==this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId=[]
                        }).catch(err=>{
                            this.$message.error('删除失败，请稍后再试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的数据')
                }
            },
            addLed (info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let item = info.area.includes(',')?info.area.indexOf(','):info.area.indexOf('，')
                let screenWidth=info.area.substring(0,item)
                let screenHeight = info.area.substring(item + 1)
                let ledObj=[{
                    typeId: 4,
                    positionType:info.positionType,
                    name:info.name,
                    ip:info.ip,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude,
                    screenWidth:screenWidth,
                    screenHeight:screenHeight
                }]
                api.led.createLed(ledObj).then(res =>{
                    this.$message.success('添加成功')
                    this.getAllLed()
                }).catch(err =>{
                    this.$message.error('添加失败，请稍后再试')
                })
            },
            toggleList(type){
                if (type === 'list') {
                    this.isShowLedCard = false
                }else {
                    this.isShowLedCard = true
                }
            },
            checked(id){
                this.ledList = this.ledList.filter(item => {
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
                    this.choseList=this.ledList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.choseList=this.ledList.filter((item,index)=>{
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
                this.ledList=this.ledList.filter((item)=>{
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
            async getAllLed(){
                this.isShowLoading=true
                await api.led.getAllLed().then((res)=>{
                    console.log(res,'这是请求的数据')
                    this.isShowLoading=false
                    this.ledList=res.devices
                    for (let i=0;i<this.ledList.length;i++){
                        this.ledList[i].checked=false
                        this.ledList[i].status=true
                        this.ledList[i].id = this.ledList[i].id
                        this.ledList[i].location=`${this.ledList[i].latitude},${this.ledList[i].longitude}`
                        this.ledList[i].area=`${this.ledList[i].screenWidth},${this.ledList[i].screenHeight}`
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created (){
            this.getAllLed()
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
    .ledList{
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



