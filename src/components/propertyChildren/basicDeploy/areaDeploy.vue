<template>
    <div class="areaDeploy">
        <div class="title">
            片区信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        :allselflag="allSelFlag"
                        @searchAnything="searchAnything">
                </Header>
            </div>
            <div class="personList judge-title" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowAreaCard"
                        ref="multipleTable"
                        :data="areaList"
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
                            label="片区名称"
                            width="120">
                        </el-table-column>

                        <!--<el-table-column
                            prop="placeScenic"
                            label="所在景区">
                        </el-table-column>-->

                        <el-table-column
                            label="位置范围">
                            <template slot-scope="scope">
                                <div class="box">
                                    <div class="bottom">
                                        <el-tooltip class="item" effect="light" :content=scope.row.location placement="bottom">
                                            <el-button>{{scope.row.location}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述"
                            width="240">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row,'片区信息', true)">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in areaList" v-if="isShowAreaCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '片区信息',true)">

                            <img src="../../../../static/img/areaCard.png" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name" v-if="false">所在景区：<span>{{item.placeScenic}}</span></p>
                            <p class="sex text describe">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="areaInfo"
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
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                areaList: [],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading : false,
                allSelFlag:-1
            }
        },
        methods: {
            closeDialog () {
                this.visible = false
                this.getAllArea()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.areaList = this.checkList.filter(item => {
                        if (item.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllArea()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title, state) {
                this.areaInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加片区信息', false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    //this.choseInfoId.push(id)   //列表页删除
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.area.deleteRegion(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.areaList = this.areaList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.areaList[index].checked = false
                                        //this.areaList[index].status = false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.choseInfoId = []
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
                    this.isShowAreaCard = false
                }else {
                    this.isShowAreaCard = true
                }
            },
            checked (id) {

                this.areaList = this.areaList.filter(item => {
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


                /*let that=this;
                this.areaList.forEach(function(item,i){
                    if(item.checked===false){
                        that.allSelFlag=8
                    }
                })*/


            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.areaList = this.areaList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.areaList.filter((item,index) => {
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
                this.areaList = this.areaList.filter((item) => {
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
            fixInfo (info) {
                if (typeof info.location === 'string') {
                    info.location = JSON.parse(info.location)
                }
                let aresObj = {
                    id: info.id,
                    name: info.name,
                    description: info.description,
                    geo: {
                        type:"Polygon",
                        coordinates: info.location
                    }
                }
                api.area.updateRegion(JSON.stringify(aresObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllArea()
                }).catch(err => {
                    if(err.message.includes('请重新选择区域名称！')) {
                        this.$message.error(err.message)
                    } else {
                        this.$message.error('修改失败，请稍后重试')
                    }
                })
            },
            async addNewPerson (info) {
                let aresObj = {
                    name: info.name,
                    description: info.description,
                    geo: {
                        type:"Polygon",
                        coordinates: info.location
                    }
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        aresObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，请稍后重试')
                        return
                    })
                }
                api.area.createRegion(JSON.stringify(aresObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllArea()
                }).catch(err => {
                    if(err.message.includes('请重新选择区域名称！')) {
                        //this.$message.error(err.message)
                        this.$message.error('片区名称不能重复')
                    } else {
                        this.$message.error('创建失败，请稍后重试')
                    }
                })
            },
            fixedInfo (id) {
                if (id) {

                    //this.choseInfoId.push(id)   //列表页修改
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.areaList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.areaInfo = item
                        }
                    })
                    this.showPersonDetail(this.areaInfo, '修改片区信息',false)
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllArea () {
                this.isShowLoading = true
                await api.area.getAllRegion().then(res => {
                    console.log(res, '这是请求回来的片区')
                    this.isShowLoading = false
                    this.areaList = res
                    for (let i = 0; i < this.areaList.length; i++) {
                        this.areaList[i].checked = false
                        this.areaList[i].status = true
                        this.areaList[i].location = this.areaList[i].geo
                        this.areaList[i].byTime = -(new Date(this.areaList[i].modifyTime)).getTime()
                    }
                    console.log(this.areaList)
                    this.areaList = _.sortBy(this.areaList,'byTime')

                    this.checkList = this.areaList
                    this.choseInfoId = []
                }).catch(err => {
                    console.log(err, '失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
           this.getAllArea()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .areaDeploy{
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
            /*.judge-title{
                .cell{
                    white-space: nowrap ;
                    overflow: hidden ;
                    text-overflow: ellipsis ;
                }
            }*/
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
                    .specificInfo{
                        margin-top: rem(10);
                        font-size: rem(12);
                        overflow: hidden;
                        padding: 0 rem(10);
                        box-sizing: border-box;
                        p{
                            margin-left: rem(10);
                            line-height: rem(22);
                        }
                        .text{
                            margin-left: 0;
                            line-height: rem(22);
                            display: inline-block;
                            width: 100%;
                            height: rem(85);
                            overflow:hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:4;
                        }
                        .describe{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display:inline-block;
                        }
                    }
                }
            }
        }
    }

</style>
<style>
    .judge-title  .cell{
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .box .el-button{
        border:1px solid transparent
    }
    .box .el-button span{
        display:inline-block;
        width:300px;
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .el-tooltip__popper {
        width:300px;
    }
</style>
