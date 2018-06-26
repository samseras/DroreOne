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
                        :choseId="choseInfoId"
                        :listLength = "listLength"
                        @searchAnything="searchAnything"
                        @previousPage="previousPage"
                        @nextPage="nextPage">
                </Header>
            </div>
            <div class="personList" v-loading="loading">
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
                            prop="rule.alarmTypeName"
                            label="指标类型">
                        </el-table-column>
                        <el-table-column
                            show-overflow-tooltip
                            prop="device.name"
                            label="来源">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="status.name"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="occurenceTime"
                            label="发生时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="severity.name"
                            label="严重等级">
                        </el-table-column>
                        <el-table-column
                            prop="owner.name"
                            label="负责人">
                        </el-table-column>
                        <el-table-column
                            sortable
                            prop="owner.phone"
                            label="负责人电话">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑告警事件')" class="edit">处理</span> |
                                <span @click="showDetail(scope.row,true,'查看告警事件')">查看</span> |
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <AlarmDetail v-if="visible"
                              :visible="visible"
                              :Info="warningEventInfo"
                              :readOnly="readOnly"
                              @closeDialog ="closeDialog"
                              :title = "title"
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
    import Header from './alarmEventHeader'
    import AlarmDetail from './alarmEventDialog'
    // import moment from 'moment'
    export default {
        data(){
            return{
                warningEventList: [],
                warningEventListTemp:[],
                visible: false,
                warningEventInfo: {},
                choseInfos: [],
                choseInfoId:[],
                readOnly: true,
                title:'',
                selection:[],
                loading: false,
                isBatchEdit:false,
                alarmType:'',
                listLength:'',
                dataLength:'',
                updateParams:[],
                pageNum:1
            }
        },
        methods: {
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.warningEventList = this.warningEventList.filter(item => {
                        if (item.serialNum.includes(info)) {
                            return item
                        }
                        if(item.severity.name.includes(info)){
                            return item
                        }
                        if(item.status.name.includes(info)){
                            return item
                        }
                        if(item.owner.name.includes(info)){
                            return item
                        }
                        if(item.owner.phone.includes(info)){
                            return item
                        }
                        if(item.rule.alarmTypeName.includes(info)){
                            return item
                        }
                        if(item.device.name.includes(info)){
                            return item
                        }
                    })
                } else {
                    this.getAllAlarmEvent()
                }
            },
            choseType(type){
                console.log(type)
                let dataList = this.warningEventListTemp;
                let tempList = [];
                if(type.length > 0){
                    tempList = dataList.filter((item)=>type.includes(item.status.id))
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
                this.readOnly = state;
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
                        api.alarm.deleteAlarmEvent(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.warningEventList = this.warningEventList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.warningEventList[index].checked = false
                                        this.warningEventList[index].status = false
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
                this.warningEventList = this.warningEventList.filter(item => {
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
                this.warningEventList = this.warningEventList.filter((item) => {
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
            saveEditInfo(param){ //编辑保存
                if(this.isBatchEdit){
                    this.updateAlarmEvent(param.data)
                }else{
                    this.addUpload(param)
                }
            },
            addUpload(param){
                let objArray = param.data
                let fileAddList = param.fileAddList
                let params = []
                if(fileAddList.length > 0){
                    fileAddList.forEach((item)=>{
                        var data = new FormData();
                        data.append('f1',item);
                        params.push(this.uploadFile(data));

                    })
                    console.log(params)
                    Promise.all(params).then((result)=>{
                        console.log(result)
                        objArray[0].attachmentIds = objArray[0].attachmentIds.concat(result.map(item=>item.id))
                        this.updateParams = objArray

                    }).then(objArray=>{
                        this.updateAlarmEvent(this.updateParams)
                    })
                }else{
                    this.updateAlarmEvent(objArray)
                }


            },
            uploadFile (data) {
                return new Promise((resolve, reject) => {
                    api.alarm.uploadAttachments(data).then(res => {
                        console.log(res, '上传成功')
                        resolve(res)
                    }).catch(err => {
                        reject(res)
                        console.log(err, '上传失败')
                    })
                })
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllAlarmEvent ()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllAlarmEvent ()
            },
            async updateAlarmEvent(objArray){
                await api.alarm.updateAlarmEvent(objArray).then(res => {
                        console.log(res, '修改成功')
                        this.$message.success('修改成功')
                        this.choseInfos = []
                        this.visible = false
                        this.getAllAlarmEvent();
                    }).catch(err => {
                        this.$message.error('修改失败，请稍后重试')
                        console.log(err)
                        this.choseInfos = []
                    })
            },
            async getAllAlarmEvent () {
                this.loading = true
                await api.alarm.getAllAlarmEvent().then(res => {
                                this.loading = false
                                this.listLength = res.length
                                this.warningEventList = JSON.parse(JSON.stringify(res))
                                this.warningEventList.forEach(item => {
                                    item.checked = false;
                                    item.rule.alarmTypeName = this.getAlarmTypeNameById(item.rule.alarmTypeId)
                                    if(item.attachments && item.attachments.length > 0){
                                        let fileList = []
                                        item.attachments.forEach((obj)=>{
                                               let fileObj = {
                                                   title : obj.path.replace(/(.*\/)*([^.]+).*/ig,"$2").split('_')[0],
                                                   id:obj.id,
                                                   path:obj.path,
                                                   checked:false
                                               }
                                            fileList.push(fileObj)
                                        })
                                        if(fileList.length > 0){
                                            item.fileList = fileList
                                        }
                                    }
                                    item.modifyTime=item.modifyTime.replace("-","/")
                                    item.byTime = -(new Date(item.modifyTime)).getTime()
                                })

                                this.warningEventList = _.sortBy(this.warningEventList,'byTime')

                                this.warningEventList = this.warningEventList.filter((item,index) => {
                                    if (index < (this.pageNum * 10 ) && index > ((this.pageNum -1) * 10 ) - 1 ) {
                                        return item
                                    }
                                })
                                this.warningEventListTemp = JSON.parse(JSON.stringify(this.warningEventList))
                        }).catch(err => {
                            this.loading = false
                        })
            },
            getAlarmTypeNameById(typeId){
                let typeInfo =  this.alarmType.filter(item=>item.id == typeId)
                return typeInfo[0].name;
            },
            async getAllAlarmTypes(){
                await api.alarm.getAllAlarmTypes().then(res => {
                    this.alarmType = res;
                }).catch(err => {
                })
            },
            initData(){
                this.getAllAlarmTypes();
            }
        },
        created () {
            this.initData();
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
