<template>
    <div class="waterlevel">
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
                        :data="waterlevelList"
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
                            prop="relatedDevice"
                            label="关联设备">
                        </el-table-column>
                        <el-table-column
                            prop="upperThreshold"
                            label="水位上限(m)">
                        </el-table-column>
                        <el-table-column
                            prop="lowerThreshold"
                            label="水位下限(m)">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="severityName"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="relatedManager"
                            label="管理者">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑水位告警规则')" class="edit">编辑</span> |
                                <span @click="showDetail(scope.row,true,'查看水位告警规则')">查看</span> |
                                <span v-if="scope.row.isEnabled" @click="enabledClick(scope.row,false)">停用</span>
                                <span v-else @click="enabledClick(scope.row,true)">启用</span>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <AlarmDetail v-if="visible"
                             :visible="visible"
                             :Info="waterlevelInfo"
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
                waterlevelList: [
                    {
                        id:'1',
                        name:'马虎水位告警规则1',
                        relatedDevice:'水位监测传感器1',
                        upperThreshold:'2米',
                        lowerThreshold:'0.5米',
                        severityId:'2',
                        severityName:'中',
                        relatedManager:'程杰',
                        isEnabled:false
                    },
                    {
                        id:'2',
                        name:'南湖水位告警规则2',
                        relatedDevice:'水位监测传感器2',
                        upperThreshold:'2米',
                        lowerThreshold:'0.5米',
                        severityId:'1',
                        severityName:'高',
                        relatedManager:'程杰',
                        isEnabled:false
                    }
                ],
                waterlevelInfo:{},
                visible: false,
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
            addNewInfo () {
                this.showDetail({},false,'添加水位告警规则',)
            },
            enabledClick(obj,flag){
                console.log(obj)
                console.log(flag)
                obj.isEnabled = flag;
                if(flag){
                    //启用
                }else{
                    //停用
                }
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
                this.waterlevelInfo = info;
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
                                this.waterlevelList = this.waterlevelList.filter((item, index) => {
                                    if (item.id === this.choseInfos[i].id){
                                        this.waterlevelList[index].checked = false
                                        this.waterlevelList[index].status = false
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
                // this.waterlevelList = this.waterlevelList.filter(item => {
                //     if (item.id === id) {
                //         item.checked = item.checked
                //     }
                //     return item
                // })
                // if (this.choseInfos.includes(id)) {
                //     this.choseInfos = this.choseInfos.filter((item) =>{
                //         return item !== id
                //     })
                // } else {
                //     this.choseInfos.push(id)
                // }

                this.waterlevelList.forEach(item => {
                    if (item.id === row.id) {
                        item.checked = row.checked
                    }
                })
                if (this.choseInfos.includes(row)) {
                    this.choseInfos = this.choseInfos.filter((item) =>{
                        return item !== row
                    })
                } else {
                    this.choseInfos.push(row)
                }
            },
            selectedAll (state) {
                this.waterlevelList = this.waterlevelList.filter((item) => {
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
                    this.title="编辑水位告警规则"
                } else {
                    this.$message.error('请选择要编辑的数据')
                    return
                }
            },
            batchEnabled(flag){
                if(flag){
                    //批量启用
                    if (this.choseInfos.length > 0) {


                    } else {
                        this.$message.error('请选择要启用的数据')
                        return
                    }
                }else{
                    //批量停用
                    if (this.choseInfos.length > 0) {


                    } else {
                        this.$message.error('请选择要停用的数据')
                        return
                    }
                }
            },
            saveInfo(){
                //TODO 1 获取并设置info.alarmTypeId

                // TODO 2 保存请求
                api.alarm.createAlarmRule(info).then(res => {
                    console.log(res, '保存成功')
                    this.$message.success('保存成功')
                    this.waterlevelList = this.waterlevelList.filter((item, index) => {
                        if (item.id === this.choseInfos[i]){
                            this.waterlevelList[index].checked = false
                            this.waterlevelList[index].status = false
                        }
                        return item.status !== false
                    })
                    this.choseInfos = []
                }).catch(err => {
                    this.$message.error('保存失败，请稍后重试')
                    console.log(err)
                    this.choseInfos = []
                })
            },
            saveEditInfo(){

            },
            async getAllAlarmRule(){
                this.isShowLoading = true
                let id = '';
                await api.alarm.getAllAlarmRule(id).then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.waterlevelList = res
                    this.waterlevelList.forEach(item => {
                        item.checked = false;
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getAlarmType(){
                await api.alarm.getAlarmType().then(res => {
                    console.log(res, '请求成功')

                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        created () {
            this.getAllAlarmRule();
        },
        components: {
            ScrollContainer,
            Header,
            AlarmDetail
        },
    }

</script>

<style lang="scss" scoped type="text/scss">
    .waterlevel{
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
