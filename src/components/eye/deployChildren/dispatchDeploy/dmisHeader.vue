<template>
    <div class="dmisHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
            <i class="el-icon-search" @click="startSearch"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
             <el-checkbox v-model="isSelected" @change="selectedAll">全选</el-checkbox>

            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="startPlan"><img src="./../../../../../static/img/start.svg" alt="">启用</el-button>
            <el-button size="mini"plain @click="endPlan"><img src="./../../../../../static/img/stop.svg" alt="">停用</el-button>
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox  label="开始"></el-checkbox>
                <el-checkbox  label="停止"></el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="page">
            <Pagination class="pageSize"></Pagination>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import Pagination from '@/components/public/Pagination'
    export default {
        props:['selectLength', 'listLength'],
        name: "fun-header",
        data () {
            return {
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true,
                searchContent: '',
                filterList: []
            }
        },
        methods: {
            ...mapMutations(['SHOWBASICICON', 'CURRENT_NUM']),
            startSearch () {
                // if (this.searchContent !== '') {
                this.$emit('searchAnything', this.searchContent)
                // }
            },
            addNewInfo () {
                // console.log(this.$route.path, 'opop')

                this.$emit('addNewInfo')
            },
            // selected () {
            //     this.isSelected = !this.isSelected
            //     this.$emit('selectedAll', this.isSelected)
            // },
            deleteCard () {
                this.$emit('deletInfo')
            },
            // toggleList (type) {
            //     this.$emit('toggleList',type)
            // },
            choseType () {
                console.log(this.filterList, 'opopopopopop')
                this.$emit('choseType',this.filterList)
            },

            selectedAll () {
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard () {
                this.$emit('fixedInfo')
            },
            showPersonJob () {
                let date = new Date().getTime()
                let obj = {
                    currentNum: 1
                }
                obj[date] = new Date().getTime()
                this.$store.commit('CURRENT_NUM', obj)
                this.route = this.$route.path
            },
            startPlan () {
                this.$emit('startEndPlan', 'start')

            },
            endPlan () {
                this.$emit('startEndPlan','end')
            }
        },
        watch: {
            '$route' () {
                this.showPersonJob()
            },
            selectLength () {
                if (this.selectLength  === this.listLength && this.listLength > 0) {
                    this.isSelected = true
                } else  {
                    this.isSelected = false
                }
            },
            searchContent () {
                this.startSearch()
            }
        },
        created () {
            this.showPersonJob()
        },
        components: {
            Pagination
        }
    }
</script>

<style lang="scss">
    .dmisHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(14);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
        .el-checkbox-group{
            margin-left: rem(40);
        }
        .el-checkbox+.el-checkbox{
            margin-left: rem(10);
        }
    }
    .lamppostDmis,
    .puriiferDmis,
    .screenDmise,
    .securityDmis,
    .transportDmis,
    .broadcastDmise{
        .personList{
            .el-table{
                font-size: rem(14);
                table{
                    th{
                        background: #f3f3f3;
                        .caret-wrapper{
                                height: rem(22);
                                line-height:rem(22);
                            .sort-caret.ascending{
                                top:0
                            }
                            .sort-caret.descending{
                                bottom:0
                            }
                        }
                    }
                }
                td,th{
                }
                .cell{
                    font-size: rem(14);
                    span{
                        display: inline-block;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    span:hover{
                        color: #54c5f2;
                        cursor:pointer;

                    }
                }
            }
        }
    }

</style>

<style lang="scss" scoped type="text/scss">
    .dmisHeader{
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
                margin-left: rem(-20);
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
                img{
                    width: rem(15);
                    height: rem(15);
                    vertical-align: middle;
                    margin-right: rem(4);
                }
            }
            .el-button.selectedAll{
                padding-bottom: rem(0);
                .el-checkbox__inner{
                    margin-top: rem(0);
                }
            }
            .el-button {
                padding: rem(5) rem(5);
                margin: 0;
                padding-bottom: 0;
            }
        }
        .filite{
            margin-left: rem(150);
            .el-checkbox{
                margin-left: rem(10);
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
