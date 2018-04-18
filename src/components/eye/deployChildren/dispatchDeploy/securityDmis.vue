<template>
    <div class="areaDeploy">
        <div class="title">
            巡更路线        </div>
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
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="调度人员"
                            sortable
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="人员数量">
                        </el-table-column>
                        <el-table-column
                            prop="classes"
                            label="班次">
                        </el-table-column>
                        <el-table-column
                            prop="line"
                            label="线路"
                            width="500">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row,'片区信息')">编辑</span> |
                                <span @click="stop(scope.row,'片区信息')" v-show="isStop">停止 |</span>
                                <span @click="start(scope.row,'片区信息')" v-show="isStart">开始 |</span>
                                <span @click="showPersonDetail(scope.row,'片区信息')">查看</span> |
                                <span @click="delet(scope.row,'片区信息')">删除</span>
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
                    {id:1,checked:false,name: '长江~黄河巡更',type: '售票',classes: '早班，午班，晚班',number: '10个',line: '起点（123，12312）、中间（123，12312）、终点（123，12312）'},
                    {id:2,checked:false,name: '长江~黄河巡更',type: '安保',classes: '早班，午班，晚班',number: '10个',line: '起点（123，12312）、中间（123，12312）、终点（123，12312）'},
                    {id:3,checked:false,name: '长江~黄河巡更',type: '保洁',classes: '早班，午班，晚班',number: '10个',line: '起点（123，12312）、中间（123，12312）、终点（123，12312）'},
                    {id:8,checked:false,name: '长江~黄河巡更',type: '售票',classes: '早班，午班，晚班',number: '10个',line: '起点（123，12312）、中间（123，12312）、终点（123，12312）'},
                    {id:9,checked:false,name: '长江~黄河巡更',type: '检票',classes: '早班，午班，晚班',number: '10个',line: '起点（123，12312）、中间（123，12312）、终点（123，12312）'},
                ],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
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
            },
            showPersonDetail (info,title) {
                this.areaInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加人员调度')
                this.isDisabled = false
            },
            deletInfo () {
                if(this.choseInfoId.length>0){
                    for (let i = 0; i < this.choseInfoId.length; i++) {
                        this.areaList = this.areaList.filter((item, index) => {
                            if (item.id === this.choseInfoId[i]){
                                this.choseList[index].checked = false
                            }
                            return item.id !== this.choseInfoId[i]
                        })
                    }
                    this.choseList = this.areaList
                }
            else {
                    this.$message.error('请选择要删除的人员')
                }

            },
            delet () {
                for (let i = 0; i < this.choseInfoId.length; i++) {
                    this.areaList = this.areaList.filter((item, index) => {
                        if (item.id === this.choseInfoId[i]){
                            this.choseList[index].checked = false
                        }
                        return item.id !== this.choseInfoId[i]
                    })
                }
                this.choseList = this.areaList
            },
            // toggleList (type) {
            //     if (type === 'list') {
            //         this.isShowAreaCard = false
            //     }else {
            //         this.isShowAreaCard = true
            //     }
            // },
            checked (id) {
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
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
                        return item.checked === true
                    } else {
                        console.log('进入这个判断吗')
                        item.checked = false
                        this.choseInfoId = []
                        return item.checked === false
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
                // // if (id) {
                // //     this.choseInfoId.push(id)
                // // }
                // console.log(this.choseInfoId)
                // if(this.choseInfoId.length > 1) {
                //     this.$message.warning('至多选择一条数据')
                //     return
                // }
                // if(this.choseInfoId.length>0){
                //     this.areaList.map((item)=>{
                //         if(item.id === this.choseInfoId[0]){
                //             this.areaInfo=item
                //         }
                //     })
                //     this.showPersonDetail(this.areaInfo,'修改巡更路线信息')
                //     this.isDisabled=false
                // }else{
                //     this.$message.error('请选择要修改的巡更路线')
                // }
                this.areaList.map((item) => {
                    if (item.id === this.choseInfoId[0]){
                        this.areaInfo = item
                    }
                })
                this.showPersonDetail(this.areaInfo, '修改巡更路线信息')
                this.isDisabled = false
            },
            stop(id){
                this.isStop = false;
                this.isStart = true;
            },
            start(id){
                this.isStop = true;
                this.isStart = false;
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

