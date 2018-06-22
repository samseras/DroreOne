<template>
    <div class="alarmEventHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent" @keyup="startSearch">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">

            <el-checkbox v-model="isSelected" @change="selectedAll">全选</el-checkbox>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="batchEdit"><i class="el-icon-edit"></i>修改</el-button>
            <el-button size="mini" plain @click="batchDownload"><i class="el-icon-download"></i>导出</el-button>

        </div>
        <div class="checkStyle">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in statusInfo" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="page">
            <span>当前第{{currentPageNum}}页/共{{pageAllNum}}页</span>
            <span class="upPage"@click="previousPage"><</span>
            <span class="downPage" @click="nextPage">></span>
        </div>

        <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPageNum"-->
            <!--:page-sizes="[10, 20]"-->
            <!--:page-size="10"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="listLength">-->
        <!--</el-pagination>-->
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        props: ['choseId','listLength'],
        data () {
            return {
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true,
                statusInfo:[],
                filterList:[],
                searchContent: '',
                currentPageNum:1,
                pageAllNum:1
            }
        },
        methods: {
            startSearch(){
                console.log(this.searchContent)
                this.$emit('searchAnything',this.searchContent)
            },
            selected () {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            choseType () {
                this.$emit('choseType',this.filterList)
            },
            selectedAll () {
                this.$emit('selectedAll', this.isSelected)
            },
            batchEdit () {
                console.log('batchEdit')
                this.$emit('batchEdit','batchEdit')
            },
            showPersonJob () {
                this.route = this.$route.path

            },
            batchDownload(){
                if(this.listLength == 0){
                    this.$message.error('没有数据导出,添加后再试')
                    return
                }

                if (this.choseId.length > 0) {
                    api.alarm.exportSelectedAlarmEvents({ids : this.choseId}).then((res) =>{
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
                    api.alarm.exportAlarmEvents().then((res) => {
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
            async getStatusType(){
                await api.alarm.getAlarmEventStatus().then(res => {
                    console.log(res, '查询告警事情状态成功')
                    this.statusInfo = res
                }).catch(err => {
                    console.log(err, '查询告警事情状态失败')
                })
            },
            previousPage() {//上一页
                this.currentPageNum--
                if (this.currentPageNum < 1) {
                    this.currentPageNum = 1
                    return
                }
                this.$emit('previousPage', this.currentPageNum)
            },
            nextPage() {//下一页
                this.currentPageNum++
                if (this.currentPageNum > this.pageAllNum) {
                    this.currentPageNum = this.pageAllNum
                    return
                }
                this.$emit('nextPage', this.currentPageNum)
            }
        },
        watch: {
            '$route' () {
                this.showPersonJob()
            },
            listLength() {
                if (this.listLength > 0) {
                    this.pageAllNum = Math.ceil(this.listLength / 10)
                }
            }
        },
        created () {
            this.getStatusType();
            this.showPersonJob()
        }
    }
</script>

<style lang="scss">
    .alarmEventHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
    }
    .warningEvent{
    .personList{
        .el-table{
            font-size: rem(14);
            table{
                th{
                    background: #f3f3f3;
                    /*.cell{*/
                        /*font-size: rem(16);*/
                        /*font-weight: 500;*/
                        /*color: #333;*/
                    /*}*/
                    .caret-wrapper{
                        height: rem(22);
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
    .alarmEventHeader{
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
        .checkStyle{
            margin-left: rem(50);
            .el-checkbox{
                margin-left: rem(10);
                margin-bottom: rem(2);
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
