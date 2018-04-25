<template>
    <div class="areaDeploy">
        <div class="title">
            路灯
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
                            prop="name"
                            label="调度硬件"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
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
                            prop='executetime'
                            label="执行时间">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop="repetition"-->
                            <!--label="重复调度"-->
                            <!--sortable>-->
                        <!--</el-table-column>-->
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id,'路灯编辑')" class="edit">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showCheckDetail(scope.row,'路灯信息')">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="areaInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              :title = "title"
                              @addNewInfo="addNewPerson">
                </PersonDetail>
                <CheckDetail v-if="checkVisible"
                    :visible="checkVisible"
                    :checkInfo="areaInfo"
                    :isDisabled="isDisabled"
                    @closeInfoDialog ="checkVisible = false"
                    :title = "title"
                    @fixInfo = "fixInfo">
                </CheckDetail>


            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
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
                areaList: [
                    {id:1,type: '夜间照明',name: '路灯1',isCustomizedDays:true,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'1,2,3,4,5',lightIds:[]},
                    {id:2,type: '室内照明',name: '路灯2',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'1,2,3,4,5,',lightIds:[]},
                    {id:3,type: '夜间照明',name: '路灯3',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'1,2,3,4',lightIds:[]},
                    {id:8,type: '室内照明',name: '路灯4',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'1,5,6',lightIds:[]},
                    {id:9,type: '夜间照明',name: '路灯5',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'2,5,6',lightIds:[]},
                    {id:4,type: '室内照明',name: '路灯6',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'3,4,5',lightIds:[]},
                    {id:5,type: '夜间照明',name: '路灯7',isCustomizedDays:false,number: '10个',startDate: '2018.02.03',endDate:'2018.03.11',startTime :'18:00:00',endTime:'18:30:00',isEnabled:true,description :'',days:'1,2,4',lightIds:[]},
                ],
                checkVisible:false,
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                title:'',
                isStop:true,
                isStart:false,
                selection:[]
            }
        },
        methods: {
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
                // this.multipleSelection = val;
            },
            init(){
                this.areaList.forEach(function(item){
                    let executetime = item.startTime + "~" + item.endTime;
                    let date = item.startDate + "~" + item.endDate;
                    item.executetime = executetime;
                    item.date = date;
                    item.checked = false;
                    item.isStop = true;
                    item.isStart = false;
                    if(item.isCustomizedDays === true){
                        // let time = item.startDate + "~" + item.endDate;
                        item.time = item.startDate + "~" + item.endDate;
                    }else {
                        let shift=new Array();
                        let str = item.days;
                        let attr = str.split(",")
                        attr = attr.filter(function(num){
                            if(num == "1"){
                                shift.push("周一 ");
                            }else if(num == "2"){
                                shift.push("周二 ");
                            }else if(num == "3"){
                                shift.push("周三 ");
                            }else if(num == "4"){
                                shift.push("周四 ");
                            }else if(num == "5"){
                                shift.push("周五 ");
                            }else if(num == "6"){
                                shift.push("周六 ");
                            }else if(num == "7"){
                                shift.push("周日");
                            }
                            return shift
                        })
                        item.time = shift
                    }
                })
            },
            timeDate(dates){
                let arr = dates.split("~");
                let d1 = arr[0].split(".");
                let d2 = arr[1].split(".");
                return [new Date(d1[0], d1[1], d1[2]), new Date(d2[0], d2[1], d2[2])];
            },
            timeD(dates,times){
                let arr1 = dates.split("~");
                let arr2 = times.split("~");
                let d1 = arr1[0].split(".");
                let d2 = arr1[1].split(".");
                let a1 = arr2[0].split(":");
                let a2 = arr2[1].split(":");
                return [new Date(d1[0], d1[1], d1[2],a1[0],a1[1],a1[2]), new Date(d2[0], d2[1], d2[2],a2[0],a2[1],a2[2])];
            },
            showPersonDetail (info,title) {
                this.visible = true;
                this.title = title;
                this.isDisabled = true
            },
            showCheckDetail(info,title){
                this.areaInfo = info;
                this.checkVisible = true;
                this.title = title;
                this.isDisabled = true;
                console.log("1234567yuiol;'")
            },
            addNewInfo (title) {
                this.title = title
                this.visible = true
                console.log(info, '1111111111')
                this.showPersonDetail({}, '添加灯光照明')
                this.isDisabled = false
            },
            deletChose(id){
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
                    // }).catch(err=>{
                    //             console.log(err)
                    //             this.$message.error('删除失败，请稍后重试')
                }).catch(() => {
                    this.$message.info('取消删除')
                })
                //   })
            },
            deletInfo (id) {
                if(id === undefined){
                    if (this.choseInfoId.length > 0) {
                        this.deletChose(id)
                    }else{
                        this.$message.warning("请选择要删除的项")
                    }
                }else {
                    this.choseId.push(id);
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //  api.camera.deleteCamera(this.choseInfoId).then(res => {
                        this.areaList = this.areaList.filter((item, index) => {
                            if (item.id === this.choseId[0]) {
                                this.areaList[index].checked = false
                            }
                            return item.id !== this.choseId[0]
                        })
                        this.$message.success('删除成功')
                        this.choseId = [];
                        // }).catch(err=>{
                        //             console.log(err)
                        //             this.$message.error('删除失败，请稍后重试')
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                    //   })
                }
                console.log(this.choseId,"1234567890-=")
            },
            checked (Info) {
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
                console.log(info)
                info.id = new Date().getTime()
                this.areaList.push(info)
                this.choseList = this.areaList
            },
            fixedInfo (id,title) {
                this.choseId.push(id)
                this.areaList.map((item)=>{
                    if(item.id === this.choseId[0]){
                        this.areaInfo=item
                        if(this.areaInfo.isCustomizedDays){
                            this.areaInfo.time = this.timeDate(item.time);
                        }else {
                            for(let i=0; i< this.areaInfo.time.length; i++) {
                                if (this.areaInfo.time[i].includes(' ')){
                                    this.areaInfo.time[i] = this.areaInfo.time[i].substring(0,this.areaInfo.time[i].length -1)
                                }
                            }
                        }
                        this.areaInfo.executetime = this.timeD(item.date,item.executetime);
                        this.showPersonDetail(this.areaInfo,title)
                        this.isDisabled=false
                        this.choseId = [];
                    }
                })
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
            PersonDetail,
            CheckDetail
        },
        mounted:function(){
            this.init();
            console.log(this.areaList)
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
