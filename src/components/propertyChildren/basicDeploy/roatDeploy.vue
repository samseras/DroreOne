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
                        @fixedInfo = 'fixedInfo'>
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
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row,'路网信息')">查看</span>
                                <span class="line">|</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span class="line">|</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in roatList" v-if="isShowRoatCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '路网信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="roatInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
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
    export default {
        name: "roat-deploy",
        data(){
            return{
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
                isShowLoading: false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title) {
                this.roatInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加路网信息')
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
                        api.roat.deleteRoat(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.roatList = this.roatList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.roatList[index].checked = false
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
                    this.isShowRoatCard = false
                }else {
                    this.isShowRoatCard = true
                }
            },
            checked (id) {
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
                console.log(this.choseInfoId, 'opopop')
            },
            fixInfo (info) {
                let roatObj = {
                    id: info.id,
                    name: info.name,
                    description: info.description,
                    geo: {
                        type:"LineString",
                        coordinates: info.location
                    }
                }
                api.roat.updateRoat(JSON.stringify(roatObj)).then(res => {
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
                api.roat.createRoat(JSON.stringify(roatObj)).then(res => {
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllRoat()
                }).catch(err => {
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.roatList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.roatInfo = item
                        }
                    })
                    this.showPersonDetail(this.roatInfo, '修改路网信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            },
            async getAllRoat () {
                this.isShowLoading = true
                await api.roat.getAllRoat().then(res => {
                    console.log(res, '请求路网成功')
                    this.isShowLoading = false
                    this.roatList = res
                    for (let i = 0; i < this.roatList.length; i++) {
                        this.roatList[i].checked = false
                        this.roatList[i].status = true
                        this.roatList[i].location = this.roatList[i].geo
                    }
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
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

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
            color: #0086b3;
            font-weight: 600;
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
                border-bottom: 1px solid #a13309;
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
                            background: red;
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
                        }
                    }
                }
            }
        }
    }

</style>
