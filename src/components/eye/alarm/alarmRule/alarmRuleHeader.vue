<template>
    <div class="ruleHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-checkbox v-model="isSelected" @change="selectedAll">全选</el-checkbox>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini" plain @click="batchDownload"><i class="el-icon-download"></i>导出</el-button>
            <el-button v-if="!route.includes('firefighting') && !route.includes('crossborder')" size="mini"plain @click="batchEdit"><i class="el-icon-edit"></i>批量修改</el-button>
            <el-button size="mini"plain @click="batchEnabled(true)"><i class="el-icon-circle-check"></i>批量启用</el-button>
            <el-button size="mini"plain @click="batchEnabled(false)"><i class="el-icon-circle-close"></i>批量停用</el-button>
        </div>

        <div class="page">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        props: ['choseId','listsLength'],
        data () {
            return {
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true,
                alarmType:[]
            }
        },
        methods: {
            selected () {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            selectedAll () {
                this.$emit('selectedAll', this.isSelected)
            },
            batchEdit () {
                this.$emit('batchEdit','batchEdit')
            },
            batchEnabled(flag){
                this.$emit('batchEnabled',flag)
            },
            addNewInfo(){
                this.$emit('addNewInfo')
            },
            showPersonJob () {
                this.route = this.$route.path
            },
            batchDownload(){
                if(this.listsLength == 0){
                    this.$message.error('没有数据导出,添加后再试')
                    return
                }
                let alarmTypeId
                let route = this.$route.path
                if (route.includes('alarmcolumn')) {
                    alarmTypeId = this.getAlarmTypeId('报警柱')
                }else if(route.includes('firefighting')){
                    alarmTypeId = this.getAlarmTypeId('消防')
                }else if(route.includes('crossborder')){
                    alarmTypeId = this.getAlarmTypeId('越界')
                }else if(route.includes('speeding')){
                    alarmTypeId = this.getAlarmTypeId('超速')
                } else if(route.includes('offtrack')){
                    alarmTypeId = this.getAlarmTypeId('偏离轨迹')
                }else if(route.includes('overlimit')){
                    alarmTypeId = this.getAlarmTypeId('客流量')
                }else if(route.includes('waterlevel')){
                    alarmTypeId = this.getAlarmTypeId('水位')
                }else if(route.includes('condition')){
                    alarmTypeId = this.getAlarmTypeId('环境')
                }

                if (this.choseId.length > 0) {

                    api.alarm.exportSelectedAlarmRules({ids : this.choseId},alarmTypeId).then((res) =>{
                        const content = res
                        const blob = new Blob([content])
                        const fileName = 'data.csv'
                        if('download' in document.createElement('a')){
                            const elink = document.createElement('a')
                            elink.download = fileName
                            elink.style.display = 'none'
                            elink.href = URL.createObjectURL(blob)
                            document.body.appendChild(elink)
                            elink.click()
                            URL.revokeObjectURL(elink.href) // 释放URL 对象
                            document.body.removeChild(elink)
                        }else{
                            navigator.msSaveBlob(blob, fileName)
                        }
                        this.$message.success('导出成功')
                    }).catch(err =>{
                        this.$message.error('导出失败，请稍后再试')
                    })
                } else {
                    api.alarm.exportAlarmRules(alarmTypeId).then((res) => {
                        const content = res
                        const blob = new Blob([content])
                        const fileName = 'data.csv'
                        if('download' in document.createElement('a')){
                            const elink = document.createElement('a')
                            elink.download = fileName
                            elink.style.display = 'none'
                            elink.href = URL.createObjectURL(blob)
                            document.body.appendChild(elink)
                            elink.click()
                            URL.revokeObjectURL(elink.href) // 释放URL 对象
                            document.body.removeChild(elink)
                        }else{
                            navigator.msSaveBlob(blob, fileName)
                        }
                        this.$message.success('导出成功')
                    }).catch(err => {
                        this.$message.error('导出失败，请稍后再试')
                    })
                }

            },
            getAlarmTypeId(typeName){
                let typeInfo =  this.alarmType.filter(item=>item.name == typeName)
                return typeInfo[0].id;
            },
            async getAllAlarmTypes(){
                await api.alarm.getAllAlarmTypes().then(res => {
                    this.alarmType = res;
                }).catch(err => {
                })
            },
        },
        watch: {
            '$route' () {
                this.showPersonJob()
            }
        },
        created () {
            this.getAllAlarmTypes()
            this.showPersonJob()
        }
    }
</script>

<style lang="scss">
    .ruleHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(14);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
    }
    .condition,
    .crossborder,
    .firefighting,
    .offtrack,
    .overlimit,
    .waterlevel,
    .speeding,
    .alarmcolumn{
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
    }

</style>

<style lang="scss" scoped type="text/scss">
    .ruleHeader{
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
