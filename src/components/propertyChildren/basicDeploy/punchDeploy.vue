<template>
    <div class="punchDeploy">
        <div class="title">
            打卡处信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @getAllPunch="getAllPunch">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowParkCard && !show"
                        ref="multipleTable"
                        :data="punchList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardNumber"
                            label="卡号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            width="400"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="200"
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
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPunchDetail(scope.row, '打卡处信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in punchList" v-if="isShowParkCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPunchDetail(item, '打卡处信息',true)">
                            <img src="../../../../static/img/punch_deploy.png" alt="">
                            <!--<img :src="getUrl(item.picturePath,item.type)" alt="" @error="imgError">-->
                            <span class="type">
                                  {{item.name}}
                            </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="idNum">站点容量：<span>{{item.capacity}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="punchInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewPunch">
                </PersonDetail>
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
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    import api from '@/api'
    import _ from 'lodash'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "station-deploy",
        data(){
            return{
                allpunchList: [],
                selectFlag:false,
                tempSelects:[],
                isShowParkCard: true,
                checkList: [],
                filterList: [],
                punchList: [],
                visible: false,
                punchInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
                choseId:[],
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                },
                filterCondition: ''
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM', 'CURRENT_NUM']),
            imgError (e) {
                e.target.src = this.getUrl(null,0);
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllPunch()
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = {
                    description:info.description,
                    id: info.id,
                    name: info.name,
                    type:info.type,
                    capacity: info.capacity,
                    regionId: info.regionId,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }
                await api.station.updateStation(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                this.filterCondition = info
                if (info.trim() !== '') {
                    let checkList = this.allpunchList.filter(item => {
                        if (item.regionName && item.regionName.includes(info)) {
                            return item
                        }
                        if (item.name.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.punchList = checkList.filter((item,index) =>{
                        if(index <(this.getCurrentNum*35) && index>(this.getCurrentNum-1)*35-1){
                            return item
                        }
                    })
                } else {
                    this.getAllPunch()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPunchDetail (info, title,state) {
                this.punchInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '打卡点批量打点'
                // console.log(this.allDotvisible,this.allDotList, this.title)
            },
            addNewInfo () {
                this.showPunchDetail({},'添加打卡处信息',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0){
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.punch.deletePunch(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllPunch()
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的站点数据')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowParkCard = false
                }else {
                    this.isShowParkCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.punchList = this.punchList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
                let that=this;
                this.punchList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length === this.punchList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.punchList = this.punchList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfoId.push(item.id)
                        return item.checked === true
                    } else {
                        console.log('进入这个判断吗')
                        item.checked = false
                        this.choseInfoId = []
                        return item.checked === false
                    }
                })
                this.selectFlag=true
                console.log(this.choseInfoId, 'opopop')
            },
            async fixInfo (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let punchObj = {
                    description:info.description,
                    id: info.id,
                    name: info.name,
                    cardNumber:info.cardNumber,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }

                await api.punch.updatePunch(JSON.stringify(punchObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '修改打卡点成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllPunch()
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewPunch (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let punchObj = {
                    description:info.description,
                    name: info.name,
                    cardNumber:info.cardNumber,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                await api.punch.createPunch(JSON.stringify(punchObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建打卡点成功')
                    this.$message.success('创建成功')
                    this.getAllPunch()
                }).catch(err => {
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (id) {
                if (id){
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.punchList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.punchInfo = item
                        }
                    })
                    this.showPunchDetail(this.punchInfo, '修改打卡处信息',false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },

            async getAllPunch () {
                this.isShowLoading = true
                await api.punch.getAllPunch().then(res => {

//                    re = [
//                        {
//                            "id": "1",
//                            "createTime": null,
//                            "creator": null,
//                            "modifyTime": null,
//                            "modifier": null,
//                            "name": "啦啦",
//                            "cardNumber": "123456",
//                            "description": null,
//                            "scenicAreaId": null,
//                            "regionId": null,
//                            "regionName": null,
//                            "longitude": null,
//                            "latitude": null,
//                            "epsg": 4326,
//                            "deleted": false
//                        }
//                    ]
                    console.log(res, '这是数据')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allpunchList = res


                    this.allDotList.close=[]
                    this.allDotList.open=[]
//                    for (let i = 0; i < res.length; i++) {
//                        res[i].id = res[i].id
//                        res[i].iconName = res[i].name
//                        if(res[i].type == "0"){
//                            //假数据
//                            res[i].iconType == "transport"
//                            res[i].iconSubtype = "car"
//                            res[i].iconUrl="/static/img/icon/station_check.png"
//                        }else{
//                            //假数据
//                            res[i].iconType == "transport"
//                            res[i].iconSubtype = "boat"
//                            res[i].iconUrl="/static/img/icon/landing_check.png"
//                        }
//                        if(res[i].longitude==null&&res[i].latitude==null){
//                            this.allDotList.close.push(res[i])
//                        }else {
//                            this.allDotList.open.push(res[i])
//                        }
//                    }
                    for (let i = 0; i < this.allpunchList.length; i++) {
                        this.allpunchList[i].checked = false
                        this.allpunchList[i].status = true
                        this.allpunchList[i].location = `${this.allpunchList[i].longitude},${this.allpunchList[i].latitude}`
                        this.allpunchList[i].modifyTime=this.allpunchList[i].modifyTime.replace("-","/")
                        this.allpunchList[i].byTime = -(new Date(this.allpunchList[i].modifyTime)).getTime()
                    }
                    this.allpunchList = _.sortBy(this.allpunchList, 'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allpunchList = this.filterDataList(this.allpunchList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allpunchList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.punchList = this.allpunchList.filter((item,index) =>{
                        if(index <(this.getCurrentNum*35) && index>(this.getCurrentNum-1)*35-1){
                            return item
                        }
                    })
                    this.checkList = this.punchList
                    this.choseInfoId = []
                    this.selectFlag=false
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if ((item.regionName)&&(item.regionName.includes(this.filterCondition))) {
                        return item
                    }
                    if (item.plant.name.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.regionName && item.regionName.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.name.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            }
        },
        created () {
            this.getAllPunch()
        },
        filters: {
            typeFilter (item) {
                if (item && item == 0) {
                    return '室外'
                } else {
                    return '室内'
                }
            }
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllPunch()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .punchDeploy {
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .punchDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
         .box .el-tooltip{
            background: transparent;
            text-align: left;
            border: none;
            padding: 0;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .punchDeploy{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
        }
        .personContent{
            flex: 1;
            width: 100%;
            /*background: red;*/
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .personList{
                width: 100%;
                flex: 1;
                margin-top: rem(20);
                .personInfo{
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox{
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                        position: relative;
                        .checkBtn{
                            float: right;
                            margin-right: rem(5);
                            margin-top: rem(3);
                            width: rem(15);
                            height: rem(15);
                            cursor: pointer;
                        }
                    }
                    .personType{
                        width: 100%;
                        height: rem(20);
                        background: #0086b3;
                        position: relative;
                        font-size: rem(12);
                        img{
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);

                        }
                        span{
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
                    .specificInfo{
                        margin-top: rem(10);
                        font-size: rem(12);
                        p{
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
                .handle {
                    span{
                        cursor: pointer;
                    }

                }
            }
        }
    }

</style>
