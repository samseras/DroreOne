<template>
    <div class="boatCars">
        <div class="title">
            车船信息
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <Header @addNewInfo = "addNewInfo"
                        @deletInfo = "deletInfo"
                        @toggleList = "toggleList"
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @getAllBoat="getAllBoat">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowBoatCard && !show"
                        ref="multipleTable"
                        :data="boatCarList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @select-all="selectAll"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55" style="display:none">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="getChecked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column

                            label="名称"
                            width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.vehicle.serialNum }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.vehicle.type | boatFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="维护状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.vehicle.maintenanceStatus | statusFilter}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="vehicle.capacity"
                            label="核载人数">
                        </el-table-column>
                        <!--<el-table-column
                            prop="driverPhone"
                            label="电话号码">
                        </el-table-column>-->
                        <el-table-column
                            prop="vehicle.model"
                            label="序列号码">
                        </el-table-column>
                        <el-table-column
                            prop="vehicle.purchaseDate"
                            label="购买时间">
                        </el-table-column>
                        <el-table-column
                            prop="vehicle.maintenanceDate"
                            label="维护时间">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <span class="formBtn" @click="showPersonDetail(scope.row, '车船信息',true)">查看</span>
                                <span class="line">|</span>
                                <span class="formBtn" @click="fixedInfo(scope.row.id)">修改</span>
                                <span class="line">|</span>
                                <span class="formBtn" @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in boatCarList" v-if="isShowBoatCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="getChecked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" :class="item.type === '车辆'? 'carInfo':''" @click.stop="showPersonDetail(item ,'车船信息',true)">
                            <img :src="getUrl(item.picturePath,item.vehicle.type)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.vehicle.serialNum}}
                            </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<span>{{item.vehicle.type | boatFilter}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.vehicle.maintenanceStatus | statusFilter}}</span></p>
                            <p class="idNum">核载人数：<span>{{item.vehicle.capacity}}</span></p>
                            <!--<p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.driverPhone}}</span></p>-->
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="boatCarInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
                              @fixInfo = "fixInfo"
                              @addNewInfo="addNewBoatCar">
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
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'boatCar-deploy',
        data () {
            return {
                allBoatCarList: [],
                selectFlag:false,
                tempSelects:[],
                isShowBoatCard: true,
                checkList: [],
                filterList: [],
                boatCarList: [],
                visible: false,
                boatCarInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                show:false,
                isShowLoading: false,
                selection: [],
                currentNum: 50,
            }
        },
        methods: {
            ...mapMutations(['TOTAL_NUM']),
            imgError (e) {
                e.target.src = this.getUrl(null,0);
            },
            getUrl (url,type) {
                if (url === null) {
                    if(type == 1){
                        return '../../../../static/img/boatPic.png'
                    }else{
                        return '../../../../static/img/carPic.png'
                    }
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false;
                this.getAllBoat()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.boatCarList = this.allBoatCarList.filter(item => {
                        /*if (item.driverName.includes(info)) {
                            return item
                        }
                        if (item.driverPhone.includes(info)) {
                            return item
                        }*/
                        if (item.vehicle.serialNum.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllBoat()
                }
            },
            handleSelectionChange (selection) {
               this.choseInfoId = selection.map(item => {
                   return item.id
               })
            },
            selectAll (selection) {
                console.log(selection,'这是全选的数据')
            },
            showPersonDetail (info, title, state) {
                this.boatCarInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({vehicle: {}},'添加车船信息', false)
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
                        api.boat.deleteBoat(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.boatCarList = this.boatCarList.filter((item, index) => {
                            //         if (item.id === this.choseInfoId[i]){
                            //             this.boatCarList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllBoat()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllBoat()
                        }).catch(err => {
                            console.log(err, '删除失败')
                            this.$message.error('删除失败，请稍后重试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的车船数据')
                }


            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowBoatCard = false
                }else {
                    this.isShowBoatCard = true
                }
            },
            getChecked (id) {
                this.tempSelects=[];
                this.boatCarList = this.boatCarList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                console.log(this.boatCarList, '车穿刺想你想')
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
                console.log(this.choseInfoId)
                let that=this;
                this.boatCarList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.boatCarList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.choseList = this.boatCarList.filter((item) => {
                        item.status = true
                        return item.status === true
                    })
                } else {
                    this.choseList = this.boatCarList.filter((item,index) => {
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
                this.boatCarList = this.boatCarList.filter((item) => {
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
                this.selectAll(this.choseInfoId)
            },
            async fixInfo (info) {
                let boatObj = {
                    description: info.vehicle.description,
                    id: info.id,
                    serialNum: info.vehicle.serialNum,
                    capacity: info.vehicle.capacity,
                    type: info.vehicle.type,
                    model: info.vehicle.model,
                    //driverId: info.driverId,
                    maintenanceStatus: info.vehicle.maintenanceStatus,
                    maintenanceDate: info.vehicle.maintenanceDate,
                    purchaseDate: info.vehicle.purchaseDate,
                    gpsDeviceId:info.vehicle.gpsDeviceId
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        boatObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    boatObj.pictureId = info.pictureId
                }
                console.log(boatObj, 'this is trashObj')
                await api.boat.updateBoat(JSON.stringify(boatObj)).then(res => {
                    this.closeDialog()
                    console.log(res ,'增加成功')
                    this.$message.success('修改成功')
                    this.getAllBoat()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('修改失败，请稍后重试')
                })
            },
            async addNewBoatCar (info) {
                let boatObj = {
                    description: info.vehicle.description,
                    serialNum: info.vehicle.serialNum,
                    capacity: info.vehicle.capacity,
                    type: info.vehicle.type,
                    model: info.vehicle.model,
                    //driverId: info.driverId,
                    maintenanceStatus: info.vehicle.maintenanceStatus,
                    maintenanceDate: info.vehicle.maintenanceDate,
                    purchaseDate: info.vehicle.purchaseDate,
                    gpsDeviceId:info.vehicle.gpsDeviceId
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        boatObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                console.log(boatObj);
                await api.boat.createBoat(JSON.stringify(boatObj)).then(res => {
                    this.closeDialog()
                    console.log(res ,'增加成功')
                    this.$message.success('添加成功')
                    this.getAllBoat()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('添加失败，请稍后重试')
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
                     this.boatCarList.map((item) => {
                         if (item.id === this.choseInfoId[0]){
                             this.boatCarInfo = item
                         }
                     })
                     this.showPersonDetail(this.boatCarInfo,'修改车船信息',false)
                     this.isDisabled = false
                     //this.choseInfoId = []
                 } else {
                     this.$message.error('请选择一条数据')
                 }
            },
            async getAllBoat (){
                this.isShowLoading = true
                await api.boat.getAllBoat().then(res => {
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.isShowLoading = false
                    this.allBoatCarList = res
                    let date = new Date().getTime()
                    let obj = {totalNum: res.length}
                    obj[date] = new Date().getTime()
                    this.$store.commit('TOTAL_NUM', obj)
                    for (let i = 0; i < this.allBoatCarList.length; i++) {
                        this.allBoatCarList[i].checked = false
                        this.allBoatCarList[i].status = true
                        this.allBoatCarList[i].id = this.allBoatCarList[i].vehicle.id
                        this.allBoatCarList[i].description = this.allBoatCarList[i].vehicle.description
                        this.allBoatCarList[i].vehicle.modifyTime=this.allBoatCarList[i].vehicle.modifyTime.replace("-","/")
                        this.allBoatCarList[i].byTime = -(new Date(this.allBoatCarList[i].vehicle.modifyTime)).getTime()
                    }
                    this.allBoatCarList = _.sortBy(this.allBoatCarList,'byTime')
                    this.boatCarList = this.allBoatCarList.filter((item,index) => {
                        if (index < (this.getCurrentNum * 35 ) && index > ((this.getCurrentNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })
                    console.log(this.boatCarList);
                    this.checkList = this.boatCarList
                    this.choseInfoId = []
                    /*if(this.boatCarList.length=== 0){*/
                        this.selectFlag=false
                    /*}*/
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            }
        },
        filters: {
            boatFilter (type) {
                if (type == 0) {
                    return '车辆'
                } else {
                    return '船只'
                }
            },
            statusFilter (item) {
                if (item == 0) {
                    return "正常"
                } else {
                    return "异常"
                }
            }
        },
        created () {
            this.getAllBoat()
        },
        components:{
            ScrollContainer,
            Header,
            PersonDetail
        },
        watch: {
            getCurrentNum () {
                this.getAllBoat()
            }
        },
        computed: {
            ...mapGetters(['getCurrentNum'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .boatCars .el-table__header-wrapper{
        font-size: rem(14);
        font-weight: normal;
    }
    .boatCars .el-table__body-wrapper,.boatCars .is-scrolling-none{
        font-size: rem(14);
    }
    .boatCars {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }

</style>
<style lang="scss" scoped type="text/scss">
    .boatCars{
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
                        .checkBtn {
                            float: right;
                            margin-right: rem(5);
                            /*margin-top: rem(3);*/
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
                            background: red;
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
                    .specificInfo {
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
            }
        }
        .checkBoxBtn{
            width: rem(15);
            height: rem(15);
            margin-top: rem(5);
        }
        .formBtn{
            cursor: pointer;
            font-size: rem(13);
        }
    }
</style>
