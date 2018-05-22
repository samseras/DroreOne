<template>
    <div class="personType">
        <div class="title">
            职业
        </div>
        <div class="personContent">
            <div class="funcTitle" v-if="false">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @selectedAll='selectedAll'
                        @fixedInfo='fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="jobList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">

                        <!--<el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)"
                                             class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>-->

                        <el-table-column
                            prop="name"
                            label="职业"
                            width="960">
                        </el-table-column>

                        <el-table-column>
                            <!--label="操作">-->
                            <!--<template slot-scope="scope">-->
                                <!--<span @click="fixedInfo(scope.row.id )">编辑</span>-->
                                <!--<span class="line">|</span>-->
                                <!--<span @click="showPersonDetail(scope.row, '人员信息')">查看</span>-->
                                <!--<span class="line">|</span>-->
                                <!--<span @click="deletInfo(scope.row.id)">删除</span>-->
                            <!--</template>-->
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
    import Header from '../propertyChildren/basicDeploy/funHeader'
    import PersonDetail from '../propertyChildren/basicDeploy/detailDialog'
    import api from '@/api'
    import {mapMutations} from 'vuex'

    export default {
        name: 'person-deploy',
        data() {
            return {
                isShowPersonCard: true,
                checkList: [],
                filterList: [],
                jobList: [],
                visible: false,
                jobinfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false
            }
        },
        methods: {
            ...mapMutations(['JOB_TYPE','DEL_JOB_TYPR']),
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail(info, title) {
                this.jobinfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo() {
                this.showPersonDetail({personBean: {}}, '添加人员类型信息')
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
                        api.person.deleteJob(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.jobList = this.jobList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]) {
                                        this.jobList[index].checked = false
                                    }
                                    this.$store.commit('DEL_JOB_TYPR',this.choseInfoId[i])
                                    return item.id !== this.choseInfoId[i]

                                })
                            }
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
                    this.$message.error('请选择要删除的人员类型信息')
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
                this.jobList = this.jobList.filter(item => {
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
            // choseType(type) {
            //     console.log(type)
            //     if (type.length === 0) {
            //         this.jobList = this.jobList.filter((item) => {
            //             item.status = true
            //             return item
            //         })
            //     } else {
            //         this.jobList = this.jobList.filter((item, index) => {
            //             if (type.includes(item.jobName)) {
            //                 item.status = true
            //             } else if (!type.includes(item.jobName)) {
            //                 item.status = false
            //                 console.log(item.type, 'p[p[p[');
            //             }
            //             return item
            //         })
            //     }
            // },
            selectedAll(state) {
                this.jobList = this.jobList.filter((item) => {
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
                let jobObj = {
                    id: info.id,
                    name: info.name,
                    description: '描述'
                }
                console.log(jobObj, 'this is trashObj')
                if (info.imgUrl !== '') {
                    await api.person.updataJob(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        personObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    jobObj.pictureId = info.pictureId
                }
                await api.person.updataJob(JSON.stringify(jobObj)).then(res => {
                    this.$message.success('更新成功')
                    console.log('增加成功')
                    this.choseInfoId = []
                    this.getAllJob()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            async addNewJob(info) {
                console.log(info, 'opopopopopo')
                let personObj = {
                    name: info.name,
                    description: '描述'
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
                await api.person.createJob(JSON.stringify(personObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllJob()
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
                    this.jobList.map((item) => {
                        if (item.id === this.choseInfoId[0]) {
                            this.jobinfo = item
                        }
                    })
                    this.showPersonDetail(this.jobinfo, '修改人员类型信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的人员类型')
                }
            },
            async getAllJob() {
                this.isShowLoading = true
                await api.person.getJob().then(res => {
                    console.log(res, '这是请求回来的')
                    this.isShowLoading = false
                    this.jobList = res
                    for (let i = 0; i < this.jobList.length; i++) {
                        this.jobList[i].checked = false
                        this.jobList[i].status = true
                        this.jobList[i].jobId = this.$route.params.id
                    }
                    this.$store.commit('JOB_TYPE', res)
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
                let leftId =  id.substring(0, 6)
                let rightId = id.substring(14)
                return `${leftId}********${rightId}`
            }
        },
        created() {
            this.getAllJob()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },

    }
</script>

<style lang="scss" scoped type="text/scss">
    .personType {
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
                border-bottom: 1px solid #a13309;
            }
            .personList {
                width: 100%;
                flex: 1;
                /*margin-top: rem(20);*/
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
            }
        }
    }

</style>

