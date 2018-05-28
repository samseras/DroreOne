<template>
    <div class="personDeploy">
        <div class="title">
            {{smallTitle}}
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @choseType='choseType'
                        @selectedAll='selectedAll'
                        :choseId="choseInfoId"
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @fixedInfo='fixedInfo'
                        @searchAnything="searchAnything"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @getAllPerson="getAllPerson">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowPersonCard"
                        ref="multipleTable"
                        :data="personList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)"
                                             class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="personBean.name"
                            label="姓名"
                            >
                        </el-table-column>

                        <!--<el-table-column
                            prop="jobName"
                            label="人员角色">
                        </el-table-column>-->

                        <el-table-column
                            prop="personBean.gender"
                            width="120"
                            label="性别">
                            <template slot-scope="scope">
                                <span>{{scope.row.personBean.gender | sexFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="身份证号">
                            <template slot-scope="scope">
                                <span>{{scope.row.personBean.idNum | idNumFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="personBean.phone"
                            label="电话号码">
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
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="showPersonDetail(scope.row, '人员信息',true)">查看</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="(item,index) in personList" v-if="isShowPersonCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)"
                                         class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '人员信息',true)">
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <!--<p class="name">
                                姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{item.name}}</span></p>-->
                            <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>{{item.gender | sexFilter}}</span>
                            </p>
                            <p class="idNum">身份证号：<span>{{item.idNum | idNumFilter}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.phone}}</span>
                            </p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="personInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog="closeDialog"
                              v-loading="isShowDialogLoading"
                              @fixInfo="fixInfo"
                              @addNewInfo="addNewPerson">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>
<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from '../propertyChildren/basicDeploy/funHeader'
    import PersonDetail from '../propertyChildren/basicDeploy/detailDialog'
    import api from '@/api'
    import _ from 'lodash'

    export default {
        name: 'person-deploy',
        data() {
            return {
                smallTitle:'职业',
                selectFlag:false,
                tempSelects:[],
                isShowPersonCard: true,
                checkList: [],
                filterList: [],
                personList: [],
                visible: false,
                personInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                isShowDialogLoading: false,
                currentNum: 50,
                listLength: '',
                pageNum: 1
            }
        },
        methods: {
            closeDialog () {
                this.visible = false
                this.getAllPerson()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.personList = this.checkList.filter(item => {
                        if (item.personBean.name.includes(info)) {
                            return item
                        }
                        if (item.phone.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllPerson()
                }
            },
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    let imgSrc
                    switch (this.$route.params.id) {
                        case '1': {
                            imgSrc = './../../../static/img/driveCard.png';
                            this.smallTitle='司机';
                            break
                        }
                        case '2': {
                            imgSrc = './../../../static/img/boatCard.png';
                            this.smallTitle='船夫';
                            break
                        }
                        case '3': {
                            imgSrc = './../../../static/img/clearCard.png';
                            this.smallTitle='安保';
                            break
                        }
                        case '4': {
                            imgSrc = './../../../static/img/clearCard.png';
                            this.smallTitle='保洁';
                            break
                        }
                        case '5': {
                            imgSrc = './../../../static/img/saleTrickCard.png';
                            this.smallTitle='售票';
                            break
                        }
                        case '6': {
                            imgSrc = './../../../static/img/trickCard.png';
                            this.smallTitle='检票';
                            break
                        }
                        case '7': {
                            imgSrc = './../../../static/img/keepServ.png';
                            this.smallTitle='维保';
                            break
                        }
                        case '8': {
                            this.smallTitle='管理者';
                            break
                        }
                        default:{
                            imgSrc = './../../../static/img/driveCard.png';
                        }
                    }
                    return imgSrc
                } else {
                    return url
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail(info, title, state) {
                this.personInfo = info
                this.visible = true
                this.title = title
                this.isDisabled = state
            },
            addNewInfo() {
                this.showPersonDetail({}, '添加人员信息',false)
            },
            deletInfo(id) {
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.person.deletePerson(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.personList = this.personList.filter((item, index) => {
                            //         if (item.id === this.choseInfoId[i]) {
                            //             this.personList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllPerson()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllPerson()
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })

                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            toggleList(type) {
                if (type === 'list') {
                    this.isShowPersonCard = false
                } else {
                    this.isShowPersonCard = true
                }
            },
            checked(id) {
                this.tempSelects=[];
                this.personList = this.personList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item

                })
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) => {
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
                console.log(this.personList)
                let that=this;
                this.personList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.personList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }

            },
            choseType(type) {
                console.log(type)
                if (type.length === 0) {
                    this.personList = this.personList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.personList = this.personList.filter((item, index) => {
                        if (type.includes(item.jobName)) {
                            item.status = true
                        } else if (!type.includes(item.jobName)) {
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item
                    })
                }
            },
            selectedAll(state) {
                this.personList = this.personList.filter((item) => {
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
            async fixInfo(info) {
                console.log(info)
                let personObj = {
                    description:info.description,
                    id: info.id,
                    name: info.name,
                    gender: info.gender,
                    idNum: info.idNum,
                    phone: info.phone,
                    jobId: info.jobId
                }
                console.log(personObj, 'this is trashObj')
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        personObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    personObj.pictureId = info.pictureId
                }
                console.log(personObj)
                await api.person.updatePerson(JSON.stringify(personObj)).then(res => {
                    console.log(res)
                    this.closeDialog()
                    this.$message.success('修改成功')
                    console.log('修改成功')
                    this.choseInfoId = []
                    this.getAllPerson()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
                this.getAllPerson()
            },
            async addNewPerson(info) {
                this.isShowDialogLoading = true
                console.log(info, 'opopopopopo')
                let personObj = {
                    description:info.description,
                    name: info.name,
                    gender: info.gender,
                    idNum: info.idNum,
                    phone: info.phone,
                    jobId: info.jobId
                }
                console.log(personObj, 'this is trashObj')
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        personObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.person.createPerson(JSON.stringify(personObj)).then(res => {
                    this.isShowDialogLoading = false
                    this.closeDialog()
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllPerson()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.isShowDialogLoading = false
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo(id) {
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.personList.map((item) => {
                        if (item.id === this.choseInfoId[0]) {
                            this.personInfo = item
                        }
                    })
                    this.showPersonDetail(this.personInfo, '修改人员信息', false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllPerson()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllPerson()
            },

            async getAllPerson() {
                this.choseInfoId = []       //人员切换左侧选项卡去掉上项的默认选择
                this.isShowLoading = true
                let id = this.$route.params.id
                await api.person.getJobPerson(id).then(res => {
                    console.log(res, '这是请求回来的')
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.personList = res
                    this.personList = this.personList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    for (let i = 0; i < this.personList.length; i++) {
                        this.personList[i].checked = false
                        this.personList[i].status = true
                        this.personList[i].jobId = this.$route.params.id
                        this.personList[i].gender = this.personList[i].personBean.gender
                        this.personList[i].id = this.personList[i].personBean.id
                        this.personList[i].idNum = this.personList[i].personBean.idNum
                        this.personList[i].name = this.personList[i].personBean.name
                        this.personList[i].phone = this.personList[i].personBean.phone
                        this.personList[i].description = this.personList[i].personBean.description
                        this.personList[i].personBean.modifyTime=this.personList[i].personBean.modifyTime.replace("-","/")
                        this.personList[i].byTime = -(new Date(this.personList[i].personBean.modifyTime)).getTime()
                        console.log(new Date(this.personList[i].personBean.modifyTime).getTime())
                    }
                    this.personList = _.sortBy(this.personList,'byTime')
                    console.log(this.personList, 'p[p[p[p[p[p[p[p[p[p[p[p[p[[pp')
                    this.checkList = this.personList

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        filters: {
            sexFilter(item) {
                if (item == 1) {
                    return '男'
                } else {
                    return '女'
                }
            },
            idNumFilter(id) {
                if(id){
                    let leftId =  id.substring(0, 6)
                    let rightId = id.substring(14)
                    return `${leftId}********${rightId}`
                }
            }
        },
        created() {
            this.personList = []
            this.getAllPerson()
        },
        watch: {
            '$route' () {
                this.pageNum = 1
                this.personList = []
                this.getAllPerson()
            }
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>
<style>
    .personDeploy .box .el-button{
        border:1px solid transparent;
        padding-left:0px;
        text-align:left;
    }
    .personDeploy .box .el-button span{
        display:inline-block;
        width:200px;
        white-space: nowrap ;
        overflow: hidden ;
        text-overflow: ellipsis ;
    }
    .personDeploy .el-tooltip__popper {
        width:200px;
        word-break:break-all;
        text-align: left;
    }
</style>
<style lang="scss" scoped type="text/scss">
    .personDeploy {
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
        .personContent {
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
            .personList {
                width: 100%;
                flex: 1;
                margin-top: rem(20);
                .personInfo {
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox {
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                        position: relative;
                        .checkBtn {
                            /*width: rem(15);*/
                            /*height: rem(15);*/
                            /*outline: none;*/
                            /*background: #fff;*/
                            /*background: none;*/
                            position: absolute;
                            right: rem(5);
                            /*top: rem(0);*/
                            cursor: pointer;
                        }
                    }
                    .personType {
                        width: 100%;
                        height: rem(20);
                        background: #0086b3;
                        position: relative;
                        font-size: rem(12);
                        img {
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);
                            background: red;
                        }
                        span {
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
                        }
                    }
                    .specificInfo {
                        margin-top: rem(5);
                        font-size: rem(12);
                        p {
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

