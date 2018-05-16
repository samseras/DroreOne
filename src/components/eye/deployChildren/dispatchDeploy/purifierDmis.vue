<template>
<div class="puriiferDmis">
        <div class="title">
            保洁
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
                        ref="multipleTable"
                        :data="purifierList"
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
                            prop="cleanSchedule.name"
                            label="调度人员"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            width="120"
                            prop="type"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="cleanerIds.length"
                            width="120"
                            label="人员数量">
                        </el-table-column>
                        <el-table-column
                            width="240"
                            label="时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cleanSchedule.customizedDays">{{scope.row.cleanSchedule.startDate}}~{{scope.row.cleanSchedule.endDate}}</span>
                                <span v-if="!scope.row.cleanSchedule.customizedDays">{{scope.row.cleanSchedule.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="班次">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cleanSchedule.customizedShift">{{scope.row.cleanSchedule.customizedStartTime}}~{{scope.row.cleanSchedule.customizedEndTime}}</span>
                                <span v-if="!scope.row.cleanSchedule.customizedShift">{{scope.row.cleanSchedule.shifts | shiftFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="片区"
                            width="240">
                            <template slot-scope="scope">
                                <span  class="regionName" v-for="item in scope.row.regions">{{item.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'保洁信息编辑')">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'保洁信息',true)">查看</span> |
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
                              :Info="purifierInfo"
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
    import Header from './dmisHeader'
    import PersonDetail from './dmisDialog'
    import api from '@/api'
    import moment from 'moment'
    export default {
        name: 'purifier-dmis',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                purifierList: [],
                visible: false,
                purifierInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                title:'',
                isDisabled: true,
                isStop:true,
                isStart:false,
                isShowLoading: false
            }
        },
        methods: {
            closeDmisDialog () {
                this.visible = false
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title,state) {
                this.visible = true;
                this.title = title;
                this.isDisabled = state;
                this.purifierInfo = info
            },
            addNewInfo () {
                this.showPersonDetail({cleanSchedule: {},}, '添加人员调度',false)
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
                        api.purifier.deletPurifier(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.purifierList = this.purifierList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.purifierList[index].checked = false
                                        this.purifierList[index].status = false
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
                this.purifierList = this.purifierList.filter(item => {
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
                this.purifierList = this.purifierList.filter((item) => {
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
                    id: info.cleanSchedule.id,
                    name: info.cleanSchedule.name,
                    customizedDays: info.cleanSchedule.customizedDays,
                    customizedShift: info.cleanSchedule.customizedShift,
                    description: info.cleanSchedule.description,
                    cleanerIds: info.cleanerIds,
                    regionIds: info.regionIds
                }
                if (info.cleanSchedule.customizedDays) {
                    obj.startDate = moment(info.cleanSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.cleanSchedule.time[1]).format('YYYY-MM-DD')
                }else {
                    obj.days = info.cleanSchedule.days
                }
                if (info.cleanSchedule.customizedShift) {
                    obj.customizedStartTime = moment(info.cleanSchedule.classTime[0]).format('HH:mm:ss')
                    obj.customizedEndTime = moment(info.cleanSchedule.classTime[1]).format('HH:mm:ss')
                }else {
                    obj.shifts = info.cleanSchedule.shifts
                }
                console.log(obj, '这是传给后台的')
                api.purifier.updataPurifier(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.$message.success('修改成功')
                    this.getAllPurifier()
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('修改失败')
                })
            },
            addNewPerson (info) {
               console.log(info, '这是要添加的')
                let obj = {
                    name: info.cleanSchedule.name,
                    customizedDays: info.cleanSchedule.customizedDays,
                    customizedShift: info.cleanSchedule.customizedShift,
                    description: info.cleanSchedule.description,
                    cleanerIds: info.cleanerIds,
                    regionIds: info.regionIds
                }
                if (info.cleanSchedule.customizedDays) {
                    obj.startDate = moment(info.cleanSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.cleanSchedule.time[1]).format('YYYY-MM-DD')
                }else {
                    obj.days = info.cleanSchedule.days
                }
                if (info.cleanSchedule.customizedShift) {
                   obj.customizedStartTime = moment(info.cleanSchedule.classTime[0]).format('HH:mm:ss')
                   obj.customizedEndTime = moment(info.cleanSchedule.classTime[1]).format('HH:mm:ss')
                }else {
                   obj.shifts = info.cleanSchedule.shifts
                }
                console.log(obj, '这是传给后台的')
                api.purifier.createdPurifier(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '创建成功')
                    this.$message.success('创建成功')
                    this.getAllPurifier()
                }).catch(err => {
                    console.log(err, '创建失败')
                    this.$message.error('创建失败')
                })
            },
            fixedInfo (info,title) {
                this.purifierInfo = info
                this.showPersonDetail(info, title, false)
            },
            stop(Info){
                console.log(this.choseInfoId)
                if(!this.choseInfoId.includes(Info.id)){
                    this.choseInfoId.push(Info.id)
                }
                if(this.choseInfoId.length == 1){
                    Info.isStart = true;
                    Info.isStop = false;
                    this.choseInfoId = []
                }else{
                    this.$message.warning('至多选择一条数据')
                }
            },
            start(Info){
                console.log(this.choseInfoId)
                if(!this.choseInfoId.includes(Info.id)){
                    this.choseInfoId.push(Info.id)
                }
                if(this.choseInfoId.length == 1){
                    Info.isStart = false;
                    Info.isStop = true;
                    this.choseInfoId = []
                }else{
                    this.$message.warning('至多选择一条数据')
                }
            },
            async getAllPurifier () {
                this.isShowLoading = true
                await api.purifier.getPurifierList().then(res => {
                    this.isShowLoading = false
                    console.log(res, '请求成功')
                    this.purifierList = res
                    this.purifierList.forEach(item => {
                        item.id = item.cleanSchedule.id
                        item.checked = false;
                        if (item.cleanSchedule.customizedDays) {
                            item.cleanSchedule.time = [item.cleanSchedule.startDate,item.cleanSchedule.endDate]
                        } else {
                            item.cleanSchedule.days = item.cleanSchedule.days.split(',')
                        }
                        if (item.cleanSchedule.customizedShift) {
                            item.cleanSchedule.classTime = [`2018-04-25,${item.cleanSchedule.customizedStartTime}`,`2018-04-25,${item.cleanSchedule.customizedEndTime}`]
                        } else {
                            item.cleanSchedule.shifts = item.cleanSchedule.shifts.split(',')
                        }
                        if (item.regions.length > 0) {
                            item.regionIds = [item.regions[0].id]
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
           this.getAllPurifier()
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
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .puriiferDmis{
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
                .regionName{
                    margin-right: rem(10);
                }
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

