<template>
    <div class="voiceHard">
        <div class="title">
            音响信息
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
                        :data="camera"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
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
                                <span @click="showPersonDetail(scope.row, '摄像头信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in voiceList"
                        v-if="isShowVoiceCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked"
                                @change="checked(item.id)" class="checkBtn">

                            </el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showVoiceDetail(item,'音响信息')">
                            <img src="../../../../static/img/cameras.png" alt="">
                            <span class="type">
                                  {{item.type}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="name">所属区域：<span>{{item.area}}</span></p>
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.describe}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="voiceInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="visible=false"
                          @addNewInfo="addVoice"
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
        data() {
            return {
                voiceList: [],
                visible:false,
                isShowVoiceCard:true,
                isShowLoading:false,
                isDisabled:true,
                choseInfoId:[],
            }
        },
        methods:{
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showVoiceDetail({},'添加音响信息')
                this.isDisabled = false
            },
            showVoiceDetail(info,title){
                this.voiceInfo= info
                this.visible=true
                this.title=title
            },
            fixInfo(info){

            },
            fixedInfo(id){
                if(id){
                    this.choseInfoId.push(id)
                }
                if(this.choseInfoId.length>1){
                    this.message.warning('至多选择一条数据')
                    return
                }

            },
            deletInfo(id){

            },
            addVoice(info){
                let index =info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude =info.location.substring(0,index)
                let latitude = info.location.substring(index+1)
                let cameraObj=[{
                    typeId:2,
                    name:info.name,
                    positionType:info.positionType,
                    latitude:latitude,
                    longitude:longitude
                }]
                console.log(cameraObj)
                api.camera.createCamera(cameraObj).then(res =>{
                    this.$message.success('添加成功')
                    this.getAllCamera()
                }).catch(err =>{
                    this.$message.error('添加失败')
                })


            },
            toggleList(type){
                if(type ==='list'){
                    this.isShowVoiceCard=false
                }else{
                    this.isShowVoiceCard=true;
                }
            },
            checked(id){
                this.voiceList = this.voiceList.filter(item =>{
                    if(item.id === id){
                        item.checked =item.checked
                    }
                    return item
                })
                console.log(id)
                if(this.choseInfoId.includes(id)){
                    this.choseInfoId = this.choseInfoId.filter((item)=>{
                        return item!==id
                    })
                }else{
                    this.choseInfoId.push(id)
                }
            },
            async getAllCamera(){
                this.isShowLoading=true
                await api.camera.getAllCamera().then((res) =>{
                    this.isShowLoading = false
                    this.voiceList=res.devices
                    for(let i=0;i<this.voiceList.length;i++){
                        this.voiceList[i].checked=false
                        this.voiceList[i].status=true

                    }
                }).catch((err) =>{
                    console.log(err)
                })
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
    .voiceHard{
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


