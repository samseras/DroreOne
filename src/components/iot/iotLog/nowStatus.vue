<template>
    <div class="iot-home">
        {{message}}
        <button @click="hallo" ref="anniu">按钮</button>
        <div class="basic-show">

            <el-form  :model="formInline"  >
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="好吃的">
                    <el-select v-model="formInline.initialFood" multiple placeholder="请选择" @change="selectEvent">
                        <el-option
                            v-for="item in formInline.foods"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市选择">
                    <!--限制选择个数和全选只能用一个-->
                    <el-checkbox-group
                        v-model="formInline.checkedCities1"
                        @change="checkEvent"
                        :min="1"
                        :max="2">
                        <el-checkbox v-for="city in (formInline.cities)" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!--<el-form-item label="大小值" >
                    <el-input-number v-model="formInline.small" :max="10" :min="0" placeholder="请输入内容"  style="width:20%"></el-input-number>-<el-input-number style="width:20%" :max="100" :min="11"  v-model="formInline.big" placeholder="请输入内容"></el-input-number>
                </el-form-item>-->
                <el-form-item label="大小值" >
                    <el-input v-model="formInline.small" type="number"  placeholder="请输入内容"  style="width:20%"></el-input>-<el-input style="width:20%"   type="number" v-model="formInline.big" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="时间范围">
                    <div class="block">
                        <el-date-picker
                            @change="timeSelect"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :picker-options="fastPicker"
                            v-model="formInline.valueTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <template>

                <br>

            </template>
        </div>
    </div>
</template>

<script>

    import api from '@/api'
    export default {
        name: "iotHome",
        data: function () {
            return {

                fastPicker: {  //快捷选项
                    shortcuts: [
                    ]
                },
                message: 'this is test',
                formInline: {

                    valueTime: ["2018-06-18 12:00:00", "2018-06-21 12:22:11"],  //初始默认时间
                    fastDatePick:['week','month','threeMonths'],   //任意配一周，一月，三月，


                    small: '2', //大小范围区间
                    big: '8',

                    user: '',

                    foods: [{
                        value: '黄金糕',
                        label: '黄金糕'
                    }, {
                        value: '双皮奶',
                        label: '双皮奶'
                    }, {
                        value: '蚵仔煎',
                        label: '蚵仔煎'
                    }, {
                        value: '龙须面',
                        label: '龙须面'
                    }, {
                        value: '北京烤鸭',
                        label: '北京烤鸭'
                    }],
                    initialFood: [],  //下拉框默认值选中

                    checkedCities1: ['上海', '北京'],   //多选默认值选中
                    cities: ['上海', '北京', '广州', '深圳']
                }


            }
        },
        methods:{
            hallo(){
                this.$refs.anniu.innerText=this.message;
            },
            timeSelect(val){
                console.log(val);
            },
            selectEvent(val){
                console.log(val);
            },
            checkEvent(val){
                console.log(val);
            },
            onSubmit(val) {
                console.log(this.formInline,'提交的东西');
            }

        },
        created () {


            if(this.formInline.fastDatePick.length>0){
                this.formInline.fastDatePick.forEach(item=>{
                    console.log(item);
                    let timeText='';
                    let timeFlag=0;
                    if(item==='week'){
                        timeText='一周内';
                        timeFlag=7;
                    }else if(item==='month'){
                        timeText='一月内';
                        timeFlag=30;
                    }else if(item==='threeMonths'){
                        timeText='三月内';
                        timeFlag=90;
                    }else{

                    }
                    let timeObj = {
                        text:timeText,
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * timeFlag);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                    this.fastPicker.shortcuts.push(timeObj);

                })
                console.log(this.formInline);

            }


        },
        components: {

        }
    }
</script>

<style lang="scss" type="text/scss" >
    .iot-home{
        margin:rem(16);
        .basic-show{
            border:1px solid red;
            width:100%;
            height:rem(480);
            .el-row {
                margin-bottom: 20px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .el-col {
                border-radius: 4px;
            }
            .bg-purple-dark {
                background: #99a9bf;
            }
            .bg-purple {
                background: #d3dce6;
            }
            .bg-purple-light {
                background: #e5e9f2;
            }
            .grid-content {
                border-radius: 4px;
                min-height: 36px;
            }
            .row-bg {
                padding: 10px 0;
                background-color: #f9fafc;
            }
            .test{
                width:500px;
                height:300px;
                border:1px solid red;
            }
        }
    }
</style>
