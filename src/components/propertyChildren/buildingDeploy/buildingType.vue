<template>
    <div class="buildingType">
        <div class="title">
            建筑类型
        </div>
        <div class="personContent">
            <div class="funcTitle" v-if="false">
                <Header @addNewInfo="addNewInfo"
                        @deletInfo="deletInfo"
                        @toggleList="toggleList"
                        @selectedAll='selectedAll'
                        @fixedInfo='fixedInfo'>
                </Header>
            </div>
            <div class="personList" v-loading="isShowLoading">
                <ScrollContainer>
                    <el-table
                        ref="multipleTable"
                        :data="buildingList"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="建筑类型"
                            width="960">
                        </el-table-column>

                        <el-table-column>
                        </el-table-column>
                    </el-table>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>
<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import Header from '@/components/propertyChildren/basicDeploy/funHeader'

    export default {
        name: 'building-type',
        data() {
            return {
                isShowPersonCard: true,
                checkList: [],
                filterList: [],
                choseInfoId: [],
                choseList: [],
                isDisabled: true,
                title: '',
                isShowLoading: false,
                buildingList: [{
                    name: '地标性建筑',
                },
                    {name: '服务性建筑'}
                ]
            }
        },
        methods: {
        },
        created() {
        },
        components: {
            ScrollContainer,
            Header,
        },

    }
</script>

<style lang="scss" scoped type="text/scss">
    .buildingType {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #4ac4f2;
            font-weight: 600;
            border-bottom: 1px solid #ccc;
        }
        .personContent {
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
                border-bottom: 1px solid #a13309;
            }
            .personList {
                width: 100%;
                flex: 1;
                /*margin-top: rem(20);*/
                .personInfo {
                    width: rem(210);
                    height: rem(140);
                    border: 1px solid #ccc;
                    font-size: rem(14);
                    display: inline-block;
                    margin-right: rem(5.5);
                    margin-bottom: rem(5);
                    border-radius: rem(5);
                    .checkBox {
                        width: 100%;
                        height: rem(20);
                        background: #fff;
                        border-top-left-radius: rem(5);
                        border-top-right-radius: rem(5);
                        position: relative;
                        .checkBtn {
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
                    .personType {
                        width: 100%;
                        height: rem(20);
                        background: #0086b3;
                        position: relative;
                        font-size: rem(12);
                        img {
                            width: rem(40);
                            height: rem(40);
                            border-radius: 50%;
                            position: absolute;
                            left: rem(15);
                            top: rem(-10);
                            background: red;
                        }
                        span {
                            float: right;
                            margin-right: rem(20);
                            line-height: rem(20);
                            color: #fff;
                        }
                    }
                    .specificInfo {
                        margin-top: rem(5);
                        font-size: rem(12);
                        p {
                            margin-left: rem(10);
                            line-height: rem(22);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }

</style>

