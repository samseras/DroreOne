<template>
    <div class="iot-dialog">
        <el-dialog
            title="信息编辑"
            :visible="showDialog"
            width="30%"
            :before-close="handleClose">
            <div class="main">
                <div v-if="this.route.includes('deviceModel')">

                    <p class="name" v-for="item in deviceObj" v-if="item.shown">
                        <span>{{item.label}}</span>

                        <el-input v-model="item.prop"></el-input>
                        <!--<el-input v-model="item.prop":disabled="!item.isDisabled"></el-input>-->
                    </p>

                </div>
                <div v-if="this.route.includes('deviceList')">
                    <p class="edits" v-for="item in editObj">
                        <span>{{item.label}}</span>

                        <el-input v-model="item.name"></el-input>
                        <!--<el-input v-model="item.prop":disabled="!item.isDisabled"></el-input>-->
                    </p>

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
        props:['cols','editData','showDialog','detailEditInfo'],
        data() {
            return {
                cardId:'',//卡片id
                route:'',
                typeInfo:{
                    description:'sss',
                    diviceCount:'555'
                },
                listInfo:{
                    ip:'haha'
                },
                visible:false,
                deviceObj: [],
                editObj:[],
            };
        },
        async created(){

            this.route = this.$route.path;
            console.log(this.route);

            if (this.route.includes('deviceModel')){
                //this.typeInfo=this.editData;
                console.log(this.cols, '这个是列表头')
                console.log(this.editData, '这个是列表内容')
                let obj = this.editData
                await this.cols.forEach(item => {
                    Object.keys(obj).forEach( (key, i) => {
                        console.log(key, '这个是拿过来的对象的键')
                        if (item.prop === key) {
                            // this.deviceObj[item.prop] = i
                            // this.deviceObj.label = item.label
                            let device = {}
                            device.prop = obj[key]
                            device.label = item.label
                            device.isDisabled = item.editable
                            device.shown = item.shown
                            device.key = item.prop
                            this.deviceObj.push(device)
                        }
                    });
                })

            }else if(this.route.includes('deviceList')){

                /*api.iotHome.getEditInfo().then(res => {
                    console.log(res, '要编辑的信息')
                    this.editInfo = res
                });*/

            }


        },
        watch:{
            detailEditInfo(news,olds) {
                console.log(news,'编辑的数据');
                this.cardId=news.iotDeviceId;
                news.fieldInfos.forEach(item => {
                    Object.keys(news.properties).forEach( (key, i) => {
                        console.log(key, '这个是拿过来的对象的键')
                        if (item.name === key) {
                            // this.deviceObj[item.prop] = i
                            // this.deviceObj.label = item.label
                            let obj = {}
                            obj.name = news.properties[key]
                            obj.label = item.label
                            obj.key = item.name
                            this.editObj.push(obj)
                        }
                    });
                })
            }
        },
        methods: {
            handleClose(done) {
                this.$emit('cancelEvent','0')
                /*this.$confirm('确认关闭？')
                    .then(_ => {
                        //this.visible=false;
                    })
                    .catch(_ => {});*/
            },
            cancel(){
                this.$emit('cancelEvent','0')

            },
            save(){


                if (this.route.includes('deviceModel')){
                    //fixContent=this.typeInfo;
                    console.log(this.deviceObj, '这个是编辑后的')
                    let obj = {}
                    this.deviceObj.forEach(item => {
                        obj[item.key] = item.prop
                    })
                    console.log(obj, '这个是最终编辑的')
                   /* fixContent=obj;*/
                }else if(this.route.includes('deviceList')){
                    console.log(this.editObj, '这个是编辑后的')
                    let finalObj={}
                    this.editObj.forEach(item=>{
                        finalObj[item.key]=item.name
                    })
                    finalObj.id=this.cardId;
                    this.$emit('saveEvent',finalObj)
                }


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
