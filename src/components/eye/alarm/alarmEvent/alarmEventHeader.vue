<template>
    <div class="alarmEventHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent" >
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button v-if='isPatrol' size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-checkbox v-model="isSelected" @change="selectedAll">全选</el-checkbox>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="batchEdit"><i class="el-icon-edit"></i>修改</el-button>
            <el-button size="mini" plain @click="batchDownload"><i class="el-icon-download"></i>导出</el-button>

            <div class="checkStyle">
                <el-checkbox-group v-model="filterList" @change="choseType">
                    <el-checkbox v-for="item in statusInfo" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="selectDepar">
                <el-select v-if="!route.includes('warning')" v-model="creator" multiple collapse-tags placeholder="创建人" @change="selectOnwer">
                    <el-option
                        v-for="item in personList"
                        :key="item.id"
                        :label="item.cnName?item.cnName:item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="onwer" multiple collapse-tags placeholder="负责人" @change="selectOnwer">
                    <el-option
                        v-for="item in personList"
                        :key="item.id"
                        :label="item.cnName?item.cnName:item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="page">
            <Pagination class="pageSize"></Pagination>
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
    import {mapGetters,mapMutations} from 'vuex'
    import Pagination from '@/components/public/Pagination'
    export default {
        props: ['choseId','listLength'],
        data () {
            return {
                currentPage3: 1,
                route: '',
                isSelected: false,
                isShowJobType: true,
                isShowIndicatorType: true,
                isShowTrashType: true,
                statusInfo:[],
                filterList:[],
                searchContent: '',
                currentPageNum:1,
                pageAllNum:1,
                isPatrol:false,
                creator: [],
                onwer: [],
                personList: []
            }
        },
        methods: {
            ...mapMutations(['SHOWBASICICON', 'CURRENT_NUM']),
            async getUserInfo () {
                await api.user.getUserInfo().then(res => {
                    console.log(res, '用户信息')
                    this.personList = res
                })
            },
            selectOnwer () {
                console.log(this.onwer,this.creator, 'kokokokokokokoko')
                this.$emit('selectPerson', this.onwer,this.creator)
            },
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
            addNewInfo(){
                this.$emit('addNewInfo')
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
                let date = new Date().getTime()
                let obj = {
                    currentNum: 1
                }
                obj[date] = new Date().getTime()
                this.$store.commit('CURRENT_NUM', obj)
                await api.alarm.getAlarmEventStatus().then(res => {
                    console.log(res, '查询告警事情状态成功')
                    this.statusInfo = res
                }).catch(err => {
                    console.log(err, '查询告警事情状态失败')
                })
            }
        },
        watch: {
            '$route' () {
                this.route = this.$route.path
                this.getUserInfo()
                this.showPersonJob()
            },
            listLength() {
                if (this.listLength > 0) {
                    this.pageAllNum = Math.ceil(this.listLength / 10)
                }
            },
            searchContent () {
                this.startSearch()
            }
        },
        created () {
            this.route = this.$route.path
            let route = this.$route.path
            if(route.includes('patrol')){
                this.isPatrol = true;
            }else{
                this.isPatrol = false;
            }
            this.getUserInfo()
            this.getStatusType();
            this.showPersonJob()
        },
        components: {
            Pagination
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
        .selectDepar{
            .el-input__inner{
                height: rem(30) !important
            }
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
            .selectDepar{
                height: rem(30);
                display: inline-block;
                margin-top: rem(-5);
                margin-left: rem(50);
                float: right;
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
            margin-top: rem(-3);
            .pageSize{
                margin-top: rem(-3);
            }
            span{
                float: right;
                cursor: pointer;
                margin-left: rem(10);
                margin-top: rem(6);
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
