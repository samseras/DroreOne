<template>
    <div class="department">
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @selectedAll='selectedAll'
                        @searchAnything="searchAnything"
                        @fixedInfo='fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="departmentList"
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
                            prop="name"
                            label="部门名称">
                        </el-table-column>

                        <el-table-column
                            prop="code"
                            label="编号">
                        </el-table-column>

                        <el-table-column
                            prop="postCode"
                            label="邮编">
                        </el-table-column>

                        <el-table-column
                            prop="contactPerson"
                            label="联系人">
                        </el-table-column>

                        <el-table-column
                            prop="contactPhone"
                            label="联系电话">
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
                            width="180"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="fixedInfo(scope.row.id )" v-if="getUserRole[0] === 1">修改</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="showPersonDetail(scope.row, '部门信息',true)">查看</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="deletInfo(scope.row.id)" v-if="getUserRole[0] === 1">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="jobinfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog="visible = false"
                              @fixInfo="fixInfo"
                              @addNewInfo="addNewJob">
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
    import {mapGetters,mapMutations} from 'vuex'

    export default {
        name: 'department',
        data() {
            return {
                allDepartmentList: [],
                isShowPersonCard: true,
                checkList: [],
                visible: false,
                jobinfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                departmentList: []
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM']),
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail(info, title) {
                this.jobinfo = info
                this.visible = true
                this.title = title
                this.isDisabled = true
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.departmentList = this.allDepartmentList.filter(item => {
                        if (
                            item.name.includes(info)
                            || (item.name && item.name.includes(info))
                            || (item.description && item.description.includes(info))) {
                            return item
                        }
                    })
                } else {
                    this.getAllDepartment()
                }
            },
            addNewInfo() {
                this.showPersonDetail({personBean: {}}, '添加部门信息')
                this.isDisabled = false
            },
            deletInfo(id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.user.deleteUserDepartment(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllDepartment()
                        }).catch(err => {
                            console.log(err)
                            this.$message.error(err.message)
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })

                } else {
                    this.$message.error('请选择要删除的部门信息')
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
                this.departmentList = this.departmentList.filter(item => {
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
            },
            selectedAll(state) {
                this.departmentList = this.departmentList.filter((item) => {
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
            },
            async fixInfo(info) {
                let jobObj = {...info}
                await api.user.updataUserDepartment(JSON.stringify(jobObj)).then(res => {
                    this.$message.success('更新成功')
                    this.choseInfoId = []
                    this.visible = false
                    this.getAllDepartment()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            async addNewJob(info) {
                let personObj = {...info }
                await api.user.createdUserDepartment(JSON.stringify(personObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.visible = false
                    this.getAllDepartment()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo(id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                }
                if (this.choseInfoId.length > 0) {
                    this.departmentList.map((item) => {
                        if (item.id === this.choseInfoId[0]) {
                            this.jobinfo = item
                        }
                    })
                    this.showPersonDetail(this.jobinfo, '修改部门信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的部门信息')
                }
            },
            async getAllDepartment () {
                this.isShowLoading = true
                await api.user.getUserDepartment().then(res => {
                    console.log(res, '这是请求回来的')
                    this.isShowLoading = false
                    this.allDepartmentList = res
                    let date = new Date().getTime()
                    let obj = {totalNum: res.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.departmentList = this.allDepartmentList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum-1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.departmentList.forEach(item => {
                        item.checked = false
                        item.status = true
                        item.byTime = -(new Date(item.modifyTime).getTime())
                    })
                    this.departmentList = _.sortBy(this.departmentList, 'byTime')
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        created() {
            this.getAllDepartment()
        },
        watch: {
            getCurrentNum () {
                this.getAllDepartment()
            }
        },
        computed: {
            ...mapGetters(['getUserRole', 'getCurrentNum'])
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },

    }
</script>

<style lang="scss">
    .department .box .el-button{
        border:1px solid transparent;
        background: transparent;
        text-align: left;
        padding: 0;
    }
    .department .el-tooltip__popper {
        width:200px;
        word-break:break-all;
        text-align: left;
    }
    .department {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
        .el-table__header-wrapper .el-table td,.el-table th {
            padding: rem(7) 0;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .department {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
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
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            padding-top: rem(20);
            .funcTitle {
                width: 100%;
                height: rem(30);
                border-bottom: 1px solid #ccc;
            }
            .personList {
                width: 100%;
                height: calc(100% - 32px);
                padding-top: rem(15);
                box-sizing: border-box;
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
                            position: absolute;
                            right: rem(5);
                            top: rem(0);
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
                .handle {
                    span{
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>

