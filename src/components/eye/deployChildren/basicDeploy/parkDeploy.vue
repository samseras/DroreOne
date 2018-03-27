<template>
    <div class="parkDeploy">
        <div class="title">
            停车场信息
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
            <div class="personList">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowParkCard"
                        ref="multipleTable"
                        :data="parkList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="residuePark"
                            label="空余车位">
                        </el-table-column>
                        <el-table-column
                            prop="allPark"
                            label="车位总数">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="area"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showParkDetail(scope.row, '停车场信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in choseList" v-if="isShowParkCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" @click.stop="showParkDetail(item, '停车场信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.name}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.state}}</span></p>
                            <p class="idNum">空余车位：<span>{{item.residuePark}}</span></p>
                            <p class="phoneNum">车位总数：<span>{{item.allPark}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="parkInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewPark">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    export default {
        name: "park-deploy",
        data(){
            return{
                isShowParkCard: true,
                checkList: [],
                filterList: [],
                parkList: [
                    {id:1,name: '停车场名称',type: '室内',state: '充裕',residuePark: '140个',allPark: '300个',location:'1234562345',area: 'A-片区'},
                    {id:2,name: '停车场名称',type: '室内',state: '紧张',residuePark: '140个',allPark: '300个',location:'1234562345',area: 'A-片区'},
                    {id:3,name: '停车场名称',type: '室内',state: '充裕',residuePark: '140个',allPark: '300个',location:'1234562345',area: 'A-片区'},
                    {id:8,name: '停车场名称',type: '室内',state: '已满',residuePark: '140个',allPark: '300个',location:'1234562345',area: 'A-片区'},
                    {id:9,name: '停车场名称',type: '室内',state: '充裕',residuePark: '140个',allPark: '300个',location:'1234562345',area: 'A-片区'}
                ],
                visible: false,
                parkInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: ''
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showParkDetail (info, title) {
                this.parkInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showParkDetail({},'添加停车场信息')
                this.isDisabled = false
            },
            deletInfo () {
                for (let i = 0; i < this.choseInfoId.length; i++) {
                    this.parkList = this.parkList.filter((item, index) => {
                        if (item.id === this.choseInfoId[i]){
                            this.choseList[index].checked = false
                        }
                        return item.id !== this.choseInfoId[i]
                    })
                }
                this.choseList = this.parkList

            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowParkCard = false
                }else {
                    this.isShowParkCard = true
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
                    this.choseList = this.parkList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.parkList.filter((item,index) => {
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
                this.choseList = this.parkList.filter((item) => {
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
                console.log(info, 'wertyuio')
                let list = this.parkList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.parkList[i] = info

                    }
                }
                this.choseList = this.parkList
            },
            addNewPark (info) {
                info.id = new Date().getTime()
                this.parkList.push(info)
                this.choseList = this.parkList
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.parkList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.parkInfo = item
                        }
                    })
                    this.showParkDetail(this.parkInfo, '修改停车场信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            }
        },
        created () {
            for (let i = 0; i < this.parkList.length; i++) {
                this.parkList[i].checked = false
                this.parkList[i].status = true
            }
            this.choseList = this.parkList
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .parkDeploy{
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
