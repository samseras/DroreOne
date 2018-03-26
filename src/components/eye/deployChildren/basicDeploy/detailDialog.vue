<template>
    <div class="detailDialog">
        <el-dialog
            title="人员信息"
            :visible="visible"
            :before-close="closeDialog"
            width="22%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <div class="personCardContent" v-if="false">
                    <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text"v-model="name"></p>
                    <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<input type="text"v-model="sex"></p>
                    <p class="type">
                        人员角色： <select name="" v-model="type">
                        <option v-for="item in options" :value="item.type">{{item.type}}</option>
                        </select>
                    </p>
                    <p class="idNum">身份证号：<input type="text"v-model="idNum"></p>
                    <p class="phoneNum">电话号码：<input type="text"v-model="phone"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="personCardContent boatCardContent" >
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="name"></p>
                    <p class="sex">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text"v-model="sex"></p>
                    <p class="type">
                        维护状态： <select name="" v-model="type">
                        <option  value="正常">正常</option>
                        <option  value="异常">异常</option>
                    </select>
                    </p>
                    <p class="idNum">购买时间：<input type="text"v-model="idNum"></p>
                    <p class="phoneNum">维护时间：<input type="text"v-model="phone"></p>
                    <p class="phoneNum">驾驶人员：<input type="text"v-model="phone"></p>
                    <p class="phoneNum">维护时间：<input type="text"v-model="phone"></p>
                    <p class="phoneNum">联系电话：<input type="text"v-model="phone"></p>
                    <p class="phoneNum">设备号码：<input type="text"v-model="phone"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled='isDisabled'>保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "person-detail",
        props: ['visible', 'personInfo','isDisabled'],
        data () {
            return {
                name:'',
                sex:'',
                idNum:'',
                type: '',
                phone:'',
                options: [
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
            select () {
                console.log(this.type, 'klklkl')
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {
                    name: this.name,
                    sex: this.sex,
                    idNum: this.idNum,
                    type: this.type,
                    phone: this.phone,
                    status: true,
                    checked: false
                }
                if (this.personInfo.id) {
                    newInfo.id = this.personInfo.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewPerson', newInfo)
                }
                this.closeDialog()
            }
        },
        created () {
            console.log(this.personInfo,'  opopop')
            this.name = this.personInfo.name
            this.sex = this.personInfo.sex
            this.idNum = this.personInfo.idNum
            this.type = this.personInfo.type
            this.phone = this.personInfo.phone
        }
    }
</script>
<style lang="scss">
    .detailDialog{
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
    .detailDialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
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
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
                        option{
                            appearance:none;
                            list-style: none;
                            border: none;
                            width: 100%;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            /*border:  1px solid #ccc;*/
                            background: #fff;

                        }
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
