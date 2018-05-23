<template>
    <div class="screenDmise">
        <div class="title">
            LED
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @startEndPlan="startEndPlan"
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="isShowAreaCard"
                        ref="multipleTable"
                        :data="screenList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="ledSchedule.name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="ledIds.length"
                            label="硬件总数">
                        </el-table-column>
                        <el-table-column
                            label="时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.ledSchedule.customizedDays">{{scope.row.ledSchedule.startDate}}~{{scope.row.ledSchedule.endDate}}</span>
                                <span v-if="!scope.row.ledSchedule.customizedDays">{{scope.row.ledSchedule.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="执行时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.ledSchedule.startTime}}~{{scope.row.ledSchedule.endTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'LED编辑')" class="edit">编辑</span> |
                                <span @click="stop(scope.row,)" v-if="scope.row.ledSchedule.enabled">停止 |</span>
                                <span @click="stop(scope.row,)" v-else="!scope.row.ledSchedule.enabled">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'LED信息',true)">查看</span> |
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="screenInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="closeDmisDialog"
                              :title="title"
                              @fixInfo = "fixInfo"
                              @saveNewInfo="addNewPerson">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './dmisHeader'
    import PersonDetail from './dmisDialog'
    import api from '@/api'
    import moment from 'moment'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                screenList:[],
                visible: false,
                screenInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                title: '',
                isStop:true,
                isStart:false,
                selection:[],
                isShowLoading: false
            }
        },
        methods: {
            startEndPlan (state) {
                console.log(this.choseInfoId, 'opopopop')
                let choseId = []
                choseId = this.screenList.filter(item => {
                    if (this.choseInfoId.includes(item.id)) {
                        if (state === 'start') {
                            if (!item.ledSchedule.enabled) {
                                return item
                            }
                        } else {
                            if (item.ledSchedule.enabled) {
                                return item
                            }
                        }
                    }
                })
                choseId = choseId.map(item => {
                    return item.id
                })
                console.log(choseId, 'opopop')
                if(choseId.length < 1) {
                    if (state === 'start') {
                        this.$message.info('当前选中的计划已开启')
                    } else {
                        this.$message.info('当前选中的计划已关闭')
                    }
                    return
                }
                api.scheduleled.stareEndPlan(choseId).then(res => {
                    console.log(res, '更改状态成功')
                    if (state === 'start') {
                        this.$message.success('计划开启成功')
                    } else {
                        this.$message.success('计划关闭成功')
                    }
                    choseId.forEach(item => {
                        this.screenList.forEach(item1 => {
                            if (item === item1.id) {
                                item1.ledSchedule.enabled = !item1.ledSchedule.enabled
                            }
                        })
                    })

                }).catch(err => {
                    console.log(err, '计划开启失败')

                    if (state === 'start') {
                        this.$message.error('计划开启失败，请稍后重试')
                    } else {
                        this.$message.error('计划关闭失败，请稍后重试')
                    }
                })
            },
            closeDmisDialog () {
                this.visible = false
            },
            handleSelectionChange(selection) {
                // this.choseInfoId = selection.map(item => {
                //     return item.id
                // })
            },
            showPersonDetail (info,title,state) {
                this.screenInfo = info
                this.visible = true;
                this.title = title;
                this.isDisabled = state;
            },
            addNewInfo () {
                this.showPersonDetail({ledSchedule:{}}, '添加硬件调度',false)
                this.isDisabled = false
            },
            deletChose(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i = 0; i < this.choseInfoId.length; i++) {
                        this.areaList = this.areaList.filter((item, index) => {
                            if (item.id === this.choseInfoId[i]) {
                                this.areaList[index].checked = false
                            }
                            return item.id !== this.choseInfoId[i]
                        })
                    }
                    this.$message.success('删除成功')
                    this.choseInfoId = []
                }).catch(() => {
                    this.$message.info('取消删除')
                })
                //   })
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                let isDelete = false
                this.choseInfoId.forEach(item => {
                    this.screenList.forEach(item1 => {
                        if (item === item1.id) {
                            if (item1.ledSchedule.enabled) {
                                isDelete = true
                                this.$message.info('所选计划已经开启，请关闭后再删除')
                                return
                            }
                        }
                    })
                })
                if (isDelete) {
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.scheduleled.deleteScreenLed(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.screenList = this.screenList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.screenList[index].checked = false
                                        this.screenList[index].status = false
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
                this.screenList = this.screenList.filter(item => {
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
                this.screenList = this.screenList.filter((item) => {
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
                let contentIds = info.contents.map(item => {
                    return item.id
                })
                let obj = {
                    id: info.ledSchedule.id,
                    name: info.ledSchedule.name,
                    customizedDays: info.ledSchedule.customizedDays,
                    startTime: moment(info.ledSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.ledSchedule.watchTime[1]).format('HH:mm:ss'),
                    description: info.ledSchedule.description,
                    ledIds: info.ledIds,
                    contentIds: contentIds
                }
                if (info.ledSchedule.customizedDays) {
                    obj.startDate = moment(info.ledSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.ledSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.ledSchedule.days
                }
                api.scheduleled.updataScreenLed(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.getAllScreenLed()
                    this.$message.success('修改成功')
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            addNewPerson (info) {
                let contentIds = info.contents.map(item => {
                    return item.id
                })
                let obj = {
                    name: info.ledSchedule.name,
                    customizedDays: info.ledSchedule.customizedDays,
                    startTime: moment(info.ledSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.ledSchedule.watchTime[1]).format('HH:mm:ss'),
                    description: info.ledSchedule.description,
                    ledIds: info.ledIds,
                    contentIds: contentIds
                }
                if (info.ledSchedule.customizedDays) {
                    obj.startDate = moment(info.ledSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.ledSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.ledSchedule.days
                }
                api.scheduleled.createdScreenLed(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.getAllScreenLed()
                    this.$message.success('创建成功')
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (info,title) {
                if (info.ledSchedule.enabled) {
                    this.$message.info('所选计划已经开启，请关闭后再修改')
                    return
                }
                this.screenInfo = info
                this.showPersonDetail(info, title, false)
            },
            stop(Info){
                api.scheduleled.stareEndPlan([Info.id]).then(res => {
                    console.log(res, '成功')
                    Info.ledSchedule.enabled = !Info.ledSchedule.enabled
                    if (!Info.ledSchedule.enabled) {
                        this.$message.success('调度计划已关闭')
                    }else {
                        this.$message.success('调度计划已开启')
                    }
                }).then(err => {
                    console.log(err, '失败')
                })
            },
            async getAllScreenLed () {
                this.isShowLoading = true
                await api.scheduleled.getAllScerrnLed().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.screenList = res
                    this.screenList.forEach(item => {
                        item.id = item.ledSchedule.id;
                        item.checked = false;
                        item.ledSchedule.time = [item.ledSchedule.startDate,item.ledSchedule.endDate]
                        item.ledSchedule.watchTime = [`2018-04-25,${item.ledSchedule.startTime}`,`2018-04-25,${item.ledSchedule.endTime}`]
                        if (!item.ledSchedule.customizedDays) {
                            item.ledSchedule.days = item.ledSchedule.days.split(',')
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllScreenLed()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .screenDmise{
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
