<template>
    <div class="personDeploy">
        <div class="title">
            人员信息
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
                        v-if="!isShowPersonCard"
                        ref="multipleTable"
                        :data="personList"
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
                            label="人员角色">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                        <el-table-column
                            prop="idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="电话号码">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row)">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in choseList" v-if="isShowPersonCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '人员信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.type}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{item.name}}</span></p>
                            <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<span>{{item.sex}}</span></p>
                            <p class="idNum">身份证号：<span>{{item.idNum}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.phone}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="personInfo"
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
    export default {
        name: 'person-deploy',
        data(){
            return{
                isShowPersonCard: true,
                checkList: [],
                filterList: [],
                personList: [
                    {id:1,name: '小明',type: '售票',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:2,name: '小红',type: '保洁',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:3,name: '小明',type: '安保',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:8,name: '小明',type: '司机',sex: '男',idNum: '123456789',phone: '13674565455'},
                    {id:9,name: '小明',type: '船夫',sex: '男',idNum: '123456789',phone: '13674565455'}
                ],
                visible: false,
                personInfo: {},
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
            showPersonDetail (info,title) {
                this.personInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加人员信息')
                this.isDisabled = false
            },
            deletInfo () {
                for (let i = 0; i < this.choseInfoId.length; i++) {
                    this.personList = this.personList.filter((item, index) => {
                        if (item.id === this.choseInfoId[i]){
                            this.choseList[index].checked = false
                        }
                        return item.id !== this.choseInfoId[i]
                    })
                }
                this.choseList = this.personList

            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowPersonCard = false
                }else {
                    this.isShowPersonCard = true
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
                    this.choseList = this.personList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                        this.choseList = this.personList.filter((item,index) => {
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
                this.choseList = this.personList.filter((item) => {
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
                let list = this.personList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.personList[i] = info

                    }
                }
                this.choseList = this.personList
            },
            addNewPerson (info) {
                info.id = new Date().getTime()
                this.personList.push(info)
                this.choseList = this.personList
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.personList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.personInfo = item
                        }
                    })
                    this.showPersonDetail(this.personInfo, '修改人员信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的人员')
                }
            }
        },
        created () {
            for (let i = 0; i < this.personList.length; i++) {
                this.personList[i].checked = false
                this.personList[i].status = true
            }
            this.choseList = this.personList
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .personDeploy{
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
                        margin-top: rem(5);
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

