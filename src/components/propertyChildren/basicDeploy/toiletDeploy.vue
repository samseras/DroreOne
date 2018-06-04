<template>
    <div class="toiletDeploy">
        <div class="title">
            卫生间信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        :choseId="choseInfoId"
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @getAllToilet="getAllToilet">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowToiletCard"
                        ref="multipleTable"
                        :data="toiletList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="名称"
                            width="140">
                            <template slot-scope="scope">
                                <span class="overflow">{{scope.row.toiletBean.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="200"
                            label="所属片区">
                            <template slot-scope="scope">
                                <span class="overflow">{{scope.row.regionName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '卫生间信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">编辑</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in toiletList" v-if="isShowToiletCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '卫生间信息',true)">
                            <!--<img src="../../../../static/img/toiletCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.toiletBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.state}}</span></p>
                            <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<span>{{item.location}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="toiletInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewToilet">
                </PersonDetail>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    import api from '@/api'
    import _ from 'lodash'
    export default {
        name: "toilet-deploy",
        data(){
            return{
                selectFlag:false,
                tempSelects:[],
                isShowToiletCard: true,
                checkList: [],
                filterList: [],
                toiletList: [],
                visible: false,
                toiletInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                pageNum: 1
            }
        },
        methods: {
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/toiletCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllToilet()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                console.log(this.checkList)
                if (info.trim() !== '') {
                    this.toiletList = this.checkList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        if (item.toiletBean.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllToilet()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info, title,state) {
                this.toiletInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({toiletBean:{}}, '添加卫生间信息',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //alert(choseInfoId)
                        api.toilet.deleteToilet(this.choseInfoId).then(res => {

                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.toiletList = this.toiletList.filter((item, index) => {
                            //         if (item.toiletBean.id === this.choseInfoId[i]){
                            //             this.toiletList[index].checked = false
                            //         }
                            //         return item.toiletBean.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllToilet()
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllToilet()
                        }).catch(err => {
                            console.log('删除失败')
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的卫生间信息')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowToiletCard = false
                }else {
                    this.isShowToiletCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.toiletList = this.toiletList.filter(item => {
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
                let that=this;
                this.toiletList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.toiletList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.toiletList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.toiletList.filter((item,index) => {
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
                this.toiletList = this.toiletList.filter((item) => {
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
                this.selectFlag=true
                console.log(this.choseInfoId, 'opopop')
            },
            async fixInfo (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                //alert(typeof info.location)
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let toiletObj = {
                    description:info.description,
                    id: info.toiletBean.id,
                    name: info.toiletBean.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        toiletObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    toiletObj.pictureId = info.pictureId
                }
                await api.toilet.updateToilet(JSON.stringify(toiletObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllToilet()
                }).catch(err => {
                    console.log(err, '修改失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
           async addNewToilet (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let toiletObj = {
                    description:info.description,
                    name: info.toiletBean.name,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
               if (info.imgUrl !== '') {
                   await api.person.updataAva(info.imgUrl).then(res => {
                       console.log(res, '上传成功')
                       toiletObj.pictureId = res.id
                   }).catch(err => {
                       console.log(err, '上传失败')
                       this.$message.error('上传失败，其请稍后重试')
                       return
                   })
               }
               await api.toilet.createToilet(JSON.stringify(toiletObj)).then(res => {
                   this.closeDialog()
                    console.log(res, '添加成功')
                    this.$message.success('创建成功')
                    this.getAllToilet()
                }).catch(err => {
                    this.$message.error('创建失败，请稍后重试')
                })

            },
            fixedInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.toiletList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.toiletInfo = item
                        }
                    })
                    this.showPersonDetail(this.toiletInfo, '修改卫生间信息',false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllToilet ()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllToilet ()
            },

            async getAllToilet () {
                this.isShowLoading = true
                await api.toilet.getAllToilet().then(res => {
                    console.log(res, '这是请求回来的所有')
                    this.listLength = res.length
                    this.isShowLoading = false
                    this.toiletList = res
                    this.toiletList = this.toiletList.filter((item,index) =>{
                        if(index < (this.pageNum*35)&& index>(this.pageNum-1)*35 -1){
                            return item
                        }
                    })


                    for (let i = 0; i < this.toiletList.length; i++) {
                        this.toiletList[i].checked = false
                        this.toiletList[i].status = true
                        this.toiletList[i].location = `${this.toiletList[i].longitude},${this.toiletList[i].latitude}`
                        this.toiletList[i].id = this.toiletList[i].toiletBean.id
                        this.toiletList[i].description = this.toiletList[i].toiletBean.description
                        this.toiletList[i].state = '正常'
                        this.toiletList[i].toiletBean.modifyTime=this.toiletList[i].toiletBean.modifyTime.replace("-","/")
                        this.toiletList[i].byTime = -(new Date(this.toiletList[i].toiletBean.modifyTime)).getTime()
                    }

                    console.log(this.toiletList)
                    this.toiletList = _.sortBy(this.toiletList, 'byTime')
                    this.checkList = this.toiletList
                    this.choseInfoId = []

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
            // for (let i = 0; i < this.toiletList.length; i++) {
            //     this.toiletList[i].checked = false
            //     this.toiletList[i].status = true
            // }
            // this.choseList = this.toiletList
            this.getAllToilet()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .toiletDeploy{
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
                            top: rem(0);
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

                        }
                        span{
                            display: inline-block;
                            width: rem(100);
                            float: right;
                            text-align: right;
                            padding-right: rem(5);
                            line-height: rem(20);
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            box-sizing: border-box;
                        }
                    }
                    .specificInfo{
                        margin-top: rem(10);
                        font-size: rem(12);
                        p{
                            margin-left: rem(10);
                            line-height: rem(22);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                .handle {
                    span{
                        cursor: pointer;
                    }

                }
            }
        }
        .overflow {
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            display:inline-block;
        }
    }

</style>
