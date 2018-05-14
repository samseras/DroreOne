<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything">
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
            <el-button size="mini"plain v-if="isShowHeader">导出</el-button>
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
            <span class="listForm" @click="toggleList('list')"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "fun-header",
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
                isShowHeader: true
            }
        },
        methods: {
            addNewInfo () {
                // console.log(this.$route.path, 'opop')
                this.$emit('addNewInfo')
            },
            selected () {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            selectFile(e){
                console.log(this.$route.path)
                console.log(e.target.files[0], 'opopopopopops')
                let file = e.target.files[0]
                if (!file.type.includes('vnd.ms-excel')) {
                    this.$message.error('请上传CSV格式文件，谢谢！');
                    return
                } else {
                    var form = new FormData();
                    form.append('f1',file);
                    console.log(form, 'opopopopoppopop')
                    api.importfile.importFileData(form).then(res => {
                        console.log(res, '导入成功')
                    }).catch(err => {
                        this.$message.error('导入失败，请稍后重试')
                        console.log(err, '导入失败')
                    })
                }
            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            toggleList (type) {
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
