<template>
    <div class="dmisHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
             <el-checkbox v-model="isSelected" @change="selectedAll">全选</el-checkbox>

            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="startPlan"><i class="el-icon-circle-check-outline"></i>开始</el-button>
            <el-button size="mini"plain @click="endPlan"><i class="el-icon-circle-close-outline"></i>停止</el-button>
        </div>

        <div class="page">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm"><i class="el-icon-tickets"></i></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fun-header",
        data () {
            return {
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
                this.$emit('choseType',this.filterList)
            },

            selectedAll () {
                console.log(this.isSelected, 'zhehis')
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard () {
                this.$emit('fixedInfo')
            },
            showPersonJob () {
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
            }
        },
        created () {
            this.showPersonJob()
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
    }
    .personList{
        .el-table{
            font-size: rem(14);
            table{
                th{
                    background: #f3f3f3;
                    .cell{
                        font-size: rem(16);
                        font-weight: 500;
                        color: #333;
                    }
                }
            }
            td,th{
                padding: 5px 0;
            }
            .cell{
                font-size: rem(14);
                span:hover{
                    color: #54c5f2;
                    cursor:pointer;
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
