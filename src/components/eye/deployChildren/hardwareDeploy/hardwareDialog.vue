<template>
    <div class="hardwareDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="25%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--摄像头-->
                <div class="cameraCard popCard" v-if="route.includes('camera')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="camera.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="camera.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="camera.home">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="camera.IP"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="camera.host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="camera.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="camera.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="camera.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                        <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
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
       props:['visible','Info','title','isDisabled'],
       data(){
           return{
              camera:{
                  name:'',
                  type:'',
                  area:'',
                  home:'',
                  IP:'',
                  host:'',
                  place:'',
                  describe:'',
                  route:''
              },
               route:''
           }
       },
       methods:{
           closeDialog(){
               this.$emit('closeInfoDialog')
           },
           addNewInfo(){
               let newInfo={ }
               if(this.route.includes('camera')){
                   newInfo=this.camera
               }
               newInfo.status=true
               newInfo.checked=false

               if(this.Info.id){
                   newInfo.id=this.Info.id
                   this.$emit('fixInfo',newInfo)
               }else{
                   this.$emit('addNewInfo',newInfo)
               }
               this.closeDialog()
           }
       },
       created(){
           this.route=this.$route.path
           if(this.route.includes('camera')){
               this.camera=this.Info
           }
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


