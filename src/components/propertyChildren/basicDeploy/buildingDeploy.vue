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
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowToiletCard"
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
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="building.buildYear"
                            label="年代">
                        </el-table-column>
                        <el-table-column
                            prop="building.height"
                            label="高度">
                        </el-table-column>
                        <el-table-column
                            prop="building.layers"
                            label="层高">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '建筑信息')">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in buildList" v-if="isShowToiletCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '卫生间信息')">
                            <img src="../../../../static/img/bulidCard.png" alt="">
                            <span class="type">
                                  {{item.building.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代：<span>{{item.building.buildYear}}</span></p>
                            <p class="sex">层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：<span>{{item.building.layers}}层</span></p>
                            <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<span>{{item.location}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="buildInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewToilet">
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
    import moment from 'moment'
    export default {
        name: "build-deploy",
        data(){
            return{
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
                isShowLoading: false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title) {
                this.buildInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({building:{}}, '添加卫生间信息')
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
                        api.build.deleteBuild(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.buildList = this.buildList.filter((item, index) => {
                                    if (item.building.id === this.choseInfoId[i]){
                                        this.buildList[index].checked = false
                                    }
                                    return item.building.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的卫生间信息')
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
                await api.build.updateBuild(JSON.stringify(buildObj)).then(res => {
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
                await api.build.createBuild(JSON.stringify(buildObj)).then(res => {
                    console.log(res, '添加成功')
                    this.$message.success('创建成功')
                    this.getAllBuild()
                }).catch(err => {
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
                    this.buildList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.buildInfo = item
                        }
                    })
                    this.showPersonDetail(this.buildInfo, '修改卫生间信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的洗手间')
                }
            },
            async getAllBuild () {
                this.isShowLoading = true
                await api.build.getAllBuild().then(res => {
                    console.log(res, '这是请求回来的所有')
                    this.isShowLoading = false
                    this.buildList = res
                    for (let i = 0; i < this.buildList.length; i++) {
                        this.buildList[i].checked = false
                        this.buildList[i].status = true
                        this.buildList[i].location = `${this.buildList[i].longitude},${this.buildList[i].latitude}`
                        this.buildList[i].id = this.buildList[i].building.id
                        // this.treeList[i].state = '正常'
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
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
            PersonDetail
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
