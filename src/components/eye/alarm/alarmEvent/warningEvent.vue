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
                        @selectPerson="filterOnwer"
                        @searchAnything="searchAnything">
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
                            prop="alarmType.name"
                            label="告警类型">
                        </el-table-column>
                        <el-table-column
                            show-overflow-tooltip
                            prop="device.name"
                            label="来源">
                        </el-table-column>
                        <el-table-column
                            sortable
                            :filters="[{ text: '新告警', value: '1' }, { text: '处理中', value: '2' },{ text: '已处理', value: '3' }]"
                            :filter-method="filterStatus"
                            filter-multiple
                            prop="status.name"
                            label="状态">
                            <template slot-scope="scope">
                                <el-tag
                                    :color = "scope.row.status.id == '1' ? '#f36a5a' :(scope.row.status.id == '2' ? '#f39943':'#4db3a4')"
                                    disable-transitions>{{scope.row.status.name}}</el-tag>
                            </template>
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
                            label="负责人">
                            <template slot-scope="scope">
                                <span v-if="scope.row.owner">{{scope.row.owner.cnName?scope.row.owner.cnName:scope.row.owner.name}}</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--sortable-->
                            <!--prop="owner.mobileNum"-->
                            <!--label="负责人电话">-->
                        <!--</el-table-column>-->
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="editInfo(scope.row,false,'编辑告警事件')" class="operation">处理</span> |
                                <span @click="showDetail(scope.row,true,'查看告警事件')" class="operation">查看</span> |
                                <span @click="deletInfo(scope.row.id)" class="operation">删除</span>
                                <span @click="warnInfo(scope.row)" class="operation"><img class="funcImg" v-if="scope.row.status.id==1 || scope.row.status.id==2" :src="scope.row.status.id == '1' ?'../../../../../static/img/alarm/newalarm.png':'../../../../../static/img/alarm/processing.png'"></span>
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
    import {mapGetters,mapMutations} from 'vuex'
    import _ from 'lodash'
    // import moment from 'moment'
    export default {
        data(){
            return{
                allWarningEventList: [],
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
                pageNum:1,
                filterCondition: ''
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM', 'CURRENT_NUM']),
            filterOnwer (onwer) {
                console.log(onwer, '选择的人员信息')
                if (onwer.length === 0) {
                    this.getAllAlarmEvent()
                    return
                }
                this.warningEventList = this.allWarningEventList.filter(item => {
                    if (item.owner && onwer.includes(item.owner.id)) {
                        return item
                    }
                })
            },
            filterStatus(value,row){
                console.log(value,'value')
                console.log(row,'row')
                return row.status.id === value
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    let checkList = this.allWarningEventList.filter(item => {
                        if (item.serialNum.includes(info)) {
                            return item
                        }
                        if(item.severity.name.includes(info)){
                            return item
                        }
                        if(item.status.name.includes(info)){
                            return item
                        }
                        if(item.owner &&item.owner.name&& item.owner.name.includes(info)){
                            return item
                        }
                        if(item.owner &&item.owner.mobileNum&& item.owner.mobileNum.includes(info)){
                            return item
                        }
                        if(item.rule.alarmTypeName.includes(info)){
                            return item
                        }
                        if(item.device &&item.device.name&& item.device.name.includes(info)){
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.warningEventList = checkList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
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
            warnInfo(index){
                this.$router.push('/controler/warn')
                this.$store.commit('SEARCH_INFO',index)
                this.$store.commit('SHOW_SEARCH', true)
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
                if (info.owner === null) {
                    info.owner = {
                        id: '',
                        name: '',
                        mobileNum: ''
                    }
                }
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
                let that=this
                if(that.isBatchEdit){
                    that.updateAlarmEvent(param.data)
                }else{
                    that.addUpload(param)
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
            async updateAlarmEvent(objArray){
                await api.alarm.updateAlarmEvent(objArray).then(res => {
                        console.log(res, '修改成功')
                        this.$message.success('修改成功')
                        this.choseInfos = []
                        this.visible = false
                        this.getAllAlarmEvent();
                    }).catch(err => {
                        this.$message.error('修改失败，'+err.message)
                        console.log(err)
                        this.choseInfos = []
                    })
            },
            async getAllAlarmEvent () {
                this.loading = true
                this.allWarningEventList = []
                await api.alarm.getAllAlarmEvent().then(res => {
                                this.loading = false
                                let  list = JSON.parse(JSON.stringify(res))
                                if(list.length >0){
                                    list.forEach(obj=>{
                                        if(obj.alarmType && obj.alarmType.id != "10"){
                                            this.allWarningEventList.push(obj)
                                        }
                                    })
                                }
                                console.log(this.allWarningEventList, '././././././.')
                                this.allWarningEventList.forEach(item => {
                                    item.checked = false;
                                    if(item.rule && item.rule.alarmTypeId){
                                        item.rule.alarmTypeName = this.getAlarmTypeNameById(item.rule.alarmTypeId)
                                    }else{
                                        item.rule = {
                                            alarmTypeName : ""
                                        }
                                    }
                                    if(!item.rule || !item.rule.name){
                                        item.rule = {
                                            name : ""
                                        }
                                    }
                                    item.device = !item.device ? "" : item.device
                                    item.acturalExtendValue = !item.acturalExtendValue ? "" : item.acturalExtendValue
                                    if(!item.owner || !item.owner.id){
                                        item.owner = {
                                            id : ""
                                        }
                                    }
                                    if(!item.owner || !item.owner.mobileNum){
                                        item.owner = {
                                            mobileNum : ""
                                        }
                                    }
                                    item.actualValue = !item.actualValue ? "" : item.actualValue

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
                                this.allWarningEventList = _.sortBy(this.allWarningEventList,'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allWarningEventList = this.filterDataList(this.allWarningEventList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allWarningEventList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.warningEventList = this.allWarningEventList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                                this.warningEventListTemp = JSON.parse(JSON.stringify(this.warningEventList))

                        }).catch(err => {
                            this.loading = false
                        })
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if (item.serialNum.includes(this.filterCondition)) {
                        return item
                    }
                    if(item.severity.name.includes(this.filterCondition)){
                        return item
                    }
                    if(item.status.name.includes(this.filterCondition)){
                        return item
                    }
                    if(item.owner && item.owner.name && item.owner.name.includes(this.filterCondition)){
                        return item
                    }
                    if(item.owner.mobileNum.includes(this.filterCondition)){
                        return item
                    }
                    if(item.rule.alarmTypeName.includes(this.filterCondition)){
                        return item
                    }
                    if(item.device.name.includes(this.filterCondition)){
                        return item
                    }
                })
                return list
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
        },
        components: {
            ScrollContainer,
            Header,
            AlarmDetail
        },
        watch: {
            getCurrentNum () {
                this.getAllAlarmEvent()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .warningEvent{
        .el-tag{
            color: #fff;
            width: 80%;
            text-align: center;
        }
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
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
                .funcImg{
                    width: rem(25);
                    height: rem(25);
                    float: right;
                    margin-right: rem(35);
                    border-radius: rem(5);
                }
            }
        }
    }

</style>
