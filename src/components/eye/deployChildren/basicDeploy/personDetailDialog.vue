<template>
    <div class="personDetail">
        <el-dialog
            title="人员信息"
            :visible="visible"
            :before-close="closeDialog"
            width="22%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <div class="cardContent">
                    <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text"v-model="name"></p>
                    <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<input type="text"v-model="sex"></p>
                    <p class="type">人员角色：<input type="text"v-model="type"></p>
                    <p class="idNum">身份证号：<input type="text"v-model="idNum"></p>
                    <p class="phoneNum">电话号码：<input type="text"v-model="phoneNum"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold">保存</el-button>
                <el-button size="mini">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "person-detail",
        props: ['visible', 'personInfo'],
        data () {
            return {
                name:'',
                sex:'',
                idNum:'',
                type: '',
                phoneNum:'',
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
        }
    }
</script>
<style lang="scss">
    .personDetail{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header{
            padding: rem(5) 0 0 rem(5);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(7);
        }
        .el-dialog__body{
            padding: rem(10) rem(15) 0 rem(15);
            box-sizing: border-box;

        }
        .el-dialog__footer{
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer{
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .personDetail{
        .card{
            width: 100%;
            height: 100%;
            .cardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(5);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(14);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                    }
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(0);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        background: red;
                        border-radius: 50%;
                        margin-left: rem(25);
                    }
                }
            }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
    }
</style>
