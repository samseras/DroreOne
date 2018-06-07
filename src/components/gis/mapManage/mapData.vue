<template>
    <div class="mapData">
        <div>
            <div class="title">
                地图列表
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
                                label="地图名称">
                            </el-table-column>
                            <el-table-column
                                prop="height"
                                label="地图高度">
                            </el-table-column>
                            <el-table-column
                                prop="width"
                                label="地图宽度">
                            </el-table-column>
                            <el-table-column
                                prop="level"
                                label="地图层级 ">
                            </el-table-column>

                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <span @click="fixedMap(scope.row.id,'编辑地图')" class="edit">编辑地图</span> |
                                    <span @click="fixedInfo(scope.row.id,'编辑')" class="edit">编辑</span> |
                                    <span @click="deletInfo(scope.row.id,'删除')">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </ScrollContainer>
                    <ShowMapDialog v-if="mapVisible"
                                   :visible="mapVisible"
                                   @closeInfoDialog ="mapVisible = false">
                    </ShowMapDialog>
                    <MapdetailDialog v-if="visible"
                                  :visible="visible"
                                  :isDisabled="isDisabled"
                                  @closeInfoDialog ="visible = false"
                                  :title = "title"
                                     :Info="areaInfo"
                                     @fixInfo="fixInfo">
                    </MapdetailDialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import MapdetailDialog from '@/components/gis/mapdetailDialog'
    import ShowMapDialog from '@/components/gis/showMapDialog'
    import Header from '@/components/gis/mapHeader'

    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                mapVisible:false,
                checkList: [],
                filterList: [],
                areaList: [
                    {id:1,type: '西溪湿地',name: '西溪湿地',height:'38734',width:'1102',level:'5',description :'',
                        firstLetter:'',imgSrc:'',webSrc:'',version:'',level:'',zoom:'',initLevel:'',allSrc:'',mapType:'',
                        eyeSrc:'',netData:'',dHeight:'',dWidth:''
                    },
                ],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                btnDisabled:true,
                title:'',
                selection:[]
            }
        },
        methods: {
            handleSelectionChange(selection) {
                this.choseInfoId = selection.map(item => {
                    return item.id
                })
            },

            init(){
                this.areaList.forEach(function(item){
                })
            },

            showPersonDetail (info,title,state) {
                this.areaInfo = info;
                this.visible = true;
                this.title = title;
                this.isDisabled = state;
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加地图主数据',false)
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
            checked (Info) {
                //选中状态change
                console.log(Info)
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
                console.log(this.choseList)
                console.log(this.areaList)
                this.areaList = this.areaList.filter((item) => {
                    if (state === true) {
                        item.checked = true
                        this.choseInfoId.push(item.id)
                        this.choseChecked.push(item.checked)
                        return item.checked === true
                    } else {
                        item.checked = false
                        this.choseInfoId = []
                        this.choseChecked = []
                        return item.checked === false
                    }
                })
            },
            fixInfo (info) {
                console.log(info, 'wertyuio')
                console.log(this.areaList, 'wertyuio')
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
                // console.log(this.choseInfoId)
                console.log(id);
                console.log(this.areaList);
                console.log(this.choseId);
                this.choseId.push(id);
                this.areaList.map((item)=>{
                    if(item.id === this.choseId[0]){
                        this.areaInfo=item;

                        this.showPersonDetail(this.areaInfo,title)
                        this.isDisabled=false
                        this.choseId = [];
                    }
                })
            },
            fixedMap(id,title){
                this.mapVisible = true;
                this.btnDisabled = false;
            },
            stop(Info){
                Info.isStart = true;
                Info.isStop = false;
            },
            start(Info){
                Info.isStart = false;
                Info.isStop = true;
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
            MapdetailDialog,
            ShowMapDialog,
            Header
        },
        mounted:function(){
            // this.getBroadcastList()
            this.init();
            console.log(this.areaList)
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .mapData{
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
                span:hover{
                    color: #54c5f2;
                    cursor:pointer;
                }
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
