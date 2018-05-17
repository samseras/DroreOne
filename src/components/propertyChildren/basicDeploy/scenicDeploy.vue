<template>
    <div class="scenicDeploy">
        <div class="title">
            景点信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        :choseId="choseInfoId"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @getAllScenic="getAllScenic">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowScenicCard"
                        ref="multipleTable"
                        :data="scenicList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="scenicspotBean.name"
                            label="景点名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="scenicspotBean.capacity"
                            label="容量">
                        </el-table-column>
                        <el-table-column
                            prop="scenicspotBean.currentNum"
                            label="当前人数">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '人员信息',true)">查看</span>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in scenicList" v-if="isShowScenicCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '景点信息',true)">
                            <img src="../../../../static/img/scenicCard.png" alt="">
                            <span class="type">
                                  {{item.scenicspotBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.scenicspotBean.status}}</span></p>
                            <p class="idNum">当前人数：<span>{{item.scenicspotBean.currentNum}}</span></p>
                            <p class="phoneNum">最大容量：<span>{{item.scenicspotBean.capacity}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="personInfo"
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
    export default {
        name: "scenic-deploy",
        data () {
            return {
                isShowScenicCard: true,
                checkList: [],
                filterList: [],
                scenicList: [],
                visible: false,
                personInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                currentNum: 50
            }
        },
        methods: {
            closeDialog () {
                this.visible = false
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.scenicList = this.checkList.filter(item => {
                        if (item.regionName.includes(info)) {
                            return item
                        }
                        if (item.scenicspotBean.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllScenic()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title, state) {
                this.personInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({scenicspotBean:{}}, '添加景点信息', false)
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
                        api.scenic.deleteScenic(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.scenicList = this.scenicList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.scenicList[index].checked = false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                }else {
                    this.$message.error('请选择要删除的景点信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowScenicCard = false
                }else {
                    this.isShowScenicCard = true
                }
            },
            checked (id) {
                this.scenicList = this.scenicList.filter(item => {
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
                    this.choseList = this.scenicList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.scenicList.filter((item,index) => {
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
                this.scenicList = this.scenicList.filter((item) => {
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
            async fixInfo (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let scenicObj = {
                    id: info.scenicspotBean.id,
                    name: info.scenicspotBean.name,
                    capacity: info.scenicspotBean.capacity,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(scenicObj, 'this is trashObj')
                await api.scenic.updateScenic(JSON.stringify(scenicObj)).then(res => {
                    this. closeDialog()
                    console.log('增加成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllScenic()
                })
            },
            async addNewPerson (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let scenicObj = {
                    name: info.scenicspotBean.name,
                    capacity: info.scenicspotBean.capacity,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(scenicObj, 'this is trashObj')
                await api.scenic.createScenic(JSON.stringify(scenicObj)).then(res => {
                    this. closeDialog()
                    console.log('增加成功')
                    this.$message.success('创建成功')
                    this.getAllScenic()
                }).catch(err => {
                    console.log(err, '创建失败')
                })
            },
            fixedInfo (id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.scenicList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.personInfo = item
                        }
                    })
                    this.showPersonDetail(this.personInfo, '修改景点信息', false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllScenic () {
                this.isShowLoading = true
                await api.scenic.getAllScenic().then((res) => {
                    console.log(res, '这是请求回来的所有数据')
                    this.isShowLoading = false
                    this.scenicList = res
                    for (let i = 0; i < this.scenicList.length; i++) {
                        this.scenicList[i].checked = false
                        this.scenicList[i].status = true
                        this.scenicList[i].id = this.scenicList[i].scenicspotBean.id
                        this.scenicList[i].location = `${this.scenicList[i].longitude},${this.scenicList[i].latitude}`
                        this.scenicList[i].scenicspotBean.currentNum = this.currentNum
                        // scenicspotBean.status
                        if (this.scenicList[i].scenicspotBean.capacity == 0) {
                            this.scenicList[i].scenicspotBean.statu = '已满'
                        } else {
                            let parcent = this.scenicList[i].scenicspotBean.currentNum/this.scenicList[i].scenicspotBean.capacity
                            if (parcent < .9){
                                this.scenicList[i].scenicspotBean.statu = '充裕'
                            } else {
                                this.scenicList[i].scenicspotBean.statu = '已满'
                            }
                        }
                    }
                    this.checkList = this.scenicList
                    this.choseInfoId = []
                }).catch((err)=> {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllScenic()
            // this.choseList = this.scenicList
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .scenicDeploy{
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
                        p{
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
