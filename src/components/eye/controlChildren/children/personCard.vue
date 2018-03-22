<template>
    <div class="personCard">
        <div class="information">
            <div class="information-tiitle">
                <h5>安保人员信息</h5>
                <p @click="closePersonCard">×</p>
            </div>
            <div class="information-main">
                <p>姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>王某某</span></p>
                <p>电 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<span>15209284419</span></p>
                <p>班 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次：<span>上午09：00-下午18：00</span></p>
                <p class="queryTime">查询时间：<input type="datetime-local"/><input type="datetime-local"/></p>
                <p class="timeFrame">快速查询:
                    <el-select v-model="value" placeholder="最近一个小时" size="mini" style="width:84%;">
                        <el-option v-for="item in timeFrame" :key="item.value" :label="item.label" :value="item.value"
                                   size="small">
                            <el-checkbox style="margin-left: 10px;color: #949494;">{{item.label}}</el-checkbox>
                        </el-option>
                    </el-select>
                </p>
            </div>
            <div class="information-footer">
                <button class="cancel" @click="closePersonCard">取消</button>
                <button class="refer">查询</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "person-card",
        data () {
            return {
                timeFrame: [
                    {value: '选项11', label: '最近一个小时'},
                    {value: '选项2', label: '最近三个小时'},
                    {value: '选项3', label: '最近一天'},
                    {value: '选项4', label: '最近三天'},
                    {value: '选项5', label: '最近一周'}
                ],
                value: '',
            }
        },
        methods: {
            closePersonCard () {
                this.$emit('closePersonCard')
            }
        }
    }
</script>

<style lang="scss" scoped type="text/css">
    .personCard{
        width: 100%;
        height: 100%;
    }
    .information {
        width: 500px;
        height: 350px;
        background: #fff;
    }

    .information-tiitle {
        width: 100%;
        height: 35px;
        line-height: 35px;
        background: #fafafa;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
    }

    .information-tiitle h5 {
        margin-left: 15px;
        color: #646464;
    }

    .information-tiitle p {
        margin-right: 15px;
        font-size: 24px;
        color: #888;
    }

    .information-main {
        width: 100%;
        height: 270px;
        border-bottom: 1px solid #e6e6e6;
    }

    .information-main p:first-child {
        margin-top: 10px;
    }

    .information-main p {
        width: 90%;
        margin: 0 auto;
        line-height: 35px;
        color: #646464;
        font-size: 14px;
    }

    .queryTime input {
        width: 180px;
        border: 1px solid #e6e6e6;
        background: #fafafa;
        height: 20px;
        line-height: 20px;
        text-indent: 10px;
    }

    .queryTime input:last-child {
        margin-left: 10px;
    }

    .timeFrame {
        width: 100%;
    }

    .information-footer {
        width: 100%;
        height: 35px;
        line-height: 35px;
    }

    .information-footer button {
        width: 75px;
        height: 22px;
        border: 1px solid #dfdfdf;
        background: none;
        text-align: center;
        font-size: 12px;
    }

    .information-footer button:first-child {
        margin-left: 300px;
    }

    .information-footer button:last-child {
        background: #26bbf0;
        color: #ffffff;
    }

</style>
