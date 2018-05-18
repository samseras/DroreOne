<template>
    <div class="cameraTitle">
        <div class="titleSearch">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent" @keyup="startSearch">
            <i class="el-icon-search"></i>
        </div>
        <div class="titleBtn">
            <el-button size="mini" plain @click="addNewInfo"><i class="el-icon-circle-plus"></i>添加</el-button>

            <el-checkbox v-model="isSelected" @change="selectedAll"  class='selectedAll' >全选</el-checkbox>

            <el-button size="mini"plain @click="deleteCard"><i class="el-icon-delete"></i>删除</el-button>
            <el-button size="mini"plain @click="fixCard"><i class="el-icon-edit-outline"></i>修改</el-button>
            <div class="el-upload">
                <el-button size="mini" plain @click="$refs.uploadFile.click()"><i class="el-icon-upload2"></i>导入</el-button>
                <input type="file" ref="uploadFile" class="importFile" @change="selectFile">
            </div>
            <el-button size="mini" plain @click="downloadFile"><i class="el-icon-download"></i>导出</el-button>

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

        <div class="titlePage" v-if="!route.includes('hardwaretype')">
            <span>当前第1页/共8页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
            <span class="listForm" @click="toggleList('list')" ><i class="el-icon-tickets"></i></span>
            <span class="cardForm" @click="toggleList('card')"><i class="el-icon-menu"></i></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'

    export default{
        props: ['choseId','listsLength'],
        data(){
            return{
                searchKeys:'',
                filterList:[],
                cameraList:[
                    {type:'室内'},
                    {type:'室外'}
                ],
                gateList:[
                    {type:'翼闸'},
                    {type:'摆闸'},
                    {type:'三角闸'},
                    {type:'平移闸'}
                ],
                policeList:[
                    {type:'报警柱'},
                    {type:'越界'}
                ],
                route:'',
                isSelected:false,
                isShowJobType:true,
                searchContent:''
            }
        },
        methods:{
            startSearch () {
                // if (this.searchContent !== '') {
                this.$emit('searchAnything', this.searchContent)
                // }
            },
            addNewInfo(){
                this.$emit('addNewInfo')
            },
            deleteCard(){
                this.$emit('deletInfo')
            },
            selectFile(e){
                let file = e.target.files[0];
                let params = {};
                if (!file.type.includes('vnd.ms-excel')) {
                    this.$message.error('请上传CSV格式文件，谢谢！');
                    return
                } else {
                    var form = new FormData();
                    form.append('f1',file);
                    if(this.$route.path.includes("broadcast")){
                        params.fileParam = form;
                        params.type = '1';
                        console.log(form, 'opopopopoppopop')
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllBroadcast");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("camera")) {
                        params.fileParam = form;
                        params.type = '2';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllCamera");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("monitors")){
                        params.fileParam = form;
                        params.type = '6';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllMonitor");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("police")){
                        params.fileParam = form;
                        params.type = '8';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllPolice");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("led")){
                        params.fileParam = form;
                        params.type = '4';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllLed");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("wifi")){
                        params.fileParam = form;
                        params.type = '7';
                        console.log(form, 'opopopopoppopop')
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllWifi");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("gate")){
                        params.fileParam = form;
                        params.type = '3';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllGate");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })

                    }else if(this.$route.path.includes("lampLight")){
                        params.fileParam = form;
                        params.type = '5';
                        api.importfile.importFileData(params).then(res => {
                            this.$message.success('导入成功');
                            this.$emit("getAllLight");
                        }).catch(err => {
                            this.$message.error('导入失败，请稍后重试')
                            console.log(err, '导入失败')
                        })
                    }
                }
            },

            downloadFile(){
                if(this.listsLength < 1){
                    this.$message.error('没有数据导出,添加后再试')
                    return
                }

                let type
                let route = this.$route.path
                if (route.includes('broadcast')) {
                    type = 1
                }else if(route.includes('camera')){
                    type = 2
                }else if(route.includes('gate')){
                    type = 3
                } else if(route.includes('led')){
                    type =4
                }else if(route.includes('lampLight')){
                    type = 5
                }else if(route.includes('monitors')){
                    type = 6
                }else if(route.includes('wifi')){
                    type = 7
                }else if(route.includes('police')){
                    type = 8
                }
                if (this.choseId.length > 0) {
                    api.exportFile.exportSingle(this.choseId).then((res) =>{
                        console.log(res,'niaho')
                        const content = res
                        const blob = new Blob([content])
                        const fileName = '设备文件.csv'
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
//                        this.choseId=[]
                    }).catch(err =>{
                        this.$message.error('导出失败，请稍后再试')
                    })
                } else {
                    api.exportFile.exportAll(type).then((res) => {
                        console.log(res,'niaho')
                        const content = res
                        const blob = new Blob([content])
                        const fileName = '测试.csv'
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
            margin-top: rem(2);
            margin-right: rem(2);
        }
        .importFile{
             width: 0;
             height: 0;
             display: none;
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
                margin-left:rem(-15);
                cursor: pointer;
            }
        }
        .titleBtn{
            margin-left:rem(20);
            margin-top:rem(4);
            button{
                border:none;
                margin-right:rem(-5);
                font-weight: 500;
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
                    color: #e44b4e;
                }
            }
        }
    }

</style>
