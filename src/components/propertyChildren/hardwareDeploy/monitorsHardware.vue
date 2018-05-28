<template>
    <div class="monitorsHard">
        <div class="title">
            传感器信息
        </div>
        <div class="cameraContent">
            <div class="conTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @selectedAll="selectedAll"
                        @fixedInfo="fixedInfo"
                        :choseId="choseInfoId"
                        :listsLength = "listLength"
                        @searchAnything="searchAnything"
                        :personListFlag="selectFlag"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllMonitor="getAllMonitor">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowMonitorsCard"
                        ref="multipleTable"
                        :data="monitorsList"
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
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述">
                        </el-table-column>

                        <el-table-column label="操作">

                            <template slot-scope="scope">
                                <span @click="showMonitorDetail(scope.row, '传感器信息',true)">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="item in monitorsList" v-if="isShowMonitorsCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>

                        </div>
                        <div class="personType" @click.stop="showMonitorDetail(item,'传感器信息',true)">
                            <!--<img src="../../../../static/img/environmentCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="monitorInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addMonitors"
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

    export default{
        data(){
            return{
                selectFlag:false,
                tempSelects:[],
                isShowMonitorsCard:true,
                visible:false,
                monitorsList:[

                ],
                checkList:[],
                isSelected:false,
                monitorInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                isShowLoading:false,
                currentNum: 50,
                listLength: '',
                pageNum: 1
            }
        },
        methods:{
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/environmentCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllMonitor()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.monitorsList = this.checkList.filter(item => {
                        if (item.regionName.includes(info)) {
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
                } else {
                    this.getAllMonitor()
                }
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showMonitorDetail({},'添加传感器信息',false)
                this.isDisabled=false
            },
            showMonitorDetail(info,title,state){
                this.monitorInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title

            },
            async fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let monitorsObj =[{
                    typeId: 6,
                    id:info.id,
                    sensorType:info.sensorType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    port:info.port,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        monitorsObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    monitorsObj[0].pictureId = info.pictureId
                }
                await api.monitor.updateMonitor(monitorsObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllMonitor()
                }).catch(err =>{
                    this.$message.error('修改失败,请稍后再试')
                })
            },
            fixedInfo(id){
                if(id){
                    this.choseInfoId.push(id)
                }
                if(this.choseInfoId.length>1){
                    this.$message.warning('至多选择一条数据')
                    return
                }
                if(this.choseInfoId.length>0){
                    this.monitorsList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.monitorInfo=item
                        }
                    })
                    this.showMonitorDetail(this.monitorInfo,'修改传感器信息',false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的传感器')
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
                        api.monitor.deleteMonitor(this.choseInfoId).then(res=>{
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.monitorsList=this.monitorsList.filter((item,index)=>{
                            //         if(item.id === this.choseInfoId[i]){
                            //             this.monitorsList[index].checked=false
                            //         }
                            //         return item.id!==this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllMonitor()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllCamera()
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
            async addMonitors(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude  = info.location.substring(index + 1)
                let monitorsObj =[{
                    typeId: 6,
                    sensorType:info.sensorType,
                    name:info.name,
                    model:info.model,
                    /*ip:info.ip,*/
                    mac:info.mac,
                    port:info.port,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        monitorsObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.monitor.createMonitor(monitorsObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('添加成功')
                    this.getAllMonitor()
                }).catch(err =>{
                    this.$message.error('添加失败,请稍后再试')
                })
            },
            toggleList (type){
                if(type==='list'){
                    this.isShowMonitorsCard=false
                }else{
                    this.isShowMonitorsCard=true
                }
            },
            checked(id){
                this.tempSelects=[];
                this.monitorsList = this.monitorsList.filter(item => {
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
                this.monitorsList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.monitorsList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                if(type.length===0){
                    this.monitorsList=this.monitorsList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.monitorsList=this.monitorsList.filter((item,index)=>{
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
                this.monitorsList=this.monitorsList.filter((item)=>{
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
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllMonitor()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllMonitor()
            },
            async getAllMonitor(){
                this.choseInfoId=[];//
                this.isShowLoading=true
                await api.monitor.getAllMonitor().then((res)=>{
                    console.log(res,'这是请求')
                    this.listLength = res.devices.length
                    this.isShowLoading=false
                    this.monitorsList=res.devices
                    this.monitorsList = this.monitorsList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })

                    for (let i=0;i<this.monitorsList.length;i++){
                        this.monitorsList[i].checked=false
                        this.monitorsList[i].status=true
                        this.monitorsList[i].id=this.monitorsList[i].id
                        this.monitorsList[i].mac=this.monitorsList[i].mac
                        this.monitorsList[i].location=`${this.monitorsList[i].longitude},${this.monitorsList[i].latitude}`
                        this.monitorsList[i].byTime = -(new Date(this.monitorsList[i].modifyTime)).getTime()
                    }
                    this.monitorsList = _.sortBy(this.monitorsList,'byTime')
                    this.checkList = this.monitorsList

                    this.selectFlag=false

                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created (){
            this.getAllMonitor()
        },
        components:{
            ScrollContainer,
            Header,
            HardWare

        }
    }

</script>

<style lang="scss" type="text/scss">
    .monitorsHard{
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
    .monitorsHard{
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


