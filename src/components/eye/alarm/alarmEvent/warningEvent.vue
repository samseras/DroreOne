<template>
    <div class="warningEvent">
        <div class="title">
            告警事件
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @batchEdit = 'batchEdit'
                        @choseType='choseType'
                        @batchDownload="batchDownload">
                </Header>
            </div>
            <div class="personList" v-loading="isShowloading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="warningEventList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        :default-sort = "{prop: 'type', order: 'descending'}">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="serialNum"
                            label="编号">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="envTypeName"
                            label="指标类型">
                        </el-table-column>
                        <el-table-column
                            prop="sourceDeviceName"
                            label="来源">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="statusName"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="occurenceTime"
                            label="发生时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="severityName"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            prop="ownerName"
                            label="负责人">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="ownerTel"
                            label="负责人电话">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑告警事件')" class="edit">编辑</span> |
                                <span @click="showDetail(scope.row,true,'查看告警事件')">查看</span> |
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <AlarmDetail v-if="visible"
                              :visible="visible"
                              :Info="warningEventInfo"
                              :isReadonly="isReadonly"
                              @closeDialog ="closeDialog"
                              :title = "title"
                              @saveEditInfo="saveEditInfo"
                              @saveInfo="saveInfo"
                              :isBatchEdit="isBatchEdit"
                              :choseInfos = 'choseInfos'>
                </AlarmDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import Header from './alarmEventHeader'
    import AlarmDetail from './alarmEventDialog'
    // import moment from 'moment'
    export default {
        data(){
            return{
                warningEventList: [
                    {
                        serialNum:'sos001',
                        alarmRuleId:'2',
                        alarmRuleName:'消防',
                        envTypeId:'1',
                        envTypeName:'温度',
                        sourceDeviceId:'1',
                        sourceDeviceName:'报警柱001',
                        statusId:'1',
                        statusName :'新告警',
                        occurenceTime:'2018-05-11 12:20:39',
                        severityId:'1',
                        severityName:'高',
                        ownerId:"c79d9e71-8e84-44c3-9b28-049fe79deb18",
                        ownerName:'赵子龙',
                        ownerTel:'13511111111'

                    },
                    {
                        serialNum:'sos002',
                        alarmRuleId:'1',
                        alarmRuleName:'报警柱',
                        envTypeId:'2',
                        envTypeName:'PM2.5',
                        sourceDeviceId:'2',
                        sourceDeviceName:'报警柱002',
                        statusId:'2',
                        statusName :'处理中',
                        occurenceTime:'2017-01-09 19:33:01',
                        severityId:'2',
                        severityName:'中',
                        ownerId:"a7a9ef0f-7475-4015-9317-c880d3c38db0",
                        ownerName:'关羽',
                        ownerTel:'13712111111'

                    }
                    ],
                warningEventListTemp:[
                    {
                        serialNum:'sos001',
                        alarmRuleId:'2',
                        alarmRuleName:'消防',
                        envTypeId:'1',
                        envTypeName:'温度',
                        sourceDeviceId:'1',
                        sourceDeviceName:'报警柱001',
                        statusId:'1',
                        statusName :'新告警',
                        occurenceTime:'2018-05-11 12:20:39',
                        severityId:'1',
                        severityName:'高',
                        ownerId:"c79d9e71-8e84-44c3-9b28-049fe79deb18",
                        ownerName:'赵子龙',
                        ownerTel:'13511111111'

                    },
                    {
                        serialNum:'sos002',
                        alarmRuleId:'1',
                        alarmRuleName:'报警柱',
                        envTypeId:'2',
                        envTypeName:'PM2.5',
                        sourceDeviceId:'2',
                        sourceDeviceName:'报警柱002',
                        statusId:'2',
                        statusName :'处理中',
                        occurenceTime:'2017-01-09 19:33:01',
                        severityId:'2',
                        severityName:'中',
                        ownerId:"a7a9ef0f-7475-4015-9317-c880d3c38db0",
                        ownerName:'关羽',
                        ownerTel:'13712111111'

                    }
                ],
                visible: false,
                warningEventInfo: {},
                choseInfos: [],
                choseInfoId:[],
                isReadonly: true,
                title:'',
                selection:[],
                isShowloading: false,
                isBatchEdit:false
            }
        },
        methods: {
            batchDownload(){
                console.log(this.choseInfos)
                if (this.choseInfos.length > 0) {
                        //导出接口
                        // api.schedulebroadcast.deleteBroadcast(this.choseInfos).then(res => {
                        //     console.log(res, '删除成功')
                        //     this.$message.success('删除成功')
                        //     for (let i = 0; i < this.choseInfos.length; i++) {
                        //         this.broadCastList = this.broadCastList.filter((item, index) => {
                        //             if (item.id === this.choseInfos[i]){
                        //                 this.broadCastList[index].checked = false
                        //                 this.broadCastList[index].status = false
                        //             }
                        //             return item.status !== false
                        //         })
                        //     }
                        //     this.choseInfos = []
                        // }).catch(err => {
                        //     this.$message.error('删除失败，请稍后重试')
                        //     console.log(err)
                        //     this.choseInfos = []
                        // })

                } else {
                    this.$message.error('请选择要导出的数据')
                    return
                }
            },
            choseType(type){
                console.log(type)
                let dataList = this.warningEventListTemp;
                let tempList = [];
                if(type.length > 0){
                    tempList = dataList.filter((item)=>type.includes(item.statusId))
                }else{
                    tempList = dataList;
                }


               return this.warningEventList = tempList;

            },
            closeDialog () {
                this.visible = false
            },
            handleSelectionChange(selection) {
                this.choseInfos = selection.map(item => {
                    return item.id
                })
            },
            showDetail (info,state,title) {
                this.warningEventInfo = info;
                this.visible = true;
                this.isBatchEdit = false;
                this.isReadonly = state;
                if(title){
                    this.title = title;
                }
            },
            deletInfo (id) {
                console.log(id)
                console.log(this.choseInfos)
                if (id) {
                    this.choseInfoId = [id]
                }else{
                    if(this.choseInfoId.length == 0){
                        this.$message.error('请选择要删除的数据')
                        return
                    }
                    this.choseInfoId = this.choseInfos.map(item=>item.id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.alarm.deleteAlarmRule(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfos.length; i++) {
                                this.alarmcolumnList = this.alarmcolumnList.filter((item, index) => {
                                    if (item.id === this.choseInfos[i].id){
                                        this.alarmcolumnList[index].checked = false
                                        this.alarmcolumnList[index].status = false
                                    }
                                    return item.status !== false
                                })
                            }
                            this.choseInfos = []
                            this.choseInfoId = []
                        }).catch(err => {
                            this.$message.error('删除失败，请稍后重试')
                            console.log(err)
                            this.choseInfos = []
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
                this.warningEventList = this.warningEventList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.choseInfos.includes(id)) {
                    this.choseInfos = this.choseInfos.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfos.push(id)
                }
            },
            selectedAll (state) {
                this.warningEventList = this.warningEventList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfos.push(item.id)
                        return item.checked === true
                    } else {
                        item.checked = false
                        this.choseInfos = []
                        return item.checked === false
                    }
                })
            },
            editInfo (info,state,title) {
                console.log(info);
                this.showDetail(info,state,title);
            },
            batchEdit(){
                if (this.choseInfos.length > 0) {
                    console.log('batchEdit')
                    this.isBatchEdit = true;
                    this.visible = true;
                } else {
                    this.$message.error('请选择要编辑的数据')
                    return
                }
            },
            saveEditInfo(){ //编辑保存
                if(this.isBatchEdit){  //批量编辑保存

                }else{  //单个编辑保存

                }
            },
            saveInfo(){  //新增保存

            },
            async getAllAlarmEvent () {
                this.isShowLoading = true
                await   api.alarm.getAllAlarmEvent().then(res => {
                                console.log(res, '请求成功')
                                this.isShowLoading = false
                                this.warningEventList = res
                                this.warningEventListTemp = res
                                this.warningEventList.forEach(item => {
                                    item.checked = false;
                                })
                        }).catch(err => {
                            console.log(err, '请求失败')
                            this.isShowLoading = false
                        })
            }
        },
        created () {
            this.getAllAlarmEvent();
            console.log(this.personInfo)
        },
        components: {
            ScrollContainer,
            Header,
            AlarmDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .warningEvent{
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
