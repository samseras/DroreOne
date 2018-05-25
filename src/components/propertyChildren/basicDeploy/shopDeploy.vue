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
                        :choseId="choseInfoId"
                        :listsLength="shopList.length"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @searchAnything="searchAnything"
                        @getAllShop="getAllShop">
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
                                <el-checkbox v-model="scope.row.checked" @change="checked(scope.row.id)" class="checkBoxBtn"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="businessBean.name"
                            label="名称"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            width="120"
                            prop="businessTypeName"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="state"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            width="100"
                            prop="businessBean.capacity"
                            label="容量">
                        </el-table-column>

                        <!--<el-table-column
                            width="100"
                            prop="businessBean.currentNum"
                            label="当前人数">
                        </el-table-column>-->

                        <el-table-column
                            prop="location"
                            label="位置">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <span @click="showPersonDetail(scope.row, '商圈信息',true )">查看</span>
                                <sapn class="line">|</sapn>
                                <span @click="fixedInfo(scope.row.id )">编辑</span>
                                <sapn class="line">|</sapn>
                                <span @click="deletInfo(scope.row.id)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="personInfo" v-for="item in shopList" v-if="isShowShopCard && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" :class="getClass(item.businessBean.businessTypeId)" @click.stop="showPersonDetail(item, '商圈信息',true)">
                            <!--<img src="../../../../static/img/businesCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.businessBean.name}}
                                </span>
                        </div>
                        <div class="specificInfo">
                            <p class="name">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.businessBean.state}}</span></p>
                            <!--<p class="idNum">当前人数：<span>{{item.businessBean.currentNum}}</span></p>-->
                            <p class="phoneNum">最大容量：<span>{{item.businessBean.capacity}}</span></p>
                        </div>
                    </div>
                </ScrollContainer>
                <PersonDetail v-if="visible"
                              :visible="visible"
                              :Info="shopInfo"
                              :isDisabled="isDisabled"
                              :title="title"
                              @closeInfoDialog ="closeDialog"
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
    import _ from 'lodash'

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
                isShowLoading: false,
                currentNum: 50
            }
        },
        methods: {
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/businesCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllShop()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.shopList = this.checkList.filter(item => {
                        if (item.businessTypeName.includes(info)) {
                            return item
                        }
                        if ((item.regionName)&&(item.regionName.includes(info))) {
                            return item
                        }
                        if (item.businessBean.name.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllShop()
                }
            },
            getClass (type) {
               switch (type) {
                   case 1 :{
                       return 'superMarket';
                       break
                   }
                   case 3 :{
                       return 'hotel';
                       break
                   }
                   case 4 :{
                       return 'store';
                       break
                   }
                   case 5 :{
                       return 'coffee';
                       break
                   }
                   case 6 :{
                       return 'tea';
                       break
                   }
                   default:{
                       return ''
                   }

               }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showPersonDetail (info,title,state) {
                this.shopInfo = info
                this.visible = true
                this.isDisabled = state
                this.title = title
            },
            addNewInfo () {
                this.showPersonDetail({businessBean:{}}, '添加商圈信息', false)
                this.isDisabled = false
            },
            deletInfo (id) {
                console.log(this.choseInfoId)
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.shop.deleteShop(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            // for (let i = 0; i < this.choseInfoId.length; i++) {
                            //     this.shopList = this.shopList.filter((item, index) => {
                            //         if (item.id === this.choseInfoId[i]){
                            //             this.shopList[index].checked = false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllShop()
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                        }).catch(err => {
                            console.log(err)
                            this.$message.error('删除失败，请稍后重试')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的商铺信息')
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
                console.log(this.choseInfoId)
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
            async fixInfo (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude= info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let shopObj = {
                    description:info.description,
                    id: info.businessBean.id,
                    name: info.businessBean.name,
                    capacity: info.businessBean.capacity,
                    regionId: info.regionId,
                    businessTypeId: info.businessBean.businessTypeId,
                    latitude: latitude,
                    longitude: longitude
                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        shopObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    shopObj.pictureId = info.pictureId
                }
                console.log(shopObj, 'this is trashObj')
                await api.shop.updateShop(JSON.stringify(shopObj)).then(res => {
                    this.closeDialog()
                    console.log('修改成功')
                    this.$message.success('修改成功')
                    this.choseInfoId = []
                    this.getAllShop()
                }).catch(err => {
                    console.log(err, '更新失败')
                    this.$message.error('更新失败，请稍后重试')
                })
            },
            async addNewPerson (info) {
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude= info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let shopObj = {
                    description:info.description,
                    name: info.businessBean.name,
                    capacity: info.businessBean.capacity,
                    regionId: info.regionId,
                    businessTypeId: info.businessBean.businessTypeId,
                    latitude: latitude,
                    longitude: longitude

                }
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        shopObj.pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                console.log(shopObj, 'this is trashObj')
                await api.shop.createShop(JSON.stringify(shopObj)).then(res => {
                    this.closeDialog()
                    this.$message.success('添加成功')
                    console.log('增加成功')
                    this.getAllShop()
                }).catch(err => {
                    console.log(err, '添加失败')
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            fixedInfo (id) {
                if (id) {
                    //this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一个数据修改')
                    return
                }
                if (this.choseInfoId.length > 0) {
                    this.shopList.map((item) => {
                        if (item.id === this.choseInfoId[0]){
                            this.shopInfo = item
                        }
                    })
                    this.showPersonDetail(this.shopInfo, '修改商圈信息',false)
                    this.isDisabled = false
                    //this.choseInfoId = []
                } else {
                    this.$message.error('请选择一条数据')
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
                        this.shopList[i].description = this.shopList[i].businessBean.description
                        this.shopList[i].location = `${this.shopList[i].longitude},${this.shopList[i].latitude}`
                        this.shopList[i].businessBean.currentNum = this.currentNum
                        if (this.shopList[i].businessBean.capacity == 0 ){
                            this.shopList[i].businessBean.state = '已满'
                        } else {
                            let parcent = this.shopList[i].businessBean.currentNum/this.shopList[i].businessBean.capacity
                            if (parcent > .9){
                                this.shopList[i].businessBean.state = '已满'
                            } else {
                                this.shopList[i].businessBean.state = '充裕'
                            }
                        }
                        this.shopList[i].byTime = -(new Date(this.shopList[i].businessBean.modifyTime)).getTime()
                    }
                    this.shopList = _.sortBy(this.shopList, 'byTime')
                    this.checkList = this.shopList
                    this.choseInfoId = []
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
                    .superMarket{
                        background: #e44b4e;
                    }
                    .food{
                        background: #f0c30e;
                    }
                    .hotel{
                        background: #4aa3df;
                    }
                    .store{
                        background: #1bbc9b;
                    }
                    .coffee{
                        background: #9b58b5;
                    }
                    .tea{
                        background: #94a4a4;
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
            }
        }
    }

</style>
