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
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllLed="getAllLed">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowLedCard && !show"
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
                            prop="ip"
                            label="IP">
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            label="所属片区">
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
                                    <span @click="showLedDetail(scope.row, 'LED大屏信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="(item,index) in ledList" v-if="isShowLedCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showLedDetail(item,'LED大屏信息',true)">
                            <!--<img src="../../../../static/img/screenCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="name">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="type">LED类型：<span>{{item.positionType | changeFilter}}</span></p>
                            <p class="describe text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>

                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="ledInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addLed"
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
    import {mapMutations, mapGetters} from 'vuex'

    export default{
        data(){
            return{
                allLedList: [],
                selectFlag:false,
                tempSelects:[],
                isShowLedCard:true,
                visible:false,
                ledList:[],
                checkList:[],
                isSelected:false,
                ledInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                show:false,
                isShowLoading:false,
                currentNum: 50,
                listLength: '',
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
                    return '../../../../static/img/screenCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllLed()
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = 'LED大屏批量打点'
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = [{
                    typeId: 4,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    mac:info.mac,
                    port:info.port,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    screenWidth:info.screenWidth,
                    screenHeight:info.screenHeight,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }]
                await api.led.updateLed(scenicObj).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    if (this.typeContent.length > 0) {
                        this.allLedList = this.filterTypeList(this.allLedList)
                    }
                    this.checkList = this.allLedList.filter(item => {
                        if (item.ip && item.ip.includes(info)) {
                            return item
                        }
                        if (item.name.includes(info)) {
                            return item
                        }
                        if (item.regionName && item.regionName.includes(info)) {
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
                    this.ledList = this.checkList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                } else {
                    this.getAllLed()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showLedDetail({},'添加LED大屏信息',false)
                this.isDisabled=false
            },
            showLedDetail(info,title,state){
                this.ledInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title

            },
            async fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0,index)
                let latitude = info.location.substring(index+1)
//                let item = info.area.includes(',')?info.area.indexOf(','):info.area.indexOf('，')
//                let screenWidth=info.area.substring(0,item)
//                let screenHeight = info.area.substring(item + 1)
                let ledObj=[{
                    typeId: 4,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    mac:info.mac,
                    port:info.port,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude,
                    screenWidth:info.screenWidth,
                    screenHeight:info.screenHeight
//                    screenWidth:screenWidth,
//                    screenHeight:screenHeight
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        ledObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    ledObj[0].pictureId = info.pictureId
                }
                await api.led.updateLed(ledObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllLed()
                }).catch(err =>{
                    this.$message.error('修改失败,请稍后再试')
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
                    this.ledList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.ledInfo=item
                        }
                    })
                    this.showLedDetail(this.ledInfo,'修改LED信息',false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的LED')
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
                        api.led.deleteLed(this.choseInfoId).then(res =>{
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.ledList=this.ledList.filter((item,index)=>{
                            //         if(item.id ===this.choseInfoId[i]){
                            //             this.ledList[index].checked=false
                            //         }
                            //         return item.id!==this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllLed()
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
            async addLed (info){
                let longitude = ''
                let latitude = ''
                if (info.location) {
                    let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                    longitude  = info.location.substring(0, index)
                    latitude = info.location.substring(index + 1)
                }
                let ledObj=[{
                    mac:info.mac,
                    typeId: 4,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    port:info.port,
                    serialNum:info.serialNum,
                    regionId:info.regionId,
                    description:info.description,
                    screenWidth:info.screenWidth,
                    screenHeight:info.screenHeight,
                    latitude:latitude,
                    longitude:longitude,
//                    screenWidth:screenWidth,
//                    screenHeight:screenHeight
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        ledObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.led.createLed(ledObj).then(res =>{
                    this.closeDialog()
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
                this.tempSelects=[];
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
                let that=this;
                this.ledList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.ledList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                this.typeContent = type
                if(type.length===0){
                   this.getAllLed()
                }else{
                    if (this.filterCondition.trim() !== '') {
                        this.allLedList = this.filterDataList(this.allLedList)
                    }
                    this.checkList=this.allLedList.filter((item,index)=>{
                        if (item.positionType == 0) {
                            item.type = '室内'
                        } else{
                            item.type = '室外'
                        }
                        if(type.includes(item.type)){
                            item.status=true
                        }else {
                            item.status=false
                            console.log(item.type)
                        }
                        return item.status === true
                    })
                }
                let date = new Date().getTime()
                let obj = {totalNum: this.checkList.length}
                obj[date] = new Date().getTime()
                this.$store.commit('TOTAL_NUM', obj)
                this.ledList = this.checkList.filter((item,index) => {
                    if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                        return item
                    }
                })
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
                this.selectFlag=true
            },

            async getAllLed(){
                this.choseInfoId=[];
                this.isShowLoading=true
                await api.led.getAllLed().then((res)=>{
                    console.log(res,'这是请求的数据')
                    if(res.devices.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }

                    this.listLength = res.devices.length
                    this.isShowLoading=false
                    this.allLedList=res.devices

                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    let resDevices=res.devices
                    for (let i = 0; i < resDevices.length; i++) {
                        resDevices[i].iconName = resDevices[i].name
                        resDevices[i].iconSubtype = 'led'
                        resDevices[i].iconUrl = '/static/img/icon/led.png'
                        resDevices[i].iconType = 'LED大屏'
                        if(resDevices[i].longitude==null&&resDevices[i].latitude==null){
                            this.allDotList.close.push(resDevices[i])
                        }else {
                            this.allDotList.open.push(resDevices[i])
                        }
                    }
                    for (let i=0;i<this.allLedList.length;i++){
                        this.allLedList[i].checked=false
                        this.allLedList[i].status=true
                        this.allLedList[i].id = this.allLedList[i].id
                        this.allLedList[i].mac = this.allLedList[i].mac
                        this.allLedList[i].location=`${this.allLedList[i].longitude},${this.allLedList[i].latitude}`
//                        this.allLedList[i].area=`${this.allLedList[i].screenWidth},${this.allLedList[i].screenHeight}`
                        this.allLedList[i].modifyTime=this.allLedList[i].modifyTime.replace("-","/")
                        this.allLedList[i].byTime = -(new Date(this.allLedList[i].modifyTime)).getTime()
                    }
                    this.allLedList = _.sortBy(this.allLedList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allLedList = this.filterDataList(this.allLedList)
                    }
                    if (this.typeContent.length > 0) {
                        this.allLedList = this.filterTypeList(this.allLedList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allLedList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.ledList = this.allLedList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.checkList = this.ledList

                    this.selectFlag=false

                }).catch((err)=>{
                    console.log(err)
                })
            },
            filterTypeList (list) {
                let type = this.typeContent
                list = list.filter((item,index) => {
                    if (item.positionType == 0) {
                        item.type = '室内'
                    } else{
                        item.type = '室外'
                    }
                    if(type.includes(item.type)){
                        item.status=true
                    }else {
                        item.status=false
                        console.log(item.type)
                    }
                    return item.status === true
                })
                return list
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if (item.ip && item.ip.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.name.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.regionName && item.regionName.includes(this.filterCondition)) {
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
            this.getAllLed()
        },
        components:{
            ScrollContainer,
            Header,
            HardWare,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllLed()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" type="text/scss">
    .ledList{
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
    .ledList{
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



