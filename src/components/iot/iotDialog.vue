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
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="typeInfo.manufacturer"  :maxlength="15"></el-input>
                    </p>-->
                    <p class="name" v-for="item in deviceObj" v-if="item.shown">
                        <span>{{item.label}}</span>
                        <!--<span>{{item.prop}}</span>-->
                        <!--<span>{{item.isDisabled}}</span>-->
                        <!--<span>{{item.shown}}</span>-->
                        <el-input v-model="item.prop"></el-input>
                        <!--<el-input v-model="item.prop":disabled="!item.isDisabled"></el-input>-->
                    </p>

                </div>
                <div v-if="this.route.includes('deviceList')">
                    <!--<p class="">
                        <span>I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P：</span>
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
    export default {
        name: "iotDialog",
        props:['cols','editData','showDialog'],
        data() {
            return {
                route:'',
                typeInfo:{
                    description:'sss',
                    diviceCount:'555'
                },
                listInfo:{
                    ip:'haha'
                },
                visible:false,
                deviceObj: []
            };
        },
        async created(){
            console.log(this.cols, '这个是列表')
            console.log(this.editData, '这个是列表')
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
            this.route = this.$route.path;
            console.log(this.route);
            if (this.route.includes('deviceModel')){
                this.typeInfo=this.editData;
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
                console.log(this.deviceObj, '这个是编辑后的')
                let obj = {}
                this.deviceObj.forEach(item => {
                    obj[item.key] = item.prop
                })
                console.log(obj, '这个是最终编辑的')
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
