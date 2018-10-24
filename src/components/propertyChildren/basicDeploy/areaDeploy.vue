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
                        :personListFlag="selectFlag"
                        @searchAnything="searchAnything">
                </Header>
            </div>
            <div class="personList judge-title" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowAreaCard && !show"
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
                            width="200">
                             <template slot-scope="scope">
                                 <span class="overflow">{{scope.row.name}}</span>
                             </template>
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
                                    <span @click="showPersonDetail(scope.row,'片区信息', true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
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
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
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
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'area-deploy',
        data(){
            return{
                allAreaList: [],
                selectFlag:false,
                tempSelects:[],
                isShowAreaCard: true,
                checkList: [],
                areaList: [],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
                isShowLoading : false,
                currentNum: 50,
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM']),
            closeDialog () {
                this.visible = false
                this.getAllArea()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.areaList = this.allAreaList.filter(item => {
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
                    this.choseInfoId = [id]
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
                            this.getAllArea()
                            this.choseInfoId = []
                            this.getAllArea()
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
            checked(id) {
                this.tempSelects=[];
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

                let that=this;
                this.areaList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.areaList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
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
                this.selectFlag=true
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
                    this.choseInfoId = [id]
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
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allAreaList = res
                    let date = new Date().getTime()
                    let obj = {totalNum: res.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    for (let i = 0; i < this.allAreaList.length; i++) {
                        this.allAreaList[i].checked = false
                        this.allAreaList[i].status = true
                        this.allAreaList[i].location = this.allAreaList[i].geo
                        this.allAreaList[i].modifyTime=this.allAreaList[i].modifyTime.replace("-","/")
                        this.allAreaList[i].byTime = -(new Date(this.allAreaList[i].modifyTime)).getTime()
                    }
                    this.allAreaList = _.sortBy(this.allAreaList,'byTime')
                    this.areaList = this.allAreaList.filter((item,index) => {
                        if (index < (this.getCurrentNum *  35) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.checkList = this.areaList
                    this.choseInfoId = []
                    this.selectFlag=false
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
        },
        watch: {
            getCurrentNum () {
                this.getAllArea()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>
<style lang="scss" type="text/scss">
    .areaDeploy .box .el-button{
        border:1px solid transparent;
        background: transparent;
        text-align: left;
        padding: 0;
    }
    .areaDeploy .box .el-button span{
        display:inline-block;
        width:300px;
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .areaDeploy .el-tooltip__popper {
        width:300px;
        word-break:break-all;
    }
    .areaDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .areaDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
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
        .overflow {
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            display:inline-block;
        }
    }

</style>

