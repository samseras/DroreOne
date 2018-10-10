<template>
    <div class="orginizHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
            <i class="el-icon-search" @click="startSearch"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini" plain @click="addNewInfo" v-if="getUserRole[0] === 1"><i class="el-icon-circle-plus"></i>添加</el-button>

            <el-checkbox v-model="isSelected" @change="selectedAll" class="selectedAll">全选</el-checkbox>
            <!--<div class="el-upload" v-if="isShowHeader">-->
                <!--<el-button size="mini" plain @click="$refs.uploadFile.click()"><i class="el-icon-upload2"></i>导入</el-button>-->
                <!--<input type="file" ref="uploadFile" class="importFile" @change="selectFile">-->
            <!--</div>-->
            <!--<el-button size="mini"plain @click="expotInfo"><i class="el-icon-download"></i>导出</el-button>-->
            <!--<el-button size="mini"plain @click="exportTemplate" v-if="isShowHeader"><i class="el-icon-download"></i>下载模板</el-button>-->
            <el-button size="mini"plain @click="deleteCard" v-if="getUserRole[0] === 1"><i class="el-icon-delete"></i>删除</el-button>
            <!--<el-button size="mini"plain @click="fixCard" v-if="isShowIcon"><i class="el-icon-edit" ></i>修改</el-button>-->
            <div class="selectDepar" v-if="route.includes('users')">
                <el-select v-model="department" multiple collapse-tags placeholder="部门名称" @change="selectDepartment">
                    <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="selectDepar" v-if="route.includes('users')">
                <el-select v-model="postName" multiple collapse-tags placeholder="岗位名称" @change="selectJob">
                    <el-option
                        v-for="item in postList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="page">
            <Pagination class="pageSize"></Pagination>
            <span class="listForm" @click="toggleList('list')" v-if="isShowIcon && isShowList"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')" v-if="!isShowIcon && isShowList"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import {mapGetters,mapMutations} from 'vuex'
    import Pagination from '@/components/public/Pagination'
    export default {
        name: "fun-header",
        props: ['choseId', 'listsLength', 'personListFlag'],
        inject:['reload'],
        data() {
            return {
                currentPage3: 1,
                shopType: [],
                route: '',
                isSelected: false,
                searchContent: '',
                isShowIcon: true,
                pageAllNum: 1,
                currentPageNum: 1,
                isShowList: true,
                department: [],
                postName: [],
                postList: [],
                departmentList: []
            }
        },
        methods: {
            ...mapMutations(['SHOWBASICICON', 'CURRENT_NUM']),
            selectDepartment () {
                console.log(this.department, 'departmentlist')
                this.$emit('selectDepartment', this.postName,this.department)
            },
            selectJob () {
                console.log(this.postName,'jobList')
                this.$emit('selectJob', this.postName,this.department )
            },
            startSearch() {
                // if (this.searchContent !== '') {
                this.$emit('searchAnything', this.searchContent)
                // }
            },
            addNewInfo() {
                this.$emit('addNewInfo')
            },
            selected() {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
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
            selectedAll() {
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard() {
                this.$emit('fixedInfo')
            },
            showIcon () {
                let date = new Date().getTime()
                let obj = {
                    currentNum: 1
                }
                obj[date] = new Date().getTime()
                this.$store.commit('CURRENT_NUM', obj)
                if (this.route.includes('users')) {
                    this.isShowList = true
                } else {
                    this.isShowList = false
                }
            },
             async getDepartment () {
                await api.user.getUserDepartment().then(res => {
                    console.log(res, 'this is departmentList')
                    this.departmentList = res
                    this.departmentList.forEach(item => {
                        item.label = item.name
                        item.value = item.name
                    })
                })
            },
            async getJobList () {
                await api.user.getUserJobInfo().then(res => {
                    console.log(res, 'this is joblist')
                    this.postList = res
                    this.postList.forEach(item => {
                        item.label = item.name
                        item.value = item.name
                    })
                })
            }
        },
        watch: {
            '$route'() {
                this.route = this.$route.path
                this.currentPageNum = 1
                this.showIcon()
                if (this.route.includes('users')) {
                    this.getJobList()
                    this.getDepartment()
                }

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
            },
            searchContent () {
                this.startSearch()
            }
        },
        created() {
            this.route = this.$route.path
            this.toggleList(this.getBasicIcon)
            this.showIcon()
            if (this.route.includes('users')) {
                this.getJobList()
                this.getDepartment()
            }
        },
        computed: {
            ...mapGetters(['getBasicIcon', 'getUserRole'])
        },
        components: {
            Pagination
        }
    }
</script>

<style lang="scss" type="text/scss">
    .orginizHeader{
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
        .selectDepar{
            .el-input__inner{
                height: rem(30) !important
            }
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .orginizHeader{
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
            margin-top: rem(2);
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
            .selectDepar{
                height: rem(30);
                display: inline-block;
                margin-top: rem(-5);
                margin-left: rem(10);
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
            margin-top: rem(-3);
            .pageSize{
                margin-top: rem(-3);
            }
            span{
                float: right;
                cursor: pointer;
                margin-left: rem(10);
                margin-top: rem(6);
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
