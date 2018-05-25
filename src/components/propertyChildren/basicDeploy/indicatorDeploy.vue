<template>
    <div class="indicatorDeploy">
        <div class="title">
            指示牌信息
        </div>
        <div class="indicatorContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        :choseId="choseInfoId"
                        :listsLength="indicatorList.length"
                        :personListFlag="selectFlag"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @getAllIndicator="getAllIndicator">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowIndicatorCard"
                        ref="multipleTable"
                        :data="indicatorList"
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
                            label="类型"
                            width="120">
                            <template slot-scope="scope">
                               <span>{{scope.row.signboardBean.type | typeFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="200"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="500"
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '指示牌信息',true)">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in indicatorList" v-if="isShowIndicatorCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType":class="getClass(item.signboardBean.type)" @click.stop="showPersonDetail(item, '指示牌信息',true)">
                            <!--<img src="../../../../static/img/indicatorCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                {{item.signboardBean.type | typeFilter}}
                            </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">位置信息：<span>{{item.location}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <DetailDialog v-if="visible"
                              :visible="visible"
                              :Info="indicatorInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewIndicator">
                </DetailDialog>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './funHeader'
    import DetailDialog from './detailDialog'
    import api from '@/api'
    import _ from 'lodash'

    export default {
        name: "indicator-deploy",
        data () {
            return {
                selectFlag:false,
                tempSelects:[],
                isShowIndicatorCard: true,
                checkList: [],
                filterList: [],
                indicatorList: [],
                visible: false,
                indicatorInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false
            }
        },
        methods: {
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/indicatorCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllIndicator()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.indicatorList = this.checkList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                    })
                } else {
                    this.getAllIndicator()
                }
            },
            getClass(type){
                if (type == 0){
                    return 'slogan'
                } else if (type == 1){
                   return ''
                } else{
                    return 'facility'
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title, state) {
                this.indicatorInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({signboardBean:{}}, '添加指示牌信息', false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.indicator.deleteIndicator(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.indicatorList = this.indicatorList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.indicatorList[index].checked = false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllIndicator()
                        }).catch(err => {
                            console.log(err,'删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                }else {
                    this.$message.error('请选择要删除的指示牌数据')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowIndicatorCard = false
                }else {
                    this.isShowIndicatorCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.indicatorList = this.indicatorList.filter(item => {
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
                this.indicatorList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.indicatorList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.indicatorList = this.indicatorList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.indicatorList = this.indicatorList.filter((item,index) => {
                        if (item.signboardBean.type == 0){
                            item.type = '标语'
                        } else if (item.signboardBean.type == 1){
                            item.type = '路线'
                        } else{
                            item.type = '设施'
                        }
                        if (type.includes(item.type)){
                            item.status = true
                        } else if(!type.includes(item.type)){
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item
                    })
                }
            },
            selectedAll (state) {
                this.indicatorList = this.indicatorList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfoId.push(item.id)
                        return item.checked === true
                    } else {
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
                let indicatorObj = {
                    description:info.description,
                    id: info.signboardBean.id,
                    type: info.signboardBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        indicatorObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    toiletObj.pictureId = info.pictureId
                }
                console.log(indicatorObj, 'this is trashObj')
                await api.indicator.updateIndicator(JSON.stringify(indicatorObj)).then(res => {
                    this.closeDialog()
                    console.log('修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllIndicator()
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewIndicator (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let indicatorObj = {
                    description:info.description,
                    type: info.signboardBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        indicatorObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.indicator.createIndicator(JSON.stringify(indicatorObj)).then(res => {
                    this.closeDialog()
                    console.log('增加成功')
                    this.$message.success('创建成功')
                    this.getAllIndicator()
                }).catch(err => {
                    console.log(err, '失败')
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (id) {
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.indicatorList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.indicatorInfo = item
                        }
                    })
                    this.showPersonDetail(this.indicatorInfo, '修改指示牌信息', false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllIndicator () {
                this.isShowLoading = true
                await api.indicator.getAllIndicator().then(res => {
                    console.log(res, '这是数据')
                    this.isShowLoading = false
                    this.indicatorList = res
                    for (let i = 0; i < this.indicatorList.length; i++) {
                        this.indicatorList[i].checked = false
                        this.indicatorList[i].status = true
                        this.indicatorList[i].id = this.indicatorList[i].signboardBean.id
                        this.indicatorList[i].description = this.indicatorList[i].signboardBean.description
                        this.indicatorList[i].location = `${this.indicatorList[i].longitude},${this.indicatorList[i].latitude}`
                        this.indicatorList[i].byTime = -(new Date(this.indicatorList[i].signboardBean.modifyTime)).getTime()
                    }
                    this.indicatorList = _.sortBy(this.indicatorList, 'byTime')
                    this.checkList =this.indicatorList
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
                if (item == 0) {
                    return '标语提示'
                }else if (item == 1) {
                    return '路线提示'
                } else{
                    return '设施提示'
                }
            }
        },
        created () {
            this.getAllIndicator()
        },
        components: {
            ScrollContainer,
            Header,
            DetailDialog
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .indicatorDeploy{
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
        .indicatorContent{
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
                            /*width: rem(15);*/
                            /*height: rem(15);*/
                            /*outline: none;*/
                            /*background: #fff;*/
                            /*background: none;*/
                            position: absolute;
                            right: rem(5);
                            top: rem(0);
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
                    .facility{
                        background: #f39943;
                    }
                    .slogan{
                        background: #f36a5a;
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
            }
        }
    }

</style>
