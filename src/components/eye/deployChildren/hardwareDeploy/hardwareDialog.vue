<template>
    <div class="hardwareDialog">
        <el-dialog
            title="添加摄像头信息"
            :visible="visible"
            :before-close="closeDialog"
            width="25%"
            class="dialog echatDialog"
            center>
            <div class="card">

                <div class="cameraCard popCard">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <!--<div class="chart">-->
                        <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  称：<input type="text" v-model="name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  家：
                        <select name="" v-model="home">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="IP"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="place"></p>
                    <p class="area">所属片区：<input type="text" v-model="area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="describe" cols="40" rows="8">

                        </textarea>
                    </p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" @click="addNewInfo" :disabled="isDisabled">保存</el-button>
                <el-button size="mini" type="primary" @click="closeDialog" :disabled="isDisabled">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
   export default{
       props:['visible','personInfo','isDisabled'],
       data(){
           return{
               name:'',
               type:'',
               area:'',
               home:'',
               IP:'',
               host:'',
               place:'',
               describe:''

           }
       },
       methods:{
           select(){

           },
           closeDialog(){
               this.$emit('closeInfoDialog')
           },
           addNewInfo(){
               let newInfo={
                   name:this.name,
                   type:this.type,
                   area:this.area,
                   home:this.home,
                   IP:this.IP,
                   host:this.host,
                   place:this.place,
                   describe:this.describe,
                   status: true,
                    checked: false
               }
               if(this.personInfo.id){
                   newInfo.id=this.personInfo.id
                   this.$emit('fixInfo',newInfo)
               }else{
                   this.$emit('addNewPerson',newInfo)
               }
               this.closeDialog()
           }
       },
       created(){
           this.name=this.personInfo.name
           this.type=this.personInfo.type
           this.area=this.personInfo.area
           this.home=this.personInfo.home
           this.IP=this.personInfo.IP
           this.host=this.personInfo.host
           this.place=this.personInfo.place
           this.describe=this.personInfo.describe
       }
   }

</script>

<style lang="scss" type="text/scss">
    .hardwareDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header{
            padding: rem(5) 0 0 rem(5);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(7);
        }
        .el-dialog__body{
            padding: rem(10) rem(15) 0 rem(15);
            box-sizing: border-box;

        }
        .el-dialog__footer{
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer{
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
    }
</style>

<style lang="scss" scoped type="text/scss">
    .hardwareDialog{
        .card{
            width: 100%;
            height: 100%;
            .popCard {
                width: 100%;
                height: 100%;
                position: relative;
                /*.chart{*/
                    /*position: absolute;*/
                    /*width:rem(20);*/
                    /*height:rem(20);*/
                    /*top:rem(5);*/
                    /*right:rem(20);*/
                    /*img{*/
                        /*border:1px solid #9c9c9c;*/
                        /*border-radius: 50%;*/
                    /*}*/
                /*}*/
                p{
                    margin-top: rem(5);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(14);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                    }
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
                        option{
                            appearance:none;
                            list-style: none;
                            border: none;
                            width: 100%;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            /*border:  1px solid #ccc;*/
                            background: #fff;

                        }
                    }
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(0);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        background: red;
                        border-radius: 50%;
                        margin-left: rem(25);
                    }
                }
            }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
    }

</style>


