<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent" @keyup="startSearch">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-button size="mini"plain class='selectedAll' @click="selected">
                <el-checkbox v-model="isSelected" @change="selectedAll"></el-checkbox>全选
            </el-button>
            <!--<el-button size="mini"plain v-if="isShowHeader">导入</el-button>-->
            <div v-if="isShowHeader" class="el-upload">
                <el-button size="mini" plain @click="$refs.uploadFile.click()"><i class="el-icon-upload2"></i>导入</el-button>
                <input type="file" ref="uploadFile" class="importFile" @change="selectFile">
            </div>
            <el-button size="mini"plain v-if="isShowHeader" @click="expotInfo"><i class="el-icon-download"></i>导出</el-button>
            <el-button size="mini"plain v-if="isShowHeader" @click="exportTemplate"><i class="el-icon-download"></i>下载模板</el-button>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="fixCard"><i class="el-icon-edit"></i>修改</el-button>
        </div>
        <!--<div class="filite" v-if="route.includes('person')">-->
            <!--<el-checkbox-group v-model="filterList" @change="choseType">-->
                <!--<el-checkbox v-for="item in personTypeList" :label="item.name"></el-checkbox>-->
            <!--</el-checkbox-group>-->
        <!--</div>-->
        <div class="filite" v-if="route.includes('indicator')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in indicatorType" :label="item.type" :key="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('trash')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in trashType" :label="item.type" :key="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('shop')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in shopType" :label="item.businessType.name" :key="item.businessType.id"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('park')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in parkType" :label="item.type | packFilter" :key="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="page" v-if="isShowHeader">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm" @click="toggleList('list')" v-if="isShowIcon"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')" v-if="!isShowIcon"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "fun-header",
        props:['choseId','listsLength'],
        data () {
            return {
                filterList: [],
                personTypeList: [],
                indicatorType: [
                    {type: '设施'},
                    {type: '路线'},
                    {type: '标语'}
                ],
                trashType: [
                    {type: '临时'},
                    {type: '固定'}
                ],
                shopType: [],
                parkType: [
                    {type: '0'},
                    {type: '1'}
                ],
                route: '',
                isSelected: false,
                isShowHeader: true,
                searchContent: '',
                isShowIcon: true
            }
        },
        methods: {
            startSearch () {
                // if (this.searchContent !== '') {
                    this.$emit('searchAnything', this.searchContent)
                // }
            },
            addNewInfo () {
                // console.log(this.$route.path, 'opop')
                this.$emit('addNewInfo')
            },
            selected () {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            selectFile(e){
                var route = this.$route.path;
                console.log(e.target.files[0], 'opopopopopops')
                let file = e.target.files[0]
                if (!file.type.includes('vnd.ms-excel')) {
                    this.$message.error('请上传CSV格式文件，谢谢！');
                    return
                } else {
                    var form = new FormData();
                    form.append('f1',file);
                    console.log(form, 'opopopopoppopop')

                    switch (true){
                        case route.includes("boat"):
                            console.log("boat");
                            api.importfile.importBoat(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllBoat");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("toilet"):
                            console.log("toilet");
                            api.importfile.importToilet(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllToilet");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("park"):
                            console.log("park");
                            api.importfile.importPark(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllPark");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("shop"):
                            console.log("shop");
                            api.importfile.importShop(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllShop");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("scenic"):
                            console.log("scenic");
                            api.importfile.importScenic(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllScenic");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("trash"):
                            console.log("trash");
                            api.importfile.importDustbin(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllTrash");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("indicator"):
                            console.log("indicator");
                            api.importfile.importIndicator(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllIndicator");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("plant"):
                            console.log("plant");
                            api.importfile.importPlant(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllPlant");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("construction"):
                            console.log("construction");
                            api.importfile.importConstruction(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllBuild");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;
                        case route.includes("person"):
                            console.log("person");
                            api.importfile.importPerson(form).then(res => {
                                this.$message.success('导入成功');
                                this.$emit("getAllPerson");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                            })
                            break;

                    }
                }
            },
            exportTemplate(){
                var route = this.$route.path;
                    switch (true){
                        case route.includes("boat"):
                            window.location.href="/static/template/vehicle.csv";
                            break;
                        case route.includes("toilet"):
                            window.location.href="/static/template/toilet.csv";
                            break;
                        case route.includes("park"):
                            window.location.href="/static/template/parking.csv";
                            break;
                        case route.includes("shop"):
                            window.location.href="/static/template/business.csv";
                            break;
                        case route.includes("scenic"):
                            window.location.href="/static/template/scenicspot.csv";
                            break;
                        case route.includes("trash"):
                            window.location.href="/static/template/dustbin.csv";
                            break;
                        case route.includes("indicator"):
                            window.location.href="/static/template/signboard.csv";
                            break;
                        case route.includes("plant"):
                            window.location.href="/static/template/plant.csv";
                            break;
                        case route.includes("construction"):
                            window.location.href="/static/template/building.csv";
                            break;
                        case route.includes("person"):
                            window.location.href="/static/template/person.csv";
                            break;
                }
            },
            expotInfo(){
                if (this.listsLength < 1){
                    this.$message.error('当前无数据可导出，请添加数据后在导出')
                    return
                }
                let route = this.$route.path
                if(route.includes('basic')){
                    let type
                    if (route.includes('park')) {
                        type = 'parking'  //停车场
                    }else if(route.includes('trash')){
                        type = 'dustbin'  //垃圾桶
                    }else if(route.includes('construction')){
                        type = 'building' //建筑
                    }else if(route.includes('plant')){
                        type = 'plant' //植物
                    }else if(route.includes('indicator')){
                        type = 'signboard'  //指示牌
                    }else if(route.includes('shop')){
                        type = 'business'  //景点
                    }else if(route.includes('toilet')){
                        type = 'toilet'  //厕所
                    }else if(route.includes('scenic')){
                        type = 'scenicspot'  //景点
                    }else if(route.includes('boat')){
                        type = 'vehicle'  //车船
                    }

                    if (this.choseId.length > 0) {
                        api.exportFile.exportSingleBasic(this.choseId,type).then((res) =>{
                            const content = res
                            const blob = new Blob([content])
                            const fileName = '设施.csv'
                            if('download' in document.createElement('a')){
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else{
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
//                        this.choseId=[]
                        }).catch(err =>{
                            this.$message.error('导出失败，请稍后再试')
                        })
                    } else {
                        api.exportFile.exportAllBasic(type).then((res) => {
                            console.log(res,'niaho')
                            const content = res
                            const blob = new Blob([content])
                            const fileName = '设施.csv'
                            if('download' in document.createElement('a')){
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else{
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    }
                }else {
                    let type
                    if(route.includes('1')){
                        type = 1
                    }else if (route.includes('2')){
                        type = 2
                    }else if (route.includes('3')){
                        type = 3
                    }else if (route.includes('4')){
                        type = 4
                    }else if (route.includes('5')){
                        type = 5
                    }else if (route.includes('6')){
                        type = 6
                    }else if (route.includes('7')){
                        type = 7
                    }else if (route.includes('8')){
                        type = 8
                    }

                    if (this.choseId.length > 0) {
                        api.exportFile.exportSinglePerson(this.choseId).then((res) =>{
                            const content = res
                            const blob = new Blob([content])
                            const fileName = '人员.csv'
                            if('download' in document.createElement('a')){
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else{
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
//                        this.choseId=[]
                        }).catch(err =>{
                            this.$message.error('导出失败，请稍后再试')
                        })
                    } else {
                        api.exportFile.exportAllPerson(type).then((res) => {
                            console.log(res,'niaho')
                            const content = res
                            const blob = new Blob([content])
                            const fileName = '人员.csv'
                            if('download' in document.createElement('a')){
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else{
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    }
                }

            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            toggleList (type) {
                if (type === 'list') {
                    this.isShowIcon = false
                } else {
                    this.isShowIcon = true
                }
                this.$emit('toggleList',type)
            },
            choseType () {
                console.log(this.filterList, 'opopopopopo')
                this.$emit('choseType',this.filterList)
            },
            selectedAll () {
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard () {
                this.$emit('fixedInfo')
            },
            async showType () {
                this.route = this.$route.path
                if (this.route.includes('shop')) {
                    await api.shop.getBusinesstype().then(res => {
                        console.log(res, '这是请求回来的shop')
                        this.shopType = res
                    })
                } else if (this.route.includes('person')) {
                    await api.person.getJob().then(res => {
                        console.log(res, '这是请求回来的')
                        this.personTypeList = res
                    })
                } else if (this.route.includes('indicator')) {
                    console.log('这是指示牌')
                }
            },
            showHeader () {
                if (this.route.includes('basictype')) {
                    this.isShowHeader = false
                } else if (this.route.includes('personType')) {
                    this.isShowHeader = false
                } else {
                    this.isShowHeader = true
                }
            }
        },
        filters: {
            packFilter (item) {
                if (item === '0') {
                    return '室外'
                } else{
                    return '室内'
                }
            }
        },
        watch: {
            '$route' () {
                this.showType()
                this.showHeader()
            }
        },
        created () {
            this.showType()
            this.showHeader()
        }
    }
</script>

<style lang="scss">
    .funHeader{
        .el-checkbox__label{
            padding-left: rem(1);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
        .importFile{
            width: 0;
            height: 0;
            display: none;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .funHeader{
        width: 100%;
        height: 100%;
        div{
            display: inline-block;
        }
        .searchInfo{
            input{
                border: none;
                outline:medium;
                list-style: none;
                border-bottom: 1px solid #ccc;
                font-size: rem(12);
                padding: rem(3) rem(4);
            }
            i{
                font-size: rem(12);
                margin-left: rem(-15);
                cursor: pointer;
            }
        }
        .funcBtn{
            margin-left: rem(20);
            margin-top: rem(4);
            button{
                border: none;
                margin-right: rem(-5);

                i{
                    margin-right: rem(3);
                }
            }
            .el-button.selectedAll{
                padding-bottom: rem(0);
            }
            .el-button {
                padding: rem(5) rem(5);
                margin: 0;
            }
        }
        .filite{
            margin-left: rem(50);
            .el-checkbox{
                margin-left: rem(10);
            }
        }
        .page{
            margin-left: rem(20);
            font-size: rem(12);
            float: right;
            margin-top: rem(3);
            span{
                display: inline-block;
                cursor: pointer;
                margin-left: rem(5);
            }
            .upPage,downPage,listForm,cardForm{
                padding: rem(5);
                box-sizing: border-box;
            }
            .cardForm{
                i{
                    color: #e44b4e;
                }
            }
        }
    }
</style>
