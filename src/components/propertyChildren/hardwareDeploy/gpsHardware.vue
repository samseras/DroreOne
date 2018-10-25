<template>
    <div class="gpsHard">
        <div class="title">
            GPS
        </div>
        <div class="gpsContent">
            <div class="conTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @selectedAll="selectedAll"
                        @fixedInfo="fixedInfo"
                        :choseId="choseInfoId"
                        @searchAnything="searchAnything"
                        :personListFlag="selectFlag"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllGps="getAllGps">
                </Header>
            </div>

            <div class="gpsList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowGpsCard && !show"
                        ref="multipleTable"
                        :data="gpsList"
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
                            prop="serialNum"
                            label="设备编号">
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="设备IP">
                        </el-table-column>
                        <el-table-column
                            prop="model"
                            label="型号">
                        </el-table-column>

                        <el-table-column
                            label="描述">
                            <template slot-scope="scope">
                                <div class="box" v-if="scope.row.description">
                                    <div class="bottom">
                                        <el-tooltip class="item" effect="light" :content=scope.row.description placement="bottom">
                                            <el-button>{{scope.row.description}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="操作"
                            width="150">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showGpsDetail(scope.row, 'GPS信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in gpsList" v-if="isShowGpsCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>

                        </div>
                        <div class="personType" @click.stop="showGpsDetail(item,'GPS信息',true)">
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.name}}
                            </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="gpsInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addGps"
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
    import _ from 'lodash'
    import {mapMutations, mapGetters} from 'vuex'

    export default{
        data(){
            return{
                allGpsList: [],
                selectFlag:false,
                tempSelects:[],
                isShowGpsCard:true,
                visible:false,
                gpsList:[

                ],
                checkList:[],
                isSelected:false,
                gpsInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                show:false,
                isShowLoading:false,
                currentNum: 50,
                filterCondition: ''
            }
        },
        methods:{
            ...mapMutations(['TOTAL_NUM','CURRENT_NUM']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/gpsCard.png'

                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllGps()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    this.gpsList = this.allGpsList.filter(item => {
                        if (item.regionName && item.regionName.includes(info)) {
                            return item
                        }
                        if (item.ip && item.ip.includes(info)) {
                            return item
                        }
                        if (item.name.includes(info)) {
                            return item
                        }
                        if (item.modelName && item.modelName.includes(info)) {
                            return item
                        }
                        if (item.description && item.description.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: this.gpsList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                } else {
                    this.getAllGps()
                }
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showGpsDetail({},'添加GPS信息',false)
                this.isDisabled=false
            },
            showGpsDetail(info,title,state){
                this.gpsInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title

            },
            async fixInfo(info){
                let gpsObj =[{
                    typeId: 9,
                    id:info.id,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    mac:info.mac,
                    port:info.port,
                    serialNum:info.serialNum,
                    description:info.description
                }]
                await api.gps.updateGps(gpsObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllGps()
                }).catch(err =>{
                    this.$message.error('修改失败,请稍后再试')
                })
            },
            fixedInfo(id){
                if(id){
                    this.choseInfoId = [id]
                }
                if(this.choseInfoId.length>1){
                    this.$message.warning('至多选择一条数据')
                    return
                }
                if(this.choseInfoId.length>0){
                    this.gpsList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.gpsInfo=item
                        }
                    })
                    this.showGpsDetail(this.gpsInfo,'修改GPS信息',false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的GPS')
                }
            },
            deletInfo(id){
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.gps.deleteGps(this.choseInfoId).then(res=>{
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.gpsList=this.gpsList.filter((item,index)=>{
                            //         if(item.id === this.choseInfoId[i]){
                            //             this.gpsList[index].checked=false
                            //         }
                            //         return item.id!==this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllGps()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
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
            async addGps(info){
                let gpsObj =[{
                    typeId: 9,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    mac:info.mac,
                    port:info.port,
                    serialNum:info.serialNum,
                    description:info.description
                }]
                await api.gps.createGps(gpsObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('添加成功')
                    this.getAllGps()
                }).catch(err =>{
                    this.$message.error('添加失败,请稍后再试')
                })
            },
            toggleList (type){
                if(type==='list'){
                    this.isShowGpsCard=false
                }else{
                    this.isShowGpsCard=true
                }
            },
            checked(id){
                this.tempSelects=[];
                this.gpsList = this.gpsList.filter(item => {
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
                let that=this;
                this.gpsList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.gpsList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                if(type.length===0){
                    this.gpsList=this.checkList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.gpsList=this.checkList.filter((item,index)=>{
                        if(type.includes(item.type)){
                            item.status=true
                        }else {
                            item.status=false
                            console.log(item.type)
                        }
                        return item.status===true
                    })
                }
            },
            selectedAll(state){
                this.gpsList=this.gpsList.filter((item)=>{
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
                this.selectFlag=true
                console.log(this.choseInfoId)
            },
            async getAllGps(){
                this.choseInfoId=[];//
                this.isShowLoading=true
                await api.gps.getAllGps().then((res)=>{
                    console.log(res,'这是请求')
                    if(res.devices.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }
                    this.isShowLoading=false
                    this.allGpsList=res.devices

                    for (let i=0;i<this.allGpsList.length;i++){
                        this.allGpsList[i].checked=false
                        this.allGpsList[i].status=true
                        this.allGpsList[i].modifyTime=this.allGpsList[i].modifyTime.replace("-","/")
                        this.allGpsList[i].byTime = -(new Date(this.allGpsList[i].modifyTime)).getTime()
                    }
                    this.allGpsList = _.sortBy(this.allGpsList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allGpsList = this.filterDataList(this.allGpsList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allGpsList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.gpsList = this.allGpsList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.checkList = this.gpsList

                    this.selectFlag=false

                }).catch((err)=>{
                    console.log(err)
                })
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if (item.regionName && item.regionName.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.ip && item.ip.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.name.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.modelName && item.modelName.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.description && item.description.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            }
        },
        created (){
            this.getAllGps()
        },
        components:{
            ScrollContainer,
            Header,
            HardWare

        },
        watch: {
            getCurrentNum () {
                this.getAllGps()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" type="text/scss">
    .gpsHard{
        .gpsList .box .el-tooltip{
            background: transparent;
            text-align: left;
            border: none;
            padding: 0;
        }
        .gpsList .box .el-button span{
            display:inline-block;
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }

</style>

<style lang="scss" type="text/scss" scoped>
    .gpsHard{
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
        .gpsContent{
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
            .gpsList{
                width:100%;
                flex:1;
                margin-top:rem(20);
                .personInfo {
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox {
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                        .checkBtn {
                            float: right;
                            margin-right: rem(5);
                            /*margin-top: rem(3);*/
                            width: rem(15);
                            height: rem(15);
                            cursor: pointer;
                        }
                    }
                    .personType {
                        width: 100%;
                        height: rem(20);
                        background: #0086b3;
                        position: relative;
                        font-size: rem(12);
                        img {
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);
                            background: red;
                        }
                        span {
                            display: inline-block;
                            width: rem(100);
                            float: right;
                            text-align: right;
                            padding-right: rem(5);
                            line-height: rem(20);
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            box-sizing: border-box;
                        }
                    }
                    .specificInfo {
                        margin-top: rem(10);
                        font-size: rem(12);
                        p {
                            margin-left: rem(10);
                            line-height: rem(22);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                .tip{
                    width:100%;
                    height:rem(40);
                    text-align: center;
                    color: #909399;
                    line-height: rem(40);
                }
                .handle{
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>


