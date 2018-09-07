<template>
    <div class="personDeploy">
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @selectedAll='selectedAll'
                        :choseId="choseInfoId"
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @fixedInfo='fixedInfo'
                        @searchAnything="searchAnything"
                        @selectDepartment="filterPersonList"
                        @selectJob="filterPersonList"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @getAllPerson="getAllPerson">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowPersonCard && !show"
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
                            prop="cnName"
                            label="姓名"
                            >
                        </el-table-column>

                        <el-table-column
                            width="120"
                            label="性别">
                            <template slot-scope="scope">
                                <span>{{scope.row.gender | sexFilter}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="departmentName"
                            label="部门">
                        </el-table-column>

                        <el-table-column
                            prop="jobName"
                            label="岗位">
                        </el-table-column>

                        <el-table-column
                            prop="roleName"
                            label="角色">
                        </el-table-column>

                        <el-table-column
                            prop="mobileNum"
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
                                <div class="handle">
                                    <span @click="fixedInfo(scope.row)" v-if="getUserRole[0] === 1">修改</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="showPersonDetail(scope.row, '人员信息',true)">查看</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="deletInfo(scope.row.id)" v-if="getUserRole[0] === 1">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo"  v-for="(item,index) in personList" v-if="isShowPersonCard && item.status">
                        <el-checkbox v-model="item.checked" @change="checked(item.id)"
                                     class="checkBtn"></el-checkbox>
                        <div class="personType">
                            <img :src="getUrl(item.iconId)" alt="" @error="imgError">
                        </div>
                        <div class="specificInfo">
                            <p class="name">
                                姓名：<span>{{item.cnName}}</span></p>
                            <p class="sex">性别：<span>{{item.gender | sexFilter}}</span>
                            </p>
                            <p class="idNum">部门：<span>{{item.departmentName }}</span></p>
                            <p class="phoneNum">岗位：<span>{{item.jobName}}</span></p>
                            <p class="phoneNum">角色：<span>{{item.roleName}}</span></p>
                            <p class="phoneNum">电话：<span>{{item.mobileNum}}</span></p>
                        </div>
                        <div class="operate">
                            <span @click="fixedInfo(item)" v-if="getUserRole[0] === 1">修改</span>
                            <span @click="showPersonDetail(item, '人员信息',true)">查看</span>
                            <span @click="deletInfo(item.id)" v-if="getUserRole[0] === 1">删除</span>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
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
    import Header from '@/components/Orginization/OrginizHeader'
    import PersonDetail from '@/components/Orginization/Orginizadialog'
    import api from '@/api'
    import _ from 'lodash'
    import {mapGetters} from 'vuex'

    export default {
        name: 'person-deploy',
        data() {
            return {
                selectFlag:false,
                tempSelects:[],
                isShowPersonCard: true,
                checkList: [],
                personList: [],
                visible: false,
                show: false,
                personInfo: {},
                choseInfoId: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                isShowDialogLoading: false,
                listLength: '',
                pageNum: 1
            }
        },
        methods: {
            closeDialog () {
                this.visible = false
                this.getAllPerson()
            },
            filterPersonList (jobList, depList) {
                this.personList = this.checkList.filter(item => {
                    if (jobList.length === 0 && depList.length === 0) {
                        return item
                    } else if (jobList.length === 0) {
                        if (depList.includes(item.departmentName)) {
                            return item
                        }
                    } else if (depList.length === 0) {
                        if (jobList.includes(item.jobName)) {
                            return item
                        }
                    } else {
                        if (jobList.includes(item.jobName) && depList.includes(item.departmentName)) {
                            return item
                        }
                    }
                })
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.personList = this.checkList.filter(item => {
                        if (
                            item.name.includes(info)
                            || (item.cnName && item.cnName.includes(info))
                            || (item.workAddress && item.workAddress.includes(info))
                            || (item.fixedPhoneNum && item.fixedPhoneNum.includes(info))
                            || (item.mobileNum && item.mobileNum.includes(info))
                            || (item.description && item.description.includes(info))) {
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
                    let imgSrc = './../../../static/img/defult.png'
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
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.user.deleteUserInfo(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.getAllPerson()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
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
                let personObj = {...info}
                console.log(personObj, 'this is trashObj')
                if (info.imgUrl && info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        personObj.iconId = res.path
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    personObj.iconId = info.iconId
                }
                delete personObj.checked
                delete personObj.status
                for (let i in personObj) {
                    if (personObj[i] === null || personObj[i] === '') {
                        delete personObj[i]
                    }
                }
                await api.user.updataUserInfo(JSON.stringify(personObj)).then(res => {
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
                let personObj = {...info}
                console.log(personObj, 'this is trashObj')
                if (info.imgUrl && info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        personObj.iconId = res.path
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.user.createdUserInfo(JSON.stringify(personObj)).then(res => {
                    this.isShowDialogLoading = false
                    this.closeDialog()
                    this.$message.success('添加成功')
                    this.getAllPerson()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.isShowDialogLoading = false
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo(item) {
                this.personInfo = item
                this.showPersonDetail(this.personInfo, '修改人员信息', false)
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
                await api.user.getUserInfo().then(res => {
                    console.log(res, '这是请求回来的')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.personList = res
                    this.personList = this.personList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.personList = _.sortBy(this.personList,'byTime')
                    this.personList.forEach(item => {
                        item.status = true
                        item.checked = false
                        if (item.department) {
                            item.departmentName = item.department.name
                        } else {
                            item.departmentName = ''
                        }
                        if (item.role) {
                            item.roleName = item.role.name
                        } else {
                            item.roleName = ''
                        }
                        if (item.job) {
                            item.jobName = item.job.name
                        } else {
                            item.jobName = ''
                        }
                        item.byTime = -(new Date(item.modifyTime).getTime())
                    })
                    this.personList = _.sortBy(this.personList, 'byTime')
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
                if (item == 0) {
                    return '女'
                } else {
                    return '男'
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
        computed: {
            ...mapGetters(['getUserRole'])
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>
<style lang="scss" type="text/scss">
    .personDeploy .box .el-button{
        border:1px solid transparent;
        padding: 0;
        text-align:left;
        background: transparent;
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
    .personDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
            .el-table th, .el-table tr{
                background-color: transparent !important;
            }
    }
    .personDeploy{
        .el-checkbox__input{
            /*vertical-align: top;*/
        }
        .el-table__header-wrapper .el-table td,.el-table th {
            padding: rem(7) 0;
        }
    }

</style>
<style lang="scss" scoped type="text/scss">
    .personDeploy {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
        .personContent {
            width: 100%;
            height: 100%;
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding-top: rem(20);
            .funcTitle {
                width: 100%;
                height: rem(30);
                border-bottom: 2px solid #ccc;
            }
            .personList {
                width: 100%;
                height: calc(100% - 32px);
                padding-top: rem(15);
                box-sizing: border-box;
                .personInfo {
                    width: rem(380);
                    height: rem(160);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(10);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    position: relative;
                    background: #fafafa;
                    .checkBtn {
                        width: rem(15);
                        height: rem(15);
                        cursor: pointer;
                        position: absolute;
                        right: rem(5);
                        top: rem(3);
                    }
                    .personType {
                        width: rem(120);
                        height: 100%;
                        position: relative;
                        float: left;
                        box-shadow: 7px 0px 35px -13px #6a6a6a;
                        img {
                            width: 100%;
                            height: 100%;
                            display: inline-block;
                        }
                    }
                    .specificInfo {
                        width: rem(200);
                        height: 100%;
                        float: left;
                        padding: rem(10) rem(5) rem(10) rem(10);
                        box-sizing: border-box;
                        position: relative;
                        p {
                            line-height: rem(24);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:after{
                            position: absolute;
                            content: "";
                            width: 1px;
                            height: 70%;
                            right: rem(10);
                            top: 50%;
                            transform: translateY(-50%);
                            background: #e6e6e6;
                        }
                    }
                    .operate{
                        width: calc(100% - 320px);
                        height: 100%;
                        float: right;
                        span{
                            display: block;
                            border: 1px solid #ccc;
                            border-radius: rem(50);
                            background: #fafafa;
                            cursor: pointer;
                            margin-top: rem(8);
                            text-align: center;
                            margin-right: rem(5);
                            font-size: rem(14);
                        }
                        span:nth-of-type(1) {
                            margin-top: rem(40);
                        }
                    }
                }
                .tip{
                    width:100%;
                    height:rem(40);
                    text-align: center;
                    color: #909399
                }
                .handle {
                    span{
                        cursor: pointer;
                    }

                }
            }
        }
    }

</style>

