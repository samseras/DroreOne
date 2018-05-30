<template>
    <div class="alarmcolumn">
        <div class="title">
            告警事件
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @deletInfo = "deletInfo"
                        @selectedAll = 'selectedAll'
                        @batchEdit = 'batchEdit'
                        @addNewInfo="addNewInfo"
                        @batchEnabled="batchEnabled">
                </Header>
            </div>
            <div class="personList" v-loading="isShowloading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="alarmcolumnList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        :default-sort = "{prop: 'relatedManager', order: 'descending'}">
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
                            prop="relatedDevices"
                            label="关联报警柱">
                        </el-table-column>
                        <el-table-column
                            prop="deviceScope"
                            label="设备调度范围(m)">
                        </el-table-column>
                        <el-table-column
                            prop="securityScope"
                            label="安保调度范围(m)">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="severityName"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="relatedManagerNames"
                            label="管理者">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑报警柱告警规则')" class="edit">编辑</span> |
                                <span @click="showDetail(scope.row,true,'查看报警柱告警规则')">查看</span> |
                                <span v-if="scope.row.isEnabled" @click="enabledClick(scope.row,false)">停用</span>
                                <span v-else @click="enabledClick(scope.row,true)">启用</span>
                               | <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <AlarmDetail v-if="visible"
                             :visible="visible"
                             :Info="alarmcolumnInfo"
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
    export default {
        data(){
            return{
                alarmcolumnList: [
                    {
                        id:'1',
                        name:'sos报警规则01',
                        relatedDevices:[],
                        severityId:'1',
                        severityName:'高',
                        deviceScope:'100米',
                        securityScope:'200米',
                        relatedManagerIds:'0',
                        relatedManagerNames:'aaa',
                        isEnabled:true

                    },
                    {
                        id:'2',
                        name:'sos报警规则02',
                        relatedDevices:[],
                        severityId:'2',
                        severityName:'中',
                        deviceScope:'400米',
                        securityScope:'700米',
                        relatedManagerIds:'1',
                        relatedManagerNames:'bbb',
                        isEnabled:true

                    },
                ],
                alarmcolumnInfo:{},
                visible: false,
                warningEventInfo: {},
                choseInfos: [],
                choseInfoId:[],
                isReadonly: true,
                title:'',
                selection:[],
                isShowloading: false,
                isBatchEdit:false,
                alarmType:[]

            }
        },
        methods: {
            addNewInfo () {
                this.showDetail({},false,'添加报警柱告警规则',)
            },
            enabledClick(obj,flag){
                console.log(obj)
                let param = obj;
                param.isEnabled = flag;

                api.alarm.updateAlarmRule([param]).then(res => {
                    obj.isEnabled = flag
                    if (obj.isEnabled) {
                        this.$message.success('调度计划已开启')
                    }else {
                        this.$message.success('调度计划已关闭')
                    }
                }).then(err => {
                    console.log(err, '失败')
                })
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
                choseId = this.alarmcolumnList.filter(item => {
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
                api.alarm.updateAlarmRule(choseId).then(res => {
                    console.log(res, '更改状态成功')
                    if (flag) {
                        this.$message.success('计划开启成功')
                    } else {
                        this.$message.success('计划关闭成功')
                    }
                    choseId.forEach(item => {
                        this.alarmcolumnList.forEach(item1 => {
                            if (item.id === item1.id) {
                                item1.isEnabled = !item1.isEnabled
                            }
                        })
                    })
                }).catch(err => {
                    console.log(err, '计划开启失败')
                    if (flag) {
                        this.$message.error('计划开启失败，请稍后重试')
                    } else {
                        this.$message.error('计划关闭失败，请稍后重试')
                    }
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
                console.log(info)
                this.alarmcolumnInfo = info;
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
                    this.alarmcolumnList.forEach(item1 => {
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

                if ( this.choseInfoId.length > 0) {
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
            checked (row) {
                console.log(row)
                this.alarmcolumnList.forEach(item => {
                    if (item.id === row.id) {
                        item.checked = row.checked
                    }
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
                this.alarmcolumnList = this.alarmcolumnList.filter((item) => {
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
            saveEditInfo(objArray){ //编辑保存
                if(this.isBatchEdit){  //批量编辑保存

                }else{  //单个编辑保存

                }
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
                    this.isReadonly = false;
                    this.title="编辑报警柱告警规则"
                } else {
                    this.$message.error('请选择要编辑的数据')
                    return
                }
            },
            saveInfo(info){
                //TODO 1 获取并设置info.alarmTypeId

                console.log(info)
                // TODO 2 保存请求
                // api.alarm.createAlarmRule(info).then(res => {
                //         console.log(res, '保存成功')
                //         this.$message.success('保存成功')
                //         this.alarmcolumnList = this.alarmcolumnList.filter((item, index) => {
                //             if (item.id === this.choseInfos[i]){
                //                 this.alarmcolumnList[index].checked = false
                //                 this.alarmcolumnList[index].status = false
                //             }
                //             return item.status !== false
                //         })
                //         this.choseInfos = []
                // }).catch(err => {
                //     this.$message.error('保存失败，请稍后重试')
                //     console.log(err)
                //     this.choseInfos = []
                // })
            },
            init(){
                // this.getAllAlarmRule();
            },

            async getAllAlarmRule(){
                this.isShowLoading = true
                let id = this.getAlarmTypeId("报警柱")
                await api.alarm.getAllAlarmRule(id).then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.alarmcolumnList = res
                    this.alarmcolumnList.forEach(item => {
                        item.checked = false;

                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            getAlarmTypeId(typeName){
                let typeInfo =  this.alarmType.filter(item=> item.name == typeName)

                return typeInfo.id
            },
            async getAlarmType(){
                await api.alarm.getAlarmType().then(res => {
                    console.log(res, '请求成功')
                    this.alarmType = res;
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },

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
    .alarmcolumn{
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
