<template>
    <div class="transportDmis">
        <div class="title">
            车船调度
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @startEndPlan="startEndPlan"
                        @searchAnything="searchAnything"
                        @choseType="choseType"
                        :selectLength="choseInfoId.length"
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="isShowAreaCard"
                        ref="multipleTable"
                        :data="transportList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        height="98%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="typeName"
                            label="调度类型">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.enabled">已开启</span>
                                <span v-else>已停止</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="routeName"
                            label="线路">
                        </el-table-column>
                        <el-table-column
                            label="执行日期">
                            <template slot-scope="scope">
                                <span v-if="scope.row.customizedDays">{{scope.row.startDate}}~{{scope.row.endDate}}</span>
                                <span v-if="!scope.row.customizedDays">{{scope.row.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="执行时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.startTime}}~{{scope.row.endTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="描述">
                            <template slot-scope="scope">
                                <span class="description">{{scope.row.description}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'修改调度计划')" class="edit">编辑</span> |
                                <span @click="stop(scope.row)" v-if="scope.row.enabled">停用 |</span>
                                <span @click="stop(scope.row)" v-else="!scope.row.enabled">启用 |</span>
                                <span @click="showPersonDetail(scope.row,'车船信息',true)">查看</span> |
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="transportInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="closeDmisDialog"
                              :title="title"
                              @fixInfo = "fixInfo"
                              @saveNewInfo="addNewTransport">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './dmisHeader'
    import api from '@/api'
    import moment from 'moment'
    import PersonDetail from './dmisDialog'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                transportList:[],
                allTransportList:[],
                visible: false,
                transportInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                title: '',
                isStop:true,
                isStart:false,
                selection:[],
                isShowLoading: false,
                routeObjs:[],
                filterCondition: ''
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM']),
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    let checkList = this.allTransportList.filter(item => {
                        if (item.name && item.name.includes(info)) {
                            return item
                        }
                        if (item.description && item.description.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.transportList = checkList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                } else {
                    this.getAllRoat()
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
                choseId = this.transportList.filter(item => {
                    if (this.choseInfoId.includes(item.id)) {
                        if (state === 'start') {
                            if (!item.enabled) {
                                return item
                            }
                        } else {
                            if (item.enabled) {
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
                if(state == 'start'){
                    api.transport.startPlan(choseId).then(res=>{
                        console.log(res, '更改状态成功')
                        this.$message.success('计划开启成功')
                        choseId.forEach(item => {
                            this.transportList.forEach(item1 => {
                                if (item === item1.id) {
                                    item1.enabled = true
                                }
                            })
                        })
                    }).catch(err=>{
                        console.log(err)
                        this.$message.error('计划开启失败，请稍后重试')
                    })
                }else{
                    api.transport.stopPlan(choseId).then(res=>{
                        console.log(res, '更改状态成功')
                        this.$message.success('计划关闭成功')
                        choseId.forEach(item => {
                            this.transportList.forEach(item1 => {
                                if (item === item1.id) {
                                    item1.enabled = false
                                }
                            })
                        })
                    }).catch(err=>{
                        console.log(err)
                        this.$message.error('计划关闭失败，请稍后重试')
                    })
                }
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
                this.transportInfo = info
                this.visible = true;
                this.title = title;
                this.isDisabled = state;
            },
            addNewInfo () {
                this.showPersonDetail({vDriverMaps:[],type:'0'}, '添加车船调度计划',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                let isDelete = false
                this.choseInfoId.forEach(item => {
                    this.transportList.forEach(item1 => {
                        if (item === item1.id) {
                            if (item1.enabled) {
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
                        api.transport.deleteTransport(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.transportList = this.transportList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.transportList[index].checked = false
                                        this.transportList[index].status = false
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
                this.transportList = this.transportList.filter(item => {
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
                this.transportList = this.transportList.filter((item) => {
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
                    id: info.id,
                    name: info.name,
                    customizedDays: info.customizedDays,
                    startTime: moment(info.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.watchTime[1]).format('HH:mm:ss'),
                    description: info.description,
                    routeId:info.routeId,
                    type:info.type,
                    createTime:info.createTime,
                    creator:info.creator,
                    deleted:info.deleted,
                    enabled:info.enabled,
                    modifier:info.modifier,
                    modifyTime:info.modifyTime,
                    scenicAreaId:info.scenicAreaId,
                    svDriverMaps:info.svDriverMaps
                }
                if (info.customizedDays) {
                    obj.startDate = moment(info.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.days
                }
                api.transport.updateTransport(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    this.getAllRoat()
                    this.$message.success('修改成功')
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            addNewTransport (info) {
                let obj = {
                    name: info.name,
                    customizedDays: info.customizedDays,
                    startTime: moment(info.watchTime[0]).format('HH:mm:ss'),
                    endTime: moment(info.watchTime[1]).format('HH:mm:ss'),
                    description: info.description,
                    routeId:info.routeId,
                    type:info.type,
                    svDriverMaps:info.svDriverMaps
                }
                if (info.customizedDays) {
                    obj.startDate = moment(info.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.days
                }
                api.transport.createTransport(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.getAllRoat()

                    this.$message.success('创建成功')
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (info,title) {
                if (info.enabled) {
                    this.$message.info('所选计划已经开启，请关闭后再修改')
                    return
                }
                this.transportInfo = info
                this.showPersonDetail(info, title, false)
            },
            stop(Info){
                if(Info.enabled){
                    api.transport.stopPlan([Info.id]).then(res => {
                        console.log(res, '成功')
                        Info.enabled = false
                        this.$message.success('调度计划已关闭')
                    }).then(err => {
                        console.log(err, '失败')
                    })
                }else{
                    api.transport.startPlan([Info.id]).then(res => {
                        console.log(res, '成功')
                        Info.enabled = true
                        this.$message.success('调度计划已开启')
                    }).then(err => {
                        console.log(err, '失败')
                    })
                }
            },
            choseType (type) {
                console.log(type, '这是传过来的')
                type = type.map(item => {
                    if (item === '启用') {
                        return true
                    } else{
                        return false
                    }
                })
                console.log(type, '这是过滤后的')
                if (type.length === 0){
                    this.transportList = this.checkList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.transportList = this.checkList.filter((item,index) => {
                        if (type.includes(item.enabled)) {
                            item.status = true
                        } else {
                            item.status = false
                        }
                        return item.status === true
                    })
                }
            },
            async getAllTransport () {
                this.isShowLoading = true
                await api.transport.getTransport().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.allTransportList = res

                    this.allTransportList.forEach(item => {
                        item.checked = false;
                        item.time = [item.startDate,item.endDate]
                        item.watchTime = [`2018-04-25,${item.startTime}`,`2018-04-25,${item.endTime}`]
                        if (!item.customizedDays) {
                            item.days = item.days.split(',')
                        }
                        item.type == '0' ? item.typeName = "车辆":item.typeName = "船只";
                        console.log(item.routeName)
                        this.routeObjs.forEach(route=>{
                            if(item.routeId == route.id){
                                item.routeName = route.name;
                            }
                        })
                    })
                    if (this.filterCondition.trim() !== '') {
                        this.allTransportList = this.filterDataList(this.allTransportList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allTransportList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.transportList = this.allTransportList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    this.choseInfoId = []
                    this.checkList = this.transportList
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
                    if (item.description && item.description.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            },
            async getAllRoat(){
                await api.roat.getAllRoat().then(res => {
                    console.log(res, '请求成功')
                    this.routeObjs = res;
                    this.getAllTransport()
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        created () {
           this.getAllRoat()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        },
        watch: {
            getCurrentNum () {
                this.getAllRoat()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .transportDmis{
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
                }
            }
        }
    }

</style>
