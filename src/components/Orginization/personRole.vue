<template>
    <div class="personRole">
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @selectedAll='selectedAll'
                        @fixedInfo='fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="personRoleList"
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
                            width="160"
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            width="600"
                            label="权限">
                            <template slot-scope="scope">
                                <div class="rolesBox">
                                    <span v-for="(item, index) in scope.row.right"class="roleNames">{{item | rolesFilter}}</span>
                                </div>
                                <!--<div class="box" v-if="scope.row.right">-->
                                    <!--<div class="bottom">-->
                                        <!--<el-tooltip class="item" effect="light" :content=scope.row.right placement="bottom">-->
                                           <!---->
                                        <!--</el-tooltip>-->
                                    <!--</div>-->
                                <!--</div>-->
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
                            width="180"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="fixedInfo(scope.row)" v-if="getUserRole[0] === 1">修改</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="showPersonDetail(scope.row, '角色信息',true)">查看</span>
                                    <span class="line" v-if="getUserRole[0] === 1">|</span>
                                    <span @click="deletInfo(scope.row.id)" v-if="getUserRole[0] === 1">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="roleInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog="visible = false"
                              @fixInfo="fixInfo"
                              @addNewInfo="addNewRole">
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
        name: 'person-role',
        data() {
            return {
                isShowPersonCard: true,
                checkList: [],
                visible: false,
                roleInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                personRoleList: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail(info, title,state) {
                this.roleInfo = info
                this.visible = true
                this.title = title
                this.isDisabled = state
            },
            addNewInfo() {
                this.showPersonDetail({personBean: {}}, '添加角色信息', false)
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
                        api.user.deleteUserRoleInfo(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            this.getAllUserRoleInfo()
                            this.choseInfoId = []
                        }).catch(err => {
                            console.log(err)
                            this.$message.error(err.message)
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })

                } else {
                    this.$message.error('请选择要删除的人员角色信息')
                }
            },
            checked(id) {
                this.personRoleList = this.personRoleList.filter(item => {
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
                this.personRoleList = this.personRoleList.filter((item) => {
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
            async fixInfo(info) {
                let permiss = []
                // console.log(info, 'this is fix info')
                info.rolesIds.forEach(item => {
                    console.log(item, 'item info')
                    if (item.id) {
                        permiss.push({...item})
                    } else {
                        permiss.push({id: item})
                    }

                })
                let jobObj = {
                    id: info.id,
                    name: info.name,
                    description: info.description,
                    permissions: permiss
                }
                console.log(jobObj, 'this is trashObj')
                await api.user.updataUserRoleInfo(JSON.stringify(jobObj)).then(res => {
                    this.$message.success('更新成功')
                    console.log('增加成功')
                    this.choseInfoId = []
                    this.visible = false
                    this.getAllUserRoleInfo()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            async addNewRole(info) {
                let roleObj = {
                    name: info.name,
                    description: info.description,
                    permissions: info.rolesIds
                }
                await api.user.createdUserRoleInfo(JSON.stringify(roleObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.visible = false
                    this.getAllUserRoleInfo()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo(item) {
                this.roleInfo = item
                this.showPersonDetail(this.roleInfo, '修改角色信息', false)
            },
            async getAllUserRoleInfo() {
                this.isShowLoading = true
                await api.user.getUserRoleInfo().then(res => {
                    console.log(res, '这个是请求回来的数据')
                    this.isShowLoading = false
                    this.personRoleList = res
                    this.personRoleList.forEach(item => {
                        item.right = item.permissions.map(item1 => {
                           if (item1 !== null && item1.module) {
                               return item1.module
                           }
                        })
                        item.rolesIds = item.permissions.map(item2 => {
                            if (item2 !== null && item2.id) {
                                return item2.id
                            }
                        })
                        item.checked = false
                        item.status = true
                        item.byTime = -(new Date(item.modifyTime).getTime())
                    })
                    this.personRoleList = _.sortBy(this.personRoleList, 'byTime')
                }).catch(err => {
                    console.log(err, '请求角色失败')
                    this.isShowLoading = false
                })
            }
        },
        filters: {
            rolesFilter (item) {
                if (item) {
                    if (item.includes('/')) {
                        item = item.substring(item.indexOf('/') + 1, item.length)
                    }
                    return item
                }
            }
        },
        created() {
            this.getAllUserRoleInfo()
        },
        computed: {
            ...mapGetters(['getUserRole'])
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },

    }
</script>

<style lang="scss">
    .personRole .box .el-button{
        border:1px solid transparent;
        background: transparent;
        text-align: left;
        padding: 0;
    }
    .personRole .el-tooltip__popper {
        width:200px;
        word-break:break-all;
        text-align: left;
    }
    .personRole {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
        .el-table__header-wrapper .el-table td,.el-table th {
            padding: rem(7) 0;
        }
        .el-table__body-wrapper .rolesBox{
            width: 100% ;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .personRole {
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
                .roleNames{
                    margin-right: rem(5);
                }
            }
        }
    }

</style>

