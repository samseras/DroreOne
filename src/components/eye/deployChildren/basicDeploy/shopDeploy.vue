<template>
    <div class="shopDeploy">
        <div class="title">
            商圈信息
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
                        v-if="!isShowShopCard"
                        ref="multipleTable"
                        :data="shopList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            width="55">
                            <template slot-scope="scope">
                                <!--<input type="checkbox" :checked='scope.row.checked' class="checkBoxBtn" @change="checked(scope.row.id)">-->
                                <el-checkbox v-model="scope.row.checked" @change="getChecked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="capacity"
                            label="容量">
                        </el-table-column>
                        <el-table-column
                            prop="nowPeopleNum"
                            label="当前人数">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            prop="area"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '商圈信息')">编辑</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in shopList" v-if="isShowShopCard && item.status">
                        <div class="checkBox">
                            <!--<input type="checkbox" :checked='item.checked' class="checkBtn" @change="checked(item.id)">-->
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showPersonDetail(item, '商圈信息')">
                            <img src="" alt="">
                            <span class="type">
                                  {{item.businessBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.businessBean.state}}</span></p>
                            <p class="idNum">当前人数：<span>{{item.businessBean.currentNum}}</span></p>
                            <p class="phoneNum">最大容量：<span>{{item.businessBean.capacity}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="shopInfo"
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
    import Header from './funHeader'
    import PersonDetail from './detailDialog'
    import api from '@/api'
    export default {
        name: "shop-deploy",
        data () {
            return {
                isShowShopCard: true,
                checkList: [],
                filterList: [],
                shopList: [],
                visible: false,
                shopInfo: {},
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title) {
                this.shopInfo = info
                this.visible = true
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({businessBean:{}}, '添加商圈信息')
                this.isDisabled = false
            },
            deletInfo () {
                if (this.choseInfoId.length > 0) {
                    api.shop.deleteShop(this.choseInfoId).then(res => {
                        console.log(res, '删除成功')
                        for (let i = 0; i < this.choseInfoId.length; i++) {
                            this.shopList = this.shopList.filter((item, index) => {
                                if (item.id === this.choseInfoId[i]){
                                    this.choseList[index].checked = false
                                }
                                return item.id !== this.choseInfoId[i]
                            })
                        }
                        this.$message.success('删除成功')
                        this.choseInfoId = []
                    }).catch(err => {
                        console.log(err)
                        this.$message.error('删除失败，请稍后重试')
                    })
                } else {
                    this.$message.error('请选择要删除的选项')
                }
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowShopCard = false
                }else {
                    this.isShowShopCard = true
                }
            },
            checked (id) {
                this.shopList = this.shopList.filter(item => {
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
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.shopList = this.shopList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.shopList = this.shopList.filter((item,index) => {
                        if (type.includes(item.businessTypeName)){
                            item.status = true
                        } else if(!type.includes(item.businessTypeName)){
                            item.status = false
                        }
                        return item
                    })
                }
            },
            selectedAll (state) {
                console.log(state, 'opopopopop')
                this.shopList = this.shopList.filter((item) => {
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
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let shopObj = {
                    id: info.businessBean.id,
                    name: info.businessBean.name,
                    capacity: info.businessBean.capacity,
                    currentNum: info.businessBean.currentNum,
                    regionId: info.regionId,
                    picAddress: info.imgUrl,
                    businessTypeId: info.businessBean.businessTypeId,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(shopObj, 'this is trashObj')
                api.shop.updateShop(JSON.stringify(shopObj)).then(res => {
                    console.log('修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllShop()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            addNewPerson (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let latitude = info.location.substring(0, index)
                let longitude = info.location.substring(index + 1)
                let shopObj = {
                    name: info.businessBean.name,
                    capacity: info.businessBean.capacity,
                    currentNum: info.businessBean.currentNum,
                    regionId: info.regionId,
                    picAddress: info.imgUrl,
                    businessTypeId: info.businessBean.businessTypeId,
                    latitude: latitude,
                    longitude: longitude
                }
                console.log(shopObj, 'this is trashObj')
                api.shop.createShop(JSON.stringify(shopObj)).then(res => {
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllShop()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo () {
                if (this.choseInfoId.length > 0) {
                    this.shopList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.shopInfo = item
                        }
                    })
                    this.showPersonDetail(this.shopInfo, '修改商圈信息')
                    this.isDisabled = false
                } else {
                    this.$message.error('请选择要修改的商铺')
                }
            },
            async getAllShop () {
                this.isShowLoading = true
                await api.shop.getAllShop().then(res => {
                    console.log(res, '这是所有商铺')
                    this.isShowLoading = false
                    this.shopList = res
                    for (let i = 0; i < this.shopList.length; i++) {
                        this.shopList[i].checked = false
                        this.shopList[i].status = true
                        this.shopList[i].id = this.shopList[i].businessBean.id
                        this.shopList[i].location = `${this.shopList[i].latitude},${this.shopList[i].longitude}`
                    }
                }).catch(err => {
                    console.log(err)
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllShop()
        },
        components: {
            ScrollContainer,
            Header,
            PersonDetail
        }

    }
</script>

<style lang="scss" scoped type="text/scss">
    .shopDeploy{
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
