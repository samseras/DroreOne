<template>
    <div class="punchRecord">
        <div class="title">
            巡更打卡
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @searchAnything="searchAnything"
                        @choseType="choseType">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="punchList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            prop="name"
                            label="人员">
                        </el-table-column>
                        <el-table-column
                            prop="cStation.name"
                            label="打卡地点">
                        </el-table-column>
                        <el-table-column
                            prop="isMissPunch"
                            label="是否缺卡">
                        </el-table-column>
                        <el-table-column
                            label="打卡时间"
                            prop="punchTime">
                        </el-table-column>
                        <el-table-column
                            label="未打卡时间"
                            prop="notPunchTime">
                        </el-table-column>
                        <el-table-column
                            sortable
                            :filters="[{ text: '异常', value: 'ABNORMAL' }, { text: '正常', value: 'NORMAL' }]"
                            :filter-method="filterStatus"
                            filter-multiple
                            prop="status"
                            label="状态">
                            <template slot-scope="scope">
                                <el-tag
                                    :color = "scope.row.status == 'ABNORMAL' ? '#f36a5a' :'#4db3a4'">{{scope.row.statusName}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './dmisHeader'
    import api from '@/api'
    import moment from 'moment'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'punch-deploy',
        data(){
            return{
                punchList:[],
                allpunchList:[],
                isShowLoading: false,
                filterCondition: ''
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM', 'CURRENT_NUM']),
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    this.punchList = this.allpunchList.filter(item => {
                        if (item.name && item.name.includes(info)) {
                            return item
                        }
                        if (item.cStation && item.cStation.name && item.cStation.name.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: this.punchList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                } else {
                    this.getAllPunch()
                }
            },
            filterStatus(value,row){
                return row.status === value
            },
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },
            choseType (filterObj) {
                this.getAllPunch(filterObj)
            },
            async getAllPunch (param) {
                this.isShowLoading = true
                if(!param){
                    param ={
                        "entityId":null,
                        "from":null,
                        "to":null,
                        "status":null
                    }
                }

                await api.punch.getAllPunchRecord(JSON.stringify(param)).then(res => {
                    console.log(JSON.stringify(res), '请求成功')
                    this.isShowLoading = false
                    this.allpunchList = res
                    this.allpunchList.forEach(item => {
                        item.statusName = item.status == "ABNORMAL" ? '异常' :'正常'
                        item.isMissPunch = item.status == "ABNORMAL" ? '是' :'否'
                        item.punchTime = item.status == "NORMAL" ? item.occurTime : ''
                        item.notPunchTime = item.status == "ABNORMAL" ? item.occurTime :''
                    })
                    if (this.filterCondition.trim() !== '') {
                        this.allpunchList = this.filterDataList(this.allpunchList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allpunchList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.punchList = this.allpunchList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if (item.name && item.name.includes(this.filterCondition)) {
                        return item
                    }
                    if (item.cStation && item.cStation.name && item.cStation.name.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            }
        },
        created () {
            this.getAllPunch()
        },
        components: {
            ScrollContainer,
            Header
        },
        watch: {
            getCurrentNum () {
                this.getAllPunch()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .punchRecord{
        .el-tag{
            color: #fff;
            width: 80%;
            text-align: center;
        }
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
                .funcImg{
                    width: rem(25);
                    height: rem(25);
                    float: right;
                    margin-right: rem(35);
                    border-radius: rem(5);
                }
            }
        }
    }
</style>

