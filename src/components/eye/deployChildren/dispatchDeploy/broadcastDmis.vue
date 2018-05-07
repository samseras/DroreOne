<template>
    <div class="broadcastDmise">
        <div class="title">
            广播
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowloading">
                <ScrollContainer>
                    <el-table
                        v-if="isShowAreaCard"
                        ref="multipleTable"
                        :data="broadCastList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="broadcastSchedule.name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="broadcastIds.length"
                            label="硬件总数">
                        </el-table-column>
                        <el-table-column
                            label="时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.broadcastSchedule.customizedDays">{{scope.row.broadcastSchedule.startDate}}~{{scope.row.broadcastSchedule.endDate}}</span>
                                <span v-if="!scope.row.broadcastSchedule.customizedDays">{{scope.row.broadcastSchedule.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="执行时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.broadcastSchedule.startTime}}~{{scope.row.broadcastSchedule.endTime}}</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop="repetition"-->
                            <!--label="重复调度"-->
                            <!--sortable>-->
                        <!--</el-table-column>-->
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'广播编辑')" class="edit">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'广播信息')">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="broadCastInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              :title = "title"
                              @saveNewInfo="addNewPerson">
                </PersonDetail>

            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import Header from './dmisHeader'
    import PersonDetail from './dmisDialog'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                broadCastList: [],
                visible: false,
                broadCastInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                title:'',
                // isStart:false,
                // isStop:true,
                selection:[],
                isShowloading: false
            }
        },
        methods: {
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },
            showPersonDetail (info,title,state) {
                this.broadCastInfo = info;
                this.visible = true;
                this.title = title;
                this.isDisabled = state
            },
            addNewInfo () {
                this.showPersonDetail({broadcastSchedule:{}}, '添加广播播放',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.schedulebroadcast.deleteBroadcast(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.broadCastList = this.broadCastList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.broadCastList[index].checked = false
                                        this.broadCastList[index].status = false
                                    }
                                    return item.status !== false
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
            checked (id) {
                this.broadCastList = this.broadCastList.filter(item => {
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
            selectedAll (state) {
                this.broadCastList = this.broadCastList.filter((item) => {
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
            },
            fixInfo (info) {
                console.log(info, 'wertyuio')
                console.log(this.areaList, 'wertyuio')
                let list = this.areaList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.areaList[i] = info
                    }
                }
                this.choseList = this.areaList
            },
            addNewPerson (info) {
                console.log(info, '这是要添加的')
            },
            fixedInfo (info,title) {
                this.broadCastInfo = info
                this.showPersonDetail(info, title)
            },
            stop(Info){
                Info.isStart = true;
                Info.isStop = false;
            },
            start(Info){
                Info.isStart = false;
                Info.isStop = true;
            },
            async getAllBroadcast () {
                this.isShowLoading = true
                await api.schedulebroadcast.getAllBroadcast().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.broadCastList = res
                    this.broadCastList.forEach(item => {
                        item.checked = false;
                        item.broadcastSchedule.time = [item.broadcastSchedule.startDate,item.broadcastSchedule.endDate]
                        item.broadcastSchedule.watchTime = [`2018-04-25,${item.broadcastSchedule.startTime}`,`2018-04-25,${item.broadcastSchedule.endTime}`]
                        item.id = item.broadcastSchedule.id
                        if (!item.broadcastSchedule.customizedDays) {
                            item.broadcastSchedule.days = item.broadcastSchedule.days.split(',')
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllBroadcast()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .broadcastDmise{
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
