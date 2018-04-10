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
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowAreaCard"
                        ref="multipleTable"
                        :data="areaList"
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
                            prop="name"
                            label="片区名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="placeScenic"
                            label="所在景区">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置范围">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row,'片区信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in areaList" v-if="isShowAreaCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '片区信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name" v-if="false">所在景区：<span>{{item.placeScenic}}</span></p>
                            <p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="areaInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
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
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                areaList: [],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading : false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title) {
                this.areaInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加人员信息')
                this.isDisabled = false
            },
            deletInfo () {
                if (this.choseInfoId.length > 0) {
                    api.area.deleteRegion(this.choseInfoId).then(res => {
                        console.log(res, '删除成功')
                        this.$message.success('删除成功')
                        for (let i = 0; i < this.choseInfoId.length; i++) {
                            this.areaList = this.areaList.filter((item, index) => {
                                if (item.id === this.choseInfoId[i]){
                                    this.areaList[index].checked = false
                                    this.areaList[index].status = false
                                }
                                return item
                            })
                        }
                        this.choseInfoId = []
                    }).catch(err => {
                        this.$message.error('删除失败，请稍后重试')
                        console.log(err)
                        this.choseInfoId = []
                    })
                } else {
                    this.message.error('请选择要删除的信息')
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
            checked (id) {
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
                console.log(this.choseInfoId, 'opopop')
            },
            fixInfo (info) {
                let aresObj = {
                    id: info.id,
                    name: info.name,
                    description: info.description
                }
                api.area.updateRegion(JSON.stringify(aresObj)).then(res => {
                    console.log(res, '创建成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllArea()
                })
            },
            addNewPerson (info) {
                let aresObj = {
                    name: info.name,
                    description: info.description
                }
                api.area.createRegion(JSON.stringify(aresObj)).then(res => {
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllArea()
                })
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.areaList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.areaInfo = item
                        }
                    })
                    this.showPersonDetail(this.areaInfo, '修改人员信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的片区')
                }
            },
            async getAllArea () {
                this.isShowLoading = true
                await api.area.getAllRegion().then(res => {
                    console.log(res, '这是请求回来的片区')
                    this.isShowLoading = false
                    this.areaList = res
                    for (let i = 0; i < this.areaList.length; i++) {
                        this.areaList[i].checked = false
                        this.areaList[i].status = true
                    }
                }).catch(err => {
                    console.log(err, '失败')
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
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .areaDeploy{
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
