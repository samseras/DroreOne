<template>
    <div class="buildingDeploy">
        <div class="title">
            建筑信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @fixedInfo = 'fixedInfo'
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @getAllBuild="getAllBuild">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowToiletCard && !show"
                        ref="multipleTable"
                        :data="buildList"
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
                            prop="building.name"
                            label="名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            width="180"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="180"
                            prop=""
                            label="年代">
                            <template slot-scope="scope">
                                <span>{{scope.row.building.buildYear | yearFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="building.height"
                            label="高度">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="building.layers"
                            label="层高">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="180"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '建筑信息', true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo judge-title" v-for="item in buildList" v-if="isShowToiletCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '建筑信息', true)">
                            <!--<img src="../../../../static/img/bulidCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.building.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代：<span>{{item.building.buildYear | yearFilter}}</span></p>
                            <p class="sex">层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：<span>{{item.building.layers}}层</span></p>
                            <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<span>{{item.location}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="buildInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewToilet">
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
    import moment from 'moment'
    import _ from 'lodash'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "build-deploy",
        data(){
            return{
                allBuildList: [],
                selectFlag:false,
                tempSelects:[],
                isShowToiletCard: true,
                checkList: [],
                filterList: [],
                buildList: [],
                visible: false,
                buildInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
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
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/bulidCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllBuild()
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = {
                    id: info.building.id,
                    name: info.building.name,
                    regionId: info.regionId,
                    latitude: index[1],
                    longitude: index[0],
                    buildYear: info.building.buildYear,
                    height: info.building.height,
                    description: info.building.description,
                    layers: info.building.layers,
                    pictureId:info.pictureId
                }
                await api.build.updateBuild(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    let checkList = this.allBuildList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        if ((item.building.name)&&(item.building.name.includes(info))) {
                            return item
                        }

                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.buildList = checkList.filter((item,index) =>{
                        if(index < (this.getCurrentNum*35)&& index>(this.getCurrentNum-1)*35 -1){
                            return item
                        }
                    })
                } else {
                    this.getAllBuild()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                /*this.choseInfoId = selection.map(item => {
                    return item.id
                })*/
            },
            showPersonDetail (info, title, state) {
                this.buildInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '建筑批量打点'
                // console.log(this.allDotvisible,this.allDotList, this.title)
            },
            addNewInfo () {
                this.showPersonDetail({building:{}}, '添加建筑信息', false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                console.log(this.choseInfoId)
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.build.deleteBuild(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.buildList = this.buildList.filter((item, index) => {
                            //         if (item.building.id === this.choseInfoId[i]){
                            //             this.buildList[index].checked = false
                            //         }
                            //         return item.building.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllBuild()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllBuild()
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的建筑信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowToiletCard = false
                }else {
                    this.isShowToiletCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.buildList = this.buildList.filter(item => {
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
                console.log(this.choseInfoId)
                let that=this;
                this.buildList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.buildList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.buildList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.buildList.filter((item,index) => {
                        if (type.includes(item.type)){
                            item.status = true
                        } else if(!type.includes(item.type)){
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item.status === true
                    })
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.buildList = this.buildList.filter((item) => {
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
                let day = moment(info.building.buildYear).format('YYYY-MM-DD')
                let buildObj = {
                    id: info.building.id,
                    name: info.building.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude,
                    buildYear: day,
                    height: Number(info.building.height),
                    description: info.building.description,
                    layers: info.building.layers
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        buildObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    buildObj.pictureId = info.pictureId
                }
                await api.build.updateBuild(JSON.stringify(buildObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllBuild()
                }).catch(err => {
                    console.log(err, '修改失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewToilet (info) {
                console.log(info, 'sdiuucydsgcds')
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let day = moment(info.building.buildYear).format('YYYY-MM-DD')
                let buildObj = {
                    name: info.building.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude,
                    buildYear: day,
                    height: Number(info.building.height),
                    description: info.building.description,
                    layers: info.building.layers
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        buildObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.build.createBuild(JSON.stringify(buildObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '添加成功')
                    this.$message.success('创建成功')
                    this.getAllBuild()
                }).catch(err => {
                    this.$message.error('创建失败，请稍后重试')
                })

            },
            fixedInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.buildList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.buildInfo = item
                        }
                    })
                    this.showPersonDetail(this.buildInfo, '修改建筑信息', false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllBuild () {
                this.isShowLoading = true
                await api.build.getAllBuild().then(res => {
                    console.log(res, '这是请求回来的所有')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allBuildList = res
                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    for (let i = 0; i < res.length; i++) {
                        res[i].id = res[i].building.id
                        res[i].iconName = res[i].building.name
                        res[i].iconSubtype = 'construction'
                        res[i].iconUrl = '/static/img/icon/construction.png'
                        res[i].iconType = '建筑'
                        if(res[i].longitude==null&&res[i].latitude==null){
                            this.allDotList.close.push(res[i])
                        }else {
                            this.allDotList.open.push(res[i])
                        }
                    }
                    for (let i = 0; i < this.allBuildList.length; i++) {
                        this.allBuildList[i].checked = false
                        this.allBuildList[i].status = true
                        this.allBuildList[i].location = `${this.allBuildList[i].longitude},${this.allBuildList[i].latitude}`
                        this.allBuildList[i].id = this.allBuildList[i].building.id
                        this.allBuildList[i].building.modifyTime=this.allBuildList[i].building.modifyTime.replace("-","/")
                        this.allBuildList[i].byTime = -(new Date(this.allBuildList[i].building.modifyTime)).getTime()
                    }
                    this.allBuildList = _.sortBy(this.allBuildList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allBuildList = this.filterDataList(this.allBuildList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allBuildList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.buildList = this.allBuildList.filter((item,index) =>{
                        if(index < (this.getCurrentNum*35)&& index>(this.getCurrentNum-1)*35 -1){
                            return item
                        }
                    })
                    this.checkList = this.buildList
                    this.choseInfoId = []

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if ((item.regionName)&&(item.regionName.includes(this.filterCondition))) {
                        return item
                    }
                    if ((item.building.name)&&(item.building.name.includes(this.filterCondition))) {
                        return item
                    }
                })
                return list
            },
        },
        created () {
            // for (let i = 0; i < this.toiletList.length; i++) {
            //     this.toiletList[i].checked = false
            //     this.toiletList[i].status = true
            // }
            // this.choseList = this.toiletList
            this.getAllBuild()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllBuild()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .buildingDeploy{
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
                .handle{
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
<style lang="scss" type="text/scss">
    .judge-title  .cell{
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .buildingDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .buildingDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
