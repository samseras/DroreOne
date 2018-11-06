<template>
    <div class="dmisHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything"  v-model="searchContent">
            <i class="el-icon-search" @click="startSearch"></i>
        </div>
        <div class="funcBtn" v-if="route.includes('punch')">
            <div class="checkStyle">
                <el-checkbox-group v-model="filterList" @change="choseType">
                    <el-checkbox v-for="item in statusList" :label="item.type" :key="item.type"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="selectDate">
                <el-date-picker
                    v-model="dateRange"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="dateCheck">
                </el-date-picker>
            </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "fun-header",
        data () {
            return {
                dateRange:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                filterList: [],
                statusList:[
                    {type: '正常'},
                    {type: '异常'}
                ],
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true,
                searchContent:''
            }
        },
        methods: {
            startSearch () {
                // if (this.searchContent !== '') {
                this.$emit('searchAnything', this.searchContent)
                // }
            },
            dateCheck(val){
                let status = ''
                if(this.filterList.length == 1){
                    if(this.filterList[0] == "正常"){
                        status = 'NORMAL'
                    }else{
                        status = 'ABNORMAL'
                    }
                }
                let filterObj ={
                    "entityId":null,
                    "from":this.dateRange.length>0 ? this.dateRange[0] : '',
                    "to":this.dateRange.length>0 ? this.dateRange[1] : '',
                    "status":status
                }
                this.$emit('choseType',filterObj)
            },
            choseType () {
                if(this.filterList.length == 1){
                    if(this.filterList[0] == "正常"){
                        status = 'false'
                    }else{
                        status = 'true'
                    }
                }else{
                    status = null
                }
                let filterObj ={
                    "entityId":null,
                    "from":this.dateRange.length>0 ? this.dateRange[0] : '',
                    "to":this.dateRange.length>0 ? this.dateRange[1] : '',
                    "status":status
                }
                this.$emit('choseType',filterObj)
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
    .dmisHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
        .selectDate{
            .el-input__inner{
                height: rem(30) !important;
                line-height: 15px;
            }
            .el-range-editor.el-input__inner{
                padding:0;
                .el-range-input{
                    height:89%;
                }
            }
        }
    }
    .punchRecord{
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
            .selectDate{
                height: rem(30);
                display: inline-block;
                margin-top: rem(-10);
                margin-left: rem(50);
                float: right;
                span{
                    font-size: rem(14);
                }
            }
            .checkStyle{
                margin-left: rem(30);
                .el-checkbox{
                    margin-left: rem(10);
                    margin-bottom: rem(2);
                }
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
