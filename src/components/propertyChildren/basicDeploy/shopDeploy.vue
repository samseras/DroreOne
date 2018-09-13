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
                        :listsLength="listLength"
                        :personListFlag="selectFlag"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @selectedAll = 'selectedAll'
                        @fixedInfo = 'fixedInfo'
                        @allDotInfo = 'allDotInfo'
                        @searchAnything="searchAnything"
                        @getAllShop="getAllShop">
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowShopCard && !show"
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
                            prop="businessBean.state"
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
                            width="200"
                            prop="regionName"
                            label="所属片区">
                            <template slot-scope="scope">
                                <span class="overflow">{{scope.row.regionName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="150"
                            label="操作">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showPersonDetail(scope.row, '商圈信息',true )">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
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
                            <p class="idNum">商铺类型：<span>{{item.businessTypeName}}</span></p>
                            <p class="sex">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.businessBean.state}}</span></p>
                            <p class="phoneNum">最大容量：<span>{{item.businessBean.capacity}}</span></p>
                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
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

    export default {
        name: "shop-deploy",
        data () {
            return {
                selectFlag:false,
                tempSelects:[],
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
                show:false,
                isShowLoading: false,
                currentNum: 50,
                listLength: '',
                pageNum: 1,
                allDotvisible:false,
                allDotList:{
                    close:[],
                    open:[]
                }
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
                this.allDotvisible=false
                this.getAllShop()
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
                    id: info.businessBean.id,
                    name: info.businessBean.name,
                    capacity: info.businessBean.capacity,
                    regionId: info.regionId,
                    businessTypeId: info.businessBean.businessTypeId,
                    latitude: index[1],
                    longitude: index[0],
                    pictureId:info.pictureId
                }
                await api.shop.updateShop(JSON.stringify(scenicObj)).then(res => {
                    console.log('修改成功')
                })
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
            allDotInfo(){
                this.allDotvisible = true
                this.title = '商圈批量打点'
            },
            addNewInfo () {
                this.showPersonDetail({businessBean:{}}, '添加商圈信息', false)
                this.isDisabled = false
            },
            deletInfo (id) {
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
                            this.getAllShop()
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
                this.tempSelects=[];
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
                let that=this;
                this.shopList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.shopList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType (type) {
                console.log(type)
                if (type.length === 0){
                    this.shopList = this.checkList.filter((item) => {
                        item.status = true
                        return item
                    })
                } else {
                    this.shopList = this.checkList.filter((item,index) => {
                        if (type.includes(item.businessTypeName)){
                            item.status = true
                        } else if(!type.includes(item.businessTypeName)){
                            item.status = false
                        }
                        return item.status === true
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
                this.selectFlag=true
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
                    this.choseInfoId = [id]
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
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllShop ()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllShop ()
            },
            async getAllShop () {
                this.isShowLoading = true
                await api.shop.getAllShop().then(res => {
                    console.log(res, '这是所有商铺')
                    if(res.length === 0){
                        this.show = true
                    }else{
                        this.show =false
                    }
                    this.listLength =res.length
                    this.isShowLoading = false
                    this.shopList = res
                    this.shopList = this.shopList.filter((item,index) =>{
                        if(index <(this.pageNum*35)&& index>(this.pageNum-1)*35-1){
                            return item
                        }
                    })

                    this.allDotList.close=[]
                    this.allDotList.open=[]
                    for (let i = 0; i < res.length; i++) {
                        res[i].id = res[i].businessBean.id
                        res[i].iconName = res[i].businessBean.name
                        res[i].iconType = '植物'
                        if(res[i].businessBean.businessTypeId == "1"){
                            res[i].iconUrl="/static/img/icon/shop_small.png"
                            res[i].iconSubtype='shop'
                        }else if(res[i].businessBean.businessTypeId == "2"){
                            res[i].iconUrl="/static/img/icon/supermarket_small.png"
                            res[i].iconSubtype='supermarket'
                        }else if(res[i].businessBean.businessTypeId == "3"){
                            res[i].iconUrl="/static/img/icon/restaurant_small.png"
                            res[i].iconSubtype='restaurant'
                        }else if(res[i].businessBean.businessTypeId == "4"){
                            res[i].iconUrl="/static/img/icon/hotel_small.png"
                            res[i].iconSubtype='hotel'
                        }else if(res[i].businessBean.businessTypeId == "5"){
                            res[i].iconUrl="/static/img/icon/kursaal_small.png"
                            res[i].iconSubtype='kursaal'
                        }else if(res[i].businessBean.businessTypeId == "6"){
                            res[i].iconUrl="/static/img/icon/cafe_small.png"
                            res[i].iconSubtype='cafe'
                        }else if(res[i].businessBean.businessTypeId == "7"){
                            res[i].iconUrl="/static/img/icon/teahouse_small.png"
                            res[i].iconSubtype='teahouse'
                        }else {
                            res[i].iconUrl="/static/img/icon/shop.png"
                            res[i].iconSubtype='shop'
                        }
                        if(res[i].longitude==null&&res[i].latitude==null){
                            this.allDotList.close.push(res[i])
                        }else {
                            this.allDotList.open.push(res[i])
                        }
                    }

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
                        this.shopList[i].businessBean.modifyTime=this.shopList[i].businessBean.modifyTime.replace("-","/")
                        this.shopList[i].byTime = -(new Date(this.shopList[i].businessBean.modifyTime)).getTime()
                    }
                    this.shopList = _.sortBy(this.shopList, 'byTime')
                    this.checkList = this.shopList
                    this.choseInfoId = []

                    this.selectFlag=false

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
            PersonDetail,
            allDotMap
        }

    }
</script>

<style lang="scss" type="text/scss">
    .shopDeploy{
        .el-checkbox__input{
            vertical-align: top;
        }
    }
    .shopDeploy {
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>
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
                .tip{
                    width:100%;
                    height:rem(40);
                    text-align: center;
                    color: #909399;
                    line-height: rem(40);
                }
                .handle{
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
