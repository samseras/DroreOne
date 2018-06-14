<template>
    <div class="lightList">
        <div class="title">
            路灯信息
        </div>
        <div class="cameraContent">
            <div class="conTitle">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @selectedAll="selectedAll"
                        @fixedInfo="fixedInfo"
                        @searchAnything="searchAnything"
                        :listsLength = "listLength"
                        :choseId="choseInfoId"
                        :personListFlag="selectFlag"
                        @nextPage="nextPage"
                        @previousPage="previousPage"
                        @choseType="choseType"
                        @toggleList="toggleList"
                        @getAllLight="getAllLight">
                </Header>
            </div>

            <div class="cameraList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        v-if="!isShowLightDetail && !show"
                        ref="multipleTable"
                        :data="lightList"
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
                            prop="name"
                            label="名称">
                        </el-table-column>

                        <el-table-column
                            prop="lightStatus"
                            label="状态">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.lightStatus  |changeFilter }}
                                </span>
                            </template>

                        </el-table-column>

                        <el-table-column
                            prop="serialNum"
                            label="路灯型号">
                        </el-table-column>

                        <el-table-column
                            prop="regionName"
                            label="所属片区">
                        </el-table-column>
                        <el-table-column
                            label="描述">
                            <template slot-scope="scope">
                                <div class="box" v-if="scope.row.description">
                                    <div class="bottom">
                                        <el-tooltip class="item" effect="light" :content=scope.row.description placement="bottom">
                                            <el-button>{{scope.row.description}}</el-button>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="150">
                            <template slot-scope="scope">
                                <div class="handle">
                                    <span @click="showLightDetail(scope.row, '路灯信息',true)">查看</span>
                                    <span class="line">|</span>
                                    <span @click="fixedInfo(scope.row.id )">修改</span>
                                    <span class="line">|</span>
                                    <span @click="deletInfo(scope.row.id)">删除</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="personInfo" v-for="(item,index) in lightList" v-if="isShowLightDetail && item.status">
                        <div class="checkBox">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBtn"></el-checkbox>
                        </div>
                        <div class="personType" @click.stop="showLightDetail(item,'路灯信息',true)">
                            <!--<img src="../../../../static/img/lightCard.png" alt="">-->
                            <img :src="getUrl(item.picturePath)" alt="" @error="imgError">
                            <span class="type">
                                  {{item.name}}
                                </span>
                        </div>
                        <div class="specificInfo" >
                            <p class="area">所属区域：<span>{{item.regionName}}</span></p>
                            <p class="type">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<span>{{item.lightStatus | changeFilter}}</span></p>
                            <p class="sex text">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span>{{item.description}}</span></p>

                        </div>
                    </div>
                    <div class="tip" v-if="show">
                        <span>暂无数据</span>
                    </div>
                </ScrollContainer>
                <HardWare v-if="visible"
                          :visible="visible"
                          :Info="lightInfo"
                          :title="title"
                          :isDisabled="isDisabled"
                          @closeInfoDialog="closeDialog"
                          @addNewInfo="addLight"
                          @fixInfo="fixInfo">
                </HardWare>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from './camera.vue'
    import HardWare from './hardwareDialog.vue'
    import api from '@/api'
    import _ from 'lodash'

    export default{
        data(){
            return{
                selectFlag:false,
                tempSelects:[],
                isShowLightDetail:true,
                visible:false,
                lightList:[ ],
                checkList:[],
                isSelected:false,
                lightInfo:{},
                choseInfoId:[],
                choseList:[],
                isDisabled:true,
                filterList: [],
                title:'',
                show:false,
                isShowLoading:false,
                currentNum: 50,
                listLength: '',
                pageNum: 1
            }
        },
        methods:{
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null) {
                    return '../../../../static/img/botanyCard.png'
                } else {
                    return url
                }
            },
            closeDialog () {
                this.visible = false
                this.getAllLight()
            },
            searchAnything (info) {
                console.log(info, '这是要过滤的')
                if (info.trim() !== '') {
                    this.lightList = this.checkList.filter(item => {
                        if (item.regionName && item.regionName.includes(info)) {
                            return item
                        }
                        if (item.name.includes(info)) {
                            return item
                        }
                        if (item.modelName && item.modelName.includes(info)) {
                            return item
                        }
                        if (item.description && item.description.includes(info)) {
                            return item
                        }
                    })
                } else {
                    this.getAllLight()
                }
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            addNewInfo(){
                this.showLightDetail({},'添加路灯信息',false)
                this.isDisabled=false
            },
            showLightDetail(info,title,state){
                this.lightInfo=info
                this.visible=true
                this.isDisabled = state
                this.title=title

            },
            async fixInfo(info){
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let lightObj=[{
                    typeId: 5,
                    id:info.id,
                    lightStatus:info.lightStatus,
                    name:info.name,
                    serialNum:info.serialNum,
                    model:info.model,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        lightObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                } else {
                    lightObj[0].pictureId = info.pictureId
                }
                await api.light.updateLight(lightObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('修改成功')
                    this.choseInfoId=[]
                    this.getAllLight()
                }).catch(err =>{
                    this.$message.error('修改失败，请稍后再试')
                })
            },
            fixedInfo(id){
                if (id) {
                    this.choseInfoId = [id]
                }
                if(this.choseInfoId.length > 1) {
                    this.$message.warning('至多选择一条数据')
                    return
                }
                if(this.choseInfoId.length>0){
                    this.lightList.map((item)=>{
                        if(item.id === this.choseInfoId[0]){
                            this.lightInfo=item
                        }
                    })
                    this.showLightDetail(this.lightInfo,'修改路灯信息',false)
                    this.isDisabled=false
                }else{
                    this.$message.error('请选择要修改的路灯')
                }
            },
            deletInfo(id){
                if (id) {
                    this.choseInfoId = [id]
                }
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.light.deleteLight(this.choseInfoId).then(res =>{
                            // for(let i=0;i<this.choseInfoId.length;i++){
                            //     this.lightList=this.lightList.filter((item,index) =>{
                            //         if(item.id===this.choseInfoId[i]){
                            //             this.lightList[index].checked=false
                            //         }
                            //         return item.id !== this.choseInfoId[i]
                            //     })
                            // }
                            this.getAllLight()
                            this.$message.success('删除成功')
                            this.choseInfoId=[]
                        }).catch(err =>{
                            this.$message.error('删除失败')
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择要删除的数据')
                }

            },

            async addLight(info){
                console.log
                let index = info.location.includes(',')?info.location.indexOf(','):info.location.indexOf('，')
                let longitude = info.location.substring(0, index)
                let latitude = info.location.substring(index + 1)
                let lightObj=[{
                    typeId: 5,
                    lightStatus:info.lightStatus,
                    name:info.name,
                    serialNum:info.serialNum,
                    model:info.model,
                    port:info.port,
                    regionId:info.regionId,
                    description:info.description,
                    latitude:latitude,
                    longitude:longitude
                }]
                if (info.imgUrl !== '') {
                    await api.person.updataAva(info.imgUrl).then(res => {
                        console.log(res, '上传成功')
                        lightObj[0].pictureId = res.id
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                await api.light.createLight(lightObj).then(res =>{
                    this.closeDialog()
                    this.$message.success('添加成功')
                    this.getAllLight()
                }).catch(err =>{
                    this.$message.error('添加失败，请稍后重试')
                })
            },
            toggleList (type){
                if(type==='list'){
                    this.isShowLightDetail=false
                }else{
                    this.isShowLightDetail=true
                }
            },
            checked(id){
                this.tempSelects=[];
                this.lightList = this.lightList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                console.log(id)
                if(this.choseInfoId.includes(id)){
                    this.choseInfoId = this.choseInfoId.filter((item)=>{
                        return item!== id
                    })
                }else{
                    this.choseInfoId.push(id)
                }
                let that=this;
                this.lightList.forEach(function(item,i){
                    (item.checked)&&(that.tempSelects.push(item))
                })
                console.log(this.tempSelects)
                if(this.tempSelects.length===this.lightList.length){
                    this.selectFlag=true
                }else{
                    this.selectFlag=false
                }
            },
            choseType(type){
                console.log(type)
                if(type.length===0){
                    this.choseList=this.checkList.filter((item)=>{
                        item.status=true
                        return item.status === true
                    })
                }else{
                    this.choseList=this.checkList.filter((item,index)=>{
                        if(type.includes(item.type)){
                            item.status=true
                        }else {
                            item.status=false
                            console.log(item.type)
                        }
                        return item.status===true
                    })
                }
            },
            selectedAll(state){
                this.lightList=this.lightList.filter((item)=>{
                    if(state==true){
                        item.checked=true
                        this.choseInfoId.push(item.id)
                        return item.checked == true
                    }else{
                        console.log('进入判断')
                        item.checked=false
                        this.choseInfoId=[]
                        return item.checked == false
                    }
                })
                console.log(this.choseInfoId)
                this.selectFlag=true
            },
            previousPage (page) {
                console.log(page, '这是传过来的pageNum')
                this.pageNum = page
                this.getAllLight()
            },
            nextPage (page) {
                console.log(page, '这个是下一页的pageNUM')
                this.pageNum = page
                this.getAllLight()
            },
            async getAllLight(){
                this.choseInfoId=[];
                this.isShowLoading=true
                await api.light.getAllLight().then((res)=>{
                    console.log(res,'这是请求的数据')
                    if(res.devices.length === 0){
                        this.show = true
                    }else{
                        this.show = false
                    }
                    this.isShowLoading=false
                    this.listLength = res.devices.length
                    this.lightList=res.devices
                    this.lightList = this.lightList.filter((item,index) => {
                        if (index < (this.pageNum * 35 ) && index > ((this.pageNum -1) * 35 ) - 1 ) {
                            return item
                        }
                    })

                    for (let i=0;i<this.lightList.length;i++){

                        this.lightList[i].checked=false
                        this.lightList[i].status=true

                        this.lightList[i].location=`${this.lightList[i].longitude},${this.lightList[i].latitude}`
                        this.lightList[i].modifyTime=this.lightList[i].modifyTime.replace("-","/")
                        this.lightList[i].byTime = -(new Date(this.lightList[i].modifyTime)).getTime()
                    }
                    this.lightList = _.sortBy(this.lightList,'byTime')
                    this.checkList = this.lightList

                    this.selectFlag=false

                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created (){
            this.getAllLight()

       },
       filters:{
            changeFilter(item){
                  if(item){
                      return '通电'
                  }else{
                      return '断电'
                  }
            }

       },
        components:{
            ScrollContainer,
            Header,
            HardWare

        }
    }

</script>

<style lang="scss" type="text/scss">
    .lightList{
        .el-checkbox__label{
            padding-left:rem(5);
            font-size:rem(13);
        }
        .el-checkbox__inner{
            margin-top:rem(5);
        }
        .cameraList .box .el-tooltip{
            background: transparent;
            text-align: left;
            border: none;
            padding: 0;
        }
        .cameraList .box .el-button span{
            display:inline-block;
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .el-table__header-wrapper .has-gutter {
            background-color: #f3f3f3;
        }
        .el-table th, .el-table tr{
            background-color: transparent !important;
        }
    }
</style>

<style lang="scss" type="text/scss" scoped>
    .lightList{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
        }
        .cameraContent{
            flex:1;
            width:100%;
            padding:0 rem(15);
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            .conTitle{
                width:100%;
                height:rem(30);
                margin-top:rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .cameraList{
                width:100%;
                flex:1;
                margin-top:rem(20);
                .personInfo{
                    width:rem(210);
                    height:rem(140);
                    border:1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox{
                        width:100%;
                        height:rem(20);
                        background:#fff;
                        border-top-left-radius:rem(5);
                        border-top-right-radius:rem(5);
                        position:relative;
                        .checkBtn{
                            position:absolute;
                            right:rem(5);
                            top:rem(-2);
                            cursor:pointer;
                        }
                    }
                    .personType{
                        /*margin-top:rem(20);*/
                        width:100%;
                        height:rem(25);
                        background:#0086b3;
                        position:relative;
                        font-size:rem(12);
                        img{
                            width:rem(40);
                            height:rem(40);

                            border-radius: 50%;
                            position:absolute;
                            left:rem(15);
                            top:rem(-10);
                        }
                        span{
                            float:right;
                            margin-right:rem(20);
                            line-height: rem(25);
                            color:#fff;
                        }
                    }
                    .specificInfo{
                        margin-top:rem(10);
                        font-size: rem(14);
                        padding:0 rem(10);
                        box-sizing: border-box;
                        p{
                            /*margin-left: rem(15);*/
                            line-height: rem(22);
                            font-size: rem(14);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            span{
                                font-size:rem(13)
                            }
                        }
                        .text{
                            line-height: rem(22);
                            display: inline-block;
                            width: 100%;
                            height: rem(40);
                            white-space: pre-wrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:2;
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
    }
</style>

