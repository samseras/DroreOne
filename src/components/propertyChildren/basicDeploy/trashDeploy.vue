<template>
    <div class="trashDeploy">
        <div class="title">
            垃圾桶信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @allDotInfo = 'allDotInfo'
                        :choseId="choseInfoId"
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @searchAnything="searchAnything"
                        @getAllTrash="getAllTrash">

                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowTrashCard && !show"
                        ref="multipleTable"
                        :data="trashList"
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
                            prop="dustbinBean.name"
                            label="垃圾桶名称"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.dustbinBean.type | typeFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            prop="dustbinBean.dustbinCount"
                            label="个数">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="200"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showTrashDetail(scope.row, '垃圾桶信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in trashList" v-if="isShowTrashCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showTrashDetail(item, '垃圾桶信息',true)">
                            <!--<img src="../../../../static/img/wasteCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                {{item.dustbinBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <!--<p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<span>{{item.dustbinBean.name}}</span></p>-->
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.dustbinBean.type | typeFilter}}垃圾桶</span></p>
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex" v-if="false">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.dustbinBean.status}}</span></p>
                            <p class="phoneNum">垃圾筒数：<span>{{item.dustbinBean.dustbinCount}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="trashInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewTrash">
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
    export default {
        name: "trash-deploy",
        data (){
            return {
                selectFlag:false,
                tempSelects:[],
                isShowTrashCard: true,
                checkList: [],
                filterList: [],
                trashList: [],
                visible: false,
                trashInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
                choseId:[],
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                pageNum: 1,
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                }
            }
        },
        methods : {
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/wasteCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllTrash()
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
                    id: info.dustbinBean.id,
                    name: info.dustbinBean.name,
                    dustbinCount: info.dustbinBean.dustbinCount,
                    type: info.dustbinBean.type,
                    regionId: info.regionId,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }
                await api.dustbin.updateDustbin(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.trashList = this.checkList.filter(item => {
                        if (item.regionName && item.regionName.includes(info)) {
                            return item
                        }
                        if (item.dustbinBean.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllTrash()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showTrashDetail (info,title,state) {
                this.trashInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '垃圾桶批量打点'
            },
            addNewInfo () {
                this.showTrashDetail({dustbinBean:{}}, '添加垃圾桶信息',false)
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
                        api.dustbin.deleteDustbin(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.trashList = this.trashList.filter((item, index) => {
                            //         if (item.dustbinBean.id === this.choseInfoId[i]){
                            //             this.trashList[index].checked = false
                            //             this.trashList[index].status = false
                            //         }
                            //         return item.status === true
                            //     })
                            // }
                            this.getAllTrash()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllTrash()
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                }else {
                    this.$message.error('请选择要删除的垃圾桶信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowTrashCard = false
                }else {
                    this.isShowTrashCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.trashList = this.trashList.filter(item => {
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
                this.trashList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.trashList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.trashList = this.checkList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.trashList = this.checkList.filter((item,index) => {
                        if (item.dustbinBean.type){
                            item.dustbinBean.typeName = '临时'
                        } else {
                            item.dustbinBean.typeName = '固定'
                        }
                        if (type.includes(item.dustbinBean.typeName)){
                            item.status = true
                        } else if(!type.includes(item.dustbinBean.typeName)){
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item.status === true
                    })
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.trashList = this.trashList.filter((item) => {
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
                let longitude= info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let trashObj = {
                    description:info.description,
                    id: info.dustbinBean.id,
                    name: info.dustbinBean.name,
                    dustbinCount: info.dustbinBean.dustbinCount,
                    type: info.dustbinBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        trashObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    trashObj.pictureId = info.pictureId
                }
                await api.dustbin.updateDustbin(JSON.stringify(trashObj)).then(res => {
                    this.closeDialog()
                    console.log('修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllTrash()
                }).catch(err => {
                    console.log(err, '修改失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewTrash (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude= info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let trashObj = {
                    description:info.description,
                    name: info.dustbinBean.name,
                    dustbinCount: info.dustbinBean.dustbinCount,
                    type: info.dustbinBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        trashObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                console.log(trashObj, 'this is trashObj')
                await api.dustbin.createDustbin(JSON.stringify(trashObj)).then(res => {
                    this.closeDialog()
                    console.log('增加成功')
                    this.$message.success('创建成功')
                    this.getAllTrash()
                }).catch(err => {
                    console.log(err,'创建失败')
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
                    this.trashList.map((item) => {
                        if (item.dustbinBean.id === this.choseInfoId[0]){
                            this.trashInfo = item
                        }
                    })
                    this.showTrashDetail(this.trashInfo, '修改垃圾桶信息',false)
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllTrash ()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllTrash ()
            },

            async getAllTrash () {
                console.log('垃圾桶')
                this.isShowLoading = true
                await api.dustbin.getAllDustbin().then(res => {
                    console.log(res, '这是请求回来的数据')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.trashList = res
                    this.trashList = this.trashList.filter((item,index) =>{
                        if(index < (this.pageNum*35)&& index>(this.pageNum-1)*35 -1){
                            return item
                        }
                    })
                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    for (let i = 0; i < res.length; i++) {
                        res[i].id = res[i].dustbinBean.id
                        res[i].iconName = res[i].dustbinBean.name
                        res[i].iconSubtype = 'trash'
                        res[i].iconUrl = '/static/img/icon/trash.png'
                        res[i].iconType = '垃圾桶'
                        if(res[i].longitude==null&&res[i].latitude==null){
                            this.allDotList.close.push(res[i])
                        }else {
                            this.allDotList.open.push(res[i])
                        }
                    }
                    for (let i = 0; i < this.trashList.length; i++) {
                        this.trashList[i].location = `${this.trashList[i].longitude},${this.trashList[i].latitude}`
                        this.trashList[i].checked = false
                        this.trashList[i].status = true
                        this.trashList[i].id = this.trashList[i].dustbinBean.id
                        this.trashList[i].description = this.trashList[i].dustbinBean.description
                        this.trashList[i].dustbinBean.modifyTime=this.trashList[i].dustbinBean.modifyTime.replace("-","/")
                        this.trashList[i].byTime = -(new Date(this.trashList[i].dustbinBean.modifyTime)).getTime()
                    }
                    this.trashList = _.sortBy(this.trashList, 'byTime')
                    this.checkList = this.trashList
                    this.choseInfoId = []

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        filters: {
            typeFilter (item) {
                if (item == 1) {
                    return "临时"
                } else {
                    return "固定"
                }
            }
        },
        created () {
           this.getAllTrash()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            allDotMap
        }
    }
</script>

<style lang="scss" type="text/scss">
    .trashDeploy .el-checkbox__input{
        vertical-align: top;
    }
    .trashDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .trashDeploy{
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
                .handle{
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
