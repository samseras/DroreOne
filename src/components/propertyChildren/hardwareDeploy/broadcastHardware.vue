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
                        @searchAnything="searchAnything"
                        @fixedInfo="fixedInfo"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllBroadcast="getAllBroadcast"
                        @allDotInfo = 'allDotInfo'
                        :personListFlag="selectFlag"
                        :choseId="choseInfoId">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowBroadCard && !show"
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
                            label="名称"
                            width="230">
                            <template slot-scope="scope">
                                <span class="overflow">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="positionType"
                            width="150"
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.positionType | changeFilter}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            width="200"
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
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showBroadDetail(scope.row, '广播信息', true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="(item,index) in broadList" v-if="isShowBroadCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked="item.checked" class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showBroadDetail(item,'广播信息',true)">
                            <!--<img src="../../../../static/img/broadcastCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
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
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="broadInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addBroad"
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
                allBroadList: [],
                selectFlag:false,
                tempSelects:[],
                key:'',
                isShowBroadCard:true,
                visible:false,
                broadList:[],
                checkList:[],
                isSelected:false,
                broadInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                choseId:[],
                title:'',
                show:false,
                isShowLoading:false,
                currentNum: 50,
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                },
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
                    return '../../../../static/img/broadcastCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllBroadcast()
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '广播批量打点'
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = [{
                    typeId: 1,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId,
                    serialNum:info.serialNum
                }]
                await api.broadcast.updateBroadcast(scenicObj).then(res => {
                    console.log('修改成功')
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    this.broadList = this.allBroadList.filter(item => {
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
                    let obj = {totalNum: this.broadList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                } else {
                    this.getAllBroadcast()
                }
            },
            addNewInfo(){
                this.showBroadDetail({},'添加广播信息',false)
                this.isDisabled= false
            },
            showBroadDetail(info,title, state){
                this.broadInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title
            },

            async fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let broadObj=[{
                    typeId: 1,
                    id:info.id,
                    positionType:info.positionType,
                    name:info.name,
                    model:info.model,
                    ip:info.ip,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    serialNum:info.serialNum,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        broadObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    broadObj[0].pictureId = info.pictureId
                }
                await api.broadcast.updateBroadcast(broadObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllBroadcast()
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
                if(this.choseInfoId.length > 0){
                    this.broadList.map((item) => {
                        if(item.id === this.choseInfoId[0]){
                            this.broadInfo=item
                        }
                    })
                    this.showBroadDetail(this.broadInfo,'修改广播信息', false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的广播信息')
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
                        api.broadcast.deleteBroadcast(this.choseInfoId).then(res =>{
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.broadList=this.broadList.filter((item,index)=>{
                            //         if(item.id===this.choseInfoId[i]){
                            //             this.broadList[index].checked=false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllBroadcast()
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
            async addBroad (info){
                let longitude = ''
                let latitude = ''
                if (info.location) {
                    let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                    longitude  = info.location.substring(0, index)
                    latitude = info.location.substring(index + 1)
                }
                let broadObj=[{
                    typeId: 1,
                    positionType:info.positionType,
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
                        broadObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.broadcast.createBroadcast(broadObj).then(res =>{
                    this.closeDialog()
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
                this.tempSelects=[];
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
                let that=this;
                this.broadList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.broadList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                if(type.length===0){
                    this.broadList=this.checkList.filter((item)=>{

                        item.status=true
                        return item
                    })
                }else{
                    this.broadList=this.checkList.filter((item,index)=>{
                            console.log(item.positionType)
                        if (item.positionType == 0) {
                            item.type = '室内'
                        } else{
                            item.type = '室外'
                        }
                        if(type.includes(item.type)){
                            item.status=true
                        }else{
                            item.status=false
                            console.log(item.type)
                            console.log(item.positionType)
                        }
                        return item.status === true
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
                this.selectFlag=true
                console.log(this.choseInfoId)
            },
            async getAllBroadcast(){
                this.choseInfoId=[];
                this.isShowLoading=true
                await api.broadcast.getAllBroadcast().then((res)=>{
                    console.log(res,'这是请求回来的数据')
                    if(res.devices.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }
                    this.isShowLoading=false
                    this.allBroadList=res.devices
                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    let resDevices=res.devices
                    for (let i = 0; i < resDevices.length; i++) {
                        resDevices[i].iconName = resDevices[i].name
                        resDevices[i].iconSubtype = 'broadcast'
                        resDevices[i].iconUrl = '/static/img/icon/broadcast.png'
                        resDevices[i].iconType = '广播'
                        if(resDevices[i].longitude==null&&resDevices[i].latitude==null){
                            this.allDotList.close.push(resDevices[i])
                        }else {
                            this.allDotList.open.push(resDevices[i])
                        }
                    }
                    for (let i=0;i<this.allBroadList.length;i++) {
                        this.allBroadList[i].checked = false
                        this.allBroadList[i].status = true
                        this.allBroadList[i].id=this.allBroadList[i].id
                        this.allBroadList[i].location=`${this.allBroadList[i].longitude},${this.allBroadList[i].latitude}`
                        this.allBroadList[i].modifyTime=this.allBroadList[i].modifyTime.replace("-","/")
                        this.allBroadList[i].byTime = -(new Date(this.allBroadList[i].modifyTime)).getTime()
                    }
                    this.allBroadList = _.sortBy(this.allBroadList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allBroadList = this.filterDataList(this.allBroadList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allBroadList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.broadList = this.allBroadList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.checkList = this.broadList

                    this.selectFlag=false

                }).catch((err)=>{
                    console.log(err)
                    this.isShowLoading=false
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
            HardWare,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllBroadcast()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" type="text/scss">
    .broadHard{
        /*.el-checkbox__label{*/
            /*padding-left:rem(5);*/
            /*font-size:rem(13);*/
        /*}*/
        /*.el-checkbox__inner{*/
            /*margin-top:rem(5);*/
        /*}*/
        .cameraList .box .el-tooltip{
            /*border:1px solid transparent;*/
            text-align: left;
            background: transparent;
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

<style lang="scss" type="text/scss" scoped  >
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
                            top:rem(1);
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
                .handle {
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
        .overflow {
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            display:inline-block;
        }
    }
</style>


