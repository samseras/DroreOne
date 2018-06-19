<template>
    <div class="securityDmis">
        <div class="title">
            巡更路线        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @startEndPlan="startEndPlan"
                        @searchAnything="searchAnything"
                        @choseType="choseType"
                        :selectLength="choseInfoId.length"
                        :listLength="patrolList.length"
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="patrolList"
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
                            prop="inspectionSchedule.name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.inspectionSchedule.enabled">已开启</span>
                                <span v-else>已停止</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="securityIds.length"
                            label="人员数量">
                        </el-table-column>
                        <el-table-column
                            label="执行日期">
                            <template slot-scope="scope">
                                <span v-if="scope.row.inspectionSchedule.customizedDays">{{scope.row.inspectionSchedule.startDate}}~{{scope.row.inspectionSchedule.endDate}}</span>
                                <span v-if="!scope.row.inspectionSchedule.customizedDays">{{scope.row.inspectionSchedule.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="班次">
                            <template slot-scope="scope">
                                <span v-if="scope.row.inspectionSchedule.customizedShift">{{scope.row.inspectionSchedule.customizedStartTime}}~{{scope.row.inspectionSchedule.customizedEndTime}}</span>
                                <span v-if="!scope.row.inspectionSchedule.customizedShift">{{scope.row.inspectionSchedule.shifts | shiftFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="routeName"
                            label="线路">
                        </el-table-column>
                        <el-table-column
                            label="描述">
                            <template slot-scope="scope">
                                <span class="description">{{scope.row.inspectionSchedule.description}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'修改巡更计划')">编辑</span> |
                                <span @click="stop(scope.row)" v-if="scope.row.inspectionSchedule.enabled">停用 |</span>
                                <span @click="stop(scope.row)" v-else="!scope.row.inspectionSchedule.enabled">启用 |</span>
                                <span @click="showPersonDetail(scope.row,'巡更路线信息',true)">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--<div class="personInfo" v-for="item in choseList" v-if="isShowAreaCard && item.status">-->
                        <!--<div class="checkBox">-->
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                        <!--</div>-->
                        <!--<div class="personType" @click.stop="showPersonDetail(item, '片区信息')">-->
                            <!--<img src="" alt="">-->
                            <!--<span class="type">-->
                                  <!--{{item.name}}-->
                                <!--</span>-->
                        <!--</div>-->
                        <!--<div class="specificInfo">-->
                            <!--<p class="name">所在景区：<span>{{item.idNum}}</span></p>-->
                            <!--<p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.phone}}</span></p>-->
                        <!--</div>-->
                    <!--</div>-->
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="patrolInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="closeDmisDialog"
                              @fixInfo = "fixInfo"
                              :title="title"
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
                patrolList:[],
                visible: false,
                patrolInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                isStop:true,
                title:'',
                isStart:false,
                selection:[],
                isShowLoading: false
            }
        },
        methods: {
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.patrolList = this.checkList.filter(item => {
                        if (item.inspectionSchedule.name.includes(info)) {
                            return item
                        }
                        if (item.inspectionSchedule.description.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllpatrol()
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
                choseId = this.patrolList.filter(item => {
                    if (this.choseInfoId.includes(item.id)) {
                        if (state === 'start') {
                            if (!item.inspectionSchedule.enabled) {
                                return item
                            }
                        } else {
                            if (item.inspectionSchedule.enabled) {
                                return item
                            }
                        }
                    }
                })
                choseId = choseId.map(item => {
                    return item.id
                })
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
            startEndPlanApi (choseId, state) {
                api.patrol.stareEndPlan(choseId).then(res => {
                    console.log(res, '更改状态成功')
                    if (state === 'start') {
                        this.$message.success('计划开启成功')
                    } else {
                        this.$message.success('计划关闭成功')
                    }
                    choseId.forEach(item => {
                        this.patrolList.forEach(item1 => {
                            if (item === item1.id) {
                                item1.inspectionSchedule.enabled = !item1.inspectionSchedule.enabled
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
                this.patrolInfo = info
                this.visible = true;
                this.title = title;
                this.isDisabled = state;
            },
            addNewInfo () {
                this.showPersonDetail({inspectionSchedule: {}}, '添加巡更计划', false)
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                let isDelete = false
                this.choseInfoId.forEach(item => {
                    this.patrolList.forEach(item1 => {
                        if (item === item1.id) {
                            if (item1.inspectionSchedule.enabled) {
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
                        api.patrol.deletePatrol(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.patrolList = this.patrolList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.patrolList[index].checked = false
                                        this.patrolList[index].status = false
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
                this.patrolList = this.patrolList.filter(item => {
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
                this.patrolList = this.patrolList.filter((item) => {
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
                let obj = {
                    id: info.inspectionSchedule.id,
                    name: info.inspectionSchedule.name,
                    customizedDays: info.inspectionSchedule.customizedDays,
                    customizedShift: info.inspectionSchedule.customizedShift,
                    routeId: info.inspectionSchedule.routeId,
                    description: info.inspectionSchedule.description,
                    securityIds: info.securityIds
                }
                if (info.inspectionSchedule.customizedDays) {
                    obj.startDate = moment(info.inspectionSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.inspectionSchedule.time[1]).format('YYYY-MM-DD')
                }else {
                    obj.days = info.inspectionSchedule.days
                }
                if (info.inspectionSchedule.customizedShift) {
                    obj.customizedStartTime = moment(info.inspectionSchedule.classTime[0]).format('HH:mm:ss')
                    obj.customizedEndTime = moment(info.inspectionSchedule.classTime[1]).format('HH:mm:ss')
                }else {
                    obj.shifts = info.inspectionSchedule.shifts
                }
                api.patrol.updataPatrol(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.$message.success('修改成功')
                    this.getAllpatrol()
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            addNewPerson (info) {
                let obj = {
                    name: info.inspectionSchedule.name,
                    customizedDays: info.inspectionSchedule.customizedDays,
                    customizedShift: info.inspectionSchedule.customizedShift,
                    routeId: info.inspectionSchedule.routeId,
                    description: info.inspectionSchedule.description,
                    securityIds: info.securityIds
                }
                if (info.inspectionSchedule.customizedDays) {
                    obj.startDate = moment(info.inspectionSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.inspectionSchedule.time[1]).format('YYYY-MM-DD')
                }else {
                    obj.days = info.inspectionSchedule.days
                }
                if (info.inspectionSchedule.customizedShift) {
                    obj.customizedStartTime = moment(info.inspectionSchedule.classTime[0]).format('HH:mm:ss')
                    obj.customizedEndTime = moment(info.inspectionSchedule.classTime[1]).format('HH:mm:ss')
                }else {
                    obj.shifts = info.inspectionSchedule.shifts
                }
                api.patrol.createdPatrol(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllpatrol()
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('创建失败')
                })
            },
            fixedInfo (info,title) {
                if (info.inspectionSchedule.enabled) {
                    this.$message.info('所选计划已经开启，请关闭后再修改')
                    return
                }
                this.showPersonDetail(info, title, false)
            },
            stop(Info){
                api.patrol.stareEndPlan([Info.id]).then(res => {
                    console.log(res, '成功')
                    Info.inspectionSchedule.enabled = !Info.inspectionSchedule.enabled
                    if (!Info.inspectionSchedule.enabled) {
                        this.$message.success('调度计划已关闭')
                    }else {
                        this.$message.success('调度计划已开启')
                    }
                }).then(err => {
                    console.log(err, '失败')
                })
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
                    this.patrolList = this.checkList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.patrolList = this.checkList.filter((item,index) => {
                        if (type.includes(item.inspectionSchedule.enabled)) {
                            item.status = true
                        } else {
                            item.status = false
                        }
                        return item.status === true
                    })
                }
            },
            async getAllpatrol () {
                this.isShowLoading = true
                await api.patrol.getAllPatrol().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.patrolList = res
                    this.patrolList.forEach(item => {
                        item.id = item.inspectionSchedule.id
                        item.checked = false;
                        if (item.inspectionSchedule.customizedDays) {
                            item.inspectionSchedule.time = [item.inspectionSchedule.startDate,item.inspectionSchedule.endDate]
                            // item.inspectionSchedule.time = [new Date(2018,10,18,10,10),new Date(2018,11,19,10,10)]
                        } else {
                            item.inspectionSchedule.days = item.inspectionSchedule.days.split(',')
                        }
                        if (item.inspectionSchedule.customizedShift) {
                            item.inspectionSchedule.classTime = [`2018-04-25,${item.inspectionSchedule.customizedStartTime}`,`2018-04-25,${item.inspectionSchedule.customizedEndTime}`]
                        } else {
                            item.inspectionSchedule.shifts = item.inspectionSchedule.shifts.split(',')
                        }
                    })
                    this.choseInfoId = []
                    this.checkList = this.patrolList
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
           this.getAllpatrol()
        },
        filters: {
            shiftFilter (item) {
                if (item === null) {
                    item = ''
                }
                let classShift = []
                if (item.includes('1')) {
                    classShift.push('早班')
                }
                if (item.includes('2')) {
                    classShift.push('中班')
                }
                if (item.includes('3')) {
                    classShift.push('晚班')
                }
                return classShift.join()
            }
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .securityDmis{
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

