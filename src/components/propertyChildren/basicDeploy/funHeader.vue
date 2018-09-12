<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent" @keyup="startSearch">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini" plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>

                <el-checkbox v-model="isSelected" @change="selectedAll" class="selectedAll">全选</el-checkbox>

            <!--<el-button size="mini"plain v-if="isShowHeader">导入</el-button>-->
            <div class="el-upload" v-if="isShowHeader">
                <el-button size="mini" plain @click="$refs.uploadFile.click()"><i class="el-icon-upload2"></i>导入</el-button>
                <input type="file" ref="uploadFile" class="importFile" @change="selectFile">
            </div>
            <el-button size="mini"plain @click="expotInfo"><i class="el-icon-download"></i>导出</el-button>
            <el-button size="mini"plain @click="exportTemplate" v-if="isShowHeader"><i class="el-icon-download"></i>下载模板</el-button>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="fixCard" v-if="isShowIcon"><i class="el-icon-edit" ></i>修改</el-button>
            <div class="el-upload" v-if="allDotisShowHeader">
                <el-button size="mini"plain @click="allDot"><i class="el-icon-location-outline" ></i>批量打点</el-button>
            </div>
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
        <div class="page">
            <span>当前第{{currentPageNum}}页/共{{pageAllNum}}页</span>
            <span class="upPage"@click="previousPage"><</span>
            <span class="downPage" @click="nextPage">></span>
            <span class="listForm" @click="toggleList('list')" v-if="isShowIcon"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')" v-if="!isShowIcon"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "fun-header",
        props: ['choseId', 'listsLength', 'personListFlag'],
        inject:['reload'],
        data() {
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
                isShowIcon: true,
                pageAllNum: 1,
                currentPageNum: 1,
                allDotisShowHeader:true
            }
        },
        methods: {
            ...mapMutations(['SHOWBASICICON']),
            startSearch() {
                // if (this.searchContent !== '') {
                this.$emit('searchAnything', this.searchContent)
                // }
            },
            addNewInfo() {
                // console.log(this.$route.path, 'opop')
                this.$emit('addNewInfo')
            },
            selected() {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            selectFile(e) {
                var route = this.$route.path;
                console.log(e.target.files[0], 'opopopopopops')
                let file = e.target.files[0]
                if (!file.type.includes('vnd.ms-excel')) {
                    this.$message.error('请上传CSV格式文件，谢谢！');
                    return
                } else {
                    var form = new FormData();
                    form.append('f1', file);
                    console.log(form, 'opopopopoppopop')

                    switch (true) {
                        case route.includes("boat"):
                            console.log("boat");
                            api.importfile.importBoat(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllBoat");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("toilet"):
                            console.log("toilet");
                            api.importfile.importToilet(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllToilet");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("park"):
                            console.log("park");
                            api.importfile.importPark(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllPark");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("shop"):
                            console.log("shop");
                            api.importfile.importShop(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllShop");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("scenic"):
                            console.log("scenic");
                            api.importfile.importScenic(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllScenic");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("trash"):
                            console.log("trash");
                            api.importfile.importDustbin(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllTrash");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("indicator"):
                            console.log("indicator");
                            api.importfile.importIndicator(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllIndicator");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("plant"):
                            console.log("plant");
                            api.importfile.importPlant(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllPlant");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("construction"):
                            console.log("construction");
                            api.importfile.importConstruction(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllBuild");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;
                        case route.includes("person"):
                            console.log("person");
                            api.importfile.importPerson(form).then(res => {
                                if(Object.keys(res).length > 0){
                                    let messages = '';
                                    for(let i in res){
                                        messages += "第"+i+"行错误: "+res[i]+"<br>";
                                    }
                                    this.$alert(messages, '导入提示', {
                                        confirmButtonText: '确定',
                                        dangerouslyUseHTMLString:true,
                                        callback: action => {
                                            this.$message.success('导入成功');
                                            this.reload()
                                        }
                                    });
                                }else{
                                    this.$message.success('导入成功');
                                    this.reload()
                                }
                                this.$emit("getAllPerson");
                            }).catch(err => {
                                this.$message.error('导入失败，请稍后重试')
                                this.reload()
                            })
                            break;

                    }
                }
            },
            exportTemplate() {
                var route = this.$route.path;
                console.log(window.location.href)
                switch (true) {
                    case route.includes("boat"):
                        window.location.href = "/static/template/facility/vehicle.csv";
                        break;
                    case route.includes("toilet"):
                        window.location.href = "/static/template/facility/toilet.csv";
                        break;
                    case route.includes("park"):
                        window.location.href = "/static/template/facility/parking.csv";
                        break;
                    case route.includes("shop"):
                        window.location.href = "/static/template/facility/business.csv";
                        break;
                    case route.includes("scenic"):
                        window.location.href = "/static/template/facility/scenicspot.csv";
                        break;
                    case route.includes("trash"):
                        window.location.href = "/static/template/facility/dustbin.csv";
                        break;
                    case route.includes("indicator"):
                        window.location.href = "/static/template/facility/signboard.csv";
                        break;
                    case route.includes("plant"):
                        window.location.href = "/static/template/facility/plant.csv";
                        break;
                    case route.includes("construction"):
                        window.location.href = "/static/template/facility/building.csv";
                        break;
                    case route.includes("1"):
                        window.location.href = "/static/template/person/driver.csv";
                        break;
                    case route.includes("2"):
                        window.location.href = "/static/template/person/boatman.csv";
                        break;
                    case route.includes("3"):
                        window.location.href = "/static/template/person/security.csv";
                        break;
                    case route.includes("4"):
                        window.location.href = "/static/template/person/cleaning.csv";
                        break;
                    case route.includes("5"):
                        window.location.href = "/static/template/person/ticket.csv";
                        break;
                    case route.includes("6"):
                        window.location.href = "/static/template/person/checkin.csv";
                        break;
                    case route.includes("7"):
                        window.location.href = "/static/template/person/maintenance.csv";
                        break;
                    case route.includes("8"):
                        window.location.href = "/static/template/person/manager.csv";
                        break;
                }
            },
            expotInfo() {
                if (this.listsLength < 1) {
                    this.$message.error('当前无数据可导出，请添加数据后在导出')
                    return
                }
                let route = this.$route.path
                if (route.includes('basic')) {
                    let type,fileNames
                    if (route.includes('park')) {
                        type = 'parking'  //停车场
                        fileNames = '停车场.csv'
                    } else if (route.includes('trash')) {
                        type = 'dustbin'  //垃圾桶
                        fileNames = '垃圾桶.csv'
                    } else if (route.includes('construction')) {
                        type = 'building' //建筑
                        fileNames = '建筑.csv'
                    } else if (route.includes('plant')) {
                        type = 'plant' //植物
                        fileNames = '植物.csv'
                    } else if (route.includes('indicator')) {
                        type = 'signboard'  //指示牌
                        fileNames = '指示牌.csv'
                    } else if (route.includes('shop')) {
                        type = 'business'  //景点
                        fileNames = '商铺.csv'
                    } else if (route.includes('toilet')) {
                        type = 'toilet'  //厕所
                        fileNames = '厕所.csv'
                    } else if (route.includes('scenic')) {
                        type = 'scenicspot'  //景点
                        fileNames = '景区.csv'
                    } else if (route.includes('boat')) {
                        type = 'vehicle'  //车船
                        fileNames = '车船.csv'
                    }

                    if (this.choseId.length > 0) {
                        api.exportFile.exportSingleBasic(this.choseId, type).then((res) => {
                            const content = res
                            const blob = new Blob([content])
                            const fileName = fileNames
                            if ('download' in document.createElement('a')) {
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else {
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
//                        this.choseId=[]
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    } else {
                        api.exportFile.exportAllBasic(type).then((res) => {
                            console.log(res, 'niaho')
                            const content = res
                            const blob = new Blob([content])
                            const fileName = fileNames
                            if ('download' in document.createElement('a')) {
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else {
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    }
                } else {
                    let type,fileNames
                    if (route.includes('1')) {
                        type = 1
                        fileNames = '司机.csv'
                    } else if (route.includes('2')) {
                        type = 2
                        fileNames = '船夫.csv'
                    } else if (route.includes('3')) {
                        type = 3
                        fileNames = '安保.csv'
                    } else if (route.includes('4')) {
                        type = 4
                        fileNames = '保洁.csv'
                    } else if (route.includes('5')) {
                        type = 5
                        fileNames = '售票.csv'
                    } else if (route.includes('6')) {
                        type = 6
                        fileNames = '检票.csv'
                    } else if (route.includes('7')) {
                        type = 7
                        fileNames = '维保.csv'
                    } else if (route.includes('8')) {
                        type = 8
                        fileNames = '管理者.csv'
                    }

                    if (this.choseId.length > 0) {
                        api.exportFile.exportSinglePerson(this.choseId).then((res) => {
                            const content = res
                            const blob = new Blob([content])
                            const fileName = fileNames
                            if ('download' in document.createElement('a')) {
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else {
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
//                        this.choseId=[]
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    } else {
                        api.exportFile.exportAllPerson(type).then((res) => {
                            console.log(res, 'niaho')
                            const content = res
                            const blob = new Blob([content])
                            const fileName = fileNames
                            if ('download' in document.createElement('a')) {
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else {
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$message.success('导出成功')
                        }).catch(err => {
                            this.$message.error('导出失败，请稍后再试')
                        })
                    }
                }

            },
            deleteCard() {
                this.$emit('deletInfo')
            },
            toggleList(type) {
                if (type === 'list') {
                    this.isShowIcon = false
                } else {
                    this.isShowIcon = true
                }
                this.$emit('toggleList', type)
                this.$store.commit('SHOWBASICICON', type)
            },
            choseType() {
                console.log(this.filterList, 'opopopopopo')
                this.$emit('choseType', this.filterList)
            },
            selectedAll() {
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard() {
                this.$emit('fixedInfo')
            },
            allDot() {
                this.$emit('allDotInfo')
            },
            async showType() {
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
            showHeader() {
                let route = this.$route.path
                if (route.includes('roat')) {
                    this.isShowHeader = false
                    this.allDotisShowHeader = false
                } else if (route.includes('area')) {
                    this.isShowHeader = false
                    this.allDotisShowHeader = false
                } else if (route.includes('person')) {
                    this.allDotisShowHeader = false
                }else if (route.includes('boat-deploy')) {
                    this.allDotisShowHeader = false
                }else  {
                    this.isShowHeader = true
                    this.allDotisShowHeader = true
                }
            },
            previousPage() {//上一页
                this.currentPageNum--
                if (this.currentPageNum < 1) {
                    this.currentPageNum = 1
                    return
                }
                this.$emit('previousPage', this.currentPageNum)
            },
            nextPage() {//下一页
                this.currentPageNum++
                if (this.currentPageNum > this.pageAllNum) {
                    this.currentPageNum = this.pageAllNum
                    return
                }
                this.$emit('nextPage', this.currentPageNum)
            }
        },
        filters: {
            packFilter(item) {
                if (item === '0') {
                    return '室外'
                } else {
                    return '室内'
                }
            }
        },
        watch: {
            '$route'() {
                this.currentPageNum = 1
                this.showType()
                this.showHeader()
            },
            personListFlag(n, o) {
                console.log(n);
                if (n === true) {
                    this.isSelected = true
                } else {
                    this.isSelected = false
                }
            },
            listsLength() {
                if (this.listsLength > 0) {
                    this.pageAllNum = Math.ceil(this.listsLength / 35)
                }
            },
            getBasicIcon() {
                this.toggleList(this.getBasicIcon)
            }
        },
        created() {
            this.showType()
            this.showHeader()
            this.toggleList(this.getBasicIcon)
        },
        computed: {
            ...mapGetters(['getBasicIcon'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .funHeader{
        .el-checkbox__input{
            vertical-align: sub;
        }
        .el-checkbox__label{
            padding-left: rem(5);
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
                border-bottom: 1px solid #ccc;
                font-size: rem(12);
                padding: rem(3) rem(4);
            }
            i{
                font-size: rem(13);
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
                font-weight: 500;

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
                margin-bottom: rem(2);
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
