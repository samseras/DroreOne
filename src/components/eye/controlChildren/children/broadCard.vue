<template>
    <div class="broadCard">
        <div class="newagenda">
            <div class="newagenda-entrance" v-if="!isShowAddAgenda">
                <div class="newagenda-tiitle">
                    <h5>新建议程</h5>
                    <p id="hideAgenda" @click="hideagenda">×</p>
                </div>
                <div class="newagenda-main">
                    <p>议程列表：</p>
                    <ul>
                        <li>
                            <p @click="addagenda">＋</p>
                            <span>×</span>
                        </li>
                        <li>
                            <div>
                                <p>下午下班</p>
                                <p>12：00</p>
                                <p>周一到周五</p>
                            </div>
                            <span>×</span>

                        </li>
                        <li>
                            <div>
                                <p>下午下班</p>
                                <p>12：00</p>
                                <p>周一到周五</p>
                            </div>
                            <span>×</span>
                        </li>
                        <li>
                            <div>
                                <p>下午下班</p>
                                <p>12：00</p>
                                <p>周一到周五</p>
                            </div>
                            <span>×</span>
                        </li>
                    </ul>
                </div>
                <div class="newagenda-footer">
                    <button id="cancel" @click="hideagenda">取消</button>
                    <button id="save">保存</button>
                </div>
            </div>

            <!--添加议程-->
            <div class="addagenda" v-if="isShowAddAgenda">
                <div class="newagenda-tiitle">
                    <h5>议程编辑</h5>
                    <p @click="lastStep">×</p>
                </div>
                <div class="addagenda-main">
                    <p class="agendaName">议程名称：<input type="text" placeholder="议程名称"/></p>
                    <p class="agendaName">所选广播：</p>
                    <div class="zTreeDemoBackground left">
                        <ul id="addagenda" class="ztree"></ul>
                    </div>
                    <p class="tactics">执行策略：
                        <input type="text" value="12:00"/>
                        <!--哪天执行-->
                        <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                                       size="small"></el-option>
                        </el-select>
                    </p>
                    <p class="music">定义曲目:
                        <el-select v-model="value" placeholder="请选择" size="mini">
                            <el-option v-for="item in optionMisic" :key="item.value" :label="item.label"
                                       :value="item.value" size="small">

                            </el-option>
                        </el-select>
                        <button>本地上传</button>
                    </p>
                </div>
                <div class="addagenda-footer">
                    <button class="back" @click="lastStep">上一步</button>
                    <button class="save" @click="saveagenda">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "broad-card",
        data() {
            return {
                options: [
                    {value: '选项1', label: '周一'},
                    {value: '选项2', label: '周二'},
                    {value: '选项3', label: '周三'},
                    {value: '选项4', label: '周四'},
                    {value: '选项5', label: '周五'},
                    {value: '选项6', label: '周六'},
                    {value: '选项7', label: '周天'}
                ],
                value: '',
                optionMisic: [
                    {value: '选项1', label: '曲目1'},
                    {value: '选项2', label: '曲目2'},
                    {value: '选项3', label: '曲目3'},
                    {value: '选项4', label: '曲目4'},
                    {value: '选项5', label: '曲目5'},
                    {value: '选项6', label: '曲目6'}
                ],
                isShowAddAgenda: false
            }
        },
        methods: {
            hideagenda() {
                this.$emit('closeBroadCard')
            },
            addagenda() {
                this.isShowAddAgenda = !this.isShowAddAgenda
            },
            lastStep() {
                this.addagenda()
            },
            saveagenda () {
                this.lastStep()
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .broadCard {
        width: 100%;
        height: 100%;
    }

    .newagenda {
        width: rem(500);
        height: rem(350);
        background: #fff;
        border-radius: rem(8);
    }
    .newagenda-entrance {
        width: 100%;
        height: 100%;
    }

    .newagenda-tiitle, .addagenda-tiitle {
        display: flex;
        color: #929292;
        justify-content: space-between;
        width: 100%;
        line-height: 35px;
        background: #fafafa;
        border-bottom: 1px solid #e6e6e6;
        border-top-left-radius: rem(8);
        border-top-right-radius: rem(8);
    }

    .newagenda-tiitle h5 {
        margin-left: 15px;
    }

    .newagenda-tiitle p {
        font-size: 24px;
        margin-right: 15px;
    }

    .newagenda-main {
        height: 255.8px;
        margin-left: 20px;
        color: #898989;
        font-size: 12px;
    }

    .newagenda-main > p {
        width: 100%;
        margin-top: 15px;
        line-height: 30px;
        font-size: 14px;
    }

    .newagenda-main > ul {
        margin-left: 16%;
        display: flex;
        flex-wrap: wrap;
        width: 84%;
    }

    .newagenda-main > ul > li {
        position: relative;
        width: 42%;
        height: 65px;
        border: 1px dashed #e0e0e0;
        margin-right: 5%;
        margin-bottom: 5%;
    }

    .newagenda-main > ul > li span {
        position: absolute;
        font-size: 24px;
        color: #e6605c;
        right: 10px;
        top: 0px;
    }

    .newagenda-main > ul > li:first-child p {
        width: 100%;
        line-height: 65px;
        font-size: 30px;
        text-align: center;
        color: #e0e0e0;
    }

    .newagenda-main > ul > li > div {
        width: 100%;
        height: 65px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
    }

    .newagenda-main > ul > li > div > p {
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #e8e8e8;
        margin: 0 11px 0px 11px;
    }

    .newagenda-main > ul > li > div > p:first-child {
        margin-right: 30px;
    }

    .newagenda-footer {
        width: 100%;
        line-height: 45px;
        border-top: 1px solid #e6e6e6;
    }

    .newagenda-footer button {
        width: 70px;
        line-height: 25px;
        text-align: center;
        border: none;
        color: #a8a8a8;
    }

    #cancel {
        background: none;
        border: 1px solid #dfdfdf;
        margin-left: 55%;
        margin-right: 10px;
    }

    #save {
        background: #26bbf0;
        color: #fff;
    }

    .addagenda {
        background: #fff;
        /*display: none;*/
        color: #717171;
        border-radius: rem(8);
    }

    .addagenda-main {
        width: 100%;
        height: 270px;
        border-bottom: 1px solid #e6e6e6;
    }

    .addagenda-main > p {
        margin-left: 10%;
        font-size: 12px;
    }

    .agendaName {
        width: 90%;
        margin: 10px auto;
    }

    .agendaName input {
        width: 84%;
        height: 20px;
        border: 1px solid #e6e6e6;
        background: #fafafa;
        font-size: 12px;
        color: #717171;
        text-indent: 20px;
        border-radius: 3px;
    }

    #addagenda {
        display: flex;
        flex-wrap: wrap;
        margin-left: 10%;
    }

    .tactics {
        display: flex;
        margin: 10px 0;
        line-height: 30px;
    }

    .tactics input {
        width: 130px;
        text-align: center;
        color: #b0b0b0;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        margin-right: 10px;
    }

    .tactics .el-select {
        width: 150px;
        background: #fafafa;
    }

    .music {
        display: flex;
        line-height: 30px;
    }

    .music .el-select {
        width: 230px;
        margin: 0 10px;
    }

    .music button {
        width: 80px;
        height: 26px;
        background: #26bbf0;
        color: #fff;
        border: none;
        border-radius: 3px;
    }

    .addagenda-footer {
        width: 100%;
        line-height: 35px;
        border-top: 1px solid #e6e6e6;
    }

    .addagenda-footer button {
        width: 70px;
        line-height: 25px;
        text-align: center;
        border: none;
        color: #a8a8a8;
    }

    .addagenda-footer .back {
        background: none;
        border: 1px solid #dfdfdf;
        margin-left: 60%;
        margin-right: 10px;
    }

    .addagenda-footer .save {
        background: #26bbf0;
        color: #fff;
    }

</style>
