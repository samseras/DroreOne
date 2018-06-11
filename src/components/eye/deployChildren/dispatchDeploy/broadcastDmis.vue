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
                        @startEndPlan="startEndPlan"
                        @searchAnything="searchAnything"
                        :selectLength="choseInfoId.length"
                        :listLength="broadCastList.length"
                        @choseType="choseType"
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowloading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="broadCastList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope" v-if="scope.row.status">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="broadcastSchedule.name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.broadcastSchedule.enabled">已开启</span>
                                <span v-else>已停止</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="broadcastIds.length"
                            label="硬件总数">
                        </el-table-column>
                        <el-table-column
                            label="执行日期">
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
                        <el-table-column
                            label="描述">
                            <template slot-scope="scope">
                                <span class="description">{{scope.row.broadcastSchedule.description}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'修改广播计划')" class="edit">编辑</span> |
                                <span @click="stop(scope.row)" v-if="scope.row.broadcastSchedule.enabled">停止 |</span>
                                <span @click="stop(scope.row)" v-if="!scope.row.broadcastSchedule.enabled">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'广播信息',true)">查看</span> |
                                <span @click="deletInfo(scope.row.id,)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="broadCastInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="closeDmisDialog"
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
    import moment from 'moment'
    export default {
        name: 'area-deploy',
        data(){
            return{
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
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.broadCastList = this.checkList.filter(item => {
                        if (item.broadcastSchedule.name.includes(info)) {
                            return item
                        }
                        if (item.broadcastSchedule.description.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllBroadcast()
                }
            },
            startEndPlan (state) {
                console.log(this.choseInfoId, 'opopopop')
                if(this.choseInfoId.length < 1) {
                    if(state === 'start') {
                        this.$message.error('请选择要开启的数据信息')
                    } else {
                        this.$message.error('请选择要关闭的数据信息')
                    }
                    return
                }
                let choseId = []
                choseId = this.broadCastList.filter(item => {
                    if (this.choseInfoId.includes(item.id)) {
                        if (state === 'start') {
                            if (!item.broadcastSchedule.enabled) {
                                return item
                            }
                        } else {
                            if (item.broadcastSchedule.enabled) {
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
                if (state === 'end') {
                    this.$confirm('确定要停止所选的计划吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.startEndPlanApi(choseId, state)
                    }).catch(() => {
                        this.$message.info('计划停止取消')
                        return
                    })
                } else {
                    this.startEndPlanApi(choseId, state)
                }
            },
            startEndPlanApi(choseId, state) {
                api.schedulebroadcast.stareEndPlan(choseId).then(res => {
                    console.log(res, '更改状态成功')
                    if (state === 'start') {
                        this.$message.success('计划开启成功')
                    } else {
                        this.$message.success('计划关闭成功')
                    }
                    choseId.forEach(item => {
                        this.broadCastList.forEach(item1 => {
                            if (item === item1.id) {
                                item1.broadcastSchedule.enabled = !item1.broadcastSchedule.enabled
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
                this.showPersonDetail({broadcastSchedule:{}}, '添加广播播放计划',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                console.log(id)
                console.log(this.choseInfoId)
                if (id) {
                    this.choseInfoId = [id]
                }
                let isDelete = false
                this.choseInfoId.forEach(item => {
                    this.broadCastList.forEach(item1 => {
                        if (item === item1.id) {
                            if (item1.broadcastSchedule.enabled) {
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
                let musicIds
                if (info.musicIds) {
                    musicIds = info.musicIds.map(item => {
                        return item.id
                    })
                } else {
                    musicIds = info.musics.map(item => {
                        return item.id
                    })
                }
                let obj = {
                    id: info.broadcastSchedule.id,
                    name: info.broadcastSchedule.name,
                    customizedDays: info.broadcastSchedule.customizedDays,
                    startTime: moment(info.broadcastSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.broadcastSchedule.watchTime[1]).format('HH:mm:ss'),
                    description: info.broadcastSchedule.description,
                    broadcastIds: info.broadcastIds,
                    musicIds: musicIds
                }
                if (info.broadcastSchedule.customizedDays) {
                    obj.startDate = moment(info.broadcastSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.broadcastSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.broadcastSchedule.days
                }
                api.schedulebroadcast.updataBroadcast(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.getAllBroadcast()
                    this.$message.success('修改成功')
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            addNewPerson (info) {
                console.log(info, '这是要添加的')
                let musicIds = info.musics.map(item => {
                    return item.id
                })
                let obj = {
                    name: info.broadcastSchedule.name,
                    customizedDays: info.broadcastSchedule.customizedDays,
                    startTime: moment(info.broadcastSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.broadcastSchedule.watchTime[1]).format('HH:mm:ss'),
                    description: info.broadcastSchedule.description,
                    broadcastIds: info.broadcastIds,
                    musicIds: musicIds
                }
                if (info.broadcastSchedule.customizedDays) {
                    obj.startDate = moment(info.broadcastSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.broadcastSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.broadcastSchedule.days
                }
                api.schedulebroadcast.createdBroadcast(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.getAllBroadcast()
                    this.$message.success('创建成功')
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error(err.message)
                })
            },
            fixedInfo (info,title) {
                if (info.broadcastSchedule.enabled) {
                    this.$message.info('所选计划已经开启，请关闭后再修改')
                    return
                }
                this.broadCastInfo = info
                this.showPersonDetail(info, title)
            },
            stop(Info){
               api.schedulebroadcast.stareEndPlan([Info.id]).then(res => {
                   console.log(res, '成功')
                   Info.broadcastSchedule.enabled = !Info.broadcastSchedule.enabled
                   if ( !Info.broadcastSchedule.enabled) {
                       this.$message.success('调度计划已关闭')
                   }else {
                       this.$message.success('调度计划已开启')
                   }
               }).then(err => {
                   console.log(err, '失败')
               })
            },
            filterType (value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            choseType (type) {
                console.log(type, '这是传过来的')
                type = type.map(item => {
                    if (item === '开始') {
                        return true
                    } else{
                        return false
                    }
                })
                console.log(type, '这是过滤后的')
                if (type.length === 0){
                    this.broadCastList = this.checkList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.broadCastList = this.checkList.filter((item,index) => {
                        if (type.includes(item.broadcastSchedule.enabled)) {
                            item.status = true
                        } else {
                            item.status = false
                        }
                        return item.status === true
                    })
                }
            },
            async getAllBroadcast () {
                this.isShowLoading = true
                await api.schedulebroadcast.getAllBroadcast().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.broadCastList = res
                    this.broadCastList.forEach(item => {
                        item.checked = false;
                        item.status = true
                        item.broadcastSchedule.time = [item.broadcastSchedule.startDate,item.broadcastSchedule.endDate]
                        item.broadcastSchedule.watchTime = [`2018-04-25,${item.broadcastSchedule.startTime}`,`2018-04-25,${item.broadcastSchedule.endTime}`]
                        item.id = item.broadcastSchedule.id
                        if (!item.broadcastSchedule.customizedDays) {
                            item.broadcastSchedule.days = item.broadcastSchedule.days.split(',')
                        }
                        if (item.musics.length > 0) {
                            item.musics.forEach(item => {
                                let endNum = item.musicPath.lastIndexOf('_')
                                let startNum = item.musicPath.lastIndexOf('/') + 1
                                item.title = item.musicPath.substring(startNum,endNum)
                                item.id = item.musicId
                            })
                        }
                    })
                    this.choseInfoId = []
                    this.checkList = this.broadCastList
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
                .description {
                    display: inline-block;
                    width: rem(150);
                    text-align: left;
                    padding-right: rem(5);
                    padding-top: rem(5);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

</style>
