<template>
    <div class="iot-dialog">
        <el-dialog
            title="提示"
            :visible="showDialog"
            width="30%"
            :before-close="handleClose">
            <div class="main">
                <div v-if="this.route.includes('deviceModel')">
                    <!--动态？-->
                    <!--<p class="">
                        <span>制造商</span>
                        <el-input type="text" v-model="typeInfo.manufacturer"  :maxlength="15"></el-input>
                    </p>-->

                </div>
                <div v-if="this.route.includes('deviceList')">
                    <!--<p class="">
                        <span>IP:</span>
                        <el-input type="text" v-model="listInfo.ip"  :maxlength="15"></el-input>
                    </p>-->

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "iotDialog",
        props:['cols','editData','showDialog'],
        data() {
            return {
                editInfo:[],
                route:'',
                typeInfo:{
                    description:'sss',
                    diviceCount:'555'
                },
                listInfo:{
                    ip:'haha'
                },
                visible:false
            };
        },
        created(){
            this.route = this.$route.path;

            /*api.iotHome.getEditInfo().then(res => {
                console.log(res, '要编辑的信息')
                this.editInfo = res
            });*/


            console.log(this.route);
            if (this.route.includes('deviceModel')){
                //this.typeInfo=this.editData;

            }else if(this.route.includes('deviceList')){
                console.log('list数据');
                this.listInfo=this.editData;
                console.log(this.listInfo);
            }


        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        //this.visible=false;
                    })
                    .catch(_ => {});
            },
            cancel(){
                this.$emit('cancelEvent','0')

            },
            save(){
                let fixContent={};
                if (this.route.includes('deviceModel')){
                    fixContent=this.typeInfo;

                }else if(this.route.includes('deviceList')){
                    fixContent=this.listInfo;
                }
                fixContent.id = this.editData.id;
                this.$emit('saveEvent',fixContent)
            }

        }
    }
</script>

<style type="text/scss" lang="scss">
    .iot-dialog{
        .main{
            ul{
                width:100%;

            }
            li{
                float:left;
                width:rem(16);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
