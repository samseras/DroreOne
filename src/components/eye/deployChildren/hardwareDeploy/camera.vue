<template>
    <div class="cameraTitle">
        <div class="titleSearch">
            <input type="text" placeholder="Search Anything">
            <i class="el-icon-search"></i>
        </div>
        <div class="titleBtn">
            <el-button size="mini" plain @click="addNewInfo"><i class="el-icon-circle-plus">添加</i></el-button>
            <el-button size="mini" plain class="selectedAll">
                <el-checkbox v-model="isSelected" @change="selectedAll" ></el-checkbox>全选
            </el-button>
            <el-button size="mini" plain>导入</el-button>
            <el-button size="mini" plain>导出</el-button>
            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="fixCard"><i class="el-icon-edit-outline"></i>修改</el-button>
        </div>
        <div class="titleCheck" v-if="route.includes('camera')" >
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in cameraList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="titleCheck" v-if="route.includes('broadcast')" >
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in cameraList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
         <div class="titleCheck" v-if="route.includes('led')" >
                <el-checkbox-group v-model="filterList" @change="choseType">
                    <el-checkbox v-for="item in cameraList" :label="item.type"></el-checkbox>
                </el-checkbox-group>
        </div>
        <div class="titleCheck" v-if="route.includes('wifi')" >
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in cameraList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="titleCheck" v-if="route.includes('gate')" >
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in gateList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="titleCheck" v-if="route.includes('police')" >
            <el-checkbox-group v-model="filterList" @change="choseType">
                <el-checkbox v-for="item in policeList" :label="item.type"></el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="titlePage">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm" @click="toggleList('list')" ><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                filterList:[],
                cameraList:[
                    {type:'室内'},
                    {type:'室外'}
                ],
                gateList:[
                    {type:'翼闸'},
                    {type:'摆闸'},
                    {type:'三角闸'},
                    {type:'评议闸'}
                ],
                policeList:[
                    {type:'报警柱'},
                    {type:'越界'}
                ],
                route:'',
                isSelected:false,
                isShowJobType:true
            }
        },
        methods:{
            addNewInfo(){
                this.$emit('addNewInfo')
//                alert('1')
            },
            deleteCard(){
                this.$emit('deletInfo')
            },
            toggleList(type){
                this.$emit('toggleList',type)
            },
            choseType(){
                this.$emit('choseType',this.filterList)
            },
            selectedAll(){
                console.log(this.isSelected)
                this.$emit('selectedAll',this.isSelected)
            },
            fixCard(){
                this.$emit('fixedInfo')
            },
            showPersonJob(){
                this.route=this.$route.path
            }
        },
        watch:{
            '$route' (){
                this.showPersonJob()
            }
        },
        created(){
            this.showPersonJob()
        }
    }
</script>

<style lang="scss" type="text/scss">
    .cameraTitle{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(5);
        }
    }
</style>

<style lang="scss" scoped type="text/scss">
    .cameraTitle{
        width:100%;
        height:100%;
        div{
            display:inline-block;
        }
        .titleSearch{
            input{
                border:none;
                outline:medium;
                border-bottom:1px solid #ccc;
                font-size:rem(13);
                padding:rem(3) rem(4);
            }
            i{
                font-size:rem(13);
                margin-left:rem(-20);
                cursor: pointer;
            }
        }
        .titleBtn{
            margin-left:rem(20);
            margin-top:rem(4);
            button{
                border:none;
                margin-right:rem(-5);
                font-weight: 600;
                i{
                    margin-right:rem(3);
                }
            }
            .el-button .selectedAll{
               padding-bottom:rem(0);
            }
            .el-button{
                padding:rem(5) rem(5);
                margin:0;
            }
        }
        .titleCheck{
            margin-left:rem(50);
            .el-checkbox{
                margin-left:rem(10);
                margin-bottom: rem(2);
            }
        }
        .titlePage{
            margin-left: rem(20);
            font-size:rem(13);
            float:right;
            margin-top:rem(3);
            span{
                display:inline-block;
                cursor: pointer;
                margin-left:rem(5);
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
