<template>
    <div class="basicType">
        <div class="title">
            设备类型
        </div>
        <div class="personContent">
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="deviceList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            prop="name"
                            label="设备类型名称">
                        </el-table-column>
                        <el-table-column
                            label="是否启用"
                            width="200">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.enable"
                                    active-text="启用"
                                    inactive-text="停用"
                                    @change="startStopState(scope.row.id, scope.row.enable)">
                                </el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapMutations} from 'vuex'
    export default {
        name: 'area-deploy',
        data(){
            return{
                isShowAreaCard: true,
                deviceList: [],
                isShowLoading : false
            }
        },
        methods: {
            ...mapMutations(['SET_DEVICE_TYPE']),
            startStopState (id,state) {
                console.log(state)
                let message
                if (state) {
                    message = '此操作将开启使用该人员类型, 是否继续?'
                } else {
                    message = '此操作将停止使用该人员类型, 是否继续?'
                }
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deviceList = this.deviceList.filter(item => {
                        if (item.id === id) {
                            item.enable = item.enable
                            let obj = {
                                name: item.name,
                                id: item.id,
                                enable: item.enable
                            }
                            api.lib.updateDeviceType(JSON.stringify(obj)).then(res => {
                                console.log(res, '请求成功')
                                if(state) {
                                    this.$message.success('开启使用成功')
                                } else{
                                    this.$message.success('停止使用成功')
                                }
                            }).catch(err => {
                                console.log(err, '请求失败')
                                if(state) {
                                    this.$message.error('取消开启')
                                } else{
                                    this.$message.error('取消禁用')
                                }
                            })
                        }
                        return item
                    })
                    this.$store.commit('SET_DEVICE_TYPE', this.deviceList)
                }).catch(err => {
                    this.deviceList  = this.deviceList.filter(item => {
                        if (item.id === id) {
                            item.enable = !item.enable
                        }
                        return item
                    })
                    this.$message.info('取消')
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async getAllDeviceType () {
                this.isShowLoading = true
                await api.lib.getAllDeviceType().then(res => {
                    console.log(res, '这是请求回来的设备')
                    this.isShowLoading = false
                    this.deviceList = res
                    for (let i = 0; i < this.deviceList.length; i++) {
                        this.deviceList[i].checked = false
                        this.deviceList[i].status = true
                    }
                    this.$store.commit('SET_DEVICE_TYPE', this.deviceList)
                }).catch(err => {
                    console.log(err, '失败')
                    this.isShowLoading = false
                })
            }
        },
        created () {
            this.getAllDeviceType()
        },
        components: {
            ScrollContainer
        }
    }

</script>

<style lang="scss" scoped type="text/scss">
    .basicType{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            padding: rem(17) 0 rem(16) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #74cef2;
            font-weight: 600;
            border-bottom:  1px solid #ccc;
        }
        .personContent{
            flex: 1;
            width: 100%;
            /*background: red;*/
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .personList{
                width: 100%;
                flex: 1;
                margin-top: rem(20);
                .personInfo{
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox{
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                        position: relative;
                        .checkBtn{
                            /*width: rem(15);*/
                            /*height: rem(15);*/
                            /*outline: none;*/
                            /*background: #fff;*/
                            /*background: none;*/
                            position: absolute;
                            right: rem(5);
                            top: rem(0);
                            cursor: pointer;
                        }
                    }
                    .personType{
                        width: 100%;
                        height: rem(20);
                        background: #74cef2;
                        position: relative;
                        font-size: rem(12);
                        img{
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);
                            background: red;
                        }
                        span{
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
                        }
                    }
                    .specificInfo{
                        margin-top: rem(10);
                        font-size: rem(12);
                        overflow: hidden;
                        padding: 0 rem(10);
                        box-sizing: border-box;
                        p{
                            margin-left: rem(10);
                            line-height: rem(22);
                        }
                        .text{
                            margin-left: 0;
                            line-height: rem(22);
                            display: inline-block;
                            width: 100%;
                            height: rem(85);
                            overflow:hidden;
                            text-overflow:ellipsis;
                            display:-webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:4;
                        }
                    }
                }
            }
        }
    }

</style>
