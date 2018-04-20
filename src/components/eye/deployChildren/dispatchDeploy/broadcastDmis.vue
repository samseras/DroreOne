<template>
    <div class="areaDeploy">
        <div class="title">
            广播
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList">
                <ScrollContainer>
                    <el-table
                        v-if="isShowAreaCard"
                        ref="multipleTable"
                        :data="areaList"
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
                            prop="type"
                            label="调度硬件"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="硬件总数">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="executetime"
                            label="执行时间">
                        </el-table-column>
                        <el-table-column
                            prop="repetition"
                            label="重复调度"
                            sortable>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id,'片区信息')" class="edit">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'片区信息')">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="areaInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
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
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                areaList: [
                    {id:1,checked:false,isStop:true,isStart:false,name: '下午下班音乐提示',type: '广播1',number: '10个',time: '2018.02.03~2018.03.11',executetime: '18:00:00~18:10:00',repetition:'是'},
                    {id:2,checked:false,isStop:true,isStart:false,name: '上班提示',type: '广播2',number: '10个',time: '2018.02.03~2018.03.11',executetime: '18:00:00~18:10:00',repetition:'是'},
                    {id:3,checked:false,isStop:true,isStart:false,name: '午间休息',type: '广播3',number: '10个',time: '2018.02.03~2018.03.11',executetime: '18:00:00~18:10:00',repetition:'否'},
                    {id:8,checked:false,isStop:true,isStart:false,name: '早操',type: '广播4',number: '10个',time: '2018.02.03~2018.03.11',executetime: '18:00:00~18:10:00',repetition:'否'},
                    {id:9,checked:false,isStop:true,isStart:false,name: '娱乐时间',type: '广播5',number: '10个',time: '2018.02.03~2018.03.11',executetime: '18:00:00~18:10:00',repetition:'是'},
                ],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                title: '',
                // isStart:false,
                // isStop:true,
                selection:[]
            }
        },
        methods: {
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },
            showPersonDetail (info,title) {
                console.log(info.id)
                if (this.choseInfoId.includes(info.id)) {
                    if(this.choseInfoId.length > 1){
                        this.$message.warning('至多选择一条数据')
                    }else{
                        this.areaInfo = info
                        this.visible = true
                        this.title = title
                        this.isDisabled = true
                    }
                }else {
                    if(this.choseChecked.length == 0){
                        this.choseInfoId.push(info.id)
                        if(this.choseInfoId.length > 1){
                            this.$message.warning('至多选择一条数据')
                        }else{
                            this.areaInfo = info
                            this.visible = true
                            this.title = title
                            this.isDisabled = true
                        }
                        this.choseInfoId = []
                    }else {
                        this.$message.warning('选择的数据和即将编辑的数据不一致，或者未选择包编辑的数据')
                    }
                }

            },
            addNewInfo () {
                this.showPersonDetail({}, '添加广播播放')
                this.isDisabled = false
            },
            delet(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //  api.camera.deleteCamera(this.choseInfoId).then(res => {
                    for (let i = 0; i < this.choseInfoId.length; i++) {
                        this.areaList = this.areaList.filter((item, index) => {
                            if (item.id === this.choseInfoId[i]) {
                                this.areaList[index].checked = false
                            }
                            return item.id !== this.choseInfoId[i]
                        })
                    }
                    this.$message.success('删除成功')
                    this.choseInfoId = []
                    this.choseChecked = []
                    // }).catch(err=>{
                    //             console.log(err)
                    //             this.$message.error('删除失败，请稍后重试')
                }).catch(() => {
                    this.$message.info('取消删除')
                })
                //   })
            },
            deletInfo (id) {
                console.log(id)
                console.log(this.choseInfoId)
                console.log(this.choseInfoId.includes(id))
                if (id === undefined) {
                    if(this.choseChecked.length>0){
                        this.delet(id)
                    }else {
                        this.$message.warning('请选择要删除的数据')
                    }
                }else{
                    if(this.choseInfoId.includes(id)){
                        if(this.choseInfoId.length > 1){
                            this.$message.warning('至多选择一条数据')
                        }else {
                            this.delet(id)
                        }
                    }else{
                        if(this.choseChecked.length == 0) {
                            this.choseInfoId.push(id)
                            if(this.choseInfoId.length > 1){
                                this.$message.warning('至多选择一条数据')
                            }else{
                                this.delet(id)
                            }
                        }else {
                            this.choseInfoId.push(id)
                            if(this.choseInfoId.length == 1){
                                this.delet(id)
                            }else{
                                this.$message.warning('选择的数据和即将编辑的数据不一致，或者未选择包编辑的数据')
                                let index = this.choseInfoId.indexOf(id);
                                this.choseInfoId.splice(index,1)
                            }
                        }
                    }
                }
            },
            checked (Info) {
                //选中状态change
                console.log(Info.id)
                this.areaList = this.areaList.filter(item =>{
                    if(item.id ===Info.id){
                        item.checked = item.checked
                    }
                    return item
                })
                if(this.choseInfoId.includes(Info.id)){
                    let index = this.choseInfoId.indexOf(Info.id);
                    this.choseInfoId = this.choseInfoId.filter((item)=>{
                        return item!== Info.id
                    })
                    this.choseChecked.splice(index,1);
                }else{
                    this.choseInfoId.push(Info.id)
                    this.choseChecked.push(Info.checked)
                }

                console.log(this.choseInfoId)
                console.log(this.choseChecked)
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.areaList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.areaList.filter((item,index) => {
                        if (type.includes(item.type)){
                            item.status = true
                        } else if(!type.includes(item.type)){
                            item.status = false
                            console.log(item.type, 'p[p[p[');
                        }
                        return item.status === true
                    })
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.choseList = this.areaList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfoId.push(item.id)
                        this.choseChecked.push(item.checked)
                        return
                    } else {
                        console.log('进入这个判断吗')
                        item.checked = false
                        this.choseInfoId = []
                        this.choseChecked = []
                        return
                    }
                })
                console.log(this.choseInfoId, 'opopop')
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
            fixedInfo (id) {
                console.log(id)
                if (this.choseInfoId.includes(id)) {
                    if(this.choseInfoId.length > 1){
                        this.$message.warning('至多选择一条数据')
                    }else{
                        this.areaList.map((item)=>{
                            if(item.id === this.choseInfoId[0]){
                                this.areaInfo=item
                            }
                        })
                        this.showPersonDetail(this.areaInfo,'修改摄像头信息')
                        this.isDisabled=false
                    }
                }else {
                    if(this.choseChecked.length == 0){
                        this.choseInfoId.push(id)
                        if(this.choseInfoId.length > 1){
                            this.$message.warning('至多选择一条数据')
                        }else{
                            this.areaList.map((item)=>{
                                if(item.id === this.choseInfoId[0]){
                                    this.areaInfo=item
                                }
                            })
                            this.showPersonDetail(this.areaInfo,'修改摄像头信息')
                            this.isDisabled=false
                        }
                        this.choseInfoId = []
                    }else {
                        this.$message.warning('选择的数据和即将编辑的数据不一致，或者未选择包编辑的数据')
                    }
                }
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
            for (let i = 0; i < this.areaList.length; i++) {
                this.areaList[i].checked = false
                this.areaList[i].status = true
            }
            this.choseList = this.areaList
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
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
