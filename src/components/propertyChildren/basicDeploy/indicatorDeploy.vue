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
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'>
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
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '指示牌信息')">查看</span>
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
                        <div class="personType" @click.stop="showPersonDetail(item, '指示牌信息')">
                            <img :src="item.picturePath" alt="">
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
                              @closeInfoDialog ="visible = false"
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
    export default {
        name: "indicator-deploy",
        data () {
            return {
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title) {
                this.indicatorInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({signboardBean:{}}, '添加指示牌信息')
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId.push(id)
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
                console.log(this.choseInfoId, 'opopop')
            },
            async fixInfo (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let indicatorObj = {
                    id: info.signboardBean.id,
                    type: info.signboardBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(indicatorObj, 'this is trashObj')
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        indicatorObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，请稍后重试')
                        return
                    })
                }
                await api.indicator.updateIndicator(JSON.stringify(indicatorObj)).then(res => {
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
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let indicatorObj = {
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
                        this.$message.error('上传失败，请稍后重试')
                        return
                    })
                } else {
                    indicatorObj.pictureId = info.pictureId
                }
                await api.indicator.createIndicator(JSON.stringify(indicatorObj)).then(res => {
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
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                }
                if (this.choseInfoId.length > 0) {
                    this.indicatorList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.indicatorInfo = item
                        }
                    })
                    this.showPersonDetail(this.indicatorInfo, '修改指示牌信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的指示牌')
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
                        this.indicatorList[i].location = `${this.indicatorList[i].latitude},${this.indicatorList[i].longitude}`
                    }
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
            padding: rem(5) 0 rem(5) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #0086b3;
            font-weight: 600;
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
                border-bottom: 1px solid #a13309;
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
                            background: red;
                        }
                        span{
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
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
            }
        }
    }

</style>
