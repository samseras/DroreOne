<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
        </div>
        <div class="page">
            <span>当前第1页/共1页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
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
            }
        },
        watch: {
        },
        created() {
        },
        computed: {
        }
    }
</script>

<style lang="scss" type="text/scss">
    .funHeader{
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
