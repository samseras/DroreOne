<template>
<div class="areaDeploy">
        <div class="title">
            保洁
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
                            label="调度人员"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="人员数量">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="shift"
                            label="班次">
                        </el-table-column>
                        <el-table-column
                            prop="line"
                            label="线路"
                            width="500">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id,'保洁信息编辑')">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-if="scope.row.isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-else="scope.row.isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'保洁信息')">查看</span> |
                                <span @click="deletInfo(scope.row.id,'片区信息')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--<div class="personInfo" v-for="item in choseList" v-if="isShowAreaCard && item.status">-->
                        <!--<div class="checkBox">-->
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                        <!--</div>-->
                        <!--<div class="personType" @click.stop="showPersonDetail(item, '片区信息')">-->
                            <!--<img src="" alt="">-->
                            <!--<span class="type">-->
                                  <!--{{item.name}}-->
                                <!--</span>-->
                        <!--</div>-->
                        <!--<div class="specificInfo">-->
                            <!--<p class="name">所在景区：<span>{{item.idNum}}</span></p>-->
                            <!--<p class="sex">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.phone}}</span></p>-->
                        <!--</div>-->
                    <!--</div>-->
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
                    {id:1,name: '张三',type: '保洁',number: '10个',isCustomizedDays:false,days:'1,2',startDate: '2018.02.03',endDate:'2018.03.11',isCustomizedShift:false,shifts:'1,2,3',customizedStartTime :'18:00:00',customizedEndTime:'18:30:00',isEnabled:false,description:'',cleanerIds:[],regionIds:[]},
                    {id:2,name: '李四',type: '保洁',number: '10个',isCustomizedDays:false,days:'2,3',startDate: '2018.02.03',endDate:'2018.03.11',isCustomizedShift:false,shifts:'1,3',customizedStartTime :'18:00:00',customizedEndTime:'18:30:00',isEnabled:false,description:'',cleanerIds:[],regionIds:[]},
                    {id:3,name: '王五',type: '保洁',number: '10个',isCustomizedDays:true,days:'3,4',startDate: '2018.02.03',endDate:'2018.03.11',isCustomizedShift:false,shifts:'1,2',customizedStartTime :'18:00:00',customizedEndTime:'18:30:00',isEnabled:false,description:'',cleanerIds:[],regionIds:[]},
                    {id:8,name: '刘瑜',type: '保洁',number: '10个',isCustomizedDays:true,days:'5,6',startDate: '2018.02.03',endDate:'2018.03.11',isCustomizedShift:false,shifts:'3',customizedStartTime :'18:00:00',customizedEndTime:'18:30:00',isEnabled:false,description:'',cleanerIds:[],regionIds:[]},
                ],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                title:'',
                isDisabled: true,
                isStop:true,
                isStart:false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            init(){
                this.areaList.forEach(function(item){
                    let executetime = item.customizedStartTime + "~" + item.customizedEndTime;
                    let date = item.startDate + "~" + item.endDate;
                    item.executetime = executetime;
                    item.date = date;
                    item.checked = false;
                    item.isStop = true;
                    item.isStart = false;
                    if(item.isCustomizedDays === true){
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
                    if(item.isCustomizedShift === true){
                        item.shift = item.customizedStartTime + "~" + item.customizedEndTime;
                    }else {
                        let shift = [];
                        let str = item.shifts;
                        let attr = str.split(",")
                        attr = attr.filter(function(num){
                            if(num == "1"){
                                shift.push("早班 ");
                            }else if(num == "2"){
                                shift.push("中班 ");
                            }else if(num == "3"){
                                shift.push("晚班");
                            }
                            return shift
                        })
                        item.shift = shift
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
                this.isDisabled = true;
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加人员调度')
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
            fixedInfo (id,title) {
                console.log(this.choseInfoId)
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
                        if(this.areaInfo.isCustomizedShift){
                            this.areaInfo.shift = this.timeD(item.date,item.shift);
                        }else {
                            for(let i=0; i< this.areaInfo.shift.length; i++) {
                                if (this.areaInfo.shift[i].includes(' ')){
                                    this.areaInfo.shift[i] = this.areaInfo.shift[i].substring(0,this.areaInfo.shift[i].length -1)
                                }
                            }
                        }
                        this.showPersonDetail(this.areaInfo,title)
                        this.isDisabled=false
                        this.choseId = [];
                    }
                })
            },
            stop(Info){
                console.log(this.choseInfoId)
                if(!this.choseInfoId.includes(Info.id)){
                    this.choseInfoId.push(Info.id)
                }
                if(this.choseInfoId.length == 1){
                    Info.isStart = true;
                    Info.isStop = false;
                    this.choseInfoId = []
                }else{
                    this.$message.warning('至多选择一条数据')
                }
            },
            start(Info){
                console.log(this.choseInfoId)
                if(!this.choseInfoId.includes(Info.id)){
                    this.choseInfoId.push(Info.id)
                }
                if(this.choseInfoId.length == 1){
                    Info.isStart = false;
                    Info.isStop = true;
                    this.choseInfoId = []
                }else{
                    this.$message.warning('至多选择一条数据')
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

