<template>
    <div class="scenicDeploy">
        <div class="title">
            景点信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        :choseId="choseInfoId"
                        @selectedAll = 'selectedAll'
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @getAllScenic="getAllScenic">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowScenicCard"
                        ref="multipleTable"
                        :data="scenicList"
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
                            prop="scenicspotBean.name"
                            label="景点名称"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            width="200"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="scenicspotBean.capacity"
                            label="容量">
                        </el-table-column>

                        <!--<el-table-column
                            width="100"
                            prop="scenicspotBean.currentNum"
                            label="当前人数">
                        </el-table-column>-->

                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '人员信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="(item,index) in scenicList" v-if="isShowScenicCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '景点信息',true)">
                            <!--<img src="../../../../static/img/scenicCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                {{item.scenicspotBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.scenicspotBean.status}}</span></p>
                            <!--<p class="idNum">当前人数：<span>{{item.scenicspotBean.currentNum}}</span></p>-->
                            <p class="phoneNum">最大容量：<span>{{item.scenicspotBean.capacity}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="personInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewPerson">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    import api from '@/api'
    import _ from 'lodash'

    export default {
        name: "scenic-deploy",
        data () {
            return {
                selectFlag:false,
                tempSelects:[],
                isShowScenicCard: true,
                checkList: [],
                filterList: [],
                scenicList: [],
                visible: false,
                personInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                pageNum: 1
            }
        },
        methods: {
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/scenicCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllScenic()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.scenicList = this.checkList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        if (item.scenicspotBean.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllScenic()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title, state) {
                this.personInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({scenicspotBean:{}}, '添加景点信息', false)
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
                        api.scenic.deleteScenic(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.scenicList = this.scenicList.filter((item, index) => {
                            //         if (item.id === this.choseInfoId[i]){
                            //             this.scenicList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllScenic()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllScenic()
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                }else {
                    this.$message.error('请选择要删除的景点信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowScenicCard = false
                }else {
                    this.isShowScenicCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.scenicList = this.scenicList.filter(item => {
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
                this.scenicList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.scenicList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.scenicList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.scenicList.filter((item,index) => {
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
                this.scenicList = this.scenicList.filter((item) => {
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
                let scenicObj = {
                    description:info.description,
                    id: info.scenicspotBean.id,
                    name: info.scenicspotBean.name,
                    capacity: info.scenicspotBean.capacity,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        scenicObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    scenicObj.pictureId = info.pictureId
                }
                console.log(scenicObj, 'this is trashObj')
                await api.scenic.updateScenic(JSON.stringify(scenicObj)).then(res => {
                    this. closeDialog()
                    console.log('增加成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllScenic()
                })
            },
            async addNewPerson (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let scenicObj = {
                    description:info.description,
                    name: info.scenicspotBean.name,
                    capacity: info.scenicspotBean.capacity,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        scenicObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                console.log(scenicObj, 'this is trashObj')
                await api.scenic.createScenic(JSON.stringify(scenicObj)).then(res => {
                    this. closeDialog()
                    console.log('增加成功')
                    this.$message.success('创建成功')
                    this.getAllScenic()
                }).catch(err => {
                    console.log(err, '创建失败')
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
                    this.scenicList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.personInfo = item
                        }
                    })
                    this.showPersonDetail(this.personInfo, '修改景点信息', false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllScenic()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllScenic()
            },
            async getAllScenic () {
                this.isShowLoading = true
                await api.scenic.getAllScenic().then((res) => {
                    console.log(res, '这是请求回来的所有数据')
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.scenicList = res
                    this.scenicList = this.scenicList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    for (let i = 0; i < this.scenicList.length; i++) {
                        this.scenicList[i].checked = false
                        this.scenicList[i].status = true
                        this.scenicList[i].id = this.scenicList[i].scenicspotBean.id
                        this.scenicList[i].description = this.scenicList[i].scenicspotBean.description
                        this.scenicList[i].location = `${this.scenicList[i].longitude},${this.scenicList[i].latitude}`
                        this.scenicList[i].scenicspotBean.currentNum = this.currentNum
                        // scenicspotBean.status
                        if (this.scenicList[i].scenicspotBean.capacity == 0) {
                            this.scenicList[i].scenicspotBean.statu = '已满'
                        } else {
                            let parcent = this.scenicList[i].scenicspotBean.currentNum/this.scenicList[i].scenicspotBean.capacity
                            if (parcent < .9){
                                this.scenicList[i].scenicspotBean.statu = '充裕'
                            } else {
                                this.scenicList[i].scenicspotBean.statu = '已满'
                            }
                        }
                        this.scenicList[i].scenicspotBean.modifyTime=this.scenicList[i].scenicspotBean.modifyTime.replace("-","/")
                        this.scenicList[i].byTime = -(new Date(this.scenicList[i].scenicspotBean.modifyTime)).getTime()
                    }
                    this.scenicList = _.sortBy(this.scenicList, 'byTime')
                    this.checkList = this.scenicList
                    this.choseInfoId = []
                    this.selectFlag=false
                }).catch((err)=> {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllScenic()
            // this.choseList = this.scenicList
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" type="text/scss">
    .scenicDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .scenicDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .scenicDeploy{
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
                .handle{
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
