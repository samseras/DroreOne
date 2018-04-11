<template>
    <div class="personDeploy">
        <div class="title">
            人员信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @choseType='choseType'
                        @selectedAll='selectedAll'
                        @fixedInfo='fixedInfo'>
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
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="getChecked(scope.row.id)"
                                             class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="personBean.name"
                            label="姓名"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="jobName"
                            label="人员角色">
                        </el-table-column>
                        <el-table-column
                            prop="personBean.gender"
                            label="性别">
                            <template slot-scope="scope">
                                <span>{{scope.row.personBean.gender | sexFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="personBean.idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="personBean.phone"
                            label="电话号码">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span @click="showPersonDetail(scope.row, '人员信息')">查看</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in personList" v-if="isShowPersonCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)"
                                         class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '人员信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.jobName}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">
                                姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{item.personBean.name}}</span></p>
                            <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>{{item.personBean.gender | sexFilter}}</span>
                            </p>
                            <p class="idNum">身份证号：<span>{{item.personBean.idNum}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.personBean.phone}}</span>
                            </p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="personInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog="visible = false"
                              @fixInfo="fixInfo"
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

    export default {
        name: 'person-deploy',
        data() {
            return {
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
                isShowLoading: false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail(info, title) {
                this.personInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo() {
                this.showPersonDetail({personBean: {}}, '添加人员信息')
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
                        api.person.deletePerson(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.personList = this.personList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]) {
                                        this.personList[index].checked = false
                                    }
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
                    this.$message.error('请选择要删除的人选信息')
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
                console.log(this.choseInfoId, 'opopop')
            },
            fixInfo(info) {
                let personObj = {
                    id: info.personBean.id,
                    name: info.personBean.name,
                    picAddress: info.imgUrl,
                    gender: info.personBean.gender,
                    idNum: info.personBean.idNum,
                    phone: info.personBean.phone,
                    jobId: info.jobId
                }
                console.log(personObj, 'this is trashObj')
                api.person.updatePerson(JSON.stringify(personObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.choseInfoId = []
                    this.getAllPerson()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            addNewPerson(info) {
                console.log(info, 'opopopopopo')
                let personObj = {
                    name: info.personBean.name,
                    // picAddress: info.imgUrl,
                    gender: info.personBean.gender,
                    idNum: info.personBean.idNum,
                    phone: info.personBean.phone,
                    jobId: info.jobId
                }
                console.log(personObj, 'this is trashObj')
                api.person.updataAvatar(info.imgUrl).then(res => {
                    console.log(res, '上传成功')
                })
                api.person.createPerson(JSON.stringify(personObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllPerson()
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
                    this.personList.map((item) => {
                        if (item.id === this.choseInfoId[0]) {
                            this.personInfo = item
                        }
                    })
                    this.showPersonDetail(this.personInfo, '修改人员信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            },
            async getAllPerson() {
                this.isShowLoading = true
                await api.person.getAllPerson().then(res => {
                    console.log(res, '这是请求回来的')
                    this.isShowLoading = false
                    this.personList = res
                    for (let i = 0; i < this.personList.length; i++) {
                        this.personList[i].checked = false
                        this.personList[i].status = true
                        this.personList[i].id = this.personList[i].personBean.id
                    }
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

            }
        },
        created() {
            this.getAllPerson()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .personDeploy {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
            width: 100%;
            padding: rem(5) 0 rem(5) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #0086b3;
            font-weight: 600;
            border-bottom: 1px solid #ccc;
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

