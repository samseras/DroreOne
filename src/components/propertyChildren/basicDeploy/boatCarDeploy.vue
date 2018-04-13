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
                        @choseType = 'choseType'
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowBoatCard"
                        ref="multipleTable"
                        :data="boatCarList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @select-all="selectAll"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="getChecked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="driverName"
                            label="驾驶人员"
                            width="120">
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
                        <el-table-column
                            prop="driverPhone"
                            label="电话号码">
                        </el-table-column>
                        <el-table-column
                            prop="vehicle.model"
                            label="设备号码">
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
                            label="操作">
                            <template slot-scope="scope">
                                <span class="formBtn" @click="showPersonDetail(scope.row, '车船信息')">查看</span>
                                <span class="line">|</span>
                                <span class="formBtn" @click="fixedInfo(scope.row.id)">编辑</span>
                                <span class="line">|</span>
                                <span class="formBtn" @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in boatCarList" v-if="isShowBoatCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="getChecked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" :class="item.type === '车辆'? 'carInfo':''" @click.stop="showPersonDetail(item ,'车船信息')">
                            <img :src="item.picturePath" alt="">
                            <span class="type">
                                  {{item.vehicle.type | boatFilter}}信息
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">驾驶人员：<span>{{item.driverName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.vehicle.maintenanceStatus | statusFilter}}</span></p>
                            <p class="idNum">核载人数：<span>{{item.vehicle.capacity}}</span></p>
                            <p class="phoneNum">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>{{item.driverPhone}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="boatCarInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="visible = false; isDisabled = true"
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
    export default {
        name: 'boatCar-deploy',
        data () {
            return {
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
                isShowLoading: false,
                selection: []
            }
        },
        methods: {
            handleSelectionChange (selection) {
               this.choseInfoId = selection.map(item => {
                   return item.id
               })
            },
            selectAll (selection) {
                console.log(selection,'这是全选的数据')
            },
            showPersonDetail (info, title) {
                this.boatCarInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({vehicle: {}},'添加车船信息')
                this.isDisabled = false
            },
            deletInfo (id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.boat.deleteBoat(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            for (let i = 0; i < this.choseInfoId.length; i++) {
                                this.boatCarList = this.boatCarList.filter((item, index) => {
                                    if (item.id === this.choseInfoId[i]){
                                        this.boatCarList[index].checked = false
                                    }
                                    return item.id !== this.choseInfoId[i]
                                })
                            }
                            this.$message.success('删除成功')
                            this.choseInfoId = []
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
                console.log(this.choseInfoId, 'opopop')
                this.selectAll(this.choseInfoId)
            },
            fixInfo (info) {
                let boatObj = {
                    id: info.id,
                    serialNum: info.vehicle.serialNum,
                    capacity: info.vehicle.capacity,
                    type: info.vehicle.type,
                    model: info.vehicle.model,
                    driverId: info.driverId,
                    maintenanceStatus: 0,
                    maintenanceDate: info.vehicle.maintenanceDate,
                    purchaseDate: info.vehicle.purchaseDate
                }
                console.log(boatObj, 'this is trashObj')
                api.boat.updateBoat(JSON.stringify(boatObj)).then(res => {
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
                    serialNum: info.vehicle.serialNum,
                    capacity: info.vehicle.capacity,
                    type: info.vehicle.type,
                    model: info.vehicle.model,
                    driverId: info.driverId,
                    maintenanceStatus: 0,
                    maintenanceDate: info.vehicle.maintenanceDate,
                    purchaseDate: info.vehicle.purchaseDate
                }
                if (info.imgUrl !== '') {
                   await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '图片上传成功')
                        boatObj.pictureId = res.id
                       api.boat.createBoat(JSON.stringify(boatObj)).then(res => {
                           console.log(res ,'增加成功')
                           this.$message.success('添加成功')
                           this.getAllBoat()
                       }).catch(err => {
                           console.log(err, '添加失败')
                           this.$message.error('添加失败，请稍后重试')
                       })
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('添加失败，请稍后重试')
                        return false
                    })
                }
            },
            fixedInfo (id) {
                if (id) {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                }
                 if (this.choseInfoId.length > 0) {
                     this.boatCarList.map((item) => {
                         if (item.id === this.choseInfoId[0]){
                             this.boatCarInfo = item
                         }
                     })
                     this.showPersonDetail(this.boatCarInfo,'修改车船信息')
                     this.isDisabled = false
                     this.choseInfoId = []
                 } else {
                     this.$message.error('请选择要修改的车船')
                 }
            },
            async getAllBoat (){
                this.isShowLoading = true
                await api.boat.getAllBoat().then(res => {
                    this.isShowLoading = false
                    this.boatCarList = res
                    console.log(res, '这是请求回来的')
                    for (let i = 0; i < this.boatCarList.length; i++) {
                        this.boatCarList[i].checked = false
                        this.boatCarList[i].status = true
                        this.boatCarList[i].id = this.boatCarList[i].vehicle.id
                    }
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
                    return "维修"
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
        }
    }
</script>

<style lang="scss">
    .boatCars .el-table__header-wrapper{
        font-size: rem(14);
        font-weight: normal;
    }
    .boatCars .el-table__body-wrapper,.boatCars .is-scrolling-none{
        font-size: rem(14);
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
                            background: red;
                        }
                        span{
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
                        }
                    }
                    .carInfo{
                        background: #cc9755;
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
