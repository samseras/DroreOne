<template>
    <div class="areaDeploy">
        <div class="title">
            巡更路线        </div>
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
                        :data="patrolList"
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
                            prop="inspectionSchedule.name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="securityIds.length"
                            label="人员数量">
                        </el-table-column>
                        <el-table-column
                            label="时间">
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
                            prop="line"
                            label="线路">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'巡更路线编辑')">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'巡更路线信息')">查看</span> |
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
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              :title="title"
                              @addNewInfo="addNewPerson">
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
                this.showPersonDetail({}, '添加人员调度', false)
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
                console.log(info, 'wertyuio')
                let list = this.areaList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.areaList[i] = info
                    }
                }
                this.choseList = this.areaList
            },
            addNewPerson (info) {
                info.id = new Date().getTime()
                this.areaList.push(info)
                this.choseList = this.areaList
            },
            fixedInfo (info,title) {
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
                        } else {
                            item.inspectionSchedule.days = item.inspectionSchedule.days.split(',')
                        }
                        if (item.inspectionSchedule.customizedShift) {
                            item.inspectionSchedule.classTime = [`2018-04-25,${item.inspectionSchedule.customizedStartTime}`,`2018-04-25,${item.inspectionSchedule.customizedEndTime}`]
                        } else {
                            item.inspectionSchedule.shifts = item.inspectionSchedule.shifts.split(',')
                        }
                    })
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
    .areaDeploy{
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

