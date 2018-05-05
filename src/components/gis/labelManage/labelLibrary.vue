<template>
    <div class="labelLibrary">
        <div class="title">
            标签库
        </div>
        <div class="personContent">
            <div class="personList">
                <ScrollContainer>
                    <el-table
                        v-if="isShowAreaCard"
                        ref="multipleTable"
                        :data="areaList"
                        tooltip-effect="dark"
                        border
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="50">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            type="index"
                            label="序号"
                            width="120">
                        </el-table-column>

                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="img"
                            label="图标">
                            <template slot-scope="scope">
                                <img  :src="scope.row.imgPath" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="imgPath"
                            label="地址">
                        </el-table-column>
                        <el-table-column
                            prop="sort"
                            label="排序">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="fixedInfo(scope.row.id,'编辑')" class="edit">编辑</span> |
                                <span @click="deletInfo(scope.row.id,'删除')">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
                <DetailDialog v-if="visible"
                              :visible="visible"
                              :Info="areaInfo"
                              :isDisabled="isDisabled"
                              @closeInfoDialog ="visible = false"
                              @fixInfo = "fixInfo"
                              :title = "title">
                </DetailDialog>

            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import DetailDialog from '@/components/gis/DetailDialog'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                checkList: [],
                filterList: [],
                areaList: [
                    {
                        id:1,
                        name: '火警探测器',
                        imgPath:'http://label.drore.com/gisLabelTabImage/public/defaults/24*24/huojingtanceqi.png',
                        options:[{
                            value: '1',
                            name: '预安装'
                        }, {
                            value: '2',
                            name: '人员'
                        }, {
                            value: '3',
                            name: '区域'
                        }, {
                            value: '4',
                            name: '绿植'
                        }, {
                            value: '5',
                            name: '设备'
                        }],
                        type:'2'
                    },
                    {
                        id:2,
                        name: '室内停车场',
                        imgPath:'http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shineitingchechang.png',
                        options:[{
                            value: '1',
                            name: '预安装'
                        }, {
                            value: '2',
                            name: '人员'
                        }, {
                            value: '3',
                            name: '区域'
                        }, {
                            value: '4',
                            name: '绿植'
                        }, {
                            value: '5',
                            name: '设备'
                        }],
                        type:'2'
                    },
                    {
                        id:3,
                        name: '室外全景',
                        imgPath:'http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shiwaiquanjing.png',
                        options:[{
                            value: '1',
                            name: '预安装'
                        }, {
                            value: '2',
                            name: '人员'
                        }, {
                            value: '3',
                            name: '区域'
                        }, {
                            value: '4',
                            name: '绿植'
                        }, {
                            value: '5',
                            name: '设备'
                        }],
                        type:'2'
                    },
                    {
                        id:8,
                        name: '室内全景',
                        imgPath:'http://label.drore.com/gisLabelTabImage/public/defaults/24*24/shineiquanjing.png',
                        options:[{
                            value: '1',
                            name: '预安装'
                        }, {
                            value: '2',
                            name: '人员'
                        }, {
                            value: '3',
                            name: '区域'
                        }, {
                            value: '4',
                            name: '绿植'
                        }, {
                            value: '5',
                            name: '设备'
                        }],
                        type:'2'
                    }
                ],
                visible: false,
                areaInfo: {},
                choseInfoId: [],
                choseId:[],
                choseChecked:[],
                choseList: [],
                isDisabled: true,
                title:'',
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

            init(){
                this.areaList.forEach(function(item){})
            },
            showPersonDetail (info,title) {
                this.areaInfo = info;
                this.visible = true;
                this.title = title;
                this.isDisabled = true;
                console.log("1234567yuiol;'")
            },
            addNewInfo () {
                this.showPersonDetail({}, '添加广播播放')
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
                console.log(this.areaList, 'xxxxx')
                let list = this.areaList
                for(let i = 0;i< list.length; i++){
                    if (info.id === list[i].id) {
                        this.areaList[i] = info
                    }
                }
                this.choseList = this.areaList
            },
            addNewPerson (info) {
                console.log('1111111')
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

        },
        components: {
            ScrollContainer,
            DetailDialog
        },
        mounted:function(){
           // this.getBroadcastList()
            this.init();
            console.log(this.areaList)
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .labelLibrary{
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
