<template>
    <div class="roatDeploy">
        <div class="title">
            路网信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        :personListFlag="selectFlag"
                        :listsLength = 'listLength'
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @searchAnything="searchAnything">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowRoatCard"
                        ref="multipleTable"
                        :data="roatList"
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
                            label="路线名称"
                            width="200">
                            <template slot-scope="scope">
                                <span class="overflow">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="路线类型"
                            width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.routeType}}</span>
                            </template>
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
                                    <span @click="showPersonDetail(scope.row,'路网信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in roatList" v-if="isShowRoatCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '路网信息',true)">
                            <img src="../../../../static/img/loadCard.png" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="sex">路线类型：<span>{{item.type | typeFilter}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="roatInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewRoat">
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
        name: "roat-deploy",
        data(){
            return{
                selectFlag:false,
                tempSelects:[],
                isShowRoatCard: true,
                checkList: [],
                filterList: [],
                roatList: [],
                visible: false,
                roatInfo: {},
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
            closeDialog () {
                this.visible = false
                this.getAllRoat()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.roatList = this.checkList.filter(item => {
                        if (item.name.includes(info)) {
                            return item
                        }
                        if (item.routeType.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllRoat()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title,state) {
                this.roatInfo = info
                this.visible = true
                this.title = title
                this.isDisabled = state
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加路网信息', false)
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
                        api.deployRoad.deleteRoute(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.roatList = this.roatList.filter((item, index) => {
                            //         if (item.id === this.choseInfoId[i]){
                            //             this.roatList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllRoat()
                            this.choseInfoId = []
                            this.getAllRoat()
                        }).catch(err => {
                            this.$message.error('删除失败，请稍后重试')
                            console.log(err)
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的数据')
                    return
                }

            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowRoatCard = false
                }else {
                    this.isShowRoatCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.roatList = this.roatList.filter(item => {
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
                this.roatList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.roatList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.roatList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.roatList.filter((item,index) => {
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
                this.roatList = this.roatList.filter((item) => {
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
            fixInfo (info) {
                console.log()
                if (typeof info.location === 'string') {
                    info.location = JSON.parse(info.location)
                }
                console.log(info.location, 'opopop')
                let roatObj = {
                    id: info.id,
                    name: info.name,
                    description: info.description,
                    geo: {
                        type:"LineString",
                        coordinates: info.location
                    },
                    type: info.type
                }
                api.deployRoad.updateRoute(JSON.stringify(roatObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllRoat()
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                })
            },
           async addNewRoat (info) {
                let roatObj = {
                    name: info.name,
                    description: info.description,
                    geo: {
                        type:"LineString",
                        coordinates: info.location
                    },
                    type: info.type
                }
                api.deployRoad.createRoute(JSON.stringify(roatObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllRoat()
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
                    this.roatList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.roatInfo = item
                        }
                    })
                    this.showPersonDetail(this.roatInfo, '修改路网信息', false)
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllRoat()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllRoat()
            },
            async getAllRoat () {
                this.isShowLoading = true
                await api.deployRoad.getAllRoute().then(res => {
                    console.log(res, '请求路网成功')
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.roatList = res
                    this.roatList = this.roatList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    for (let i = 0; i < this.roatList.length; i++) {
                        this.roatList[i].checked = false
                        this.roatList[i].status = true
                        this.roatList[i].location = this.roatList[i].geo
                        if (this.roatList[i].type == 1) {
                            this.roatList[i].routeType = '水路'
                        }
                        if (this.roatList[i].type == 2) {
                            this.roatList[i].routeType = '公交道路'
                        }
                        if (this.roatList[i].type == 3) {
                            this.roatList[i].routeType = '步行道路'
                        }
                        if (this.roatList[i].type == 4) {
                            this.roatList[i].routeType = '驾车路线'
                        }
                        // this.roatList[i].byTime = this.roatList[i].modifyTime
                    }
                    this.checkList = this.roatList
                    this.choseInfoId = []

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        created () {
            this.getAllRoat()
            // for (let i = 0; i < this.roatList.length; i++) {
            //     this.roatList[i].checked = false
            //     this.roatList[i].status = true
            // }
            // this.choseList = this.roatList
        },
        filters: {
            typeFilter (item) {
                if (item == 1) {
                    return '水路'
                }
                if (item == 2) {
                    return '公交道路'
                }
                if (item == 3) {
                    return '步行道路'
                }
                if (item == 4) {
                    return '驾车路线'
                }
            }
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>
<style lang="scss" type="text/scss">
    .roatDeploy .box .el-button{
        border:1px solid transparent;
        background: transparent;
        text-align: left;
        padding: 0;
    }
    .roatDeploy .box .el-button span{
        display:inline-block;
        width:300px;
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .roatDeploy .el-tooltip__popper {
        width:300px;
        word-break:break-all;
    }
    .roatDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .roatDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .roatDeploy{
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
                    overflow: hidden;
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
                        overflow: hidden;
                        padding: 0 rem(10);
                        box-sizing: border-box;
                        p{
                            line-height: rem(22);
                        }
                        .text{
                            margin-left: 0;
                            line-height: rem(22);
                            display: inline-block;
                            width: 100%;
                            height: rem(65);
                            overflow:hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:3;
                        }
                    }
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
