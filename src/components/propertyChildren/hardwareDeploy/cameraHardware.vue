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
                        @searchAnything="searchAnything"
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @fixedInfo="fixedInfo"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @allDotInfo = 'allDotInfo'
                        @getAllCamera="getAllCamera">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowPersonCard && !show"
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
                            prop="name"
                            label="名称">
                        </el-table-column>

                        <el-table-column
                            prop="positionType"
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.cameraType | typeFilter}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="channel"
                            label="通道编号">
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            label="摄像头介绍">
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
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '摄像头信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="(item,index) in cameraList" v-if="isShowPersonCard && item.statu">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item,'摄像头信息', true)">
                            <!--<img src="../../../../static/img/cameraCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.name}}
                            </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="name">通道编号：<span>{{item.channel}}</span></p>
                            <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<span>{{item.cameraType | typeFilter}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="personInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addNewPerson"
                          @fixInfo="fixInfo">

                </HardWare>
                <allDotMap v-if="allDotvisible"
                           :visible="allDotvisible"
                           :Info="allDotList"
                           :title="title"
                           @iconfixInfo="iconfixInfo"
                           @iconListfixInfo="iconListfixInfo"
                           @closeInfoDialog ="closeDialog">
                </allDotMap>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import allDotMap from '@/components/allDotMap'
    import Header from './camera.vue'
    import HardWare from './hardwareDialog.vue'
    import api from '@/api'
    import _ from 'lodash'
    import {mapGetters,mapMutations} from 'vuex'

    export default{
        data(){
            return{
                allCameraList: [],
                selectFlag:false,
                tempSelects:[],
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
                show:false,
                isShowLoading: false,
                currentNum: 50,
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                },
                filterCondition: '',
                typeContent: []
            }
        },
        methods:{
            ...mapMutations(['TOTAL_NUM', 'CURRENT_NUM']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/cameraCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllCamera()
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '摄像头批量打点'
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = [{
                    typeId:2,
                    id:info.id,
                    cameraType:info.cameraType,
                    name:info.name,
                    positionType:info.positionType,
                    regionId:info.regionId,
                    model:info.model,
                    port:info.port,
                    channel:info.channel,
                    ip:info.ip,
                    description:info.description,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }]
                await api.camera.updateCamera(scenicObj).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    if (this.typeContent.length > 0) {
                        this.allCameraList = this.filterTypeList(this.allCameraList)
                    }
                    this.checkList = this.allCameraList.filter(item => {
                        if (item.name.includes(info)) {
                            return item
                        }
                        if (item.regionName && item.regionName.includes(info)) {
                            return item
                        }
                        if (item.ip && item.ip.includes(info)) {
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
                    let obj = {totalNum: this.checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.cameraList = this.checkList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                } else {
                    this.getAllCamera()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showPersonDetail({},'添加摄像头信息', false)
                this.isDisabled=false
            },
            showPersonDetail(info,title, state){
                this.personInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title
            },
            async fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let cameraObj=[{
                    typeId:2,
                    id:info.id,
                    cameraType:info.cameraType,
                    name:info.name,
                    positionType:info.positionType,
                    regionId:info.regionId,
                    model:info.model,
                    port:info.port,
                    channel:info.channel,
                    ip:info.ip,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        cameraObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    cameraObj[0].pictureId = info.pictureId
                }
                console.log(cameraObj)
                await api.camera.updateCamera(cameraObj).then(res=>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllCamera()
                }).catch(err=>{
                    this.$message.error('修改失败，请稍后再试')
                })
            },
            fixedInfo(id){
                if (id) {
                    this.choseInfoId = [id]
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
                    this.showPersonDetail(this.personInfo,'修改摄像头信息', false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的摄像头')
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
                        api.camera.deleteCamera(this.choseInfoId).then(res=>{
                            console.log(res,'删除成功')
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.cameraList=this.cameraList.filter((item,index)=>{
                            //         if(item.id===this.choseInfoId[i]){
                            //             this.cameraList[index].checked=false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllCamera()
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
            async addNewPerson(info){
                let longitude = ''
                let latitude = ''
                if (info.location) {
                    let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                    longitude = info.location.substring(0, index)
                    latitude  = info.location.substring(index + 1)
                }
                let cameraObj=[{
                    typeId:2,
                    cameraType:info.cameraType,
                    name:info.name,
                    positionType:info.positionType,
                    regionId:info.regionId,
                    model:info.model,
                    port:info.port,
                    channel:info.channel,
                    ip:info.ip,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude,
                    channel: info.channel
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        cameraObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                console.log(cameraObj)
                await api.camera.createCamera(cameraObj).then(res=>{
                    this.closeDialog()
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
                this.tempSelects=[];
                this.cameraList = this.cameraList.filter(item =>{
                    if(item.id ===id){
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
                this.cameraList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.cameraList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                this.typeContent = type
                if(type.length===0){
                    this.getAllCamera()
                }else{
                    if (this.filterCondition.trim() !== '') {
                        this.allCameraList = this.filterDataList(this.allCameraList)
                    }
                    this.checkList = this.allCameraList.filter((item,index)=>{
                        if(item.cameraType == 0){
                            item.type = '球机'
                        }else {
                            item.type = '枪机'
                        }
                        if(type.includes(item.type)){
                            item.statu=true
                        }else{
                            item.statu=false
                            console.log(item.type)
                        }
                        return item.statu === true
                    })
                }
                let date = new Date().getTime()
                let obj = {totalNum: this.checkList.length}
                obj[date] = new Date().getTime()
                this.$store.commit('TOTAL_NUM', obj)
                this.cameraList = this.checkList.filter((item,index) => {
                    if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                        return item
                    }
                })
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
                this.selectFlag=true
            },
            async getAllCamera () {
                this.choseInfoId=[];
                this.isShowLoading = true
                await api.camera.getAllCamera().then((res) => {
                    console.log(res, '这是请求回来的所有数据')
                    if(res.devices.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }
                    this.isShowLoading = false
                    // this.allCameraList = res.devices
                    this.allCameraList = res.devices
                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    let resDevices=res.devices
                    for (let i = 0; i < resDevices.length; i++) {
                        resDevices[i].iconName = resDevices[i].name
                        if(resDevices[i].cameraType != 0){
                            resDevices[i].cameraType = 1
                        }
                        resDevices[i].iconSubtype = 'camera'
                        if(resDevices[i].cameraType==0){
                            resDevices[i].iconUrl = '/static/img/icon/camera1.png'
                        }else {
                            resDevices[i].iconUrl = '/static/img/icon/camera.png'
                        }
                        resDevices[i].iconType = '摄像头'
                        if(resDevices[i].longitude==null&&resDevices[i].latitude==null){
                            this.allDotList.close.push(resDevices[i])
                        }else {
                            this.allDotList.open.push(resDevices[i])
                        }
                    }
                    for (let i=0; i < this.allCameraList.length; i++) {
                        this.allCameraList[i].checked = false
                        this.allCameraList[i].statu = true
                        this.allCameraList[i].id=this.allCameraList[i].id
                        this.allCameraList[i].location = `${this.allCameraList[i].longitude},${this.allCameraList[i].latitude}`
                        this.allCameraList[i].modifyTime=this.allCameraList[i].modifyTime.replace("-","/")
                        this.allCameraList[i].byTime = -(new Date(this.allCameraList[i].modifyTime)).getTime()
                        if(this.allCameraList[i].cameraType != 0){
                            this.allCameraList[i].cameraType = 1
                        }
                    }
                    this.allCameraList = _.sortBy(this.allCameraList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allCameraList = this.filterDataList(this.allCameraList)
                    }
                    if (this.typeContent.length > 0) {
                        this.allCameraList = this.filterTypeList(this.allCameraList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allCameraList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.cameraList = this.allCameraList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.checkList = this.cameraList

                    this.selectFlag=false

                }).catch((err)=> {
                    console.log(err)
                })
            },
            filterTypeList (list) {
                let type = this.typeContent
                list = list.filter((item,index) => {
                    if(item.cameraType == 0){
                        item.type = '球机'
                    }else {
                        item.type = '枪机'
                    }
                    if(type.includes(item.type)){
                        item.statu=true
                    }else{
                        item.statu=false
                        console.log(item.type)
                    }
                    return item.status === true
                })
                return list
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if (item.name.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.regionName && item.regionName.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.ip && item.ip.includes(this.filterCondition)) {
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
//          this.choseList=this.camera
            this.getAllCamera()
        },
        filters: {
            typeFilter (item) {
                if(item == 0){
                    return '球机'
                }else {
                    return '枪机'
                }
            }
        },
        components:{
            ScrollContainer,
            Header,
            HardWare,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllCamera()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" type="text/scss">
    .cameraHard{
        .el-checkbox__label{
            padding-left:rem(5);
            font-size:rem(13);
        }
        .el-checkbox__inner{
            margin-top:rem(5);
        }
        .cameraList .box .el-tooltip{
            background: transparent;
            text-align: left;
            border: none;
            padding: 0;
        }
        .cameraList .box .el-button span{
            display:inline-block;
            width: 200px;
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
    .cameraHard{
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
                            display: inline-block;
                            width: rem(100);
                            float: right;
                            text-align: right;
                            line-height: rem(20);
                            color: #fff;
                            padding-right: rem(5);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            box-sizing: border-box;
                        }
                    }
                    .specificInfo{
                        margin-top:rem(10);
                        font-size: rem(14);
                        padding: 0 rem(10);
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
        .checkBoxBtn{
            width:rem(15);
            height:rem(15);
        }
    }
</style>

