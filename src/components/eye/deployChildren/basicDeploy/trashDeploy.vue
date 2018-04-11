<template>
    <div class="trashDeploy">
        <div class="title">
            垃圾桶信息
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
                        v-if="!isShowTrashCard"
                        ref="multipleTable"
                        :data="trashList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="getChecked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="dustbinBean.name"
                            label="垃圾桶名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.dustbinBean.type | typeFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="dustbinBean.dustbinCount"
                            label="个数">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showTrashDetail(scope.row, '垃圾桶信息')">查看</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in trashList" v-if="isShowTrashCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.dustbinBean.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showTrashDetail(item, '垃圾桶信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.dustbinBean.type | typeFilter}}垃圾桶
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex" v-if="false">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.dustbinBean.status}}</span></p>
                            <p class="phoneNum">垃圾筒数：<span>{{item.dustbinBean.dustbinCount}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="trashInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewTrash">
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
        name: "trash-deploy",
        data (){
            return {
                isShowTrashCard: true,
                checkList: [],
                filterList: [],
                trashList: [],
                visible: false,
                trashInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false
            }
        },
        methods : {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showTrashDetail (info,title) {
                this.trashInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showTrashDetail({dustbinBean:{}}, '添加垃圾桶信息')
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
                        api.dustbin.deleteDustbin(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.trashList = this.trashList.filter((item, index) => {
                                    if (item.dustbinBean.id === this.choseInfoId[i]){
                                        this.trashList[index].checked = false
                                        this.trashList[index].status = false
                                    }
                                    return item.status === true
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                }else {
                    this.$message.error('请选择要删除的垃圾桶信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowTrashCard = false
                }else {
                    this.isShowTrashCard = true
                }
            },
            checked (id) {
                this.trashList = this.trashList.filter(item => {
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
                    this.trashList = this.trashList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.trashList = this.trashList.filter((item,index) => {
                        if (item.dustbinBean.type){
                            item.dustbinBean.typeName = '固定'
                        } else {
                            item.dustbinBean.typeName = '临时'
                        }
                        if (type.includes(item.dustbinBean.typeName)){
                            item.status = true
                        } else if(!type.includes(item.dustbinBean.typeName)){
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item
                    })
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.trashList = this.trashList.filter((item) => {
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
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let trashObj = {
                    id: info.dustbinBean.id,
                    name: info.dustbinBean.name,
                    dustbinCount: info.dustbinBean.dustbinCount,
                    type: info.dustbinBean.type,
                    regionId: info.regionId,
                    picAddress: info.imgUrl,
                    latitude: latitude,
                    longitude: longitude
                }
                api.dustbin.updateDustbin(JSON.stringify(trashObj)).then(res => {
                    console.log('修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllTrash()
                }).catch(err => {
                    console.log(err, '修改失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            addNewTrash (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let trashObj = {
                    name: info.dustbinBean.name,
                    dustbinCount: info.dustbinBean.dustbinCount,
                    type: info.dustbinBean.type,
                    regionId: info.regionId,
                    picAddress: info.imgUrl,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(trashObj, 'this is trashObj')
                api.dustbin.createDustbin(JSON.stringify(trashObj)).then(res => {
                    console.log('增加成功')
                    this.$message.success('创建成功')
                    this.getAllTrash()
                }).catch(err => {
                    console.log(err,'创建失败')
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.trashList.map((item) => {
                        if (item.dustbinBean.id === this.choseInfoId[0]){
                            this.trashInfo = item
                        }
                    })
                    this.showTrashDetail(this.trashInfo, '修改垃圾桶信息')
                    this.isDisabled = false
                    this.choseInfoId = []
                } else {
                    this.$message.error('请选择要修改的垃圾桶')
                }
            },
            async getAllTrash () {
                this.isShowLoading = true
                await api.dustbin.getAllDustbin().then(res => {
                    console.log(res, '这是请求回来的数据')
                    this.isShowLoading = false
                    this.trashList = res
                    for (let i = 0; i < this.trashList.length; i++) {
                        this.trashList[i].location = `${this.trashList[i].latitude},${this.trashList[i].longitude}`
                        this.trashList[i].checked = false
                        this.trashList[i].status = true
                        this.trashList[i].id = this.trashList[i].dustbinBean.id
                    }
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        filters: {
            typeFilter (item) {
                console.log(item, '9099090909090')
                if (item == 1) {
                    return "临时"
                } else {
                    return "固定"
                }
            }
        },
        created () {
           this.getAllTrash()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .trashDeploy{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            padding: rem(5) 0 rem(5) rem(15);
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
