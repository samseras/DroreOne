<template>
    <div class="lamppostDmis">
        <div class="title">
            路灯
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
                        :data="lamppostList"
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
                            prop="lightSchedule.name"
                            label="名称"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="lightSchedule.description"
                            label="描述">
                        </el-table-column>
                        <el-table-column
                            prop="lightIds.length"
                            label="硬件总数">
                        </el-table-column>
                        <el-table-column
                            label="时间">
                            <template slot-scope="scope">
                                <span v-if="scope.row.lightSchedule.customizedDays">{{scope.row.lightSchedule.startDate}}~{{scope.row.lightSchedule.endDate}}</span>
                                <span v-if="!scope.row.lightSchedule.customizedDays">{{scope.row.lightSchedule.days | weekFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="执行时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.lightSchedule.startTime}}~{{scope.row.lightSchedule.endTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'路灯编辑')" class="edit">编辑</span> |
                                <span @click="stop(scope.row)" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row)" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showCheckDetail(scope.row,'路灯信息')">查看</span> |
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="lamppostInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="closeDmisDialog"
                              @fixInfo = "fixInfo"
                              :title = "title"
                              @saveNewInfo="saveNewPerson">
                </PersonDetail>
                <CheckDetail v-if="checkVisible"
                    :visible="checkVisible"
                    :checkInfo="lamppostInfo"
                    :isDisabled="isDisabled"
                    @closeInfoDialog ="checkVisible = false"
                    :title = "title">
                </CheckDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import moment from 'moment'
    import Header from './dmisHeader'
    import PersonDetail from './dmisDialog'
    import CheckDetail from './lamppostCheckDialog'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                lamppostList: [],
                checkVisible:false,
                visible: false,
                lamppostInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                title:'',
                isStop:true,
                isStart:false,
                selection:[],
                isDisabled:true,
            }
        },
        methods: {
            closeDmisDialog () {
                this.visible = false
            },
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },
            async getLamppostList (){
                this.isShowLoading = true
                await api.lamppost.getLamppostList().then(res => {
                    console.log(res,"pppppppppppppp");
                    this.isShowLoading = false
                    this.lamppostList = res
                    this.lamppostList.forEach(item => {
                        item.checked = false;
                        item.isStop = true;
                        item.isStart = false;
                        item.lightSchedule.time = [item.lightSchedule.startDate,item.lightSchedule.endDate]
                        item.lightSchedule.watchTime = [`2018-04-25,${item.lightSchedule.startTime}`,`2018-04-25,${item.lightSchedule.endTime}`]
                        item.id = item.lightSchedule.id
                        if (!item.lightSchedule.customizedDays) {
                            item.lightSchedule.days = item.lightSchedule.days.split(',')
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            showPersonDetail (info,title,state) {
                this.lamppostInfo = info;
                this.visible = true;
                this.title = title;
                this.isDisabled = state
            },
            showCheckDetail(info,title){
                this.lamppostInfo = info;
                this.checkVisible = true;
                this.title = title;
                this.isDisabled = true;
            },
            addNewInfo () {
                this.showPersonDetail({lightSchedule:{}}, '添加灯光照明',false)
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
                        api.lamppost.deletLamppost(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.lamppostList = this.lamppostList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.lamppostList[index].checked = false
                                        this.lamppostList[index].status = false
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
                this.lamppostList = this.lamppostList.filter(item => {
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
                this.lamppostList = this.lamppostList.filter((item) => {
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
            async fixInfo (info) {
                console.log(info, '这是传回的数据')
                let obj = {
                    id: info.id,
                    name:info.lightSchedule.name,
                    customizedDays:info.lightSchedule.customizedDays,
                    startTime:moment(info.lightSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime:moment(info.lightSchedule.watchTime[1]).format('HH:mm:ss'),
                    description:info.lightSchedule.description,
                    lightIds:info.lightIds
                }
                if (info.lightSchedule.customizedDays) {
                    obj.startDate = moment(info.lightSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.lightSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.lightSchedule.days
                }
                await api.lamppost.updataLamppost(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '这是请求回来的')
                    this.$message.success('修改成功')
                    this.getLamppostList()
                    // that.init()
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            saveNewPerson (info) {
                let obj = {
                    name:info.lightSchedule.name,
                    customizedDays:info.lightSchedule.customizedDays,
                    startTime:moment(info.lightSchedule.watchTime[0]).format('HH:mm:ss'),
                    endTime:moment(info.lightSchedule.watchTime[1]).format('HH:mm:ss'),
                    description:info.lightSchedule.description,
                    lightIds:info.lightIds
                }
                if (info.lightSchedule.customizedDays) {
                    obj.startDate = moment(info.lightSchedule.time[0]).format('YYYY-MM-DD')
                    obj.endDate = moment(info.lightSchedule.time[1]).format('YYYY-MM-DD')
                } else {
                    obj.days = info.lightSchedule.days
                }
                console.log(obj, '擦时候')
                api.lamppost.addLamppost(JSON.stringify(obj)).then(res => {
                    this.closeDmisDialog()
                    console.log(res, '这是请求回来的')
                    this.$message.success('添加成功')
                    this.getLamppostList()
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            fixedInfo (info,title) {
                this.lamppostInfo = info
                this.showPersonDetail(info, title)
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
            }
        },
        created () {
            this.getLamppostList ();
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            CheckDetail
        },
        mounted:function(){

        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .lamppostDmis{
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
