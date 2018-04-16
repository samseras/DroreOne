<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="Search Anything">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>
            <el-button size="mini"plain class='selectedAll' @click="selected">
                <el-checkbox v-model="isSelected" @change="selectedAll"></el-checkbox>全选
            </el-button>
            <el-button size="mini"plain>导入</el-button>
            <el-button size="mini"plain>导出</el-button>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="fixCard"><i class="el-icon-delete"></i>修改</el-button>
        </div>
        <div class="filite" v-if="route.includes('person')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in personTypeList" :label="item.name"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('indicator')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in indicatorType" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('trash')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in trashType" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('shop')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in shopType" :label="item.businessType.name"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="filite" v-if="route.includes('park')">
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in parkType" :label="item.type | packFilter"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="page">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm" @click="toggleList('list')"><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "fun-header",
        data () {
            return {
                filterList: [],
                personTypeList: [],
                indicatorType: [
                    {type: '设施'},
                    {type: '路线'},
                    {type: '标语'}
                ],
                trashType: [
                    {type: '临时'},
                    {type: '固定'}
                ],
                shopType: [],
                parkType: [
                    {type: '0'},
                    {type: '1'}
                ],
                route: '',
                isSelected: false,
            }
        },
        methods: {
            addNewInfo () {
                // console.log(this.$route.path, 'opop')
                this.$emit('addNewInfo')
            },
            selected () {
                this.isSelected = !this.isSelected
                this.$emit('selectedAll', this.isSelected)
            },
            deleteCard () {
                this.$emit('deletInfo')
            },
            toggleList (type) {
                this.$emit('toggleList',type)
            },
            choseType () {
                console.log(this.filterList, 'opopopopopo')
                this.$emit('choseType',this.filterList)
            },
            selectedAll () {
                // this.isSelected = !this.isSelected
                console.log(this.isSelected, 'zhehis')
                this.$emit('selectedAll', this.isSelected)
            },
            fixCard () {
                this.$emit('fixedInfo')
            },
            async showType () {
                this.route = this.$route.path
                if (this.route.includes('shop')) {
                    await api.shop.getBusinesstype().then(res => {
                        console.log(res, '这是请求回来的shop')
                        this.shopType = res
                    })
                } else if (this.route.includes('person')) {
                    await api.person.getJob().then(res => {
                        console.log(res, '这是请求回来的')
                        this.personTypeList = res
                    })
                } else if (this.route.includes('indicator')) {
                    console.log('这是指示牌')
                }
            }
        },
        filters: {
            packFilter (item) {
                if (item === '0') {
                    return '室外'
                } else{
                    return '室内'
                }
            }
        },
        watch: {
            '$route' () {
                this.showType()
            }
        },
        created () {
            this.showType()
        }
    }
</script>

<style lang="scss">
    .funHeader{
        .el-checkbox__label{
            padding-left: rem(1);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .funHeader{
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
            }
            .el-button {
                padding: rem(5) rem(5);
                margin: 0;
            }
        }
        .filite{
            margin-left: rem(50);
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
