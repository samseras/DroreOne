<template>
    <div class="treeDeploy">
        <div class="title">
            植物信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @getAllPlant="getAllPlant">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowToiletCard && !show"
                        ref="multipleTable"
                        :data="treeList"
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
                            prop="plant.name"
                            label="名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="plant.genera"
                            label="科目"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            width="180"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="120"
                            prop="plant.height"
                            label="高度">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="180"
                            prop="plant.plantYear"
                            label="年代">
                             <template slot-scope="scope">
                                 <span>{{scope.row.plant.plantYear | yearFilter}}</span>
                             </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '植物信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in treeList" v-if="isShowToiletCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '植物信息',true)">
                            <!--<img src="../../../../static/img/botanyCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type plantName">
                                  {{item.plant.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代：<span>{{item.plant.plantYear | yearFilter}}</span></p>
                            <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<span>{{item.location}}</span></p>
                            <p class="phoneNum">高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：<span>{{item.plant.height}}米</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="treeInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewTree">
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
        name: "tree-deploy",
        data(){
            return{
                allTreeList: [],
                selectFlag:false,
                tempSelects:[],
                isShowToiletCard: true,
                checkList: [],
                filterList: [],
                treeList: [],
                visible: false,
                treeInfo: {},
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
                    return '../../../../static/img/botanyCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllPlant()
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = {
                    id: info.plant.id,
                    name: info.plant.name,
                    regionId: info.regionId,
                    latitude: index[1],
                    longitude: index[0],
                    plantYear: info.plant.plantYear,
                    height: info.plant.height,
                    description: info.plant.description,
                    genera: info.plant.genera,
                    pictureId:info.pictureId
                }
                await api.plant.updatePlant(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    let checkList = this.allTreeList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        /*if (item.plant.genera.includes(info)) {
                            return item
                        }*/
                        if (item.plant.name.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.treeList = checkList.filter((item,index) =>{
                        if(index < (this.getCurrentNum*35)&& index>(this.getCurrentNum-1)*35 -1){
                            return item
                        }
                    })
                } else {
                    this.getAllPlant()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title, state) {
                this.treeInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '植物批量打点'
                // console.log(this.allDotvisible,this.allDotList, this.title)
            },
            addNewInfo () {
                this.showPersonDetail({plant:{}}, '添加植物信息',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.plant.deletePlant(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.treeList = this.treeList.filter((item, index) => {
                            //         if (item.plant.id === this.choseInfoId[i]){
                            //             this.treeList[index].checked = false
                            //         }
                            //         return item.plant.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllPlant()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllPlant()
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                            this.getAllPlant()
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的植物信息')
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
                this.treeList = this.treeList.filter(item => {
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
                this.treeList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.treeList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.treeList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.treeList.filter((item,index) => {
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
                this.treeList = this.treeList.filter((item) => {
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
                let day = moment(info.plant.plantYear).format('YYYY-MM-DD')
                let treetObj = {
                    id: info.plant.id,
                    name: info.plant.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude,
                    plantYear: day,
                    height: Number(info.plant.height),
                    description: info.plant.description,
                    genera: info.plant.genera
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        treetObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    treetObj.pictureId = info.pictureId
                }
                await api.plant.updatePlant(JSON.stringify(treetObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllPlant()
                }).catch(err => {
                    console.log(err, '修改失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewTree (info) {
                console.log(info, '这是要添加的')
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let day = moment(info.plant.plantYear).format('YYYY-MM-DD')
                let treetObj = {
                    name: info.plant.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude,
                    plantYear: day,
                    height: Number(info.plant.height),
                    description: info.plant.description,
                    genera: info.plant.genera
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        treetObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.plant.createPlant(JSON.stringify(treetObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '添加成功')
                    this.$message.success('创建成功')
                    this.getAllPlant()
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
                    this.treeList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.treeInfo = item
                        }
                    })
                    this.showPersonDetail(this.treeInfo, '修改植物信息',false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllPlant () {
                this.isShowLoading = true
                await api.plant.getAllPlant().then(res => {
                    console.log(res, '这是请求回来的所有')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allTreeList = res
                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    for (let i = 0; i < res.length; i++) {
                        res[i].id = res[i].plant.id
                        res[i].iconName = res[i].plant.name
                        res[i].iconSubtype = 'plant'
                        res[i].iconUrl = '/static/img/icon/plant.png'
                        res[i].iconType = '植物'
                        if(res[i].longitude==null&&res[i].latitude==null){
                            this.allDotList.close.push(res[i])
                        }else {
                            this.allDotList.open.push(res[i])
                        }
                    }
                    for (let i = 0; i < this.allTreeList.length; i++) {
                        this.allTreeList[i].checked = false
                        this.allTreeList[i].status = true
                        this.allTreeList[i].location = `${this.allTreeList[i].longitude},${this.allTreeList[i].latitude}`
                        this.allTreeList[i].id = this.allTreeList[i].plant.id
                        this.allTreeList[i].description = this.allTreeList[i].plant.description
                        // this.allTreeList[i].state = '正常'
                        this.allTreeList[i].plant.modifyTime=this.allTreeList[i].plant.modifyTime.replace("-","/")
                        this.allTreeList[i].byTime = -(new Date(this.allTreeList[i].plant.modifyTime)).getTime()
                    }
                    this.allTreeList = _.sortBy(this.allTreeList, 'byTime')
                   if (this.filterCondition.trim() !== '') {
                       this.allTreeList = this.filterDataList(this.allTreeList)
                   }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allTreeList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.treeList = this.allTreeList.filter((item,index) =>{
                        if(index < (this.getCurrentNum*35)&& index>(this.getCurrentNum-1)*35 -1){
                            return item
                        }
                    })
                    this.checkList = this.treeList
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
                    if (item.plant.name.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            }
        },
        created () {
            // for (let i = 0; i < this.toiletList.length; i++) {
            //     this.toiletList[i].checked = false
            //     this.toiletList[i].status = true
            // }
            // this.choseList = this.toiletList
            this.getAllPlant()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllPlant()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .treeDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .treeDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .treeDeploy{
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
