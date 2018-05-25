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
                        @choseType='choseType'>
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
                            prop="id"
                            label="编号">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="type"
                            label="指标类型">
                        </el-table-column>
                        <el-table-column
                            prop="source"
                            label="来源">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="status.name"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="occuredTime"
                            label="发生时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="level"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            prop="owner.name"
                            label="负责人">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="owner.tel"
                            label="负责人电话">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false)" class="edit">编辑</span> |
                                <span @click="showDetail(scope.row,true)">查看</span> |
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
                              @addAlarmEvent="addAlarmEvent"
                              :isBatchEdit="isBatchEdit"
                              :choseInfoId = 'choseInfoId'>
                </AlarmDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    // import api from '@/api'
    import Header from './alarmEventHeader'
    import AlarmDetail from './alarmEventDialog'
    // import moment from 'moment'
    export default {
        data(){
            return{
                warningEventList: [
                    {
                        id:'sos001',
                        type:'水位监测传感器1',
                        source:'报警柱001',
                        status: {
                            id:'1',
                            name :'新告警'
                        },
                        occuredTime:'2018-05-11 12:20:39',
                        level:'高',
                        owner:{
                            id:"1",
                            name:'徐一项',
                            tel:'18672019008'
                        },


                    },
                    {
                        id:'sos002',
                        type:'水位监测传感器1',
                        source:'报警柱002',
                        status: {
                            id:'2',
                            name:'处理中'

                        },
                        occuredTime:'2017-01-09 19:33:01',
                        level:'高',
                        owner:{
                            id:"2",
                            name:'张三',
                            tel:'13000100190'
                        },

                    }
                    ],
                visible: false,
                warningEventInfo: {},
                choseInfoId: [],
                isReadonly: true,
                title:'',
                selection:[],
                isShowloading: false,
                isBatchEdit:false

            }
        },
        methods: {
            choseType(type){
                console.log(type)
                let dataList = this.warningEventList;
                let tempList = [];
                this.warningEventList = this.warningEventList.filter((item,index)=>{
                    if(type.includes(item.status.id)){
                        tempList.push(item);
                    }
                })

               return this.warningEventList = tempList;

            },
            closeDialog () {
                this.visible = false
            },
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },
            showDetail (info,state) {
                this.warningEventInfo = info;
                this.visible = true;
                this.isBatchEdit = false;
                this.isReadonly = state;
            },
            deletInfo (id) {
                console.log(id)
                console.log(this.choseInfoId)
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // api.schedulebroadcast.deleteBroadcast(this.choseInfoId).then(res => {
                        //     console.log(res, '删除成功')
                        //     this.$message.success('删除成功')
                        //     for (let i = 0; i < this.choseInfoId.length; i++) {
                        //         this.broadCastList = this.broadCastList.filter((item, index) => {
                        //             if (item.id === this.choseInfoId[i]){
                        //                 this.broadCastList[index].checked = false
                        //                 this.broadCastList[index].status = false
                        //             }
                        //             return item.status !== false
                        //         })
                        //     }
                        //     this.choseInfoId = []
                        // }).catch(err => {
                        //     this.$message.error('删除失败，请稍后重试')
                        //     console.log(err)
                        //     this.choseInfoId = []
                        // })
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
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
            },
            selectedAll (state) {
                this.warningEventList = this.warningEventList.filter((item) => {
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
            editInfo (info,state) {
                console.log(info);
                this.showDetail(info,state);
            },
            batchEdit(){
                if (this.choseInfoId.length > 0) {
                    console.log('batchEdit')
                    this.isBatchEdit = true;
                    // this.warningEventInfo = info;
                    this.visible = true;
                } else {
                    this.$message.error('请选择要编辑的数据')
                    return
                }
            },
            addAlarmEvent(){

            }
        },
        created () {
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
