<template>
    <div class="indicatorDeploy">
        <div class="title">
            指示牌信息
        </div>
        <div class="indicatorContent">
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
                        v-if="!isShowIndicatorCard"
                        ref="multipleTable"
                        :data="indicatorList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="area"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '指示牌信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in indicatorList" v-if="isShowIndicatorCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '指示牌信息')">
                            <img src="" alt="">
                            <span class="type">
                                {{item.type}}
                            </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.area}}</span></p>
                            <p class="sex">位置信息：<span>{{item.location}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <DetailDialog v-if="visible"
                              :visible="visible"
                              :Info="indicatorInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewIndicator">
                </DetailDialog>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './funHeader'
    import DetailDialog from './detailDialog'
    import api from '@/api'
    export default {
        name: "indicator-deploy",
        data () {
            return {
                isShowIndicatorCard: true,
                checkList: [],
                filterList: [],
                indicatorList: [],
                visible: false,
                indicatorInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false
            }
        },
        methods: {
            showPersonDetail (info, title) {
                this.indicatorInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加指示牌信息')
                this.isDisabled = false
            },
            deletInfo () {
                api.indicator.deleteIndicator(this.choseInfoId).then(res => {
                    console.log(res, '删除成功')
                    for (let i = 0; i < this.choseInfoId.length; i++) {
                        this.indicatorList = this.indicatorList.filter((item, index) => {
                            if (item.id === this.choseInfoId[i]){
                                this.indicatorList[index].checked = false
                            }
                            return item.id !== this.choseInfoId[i]
                        })
                    }
                    this.$message.success('删除成功')
                }).catch(err => {
                    console.log(err,'删除失败')
                })


            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowIndicatorCard = false
                }else {
                    this.isShowIndicatorCard = true
                }
            },
            checked (id) {
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
                    this.choseList = this.indicatorList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.indicatorList.filter((item,index) => {
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
                this.choseList = this.indicatorList.filter((item) => {
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
                console.log(info, 'wertyuio')
                let list = this.indicatorList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.indicatorList[i] = info

                    }
                }
                this.choseList = this.indicatorList
            },
            addNewIndicator (info) {
                info.id = new Date().getTime()
                this.indicatorList.push(info)
                this.choseList = this.indicatorList
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.indicatorList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.indicatorInfo = item
                        }
                    })
                    this.showPersonDetail(this.indicatorInfo, '修改指示牌信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            },
            async getAllIndicator () {
                this.isShowLoading = true
                await api.indicator.getAllIndicator().then(res => {
                    console.log(res, '这是数据')
                    this.isShowLoading = false
                    this.indicatorList = res
                    for (let i = 0; i < this.indicatorList.length; i++) {
                        this.indicatorList[i].checked = false
                        this.indicatorList[i].status = true
                    }
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllIndicator()
        },
        components: {
            ScrollContainer,
            Header,
            DetailDialog
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .indicatorDeploy{
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
        .indicatorContent{
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
                            top: rem(3);
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
