<template>
    <div class="boatCars">
        <div class="title">
            车船信息
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
                        v-if="!isShowBoatCard"
                        ref="multipleTable"
                        :data="boatCarList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="driver"
                            label="驾驶人员"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="safeStatus"
                            label="维护状态">
                        </el-table-column>
                        <el-table-column
                            prop="loadNum"
                            label="核载人数">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="电话号码">
                        </el-table-column>
                        <el-table-column
                            prop="facilityNum"
                            label="设备号码">
                        </el-table-column>
                        <el-table-column
                            prop="safeTime"
                            label="维护时间">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '车船信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in choseList" v-if="isShowBoatCard && item.status">
                        <div class="checkBox">
                            <input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">
                        </div>
                        <div class="personType" :class="item.type === '车辆'? 'carInfo':''" @click.stop="showPersonDetail(item ,'车船信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.type}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">驾驶人员：<span>{{item.driver}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.safeStatus}}</span></p>
                            <p class="idNum">核载人数：<span>{{item.loadNum}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.phone}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="boatCarInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false; isDisabled = true"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewBoatCar">
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
        name: 'boatCar-deploy',
        data () {
            return {
                isShowBoatCard: true,
                checkList: [],
                filterList: [],
                boatCarList: [
                    {id:1,type: '船只',serNum:'che-002',safeStatus: '正常',loadNum: 15,buyTime:'2018-1-2',safeTime:'2018-3-2',driver:'张三',phone: '13674565455',facilityNum:'IISO-0001'},
                    {id:2,type: '车辆',serNum:'che-002',safeStatus: '正常',loadNum: 15,buyTime:'2018-1-2',safeTime:'2018-3-2',driver:'张三',phone: '13674565455',facilityNum:'IISO-0001'},
                    {id:3,type: '船只',serNum:'che-002',safeStatus: '正常',loadNum: 15,buyTime:'2018-1-2',safeTime:'2018-3-2',driver:'张三',phone: '13674565455',facilityNum:'IISO-0001'},
                    {id:8,type: '车辆',serNum:'che-002',safeStatus: '正常',loadNum: 15,buyTime:'2018-1-2',safeTime:'2018-3-2',driver:'张三',phone: '13674565455',facilityNum:'IISO-0001'},
                    {id:9,type: '车辆',serNum:'che-002',safeStatus: '正常',loadNum: 15,buyTime:'2018-1-2',safeTime:'2018-3-2',driver:'张三',phone: '13674565455',facilityNum:'IISO-0001'}
                ],
                visible: false,
                boatCarInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: ''
            }
        },
        methods: {
            showPersonDetail (info, title) {
                this.boatCarInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({},'添加车船信息')
                this.isDisabled = false
            },
            deletInfo () {
                for (let i = 0; i < this.choseInfoId.length; i++) {
                    this.boatCarList = this.boatCarList.filter((item, index) => {
                        if (item.id === this.choseInfoId[i]){
                            this.choseList[index].checked = false
                        }
                        return item.id !== this.choseInfoId[i]
                    })
                }
                this.choseList = this.boatCarList

            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowBoatCard = false
                }else {
                    this.isShowBoatCard = true
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
                    this.choseList = this.boatCarList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.boatCarList.filter((item,index) => {
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
                this.choseList = this.boatCarList.filter((item) => {
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
                let list = this.boatCarList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.boatCarList[i] = info

                    }
                }
                this.choseList = this.boatCarList
            },
            addNewBoatCar (info) {
                info.id = new Date().getTime()
                this.boatCarList.push(info)
                this.choseList = this.boatCarList
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.boatCarList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.boatCarInfo = item
                        }
                    })
                    this.showPersonDetail(this.boatCarInfo,'修改车船信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的车船')
                }
            }

        },
        created () {
            for (let i = 0; i < this.boatCarList.length; i++) {
                this.boatCarList[i].checked = false
                this.boatCarList[i].status = true
            }
            this.choseList = this.boatCarList
        },
        components:{
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .boatCars{
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
                    .carInfo{
                        background: #cc9755;
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
