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
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'LED信息',true)">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
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
            selectedAll () {
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
                this.screenInfo = info
                this.showPersonDetail(info, title, false)
            },
            stop(Info){
                console.log(Info.id)
                if (this.choseInfoId.includes(Info.id)) {
                    if(this.choseInfoId.length > 1){
                        this.$message.warning('至多选择一条数据')
                    }else{
                        Info.isStart = true;
                        Info.isStop = false;
                    }
                }else {
                    if(this.choseChecked.length == 0){
                        this.choseInfoId.push(Info.id)
                        if(this.choseInfoId.length > 1){
                            this.$message.warning('至多选择一条数据')
                        }else{
                            Info.isStart = true;
                            Info.isStop = false;
                        }
                        this.choseInfoId = []
                    }else {
                        this.$message.warning('选择的数据和即将编辑的数据不一致，或者未选择包编辑的数据')
                    }
                }
            },
            start(Info){
                console.log(Info.id)
                if (this.choseInfoId.includes(Info.id)) {
                    if(this.choseInfoId.length > 1){
                        this.$message.warning('至多选择一条数据')
                    }else{
                        Info.isStart = false;
                        Info.isStop = true;
                    }
                }else {
                    if(this.choseChecked.length == 0){
                        this.choseInfoId.push(Info.id)
                        if(this.choseInfoId.length > 1){
                            this.$message.warning('至多选择一条数据')
                        }else{
                            Info.isStart = false;
                            Info.isStop = true;
                        }
                        this.choseInfoId = []
                    }else {
                        this.$message.warning('选择的数据和即将编辑的数据不一致，或者未选择包编辑的数据')
                    }
                }
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
