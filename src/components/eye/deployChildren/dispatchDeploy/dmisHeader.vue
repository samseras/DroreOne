<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-checkbox v-model="isSelected" @change="selectedAll"  class='selectedAll' >全选</el-checkbox>
            <!--<el-button size="mini"plain>导入</el-button>-->
            <!--<el-button size="mini"plain>导出</el-button>-->
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <!--<el-button size="mini"plain @click="fixCard"><i class="el-icon-edit"></i>修改</el-button>-->
        </div>
        <div class="filite" v-if="route.includes('person')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in personTypeList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('hardware')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in indicatorType" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="page">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm"><i class="el-icon-tickets"></i></span>
            <!--<span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "fun-header",
        data () {
            return {
                filterList: [],
                personTypeList: [
                    {type: '安保'},
                    {type: '售票'},
                    {type: '保洁'},
                    {type: '检票'}
                ],
                indicatorType: [
                    {type: '广播'},
                    {type: '路灯'},
                    {type: 'LED'}
                ],
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true
            }
        },
        methods: {
            addNewInfo () {
                // console.log(this.$route.path, 'opop')

                this.$emit('addNewInfo')
            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            // toggleList (type) {
            //     this.$emit('toggleList',type)
            // },
            choseType () {
                this.$emit('choseType',this.filterList)
            },
            selectedAll () {
                // this.isSelected = !this.isSelected
                console.log(this.isSelected, 'zhehis')
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard () {
                this.$emit('fixedInfo')
            },
            showPersonJob () {
                this.route = this.$route.path
                // if (route.includes('person')){
                //     this.isShowJobType = true
                //     this.isShowIndicatorType = false
                //     this.isShowTrashType = false
                // } else if (route.includes('indicator')){
                //     this.isShowJobType = false
                //     this.isShowIndicatorType = true
                // } else {
                //     this.isShowJobType = false
                //     this.isShowIndicatorType = false
                // }
            }
        },
        watch: {
            '$route' () {
                this.showPersonJob()
            }
        },
        created () {
            this.showPersonJob()
        }
    }
</script>

<style lang="scss">
    .funHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(5);
        }
    }
    .personList{
        .el-table{
            font-size: rem(14);
            table{
                th{
                    background: #f3f3f3;
                    .cell{
                        font-size: rem(14);
                        font-weight: 500;
                        color: #333;
                    }
                }
            }
            td,th{
                padding: 5px 0;
            }
            .el-table-column--selection{
                .cell{
                    position: relative;
                    top: 4px;
                }
            }
            .cell{
                font-size: rem(12);
                span:hover{
                    color: #54c5f2;
                    cursor:pointer;
                }
            }
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
                    color: #a13309;
                }
            }
        }
    }
</style>
