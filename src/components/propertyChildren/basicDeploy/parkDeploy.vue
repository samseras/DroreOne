<template>
    <div class="parkDeploy">
        <div class="title">
            停车场信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @getAllPark="getAllPark">

                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowParkCard && !show"
                        ref="multipleTable"
                        :data="parkList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="parkingBean.name"
                            label="名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            width="140"
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.parkingBean.type | typeFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="140"
                            prop="parkingBean.state"
                            label="状态">
                        </el-table-column>

                        <!--<el-table-column
                            width="100"
                            prop="parkingBean.surplusNum"
                            label="空余车位">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="parkingBean.capacity"
                            label="车位总数">
                        </el-table-column>-->

                        <el-table-column
                            prop="location"
                            width="700"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="200"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showParkDetail(scope.row, '停车场信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in parkList" v-if="isShowParkCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showParkDetail(item, '停车场信息',true)">
                            <!--<img src="../../../../static/img/parkCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.parkingBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.parkingBean.state}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.parkingBean.description}}</span></p>
                            <!-- <p class="idNum">空余车位：<span>{{item.parkingBean.surplusNum}}</span></p>
                             <p class="phoneNum">车位总数：<span>{{item.parkingBean.capacity}}</span></p>-->
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="parkInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewPark">
                </PersonDetail>
                <allDotMap v-if="allDotvisible"
                           :visible="allDotvisible"
                           :Info="allDotList"
                           :title="title"
                           @iconfixInfo="iconfixInfo"
                           @iconListfixInfo="iconListfixInfo"
                           @closeInfoDialog ="closeDialog">
                </allDotMap>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import allDotMap from '@/components/allDotMap'
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    import api from '@/api'
    import _ from 'lodash'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "park-deploy",
        data(){
            return{
                allParkList: [],
                selectFlag:false,
                tempSelects:[],
                isShowParkCard: true,
                checkList: [],
                filterList: [],
                parkList: [],
                visible: false,
                parkInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
                choseId:[],
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                },
                filterCondition: '',
                typeContent: []
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM', 'CURRENT_NUM']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/parkCard.png'
                } else {
                    return url
                }
            },
            iconListfixInfo(infoList){
                infoList.forEach(obj=>{
                    obj.location=[obj.longitude,obj.latitude]
                    this.iconfixInfo(obj,obj.location)
                })
            },
            async iconfixInfo(info,index){
                let scenicObj = {
                    description:info.description,
                    id: info.parkingBean.id,
                    name: info.parkingBean.name,
                    type: info.parkingBean.type,
                    regionId: info.regionId,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }
                await api.park.updatePark(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
            },
            closeDialog () {
                this.visible = false
                this.allDotvisible=false
                this.getAllPark()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                this.filterCondition = info
                if (info.trim() !== '') {
                    if (this.typeContent.length > 0) {
                        this.allParkList = this.filterTypeList(this.allParkList)
                    }
                    let checkList = this.allParkList.filter(item => {
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        if (item.parkingBean.name.includes(info)) {
                            return item
                        }
                    })
                    let date = new Date().getTime()
                    let obj = {totalNum: checkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.parkList = checkList.filter((item,index) =>{
                        if(index <(this.getCurrentNum*35) && index>(this.getCurrentNum-1)*35-1){
                            return item
                        }
                    })
                } else {
                    this.getAllPark()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showParkDetail (info, title,state) {
                this.parkInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            allDotInfo(){
                this.allDotvisible = true
                this.title = '停车场批量打点'
            },
            addNewInfo () {
                this.showParkDetail({parkingBean:{}},'添加停车场信息',false)
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0){
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.park.deletePark(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.parkList = this.parkList.filter((item, index) => {
                            //         if (item.id === this.parkList[i]){
                            //             this.parkList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllPark()
                            this.choseInfoId = []
                            this.getAllPark()
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的停车场数据')
                }

            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowParkCard = false
                }else {
                    this.isShowParkCard = true
                }
            },
            checked (id) {
                this.tempSelects=[];
                this.parkList = this.parkList.filter(item => {
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
                this.parkList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.parkList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                this.typeContent = type
                if (type.length === 0){
                    this.getAllPark()
                } else {
                    if (this.filterCondition.trim() !== '') {
                        this.allParkList = this.filterDataList(this.allParkList)
                    }
                    this.checkList = this.allParkList.filter((item,index) => {
                        if (item.parkingBean.type === 0) {
                            item.type = '室外'
                        } else{
                            item.type = '室内'
                        }
                        if (type.includes(item.type)){
                            item.status = true
                        } else if(!type.includes(item.type)){
                            item.status = false
                        }
                        return item.status === true
                    })
                }
                let date = new Date().getTime()
                let obj = {totalNum: this.checkList.length}
                obj[date] = new Date().getTime()
                this.$store.commit('TOTAL_NUM', obj)
                this.parkList = this.checkList.filter((item,index) => {
                    if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                        return item
                    }
                })
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.parkList = this.parkList.filter((item) => {
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
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let parkObj = {
                    description:info.description,
                    id: info.parkingBean.id,
                    name: info.parkingBean.name,
                    //capacity: info.parkingBean.capacity,
                    type: info.parkingBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        parkObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    parkObj.pictureId = info.pictureId
                }
                await api.park.updatePark(JSON.stringify(parkObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '修改停车场成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllPark()
                }).catch(err => {
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewPark (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let parkObj = {
                    description:info.description,
                    name: info.parkingBean.name,
                    //capacity: info.parkingBean.capacity,
                    type: info.parkingBean.type,
                    regionId: info.regionId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        parkObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.park.createPark(JSON.stringify(parkObj)).then(res => {
                    this.closeDialog()
                    console.log(res, '创建停车场成功')
                    this.$message.success('创建成功')
                    this.getAllPark()
                }).catch(err => {
                    this.$message.error('创建失败，请稍后重试')
                })
            },
            fixedInfo (id) {
                if (id){
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.parkList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.parkInfo = item
                        }
                    })
                    this.showParkDetail(this.parkInfo, '修改停车场信息',false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            async getAllPark () {
                this.isShowLoading = true
                await api.park.getAllPark().then(res => {
                    console.log(res, '这是数据')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allParkList = res

                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    for (let i = 0; i < res.length; i++) {
                        res[i].id = res[i].parkingBean.id
                        res[i].iconName = res[i].parkingBean.name
                        res[i].iconSubtype = 'park'
                        res[i].iconUrl = '/static/img/icon/park.png'
                        res[i].iconType = '停车场'
                        if(res[i].longitude==null&&res[i].latitude==null){
                            this.allDotList.close.push(res[i])
                        }else {
                            this.allDotList.open.push(res[i])
                        }
                    }

                    for (let i = 0; i < this.allParkList.length; i++) {
                        this.allParkList[i].checked = false
                        this.allParkList[i].status = true
                        this.allParkList[i].id = this.allParkList[i].parkingBean.id
                        this.allParkList[i].description = this.allParkList[i].parkingBean.description
                        this.allParkList[i].parkingBean.currentNum = this.currentNum
                        this.allParkList[i].parkingBean.surplusNum = this.allParkList[i].parkingBean.capacity - this.allParkList[i].parkingBean.currentNum
                        this.allParkList[i].location = `${this.allParkList[i].longitude},${this.allParkList[i].latitude}`
                        if (this.allParkList[i].parkingBean.capacity == 0 ){
                            this.allParkList[i].parkingBean.state = '已满'
                        } else {
                            let parcent = this.allParkList[i].parkingBean.currentNum/this.allParkList[i].parkingBean.capacity
                            if (parcent < .5){
                                this.allParkList[i].parkingBean.state = '充裕'
                            } else if (parcent < .9){
                                this.allParkList[i].parkingBean.state = '紧张'
                            } else {
                                this.allParkList[i].parkingBean.state = '已满'
                            }
                        }
                        this.allParkList[i].parkingBean.modifyTime=this.allParkList[i].parkingBean.modifyTime.replace("-","/")
                        this.allParkList[i].byTime = -(new Date(this.allParkList[i].parkingBean.modifyTime)).getTime()
                    }
                    this.allParkList = _.sortBy(this.allParkList, 'byTime')
                    if (this.filterCondition.trim() !== '') {
                        this.allParkList = this.filterDataList(this.allParkList)
                    }
                    if (this.typeContent.length > 0) {
                        this.allParkList = this.filterTypeList(this.allParkList)
                    }
                    let date = new Date().getTime()
                    let obj = {totalNum: this.allParkList.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    this.parkList = this.allParkList.filter((item,index) =>{
                        if(index <(this.getCurrentNum*35) && index>(this.getCurrentNum-1)*35-1){
                            return item
                        }
                    })
                    this.checkList = this.parkList
                    this.choseInfoId = []

                    this.selectFlag=false

                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            },
            filterTypeList (list) {
                let type = this.typeContent
                list = list.filter((item,index) => {
                    if (item.parkingBean.type === 0) {
                        item.type = '室外'
                    } else{
                        item.type = '室内'
                    }
                    if (type.includes(item.type)){
                        item.status = true
                    } else if(!type.includes(item.type)){
                        item.status = false
                    }
                    return item.status === true
                })
                return list
            },
            filterDataList (list) {
                list = list.filter(item => {
                    if ((item.regionName)&&(item.regionName.includes(this.filterCondition))) {
                        return item
                    }
                    if (item.parkingBean.name.includes(this.filterCondition)) {
                        return item
                    }
                })
                return list
            }
        },
        created () {
            this.getAllPark()
        },
        filters: {
            typeFilter (item) {
                if (item && item == 0) {
                    return '室外'
                } else {
                    return '室内'
                }
            }
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail,
            allDotMap
        },
        watch: {
            getCurrentNum () {
                this.getAllPark()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .parkDeploy {
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .parkDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .parkDeploy{
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
                            float: right;
                            margin-right: rem(5);
                            margin-top: rem(3);
                            width: rem(15);
                            height: rem(15);
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
                .tip{
                    width:100%;
                    height:rem(40);
                    text-align: center;
                    color: #909399;
                    line-height: rem(40);
                }
                .handle {
                    span{
                        cursor: pointer;
                    }

                }
            }
        }
    }

</style>
