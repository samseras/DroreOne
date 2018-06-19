<template>
    <div class="overlimit">
        <div class="title">
            告警事件
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @batchEdit = 'batchEdit'
                        @addNewInfo="addNewInfo"
                        @batchEnabled="batchEnabled"
                        :choseId="choseInfoId"
                        :listsLength = "listLength"
                        @searchAnything="searchAnything">
                </Header>
            </div>
            <div class="personList" v-loading="isShowloading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="overlimitList"
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
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            show-overflow-tooltip
                            prop="relatedDeviceNames"
                            label="关联设备">
                        </el-table-column>
                        <el-table-column
                            prop="upperThreshold"
                            label="客流阈值(人)">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="alarmSeverity.name"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            sortable
                            show-overflow-tooltip
                            prop="relatedManagerNames"
                            label="管理者">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑客流量告警规则')" class="edit">编辑</span> |
                                <span @click="showDetail(scope.row,true,'查看客流量告警规则')">查看</span> |
                                <span v-if="scope.row.isEnabled" @click="enabledClick(scope.row,false)">停用</span>
                                <span v-else @click="enabledClick(scope.row,true)">启用</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <AlarmDetail v-if="visible"
                             :visible="visible"
                             :Info="overlimitInfo"
                             :isReadonly="isReadonly"
                             @closeDialog ="closeDialog"
                             :title = "title"
                             @saveInfo="saveInfo"
                             @saveEditInfo="saveEditInfo"
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
    import Header from './alarmRuleHeader'
    import AlarmDetail from './alarmRuleDialog'
    // import moment from 'moment'
    export default {
        data(){
            return{
                overlimitList: [],
                overlimitInfo:{},
                visible: false,
                choseInfos: [],
                choseInfoId:[],
                isReadonly: true,
                title:'',
                selection:[],
                isShowloading: false,
                isBatchEdit:false,
                listLength:''

            }
        },
        methods: {
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.overlimitList = this.overlimitList.filter(item => {
                        if (item.name.includes(info)) {
                            return item
                        }
                        if(item.relatedManagerNames.includes(info)){
                            return item
                        }
                        if(item.relatedDeviceNames.includes(info)){
                            return item
                        }
                        if(item.alarmSeverity.name.includes(info)){
                            return item
                        }
                        if(item.upperThreshold.toString().includes(info)){
                            return item
                        }
                    })
                } else {
                    this.getAlarmRule()
                }
            },
            addNewInfo () {
                this.showDetail({},false,'添加客流量告警规则',)
            },
            enabledClick(obj,flag){
                this.startEndPlan([obj],flag)
            },
            batchEnabled(flag){
                if(this.choseInfoId.length == 0){
                    if(flag){
                        this.$message.error('请选择要启用的数据')
                    }else{
                        this.$message.error('请选择要停用的数据')
                    }
                    return;
                }
                let choseId = []
                choseId = this.overlimitList.filter(item => {
                    if (this.choseInfoId.includes(item.id)) {
                        if (flag) {
                            if (!item.isEnabled) {
                                return item
                            }
                        } else {
                            if (item.isEnabled) {
                                return item
                            }
                        }
                    }
                })

                if(choseId.length == 0) {
                    if (flag) {
                        this.$message.info('当前选中的计划已开启')
                    } else {
                        this.$message.info('当前选中的计划已关闭')
                    }
                    return
                }
                if(flag){
                    //批量启用
                    this.startEndPlan(choseId, flag)
                }else{
                    //批量停用
                    this.$confirm('确定要停止所选的计划吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.startEndPlan(choseId, flag)
                    }).catch(() => {
                        this.$message.info('计划停止取消')
                        return
                    })
                }
            },
            startEndPlan(choseId, flag) {
                choseId = choseId.map((item)=>{
                    var obj = {
                        id: item.id,
                        name: item.name,
                        alarmTypeId: item.alarmTypeId,
                        severityId: item.severityId,
                        isEnabled: flag,
                        isDeleted: item.isDeleted,
                        deviceScope:item.deviceScope,
                        securityScope:item.securityScope,
                        upperThreshold:item.upperThreshold,
                        lowerThreshold:item.lowerThreshold,
                        extendThreshold:item.extendThreshold,
                        envTypeId:item.envTypeId,
                        envDataSource:item.envDataSource,
                        description:item.description
                    }
                    if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                        obj.relatedDeviceIds = item.relatedDeviceIds
                    }
                    if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                        obj.relatedManagerIds = item.relatedManagerIds
                    }
                    if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                        obj.relatedVehicleIds =item.relatedVehicleIds
                    }
                    if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                        obj.relatedScheduleIds = item.relatedScheduleIds
                    }
                    return obj
                });
                api.alarm.updateAlarmRule(choseId).then(res => {
                    console.log(res, '更改状态成功')
                    if (flag) {
                        this.$message.success('计划开启成功')
                    } else {
                        this.$message.success('计划关闭成功')
                    }
                    choseId.forEach(item => {
                        this.overlimitList.forEach(item1 => {
                            if (item.id === item1.id) {
                                item1.isEnabled = item.isEnabled
                                item1.checked = false
                            }
                        })
                    })
                    this.choseInfos = []
                    this.choseInfoId = []
                }).catch(err => {
                    console.log(err, '计划开启失败')
                    if (flag) {
                        this.$message.error('计划开启失败，请稍后重试')
                    } else {
                        this.$message.error('计划关闭失败，请稍后重试')
                    }
                    this.choseInfos = []
                    this.choseInfoId = []
                })
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
                if(info.alarmSeverity && info.alarmSeverity.id){
                    info.severityId = info.alarmSeverity.id
                }
                this.overlimitInfo = info;
                this.visible = true;
                this.isBatchEdit = false;
                this.isReadonly = state;
                if(title) {
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

                let isDelete = false
                this.choseInfoId.forEach(item => {
                    this.overlimitList.forEach(item1 => {
                        if (item === item1.id) {
                            if (item1.isEnabled) {
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
                        api.alarm.deleteAlarmRule(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.overlimitList = this.overlimitList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.overlimitList[index].checked = false
                                        this.overlimitList[index].status = false
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
            checked (row) {
                this.overlimitList = this.overlimitList.filter(item => {
                    if (item.id === row.id) {
                        item.checked = item.checked
                    }
                    return item
                })

                if (this.choseInfos.includes(row)) {
                    this.choseInfos = this.choseInfos.filter((item) =>{
                        return item !== row
                    })
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== row.id
                    })
                } else {
                    this.choseInfos.push(row)
                    this.choseInfoId.push(row.id)
                }
            },
            selectedAll (state) {
                this.overlimitList = this.overlimitList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfos.push(item)
                        this.choseInfoId.push(item.id)
                        return item.checked === true
                    } else {
                        item.checked = false
                        this.choseInfos = []
                        this.choseInfoId = []
                        return item.checked === false
                    }
                })
            },
            editInfo (info,state,title) {
                if (info.isEnabled) {
                    this.$message.info('所选规则已经开启，请关闭后再修改')
                    return
                }
                this.showDetail(info,state,title);
            },
            batchEdit(){
                if (this.choseInfos.length > 0) {
                    console.log('batchEdit')
                    this.isBatchEdit = true;
                    this.visible = true;
                    this.isReadonly = false;
                    this.title="编辑客流量告警规则"
                } else {
                    this.$message.error('请选择要编辑的数据')
                    return
                }
            },
            saveInfo(info){
                //TODO 1 获取并设置info.alarmTypeId
                console.log(this.alarmTypeId);
                info.alarmTypeId = this.alarmTypeId;
                console.log(info,'obj')
                // TODO 2 保存请求
                api.alarm.createAlarmRule(info).then(res => {
                    console.log(res, '保存成功')
                    this.$message.success('保存成功')
                    this.getAlarmRule();
                    this.choseInfos = []
                    this.visible = false
                }).catch(err => {
                    this.$message.error('保存失败，请稍后重试')
                    console.log(err)
                    this.choseInfos = []
                })
            },
            saveEditInfo(objArray){
                api.alarm.updateAlarmRule(objArray).then(res => {
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.getAlarmRule();
                    this.choseInfos = []
                    this.visible = false
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                    console.log(err)
                    this.choseInfos = []
                })
            },
            async init(){
                await this.getAllAlarmTypes();
                await this.getAlarmRule();
            },

            async getAlarmRule(){
                this.isShowLoading = true
                this.alarmTypeId = this.getAlarmTypeId("客流量")
                console.log( this.alarmTypeId)
                await api.alarm.getAlarmRulesByParameters(this.alarmTypeId).then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.overlimitList = res
                    this.listLength = this.overlimitList.length
                    this.overlimitList.forEach(item => {
                        item.checked = false;
                        if(item.relatedDevices.length > 0){
                            item.relatedDeviceNames =  item.relatedDevices.map(device=>device.name)
                            item.relatedDeviceIds =  item.relatedDevices.map(device=>device.id)
                            item.relatedDeviceNames =  item.relatedDeviceNames.join(",")
                        }else{
                            item.relatedDevice = ''
                            item.relatedDeviceIds = []
                        }
                        if(item.relatedManagers.length > 0) {
                            item.relatedManagerNames = item.relatedManagers.map(manager => manager.name)
                            item.relatedManagerIds = item.relatedManagers.map(manager => manager.id)
                            item.relatedManagerNames = item.relatedManagerNames.join(",")
                        }else{
                            item.relatedManagerNames = ''
                            item.relatedManagerIds = []
                        }
                        item.modifyTime=item.modifyTime.replace("-","/")
                        item.byTime = -(new Date(item.modifyTime)).getTime()
                    })
                    this.overlimitList = _.sortBy(this.overlimitList,'byTime')
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            getAlarmTypeId(typeName){
                let typeInfo =  this.alarmType.filter(item=>item.name == typeName)
                return typeInfo[0].id;
            },
            async getAllAlarmTypes(){
                await api.alarm.getAllAlarmTypes().then(res => {
                    console.log(res, '请求type成功')
                    this.alarmType = res;
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        created () {
            this.init();
        },
        components: {
            ScrollContainer,
            Header,
            AlarmDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .overlimit{
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
