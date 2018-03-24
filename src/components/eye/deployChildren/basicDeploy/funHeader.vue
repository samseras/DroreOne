<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-button size="mini"plain><i class="el-icon-circle-check"></i>全选</el-button>
            <el-button size="mini"plain>导入</el-button>
            <el-button size="mini"plain>导出</el-button>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <div class="filite">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in typeList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="page">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm" @click="toggleList('list')"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fun-header",
        data () {
            return {
                filterList: [],
                typeList: [
                    {type: '安保'},
                    {type: '售票'},
                    {type: '保洁'},
                    {type: '司机'},
                    {type: '船夫'},
                    {type: '检票'}
                ]
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
            toggleList (type) {
                this.$emit('toggleList',type)
            },
            choseType () {
                this.$emit('choseType',this.filterList)
            }
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
            .el-button {
                padding: rem(5) rem(5);
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
                    color: #a13309;
                }
            }
        }
    }
</style>
